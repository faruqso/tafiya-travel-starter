/**
 * Catalog filter schema — every listing item in src/data/catalog.ts carries these fields.
 *
 * Shared (all kinds):
 * - slug          → URL segment (/destinations/rome)
 * - country       → canonical country name (e.g. United Kingdom, Egypt)
 * - region        → filter region derived from country (see catalog-regions.ts)
 * - priceValue    → numeric value used for sort + max-price slider
 * - rating        → 0–5, used for “Top rated” sort
 * - featured      → boolean, used for default “Featured” sort
 *
 * Destinations only:
 * - category      → beach | city | adventure | cultural | romantic (one primary trip type)
 *
 * Hotels only:
 * - city          → property city
 * - stars         → 3 | 4 | 5 (filter “N+ stars” means stars >= N)
 *
 * Flights only:
 * - cabin         → economy | premium | business
 * - originCountry / destinationCountry → real endpoints
 * - originRegion  → departure region (shown on detail; not used for region filter)
 * - region        → arrival destination region (used for “Region” filter)
 */

export {
  CATALOG_REGIONS,
  DESTINATION_CATEGORIES,
  type CatalogRegion,
  type DestinationCategory,
} from './catalog-regions';

export const FLIGHT_CABINS = ['economy', 'premium', 'business'] as const;
export type FlightCabin = (typeof FLIGHT_CABINS)[number];
