import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { withSentryConfig } from '@sentry/nextjs';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {};

// Compose: next-intl wraps first (because it transforms imports), then
// Sentry wraps the whole thing for source-map upload + build-time
// instrumentation. Order matters — Sentry's wrapper expects to be the
// outermost layer so it can see the final config.
//
// org / project / auth token pulled from env vars (SENTRY_ORG,
// SENTRY_PROJECT, SENTRY_AUTH_TOKEN) at build time. When unset,
// withSentryConfig skips source-map upload and behaves as a passthrough.
export default withSentryConfig(withNextIntl(nextConfig), {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: '/monitoring',

  webpack: {
    automaticVercelMonitors: true,
    treeshake: { removeDebugLogging: true },
  },
});
