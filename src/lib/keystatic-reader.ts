import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';
import { defaultLocale, type Locale } from '../config/locales';
import type { PageData, SiteSettings } from '../types/content';
import { siteDefaults } from '../config/site';

const reader = createReader(process.cwd(), keystaticConfig);

const pageCollectionKeys: Record<Locale, 'pagesEN' | 'pagesFR' | 'pagesDE' | 'pagesAR'> = {
  en: 'pagesEN',
  fr: 'pagesFR',
  de: 'pagesDE',
  ar: 'pagesAR',
};

function mapSiteSettings(site: NonNullable<Awaited<ReturnType<typeof reader.collections.site.read>>>): SiteSettings {
  return {
    brandName: site.brandName ?? siteDefaults.brandName,
    tagline: site.tagline ?? siteDefaults.tagline,
    footerTagline: site.footerTagline ?? siteDefaults.footerTagline,
    logo: site.logo ?? siteDefaults.logo,
    loginLabel: site.loginLabel ?? siteDefaults.loginLabel,
    signupLabel: site.signupLabel ?? siteDefaults.signupLabel,
    navLinks: site.navLinks ?? siteDefaults.navLinks,
    footerColumns: site.footerColumns ?? siteDefaults.footerColumns,
    socialLinks: site.socialLinks ?? siteDefaults.socialLinks,
    appStoreLabel: site.appStoreLabel ?? siteDefaults.appStoreLabel,
    googlePlayUrl: site.googlePlayUrl ?? siteDefaults.googlePlayUrl,
    appStoreUrl: site.appStoreUrl ?? siteDefaults.appStoreUrl,
    copyright: site.copyright ?? siteDefaults.copyright,
    seoTitleTemplate: site.seoTitleTemplate ?? siteDefaults.seoTitleTemplate,
    seoDescription: site.seoDescription ?? siteDefaults.seoDescription,
    ogImage: site.ogImage ?? siteDefaults.ogImage,
  };
}

export async function getSiteSettings(locale: Locale = defaultLocale): Promise<SiteSettings> {
  const site = await reader.collections.site.read(locale);

  if (!site) {
    if (locale !== defaultLocale) {
      return getSiteSettings(defaultLocale);
    }
    return siteDefaults;
  }

  return mapSiteSettings(site);
}

export async function getAllPages(locale: Locale = defaultLocale): Promise<PageData[]> {
  const collectionKey = pageCollectionKeys[locale];
  const slugs = await reader.collections[collectionKey].list();

  const pages = await Promise.all(
    slugs.map(async (slug) => {
      const page = await reader.collections[collectionKey].read(slug);
      if (!page) return null;
      return {
        slug: page.slug,
        title: page.title,
        description: page.description,
        sections: (page.sections ?? []) as PageData['sections'],
      };
    }),
  );

  const resolved = pages.filter((page): page is PageData => page !== null);

  if (resolved.length === 0 && locale !== defaultLocale) {
    return getAllPages(defaultLocale);
  }

  return resolved;
}

export async function getPageBySlug(pageSlug: string, locale: Locale = defaultLocale): Promise<PageData | null> {
  const collectionKey = pageCollectionKeys[locale];
  const page = await reader.collections[collectionKey].read(pageSlug);

  if (!page) {
    if (locale !== defaultLocale) {
      return getPageBySlug(pageSlug, defaultLocale);
    }
    return null;
  }

  return {
    slug: page.slug,
    title: page.title,
    description: page.description,
    sections: (page.sections ?? []) as PageData['sections'],
  };
}

export async function getHomePage(locale: Locale = defaultLocale): Promise<PageData | null> {
  return getPageBySlug('home', locale);
}

export { reader };
