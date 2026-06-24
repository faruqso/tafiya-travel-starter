# Customization guide

This guide walks you through forking Wanderlust Travel Starter and making it your own.

## 1. Fork and clone

```bash
git clone https://github.com/your-username/wanderlust-travel-starter.git
cd wanderlust-travel-starter
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

Open **`/keystatic`** → **Site Settings**, or edit `content/site/site.yaml` directly:

- Brand name and tagline
- Navigation links
- Footer columns and social links
- Default SEO title template and description

## 5. Edit page content

Each page lives in `content/pages/` as a YAML file. Use the Keystatic admin to add, reorder, or edit sections visually.

**Demo pages included:**

- `home.yaml` — landing page
- `destinations.yaml` — destination listing
- `about.yaml` — about page
- `contact.yaml` — contact page

To add a new page: create an entry in Keystatic with a unique slug (not `home`). It automatically gets a route at `/{slug}`.

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
