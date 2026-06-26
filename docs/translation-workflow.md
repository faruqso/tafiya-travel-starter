# Translation workflow

This guide covers how to manage multilingual content for tafiya outside of day-to-day Keystatic edits.

## Locales

| Code | Language | Direction | Live preview |
|------|----------|-----------|--------------|
| `en` | English | LTR | `/` |
| `fr` | Français | LTR | `/fr/` |
| `de` | Deutsch | LTR | `/de/` |
| `ar` | العربية | **RTL** | `/ar/` |

Use the [translation status dashboard](/admin/translations) to see missing files, preview pages per locale, and open the correct Keystatic collection.

## Keystatic collections (by language)

Collections are split per locale so the CMS sidebar groups content naturally:

1. **1. Site Settings** — `content/site/{locale}.yaml`
2. **2. Pages (English)** — `content/pages/en/`
3. **3. Pages (Français)** — `content/pages/fr/`
4. **4. Pages (Deutsch)** — `content/pages/de/`
5. **5. Pages (العربية)** — `content/pages/ar/`
6. **6–17. Catalog** — `content/catalog/{destinations|hotels|flights}/{en|fr|de|ar}/` (English = master; other locales = copy only)

When editing French home content, open **3. Pages (Français)** → `home`, then preview at `/fr/`.

### Seed scripts

```bash
npm run content:seed-page-translations   # FR/DE/AR CMS pages from scripts/page-translations-data.mjs
npm run content:seed-catalog-translations # catalog copy files from English masters
```

After editing catalog YAML in dev, changes appear automatically (catalog cache clears on file save). If listings look empty, restart `npm run dev` once.

## Recommended workflow with external tools

### Option A — Crowdin / Lokalise / Phrase

1. Export English YAML as the source of truth (`content/pages/en/*.yaml`).
2. Upload string keys to your TMS (translate nested fields as JSON if needed).
3. Export translated CSV or JSON from the TMS.
4. Import back with:
   - `npm run content:import -- translations.csv` for flat fields (`title`, `description`, site labels)
   - `npm run content:import:json -- translations.json` for full page documents

### Option B — Spreadsheet + CSV

For copywriters who prefer Excel/Google Sheets:

```csv
type,locale,slug,field,value
site,fr,,tagline,Les meilleures destinations du monde
page,fr,home,title,Accueil
page,fr,home,description,Decouvrez les meilleures destinations...
```

Run `npm run content:import:dry` first to validate paths.

### Option C — Clone then translate in Keystatic

```bash
npm run content:clone -- --from en --to fr --all
```

This copies all English page YAML into `content/pages/fr/` as a starting point. Translators then edit in Keystatic or replace files after review.

## JSON bulk import (full pages)

`scripts/examples/content-import.sample.json`:

```json
{
  "type": "page",
  "locale": "fr",
  "slug": "home",
  "data": {
    "slug": "home",
    "title": "Accueil",
    "description": "...",
    "sections": []
  }
}
```

Pass an array to update multiple pages/locales in one run.

## RTL preview (Arabic)

Arabic site settings and pages use `dir="rtl"` on `<html>`. Always preview Arabic at `/ar/` (linked from the translation dashboard as **Preview RTL**). Do not rely on the Keystatic editor for RTL layout checks.

## Fallback behaviour

If a locale file is missing, the site build falls back to English content for that page or setting. The translation dashboard marks missing files so you can spot gaps before launch.

## Scripts reference

| Command | Purpose |
|---------|---------|
| `npm run content:import -- file.csv` | Update site/page fields from CSV |
| `npm run content:import:json -- file.json` | Replace full page or site YAML from JSON |
| `npm run content:import:dry` | Dry-run sample CSV |
| `npm run content:clone -- --from en --to fr --all` | Copy all pages to a new locale |
