// @ts-check
import { defineConfig } from 'astro/config';
import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import vercel from '@astrojs/vercel';
import { catalogCacheInvalidation } from './integrations/catalog-cache.mjs';
import { keystaticAdmin } from './integrations/keystatic-admin.mjs';

/** Recursively list files under content/ for Keystatic on Vercel serverless */
function listContentFiles(dir = 'content', root = process.cwd()) {
  const absDir = join(root, dir);
  /** @type {string[]} */
  const files = [];
  for (const entry of readdirSync(absDir)) {
    const absPath = join(absDir, entry);
    if (statSync(absPath).isDirectory()) {
      files.push(...listContentFiles(join(dir, entry), root));
    } else {
      files.push('./' + relative(root, absPath));
    }
  }
  return files;
}

const contentFiles = listContentFiles();

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: vercel({
    // Keystatic admin reads content/ at runtime — bundle every YAML into serverless functions
    includeFiles: [...contentFiles, './keystatic.config.ts'],
  }),
  integrations: [react(), markdoc(), keystaticAdmin(), catalogCacheInvalidation()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'de', 'ar'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
