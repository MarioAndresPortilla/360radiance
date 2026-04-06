'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SKIN_CONCERNS, PRODUCTS, type SkinConcern } from '@/lib/constants';
import { Icon, type IconName } from '@/components/icons/Icons';
import { cn } from '@/lib/utils';

export function SkinConcernMatcher() {
  const [selected, setSelected] = useState<SkinConcern | null>(null);

  const matched = selected
    ? PRODUCTS.filter((p) => p.concerns.includes(selected))
    : [];

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3 mb-10" role="radiogroup" aria-label="Select your skin concern">
        {SKIN_CONCERNS.map((concern) => (
          <button
            key={concern.id}
            type="button"
            role="radio"
            aria-checked={selected === concern.id}
            onClick={() => setSelected(selected === concern.id ? null : concern.id)}
            className={cn(
              'flex items-center gap-2 py-3 px-5 rounded-xl border text-[.85rem] font-medium transition-all cursor-pointer',
              selected === concern.id
                ? 'bg-teal text-white border-teal shadow-md'
                : 'bg-white text-text-mid border-border hover:border-teal hover:text-teal'
            )}
          >
            <Icon name={concern.icon as IconName} size={18} className={selected === concern.id ? 'text-white' : ''} />
            {concern.label}
          </button>
        ))}
      </div>

      {selected && (
        <div aria-live="polite" aria-atomic="true">
          <p className="text-center text-[.88rem] text-text-mid mb-6">
            <strong className="text-teal">{matched.length} products</strong> recommended for{' '}
            <strong>{SKIN_CONCERNS.find((c) => c.id === selected)?.label}</strong>
          </p>
          <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
            {matched.map((product) => (
              <div
                key={product.slug}
                className="bg-white rounded-2xl p-6 border border-border hover:border-teal hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[.6rem] font-bold uppercase tracking-[.5px] text-teal bg-teal-pale py-0.5 px-2 rounded-md">
                    {product.category}
                  </span>
                  {product.badge && (
                    <span className="text-[.58rem] font-bold uppercase tracking-[.5px] text-gold bg-gold-pale py-0.5 px-2 rounded-md">
                      {product.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-[1rem] mb-1">{product.name}</h3>
                <p className="text-text-mid text-[.78rem] leading-[1.6] mb-3">{product.tagline}</p>
                <div className="text-[.68rem] text-text-light">
                  <strong className="text-text-mid">Key:</strong>{' '}
                  {product.keyIngredients.map((i) => i.name).join(' · ')}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 bg-teal text-white rounded-lg font-semibold text-[.85rem] px-6 py-3 transition-all hover:bg-teal-dark hover:-translate-y-px hover:shadow-md no-underline"
            >
              Get a Custom Regimen for {SKIN_CONCERNS.find((c) => c.id === selected)?.label} &rarr;
            </Link>
          </div>
        </div>
      )}

      {!selected && (
        <p className="text-center text-[.82rem] text-text-light italic" aria-live="polite">
          Select a concern above to see recommended products
        </p>
      )}
    </div>
  );
}
