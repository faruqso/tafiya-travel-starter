export const defaultLocale = 'en' as const;

export const locales = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦', dir: 'rtl' as const },
] as const;

export type Locale = (typeof locales)[number]['code'];

export const localeCodes = locales.map((locale) => locale.code);

export function isLocale(value: string): value is Locale {
  return localeCodes.includes(value as Locale);
}

export const ui = {
  en: {
    login: 'Login',
    signup: 'Sign up',
    destinations: 'Desitnations',
    hotels: 'Hotels',
    flights: 'Flights',
    bookings: 'Bookings',
    selectLanguage: 'Select language',
  },
  fr: {
    login: 'Connexion',
    signup: "S'inscrire",
    destinations: 'Destinations',
    hotels: 'Hôtels',
    flights: 'Vols',
    bookings: 'Réservations',
    selectLanguage: 'Choisir la langue',
  },
  de: {
    login: 'Anmelden',
    signup: 'Registrieren',
    destinations: 'Reiseziele',
    hotels: 'Hotels',
    flights: 'Flüge',
    bookings: 'Buchungen',
    selectLanguage: 'Sprache wählen',
  },
  ar: {
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب',
    destinations: 'الوجهات',
    hotels: 'الفنادق',
    flights: 'الرحلات',
    bookings: 'الحجوزات',
    selectLanguage: 'اختر اللغة',
  },
} as const satisfies Record<Locale, Record<string, string>>;

const navLabelKeys: Record<string, keyof (typeof ui)['en']> = {
  desitnations: 'destinations',
  destinations: 'destinations',
  hotels: 'hotels',
  flights: 'flights',
  bookings: 'bookings',
};

export function getNavLabel(label: string, locale: Locale): string {
  const key = navLabelKeys[label.trim().toLowerCase()];
  return key ? ui[locale][key] : label;
}

export function getLocaleMeta(locale: Locale) {
  return locales.find((entry) => entry.code === locale) ?? locales[0];
}
