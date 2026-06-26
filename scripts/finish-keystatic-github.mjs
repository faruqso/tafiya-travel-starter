#!/usr/bin/env node
/**
 * Manual Keystatic GitHub App setup — use when the manifest flow 500s
 * (common in embedded browsers). Creates the app via GitHub's URL form,
 * then collects credentials and deploys to Vercel.
 *
 * Prerequisites: `npm run dev`, `gh auth login`, `npx vercel link`
 */
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ENV_FILE = join(ROOT, '.env');
const DEPLOYED_URL = 'https://tafiya-travel-starter.vercel.app';
const APP_NAME = 'tafiya-travel-keystatic';

const MANUAL_CREATE_URL =
  'https://github.com/settings/apps/new' +
  `?name=${encodeURIComponent(APP_NAME)}` +
  `&url=${encodeURIComponent(`${DEPLOYED_URL}/keystatic`)}` +
  `&callback_url=${encodeURIComponent('http://127.0.0.1:4321/api/keystatic/github/oauth/callback')}` +
  '&request_user_authorization=1&public=1&contents=write&metadata=read&pull_requests=read';

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

function writeEnv(vars) {
  const lines = ['# Keystatic'];
  for (const key of [
    'KEYSTATIC_GITHUB_CLIENT_ID',
    'KEYSTATIC_GITHUB_CLIENT_SECRET',
    'KEYSTATIC_SECRET',
    'PUBLIC_KEYSTATIC_GITHUB_APP_SLUG',
  ]) {
    if (vars[key]) lines.push(`${key}=${vars[key]}`);
  }
  writeFileSync(ENV_FILE, lines.join('\n') + '\n');
}

function pushEnvToVercel(vars) {
  for (const key of [
    'KEYSTATIC_GITHUB_CLIENT_ID',
    'KEYSTATIC_GITHUB_CLIENT_SECRET',
    'KEYSTATIC_SECRET',
    'PUBLIC_KEYSTATIC_GITHUB_APP_SLUG',
  ]) {
    const value = vars[key];
    if (!value) continue;
    for (const target of ['production', 'preview', 'development']) {
      try {
        execSync(`npx vercel env rm ${key} ${target} --yes`, { cwd: ROOT, stdio: 'pipe' });
      } catch {
        /* not set */
      }
      execSync(`printf '%s' '${value.replace(/'/g, "'\\''")}' | npx vercel env add ${key} ${target}`, {
        cwd: ROOT,
        stdio: 'inherit',
      });
    }
    console.log(`✓ Set ${key} on Vercel`);
  }
}

console.log(`
Manual Keystatic GitHub App setup
─────────────────────────────────
Opening GitHub in your system browser (Chrome/Safari — NOT Cursor's preview).

On GitHub:
  1. Click "Create GitHub App"
  2. Open the app → Settings → add these Callback URLs:
     • http://127.0.0.1:4321/api/keystatic/github/oauth/callback
     • http://127.0.0.1/api/keystatic/github/oauth/callback
     • http://localhost:4321/api/keystatic/github/oauth/callback
     • ${DEPLOYED_URL}/api/keystatic/github/oauth/callback
  3. Generate a Client Secret (copy it — shown once)
  4. Install the app on faruqso/tafiya-travel-starter
`);

execSync(`open "${MANUAL_CREATE_URL}"`);

const rl = createInterface({ input, output });
const existing = existsSync(ENV_FILE) ? parseEnv(readFileSync(ENV_FILE, 'utf8')) : {};

const clientId = await rl.question('GitHub App Client ID: ');
const clientSecret = await rl.question('GitHub App Client Secret: ');
const slug =
  (await rl.question(`App slug [${APP_NAME}]: `)).trim() || APP_NAME;
const secret =
  existing.KEYSTATIC_SECRET ||
  (await rl.question('KEYSTATIC_SECRET (leave blank to keep existing): ')).trim();

rl.close();

const vars = {
  KEYSTATIC_GITHUB_CLIENT_ID: clientId.trim(),
  KEYSTATIC_GITHUB_CLIENT_SECRET: clientSecret.trim(),
  KEYSTATIC_SECRET: secret || existing.KEYSTATIC_SECRET,
  PUBLIC_KEYSTATIC_GITHUB_APP_SLUG: slug,
};

if (!vars.KEYSTATIC_GITHUB_CLIENT_ID || !vars.KEYSTATIC_GITHUB_CLIENT_SECRET || !vars.KEYSTATIC_SECRET) {
  console.error('\n❌ Missing required values.');
  process.exit(1);
}

writeEnv(vars);
console.log('\n✓ Saved .env');

pushEnvToVercel(vars);

console.log('\nDeploying to Vercel production…');
execSync('npx vercel deploy --prod --yes', { cwd: ROOT, stdio: 'inherit' });

console.log(`\n✅ Done! Open ${DEPLOYED_URL}/keystatic and sign in with GitHub.\n`);
