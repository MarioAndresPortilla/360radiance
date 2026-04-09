/*
 * Sentry — Node.js / server runtime initializer.
 *
 * Loaded from instrumentation.ts when NEXT_RUNTIME === 'nodejs'. Captures
 * unhandled errors and traces from server actions, route handlers, RSC
 * renders, and the static build itself.
 *
 * Behavior:
 *   - Reads SENTRY_DSN from env. If unset, Sentry no-ops cleanly with no
 *     errors at runtime — safe to commit before Marta provisions a
 *     Sentry project.
 *   - tracesSampleRate: 0.1 in production (10% of requests get a trace),
 *     1.0 in development so we can verify the wiring locally.
 *   - debug: only on in development to avoid log noise in prod.
 *   - Tags every event with the deploy environment so the Sentry UI can
 *     filter prod vs preview vs dev.
 */

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? 'development',
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  debug: false,
  // Server-side errors are usually not noisy enough to need denylists.
  // If we start seeing health-check spam, add it here.
});
