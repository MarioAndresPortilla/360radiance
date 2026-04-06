'use client';

import { useState } from 'react';
import { PRODUCTS, PRODUCT_CATEGORIES } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { IconCheck } from '@/components/icons/Icons';
import { cn } from '@/lib/utils';

export function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  const filtered = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

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
            onClick={() => { setActiveCategory(cat.id); setExpandedSlug(null); }}
            className={cn(
              'py-2 px-5 rounded-lg text-[.82rem] font-semibold transition-all cursor-pointer border',
              activeCategory === cat.id
                ? 'bg-teal text-white border-teal'
                : 'bg-white text-text-mid border-border hover:border-teal hover:text-teal'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1" role="tabpanel">
        {filtered.map((product) => {
          const isExpanded = expandedSlug === product.slug;
          return (
            <ScrollReveal key={product.slug}>
              <article className={cn(
                'bg-white rounded-2xl border transition-all duration-300',
                isExpanded ? 'border-teal shadow-md' : 'border-border hover:border-border-hover hover:shadow-sm'
              )}>
                {/* Card header */}
                <div className="p-7">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex gap-2">
                      <span className="text-[.6rem] font-bold uppercase tracking-[.5px] text-teal bg-teal-pale py-0.5 px-2 rounded-md">
                        {product.category}
                      </span>
                      {product.origin && (
                        <span className="text-[.6rem] font-bold uppercase tracking-[.5px] text-gold-dark bg-gold-pale py-0.5 px-2 rounded-md">
                          {product.origin}
                        </span>
                      )}
                    </div>
                    {product.badge && (
                      <span className="text-[.58rem] font-bold uppercase tracking-[.5px] text-white bg-gold py-0.5 px-2.5 rounded-full">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-[1.2rem] mb-1">{product.name}</h3>
                  <p className="text-teal text-[.85rem] font-medium mb-3">{product.tagline}</p>

                  {/* Key ingredients preview */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {product.keyIngredients.map((ing) => (
                      <span key={ing.name} className="text-[.68rem] font-semibold text-text-mid bg-cream py-1 px-2.5 rounded-md">
                        {ing.name}
                      </span>
                    ))}
                  </div>

                  {/* Concern tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {product.concerns.map((c) => (
                      <span key={c} className="text-[.6rem] uppercase tracking-[.5px] font-bold text-teal-dark bg-teal-pale py-0.5 px-2 rounded-md">
                        {c}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpandedSlug(isExpanded ? null : product.slug)}
                    className="text-teal text-[.82rem] font-semibold bg-transparent border-none cursor-pointer hover:underline p-0"
                    aria-expanded={isExpanded}
                  >
                    {isExpanded ? 'Show less' : 'View ingredient science & usage'} &darr;
                  </button>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="border-t border-border px-7 py-6 bg-cream/50 rounded-b-2xl">
                    <h4 className="font-serif text-[.95rem] mb-4">Ingredient Science</h4>
                    <div className="flex flex-col gap-3 mb-6">
                      {product.keyIngredients.map((ing) => (
                        <div key={ing.name} className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-md bg-teal-pale flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                            <IconCheck size={12} className="text-teal" />
                          </span>
                          <div>
                            <strong className="text-[.82rem] text-text">{ing.name}</strong>
                            <p className="text-[.78rem] text-text-mid leading-[1.6]">{ing.benefit}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <h4 className="font-serif text-[.95rem] mb-2">How to Use</h4>
                    <p className="text-[.82rem] text-text-mid leading-[1.7] mb-5">{product.howToUse}</p>

                    <h4 className="font-serif text-[.95rem] mb-2">Pairs Best With</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.pairsWith.map((p) => (
                        <span key={p} className="text-[.72rem] font-semibold text-gold-dark bg-gold-pale py-1.5 px-3 rounded-lg">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
