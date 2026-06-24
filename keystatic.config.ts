import { config, fields, collection, singleton } from '@keystatic/core';

const buttonSchema = fields.object({
  label: fields.text({ label: 'Label' }),
  href: fields.text({ label: 'URL' }),
  variant: fields.select({
    label: 'Variant',
    options: [
      { label: 'Primary', value: 'primary' },
      { label: 'Secondary', value: 'secondary' },
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
        phone: fields.text({ label: 'Phone' }),
        address: fields.text({ label: 'Address', multiline: true }),
        formNote: fields.text({
          label: 'Form note',
          description: 'Shown above the contact form placeholder',
          multiline: true,
        }),
      }),
    },
  },
  { label: 'Sections' },
);

export default config({
  storage: {
    kind: 'local',
  },
  singletons: {
    site: singleton({
      label: 'Site Settings',
      path: 'content/site/site',
      format: { data: 'yaml' },
      schema: {
        brandName: fields.text({ label: 'Brand name' }),
        tagline: fields.text({ label: 'Tagline' }),
        footerTagline: fields.text({ label: 'Footer tagline', multiline: true }),
        logo: fields.text({
          label: 'Logo path',
          description: 'Optional. Path from public/, e.g. /images/brand/logo.svg',
        }),
        navLinks: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            href: fields.text({ label: 'URL' }),
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
          description: 'Use %s for page title, e.g. "%s | Wanderlust"',
        }),
        seoDescription: fields.text({ label: 'Default meta description', multiline: true }),
        ogImage: fields.text({
          label: 'Default OG image path',
          description: 'Path from public/, e.g. /images/og/default.svg',
        }),
      },
    }),
  },
  collections: {
    pages: collection({
      label: 'Pages',
      slugField: 'slug',
      path: 'content/pages/*',
      format: { data: 'yaml' },
      schema: {
        slug: fields.slug({
          name: {
            label: 'Slug',
            description: 'Use "home" for the landing page',
          },
        }),
        title: fields.text({ label: 'Page title' }),
        description: fields.text({ label: 'Meta description', multiline: true }),
        sections: sectionBlocks,
      },
    }),
  },
});
