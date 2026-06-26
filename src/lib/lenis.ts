import Lenis from 'lenis';
import { updateBookTripScroll } from './book-trip-scroll';
import { setScrollVelocity } from './scroll-velocity';

const PARALLAX_SELECTOR = '[data-parallax-layer]';
const HERO_SELECTOR = '[data-hero-parallax]';
const MOBILE_MAX_WIDTH = 768;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isMobileViewport(): boolean {
  return window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`).matches;
}

function getHeroOffsetTop(hero: HTMLElement): number {
  let top = 0;
  let el: HTMLElement | null = hero;

  while (el) {
    top += el.offsetTop;
    el = el.offsetParent as HTMLElement | null;
  }

  return top;
}

function updateHeroParallax(scroll: number): void {
  if (prefersReducedMotion() || isMobileViewport()) return;

  const hero = document.querySelector<HTMLElement>(HERO_SELECTOR);
  if (!hero) return;

  const layers = hero.querySelectorAll<HTMLElement>(PARALLAX_SELECTOR);
  if (!layers.length) return;

  const heroTop = getHeroOffsetTop(hero);
  const heroHeight = hero.offsetHeight;
  const progress = Math.max((scroll - heroTop) / heroHeight, 0);
  const cappedProgress = Math.min(progress, 1.15);

  const heroVisual = hero.querySelector<HTMLElement>('.hero__visual');
  if (heroVisual) {
    const fadeStart = 0.58;
    const fadeEnd = 1.02;
    const opacity =
      progress <= fadeStart
        ? 1
        : Math.max(0, Math.min(1, 1 - (progress - fadeStart) / (fadeEnd - fadeStart)));
    heroVisual.style.setProperty('--hero-visual-opacity', String(opacity));
  }

  layers.forEach((layer) => {
    const speed = Number.parseFloat(layer.dataset.parallaxSpeed ?? '0.2');
    const xSpeed = Number.parseFloat(layer.dataset.parallaxXSpeed ?? '0');
    const offsetY = cappedProgress * heroHeight * speed;
    const offsetX = xSpeed ? cappedProgress * heroHeight * xSpeed : 0;

    layer.style.setProperty('--parallax-y', `${offsetY}px`);
    layer.style.setProperty('--parallax-x', `${offsetX}px`);
  });
}

export function initSmoothScroll(): void {
  if (prefersReducedMotion()) return;

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.15,
  });

  document.documentElement.classList.add('lenis');

  let lastScroll = lenis.scroll;
  let lastTime = performance.now();

  lenis.on('scroll', ({ scroll }) => {
    const now = performance.now();
    const deltaTime = now - lastTime;
    const deltaScroll = scroll - lastScroll;

    if (deltaTime > 0 && deltaTime < 120) {
      setScrollVelocity(Math.abs(deltaScroll / (deltaTime / 1000)));
    }

    lastScroll = scroll;
    lastTime = now;
    updateHeroParallax(scroll);
    updateBookTripScroll(scroll);
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  updateHeroParallax(lenis.scroll);
  updateBookTripScroll(lenis.scroll);

  window.addEventListener(
    'resize',
    () => {
      updateHeroParallax(lenis.scroll);
      updateBookTripScroll(lenis.scroll);
    },
    { passive: true },
  );
}
