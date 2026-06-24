export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonData {
  label: string;
  href: string;
  variant?: ButtonVariant;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  footerTagline?: string;
  logo?: string;
  navLinks: NavLink[];
  footerColumns: FooterColumn[];
  socialLinks: SocialLink[];
  appStoreLabel?: string;
  googlePlayUrl?: string;
  appStoreUrl?: string;
  copyright: string;
  seoTitleTemplate: string;
  seoDescription: string;
  ogImage: string;
}

export interface HeroSection {
  discriminant: 'hero';
  value: {
    variant?: 'full' | 'compact';
    eyebrow?: string;
    headline: string;
    highlightWord?: string;
    subheadline?: string;
    image?: string;
    buttons?: ButtonData[];
    playDemoLabel?: string;
    playDemoHref?: string;
    showPlayDemo?: boolean;
  };
}

export interface DestinationItem {
  name: string;
  region?: string;
  description?: string;
  image: string;
  priceFrom: string;
  duration?: string;
  badge?: string;
  href: string;
}

export interface DestinationGridSection {
  discriminant: 'destinationGrid';
  value: {
    eyebrow?: string;
    headline: string;
    subheadline?: string;
    destinations: DestinationItem[];
  };
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
  featured?: boolean;
}

export interface FeaturesSection {
  discriminant: 'features';
  value: {
    eyebrow?: string;
    headline: string;
    subheadline?: string;
    items: FeatureItem[];
  };
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface TestimonialsSection {
  discriminant: 'testimonials';
  value: {
    eyebrow?: string;
    headline: string;
    items: TestimonialItem[];
  };
}

export interface BookTripStep {
  icon: string;
  color: 'yellow' | 'orange' | 'teal';
  title: string;
  description: string;
}

export interface BookTripSection {
  discriminant: 'bookTrip';
  value: {
    eyebrow?: string;
    headline: string;
    steps: BookTripStep[];
    previewImage?: string;
  };
}

export interface LogoItem {
  image: string;
  alt?: string;
  href?: string;
  featured?: boolean;
}

export interface LogoCloudSection {
  discriminant: 'logoCloud';
  value: {
    logos: LogoItem[];
  };
}

export interface SubscribeSection {
  discriminant: 'subscribe';
  value: {
    headline: string;
    buttonLabel?: string;
  };
}

export interface StatItem {
  value: string;
  label: string;
}

export interface StatsSection {
  discriminant: 'stats';
  value: {
    items: StatItem[];
  };
}

export interface TextBlockSection {
  discriminant: 'textBlock';
  value: {
    eyebrow?: string;
    headline?: string;
    body: string;
  };
}

export interface CtaSection {
  discriminant: 'cta';
  value: {
    headline: string;
    subheadline?: string;
    buttons?: ButtonData[];
  };
}

export interface ContactSection {
  discriminant: 'contact';
  value: {
    eyebrow?: string;
    headline: string;
    subheadline?: string;
    email: string;
    phone: string;
    address: string;
    formNote?: string;
  };
}

export type PageSection =
  | HeroSection
  | DestinationGridSection
  | FeaturesSection
  | BookTripSection
  | TestimonialsSection
  | LogoCloudSection
  | SubscribeSection
  | StatsSection
  | TextBlockSection
  | CtaSection
  | ContactSection;

export interface PageData {
  slug: string;
  title: string;
  description: string;
  sections: PageSection[];
}
