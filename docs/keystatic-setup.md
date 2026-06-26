# Keystatic CMS setup

This starter ships with [Keystatic](https://keystatic.com) — a git-based CMS. Content lives in `content/` as YAML files. You can edit them directly in your editor **or** use the browser admin at `/keystatic`.

Each person who forks this template connects Keystatic to **their own GitHub repo**. You do not share credentials with the original template author.

---

## Browse-only demo (default on live sites)

Out of the box, `/keystatic` on a deployed site is **browse-only**:

- Visitors see the full dashboard and all collection entries
- Clicking **edit**, **create**, or **save** redirects to `/keystatic/get-started` with instructions to **fork the repo** and set up their own CMS
- No GitHub login is required just to look around

This is intentional for a starter template — your public demo can show the CMS without letting strangers change your content.

### Enable editing on your deployment

When **you** are ready to save from the browser on your own fork:

1. Complete the GitHub App setup below
2. Set `PUBLIC_KEYSTATIC_EDIT_ENABLED=true` in `.env` and on your host (Vercel, etc.)
3. Redeploy

Without `PUBLIC_KEYSTATIC_EDIT_ENABLED=true`, even valid GitHub credentials stay in browse-only mode.

---

## Choose your workflow

| Workflow | Best for | Setup |
|----------|----------|-------|
| **Edit YAML in git** | Solo developers, comfortable with code | None — edit `content/` and push |
| **Keystatic admin (local)** | Visual editing while developing | GitHub App + `.env` (see below) |
| **Keystatic admin (live site)** | Non-technical teammates editing on production | GitHub App + `.env` + host env vars |

The public website is always static HTML built from YAML at deploy time. The `/keystatic` route is a separate admin UI that commits changes back to your repo.

---

## Step 1 — Point Keystatic at your repo

After forking or creating your own repository, update the repo string in `keystatic.config.ts`:

```ts
const KEYSTATIC_REPO = 'your-github-username/your-repo-name';
```

Replace the default (`faruqso/tafiya-travel-starter`) with **your** fork, e.g. `jane/acme-travel`.

Commit and push this change to your repo.

---

## Step 2 — Create a GitHub App (one-time)

Keystatic uses a GitHub App to read and write content in your repo. Each deployment needs its own app — do not reuse someone else's credentials.

### Option A — Keystatic setup UI (try this first)

1. Run `npm run dev`
2. Open [http://127.0.0.1:4321/keystatic/setup](http://127.0.0.1:4321/keystatic/setup) in **Chrome or Safari** (not an embedded IDE browser)
3. Optionally enter your deployed site URL (e.g. `https://my-site.vercel.app`)
4. Click **Create GitHub App** and follow GitHub's prompts
5. Install the app on **your** repository when asked
6. Keystatic writes credentials to a local `.env` file

If GitHub returns a **500 error** on the manifest page, use Option B instead.

### Option B — Create the app manually on GitHub

1. Open [GitHub → Settings → Developer settings → GitHub Apps → New GitHub App](https://github.com/settings/apps/new)
2. Fill in:
   - **GitHub App name:** something unique, e.g. `my-travel-site-keystatic`
   - **Homepage URL:** `https://your-domain.com/keystatic` (or `http://127.0.0.1:4321/keystatic` while setting up)
   - **Callback URL:** `http://127.0.0.1:4321/api/keystatic/github/oauth/callback`
3. Under **Webhook**, **uncheck Active** — Keystatic does not use webhooks
4. Under **Permissions → Repository permissions**, set:
   - **Contents:** Read and write
   - **Metadata:** Read-only
   - **Pull requests:** Read-only (if shown)
5. Click **Create GitHub App**
6. On the app settings page, add **all** of these callback URLs:
   - `http://127.0.0.1:4321/api/keystatic/github/oauth/callback`
   - `http://127.0.0.1/api/keystatic/github/oauth/callback`
   - `http://localhost:4321/api/keystatic/github/oauth/callback`
   - `https://your-domain.com/api/keystatic/github/oauth/callback` (your production URL)
7. Click **Generate a new client secret** and copy it immediately (shown once)
8. Copy the **Client ID** from the **About** section (starts with `Iv…` — not the numeric App ID)
9. Note the **app slug** from the URL: `github.com/settings/apps/`**`your-app-slug`**
10. [Install the app](https://github.com/settings/installations) on your repository

---

## Step 3 — Configure environment variables

Create a `.env` file in the project root (see `.env.example`):

```env
KEYSTATIC_GITHUB_CLIENT_ID=Iv1.xxxxx
KEYSTATIC_GITHUB_CLIENT_SECRET=your_client_secret
KEYSTATIC_SECRET=any_long_random_string
PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=your-app-slug
```

| Variable | Where to get it |
|----------|-----------------|
| `KEYSTATIC_GITHUB_CLIENT_ID` | GitHub App → About → **Client ID** |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | GitHub App → **Generate a new client secret** |
| `KEYSTATIC_SECRET` | Any random string (32+ chars). Generate with `openssl rand -hex 32` |
| `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | The slug in your app settings URL |

Restart `npm run dev` after creating `.env`, then open [http://127.0.0.1:4321/keystatic](http://127.0.0.1:4321/keystatic) and **Sign in with GitHub**.

---

## Step 4 — Enable editing on your live site (Vercel)

Local `.env` is not deployed. To **save** from `/keystatic` on production (not just browse):

1. In [Vercel → your project → Settings → Environment Variables](https://vercel.com/docs/projects/environment-variables), add all four `KEYSTATIC_*` variables from Step 3
2. Add **`PUBLIC_KEYSTATIC_EDIT_ENABLED=true`**
3. Apply them to **Production**, **Preview**, and **Development**
4. Redeploy

The Vercel adapter in `astro.config.mjs` already bundles `content/` into serverless functions so the admin can read your entries.

Other hosts that support Node.js serverless functions (Netlify, etc.) can work too — copy the same env vars and ensure Keystatic API routes are deployed. See [Keystatic deploying docs](https://keystatic.com/docs/github-mode).

---

## Who can edit content?

| Person | Can edit via `/keystatic`? |
|--------|----------------------------|
| You (repo owner) | Yes |
| GitHub collaborators with **Write** or **Admin** on the repo | Yes |
| Anyone visiting your public website | No |

To give a teammate access: **GitHub repo → Settings → Collaborators** → invite them with Write permission. They sign in with their own GitHub account at `/keystatic`.

Random visitors cannot edit your site even if they discover the `/keystatic` URL.

---

## Editing without the CMS UI

You never need `/keystatic` if you prefer git:

1. Edit files under `content/`
2. Commit and push to GitHub
3. Your host rebuilds and deploys

This works on any static host with no extra configuration.

---

## Troubleshooting

### Blank page at `/keystatic`

Hard-refresh the page. If the browser console shows `process is not defined`, pull the latest template — the config uses `import.meta.env.SSR` to avoid running server code in the browser.

### GitHub 500 when creating the app

Use **Option B** (manual app creation) in a normal browser, not an embedded IDE preview.

### "App ID" vs "Client ID"

Keystatic needs the **Client ID** (string like `Iv1.…`), not the numeric **App ID**.

### Changes on live don't appear immediately

Keystatic commits to GitHub. Your host must rebuild after each push. On Vercel, a new deployment starts automatically when Keystatic saves to the repo.

### Wrong repo / "Repo not found"

Check `KEYSTATIC_REPO` in `keystatic.config.ts` matches your fork and that the GitHub App is installed on that repository.

---

## Further reading

- [Keystatic GitHub mode](https://keystatic.com/docs/github-mode)
- [Customization guide](./customization.md) — rebrand, pages, catalog, deploy
- [Contributing content](../CONTRIBUTING.md) — where each content type lives
