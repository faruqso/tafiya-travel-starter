import type {
  CatalogItem,
  CatalogKind,
  DestinationItem,
  FlightItem,
  HotelItem,
} from '../data/catalog';
import { regionForCountry } from '../data/catalog-regions';
import type { Locale } from '../config/locales';
import {
  resolveCatalogItem,
  type CatalogLocaleCopy,
  type CatalogTranslations,
} from './catalog-i18n';
import {
  catalogMasterCollectionKeys,
  catalogTranslationLocales,
  getCatalogCollectionKey,
} from './catalog-collections';
import { reader } from './keystatic-reader';

interface CachedCatalogEntry {
  base: CatalogItem;
  translations?: CatalogTranslations;
}

function requireString(value: string | null | undefined, field: string, slug: string) {
  if (!value?.trim()) {
    throw new Error(`catalog/${slug}: missing required field "${field}"`);
  }
  return value.trim();
}

function cleanLocaleCopy(raw: CatalogLocaleCopy | null | undefined): CatalogLocaleCopy | undefined {
  if (!raw) return undefined;

  const copy: CatalogLocaleCopy = {};

  for (const field of [
    'name',
    'country',
    'city',
    'route',
    'airline',
    'duration',
    'description',
    'priceFrom',
  ] as const) {
    const value = raw[field];
    if (typeof value === 'string' && value.trim()) copy[field] = value.trim();
  }

  for (const field of ['highlights', 'amenities'] as const) {
    const value = raw[field];
    if (value?.length) {
      copy[field] = value.filter((item): item is string => Boolean(item?.trim())).map((item) => item.trim());
    }
  }

  return Object.keys(copy).length ? copy : undefined;
}

function mapShared(entry: {
  slug: string | null;
  name: string | null;
  country: string | null;
  image: string | null;
  priceFrom: string | null;
  priceValue: number | null;
  rating: number | null;
  region: string | null;
  featured?: boolean | null;
  description: string | null;
  highlights?: readonly (string | null)[] | null;
}) {
  const slug = requireString(entry.slug, 'slug', entry.slug ?? 'unknown');

  return {
    slug,
    name: requireString(entry.name, 'name', slug),
    country: requireString(entry.country, 'country', slug),
    image: requireString(entry.image, 'image', slug),
    priceFrom: requireString(entry.priceFrom, 'priceFrom', slug),
    priceValue: Number(entry.priceValue ?? 0),
    rating: Number(entry.rating ?? 0),
    region: requireString(entry.region, 'region', slug) as CatalogItem['region'],
    featured: entry.featured ?? false,
    description: requireString(entry.description, 'description', slug),
    highlights: (entry.highlights ?? []).filter((item): item is string => Boolean(item?.trim())),
  };
}

function mapDestination(
  entry: NonNullable<Awaited<ReturnType<typeof reader.collections.catalogDestinationsEN.read>>>,
): CatalogItem {
  const shared = mapShared(entry);

  return {
    kind: 'destinations',
    ...shared,
    duration: requireString(entry.duration, 'duration', shared.slug),
    durationDays: Number(entry.durationDays ?? 0),
    category: requireString(entry.category, 'category', shared.slug) as DestinationItem['category'],
  };
}

function mapHotel(
  entry: NonNullable<Awaited<ReturnType<typeof reader.collections.catalogHotelsEN.read>>>,
): CatalogItem {
  const shared = mapShared(entry);

  return {
    kind: 'hotels',
    ...shared,
    city: requireString(entry.city, 'city', shared.slug),
    stars: Number(entry.stars ?? 0),
    amenities: (entry.amenities ?? []).filter((item): item is string => Boolean(item?.trim())),
  };
}

function mapFlight(
  entry: NonNullable<Awaited<ReturnType<typeof reader.collections.catalogFlightsEN.read>>>,
): CatalogItem {
  const shared = mapShared(entry);

  return {
    kind: 'flights',
    ...shared,
    route: requireString(entry.route, 'route', shared.slug),
    airline: requireString(entry.airline, 'airline', shared.slug),
    duration: requireString(entry.duration, 'duration', shared.slug),
    stops: Number(entry.stops ?? 0),
    cabin: requireString(entry.cabin, 'cabin', shared.slug) as FlightItem['cabin'],
    originCountry: requireString(entry.originCountry, 'originCountry', shared.slug),
    destinationCountry: requireString(entry.destinationCountry, 'destinationCountry', shared.slug),
    originRegion: requireString(entry.originRegion, 'originRegion', shared.slug) as FlightItem['originRegion'],
  };
}

function mapMasterEntry(
  kind: CatalogKind,
  entry: NonNullable<
    Awaited<
      ReturnType<
        | typeof reader.collections.catalogDestinationsEN.read
        | typeof reader.collections.catalogHotelsEN.read
        | typeof reader.collections.catalogFlightsEN.read
      >
    >
  >,
): CatalogItem {
  switch (kind) {
    case 'destinations':
      return mapDestination(entry as NonNullable<Awaited<ReturnType<typeof reader.collections.catalogDestinationsEN.read>>>);
    case 'hotels':
      return mapHotel(entry as NonNullable<Awaited<ReturnType<typeof reader.collections.catalogHotelsEN.read>>>);
    case 'flights':
      return mapFlight(entry as NonNullable<Awaited<ReturnType<typeof reader.collections.catalogFlightsEN.read>>>);
    default:
      throw new Error(`Unknown catalog kind: ${kind satisfies never}`);
  }
}

async function loadTranslationsForKind(kind: CatalogKind): Promise<Map<string, CatalogTranslations>> {
  const bySlug = new Map<string, CatalogTranslations>();

  for (const locale of catalogTranslationLocales) {
    const collectionKey = getCatalogCollectionKey(kind, locale);
    const slugs = await reader.collections[collectionKey].list();

    await Promise.all(
      slugs.map(async (slug) => {
        const entry = await reader.collections[collectionKey].read(slug);
        if (!entry) return;

        const copy = cleanLocaleCopy(entry as CatalogLocaleCopy);
        if (!copy) return;

        const existing = bySlug.get(slug) ?? {};
        existing[locale] = copy;
        bySlug.set(slug, existing);
      }),
    );
  }

  return bySlug;
}

export function validateCatalogData(items: CatalogItem[]) {
  for (const item of items) {
    const expected = regionForCountry(item.country);
    if (item.region !== expected) {
      throw new Error(
        `${item.kind}/${item.slug}: region "${item.region}" does not match country "${item.country}" (expected "${expected}")`,
      );
    }

    if (item.kind === 'flights') {
      const expectedOrigin = regionForCountry(item.originCountry);
      if (item.originRegion !== expectedOrigin) {
        throw new Error(
          `${item.slug}: originRegion "${item.originRegion}" does not match origin "${item.originCountry}"`,
        );
      }
      const expectedDestination = regionForCountry(item.destinationCountry);
      if (item.region !== expectedDestination) {
        throw new Error(
          `${item.slug}: region "${item.region}" does not match destination "${item.destinationCountry}"`,
        );
      }
    }
  }
}

async function readCollection(kind: CatalogKind): Promise<CachedCatalogEntry[]> {
  const masterKey = catalogMasterCollectionKeys[kind];
  const slugs = await reader.collections[masterKey].list();
  const translationsBySlug = await loadTranslationsForKind(kind);

  const items = await Promise.all(
    slugs.map(async (slug) => {
      const entry = await reader.collections[masterKey].read(slug);
      if (!entry) return null;

      return {
        base: mapMasterEntry(kind, entry),
        translations: translationsBySlug.get(slug),
      } satisfies CachedCatalogEntry;
    }),
  );

  const resolved = items.filter((item): item is CachedCatalogEntry => item !== null);

  for (const [slug] of translationsBySlug) {
    if (!slugs.includes(slug)) {
      console.warn(`[catalog] ${kind}/${slug}: translation file exists without an English master — ignored`);
    }
  }

  return resolved;
}

let catalogCache: Partial<Record<CatalogKind, CachedCatalogEntry[]>> | null = null;

async function loadAllCatalogKinds() {
  if (catalogCache) return catalogCache;

  const [destinations, hotels, flights] = await Promise.all([
    readCollection('destinations'),
    readCollection('hotels'),
    readCollection('flights'),
  ]);

  catalogCache = { destinations, hotels, flights };
  validateCatalogData([
    ...destinations.map((entry) => entry.base),
    ...hotels.map((entry) => entry.base),
    ...flights.map((entry) => entry.base),
  ]);
  return catalogCache;
}

function resolveEntries(entries: CachedCatalogEntry[], locale: Locale): CatalogItem[] {
  return entries.map((entry) => resolveCatalogItem(entry.base, entry.translations, locale));
}

export async function getCatalogItems(kind: CatalogKind, locale: Locale = 'en'): Promise<CatalogItem[]> {
  const cache = await loadAllCatalogKinds();
  const entries = cache[kind] ?? [];
  return resolveEntries(entries, locale);
}

export async function getAllCatalogItems(locale: Locale = 'en'): Promise<CatalogItem[]> {
  const cache = await loadAllCatalogKinds();
  return [
    ...resolveEntries(cache.destinations ?? [], locale),
    ...resolveEntries(cache.hotels ?? [], locale),
    ...resolveEntries(cache.flights ?? [], locale),
  ];
}

export async function getCatalogItem(
  kind: CatalogKind,
  slug: string,
  locale: Locale = 'en',
): Promise<CatalogItem | undefined> {
  const items = await getCatalogItems(kind, locale);
  return items.find((item) => item.slug === slug);
}

/** Clear in-memory cache (useful in dev after CMS edits). */
export function clearCatalogCache() {
  catalogCache = null;
}

export type { CatalogKind } from '../data/catalog';
