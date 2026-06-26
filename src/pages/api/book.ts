export const prerender = false;

import type { APIRoute } from 'astro';
import { appendSubmission, isValidEmail } from '../../lib/forms';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = (await request.json()) as Record<string, string | undefined>;
    const name = body.name?.trim() ?? '';
    const email = body.email?.trim() ?? '';
    const kind = body.kind?.trim() ?? '';
    const item = body.item?.trim() ?? '';
    const departureDate = body.departureDate?.trim() ?? '';
    const adults = body.adults?.trim() ?? '';

    if (!name || !isValidEmail(email) || !kind || !item || !departureDate || !adults) {
      return new Response(
        JSON.stringify({ error: 'Name, email, trip selection, departure date, and travelers are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    await appendSubmission('book', {
      name,
      email,
      phone: body.phone?.trim() ?? '',
      kind,
      item,
      duration: body.duration?.trim() ?? '',
      estimatedPrice: body.estimatedPrice?.trim() ?? '',
      departureDate,
      returnDate: body.returnDate?.trim() ?? '',
      adults,
      children: body.children?.trim() ?? '0',
      requests: body.requests?.trim() ?? '',
    });

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
