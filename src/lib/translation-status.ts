import { readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { locales, type Locale } from '../config/locales';
import { catalogKinds, getCatalogContentDir } from './catalog-collections';
import type { CatalogKind } from '../data/catalog';

export interface PageTranslationRow {
  slug: string;
  locales: Record<Locale, 'present' | 'missing'>;
}

export interface SiteTranslationRow {
  locale: Locale;
  status: 'present' | 'missing';
}

const contentRoot = join(process.cwd(), 'content');
export function getPageTranslationStatus(): PageTranslationRow[] {
  return getDiscoveredPageSlugs().map((slug) => {
    const localeStatus = Object.fromEntries(
      locales.map(({ code }) => {
        const path = join(contentRoot, 'pages', code, `${slug}.yaml`);
        return [code, existsSync(path) ? 'present' : 'missing'] as const;
      }),
    ) as Record<Locale, 'present' | 'missing'>;

    return { slug, locales: localeStatus };
  });
}

export function getSiteTranslationStatus(): SiteTranslationRow[] {
  return locales.map(({ code }) => {
    const path = join(contentRoot, 'site', `${code}.yaml`);
    return { locale: code, status: existsSync(path) ? 'present' : 'missing' };
  });
}

export function getDiscoveredPageSlugs(): string[] {
  const enDir = join(contentRoot, 'pages', 'en');
  if (!existsSync(enDir)) return [];
  return readdirSync(enDir)
    .filter((file) => file.endsWith('.yaml'))
    .map((file) => file.replace(/\.yaml$/, ''))
    .sort();
}

export interface CatalogTranslationRow {
  kind: CatalogKind;
  slug: string;
  locales: Record<Locale, 'present' | 'missing'>;
}

function getCatalogSlugs(kind: CatalogKind): string[] {
  const enDir = join(contentRoot, getCatalogContentDir(kind, 'en'));
  if (!existsSync(enDir)) return [];
  return readdirSync(enDir)
    .filter((file) => file.endsWith('.yaml'))
    .map((file) => file.replace(/\.yaml$/, ''))
    .sort();
}

export function getCatalogTranslationStatus(): Record<CatalogKind, CatalogTranslationRow[]> {
  return Object.fromEntries(
    catalogKinds.map((kind) => {
      const rows = getCatalogSlugs(kind).map((slug) => {
        const localeStatus = Object.fromEntries(
          locales.map(({ code }) => {
            const path = join(contentRoot, getCatalogContentDir(kind, code), `${slug}.yaml`);
            return [code, existsSync(path) ? 'present' : 'missing'] as const;
          }),
        ) as Record<Locale, 'present' | 'missing'>;

        return { kind, slug, locales: localeStatus };
      });

      return [kind, rows];
    }),
  ) as Record<CatalogKind, CatalogTranslationRow[]>;
}
