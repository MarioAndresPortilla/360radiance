import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    // - … the sentry example page (outside locale routing)
    // - … `/monitoring` (Sentry tunnelRoute) — must reach Sentry's
    //   build-injected rewrite, not get locale-prefixed by next-intl.
    //   Without this exclusion the SDK's POST /monitoring 404s.
    '/((?!api|_next|_vercel|monitoring|sentry-example-page|.*\\..*).*)',
  ],
};
