/**
 * Canonical travel regions used for catalog filters.
 * Region = where the trip/hotel/flight arrives (destination), not departure city.
 */
export const CATALOG_REGIONS = [
  'europe',
  'middle-east',
  'africa',
  'asia',
  'americas',
  'oceania',
] as const;

export type CatalogRegion = (typeof CATALOG_REGIONS)[number];

/** ISO-style country name → catalog region (OTA / UNWTO conventions). */
export const COUNTRY_TO_REGION: Record<string, CatalogRegion> = {
  Italy: 'europe',
  'United Kingdom': 'europe',
  Greece: 'europe',
  Japan: 'asia',
  Indonesia: 'asia',
  Iceland: 'europe',
  Morocco: 'africa',
  'Argentina & Chile': 'americas',
  Argentina: 'americas',
  France: 'europe',
  'United Arab Emirates': 'middle-east',
  'South Africa': 'africa',
  Australia: 'oceania',
  'United States': 'americas',
  Spain: 'europe',
  Netherlands: 'europe',
  Egypt: 'middle-east',
  'South Korea': 'asia',
  Singapore: 'asia',
  Turkey: 'middle-east',
  'Multi-country (Europe)': 'europe',
};

export const DESTINATION_CATEGORIES = [
  'beach',
  'city',
  'adventure',
  'cultural',
  'romantic',
] as const;

export type DestinationCategory = (typeof DESTINATION_CATEGORIES)[number];

/** Suggested primary trip type per destination slug. */
export const DESTINATION_CATEGORY_BY_SLUG: Record<string, DestinationCategory> = {
  rome: 'cultural',
  london: 'city',
  'full-europe': 'cultural',
  santorini: 'romantic',
  kyoto: 'cultural',
  bali: 'beach',
  iceland: 'adventure',
  marrakech: 'cultural',
  patagonia: 'adventure',
  paris: 'romantic',
  dubai: 'city',
  'cape-town': 'city',
  sydney: 'city',
  'new-york': 'city',
  barcelona: 'city',
  amsterdam: 'city',
  cairo: 'cultural',
  seoul: 'city',
};

export function regionForCountry(country: string): CatalogRegion {
  const region = COUNTRY_TO_REGION[country];
  if (!region) {
    throw new Error(`No catalog region mapped for country: ${country}`);
  }
  return region;
}

export function sortRegions(regions: string[]): string[] {
  const order = new Map(CATALOG_REGIONS.map((region, index) => [region, index]));
  return [...regions].sort((a, b) => (order.get(a as CatalogRegion) ?? 99) - (order.get(b as CatalogRegion) ?? 99));
}
