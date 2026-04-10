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
      <div className="flex flex-wrap justify-center gap-2 mb-12" role="tablist" aria-label="Filter articles by category">
        {BLOG_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={category === cat}
            onClick={() => setCategory(cat)}
            className={cn(
              'py-2.5 px-6 rounded-full text-[.82rem] font-semibold transition-all cursor-pointer',
              category === cat
                ? 'bg-navy text-white shadow-md'
                : 'bg-white text-text-mid ring-1 ring-black/[.06] hover:ring-navy/25 hover:text-navy'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1" role="tabpanel">
        {filtered.map((post) => (
          <ScrollReveal key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="no-underline">
              <article className="group bg-white rounded-2xl ring-1 ring-black/[.06] hover:ring-navy/20 hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                <div className="aspect-[16/10] relative overflow-hidden">
                  <Image
                    src={`/images/blog/${post.slug}.svg`}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                  {/* Bottom gradient fade */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" aria-hidden="true" />
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                    <span className="text-[.58rem] font-bold uppercase tracking-[1px] text-white bg-navy/80 py-1 px-2.5 rounded-full backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3.5 right-3.5">
                    <span className="text-[.62rem] font-semibold text-white/90 bg-black/30 py-1 px-2.5 rounded-full backdrop-blur-sm">
                      {post.readTime} min read
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <time dateTime={post.date} className="text-[.68rem] font-semibold uppercase tracking-wider text-text-light mb-3 block">
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </time>
                  <h3 className="font-serif text-[1.05rem] leading-[1.3] mb-3 text-text group-hover:text-navy transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-text-mid text-[.82rem] leading-[1.75] mb-5 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-navy text-[.8rem] font-semibold group-hover:gap-2 transition-all">
                    <span>Read article</span>
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="ml-1 group-hover:translate-x-1 transition-transform" aria-hidden="true">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </div>
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
