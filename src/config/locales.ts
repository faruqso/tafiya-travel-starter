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
  en: { selectLanguage: 'Select language' },
  fr: { selectLanguage: 'Choisir la langue' },
  de: { selectLanguage: 'Sprache wählen' },
  ar: { selectLanguage: 'اختر اللغة' },
} as const satisfies Record<Locale, { selectLanguage: string }>;

export function getLocaleMeta(locale: Locale) {
  return locales.find((entry) => entry.code === locale) ?? locales[0];
}
