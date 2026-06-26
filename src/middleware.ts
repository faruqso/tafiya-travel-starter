import { defineMiddleware } from 'astro:middleware';
import { isKeystaticEditEnabled, isKeystaticEditPath } from './lib/keystatic-public';

export const onRequest = defineMiddleware(async (context, next) => {
  if (isKeystaticEditEnabled()) {
    return next();
  }

  const { pathname } = context.url;

  if (context.request.method === 'POST' && pathname === '/api/keystatic/update') {
    return context.redirect('/keystatic/get-started?reason=save');
  }

  if (isKeystaticEditPath(pathname)) {
    return context.redirect('/keystatic/get-started?reason=edit');
  }

  return next();
});
