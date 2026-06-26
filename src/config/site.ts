import type { SiteSettings } from '../types/content';

export const siteDefaults: SiteSettings = {
  brandName: 'tafiya',
  tagline: 'Discover the world, one journey at a time',
  logo: '/images/brand/logo.svg',
  loginLabel: 'Login',
  signupLabel: 'Sign up',
  navLinks: [
    { label: 'Destinations', href: '/destinations' },
    { label: 'Hotels', href: '/hotels' },
    { label: 'Flights', href: '/flights' },
    { label: 'Bookings', href: '/bookings' },
  ],
  footerColumns: [],
  socialLinks: [],
  copyright: '© tafiya',
  seoTitleTemplate: '%s | tafiya',
  seoDescription: 'Compare flights, hotels, and curated trips with transparent pricing.',
  ogImage: '/images/og/default.jpg',
};
