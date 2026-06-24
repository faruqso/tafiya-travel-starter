import fs from 'node:fs/promises';
import path from 'node:path';

const DATA_DIR = path.join(process.cwd(), 'data');

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function appendSubmission(
  type: 'subscribe' | 'contact',
  data: Record<string, string>,
): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const file = path.join(DATA_DIR, `${type}.json`);

  let entries: Array<Record<string, string>> = [];
  try {
    const raw = await fs.readFile(file, 'utf-8');
    entries = JSON.parse(raw) as Array<Record<string, string>>;
  } catch {
    entries = [];
  }

  entries.push({ ...data, createdAt: new Date().toISOString() });
  await fs.writeFile(file, JSON.stringify(entries, null, 2));
}
