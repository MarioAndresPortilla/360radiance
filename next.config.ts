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
// Sentry build options:
//   - silent in CI / production builds (Vercel) so the build log isn't
//     drowned in upload chatter; verbose in local dev so we can see
//     what's happening.
//   - org / project pulled from env at build time. When unset (e.g. on
//     Marta's first deploy before she connects Sentry), withSentryConfig
//     skips source-map upload and behaves as a passthrough — the SDK
//     itself still loads at runtime and no-ops cleanly without a DSN.
//   - widenClientFileUpload: true so we upload all client bundles, not
//     just the page entry chunks. Without this, stack traces from
//     dynamic imports (and we have a few — ProductModal, CartDrawer)
//     come back unminified and unreadable in the Sentry UI.
//   - tunnelRoute: route Sentry calls through our own domain so client
//     ad-blockers (uBlock, Brave shields) don't drop error reports.
const sentryBuildOptions = {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: '/monitoring',
};

export default withSentryConfig(withNextIntl(nextConfig), sentryBuildOptions);
