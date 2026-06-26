/**
 * Scroll-reveal — reveals once when elements enter the viewport.
 * @see src/styles/motion.css
 */

const REVEALED = 'is-revealed';

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function revealElement(element: Element) {
  element.classList.add(REVEALED);
}

function revealAll(root: ParentNode = document) {
  root.querySelectorAll('[data-reveal], [data-reveal-item]').forEach(revealElement);
}

function revealGroup(group: HTMLElement) {
  const items = group.querySelectorAll('[data-reveal-item]');
  const stagger = Number(group.dataset.revealStagger ?? 100);
  const delay = Number(group.dataset.revealDelay ?? 0);

  items.forEach((item, index) => {
    window.setTimeout(() => revealElement(item), delay + index * stagger);
  });
}

function handleIntersect(entry: IntersectionObserverEntry, observer: IntersectionObserver) {
  if (!entry.isIntersecting) return;

  const target = entry.target as HTMLElement;

  if (target.hasAttribute('data-reveal-group')) {
    revealGroup(target);
  } else {
    revealElement(target);
  }

  observer.unobserve(target);
}

let activeObserver: IntersectionObserver | null = null;

export function initScrollReveal() {
  if (prefersReducedMotion()) {
    revealAll();
    return;
  }

  activeObserver?.disconnect();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => handleIntersect(entry, observer));
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -6% 0px',
    },
  );

  activeObserver = observer;

  document.querySelectorAll('[data-reveal], [data-reveal-group]').forEach((element) => {
    observer.observe(element);
  });
}
