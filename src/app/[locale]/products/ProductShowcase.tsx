'use client';

import { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import { PRODUCTS, PRODUCT_CATEGORIES, type Product } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';
import { track } from '@/lib/analytics';
import { ProductModal } from './ProductModal';

export function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  // Quick slug→product lookup. Memoized so the modal hot-swap (clicking a
  // "pairs with" product inside the modal) doesn't recompute on every render.
  const bySlug = useMemo(() => {
    return PRODUCTS.reduce<Record<string, Product>>((acc, p) => {
      acc[p.slug] = p;
      return acc;
    }, {});
  }, []);

  const filtered = useMemo(
    () => (activeCategory === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory)),
    [activeCategory]
  );

  const activeProduct = activeSlug ? bySlug[activeSlug] ?? null : null;

  const handleFilterClick = useCallback((id: string) => {
    setActiveCategory(id);
    track('product_filter_change', { category: id, source: 'catalog_grid' });
  }, []);

  const handleOpenModal = useCallback((product: Product, position: number) => {
    setActiveSlug(product.slug);
    track('product_modal_open', {
      product_slug: product.slug,
      product_name: product.name,
      product_category: product.category,
      product_price: product.price,
      position,
      source: 'catalog_grid',
    });
  }, []);

  const handleCloseModal = useCallback(() => {
    if (activeSlug) {
      track('product_modal_close', { product_slug: activeSlug, source: 'catalog_grid' });
    }
    setActiveSlug(null);
  }, [activeSlug]);

  const handleSelectPair = useCallback((slug: string) => {
    setActiveSlug(slug);
    const next = bySlug[slug];
    if (next) {
      track('product_modal_open', {
        product_slug: next.slug,
        product_name: next.name,
        product_category: next.category,
        product_price: next.price,
        source: 'catalog_grid_pair',
      });
    }
  }, [bySlug]);

  return (
    <div>
      {/* Category filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Filter products by category">
        {PRODUCT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={activeCategory === cat.id}
            onClick={() => handleFilterClick(cat.id)}
            className={cn(
              'py-2 px-5 rounded-lg text-[.82rem] font-semibold transition-all cursor-pointer border',
              activeCategory === cat.id
                ? 'bg-navy text-white border-navy'
                : 'bg-white text-text-mid border-border hover:border-navy hover:text-navy'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1" role="tabpanel">
        {filtered.map((product, index) => (
          <ScrollReveal key={product.slug} delay={(index % 3) * 60}>
            <article
              className={cn(
                'group bg-white rounded-2xl border border-border overflow-hidden transition-all duration-300 h-full',
                'hover:border-navy/40 hover:shadow-lg hover:-translate-y-1'
              )}
            >
              <button
                type="button"
                onClick={() => handleOpenModal(product, index)}
                className="block w-full text-left p-0 bg-transparent border-0 cursor-pointer"
                aria-label={`View details for ${product.name}`}
              >
                {/* Image hero */}
                <div className="relative aspect-[5/4] bg-cream overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" aria-hidden="true" />

                  {/* Top badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                    <span className="text-[.58rem] font-bold uppercase tracking-[1px] text-white/95 bg-white/15 backdrop-blur px-2.5 py-1 rounded-full border border-white/25">
                      {product.category}
                    </span>
                    {product.badge && (
                      <span className="text-[.58rem] font-bold uppercase tracking-[.5px] text-navy bg-gold py-1 px-2.5 rounded-full shadow-md">
                        {product.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h3 className="font-serif text-[1.1rem] mb-1 leading-tight">{product.name}</h3>
                  <p className="text-text-mid text-[.78rem] leading-[1.5] mb-3 line-clamp-2">{product.tagline}</p>

                  <div className="flex items-baseline justify-between mb-3">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-[1.2rem] text-navy">${product.price}</span>
                      <span className="text-[.7rem] text-text-light">{product.size.split('·')[0].trim()}</span>
                    </div>
                    {product.origin && (
                      <span className="text-[.58rem] font-bold uppercase tracking-[.5px] text-gold-a11y bg-gold-highlight py-1 px-2 rounded-md">
                        {product.origin}
                      </span>
                    )}
                  </div>

                  {/* Concern tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.concerns.slice(0, 3).map((c) => (
                      <span key={c} className="text-[.58rem] uppercase tracking-[.5px] font-bold text-navy-deep bg-navy-pale py-0.5 px-2 rounded-md">
                        {c}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-navy text-[.78rem] font-semibold group-hover:gap-2 transition-all">
                    View product details
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </button>
            </article>
          </ScrollReveal>
        ))}
      </div>

      <ProductModal
        product={activeProduct}
        source="catalog_grid"
        onClose={handleCloseModal}
        onSelectPair={handleSelectPair}
      />
    </div>
  );
}
