export const prerender = false;

import type { APIRoute } from 'astro';
import { appendSubmission, isValidEmail } from '../../lib/forms';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim() ?? '';

    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ error: 'Please enter a valid email address.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await appendSubmission('subscribe', { email });

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
