import type { CatalogKind } from '../data/catalog';
import type { Locale } from '../config/locales';
import { localizeHref } from './i18n';

export function getBookingPath(kind: CatalogKind, itemSlug: string, locale: Locale): string {
  const base = localizeHref('/book', locale);
  const params = new URLSearchParams({ kind, item: itemSlug });
  return `${base}?${params.toString()}`;
}
