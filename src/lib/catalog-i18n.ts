import type { Locale } from '../config/locales';
import type { CatalogItem, DestinationItem, FlightItem, HotelItem } from '../data/catalog';

export type CatalogLocaleCopy = {
  name?: string | null;
  country?: string | null;
  city?: string | null;
  route?: string | null;
  airline?: string | null;
  duration?: string | null;
  description?: string | null;
  priceFrom?: string | null;
  highlights?: readonly (string | null)[] | null;
  amenities?: readonly (string | null)[] | null;
};

export type CatalogTranslations = Partial<Record<Exclude<Locale, 'en'>, CatalogLocaleCopy>>;

function pickString(base: string, locale: Locale, copy: CatalogLocaleCopy | undefined, field: keyof CatalogLocaleCopy) {
  if (locale === 'en' || !copy) return base;
  const value = copy[field];
  return typeof value === 'string' && value.trim() ? value.trim() : base;
}

function pickStringArray(
  base: string[],
  locale: Locale,
  copy: CatalogLocaleCopy | undefined,
  field: 'highlights' | 'amenities',
) {
  if (locale === 'en' || !copy) return base;
  const value = copy[field];
  if (!value?.length) return base;
  const cleaned = value.filter((item): item is string => Boolean(item?.trim())).map((item) => item.trim());
  return cleaned.length ? cleaned : base;
}

export function resolveCatalogItem(
  item: CatalogItem,
  translations: CatalogTranslations | undefined,
  locale: Locale,
): CatalogItem {
  if (locale === 'en') return item;

  const copy = translations?.[locale];
  if (!copy) return item;

  const shared = {
    ...item,
    name: pickString(item.name, locale, copy, 'name'),
    country: pickString(item.country, locale, copy, 'country'),
    description: pickString(item.description, locale, copy, 'description'),
    priceFrom: pickString(item.priceFrom, locale, copy, 'priceFrom'),
    highlights: pickStringArray(item.highlights, locale, copy, 'highlights'),
  };

  if (item.kind === 'destinations') {
    return {
      ...shared,
      kind: 'destinations',
      duration: pickString(item.duration, locale, copy, 'duration'),
      durationDays: item.durationDays,
      category: item.category,
    } satisfies DestinationItem;
  }

  if (item.kind === 'hotels') {
    return {
      ...shared,
      kind: 'hotels',
      city: pickString(item.city, locale, copy, 'city'),
      stars: item.stars,
      amenities: pickStringArray(item.amenities, locale, copy, 'amenities'),
    } satisfies HotelItem;
  }

  return {
    ...shared,
    kind: 'flights',
    route: pickString(item.route, locale, copy, 'route'),
    airline: pickString(item.airline, locale, copy, 'airline'),
    duration: pickString(item.duration, locale, copy, 'duration'),
    stops: item.stops,
    cabin: item.cabin,
    originCountry: item.originCountry,
    destinationCountry: pickString(item.destinationCountry, locale, copy, 'country'),
    originRegion: item.originRegion,
  } satisfies FlightItem;
}
