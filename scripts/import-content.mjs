#!/usr/bin/env node
/**
 * Bulk-update CMS YAML from CSV or JSON.
 *
 * CSV columns: type, locale, slug, field, value
 *
 * JSON format (array or single object):
 *   { "type": "page", "locale": "fr", "slug": "home", "data": { ...full page yaml } }
 *   { "type": "site", "locale": "fr", "data": { ...full site yaml } }
 *
 * Usage:
 *   node scripts/import-content.mjs path/to/file.csv
 *   node scripts/import-content.mjs path/to/pages.json
 *   node scripts/import-content.mjs path/to/file.csv --dry-run
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';

const root = resolve(import.meta.dirname, '..');
const dryRun = process.argv.includes('--dry-run');
const inputPath = process.argv.find((arg) => !arg.startsWith('-') && !arg.endsWith('.mjs'));

if (!inputPath) {
  console.error('Usage: node scripts/import-content.mjs <file.csv|file.json> [--dry-run]');
  process.exit(1);
}

const absolutePath = resolve(inputPath);
const ext = extname(absolutePath).toLowerCase();

function sitePath(locale) {
  return resolve(root, 'content/site', `${locale}.yaml`);
}

function pagePath(locale, slug) {
  return resolve(root, 'content/pages', locale, `${slug}.yaml`);
}

function loadYaml(path) {
  if (!existsSync(path)) {
    throw new Error(`File not found: ${path}`);
  }
  return parseYaml(readFileSync(path, 'utf8'));
}

function saveYaml(path, data) {
  if (dryRun) {
    console.log(`[dry-run] would update ${path}`);
    return;
  }
  writeFileSync(path, stringifyYaml(data, { lineWidth: 0 }), 'utf8');
  console.log(`updated ${path}`);
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const header = lines[0].split(',').map((cell) => cell.trim());
  const rows = [];

  for (const line of lines.slice(1)) {
    if (!line.trim()) continue;
    const cells = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i += 1) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
        continue;
      }
      if (char === ',' && !inQuotes) {
        cells.push(current);
        current = '';
        continue;
      }
      current += char;
    }
    cells.push(current);

    const row = Object.fromEntries(header.map((key, index) => [key, cells[index]?.trim() ?? '']));
    rows.push(row);
  }

  return rows;
}

function applyCsvRows(rows) {
  let updated = 0;

  for (const row of rows) {
    const type = row.type?.toLowerCase();
    const locale = row.locale;
    const slug = row.slug;
    const field = row.field;
    const value = row.value ?? '';

    if (!type || !locale || !field) {
      console.warn('Skipping invalid row:', row);
      continue;
    }

    if (type === 'site') {
      const path = sitePath(locale);
      const data = loadYaml(path);
      data[field] = value;
      saveYaml(path, data);
      updated += 1;
      continue;
    }

    if (type === 'page') {
      if (!slug) {
        console.warn('Page row missing slug:', row);
        continue;
      }
      const path = pagePath(locale, slug);
      const data = loadYaml(path);
      data[field] = value;
      saveYaml(path, data);
      updated += 1;
      continue;
    }

    console.warn('Unknown type:', type);
  }

  return updated;
}

function applyJsonEntries(entries) {
  let updated = 0;

  for (const entry of entries) {
    const type = entry.type?.toLowerCase();
    const locale = entry.locale;

    if (!type || !locale) {
      console.warn('Skipping invalid JSON entry:', entry);
      continue;
    }

    if (type === 'site') {
      if (!entry.data || typeof entry.data !== 'object') {
        console.warn('Site entry missing data object:', entry);
        continue;
      }
      saveYaml(sitePath(locale), entry.data);
      updated += 1;
      continue;
    }

    if (type === 'page') {
      const slug = entry.slug ?? entry.data?.slug;
      if (!slug || !entry.data || typeof entry.data !== 'object') {
        console.warn('Page entry missing slug or data:', entry);
        continue;
      }
      const data = { ...entry.data, slug };
      saveYaml(pagePath(locale, slug), data);
      updated += 1;
      continue;
    }

    console.warn('Unknown type:', type);
  }

  return updated;
}

let updated = 0;

if (ext === '.json') {
  const parsed = JSON.parse(readFileSync(absolutePath, 'utf8'));
  const entries = Array.isArray(parsed) ? parsed : [parsed];
  updated = applyJsonEntries(entries);
} else {
  const rows = parseCsv(readFileSync(absolutePath, 'utf8'));
  updated = applyCsvRows(rows);
}

console.log(`${dryRun ? 'Validated' : 'Applied'} ${updated} update(s).`);
