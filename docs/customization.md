# Customization guide

This guide walks you through forking **tafiya Travel Starter** and making it your own.

## 1. Fork and clone

```bash
git clone https://github.com/faruqso/tafiya-travel-starter.git
cd tafiya-travel-starter
npm install
npm run dev
```

Update `package.json` → `repository.url` with your fork's URL.

## 2. Rebrand with design tokens

All visual values live in **`src/styles/tokens.css`**. Edit this file to change:

- Brand colors (`--color-brand`, `--color-brand-muted`, etc.)
- Typography (`--font-display`, `--font-body`, size scale)
- Spacing, radii, shadows

Every page and component reads from these tokens — no hunting through component files.

**Quick test:** Change `--color-brand` to a new hex value, save, and refresh any page. The entire site updates.

## 3. Replace images

Drop your photos into the organized folders under `public/images/`:

| Folder | Use for |
|--------|---------|
| `heroes/` | Full-width hero backgrounds |
| `destinations/` | Destination card images |
| `testimonials/` | Avatar photos |
| `icons/` | Feature icons (SVG recommended) |
| `og/` | Social share image (1200×630 recommended) |

Update image paths in Keystatic (`/keystatic`) or in the YAML files under `content/`.

Paths are always from `public/`, e.g. `/images/heroes/my-hero.jpg`.

## 4. Edit site settings

Open **`/keystatic`** → **Site Settings**, or edit the locale files under `content/site/` directly:

- `content/site/en.yaml` — English (default)
- `content/site/fr.yaml` — French
- `content/site/de.yaml` — German
- `content/site/ar.yaml` — Arabic

Each file controls brand name, tagline, nav labels, footer columns, social links, and default SEO for that language.

## 5. Edit page content

Each page lives in `content/pages/{locale}/` as a YAML file. Use the Keystatic admin to add, reorder, or edit sections visually.

**Demo pages included (per locale):**

- `home.yaml` — landing page
- `destinations.yaml` — destination listing
- `about.yaml` — about page
- `contact.yaml` — contact page

To add a new page: create an entry in Keystatic with a unique slug (not `home`). It automatically gets a route at `/{slug}` for English, or `/{locale}/{slug}` for other languages.

## 5b. Multilingual content

The site supports **English, French, German, and Arabic** out of the box.

| What | Where |
|------|--------|
| Supported locales | `src/config/locales.ts` |
| Site settings per locale | `content/site/{locale}.yaml` |
| Page content per locale | `content/pages/{locale}/{slug}.yaml` |
| URL routing | `/about` (en), `/fr/about`, `/de/about`, `/ar/about` |
| Language switcher | Header dropdown (flags + locale links) |

**Adding a translation:**

1. Copy an English page file, e.g. `content/pages/en/about.yaml` → `content/pages/fr/about.yaml`
2. Translate all text fields (headlines, body copy, button labels, SEO fields)
3. Keep image paths and structural fields (icons, `featured` flags) the same unless you need locale-specific assets
4. Update `highlightWord` in hero sections to match the translated headline
5. Keep internal links as site paths without locale prefix (e.g. `/destinations`) — the site localizes them at render time

**Fallback:** If a page or site file is missing for a locale, the build falls back to English content.

### Keystatic admin UX

Open **`/admin/translations`** for a matrix of which pages exist per locale, live preview links (including RTL for Arabic), and quick links into Keystatic.

In `/keystatic`, content is grouped by language:

| Collection | Contents |
|------------|----------|
| 1. Site Settings | `en`, `fr`, `de`, `ar` entries (brand + tagline columns) |
| 2. Pages (English) | `content/pages/en/*.yaml` |
| 3. Pages (Français) | `content/pages/fr/*.yaml` |
| 4. Pages (Deutsch) | `content/pages/de/*.yaml` |
| 5. Pages (العربية) | `content/pages/ar/*.yaml` |

Keystatic does not yet support custom filters inside a single collection — separate collections per locale is the recommended pattern. Slug fields include preview URL hints (e.g. edit `fr/home` → preview at `/fr/`).

### Bulk import & clone

| Script | Purpose |
|--------|---------|
| `npm run content:import -- file.csv` | Update site/page fields from CSV |
| `npm run content:import:json -- file.json` | Replace full page or site YAML from JSON |
| `npm run content:clone -- --from en --to fr --all` | Copy all English pages as a translation starter |
| `npm run content:seed-page-translations` | Apply FR/DE/AR page copy from `scripts/page-translations-data.mjs` |
| `npm run content:seed-catalog-translations` | Seed catalog translation files from English masters |

Full translation workflow (Crowdin, Lokalise, RTL preview): **`docs/translation-workflow.md`**.

### Bulk CSV import

For site settings and page metadata (`title`, `description`), use the import script:

```bash
npm run content:import -- scripts/examples/content-import.sample.csv
npm run content:import:dry --  # preview without writing
```

CSV format (`type,locale,slug,field,value`):

```csv
site,fr,,tagline,Les meilleures destinations du monde
page,fr,home,title,Accueil
page,fr,home,description,Decouvrez les meilleures destinations...
```

- `site` rows: leave `slug` empty; `field` is a top-level site key
- `page` rows: set `slug` to the page slug (`home`, `about`, etc.)

Section-level copy (hero headlines, features, etc.) is best edited in Keystatic or by editing the YAML files directly. For full-page JSON swaps across locales, copy an entire `content/pages/{locale}/{slug}.yaml` file.

## 6. Connect the contact form

The contact form is a demo placeholder. To make it functional:

**Option A — Formspree**

1. Create a form at [formspree.io](https://formspree.io)
2. Set `PUBLIC_CONTACT_FORM_URL` in `.env`
3. Update `src/components/sections/Contact.astro` to use that URL as the form `action`

**Option B — Netlify Forms**

Add `netlify` attribute to the form and deploy to Netlify.

## 7. Deploy

Build the static site:

```bash
npm run build
```

Deploy the prerendered static HTML from `dist/client/` to any static host:

- [Netlify](https://netlify.com) — connect your GitHub repo for auto-deploys
- [Cloudflare Pages](https://pages.cloudflare.com)
- [Vercel](https://vercel.com)
- GitHub Pages

> **Note:** `@astrojs/node` is included so the Keystatic admin (`/keystatic`) works in dev and preview. Production deploys typically serve the static HTML only — edit content locally or via git, then rebuild.

### Keystatic in production

Content is stored in your git repo, so production builds read YAML at build time — no CMS server needed to serve the public site.

To edit content on a deployed site, either:

- Edit YAML locally and push to git (triggers rebuild), or
- Switch Keystatic to [GitHub storage](https://keystatic.com/docs/github-mode) for browser-based editing that commits to your repo

## 8. Design system reference

```
Layer 1: src/styles/tokens.css     → colors, type, spacing (edit to rebrand)
Layer 2: src/components/ui/      → Button, Card, Container, Section, etc.
Layer 3: src/components/layout/  → Nav, Footer
Layer 4: src/components/sections/ → CMS-driven page blocks
```

Sections never define their own colors — they compose primitives that read tokens.

## Demo content note

All copy, emails, and phone numbers in this repo are **demo placeholders**. Replace them before going live.

Demo SVG images are simple gradient placeholders — swap with real photography for production.
