/*
 * Client-side instrumentation entry point.
 *
 * Next.js 16 picks this file up automatically (no config needed) and
 * loads it before the app's frontend code starts executing. It's the
 * browser-side analogue of `instrumentation.ts` and is the documented
 * place to wire up:
 *   - Sentry's browser SDK (this file does that)
 *   - Any other "must run before app code" client init (analytics
 *     auto-track, error tracking, performance hooks, etc.)
 *
 * Vercel Web Analytics + Speed Insights are NOT initialized here on
 * purpose — they ship as React components mounted in the layout
 * (src/app/[locale]/layout.tsx) which gives them access to App Router
 * navigation events for free. If we ever migrate to a non-component
 * tracker, this file is the right place to put it.
 *
 * No-ops cleanly when NEXT_PUBLIC_SENTRY_DSN is unset, so this is safe
 * to commit before Marta provisions a Sentry project. Note: client SDK
 * needs the NEXT_PUBLIC_ prefix because the DSN gets bundled into the
 * browser script and Next.js will only inline env vars with that prefix.
 *
 * Required reading before touching this file:
 *   node_modules/next/dist/docs/01-app/02-guides/analytics.md (Client
 *   Instrumentation section)
 */

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.NODE_ENV ?? 'development',
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  // Session Replay: capture 10% of normal sessions and 100% of sessions
  // where an error occurred. Replay is the highest-leverage thing in the
  // Sentry product for a small site — it lets Marta see exactly what a
  // visitor did before something broke. Disable by setting both rates to
  // 0 if it ever feels invasive.
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [
    Sentry.replayIntegration({
      // Mask all text + inputs by default so we never accidentally capture
      // PII (consultation form names, emails, etc.). Replays are still
      // useful for layout / interaction debugging without the content.
      maskAllText: true,
      blockAllMedia: false,
    }),
  ],
});

// App Router navigation tracing — Sentry exposes this as a named export
// from `instrumentation-client` and Next.js will call it automatically
// on every router transition. Without this, the Sentry "Performance" tab
// won't see client-side route changes.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
