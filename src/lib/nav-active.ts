import { stripLocaleFromPath } from './i18n';

function normalizePath(path: string): string {
  const stripped = stripLocaleFromPath(path).replace(/\/+$/, '') || '/';
  return stripped;
}

/** True when the current page matches a nav/footer link (exact or catalog child route). */
export function isNavLinkActive(currentPath: string, href: string): boolean {
  const current = normalizePath(currentPath);
  const target = normalizePath(href.startsWith('/') ? href : `/${href}`);

  if (current === target) return true;

  if (target !== '/' && current.startsWith(`${target}/`)) {
    return true;
  }

  return false;
}
