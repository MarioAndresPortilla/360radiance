'use client';

/*
 * Root error boundary — catches errors that escape every other React
 * boundary in the app, including errors thrown during the render of the
 * root layout itself. Without this file, an unhandled root render error
 * shows the bare Next.js fallback and Sentry never sees it.
 *
 * Two responsibilities:
 *   1. Tell Sentry — useEffect calls Sentry.captureException as soon as
 *      the boundary mounts, so we get full stack traces in the Sentry
 *      dashboard with breadcrumbs from the failing session.
 *   2. Show the user a graceful fallback — branded copy and a "try
 *      again" button. global-error MUST render its own <html> and <body>
 *      because it replaces the root layout when triggered.
 *
 * Required reading:
 *   https://nextjs.org/docs/app/api-reference/file-conventions/error
 *   https://docs.sentry.io/platforms/javascript/guides/nextjs/usage/global-error/
 */

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import NextError from 'next/error';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        {/* Fall back to Next.js's built-in error component for the visual.
            It already handles dark mode, accessibility, and basic styling
            without depending on any of our app-level providers (which
            may be the thing that crashed). */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
