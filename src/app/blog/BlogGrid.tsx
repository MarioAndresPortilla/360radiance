'use client';

import { useState } from 'react';
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
      {/* Category tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Filter articles by category">
        {BLOG_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={category === cat}
            onClick={() => setCategory(cat)}
            className={cn(
              'py-2 px-5 rounded-lg text-[.82rem] font-semibold transition-all cursor-pointer border',
              category === cat
                ? 'bg-teal text-white border-teal'
                : 'bg-white text-text-mid border-border hover:border-teal hover:text-teal'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles */}
      <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1" role="tabpanel">
        {filtered.map((post, i) => (
          <ScrollReveal key={post.slug}>
            <article className="group bg-white rounded-2xl border border-border hover:border-teal hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col">
              {/* Article image placeholder */}
              <div className="bg-linear-to-br from-teal-pale to-cream aspect-video flex items-center justify-center relative">
                <div className="font-serif text-[2.5rem] text-teal/10" aria-hidden="true">
                  {String(i + 2).padStart(2, '0')}
                </div>
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="text-[.58rem] font-bold uppercase tracking-[.5px] text-teal bg-white/90 py-0.5 px-2 rounded-md backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-[.58rem] font-bold text-text-mid bg-white/90 py-0.5 px-2 rounded-md backdrop-blur-sm">
                    {post.readTime} min
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <time dateTime={post.date} className="text-[.7rem] text-text-light mb-2 block">
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </time>
                <h3 className="font-serif text-[1.05rem] leading-[1.3] mb-2 group-hover:text-teal transition-colors">
                  {post.title}
                </h3>
                <p className="text-text-mid text-[.82rem] leading-[1.7] mb-4 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[.6rem] font-semibold text-text-light bg-cream py-0.5 px-2 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
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
