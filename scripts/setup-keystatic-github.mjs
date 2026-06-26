#!/usr/bin/env node
/**
 * One-shot Keystatic GitHub App setup:
 * 1. Opens GitHub App creation (auto-submit form)
 * 2. Waits for local dev server to write .env credentials
 * 3. Pushes env vars to Vercel and triggers production deploy
 *
 * Prerequisites: `npm run dev` running on port 4321, `gh auth login`, `npx vercel link`
 */
import { execSync, spawn } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { randomBytes } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DEPLOYED_URL = 'https://tafiya-travel-starter.vercel.app';
const DEV_ORIGIN = 'http://127.0.0.1:4321';
const ENV_FILE = join(ROOT, '.env');
const POLL_MS = 2000;
const POLL_TIMEOUT_MS = 180_000;

const manifest = {
  name: 'faruqso Keystatic',
  url: `${DEPLOYED_URL}/keystatic`,
  public: true,
  redirect_url: `${DEV_ORIGIN}/api/keystatic/github/created-app`,
  callback_urls: [
    `${DEV_ORIGIN}/api/keystatic/github/oauth/callback`,
    'http://127.0.0.1/api/keystatic/github/oauth/callback',
    `${DEPLOYED_URL}/api/keystatic/github/oauth/callback`,
  ],
  request_oauth_on_install: true,
  default_permissions: {
    contents: 'write',
    metadata: 'read',
    pull_requests: 'read',
  },
};

function parseEnv(content) {
  /** @type {Record<string, string>} */
  const vars = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    vars[trimmed.slice(0, eq)] = trimmed.slice(eq + 1).trim();
  }
  return vars;
}

function ensureDevServer() {
  try {
    const res = execSync(`curl -s -o /dev/null -w '%{http_code}' ${DEV_ORIGIN}/keystatic/setup`, {
      encoding: 'utf8',
    });
    if (!res.includes('200')) {
      throw new Error(`unexpected status ${res}`);
    }
  } catch {
    console.error('\n❌ Dev server not reachable at', DEV_ORIGIN);
    console.error('   Run `npm run dev` in another terminal, then re-run this script.\n');
    process.exit(1);
  }
}

function seedSecretIfNeeded() {
  let content = existsSync(ENV_FILE) ? readFileSync(ENV_FILE, 'utf8') : '';
  if (!content.includes('KEYSTATIC_SECRET=')) {
    const secret = randomBytes(32).toString('hex');
    content = content.trimEnd() + (content ? '\n\n' : '') + `# Keystatic\nKEYSTATIC_SECRET=${secret}\n`;
    writeFileSync(ENV_FILE, content);
    console.log('✓ Generated KEYSTATIC_SECRET in .env');
  }
}

function openGitHubAppCreation() {
  const tmpDir = join(ROOT, '.tmp');
  mkdirSync(tmpDir, { recursive: true });
  const htmlPath = join(tmpDir, 'keystatic-github-app.html');
  const manifestJson = JSON.stringify(manifest).replace(/'/g, '&#39;');
  writeFileSync(
    htmlPath,
    `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Create Keystatic GitHub App</title></head>
<body>
<p>Redirecting to GitHub to create the Keystatic app…</p>
<form id="f" action="https://github.com/settings/apps/new" method="post">
  <input type="hidden" name="manifest" value='${manifestJson}' />
</form>
<script>document.getElementById('f').submit();</script>
</body></html>`,
  );
  execSync(`open "${htmlPath}"`);
  console.log('✓ Opened GitHub App creation in your browser');
  console.log('  → Approve the app on GitHub if prompted, then install it on faruqso/tafiya-travel-starter');
}

async function waitForCredentials() {
  const deadline = Date.now() + POLL_TIMEOUT_MS;
  while (Date.now() < deadline) {
    if (existsSync(ENV_FILE)) {
      const vars = parseEnv(readFileSync(ENV_FILE, 'utf8'));
      if (vars.KEYSTATIC_GITHUB_CLIENT_ID && vars.KEYSTATIC_GITHUB_CLIENT_SECRET) {
        return vars;
      }
    }
    await new Promise((r) => setTimeout(r, POLL_MS));
    process.stdout.write('.');
  }
  console.error('\n\n❌ Timed out waiting for GitHub App credentials in .env');
  console.error('   Complete GitHub App creation in the browser, then re-run this script.\n');
  process.exit(1);
}

function pushEnvToVercel(vars) {
  const keys = [
    'KEYSTATIC_GITHUB_CLIENT_ID',
    'KEYSTATIC_GITHUB_CLIENT_SECRET',
    'KEYSTATIC_SECRET',
    'PUBLIC_KEYSTATIC_GITHUB_APP_SLUG',
  ];
  for (const key of keys) {
    const value = vars[key];
    if (!value) {
      console.warn(`⚠ Skipping ${key} — not found in .env`);
      continue;
    }
    for (const target of ['production', 'preview', 'development']) {
      try {
        execSync(`npx vercel env rm ${key} ${target} --yes`, { cwd: ROOT, stdio: 'pipe' });
      } catch {
        /* not set yet */
      }
      execSync(`printf '%s' '${value.replace(/'/g, "'\\''")}' | npx vercel env add ${key} ${target}`, {
        cwd: ROOT,
        stdio: 'inherit',
      });
    }
    console.log(`✓ Set ${key} on Vercel (production, preview, development)`);
  }
}

function deployProduction() {
  console.log('\nDeploying to Vercel production…');
  execSync('npx vercel deploy --prod --yes', { cwd: ROOT, stdio: 'inherit' });
}

ensureDevServer();
seedSecretIfNeeded();

const existing = existsSync(ENV_FILE) ? parseEnv(readFileSync(ENV_FILE, 'utf8')) : {};
if (existing.KEYSTATIC_GITHUB_CLIENT_ID && existing.KEYSTATIC_GITHUB_CLIENT_SECRET) {
  console.log('✓ GitHub App credentials already in .env — skipping browser setup');
} else {
  openGitHubAppCreation();
  console.log('\nWaiting for credentials (complete GitHub flow in browser)');
  const vars = await waitForCredentials();
  console.log('\n✓ Credentials saved to .env');
  Object.assign(existing, vars);
}

const allVars = existsSync(ENV_FILE) ? parseEnv(readFileSync(ENV_FILE, 'utf8')) : existing;
pushEnvToVercel(allVars);
deployProduction();

console.log('\n✅ Done! Keystatic GitHub mode is live.');
console.log(`   Admin: ${DEPLOYED_URL}/keystatic`);
console.log('   Log in with GitHub to edit content.\n');
