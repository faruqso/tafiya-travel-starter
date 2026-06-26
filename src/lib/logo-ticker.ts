import { getScrollVelocity, updateScrollVelocity } from './scroll-velocity';

const SPEED_SCALE = 0.7;
const IDLE_SPEED = 6 * SPEED_SCALE;
const SCROLL_DRIVE = 2.8 * SPEED_SCALE;
const MIN_SCROLL_SPEED = 12;
const SPEED_EASE = 6.5;

function measureSet(set: HTMLElement) {
  return set.getBoundingClientRect().width;
}

function getSetStride(set: HTMLElement, track: HTMLElement) {
  const styles = getComputedStyle(track);
  const gap = Number.parseFloat(styles.columnGap || styles.gap || '0') || 0;
  return measureSet(set) + gap;
}

function appendBaseBlock(set: HTMLElement, baseCount: number) {
  for (let i = 0; i < baseCount; i++) {
    const source = set.children[i];
    if (source) set.appendChild(source.cloneNode(true));
  }
}

function syncTickerSets(viewport: HTMLElement, track: HTMLElement) {
  const sets = track.querySelectorAll<HTMLElement>('.logo-cloud__set');
  if (sets.length !== 2) return 0;

  const [primary, duplicate] = sets;
  const baseCount = Number(track.dataset.baseCount ?? primary.children.length);
  if (!baseCount) return 0;

  while (primary.children.length > baseCount) {
    primary.lastElementChild?.remove();
  }

  while (measureSet(primary) < viewport.clientWidth + 64) {
    appendBaseBlock(primary, baseCount);
  }

  duplicate.innerHTML = primary.innerHTML;

  return getSetStride(primary, track);
}

type TickerInstance = {
  viewport: HTMLElement;
  track: HTMLElement;
  setWidth: number;
  offset: number;
  currentSpeed: number;
  inView: boolean;
  paused: boolean;
  lastTime: number;
};

const tickers: TickerInstance[] = [];
let rafId = 0;
let lastFrameTime = 0;

function getTargetSpeed() {
  const scrollSpeed = getScrollVelocity();

  if (scrollSpeed >= MIN_SCROLL_SPEED) {
    return scrollSpeed * SCROLL_DRIVE;
  }

  return IDLE_SPEED;
}

function easeSpeed(current: number, target: number, delta: number) {
  const blend = 1 - Math.exp(-SPEED_EASE * delta);
  return current + (target - current) * blend;
}

function tick(time: number) {
  const frameDelta = lastFrameTime ? (time - lastFrameTime) / 1000 : 0;
  lastFrameTime = time;

  if (frameDelta > 0) {
    updateScrollVelocity(frameDelta);
  }

  tickers.forEach((ticker) => {
    const delta = ticker.lastTime ? (time - ticker.lastTime) / 1000 : 0;
    ticker.lastTime = time;

    if (!ticker.inView || ticker.paused || delta <= 0) return;

    const targetSpeed = getTargetSpeed();
    ticker.currentSpeed = easeSpeed(ticker.currentSpeed, targetSpeed, delta);

    ticker.offset += ticker.currentSpeed * delta;
    if (ticker.offset >= ticker.setWidth) {
      ticker.offset -= ticker.setWidth;
    }

    ticker.track.style.transform = `translate3d(-${ticker.offset}px, 0, 0)`;
  });

  rafId = requestAnimationFrame(tick);
}

function startLoop() {
  if (rafId) return;
  rafId = requestAnimationFrame(tick);
}

function stopLoop() {
  if (!rafId) return;
  cancelAnimationFrame(rafId);
  rafId = 0;
}

export function initLogoTickers() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('[data-logo-ticker-viewport]').forEach((viewport) => {
    if (!(viewport instanceof HTMLElement)) return;
    if (viewport.dataset.initialized === 'true') return;

    const track = viewport.querySelector('[data-logo-ticker]');
    if (!(track instanceof HTMLElement)) return;

    const setWidth = syncTickerSets(viewport, track);
    if (!setWidth) return;

    track.classList.add('logo-cloud__track--scroll-driven');

    const instance: TickerInstance = {
      viewport,
      track,
      setWidth,
      offset: 0,
      currentSpeed: IDLE_SPEED,
      inView: false,
      paused: false,
      lastTime: 0,
    };

    tickers.push(instance);
    viewport.dataset.initialized = 'true';

    const observer = new IntersectionObserver(
      ([entry]) => {
        instance.inView = entry?.isIntersecting ?? false;
        instance.lastTime = 0;
      },
      { threshold: 0.15 },
    );

    observer.observe(viewport);

    viewport.addEventListener('mouseenter', () => {
      instance.paused = true;
    });

    viewport.addEventListener('mouseleave', () => {
      instance.paused = false;
    });

    viewport.addEventListener('focusin', () => {
      instance.paused = true;
    });

    viewport.addEventListener('focusout', (event) => {
      if (event.relatedTarget instanceof Node && viewport.contains(event.relatedTarget)) return;
      instance.paused = false;
    });

    window.addEventListener(
      'resize',
      () => {
        instance.setWidth = syncTickerSets(viewport, track);
        if (instance.offset >= instance.setWidth) {
          instance.offset %= instance.setWidth;
        }
      },
      { passive: true },
    );
  });

  if (tickers.length) startLoop();
}

export function destroyLogoTickers() {
  stopLoop();
  tickers.length = 0;
  lastFrameTime = 0;
}
