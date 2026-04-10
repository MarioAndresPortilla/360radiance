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

export default withSentryConfig(withNextIntl(nextConfig), {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "bluemintstudios",

  project: "360radiance",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});
