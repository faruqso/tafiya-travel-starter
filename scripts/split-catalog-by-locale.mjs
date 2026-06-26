#!/usr/bin/env node
/**
 * Split flat catalog YAML (with nested translations) into locale folders:
 *   content/catalog/{kind}/en/{slug}.yaml  — master (shared + English copy)
 *   content/catalog/{kind}/{fr|de|ar}/{slug}.yaml — translation copy only
 *
 * Usage: node scripts/split-catalog-by-locale.mjs
 */

import { mkdirSync, readFileSync, writeFileSync, readdirSync, unlinkSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';

const root = resolve(import.meta.dirname, '..');
const catalogDir = join(root, 'content/catalog');
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

let masters = 0;
let translations = 0;

for (const kind of kinds) {
  const kindDir = join(catalogDir, kind);
  const entries = readdirSync(kindDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.yaml')) continue;

    const filePath = join(kindDir, entry.name);
    const item = parseYaml(readFileSync(filePath, 'utf8'));
    const slug = item.slug ?? entry.name.replace(/\.yaml$/, '');
    const { translations: nestedTranslations, ...master } = item;

    const enDir = join(kindDir, 'en');
    mkdirSync(enDir, { recursive: true });
    writeFileSync(join(enDir, `${slug}.yaml`), stringifyYaml(master, { lineWidth: 0 }), 'utf8');
    masters += 1;

    for (const locale of translationLocales) {
      const copy = cleanTranslationCopy(nestedTranslations?.[locale]);
      if (!copy) continue;

      const localeDir = join(kindDir, locale);
      mkdirSync(localeDir, { recursive: true });
      writeFileSync(
        join(localeDir, `${slug}.yaml`),
        stringifyYaml({ slug, ...copy }, { lineWidth: 0 }),
        'utf8',
      );
      translations += 1;
    }

    unlinkSync(filePath);
  }
}

console.log(`Wrote ${masters} English master file${masters === 1 ? '' : 's'} and ${translations} translation file${translations === 1 ? '' : 's'}.`);
