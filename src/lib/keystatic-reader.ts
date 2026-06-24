import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';
import type { PageData, SiteSettings } from '../types/content';
import { siteDefaults } from '../config/site';

const reader = createReader(process.cwd(), keystaticConfig);

export async function getSiteSettings(): Promise<SiteSettings> {
  const site = await reader.singletons.site.read();
  if (!site) return siteDefaults;
  return {
    brandName: site.brandName ?? siteDefaults.brandName,
    tagline: site.tagline ?? siteDefaults.tagline,
    logo: site.logo ?? siteDefaults.logo,
    navLinks: site.navLinks ?? siteDefaults.navLinks,
    footerColumns: site.footerColumns ?? siteDefaults.footerColumns,
    socialLinks: site.socialLinks ?? siteDefaults.socialLinks,
    copyright: site.copyright ?? siteDefaults.copyright,
    seoTitleTemplate: site.seoTitleTemplate ?? siteDefaults.seoTitleTemplate,
    seoDescription: site.seoDescription ?? siteDefaults.seoDescription,
    ogImage: site.ogImage ?? siteDefaults.ogImage,
  };
}

export async function getAllPages(): Promise<PageData[]> {
  const slugs = await reader.collections.pages.list();
  const pages = await Promise.all(
    slugs.map(async (slug) => {
      const page = await reader.collections.pages.read(slug);
      if (!page) return null;
      return {
        slug: page.slug,
        title: page.title,
        description: page.description,
        sections: (page.sections ?? []) as PageData['sections'],
      };
    }),
  );
  return pages.filter((p): p is PageData => p !== null);
}

export async function getPageBySlug(slug: string): Promise<PageData | null> {
  const pages = await getAllPages();
  return pages.find((p) => p.slug === slug) ?? null;
}

export async function getHomePage(): Promise<PageData | null> {
  return getPageBySlug('home');
}

export { reader };
