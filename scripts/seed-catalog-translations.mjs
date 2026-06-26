#!/usr/bin/env node
/**
 * Seed French, German, and Arabic translation files for catalog items.
 * Reads English masters from content/catalog/{kind}/en/ and writes locale copy files.
 *
 * Usage: node scripts/seed-catalog-translations.mjs
 */

import { mkdirSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';
import { buildCatalogTranslations } from './catalog-translations-data.mjs';

const root = resolve(import.meta.dirname, '..');
const catalogDir = resolve(root, 'content/catalog');
const kinds = ['destinations', 'hotels', 'flights'];
const translationLocales = ['fr', 'de', 'ar'];

function stripEmpty(value) {
  if (value == null) return undefined;
  if (typeof value === 'string') return value.trim() ? value.trim() : undefined;
  if (Array.isArray(value)) {
    const cleaned = value.map((item) => (typeof item === 'string' ? item.trim() : item)).filter(Boolean);
    return cleaned.length ? cleaned : undefined;
  }
  return value;
}

function cleanTranslationCopy(raw) {
  if (!raw || typeof raw !== 'object') return undefined;

  const copy = {};
  for (const field of [
    'name',
    'country',
    'city',
    'route',
    'airline',
    'duration',
    'description',
    'priceFrom',
    'highlights',
    'amenities',
  ]) {
    const value = stripEmpty(raw[field]);
    if (value !== undefined) copy[field] = value;
  }

  return Object.keys(copy).length ? copy : undefined;
}

let updated = 0;

for (const kind of kinds) {
  const enDir = join(catalogDir, kind, 'en');
  const enFiles = readdirSync(enDir).filter((file) => file.endsWith('.yaml'));

  for (const file of enFiles) {
    const filePath = join(enDir, file);
    const item = parseYaml(readFileSync(filePath, 'utf8'));
    const slug = item.slug ?? file.replace(/\.yaml$/, '');
    const translations = buildCatalogTranslations(item);

    for (const locale of translationLocales) {
      const copy = cleanTranslationCopy(translations[locale]);
      if (!copy) continue;

      const localeDir = join(catalogDir, kind, locale);
      mkdirSync(localeDir, { recursive: true });
      writeFileSync(
        join(localeDir, `${slug}.yaml`),
        stringifyYaml({ slug, ...copy }, { lineWidth: 0 }),
        'utf8',
      );
      updated += 1;
    }
  }
}

console.log(`Updated ${updated} catalog translation file${updated === 1 ? '' : 's'}.`);
