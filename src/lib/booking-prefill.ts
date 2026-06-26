import type { CatalogKind } from '../data/catalog';
import type { BookingCatalog, BookingCatalogItem } from './booking-catalog';

const catalogKinds: CatalogKind[] = ['destinations', 'hotels', 'flights'];

export function parseCatalogKind(value: string | null): CatalogKind | null {
  if (value === 'destinations' || value === 'hotels' || value === 'flights') {
    return value;
  }
  return null;
}

export function findCatalogItem(
  catalog: BookingCatalog,
  kind: CatalogKind,
  slug: string,
): BookingCatalogItem | null {
  return catalog[kind].find((entry) => entry.slug === slug) ?? null;
}

/** Resolve trip type + item from ?kind=&item= query params. */
export function resolveBookingPrefill(
  catalog: BookingCatalog,
  searchParams: URLSearchParams,
): { kind: CatalogKind; item: BookingCatalogItem | null } {
  const itemSlug = searchParams.get('item')?.trim() ?? '';
  const kindParam = parseCatalogKind(searchParams.get('kind'));

  if (itemSlug) {
    for (const kind of catalogKinds) {
      const item = findCatalogItem(catalog, kind, itemSlug);
      if (item) {
        return { kind, item };
      }
    }
  }

  const kind = kindParam ?? 'destinations';
  const item = itemSlug ? findCatalogItem(catalog, kind, itemSlug) : null;
  return { kind, item };
}

export const bookingKindLabels: Record<CatalogKind, string> = {
  destinations: 'Destination package',
  hotels: 'Hotel stay',
  flights: 'Flight',
};
