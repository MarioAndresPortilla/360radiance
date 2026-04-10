'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BLOG_CATEGORIES, type BlogPost } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';

const POSTS_PER_PAGE = 10;

export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);

  const filtered = category === 'All'
    ? posts
    : posts.filter((p) => p.category === category);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const safeCurrentPage = Math.min(page, totalPages);
  const paginatedPosts = filtered.slice(
    (safeCurrentPage - 1) * POSTS_PER_PAGE,
    safeCurrentPage * POSTS_PER_PAGE,
  );

  const handleCategoryChange = useCallback((cat: string) => {
    setCategory(cat);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    // Scroll to the top of the grid section
    document.getElementById('articles-heading')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-12" role="tablist" aria-label="Filter articles by category">
        {BLOG_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={category === cat}
            onClick={() => handleCategoryChange(cat)}
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
        {paginatedPosts.map((post) => (
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

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-14 flex items-center justify-center gap-2" aria-label="Blog pagination">
          {/* Previous */}
          <button
            type="button"
            disabled={safeCurrentPage === 1}
            onClick={() => handlePageChange(safeCurrentPage - 1)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full ring-1 ring-black/[.06] bg-white text-text-mid transition-all hover:ring-navy/25 hover:text-navy disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:ring-black/[.06] disabled:hover:text-text-mid cursor-pointer"
            aria-label="Previous page"
          >
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => handlePageChange(p)}
              aria-current={p === safeCurrentPage ? 'page' : undefined}
              className={cn(
                'inline-flex items-center justify-center w-10 h-10 rounded-full text-[.85rem] font-semibold transition-all cursor-pointer',
                p === safeCurrentPage
                  ? 'bg-navy text-white shadow-md'
                  : 'ring-1 ring-black/[.06] bg-white text-text-mid hover:ring-navy/25 hover:text-navy'
              )}
            >
              {p}
            </button>
          ))}

          {/* Next */}
          <button
            type="button"
            disabled={safeCurrentPage === totalPages}
            onClick={() => handlePageChange(safeCurrentPage + 1)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full ring-1 ring-black/[.06] bg-white text-text-mid transition-all hover:ring-navy/25 hover:text-navy disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:ring-black/[.06] disabled:hover:text-text-mid cursor-pointer"
            aria-label="Next page"
          >
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </nav>
      )}

      {/* Page info */}
      {filtered.length > POSTS_PER_PAGE && (
        <p className="text-center text-[.78rem] text-text-light mt-4">
          Showing {(safeCurrentPage - 1) * POSTS_PER_PAGE + 1}–{Math.min(safeCurrentPage * POSTS_PER_PAGE, filtered.length)} of {filtered.length} articles
        </p>
      )}
    </div>
  );
}
