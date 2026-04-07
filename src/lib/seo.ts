import type { Metadata } from 'next';

// Single source of truth for the production canonical host. If we ever move
// domains, this is the only place to update — sitemap.ts and robots.ts read
// from string literals because they run at build time and can't import
// constants.ts cleanly, but everything served at runtime should pull from
// here.
export const SITE_URL = 'https://360radianceskincare.com';

// Locales are intentionally hard-coded rather than imported from
// next-intl/routing because next-intl's routing module pulls in client
// runtime that we don't want in metadata generation.
const LOCALES = ['en', 'es'] as const;
type Locale = (typeof LOCALES)[number];

// Build the locale-prefixed path the way next-intl's `as-needed` strategy
// produces it: English has no prefix at the root, every other locale gets
// `/<locale>` in front of the path.
function localizedPath(locale: string, path: string): string {
  const cleanPath = path === '/' ? '' : path;
  if (locale === 'en') return cleanPath || '/';
  return `/${locale}${cleanPath}`;
}

// Build per-page alternates: a canonical pointing at THIS locale's URL plus
// hreflang entries for every other locale + an x-default. The root layout
// already sets a default canonical of '/', but Next.js does NOT automatically
// override that on child routes — without this helper every page would point
// its canonical at the homepage. Always pass `path` as the route-relative
// path WITHOUT the locale prefix (e.g. '/services', '/blog/foo').
export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  ogImage = '/og-image.png',
  ogType = 'website',
  noIndex = false,
}: {
  locale: string;
  path: string;
  title?: string;
  description?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
}): Metadata {
  const localePath = localizedPath(locale, path);
  const canonicalUrl = `${SITE_URL}${localePath}`;

  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${SITE_URL}${localizedPath(l, path)}`;
  }
  // Google treats x-default as the fallback for unmatched locales. Pointing
  // it at the English version is the standard pattern for an en/es site.
  languages['x-default'] = `${SITE_URL}${localizedPath('en', path)}`;

  const metadata: Metadata = {
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      url: canonicalUrl,
      locale: locale === 'es' ? 'es_US' : 'en_US',
      alternateLocale: locale === 'es' ? ['en_US'] : ['es_US'],
      type: ogType,
      images: [{ url: ogImage, width: 1200, height: 630, alt: '360 Radiance — Paramedical Skincare in Sunrise, FL' }],
      ...(title && { title }),
      ...(description && { description }),
    },
  };

  if (title) metadata.title = title;
  if (description) metadata.description = description;

  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: true,
    };
  }

  return metadata;
}

export type { Locale };
