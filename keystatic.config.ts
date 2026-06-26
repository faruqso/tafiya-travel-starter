import { config, fields, collection } from '@keystatic/core';
import type { Locale } from './src/config/locales';

const pageLocales: Array<{ locale: Locale; label: string }> = [
  { locale: 'en', label: '2. Pages (English)' },
  { locale: 'fr', label: '3. Pages (Français)' },
  { locale: 'de', label: '4. Pages (Deutsch)' },
  { locale: 'ar', label: '5. Pages (العربية)' },
];

const catalogRegionOptions = [
  { label: 'Europe', value: 'europe' },
  { label: 'Middle East', value: 'middle-east' },
  { label: 'Africa', value: 'africa' },
  { label: 'Asia', value: 'asia' },
  { label: 'Americas', value: 'americas' },
  { label: 'Oceania', value: 'oceania' },
];

const destinationCategoryOptions = [
  { label: 'Beach', value: 'beach' },
  { label: 'City', value: 'city' },
  { label: 'Adventure', value: 'adventure' },
  { label: 'Cultural', value: 'cultural' },
  { label: 'Romantic', value: 'romantic' },
];

const flightCabinOptions = [
  { label: 'Economy', value: 'economy' },
  { label: 'Premium', value: 'premium' },
  { label: 'Business', value: 'business' },
];

const catalogLocaleCopyFields = {
  name: fields.text({ label: 'Display name' }),
  country: fields.text({ label: 'Country' }),
  city: fields.text({ label: 'City (hotels)' }),
  route: fields.text({ label: 'Route (flights)', description: 'e.g. JFK → LHR' }),
  airline: fields.text({ label: 'Airline (flights)' }),
  duration: fields.text({ label: 'Duration label' }),
  description: fields.text({ label: 'Description', multiline: true }),
  priceFrom: fields.text({ label: 'Price label', description: 'e.g. 220 $/nuit' }),
  highlights: fields.array(fields.text({ label: 'Highlight' }), {
    label: 'Highlights',
    itemLabel: (props) => props.value ?? 'Highlight',
  }),
  amenities: fields.array(fields.text({ label: 'Amenity' }), {
    label: 'Amenities (hotels)',
    itemLabel: (props) => props.value ?? 'Amenity',
  }),
};

const catalogSharedFields = {
  name: fields.text({ label: 'Display name', description: 'e.g. Rome, Italy or Grand Plaza Rome' }),
  country: fields.text({
    label: 'Country',
    description: 'Destination country. Region is validated against this at build time.',
  }),
  image: fields.url({ label: 'Hero / card image URL' }),
  priceFrom: fields.text({ label: 'Price label', description: 'Shown on cards, e.g. $4.2k or $189/night' }),
  priceValue: fields.integer({ label: 'Numeric price', description: 'Used for sort and max-price filter' }),
  rating: fields.number({ label: 'Rating (0–5)', validation: { min: 0, max: 5 } }),
  region: fields.select({
    label: 'Region',
    description: 'Used for sidebar filters. Must match the country (see catalog-regions.ts).',
    options: catalogRegionOptions,
    defaultValue: 'europe',
  }),
  featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
  description: fields.text({ label: 'Description', multiline: true }),
  highlights: fields.array(fields.text({ label: 'Highlight' }), {
    label: 'Highlights',
    itemLabel: (props) => props.value ?? 'Highlight',
  }),
};

function createCatalogMasterCollection(label: string, path: string, extraSchema: Record<string, unknown>) {
  return collection({
    label,
    slugField: 'slug',
    path,
    format: { data: 'yaml' },
    columns: ['name', 'country', 'region'],
    schema: {
      slug: fields.slug({
        name: {
          label: 'Slug',
          description: 'URL segment, e.g. rome → /destinations/rome. Same slug is used for all locale files.',
        },
      }),
      ...catalogSharedFields,
      ...extraSchema,
    },
  });
}

function createCatalogTranslationCollection(label: string, path: string) {
  return collection({
    label,
    slugField: 'slug',
    path,
    format: { data: 'yaml' },
    columns: ['name', 'slug'],
    schema: {
      slug: fields.slug({
        name: {
          label: 'Slug',
          description:
            'Must match the English master entry exactly. Images, filters, prices, and ratings are edited in English only.',
        },
      }),
      ...catalogLocaleCopyFields,
    },
  });
}

const catalogLocaleDefs: Array<{ locale: Locale; label: string; suffix: string; isMaster?: boolean }> = [
  { locale: 'en', label: 'English', suffix: 'EN', isMaster: true },
  { locale: 'fr', label: 'Français', suffix: 'FR' },
  { locale: 'de', label: 'Deutsch', suffix: 'DE' },
  { locale: 'ar', label: 'العربية', suffix: 'AR' },
];

const catalogKindDefs = [
  {
    name: 'Destinations',
    segment: 'destinations',
    extraSchema: {
      duration: fields.text({ label: 'Duration label', description: 'e.g. 10 Days Trip' }),
      durationDays: fields.integer({ label: 'Duration (days)', description: 'Numeric days for sorting' }),
      category: fields.select({
        label: 'Trip type',
        options: destinationCategoryOptions,
        defaultValue: 'city',
      }),
    },
  },
  {
    name: 'Hotels',
    segment: 'hotels',
    extraSchema: {
      city: fields.text({ label: 'City' }),
      stars: fields.integer({
        label: 'Star rating',
        validation: { min: 3, max: 5 },
        description: '3, 4, or 5 stars',
      }),
      amenities: fields.array(fields.text({ label: 'Amenity' }), {
        label: 'Amenities',
        itemLabel: (props) => props.value ?? 'Amenity',
      }),
    },
  },
  {
    name: 'Flights',
    segment: 'flights',
    extraSchema: {
      route: fields.text({ label: 'Route codes', description: 'e.g. LHR → FCO' }),
      airline: fields.text({ label: 'Airline' }),
      duration: fields.text({ label: 'Flight time', description: 'e.g. 2h 35m' }),
      stops: fields.integer({ label: 'Stops', description: '0 for non-stop' }),
      cabin: fields.select({ label: 'Cabin class', options: flightCabinOptions, defaultValue: 'economy' }),
      originCountry: fields.text({ label: 'Origin country' }),
      destinationCountry: fields.text({ label: 'Destination country' }),
      originRegion: fields.select({
        label: 'Origin region',
        options: catalogRegionOptions,
        defaultValue: 'europe',
      }),
    },
  },
] as const;

function buildCatalogCollections(startNumber: number) {
  let index = startNumber;
  const entries: Array<[string, ReturnType<typeof createCatalogMasterCollection>]> = [];

  for (const kind of catalogKindDefs) {
    for (const localeDef of catalogLocaleDefs) {
      const key = `catalog${kind.name}${localeDef.suffix}`;
      const path = `content/catalog/${kind.segment}/${localeDef.locale}/*`;
      const label = `${index}. ${kind.name} (${localeDef.label})`;
      index += 1;

      entries.push([
        key,
        localeDef.isMaster
          ? createCatalogMasterCollection(label, path, kind.extraSchema)
          : createCatalogTranslationCollection(label, path),
      ]);
    }
  }

  return Object.fromEntries(entries);
}

const buttonSchema = fields.object({
  label: fields.text({ label: 'Label' }),
  href: fields.text({ label: 'URL' }),
  variant: fields.select({
    label: 'Variant',
    options: [
      { label: 'Primary', value: 'primary' },
      { label: 'Secondary', value: 'secondary' },
      { label: 'Secondary (on dark background)', value: 'secondary-inverse' },
      { label: 'Ghost', value: 'ghost' },
    ],
    defaultValue: 'primary',
  }),
});

const sectionBlocks = fields.blocks(
  {
    hero: {
      label: 'Hero',
      schema: fields.object({
        variant: fields.select({
          label: 'Size',
          options: [
            { label: 'Full', value: 'full' },
            { label: 'Compact', value: 'compact' },
          ],
          defaultValue: 'full',
        }),
        eyebrow: fields.text({ label: 'Eyebrow' }),
        headline: fields.text({ label: 'Headline', multiline: true }),
        highlightWord: fields.text({
          label: 'Highlighted word',
          description: 'Word in the headline to underline (e.g. enjoy)',
        }),
        subheadline: fields.text({ label: 'Subheadline', multiline: true }),
        image: fields.text({
          label: 'Background image path',
          description: 'Path from public/, e.g. /images/heroes/hero-home.svg',
        }),
        buttons: fields.array(buttonSchema, { label: 'Buttons' }),
        playDemoLabel: fields.text({ label: 'Play demo label' }),
        playDemoHref: fields.text({ label: 'Play demo URL' }),
        showPlayDemo: fields.checkbox({ label: 'Show play demo button', defaultValue: true }),
      }),
    },
    destinationGrid: {
      label: 'Destination Grid',
      schema: fields.object({
        eyebrow: fields.text({ label: 'Eyebrow' }),
        headline: fields.text({ label: 'Headline' }),
        subheadline: fields.text({ label: 'Subheadline', multiline: true }),
        ctaLabel: fields.text({ label: 'CTA label', description: 'e.g. View destinations' }),
        ctaHref: fields.text({ label: 'CTA link', description: 'e.g. /destinations' }),
        destinations: fields.array(
          fields.object({
            name: fields.text({ label: 'Name' }),
            region: fields.text({ label: 'Region (optional)' }),
            description: fields.text({ label: 'Description (optional)', multiline: true }),
            image: fields.text({ label: 'Image path' }),
            priceFrom: fields.text({ label: 'Price' }),
            duration: fields.text({ label: 'Trip duration', description: 'e.g. 10 Days Trip' }),
            badge: fields.text({ label: 'Badge (optional)' }),
            href: fields.text({ label: 'Link URL' }),
          }),
          { label: 'Destinations', itemLabel: (props) => props.fields.name.value ?? 'Destination' },
        ),
      }),
    },
    features: {
      label: 'Features',
      schema: fields.object({
        eyebrow: fields.text({ label: 'Eyebrow' }),
        headline: fields.text({ label: 'Headline' }),
        subheadline: fields.text({ label: 'Subheadline', multiline: true }),
        items: fields.array(
          fields.object({
            icon: fields.text({
              label: 'Icon path',
              description: 'SVG path from public/, e.g. /images/icons/globe.svg',
            }),
            title: fields.text({ label: 'Title' }),
            description: fields.text({ label: 'Description', multiline: true }),
            featured: fields.checkbox({
              label: 'Featured card',
              description: 'Highlight with elevated card style (e.g. Best Flights)',
            }),
          }),
          { label: 'Features', itemLabel: (props) => props.fields.title.value ?? 'Feature' },
        ),
        logoTickerLabel: fields.text({
          label: 'Logo ticker label',
          description: 'Optional line above an embedded partner logo ticker',
        }),
        logos: fields.array(
          fields.object({
            image: fields.text({ label: 'Logo image path' }),
            alt: fields.text({ label: 'Alt text' }),
            href: fields.text({ label: 'Link URL (optional)' }),
            featured: fields.checkbox({
              label: 'Featured (elevated card)',
              defaultValue: false,
            }),
          }),
          { label: 'Partner logos (optional ticker)', itemLabel: (props) => props.fields.alt.value ?? 'Logo' },
        ),
      }),
    },
    testimonials: {
      label: 'Testimonials',
      schema: fields.object({
        eyebrow: fields.text({ label: 'Eyebrow' }),
        headline: fields.text({ label: 'Headline', multiline: true }),
        items: fields.array(
          fields.object({
            quote: fields.text({ label: 'Quote', multiline: true }),
            author: fields.text({ label: 'Author' }),
            role: fields.text({ label: 'Role / Location' }),
            avatar: fields.text({ label: 'Avatar image path' }),
          }),
          { label: 'Testimonials', itemLabel: (props) => props.fields.author.value ?? 'Testimonial' },
        ),
      }),
    },
    bookTrip: {
      label: 'Book a Trip',
      schema: fields.object({
        eyebrow: fields.text({ label: 'Eyebrow' }),
        headline: fields.text({ label: 'Headline', multiline: true }),
        previewImage: fields.text({
          label: 'Preview image path',
          description: 'Composite card visual from public/, e.g. /images/book-trip/tafiya/trip-preview.png',
        }),
        steps: fields.array(
          fields.object({
            icon: fields.text({ label: 'Step icon path' }),
            color: fields.select({
              label: 'Icon color',
              options: [
                { label: 'Yellow', value: 'yellow' },
                { label: 'Orange', value: 'orange' },
                { label: 'Teal', value: 'teal' },
              ],
              defaultValue: 'yellow',
            }),
            title: fields.text({ label: 'Title' }),
            description: fields.text({ label: 'Description', multiline: true }),
          }),
          { label: 'Steps', itemLabel: (props) => props.fields.title.value ?? 'Step' },
        ),
      }),
    },
    logoCloud: {
      label: 'Logo Cloud',
      schema: fields.object({
        logos: fields.array(
          fields.object({
            image: fields.text({ label: 'Logo image path' }),
            alt: fields.text({ label: 'Alt text' }),
            href: fields.text({ label: 'Link URL (optional)' }),
            featured: fields.checkbox({
              label: 'Featured (elevated card)',
              defaultValue: false,
            }),
          }),
          { label: 'Logos', itemLabel: (props) => props.fields.alt.value ?? 'Logo' },
        ),
      }),
    },
    subscribe: {
      label: 'Subscribe',
      schema: fields.object({
        headline: fields.text({ label: 'Headline', multiline: true }),
        buttonLabel: fields.text({ label: 'Button label' }),
      }),
    },
    stats: {
      label: 'Stats',
      schema: fields.object({
        items: fields.array(
          fields.object({
            value: fields.text({ label: 'Value' }),
            label: fields.text({ label: 'Label' }),
          }),
          { label: 'Stats', itemLabel: (props) => props.fields.label.value ?? 'Stat' },
        ),
      }),
    },
    textBlock: {
      label: 'Text Block',
      schema: fields.object({
        eyebrow: fields.text({ label: 'Eyebrow' }),
        headline: fields.text({ label: 'Headline' }),
        body: fields.text({ label: 'Body', multiline: true }),
      }),
    },
    cta: {
      label: 'Call to Action',
      schema: fields.object({
        headline: fields.text({ label: 'Headline' }),
        subheadline: fields.text({ label: 'Subheadline', multiline: true }),
        buttons: fields.array(buttonSchema, { label: 'Buttons' }),
      }),
    },
    contact: {
      label: 'Contact',
      schema: fields.object({
        eyebrow: fields.text({ label: 'Eyebrow' }),
        headline: fields.text({ label: 'Headline' }),
        subheadline: fields.text({ label: 'Subheadline', multiline: true }),
        email: fields.text({ label: 'Email' }),
        phone: fields.text({ label: 'Phone (optional for some forms)' }),
        address: fields.text({ label: 'Address (optional)', multiline: true }),
        purpose: fields.select({
          label: 'Form purpose',
          options: [
            { label: 'General travel inquiry', value: 'general' },
            { label: 'Careers / job application', value: 'careers' },
            { label: 'Press / media', value: 'press' },
            { label: 'Affiliates / partners', value: 'partners' },
            { label: 'Support', value: 'support' },
          ],
          defaultValue: 'general',
        }),
        formNote: fields.text({
          label: 'Form note',
          description: 'Shown above the contact form',
          multiline: true,
        }),
      }),
    },
    appDownload: {
      label: 'App Download',
      schema: fields.object({
        eyebrow: fields.text({ label: 'Eyebrow' }),
        headline: fields.text({ label: 'Headline' }),
        subheadline: fields.text({ label: 'Subheadline', multiline: true }),
        screenshot: fields.text({
          label: 'Screenshot image path',
          description: 'Phone screenshot shown in the device frame',
        }),
        bullets: fields.array(fields.text({ label: 'Bullet' }), { label: 'Highlights' }),
        googlePlayUrl: fields.text({ label: 'Google Play URL (optional)' }),
        appStoreUrl: fields.text({ label: 'App Store URL (optional)' }),
      }),
    },
    bookingForm: {
      label: 'Booking Form',
      schema: fields.object({
        eyebrow: fields.text({ label: 'Eyebrow' }),
        headline: fields.text({ label: 'Headline' }),
        subheadline: fields.text({ label: 'Subheadline', multiline: true }),
        formNote: fields.text({ label: 'Form note', multiline: true }),
      }),
    },
  },
  { label: 'Sections' },
);

function createPagesCollection(locale: Locale, label: string) {
  return collection({
    label,
    slugField: 'slug',
    path: `content/pages/${locale}/*`,
    format: { data: 'yaml' },
    columns: ['title'],
    schema: {
      slug: fields.slug({
        name: {
          label: 'Slug',
          description: `Use "home" for the landing page. Preview: /${locale === 'en' ? '' : `${locale}/`}{slug}`,
        },
      }),
      title: fields.text({ label: 'Page title' }),
      description: fields.text({ label: 'Meta description', multiline: true }),
      sections: sectionBlocks,
    },
  });
}

const KEYSTATIC_REPO = 'faruqso/tafiya-travel-starter';

function getKeystaticStorage() {
  const hasGithubCredentials =
    process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
    process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
    process.env.KEYSTATIC_SECRET;

  if (hasGithubCredentials) {
    return {
      kind: 'github' as const,
      repo: KEYSTATIC_REPO,
    };
  }

  return { kind: 'local' as const };
}

export default config({
  storage: getKeystaticStorage(),
  collections: {
    site: collection({
      label: '1. Site Settings',
      slugField: 'locale',
      path: 'content/site/*',
      format: { data: 'yaml' },
      columns: ['brandName', 'tagline'],
      schema: {
        locale: fields.slug({
          name: {
            label: 'Locale',
            description: 'Language code: en, fr, de, or ar. Preview at /{locale}/',
          },
        }),
        brandName: fields.text({ label: 'Brand name' }),
        tagline: fields.text({ label: 'Tagline' }),
        footerTagline: fields.text({ label: 'Footer tagline', multiline: true }),
        logo: fields.text({
          label: 'Logo path',
          description: 'Optional. Path from public/, e.g. /images/brand/logo.svg',
        }),
        loginLabel: fields.text({ label: 'Login button label', defaultValue: 'Login' }),
        signupLabel: fields.text({ label: 'Sign up button label', defaultValue: 'Sign up' }),
        navLinks: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            href: fields.text({
              label: 'URL',
              description: 'Site path without locale prefix, e.g. /destinations',
            }),
          }),
          { label: 'Navigation links', itemLabel: (props) => props.fields.label.value ?? 'Link' },
        ),
        footerColumns: fields.array(
          fields.object({
            title: fields.text({ label: 'Column title' }),
            links: fields.array(
              fields.object({
                label: fields.text({ label: 'Label' }),
                href: fields.text({ label: 'URL' }),
              }),
              { label: 'Links', itemLabel: (props) => props.fields.label.value ?? 'Link' },
            ),
          }),
          { label: 'Footer columns', itemLabel: (props) => props.fields.title.value ?? 'Column' },
        ),
        socialLinks: fields.array(
          fields.object({
            label: fields.text({ label: 'Platform' }),
            href: fields.url({ label: 'URL' }),
          }),
          { label: 'Social links', itemLabel: (props) => props.fields.label.value ?? 'Social' },
        ),
        appStoreLabel: fields.text({ label: 'App section label' }),
        googlePlayUrl: fields.text({ label: 'Google Play URL' }),
        appStoreUrl: fields.text({ label: 'App Store URL' }),
        copyright: fields.text({ label: 'Copyright text' }),
        seoTitleTemplate: fields.text({
          label: 'SEO title template',
          description: 'Use %s for page title, e.g. "%s | tafiya"',
        }),
        seoDescription: fields.text({ label: 'Default meta description', multiline: true }),
        ogImage: fields.text({
          label: 'Default OG image path',
          description: 'Path from public/, e.g. /images/og/default.svg',
        }),
      },
    }),
    ...Object.fromEntries(
      pageLocales.map(({ locale, label }) => [`pages${locale.toUpperCase()}`, createPagesCollection(locale, label)]),
    ),
    ...buildCatalogCollections(6),
  },
});
