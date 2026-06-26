import type { Locale } from '../config/locales';
import type { CatalogKind } from '../data/catalog';

export const catalogKinds = ['destinations', 'hotels', 'flights'] as const satisfies readonly CatalogKind[];

export const catalogKindLabels: Record<CatalogKind, string> = {
  destinations: 'Destinations',
  hotels: 'Hotels',
  flights: 'Flights',
};

export const catalogLocaleSuffix: Record<Locale, string> = {
  en: 'EN',
  fr: 'FR',
  de: 'DE',
  ar: 'AR',
};

export type CatalogCollectionKey =
  | 'catalogDestinationsEN'
  | 'catalogDestinationsFR'
  | 'catalogDestinationsDE'
  | 'catalogDestinationsAR'
  | 'catalogHotelsEN'
  | 'catalogHotelsFR'
  | 'catalogHotelsDE'
  | 'catalogHotelsAR'
  | 'catalogFlightsEN'
  | 'catalogFlightsFR'
  | 'catalogFlightsDE'
  | 'catalogFlightsAR';

export function getCatalogCollectionKey(kind: CatalogKind, locale: Locale): CatalogCollectionKey {
  const kindName = catalogKindLabels[kind].replace(/\s+/g, '');
  return `catalog${kindName}${catalogLocaleSuffix[locale]}` as CatalogCollectionKey;
}

export const catalogMasterCollectionKeys: Record<CatalogKind, CatalogCollectionKey> = {
  destinations: 'catalogDestinationsEN',
  hotels: 'catalogHotelsEN',
  flights: 'catalogFlightsEN',
};

export const catalogTranslationLocales = ['fr', 'de', 'ar'] as const satisfies readonly Exclude<Locale, 'en'>[];

export function getCatalogContentDir(kind: CatalogKind, locale: Locale) {
  return `content/catalog/${kind}/${locale}`;
}
