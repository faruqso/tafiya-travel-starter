export const prerender = false;

import type { APIRoute } from 'astro';
import { appendSubmission, isValidEmail } from '../../lib/forms';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = (await request.json()) as { name?: string; email?: string; message?: string };
    const name = body.name?.trim() ?? '';
    const email = body.email?.trim() ?? '';
    const message = body.message?.trim() ?? '';

    if (!name || !isValidEmail(email) || !message) {
      return new Response(JSON.stringify({ error: 'Name, valid email, and message are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await appendSubmission('contact', { name, email, message });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Something went wrong. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
