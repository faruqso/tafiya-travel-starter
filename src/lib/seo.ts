import type { SiteSettings } from '../types/content';

interface PageSeo {
  title: string;
  description: string;
}

export function buildPageTitle(pageTitle: string, site: SiteSettings): string {
  const template = site.seoTitleTemplate || '%s | Wanderlust';
  return template.replace('%s', pageTitle);
}

export function buildSeoMeta(page: PageSeo, site: SiteSettings) {
  return {
    title: buildPageTitle(page.title, site),
    description: page.description || site.seoDescription,
    ogImage: site.ogImage,
  };
}
