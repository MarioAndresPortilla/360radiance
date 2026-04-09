/*
 * Server + edge instrumentation entry point.
 *
 * Next.js calls `register()` exactly once when each runtime boots, before
 * the first request is served. We use it to initialize Sentry on the
 * matching runtime so server actions, route handlers, RSCs, and middleware
 * all report errors and traces to the same project.
 *
 * The runtime is exposed as `process.env.NEXT_RUNTIME` (`'nodejs'` |
 * `'edge'`), and we conditionally import each runtime-specific config so
 * the Node SDK isn't pulled into the edge bundle (which would fail at
 * build time — the Node SDK uses APIs the Edge runtime doesn't ship).
 *
 * Both `sentry.server.config.ts` and `sentry.edge.config.ts` are no-ops
 * when SENTRY_DSN is unset, so this is safe to leave wired up before
 * Marta provisions a Sentry project. The client side is initialized
 * separately by `instrumentation-client.ts` (Next 16 picks that up
 * automatically as the browser-side analogue of this file).
 *
 * Required reading before touching this file:
 *   node_modules/next/dist/docs/01-app/02-guides/instrumentation.md
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}

// Sentry exports a helper that the Next.js App Router can call on every
// router transition. Re-exporting it from here is the documented way to
// wire up navigation tracing for the App Router.
export { captureRequestError } from '@sentry/nextjs';
