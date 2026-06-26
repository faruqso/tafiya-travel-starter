# tafiya Travel Starter

An open-source travel website starter built with **Astro**, **Keystatic**, and a **token-driven design system**. Fork it, rebrand it, and launch your own travel site in minutes.

Live demo: [tafiya-travel-starter](https://github.com/faruqso/tafiya-travel-starter)

## Features

- **CMS-driven pages** — browse the admin demo at `/keystatic`; fork + setup to enable saves (see [Keystatic setup](docs/keystatic-setup.md))
- **Catalog (destinations, hotels, flights)** — filterable listings with per-locale CMS folders
- **Design system** — rebrand the entire site by editing one file: `src/styles/tokens.css`
- **Travel-focused sections** — Hero, Destination Grid, Features, Testimonials, Stats, CTA, Contact
- **Multilingual** — English, French, German, and Arabic with RTL support
- **Zero-JS public site** — fast static HTML; React only powers the Keystatic admin

## Quick start

```bash
git clone https://github.com/faruqso/tafiya-travel-starter.git
cd tafiya-travel-starter
npm install
npm run dev
```

- **Site:** [http://localhost:4321](http://localhost:4321)
- **CMS admin:** [http://localhost:4321/keystatic](http://localhost:4321/keystatic) — see [Keystatic setup](docs/keystatic-setup.md) to connect your fork
- **Translation status:** [http://localhost:4321/admin/translations](http://localhost:4321/admin/translations)

## Project structure

```
content/
  site/            Site settings per locale (en.yaml, fr.yaml, …)
  pages/
    en/            Page content in English
    fr/            Page content in French
    de/            Page content in German
    ar/            Page content in Arabic
  catalog/
    destinations/  Catalog items per locale (en = master, fr/de/ar = copy)
    hotels/
    flights/
public/images/     Static assets organized by purpose
src/components/ui/ Design system primitives
src/components/sections/  CMS page blocks
src/styles/tokens.css     Single source of truth for branding
```

See [docs/customization.md](docs/customization.md) for rebrand and deploy instructions, and [docs/keystatic-setup.md](docs/keystatic-setup.md) to connect the CMS to your own GitHub repo.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build static site to `dist/` |
| `npm run preview` | Preview production build |
| `npm run content:clone` | Clone page YAML between locales |
| `npm run content:seed-page-translations` | Apply FR/DE/AR page copy from seed data |
| `npm run content:seed-catalog-translations` | Seed catalog translation files |

## Tech stack

- [Astro 6](https://astro.build) — static site generator
- [Keystatic](https://keystatic.com) — git-based CMS
- CSS design tokens — no UI framework on the public site

## License

MIT — see [LICENSE](LICENSE). Use freely for personal and commercial projects.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
