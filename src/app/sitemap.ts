import { execFileSync } from 'node:child_process';
import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/constants';

const BASE = 'https://360radianceskincare.com';
const LOCALES = ['en', 'es'] as const;

// Marketing routes — high SEO priority, refreshed weekly.
const ROUTES = ['', '/services', '/results', '/about', '/products', '/reviews', '/blog', '/contact'];
// Legal pages — included for completeness and link discoverability, but kept
// at a lower priority/frequency since they rarely change.
const LEGAL_ROUTES = ['/privacy', '/terms'];

// Per-route source files. `gitMtime()` runs `git log -1 --format=%cI` over these
// at build time to derive an accurate <lastmod> — no manual bumping required,
// because content lives in code and content changes are commits. When a route's
// page pulls from a data file (services, products), we include it so edits in
// src/data/ also move lastmod. Blog posts bypass this entirely — each post
// carries its own editorial `date` (see BLOG_POSTS).
//
// Fallback dates kick in when git history isn't deep enough (Vercel does
// shallow clones; a file untouched for many commits may produce empty output).
// Treat them as a floor, not a source of truth — they exist to prevent the
// sitemap from shipping a bogus `1970-01-01`.
const ROUTE_SOURCES: Record<string, { files: string[]; fallback: string }> = {
  '': { files: ['src/app/[locale]/page.tsx'], fallback: '2026-04-18' },
  '/services': { files: ['src/app/[locale]/services/page.tsx', 'src/data/services.ts'], fallback: '2026-04-12' },
  '/results': { files: ['src/app/[locale]/results/page.tsx'], fallback: '2026-04-12' },
  '/about': { files: ['src/app/[locale]/about/page.tsx'], fallback: '2026-04-12' },
  '/products': { files: ['src/app/[locale]/products/page.tsx', 'src/data/products.ts'], fallback: '2026-04-18' },
  '/reviews': { files: ['src/app/[locale]/reviews/page.tsx'], fallback: '2026-04-12' },
  '/blog': { files: ['src/app/[locale]/blog/page.tsx'], fallback: '2026-04-12' },
  '/contact': { files: ['src/app/[locale]/contact/page.tsx'], fallback: '2026-04-12' },
};
const LEGAL_SOURCES: Record<string, { files: string[]; fallback: string }> = {
  '/privacy': { files: ['src/app/[locale]/privacy/page.tsx'], fallback: '2026-03-01' },
  '/terms': { files: ['src/app/[locale]/terms/page.tsx'], fallback: '2026-03-01' },
};

function gitMtime(files: string[], fallback: string): Date {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...files], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (out) {
      const d = new Date(out);
      if (!Number.isNaN(d.getTime())) return d;
    }
  } catch {
    // git not available (e.g. Vercel preview of a deploy without full history,
    // or a local sandbox without git) → fall through to fallback.
  }
  return new Date(fallback);
}

function buildAlternates(path: string) {
  return {
    languages: {
      en: `${BASE}${path || '/'}`,
      es: `${BASE}/es${path}`,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = ROUTES.flatMap((route) => {
    const src = ROUTE_SOURCES[route];
    const lastModified = gitMtime(src.files, src.fallback);
    return LOCALES.map((locale) => ({
      url: locale === 'en' ? `${BASE}${route || '/'}` : `${BASE}/${locale}${route}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
      alternates: buildAlternates(route),
    }));
  });

  const legalPages: MetadataRoute.Sitemap = LEGAL_ROUTES.flatMap((route) => {
    const src = LEGAL_SOURCES[route];
    const lastModified = gitMtime(src.files, src.fallback);
    return LOCALES.map((locale) => ({
      url: locale === 'en' ? `${BASE}${route}` : `${BASE}/${locale}${route}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
      alternates: buildAlternates(route),
    }));
  });

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.flatMap((post) =>
    LOCALES.map((locale) => ({
      url: locale === 'en' ? `${BASE}/blog/${post.slug}` : `${BASE}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: buildAlternates(`/blog/${post.slug}`),
    }))
  );

  return [...pages, ...blogPages, ...legalPages];
}
