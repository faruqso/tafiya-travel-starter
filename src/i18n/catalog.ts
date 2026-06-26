import type { Locale } from '../config/locales';

export const catalogLabels: Record<
  Locale,
  {
    filterTitle: string;
    sortLabel: string;
    regionLabel: string;
    priceLabel: string;
    categoryLabel: string;
    starsLabel: string;
    cabinLabel: string;
    viewLabel: string;
    viewOptions: {
      'grid-2': string;
      'grid-3': string;
      'grid-4': string;
      list: string;
      compact: string;
    };
    sortOptions: Record<string, string>;
    regions: Record<string, string>;
    categories: Record<string, string>;
    cabins: Record<string, string>;
    showing: string;
    of: string;
    results: string;
    filtersOnly: string;
    clearAll: string;
    noResults: string;
    searchLabel: string;
    clearSearch: string;
    closeFilters: string;
    closeDialog: string;
    removeFilter: string;
    perPage: string;
    openFilters: string;
    applyFilters: string;
    resetFilters: string;
    starsShort: string;
    prev: string;
    next: string;
    bookNow: string;
    viewDetails: string;
    highlights: string;
    related: string;
    from: string;
    destinations: { title: string; eyebrow: string; description: string; searchPlaceholder: string };
    hotels: { title: string; eyebrow: string; description: string; searchPlaceholder: string };
    flights: { title: string; eyebrow: string; description: string; searchPlaceholder: string };
  }
> = {
  en: {
    filterTitle: 'Filter & sort',
    sortLabel: 'Sort by',
    viewLabel: 'View',
    viewOptions: {
      'grid-2': '2 columns',
      'grid-3': '3 columns',
      'grid-4': '4 columns',
      list: 'List',
      compact: 'Compact',
    },
    regionLabel: 'Region',
    priceLabel: 'Max price',
    categoryLabel: 'Trip type',
    starsLabel: 'Star rating',
    cabinLabel: 'Cabin class',
    sortOptions: {
      featured: 'Featured',
      'price-asc': 'Price: low to high',
      'price-desc': 'Price: high to low',
      rating: 'Top rated',
      name: 'Name A–Z',
    },
    regions: {
      europe: 'Europe',
      asia: 'Asia',
      americas: 'Americas',
      africa: 'Africa',
      oceania: 'Oceania',
      'middle-east': 'Middle East',
    },
    categories: {
      beach: 'Beach',
      city: 'City',
      adventure: 'Adventure',
      cultural: 'Cultural',
      romantic: 'Romantic',
    },
    cabins: {
      economy: 'Economy',
      premium: 'Premium',
      business: 'Business',
    },
    showing: 'Showing',
    of: 'of',
    results: 'results',
    filtersOnly: 'Filters',
    clearAll: 'Clear all',
    searchLabel: 'Search',
    clearSearch: 'Clear search',
    closeFilters: 'Close filters',
    closeDialog: 'Close',
    removeFilter: 'Remove',
    noResults: 'No results match your filters.',
    perPage: 'per page',
    openFilters: 'Filter & sort',
    applyFilters: 'Show results',
    resetFilters: 'Reset all',
    starsShort: 'stars',
    prev: 'Previous',
    next: 'Next',
    bookNow: 'Book now',
    viewDetails: 'View details',
    highlights: 'Trip highlights',
    related: 'You may also like',
    from: 'From',
    destinations: {
      title: 'All destinations',
      eyebrow: 'Top selling',
      description: 'Hand-picked itineraries with transparent pricing and local guides in every city.',
      searchPlaceholder: 'Search destinations, countries…',
    },
    hotels: {
      title: 'Hotels & stays',
      eyebrow: 'Boutique collection',
      description: 'Curated hotels with verified reviews, flexible cancellation, and member perks.',
      searchPlaceholder: 'Search hotels, cities…',
    },
    flights: {
      title: 'Flights',
      eyebrow: 'Best fares',
      description: 'Compare airlines, cabin classes, and routes with tafiya price protection.',
      searchPlaceholder: 'Search routes, airlines…',
    },
  },
  fr: {
    filterTitle: 'Filtrer et trier',
    sortLabel: 'Trier par',
    viewLabel: 'Affichage',
    viewOptions: {
      'grid-2': '2 colonnes',
      'grid-3': '3 colonnes',
      'grid-4': '4 colonnes',
      list: 'Liste',
      compact: 'Compact',
    },
    regionLabel: 'Région',
    priceLabel: 'Prix max',
    categoryLabel: 'Type de voyage',
    starsLabel: 'Étoiles',
    cabinLabel: 'Classe',
    sortOptions: {
      featured: 'En vedette',
      'price-asc': 'Prix croissant',
      'price-desc': 'Prix décroissant',
      rating: 'Mieux notés',
      name: 'Nom A–Z',
    },
    regions: {
      europe: 'Europe',
      asia: 'Asie',
      americas: 'Amériques',
      africa: 'Afrique',
      oceania: 'Océanie',
      'middle-east': 'Moyen-Orient',
    },
    categories: {
      beach: 'Plage',
      city: 'Ville',
      adventure: 'Aventure',
      cultural: 'Culturel',
      romantic: 'Romantique',
    },
    cabins: {
      economy: 'Économique',
      premium: 'Premium',
      business: 'Affaires',
    },
    showing: 'Affichage',
    of: 'sur',
    results: 'résultats',
    filtersOnly: 'Filtres',
    clearAll: 'Tout effacer',
    searchLabel: 'Rechercher',
    clearSearch: 'Effacer la recherche',
    closeFilters: 'Fermer les filtres',
    closeDialog: 'Fermer',
    removeFilter: 'Retirer',
    noResults: 'Aucun résultat ne correspond à vos filtres.',
    perPage: 'par page',
    openFilters: 'Filtrer et trier',
    applyFilters: 'Afficher les résultats',
    resetFilters: 'Tout réinitialiser',
    starsShort: 'étoiles',
    prev: 'Précédent',
    next: 'Suivant',
    bookNow: 'Réserver',
    viewDetails: 'Voir les détails',
    highlights: 'Points forts',
    related: 'Vous aimerez aussi',
    from: 'À partir de',
    destinations: {
      title: 'Toutes les destinations',
      eyebrow: 'Meilleures ventes',
      description: 'Itinéraires sélectionnés avec tarifs transparents et guides locaux.',
      searchPlaceholder: 'Rechercher destinations, pays…',
    },
    hotels: {
      title: 'Hôtels et séjours',
      eyebrow: 'Collection boutique',
      description: 'Hôtels sélectionnés avec avis vérifiés et annulation flexible.',
      searchPlaceholder: 'Rechercher hôtels, villes…',
    },
    flights: {
      title: 'Vols',
      eyebrow: 'Meilleurs tarifs',
      description: 'Comparez compagnies, classes et itinéraires avec protection tarifaire tafiya.',
      searchPlaceholder: 'Rechercher routes, compagnies…',
    },
  },
  de: {
    filterTitle: 'Filtern & sortieren',
    sortLabel: 'Sortieren nach',
    viewLabel: 'Ansicht',
    viewOptions: {
      'grid-2': '2 Spalten',
      'grid-3': '3 Spalten',
      'grid-4': '4 Spalten',
      list: 'Liste',
      compact: 'Kompakt',
    },
    regionLabel: 'Region',
    priceLabel: 'Max. Preis',
    categoryLabel: 'Reiseart',
    starsLabel: 'Sterne',
    cabinLabel: 'Kabinenklasse',
    sortOptions: {
      featured: 'Empfohlen',
      'price-asc': 'Preis aufsteigend',
      'price-desc': 'Preis absteigend',
      rating: 'Bestbewertet',
      name: 'Name A–Z',
    },
    regions: {
      europe: 'Europa',
      asia: 'Asien',
      americas: 'Amerika',
      africa: 'Afrika',
      oceania: 'Ozeanien',
      'middle-east': 'Naher Osten',
    },
    categories: {
      beach: 'Strand',
      city: 'Stadt',
      adventure: 'Abenteuer',
      cultural: 'Kultur',
      romantic: 'Romantisch',
    },
    cabins: {
      economy: 'Economy',
      premium: 'Premium',
      business: 'Business',
    },
    showing: 'Angezeigt',
    of: 'von',
    results: 'Ergebnissen',
    filtersOnly: 'Filter',
    clearAll: 'Alle löschen',
    searchLabel: 'Suchen',
    clearSearch: 'Suche löschen',
    closeFilters: 'Filter schließen',
    closeDialog: 'Schließen',
    removeFilter: 'Entfernen',
    noResults: 'Keine Ergebnisse für Ihre Filter.',
    perPage: 'pro Seite',
    openFilters: 'Filtern & sortieren',
    applyFilters: 'Ergebnisse anzeigen',
    resetFilters: 'Zurücksetzen',
    starsShort: 'Sterne',
    prev: 'Zurück',
    next: 'Weiter',
    bookNow: 'Jetzt buchen',
    viewDetails: 'Details ansehen',
    highlights: 'Reise-Highlights',
    related: 'Das könnte Ihnen gefallen',
    from: 'Ab',
    destinations: {
      title: 'Alle Reiseziele',
      eyebrow: 'Bestseller',
      description: 'Ausgewählte Routen mit transparenten Preisen und lokalen Guides.',
      searchPlaceholder: 'Reiseziele, Länder suchen…',
    },
    hotels: {
      title: 'Hotels & Unterkünfte',
      eyebrow: 'Boutique-Auswahl',
      description: 'Kuratierte Hotels mit verifizierten Bewertungen und flexibler Stornierung.',
      searchPlaceholder: 'Hotels, Städte suchen…',
    },
    flights: {
      title: 'Flüge',
      eyebrow: 'Beste Tarife',
      description: 'Vergleichen Sie Airlines, Kabinen und Routen mit tafiya-Preisschutz.',
      searchPlaceholder: 'Routen, Airlines suchen…',
    },
  },
  ar: {
    filterTitle: 'تصفية وترتيب',
    sortLabel: 'ترتيب حسب',
    viewLabel: 'العرض',
    viewOptions: {
      'grid-2': 'عمودان',
      'grid-3': '3 أعمدة',
      'grid-4': '4 أعمدة',
      list: 'قائمة',
      compact: 'مدمج',
    },
    regionLabel: 'المنطقة',
    priceLabel: 'الحد الأقصى للسعر',
    categoryLabel: 'نوع الرحلة',
    starsLabel: 'تصنيف النجوم',
    cabinLabel: 'درجة المقصورة',
    sortOptions: {
      featured: 'مميز',
      'price-asc': 'السعر: من الأقل',
      'price-desc': 'السعر: من الأعلى',
      rating: 'الأعلى تقييماً',
      name: 'الاسم أ–ي',
    },
    regions: {
      europe: 'أوروبا',
      asia: 'آسيا',
      americas: 'الأمريكتان',
      africa: 'أفريقيا',
      oceania: 'أوقيانوسيا',
      'middle-east': 'الشرق الأوسط',
    },
    categories: {
      beach: 'شاطئ',
      city: 'مدينة',
      adventure: 'مغامرة',
      cultural: 'ثقافي',
      romantic: 'رومانسي',
    },
    cabins: {
      economy: 'اقتصادية',
      premium: 'مميزة',
      business: 'رجال أعمال',
    },
    showing: 'عرض',
    of: 'من',
    results: 'نتيجة',
    filtersOnly: 'الفلاتر',
    clearAll: 'مسح الكل',
    searchLabel: 'بحث',
    clearSearch: 'مسح البحث',
    closeFilters: 'إغلاق الفلاتر',
    closeDialog: 'إغلاق',
    removeFilter: 'إزالة',
    noResults: 'لا توجد نتائج تطابق الفلاتر.',
    perPage: 'لكل صفحة',
    openFilters: 'تصفية وترتيب',
    applyFilters: 'عرض النتائج',
    resetFilters: 'إعادة تعيين',
    starsShort: 'نجوم',
    prev: 'السابق',
    next: 'التالي',
    bookNow: 'احجز الآن',
    viewDetails: 'عرض التفاصيل',
    highlights: 'أبرز المعالم',
    related: 'قد يعجبك أيضاً',
    from: 'من',
    destinations: {
      title: 'جميع الوجهات',
      eyebrow: 'الأكثر مبيعاً',
      description: 'برامج مختارة بأسعار شفافة ومرشدين محليين في كل مدينة.',
      searchPlaceholder: 'ابحث عن وجهات، دول…',
    },
    hotels: {
      title: 'الفنادق والإقامات',
      eyebrow: 'مجموعة بوتيك',
      description: 'فنادق مختارة بتقييمات موثقة وإلغاء مرن.',
      searchPlaceholder: 'ابحث عن فنادق، مدن…',
    },
    flights: {
      title: 'الرحلات',
      eyebrow: 'أفضل الأسعار',
      description: 'قارن شركات الطيران والدرجات والمسارات مع حماية أسعار tafiya.',
      searchPlaceholder: 'ابحث عن مسارات، شركات…',
    },
  },
};

export function getCatalogLabels(locale: Locale) {
  return catalogLabels[locale] ?? catalogLabels.en;
}
