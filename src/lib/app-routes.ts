import { locales, type Locale } from '../config/locales';
import type { CatalogItem, CatalogKind } from '../data/catalog';
import { getCatalogItems } from './catalog-reader';
import { getAllPages } from './keystatic-reader';
import { buildSlugParam } from './i18n';
import { getCatalogLabels } from '../i18n/catalog';
import { getAppLabels } from '../i18n/app';

export type RouteKind =
  | { type: 'cms'; page: Awaited<ReturnType<typeof getAllPages>>[number]; locale: Locale }
  | { type: 'catalog-index'; kind: CatalogKind; locale: Locale }
  | { type: 'catalog-detail'; kind: CatalogKind; item: CatalogItem; locale: Locale }
  | { type: 'auth'; page: 'login' | 'signup'; locale: Locale }
  | { type: 'bookings'; locale: Locale };

const catalogKinds: CatalogKind[] = ['destinations', 'hotels', 'flights'];
const cmsSlugsToSkip = new Set(['destinations', 'bookings']);

function buildCatalogSlugParam(locale: Locale, kind: CatalogKind, itemSlug?: string) {
  const segments = [];

  if (locale !== 'en') segments.push(locale);
  segments.push(kind);
  if (itemSlug) segments.push(itemSlug);

  return segments.join('/');
}

export async function getAllAppPaths() {
  const paths: Array<{ params: { slug?: string }; props: RouteKind }> = [];

  for (const locale of locales) {
    const pages = await getAllPages(locale.code);

    for (const page of pages) {
      if (page.slug === 'home' && locale.code === 'en') continue;
      if (cmsSlugsToSkip.has(page.slug)) continue;

      paths.push({
        params: { slug: buildSlugParam(locale.code, page.slug) },
        props: { type: 'cms', page, locale: locale.code },
      });
    }

    for (const kind of catalogKinds) {
      const items = await getCatalogItems(kind, locale.code);

      paths.push({
        params: { slug: buildCatalogSlugParam(locale.code, kind) },
        props: { type: 'catalog-index', kind, locale: locale.code },
      });

      for (const item of items) {
        paths.push({
          params: { slug: buildCatalogSlugParam(locale.code, kind, item.slug) },
          props: { type: 'catalog-detail', kind, item, locale: locale.code },
        });
      }
    }

    for (const authPage of ['login', 'signup'] as const) {
      const slug =
        locale.code === 'en' ? authPage : buildSlugParam(locale.code, authPage);

      paths.push({
        params: { slug },
        props: { type: 'auth', page: authPage, locale: locale.code },
      });
    }

    const bookingsSlug =
      locale.code === 'en' ? 'bookings' : buildSlugParam(locale.code, 'bookings');

    paths.push({
      params: { slug: bookingsSlug },
      props: { type: 'bookings', locale: locale.code },
    });
  }

  return paths;
}

export function getRouteTitle(route: RouteKind, siteBrand: string) {
  switch (route.type) {
    case 'cms':
      return route.page.title;
    case 'catalog-index':
      return getCatalogLabels(route.locale)[route.kind].title;
    case 'catalog-detail':
      return route.item.name;
    case 'auth':
      return route.page === 'login'
        ? getAppLabels(route.locale).loginTitle
        : getAppLabels(route.locale).signupTitle;
    case 'bookings':
      return getAppLabels(route.locale).bookingsTitle;
    default:
      return siteBrand;
  }
}

export function getRouteDescription(route: RouteKind, fallback: string) {
  if (route.type === 'cms') return route.page.description ?? fallback;
  if (route.type === 'catalog-index') {
    return getCatalogLabels(route.locale)[route.kind].description;
  }
  if (route.type === 'catalog-detail') return route.item.description;
  if (route.type === 'bookings') {
    return getAppLabels(route.locale).bookingsDescription;
  }
  return fallback;
}
