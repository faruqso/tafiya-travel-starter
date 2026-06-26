#!/usr/bin/env node
/**
 * Copy page YAML from one locale to another as a translation starting point.
 *
 * Usage:
 *   node scripts/clone-page-locale.mjs --from en --to fr
 *   node scripts/clone-page-locale.mjs --from en --to de --slug home
 *   node scripts/clone-page-locale.mjs --from en --to ar --all --dry-run
 */

import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const all = args.includes('--all');

function getArg(flag) {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
}

const from = getArg('--from');
const to = getArg('--to');
const slug = getArg('--slug');

if (!from || !to) {
  console.error(
    'Usage: node scripts/clone-page-locale.mjs --from en --to fr [--slug home] [--all] [--dry-run]',
  );
  process.exit(1);
}

const sourceDir = resolve(root, 'content/pages', from);
const targetDir = resolve(root, 'content/pages', to);

if (!existsSync(sourceDir)) {
  console.error(`Source locale folder not found: ${sourceDir}`);
  process.exit(1);
}

if (!dryRun && !existsSync(targetDir)) {
  mkdirSync(targetDir, { recursive: true });
}

const slugs = slug
  ? [slug.replace(/\.yaml$/, '')]
  : all
    ? readdirSync(sourceDir).filter((file) => file.endsWith('.yaml')).map((file) => file.replace(/\.yaml$/, ''))
    : [];

if (slugs.length === 0) {
  console.error('Provide --slug home or --all to select pages to clone.');
  process.exit(1);
}

let copied = 0;

for (const pageSlug of slugs) {
  const source = join(sourceDir, `${pageSlug}.yaml`);
  const target = join(targetDir, `${pageSlug}.yaml`);

  if (!existsSync(source)) {
    console.warn(`Skipping missing source: ${source}`);
    continue;
  }

  if (dryRun) {
    console.log(`[dry-run] would copy ${source} → ${target}`);
  } else {
    copyFileSync(source, target);
    console.log(`copied ${from}/${pageSlug}.yaml → ${to}/${pageSlug}.yaml`);
  }
  copied += 1;
}

console.log(`${dryRun ? 'Validated' : 'Cloned'} ${copied} page(s).`);
