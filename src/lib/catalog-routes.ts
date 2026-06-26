import { locales, type Locale } from '../config/locales';
import type { CatalogKind } from '../data/catalog';
import { getCatalogItems } from './catalog-reader';
import { getLocalizedPath } from './i18n';
import { sortRegions } from '../data/catalog-regions';

export const CATALOG_PAGE_SIZE = 9;

export function getCatalogBasePath(kind: CatalogKind, locale: Locale) {
  return getLocalizedPath(`/${kind}`, locale);
}

export function getCatalogItemPath(kind: CatalogKind, slug: string, locale: Locale) {
  return getLocalizedPath(`/${kind}/${slug}`, locale);
}

export function buildCatalogIndexPaths(kind: CatalogKind) {
  return locales.map((locale) => ({
    params: locale.code === 'en' ? {} : { locale: locale.code },
    props: { kind, locale: locale.code as Locale },
  }));
}

export async function buildCatalogDetailPaths(kind: CatalogKind) {
  const groups = await Promise.all(
    locales.map(async (locale) => {
      const items = await getCatalogItems(kind, locale.code);
      return items.map((item) => ({
        params:
          locale.code === 'en'
            ? { slug: item.slug }
            : { locale: locale.code, slug: item.slug },
        props: { kind, locale: locale.code as Locale, item },
      }));
    }),
  );

  return groups.flat();
}

export function buildAuthPaths(page: 'login' | 'signup') {
  return locales.map((locale) => ({
    params: locale.code === 'en' ? {} : { locale: locale.code },
    props: { page, locale: locale.code as Locale },
  }));
}

export async function getUniqueRegions(kind: CatalogKind) {
  const items = await getCatalogItems(kind);
  return sortRegions([...new Set(items.map((item) => item.region))]);
}

export async function getUniqueCategories(kind: CatalogKind) {
  if (kind !== 'destinations') return [];
  const items = await getCatalogItems(kind);
  return [...new Set(items.map((item) => item.category))].sort();
}

export async function getMaxPrice(kind: CatalogKind) {
  const items = await getCatalogItems(kind);
  return Math.max(...items.map((item) => item.priceValue));
}
