#!/usr/bin/env node
/**
 * Apply French, German, and Arabic page copy onto English YAML structure.
 * Usage: node scripts/seed-page-translations.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';
import { pageTranslationOverrides } from './page-translations-data.mjs';

const root = resolve(import.meta.dirname, '..');
const locales = ['fr', 'de', 'ar'];

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function deepMerge(base, override) {
  if (override === undefined || override === null) return base;
  if (Array.isArray(override)) {
    return override.map((item, index) => {
      if (isPlainObject(item) && isPlainObject(base?.[index])) {
        return deepMerge(base[index], item);
      }
      return item ?? base?.[index];
    });
  }
  if (isPlainObject(override)) {
    const result = { ...(isPlainObject(base) ? base : {}) };
    for (const [key, value] of Object.entries(override)) {
      result[key] = deepMerge(base?.[key], value);
    }
    return result;
  }
  return override;
}

let updated = 0;

for (const [slug, byLocale] of Object.entries(pageTranslationOverrides)) {
  const enPath = join(root, 'content/pages/en', `${slug}.yaml`);
  const english = parseYaml(readFileSync(enPath, 'utf8'));

  for (const locale of locales) {
    const override = byLocale[locale];
    if (!override) continue;

    const merged = deepMerge(english, override);
    merged.slug = english.slug;

    const localeDir = join(root, 'content/pages', locale);
    mkdirSync(localeDir, { recursive: true });
    writeFileSync(join(localeDir, `${slug}.yaml`), stringifyYaml(merged, { lineWidth: 0 }), 'utf8');
    updated += 1;
  }
}

console.log(`Updated ${updated} page translation file${updated === 1 ? '' : 's'}.`);
