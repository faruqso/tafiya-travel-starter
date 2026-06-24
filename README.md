# Wanderlust Travel Starter

An open-source travel website starter built with **Astro**, **Keystatic**, and a **token-driven design system**. Fork it, rebrand it, and launch your own travel site in minutes.

## Features

- **CMS-driven pages** — edit content at `/keystatic` or in `content/` YAML files
- **Design system** — rebrand the entire site by editing one file: `src/styles/tokens.css`
- **Travel-focused sections** — Hero, Destination Grid, Features, Testimonials, Stats, CTA, Contact
- **Zero-JS public site** — fast static HTML; React only powers the Keystatic admin
- **Fork-ready** — MIT license, demo content, customization docs

## Quick start

```bash
git clone https://github.com/your-username/wanderlust-travel-starter.git
cd wanderlust-travel-starter
npm install
npm run dev
```

- **Site:** [http://localhost:4321](http://localhost:4321)
- **CMS admin:** [http://localhost:4321/keystatic](http://localhost:4321/keystatic)

## Project structure

```
content/           Keystatic CMS content (YAML)
public/images/     Static assets organized by purpose
src/components/ui/ Design system primitives
src/components/sections/  CMS page blocks
src/styles/tokens.css     Single source of truth for branding
```

See [docs/customization.md](docs/customization.md) for rebrand and deploy instructions.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build static site to `dist/` |
| `npm run preview` | Preview production build |

## Tech stack

- [Astro 6](https://astro.build) — static site generator
- [Keystatic](https://keystatic.com) — git-based CMS
- CSS design tokens — no UI framework on the public site

## License

MIT — see [LICENSE](LICENSE). Use freely for personal and commercial projects.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
