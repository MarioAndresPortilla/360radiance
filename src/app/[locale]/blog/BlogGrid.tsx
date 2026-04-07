'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BLOG_CATEGORIES, type BlogPost } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';

export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const [category, setCategory] = useState('All');

  const filtered = category === 'All'
    ? posts
    : posts.filter((p) => p.category === category);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2.5 mb-12" role="tablist" aria-label="Filter articles by category">
        {BLOG_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={category === cat}
            onClick={() => setCategory(cat)}
            className={cn(
              'py-2.5 px-6 rounded-xl text-[.84rem] font-semibold transition-all cursor-pointer border',
              category === cat
                ? 'bg-navy text-white border-navy'
                : 'bg-white text-text-mid border-border hover:border-navy hover:text-navy'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-7 max-lg:grid-cols-2 max-md:grid-cols-1" role="tabpanel">
        {filtered.map((post) => (
          <ScrollReveal key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="no-underline">
              <article className="group bg-white rounded-2xl border border-border hover:border-navy hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col">
                <div className="aspect-video relative overflow-hidden">
                  {/*
                    Inline blog hero uses the bespoke SVG (per-article unique
                    editorial illustration). The matching `.jpg` rasterization
                    is still emitted by `scripts/rasterize-blog-images.mjs` and
                    referenced from the OG/Twitter metadata in
                    [src/app/[locale]/blog/[slug]/page.tsx], because social
                    platforms don't render SVG.
                  */}
                  <Image
                    src={`/images/blog/${post.slug}.svg`}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[.62rem] font-bold uppercase tracking-[.5px] text-white bg-black/40 py-1 px-2.5 rounded-lg backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="text-[.62rem] font-bold text-white bg-black/40 py-1 px-2.5 rounded-lg backdrop-blur-sm">
                      {post.readTime} min
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <time dateTime={post.date} className="text-[.72rem] text-text-light mb-2.5 block">
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </time>
                  <h3 className="font-serif text-[1.05rem] leading-[1.3] mb-3 text-text group-hover:text-navy transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-text-mid text-[.84rem] leading-[1.75] mb-5 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="text-navy text-[.82rem] font-semibold group-hover:underline">
                    Read article &rarr;
                  </span>
                </div>
              </article>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-text-light italic py-12" aria-live="polite">
          No articles in this category yet. Check back soon.
        </p>
      )}
    </div>
  );
}
