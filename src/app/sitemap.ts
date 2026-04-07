import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/constants';

const BASE = 'https://360radianceskincare.com';
const LOCALES = ['en', 'es'] as const;
// Marketing routes — high SEO priority, refreshed weekly.
const ROUTES = ['', '/services', '/results', '/about', '/products', '/reviews', '/blog', '/contact'];
// Legal pages — included for completeness and link discoverability, but kept
// at a lower priority/frequency since they rarely change.
const LEGAL_ROUTES = ['/privacy', '/terms'];

function buildAlternates(path: string) {
  return {
    languages: {
      en: `${BASE}${path}`,
      es: `${BASE}/es${path}`,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = ROUTES.flatMap((route) =>
    LOCALES.map((locale) => ({
      url: locale === 'en' ? `${BASE}${route || '/'}` : `${BASE}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
      alternates: buildAlternates(route),
    }))
  );

  const legalPages: MetadataRoute.Sitemap = LEGAL_ROUTES.flatMap((route) =>
    LOCALES.map((locale) => ({
      url: locale === 'en' ? `${BASE}${route}` : `${BASE}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
      alternates: buildAlternates(route),
    }))
  );

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
