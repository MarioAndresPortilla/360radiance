import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/constants';

const BASE = 'https://360radianceskincare.com';
const LOCALES = ['en', 'es'] as const;
const ROUTES = ['', '/services', '/results', '/about', '/products', '/reviews', '/blog', '/contact'];

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

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.flatMap((post) =>
    LOCALES.map((locale) => ({
      url: locale === 'en' ? `${BASE}/blog/${post.slug}` : `${BASE}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: buildAlternates(`/blog/${post.slug}`),
    }))
  );

  return [...pages, ...blogPages];
}
