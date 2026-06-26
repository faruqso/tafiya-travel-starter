import type { CatalogRegion, DestinationCategory } from './catalog-regions';

export type CatalogKind = 'destinations' | 'hotels' | 'flights';

export interface CatalogItemBase {
  slug: string;
  name: string;
  country: string;
  image: string;
  priceFrom: string;
  priceValue: number;
  rating: number;
  region: CatalogRegion;
  featured?: boolean;
  description: string;
  highlights: string[];
}

export interface DestinationItem extends CatalogItemBase {
  kind: 'destinations';
  duration: string;
  durationDays: number;
  category: DestinationCategory;
}

export interface HotelItem extends CatalogItemBase {
  kind: 'hotels';
  city: string;
  stars: number;
  amenities: string[];
}

export interface FlightItem extends CatalogItemBase {
  kind: 'flights';
  route: string;
  airline: string;
  duration: string;
  stops: number;
  cabin: 'economy' | 'premium' | 'business';
  originCountry: string;
  destinationCountry: string;
  originRegion: CatalogRegion;
}

export type CatalogItem = DestinationItem | HotelItem | FlightItem;
