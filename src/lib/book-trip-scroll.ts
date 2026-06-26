const BOOK_TRIP_SELECTOR = '[data-book-trip]';
const PHOTO_SELECTOR = '[data-book-trip-photo]';
const STATUS_SELECTOR = '[data-book-trip-status]';
const PROGRESS_SELECTOR = '[data-book-trip-progress]';

const PROGRESS_TARGET = 46.8;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function easeInCubic(t: number) {
  return t ** 3;
}

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

function getOffsetTop(element: HTMLElement): number {
  let top = 0;
  let el: HTMLElement | null = element;

  while (el) {
    top += el.offsetTop;
    el = el.offsetParent as HTMLElement | null;
  }

  return top;
}

function getSectionProgress(section: HTMLElement, scrollY: number) {
  const top = getOffsetTop(section);
  const height = section.offsetHeight;
  const viewport = window.innerHeight;
  const rangeStart = top - viewport * 0.82;
  const rangeEnd = top + height - viewport * 0.18;

  if (rangeEnd <= rangeStart) return 0;

  return clamp((scrollY - rangeStart) / (rangeEnd - rangeStart), 0, 1);
}

function photoScale(progress: number) {
  if (progress < 0.42) {
    return lerp(0.84, 1, easeOutCubic(progress / 0.42));
  }

  if (progress < 0.68) return 1;

  return lerp(1, 0.86, easeInCubic((progress - 0.68) / 0.32));
}

function statusOffset(progress: number) {
  if (progress < 0.4) {
    return lerp(-3.25, 0, easeOutCubic(progress / 0.4));
  }

  if (progress < 0.72) return 0;

  return lerp(0, 2.25, easeInCubic((progress - 0.72) / 0.28));
}

function progressFill(progress: number) {
  const loadStart = 0.18;
  const loadEnd = 0.58;
  const loadProgress = clamp((progress - loadStart) / (loadEnd - loadStart), 0, 1);

  return easeOutCubic(loadProgress) * PROGRESS_TARGET;
}

function applyFinalState(section: HTMLElement) {
  const photo = section.querySelector<HTMLElement>(PHOTO_SELECTOR);
  const status = section.querySelector<HTMLElement>(STATUS_SELECTOR);
  const progress = section.querySelector<HTMLElement>(PROGRESS_SELECTOR);

  photo?.style.setProperty('--book-trip-photo-scale', '1');
  status?.style.setProperty('--book-trip-status-x', '0rem');
  progress?.style.setProperty('--book-trip-progress', `${PROGRESS_TARGET}%`);
}

function updateSection(section: HTMLElement, scrollY: number) {
  const progress = getSectionProgress(section, scrollY);
  const photo = section.querySelector<HTMLElement>(PHOTO_SELECTOR);
  const status = section.querySelector<HTMLElement>(STATUS_SELECTOR);
  const progressBar = section.querySelector<HTMLElement>(PROGRESS_SELECTOR);

  photo?.style.setProperty('--book-trip-photo-scale', String(photoScale(progress)));
  status?.style.setProperty('--book-trip-status-x', `${statusOffset(progress)}rem`);
  progressBar?.style.setProperty('--book-trip-progress', `${progressFill(progress)}%`);
}

export function updateBookTripScroll(scrollY: number = window.scrollY) {
  const sections = document.querySelectorAll<HTMLElement>(BOOK_TRIP_SELECTOR);
  if (!sections.length) return;

  if (prefersReducedMotion()) {
    sections.forEach(applyFinalState);
    return;
  }

  sections.forEach((section) => updateSection(section, scrollY));
}

export function initBookTripScroll() {
  updateBookTripScroll(window.scrollY);

  window.addEventListener(
    'resize',
    () => {
      updateBookTripScroll(window.scrollY);
    },
    { passive: true },
  );
}
