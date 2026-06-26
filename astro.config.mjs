// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';
import { catalogCacheInvalidation } from './integrations/catalog-cache.mjs';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: vercel(),
  integrations: [react(), markdoc(), keystatic(), catalogCacheInvalidation()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'de', 'ar'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
