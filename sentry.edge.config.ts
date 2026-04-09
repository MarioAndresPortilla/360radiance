/*
 * Sentry — Edge runtime initializer.
 *
 * Loaded from instrumentation.ts when NEXT_RUNTIME === 'edge'. The edge
 * runtime is what Vercel uses to execute middleware and any route handler
 * with `export const runtime = 'edge'`.
 *
 * Kept separate from sentry.server.config.ts because the @sentry/nextjs
 * SDK ships a smaller edge-compatible build under the hood and won't pull
 * in Node-only modules. Same DSN, same env, same sample rates as server.
 *
 * No-ops cleanly when SENTRY_DSN is unset.
 */

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? 'development',
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  debug: false,
});
