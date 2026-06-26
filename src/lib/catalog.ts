import type { CatalogItem, CatalogKind, DestinationItem, FlightItem, HotelItem } from '../data/catalog';
import type { Locale } from '../config/locales';
import { getCatalogItems } from './catalog-reader';
import { getCatalogLabels } from '../i18n/catalog';
import { getCatalogItemPath } from './catalog-routes';

export function getItemMeta(item: CatalogItem, locale: Locale) {
  const labels = getCatalogLabels(locale);

  if (item.kind === 'destinations') {
    const dest = item as DestinationItem;
    return {
      subtitle: `${dest.country} · ${dest.duration}`,
      badge: labels.categories[dest.category] ?? dest.category,
    };
  }

  if (item.kind === 'hotels') {
    const hotel = item as HotelItem;
    return {
      subtitle: `${hotel.city}, ${hotel.country}`,
      badge: labels.regions[hotel.region] ?? hotel.region,
    };
  }

  const flight = item as FlightItem;
  return {
    subtitle: `${flight.route} · ${flight.airline}`,
    badge: labels.cabins[flight.cabin] ?? flight.cabin,
  };
}

function buildSearchText(item: CatalogItem, labels: ReturnType<typeof getCatalogLabels>) {
  const parts = [item.name, item.country, item.description, labels.regions[item.region]];

  if (item.kind === 'destinations') {
    parts.push(item.duration, labels.categories[item.category], item.category);
  } else if (item.kind === 'hotels') {
    parts.push(item.city);
  } else {
    parts.push(item.route, item.airline, item.originCountry, item.destinationCountry);
  }

  return parts.filter(Boolean).join(' ').toLowerCase();
}

export async function serializeCatalogItems(kind: CatalogKind, locale: Locale) {
  const labels = getCatalogLabels(locale);
  const items = await getCatalogItems(kind, locale);

  return items.map((item) => ({
    slug: item.slug,
    name: item.name,
    country: item.country,
    image: item.image,
    priceFrom: item.priceFrom,
    priceValue: item.priceValue,
    rating: item.rating,
    region: item.region,
    regionLabel: labels.regions[item.region] ?? item.region,
    featured: item.featured ?? false,
    href: getCatalogItemPath(kind, item.slug, locale),
    kind: item.kind,
    searchText: buildSearchText(item, labels),
    ...(item.kind === 'destinations'
      ? {
          category: item.category,
          durationDays: item.durationDays,
          badge: labels.categories[item.category] ?? item.category,
          subtitle: `${item.country} · ${item.duration}`,
        }
      : {}),
    ...(item.kind === 'hotels'
      ? {
          stars: item.stars,
          badge: labels.regions[item.region] ?? item.region,
          subtitle: `${item.city}, ${item.country}`,
        }
      : {}),
    ...(item.kind === 'flights'
      ? {
          cabin: item.cabin,
          stops: item.stops,
          badge: labels.cabins[item.cabin] ?? item.cabin,
          subtitle: `${item.route} · ${item.airline}`,
          originRegion: item.originRegion,
          destinationCountry: item.destinationCountry,
        }
      : {}),
  }));
}
