'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { PRODUCT_BUNDLES, PRODUCTS, type Product, type ProductBundle } from '@/lib/constants';
import { useCalBooking } from '@/lib/use-cal-booking';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';
import { track } from '@/lib/analytics';

// Dynamic-imported + conditionally rendered so the modal chunk only loads
// when a bundle card is actually clicked. See ProductShowcase.tsx for the
// matching pattern + reasoning.
const ProductModal = dynamic(
  () => import('./ProductModal').then((m) => m.ProductModal),
  { ssr: false },
);

const ACCENT_BG: Record<ProductBundle['accent'], string> = {
  navy: 'bg-gradient-to-br from-[#2F3269] via-[#3a3d7a] to-[#21244F]',
  purple: 'bg-gradient-to-br from-[#442F69] via-[#52357D] to-[#2F3269]',
  gold: 'bg-gradient-to-br from-[#9F8449] via-[#BE9D47] to-[#7A6830]',
  sage: 'bg-gradient-to-br from-[#3a5d52] via-[#4a7064] to-[#2F3269]',
  rose: 'bg-gradient-to-br from-[#7a3f4f] via-[#9f4f63] to-[#442F69]',
};

const ACCENT_RING: Record<ProductBundle['accent'], string> = {
  navy: 'hover:ring-navy/40',
  purple: 'hover:ring-purple/40',
  gold: 'hover:ring-gold/60',
  sage: 'hover:ring-[#4a7064]/40',
  rose: 'hover:ring-[#9f4f63]/40',
};

interface BundleCardData {
  bundle: ProductBundle;
  products: Product[];
  originalTotal: number;
  savings: number;
  savingsPct: number;
}

function buildBundleCards(): BundleCardData[] {
  const bySlug = PRODUCTS.reduce<Record<string, Product>>((acc, p) => {
    acc[p.slug] = p;
    return acc;
  }, {});
  return PRODUCT_BUNDLES.map((bundle) => {
    const products = bundle.productSlugs
      .map((slug) => bySlug[slug])
      .filter((p): p is Product => Boolean(p));
    const originalTotal = products.reduce((sum, p) => sum + p.price, 0);
    const savings = Math.max(0, originalTotal - bundle.bundlePrice);
    const savingsPct = originalTotal > 0 ? Math.round((savings / originalTotal) * 100) : 0;
    return { bundle, products, originalTotal, savings, savingsPct };
  });
}

export function PackageDeals() {
  const cards = useMemo(buildBundleCards, []);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  // Quick slug→product lookup so the modal hot-swap (clicking a bundle product
  // chip, or "pairs with" inside the modal) is O(1).
  const bySlug = useMemo(() => {
    return PRODUCTS.reduce<Record<string, Product>>((acc, p) => {
      acc[p.slug] = p;
      return acc;
    }, {});
  }, []);
  const activeProduct = activeSlug ? bySlug[activeSlug] ?? null : null;

  // Track which bundles the user has actually seen so we only emit one
  // `bundle_view` per session per bundle (avoids duplicate analytics noise as
  // they scroll past).
  const seenRef = useRef<Set<string>>(new Set());
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Cal.com booking for the bundle "Reserve" CTAs. Shared hook handles the
  // embed warm-up, theme init, and direct-link fallback if the embed is
  // blocked by an adblocker / CSP / network issue.
  const { openBooking } = useCalBooking();

  // Intersection observer fires `bundle_view` once when each card is visible.
  // This is the analytics signal that tells us "users actually saw this bundle"
  // — much more meaningful than counting page loads.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const slug = entry.target.getAttribute('data-bundle-slug');
          if (!slug || seenRef.current.has(slug)) return;
          seenRef.current.add(slug);
          const card = cards.find((c) => c.bundle.slug === slug);
          if (!card) return;
          track('bundle_view', {
            bundle_slug: slug,
            bundle_name: card.bundle.name,
            bundle_price: card.bundle.bundlePrice,
            original_total: card.originalTotal,
            savings: card.savings,
            savings_pct: card.savingsPct,
          });
        });
      },
      { threshold: 0.4 }
    );
    cardRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [cards]);

  function handleCtaClick(card: BundleCardData) {
    track('bundle_cta_click', {
      bundle_slug: card.bundle.slug,
      bundle_name: card.bundle.name,
      bundle_price: card.bundle.bundlePrice,
      savings: card.savings,
      savings_pct: card.savingsPct,
    });
  }

  function handleProductChipClick(card: BundleCardData, product: Product) {
    track('bundle_product_click', {
      bundle_slug: card.bundle.slug,
      product_slug: product.slug,
      product_name: product.name,
    });
    track('product_modal_open', {
      product_slug: product.slug,
      product_name: product.name,
      product_category: product.category,
      product_price: product.price,
      source: `bundle:${card.bundle.slug}`,
    });
    setActiveSlug(product.slug);
  }

  const handleCloseModal = useCallback(() => {
    if (activeSlug) {
      track('product_modal_close', { product_slug: activeSlug, source: 'bundles' });
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
        source: 'bundles_pair',
      });
    }
  }, [bySlug]);

  return (
    <>
    <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
      {cards.map(({ bundle, products, originalTotal, savings, savingsPct }, index) => (
        <ScrollReveal key={bundle.slug} delay={index * 80}>
          <article
            ref={(el) => {
              if (el) cardRefs.current.set(bundle.slug, el);
              else cardRefs.current.delete(bundle.slug);
            }}
            data-bundle-slug={bundle.slug}
            className={cn(
              'group bg-white rounded-3xl border border-border overflow-hidden transition-all duration-300',
              'hover:shadow-lg hover:-translate-y-1 hover:border-navy/30 ring-2 ring-transparent',
              ACCENT_RING[bundle.accent],
              bundle.highlight && 'border-gold ring-gold/40'
            )}
          >
            {/* Hero block — image with gradient scrim */}
            <div className={cn('relative h-44 overflow-hidden', ACCENT_BG[bundle.accent])}>
              <Image
                src={bundle.image}
                alt={`${bundle.name} — bundle deal at 360 Radiance`}
                fill
                className="object-cover mix-blend-luminosity opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" aria-hidden="true" />

              {/* Top labels */}
              <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
                <span className="text-[.6rem] font-bold uppercase tracking-[2px] text-white/95 bg-white/15 backdrop-blur px-3 py-1.5 rounded-full border border-white/25">
                  For {bundle.forConcern}
                </span>
                {bundle.highlight && (
                  <span className="text-[.6rem] font-bold uppercase tracking-[1px] text-navy bg-gold py-1.5 px-3 rounded-full shadow-md">
                    Most Popular
                  </span>
                )}
              </div>

              {/* Title */}
              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="font-serif text-white text-[1.55rem] leading-[1.1] tracking-tight">
                  {bundle.name}
                </h3>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <p className="text-text-mid text-[.86rem] leading-[1.6] mb-5">{bundle.description}</p>

              {/* Product list */}
              <div className="mb-5">
                <p className="text-[.62rem] font-bold uppercase tracking-[1.5px] text-text-light mb-2.5">
                  What&apos;s Inside ({products.length} products)
                </p>
                <ul className="flex flex-col gap-1.5 list-none p-0">
                  {products.map((p) => (
                    <li key={p.slug}>
                      <button
                        type="button"
                        onClick={() => handleProductChipClick({ bundle, products, originalTotal, savings, savingsPct }, p)}
                        className="w-full text-left flex items-center justify-between gap-2 py-2 px-3 rounded-lg bg-cream/60 hover:bg-navy-pale border border-transparent hover:border-navy/20 transition-all cursor-pointer group/item"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-6 h-6 rounded-md bg-white border border-border flex items-center justify-center text-[.62rem] font-bold text-navy shrink-0">
                            {p.routineStep}
                          </span>
                          <span className="text-[.78rem] font-semibold text-text truncate">{p.name}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[.72rem] text-text-light">${p.price}</span>
                          <span className="text-[.62rem] text-navy font-semibold opacity-0 group-hover/item:opacity-100 transition-opacity">
                            View
                          </span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing */}
              <div className="flex items-end justify-between mb-5 pb-5 border-b border-border">
                <div>
                  <p className="text-[.62rem] font-bold uppercase tracking-[1.5px] text-text-light mb-1">Bundle Price</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-[2rem] leading-none text-navy">${bundle.bundlePrice}</span>
                    <span className="text-[.85rem] text-text-light line-through">${originalTotal}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block text-[.7rem] font-bold uppercase tracking-[1px] text-gold-a11y bg-gold-highlight py-1.5 px-3 rounded-full border border-gold/30">
                    Save ${savings} · {savingsPct}% off
                  </span>
                </div>
              </div>

              {/* CTA */}
              <button
                type="button"
                onClick={() => {
                  handleCtaClick({ bundle, products, originalTotal, savings, savingsPct });
                  openBooking('quick');
                }}
                className="w-full bg-navy text-white hover:bg-navy-deep hover:-translate-y-px hover:shadow-md rounded-xl font-semibold text-[.9rem] py-3.5 px-6 transition-all cursor-pointer border-0 text-center"
              >
                Reserve this bundle &rarr;
              </button>
              <p className="text-center text-[.68rem] text-text-light mt-2.5">
                Free 15-min chat with Marta to confirm fit · No charge
              </p>
            </div>
          </article>
        </ScrollReveal>
      ))}
    </div>

    {activeProduct && (
      <ProductModal
        product={activeProduct}
        source="bundles"
        onClose={handleCloseModal}
        onSelectPair={handleSelectPair}
      />
    )}
    </>
  );
}
