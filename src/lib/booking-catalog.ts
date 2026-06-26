import { getCatalogItems, type CatalogKind } from './catalog-reader';
import { getCatalogLabels } from '../i18n/catalog';
import type { Locale } from '../config/locales';

export type BookingCatalogItem = {
  slug: string;
  name: string;
  priceFrom: string;
  priceValue: number;
  subtitle: string;
  badge: string;
  region: string;
};

export type BookingCatalog = Record<CatalogKind, BookingCatalogItem[]>;

export async function serializeBookingCatalog(locale: Locale): Promise<BookingCatalog> {
  const labels = getCatalogLabels(locale);

  const [destinations, hotels, flights] = await Promise.all([
    getCatalogItems('destinations', locale),
    getCatalogItems('hotels', locale),
    getCatalogItems('flights', locale),
  ]);

  return {
    destinations: destinations.map((item) => ({
      slug: item.slug,
      name: item.name,
      priceFrom: item.priceFrom,
      priceValue: item.priceValue,
      subtitle: `${item.country} · ${item.duration}`,
      badge: labels.categories[item.category] ?? item.category,
      region: labels.regions[item.region] ?? item.region,
      durationDays: item.durationDays,
    })),
    hotels: hotels.map((item) => ({
      slug: item.slug,
      name: item.name,
      priceFrom: item.priceFrom,
      priceValue: item.priceValue,
      subtitle: `${item.city}, ${item.country}`,
      badge: labels.regions[item.region] ?? item.region,
      region: labels.regions[item.region] ?? item.region,
    })),
    flights: flights.map((item) => ({
      slug: item.slug,
      name: item.name,
      priceFrom: item.priceFrom,
      priceValue: item.priceValue,
      subtitle: `${item.route} · arrives ${item.destinationCountry}`,
      badge: labels.cabins[item.cabin] ?? item.cabin,
      region: labels.regions[item.region] ?? item.region,
    })),
  };
}
