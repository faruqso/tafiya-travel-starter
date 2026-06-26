# Contributing

Thank you for helping improve **tafiya Travel Starter**!

## Development setup

1. Fork and clone [tafiya-travel-starter](https://github.com/faruqso/tafiya-travel-starter)
2. Run `npm install`
3. Run `npm run dev` to start the dev server
4. To use the CMS admin on your fork, follow [docs/keystatic-setup.md](docs/keystatic-setup.md)
5. Run `npm run build` before submitting a PR to verify the build passes

## Where to make changes

| Goal | Location |
|------|----------|
| Rebrand colors, fonts, spacing | `src/styles/tokens.css` |
| UI primitives (Button, Card, etc.) | `src/components/ui/` |
| Page sections (Hero, DestinationGrid, etc.) | `src/components/sections/` |
| Site-wide nav, footer, SEO defaults | `content/site/{locale}.yaml` or `/keystatic` |
| Page content | `content/pages/{locale}/*.yaml` or `/keystatic` |
| Catalog items | `content/catalog/{kind}/{locale}/*.yaml` or `/keystatic` |
| Static images | `public/images/` |

## Pull request guidelines

- Keep changes focused — one feature or fix per PR
- Match existing code style and conventions
- Use design tokens instead of hardcoded colors or spacing
- Update docs if you add new section types or change the content schema

## Adding a new section type

1. Add the block schema in `keystatic.config.ts`
2. Add the TypeScript type in `src/types/content.ts`
3. Create the component in `src/components/sections/`
4. Register it in `src/components/SectionRenderer.astro`
5. Document it in `docs/customization.md`

## Questions?

Open an issue on GitHub — we're happy to help.
