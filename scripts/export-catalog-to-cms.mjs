#!/usr/bin/env node
/**
 * One-time (re-runnable) export of src/data/catalog.ts arrays into Keystatic YAML files.
 * Usage: node --experimental-strip-types scripts/export-catalog-to-cms.mjs
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { stringify as stringifyYaml } from 'yaml';
import { destinations, hotels, flights } from '../src/data/catalog.ts';

const root = resolve(import.meta.dirname, '..');

function stripKind(item) {
  const { kind, ...rest } = item;
  return rest;
}

function writeCatalogItem(subdir, item) {
  const dir = resolve(root, 'content/catalog', subdir, 'en');
  mkdirSync(dir, { recursive: true });
  const path = resolve(dir, `${item.slug}.yaml`);
  writeFileSync(path, stringifyYaml(stripKind(item), { lineWidth: 0 }), 'utf8');
  console.log(`wrote ${path}`);
}

for (const item of destinations) writeCatalogItem('destinations', item);
for (const item of hotels) writeCatalogItem('hotels', item);
for (const item of flights) writeCatalogItem('flights', item);

console.log(`Exported ${destinations.length + hotels.length + flights.length} catalog items.`);
