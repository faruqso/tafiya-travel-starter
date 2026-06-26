import { defaultLocale, isLocale, type Locale } from '../config/locales';

export function getLocaleFromPath(pathname: string): Locale {
  const segment = pathname.split('/').filter(Boolean)[0];
  return segment && isLocale(segment) ? segment : defaultLocale;
}

export function stripLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return '/';
  }

  if (isLocale(segments[0])) {
    const rest = segments.slice(1).join('/');
    return rest ? `/${rest}` : '/';
  }

  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

export function getLocalizedPath(pathname: string, locale: Locale): string {
  const basePath = stripLocaleFromPath(pathname);
  const suffix = basePath === '/' ? '' : basePath;

  if (locale === defaultLocale) {
    return suffix || '/';
  }

  return `/${locale}${suffix}`;
}

export function localizeHref(href: string, locale: Locale): string {
  if (
    !href ||
    href.startsWith('#') ||
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  ) {
    return href;
  }

  const normalized = href.startsWith('/') ? href : `/${href}`;
  return getLocalizedPath(normalized, locale);
}

export function buildSlugParam(locale: Locale, pageSlug: string): string | undefined {
  if (pageSlug === 'home') {
    return locale === defaultLocale ? undefined : locale;
  }

  return locale === defaultLocale ? pageSlug : `${locale}/${pageSlug}`;
}

export function parseSlugParam(slug: string | undefined): { locale: Locale; pageSlug: string } {
  if (!slug) {
    return { locale: defaultLocale, pageSlug: 'home' };
  }

  const segments = slug.split('/');
  const first = segments[0];

  if (first && isLocale(first)) {
    const rest = segments.slice(1).join('/');
    return { locale: first, pageSlug: rest || 'home' };
  }

  return { locale: defaultLocale, pageSlug: slug };
}
