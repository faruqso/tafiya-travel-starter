import type { SiteSettings } from '../types/content';

export const siteDefaults: SiteSettings = {
  brandName: 'Wanderlust',
  tagline: 'Discover the world, one journey at a time',
  logo: '/images/brand/logo.svg',
  navLinks: [
    { label: 'Home', href: '/' },
    { label: 'Destinations', href: '/destinations' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  footerColumns: [],
  socialLinks: [],
  copyright: '© Wanderlust Travel Starter',
  seoTitleTemplate: '%s | Wanderlust',
  seoDescription: 'An open-source travel website starter built with Astro and Keystatic.',
  ogImage: '/images/og/default.svg',
};
