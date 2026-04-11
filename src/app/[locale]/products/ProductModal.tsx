'use client';

import { useEffect, useId, useMemo, useRef } from 'react';
import Image from 'next/image';
import { PRODUCTS, type Product } from '@/lib/constants';
import { useCalBooking } from '@/lib/use-cal-booking';
import { IconCheck, IconBag } from '@/components/icons/Icons';
import { cn } from '@/lib/utils';
import { track } from '@/lib/analytics';
import { useCart } from '@/lib/cart';

interface ProductModalProps {
  product: Product | null;
  source: string; // where the modal was opened from (analytics)
  onClose: () => void;
  onSelectPair: (slug: string) => void;
}

// Brand-approved gradient pairs keyed by Product.accent. Picking from this map
// keeps the modal hero on-brand without requiring per-product photography we
// don't have. Each gradient is layered behind the (real) product image with a
// soft scrim so the imagery still reads.
const ACCENT_GRADIENTS: Record<Product['accent'], string> = {
  navy: 'from-[#2F3269] via-[#3a3d7a] to-[#52357D]',
  purple: 'from-[#442F69] via-[#5b3f88] to-[#2F3269]',
  gold: 'from-[#9F8449] via-[#BE9D47] to-[#7A6830]',
  sage: 'from-[#3a5d52] via-[#4a7064] to-[#2F3269]',
  rose: 'from-[#7a3f4f] via-[#9f4f63] to-[#442F69]',
};

const ACCENT_GLOW: Record<Product['accent'], string> = {
  navy: 'shadow-[0_30px_120px_-20px_rgba(47,50,105,0.55)]',
  purple: 'shadow-[0_30px_120px_-20px_rgba(68,47,105,0.55)]',
  gold: 'shadow-[0_30px_120px_-20px_rgba(190,157,71,0.45)]',
  sage: 'shadow-[0_30px_120px_-20px_rgba(58,93,82,0.5)]',
  rose: 'shadow-[0_30px_120px_-20px_rgba(159,79,99,0.5)]',
};

export function ProductModal({ product, source, onClose, onSelectPair }: ProductModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const cart = useCart();

  // Cached lookup so the "pairs with" buttons can resolve a product NAME (which
  // is what each Product.pairsWith stores) back to a slug to swap modals.
  const slugByName = useMemo(() => {
    return PRODUCTS.reduce<Record<string, string>>((acc, p) => {
      acc[p.name] = p.slug;
      return acc;
    }, {});
  }, []);

  // Cal.com booking — warms up the embed, opens modal on click, and falls
  // back to opening the raw cal.com URL in a new tab if the embed is blocked
  // (adblocker / strict CSP / network). Shared hook keeps this consistent
  // with the nav CTAs and floating booking button.
  const { openBooking } = useCalBooking();

  // Body scroll lock + focus trap + ESC handler — runs only while open.
  useEffect(() => {
    if (!product) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    // Compensate for scrollbar removal so the page doesn't shift behind the modal.
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    // Focus the dialog so screen readers announce it and ESC works immediately.
    requestAnimationFrame(() => dialogRef.current?.focus());

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Tab') {
        const root = dialogRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
      previouslyFocused.current?.focus?.();
    };
  }, [product, onClose]);

  if (!product) return null;

  const gradient = ACCENT_GRADIENTS[product.accent];
  const glow = ACCENT_GLOW[product.accent];

  function handleCtaClick(cta: 'regimen' | 'consultation' | 'add_to_cart') {
    if (!product) return;
    track('product_modal_cta_click', {
      product_slug: product.slug,
      product_name: product.name,
      product_category: product.category,
      product_price: product.price,
      cta,
      source,
    });
  }

  function handleAddToCart() {
    if (!product) return;
    cart.addItem(product.slug, 1);
    handleCtaClick('add_to_cart');
    track('cart_add', {
      product_slug: product.slug,
      product_name: product.name,
      qty: 1,
      source: 'product_modal',
    });
    cart.open();
    onClose();
  }

  function handlePairClick(pairName: string, pairSlug: string | undefined) {
    if (!product) return;
    track('product_modal_pair_click', {
      product_slug: product.slug,
      pair_name: pairName,
      pair_slug: pairSlug ?? null,
      source,
    });
    if (pairSlug) onSelectPair(pairSlug);
  }

  return (
    <div className="modal-overlay fixed inset-0 z-[100] flex items-center justify-center p-4 max-md:p-0">
      {/* Backdrop — clicking it closes the modal */}
      <button
        type="button"
        aria-label="Close product details"
        onClick={onClose}
        className="absolute inset-0 bg-navy-deep/60 backdrop-blur-md cursor-pointer border-0 p-0"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cn(
          'modal-dialog relative bg-white rounded-3xl max-md:rounded-none w-full max-w-[1100px] max-h-[92vh] max-md:max-h-screen',
          'overflow-hidden focus:outline-none',
          glow
        )}
      >
        {/* Close button (top-right, floats over the hero) */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white backdrop-blur flex items-center justify-center text-navy hover:text-navy-deep transition-all hover:scale-105 cursor-pointer border-0 shadow-md"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Scroll container */}
        <div className="overflow-y-auto max-h-[92vh] max-md:max-h-screen">
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] max-lg:grid-cols-1">
            {/* HERO IMAGE COLUMN */}
            <div className={cn('relative min-h-[440px] max-lg:min-h-[320px] max-md:min-h-[260px] bg-gradient-to-br', gradient)}>
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                className="object-cover mix-blend-luminosity opacity-60"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Soft overlay for text legibility on busy images */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" aria-hidden="true" />

              {/* Floating brand mark + category */}
              <div className="absolute top-6 left-6 right-16 flex items-start justify-between gap-3">
                <div className="flex flex-col gap-2">
                  <span className="text-[.6rem] font-bold uppercase tracking-[2px] text-white/85 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full border border-white/20 w-fit">
                    {product.category}
                  </span>
                  {product.origin && (
                    <span className="text-[.6rem] font-bold uppercase tracking-[2px] text-white/95 bg-gold/30 backdrop-blur px-3 py-1.5 rounded-full border border-gold/30 w-fit">
                      Made in {product.origin}
                    </span>
                  )}
                </div>
                {product.badge && (
                  <span className="text-[.62rem] font-bold uppercase tracking-[1px] text-navy bg-gold py-1.5 px-3 rounded-full shadow-md">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Big aspirational name overlay (Apple-style) */}
              <div className="absolute bottom-8 left-8 right-8 max-md:left-6 max-md:right-6 max-md:bottom-6">
                <p className="text-white/70 text-[.7rem] uppercase tracking-[3px] font-semibold mb-2">Radiance Skin Care</p>
                <h2 id={titleId} className="font-serif text-white text-[2.4rem]/[1.05] max-lg:text-[1.9rem] max-md:text-[1.6rem] tracking-tight">
                  {product.name}
                </h2>
              </div>
            </div>

            {/* CONTENT COLUMN */}
            <div className="p-10 max-md:p-6 flex flex-col">
              {/* Tagline + price line */}
              <p className="text-navy text-[1rem] font-medium mb-2 italic">{product.tagline}</p>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-serif text-[2rem] text-text">${product.price}</span>
                <span className="text-text-light text-[.82rem]">{product.size}</span>
              </div>

              <p className="text-text-mid text-[.92rem]/[1.75] mb-6">{product.description}</p>

              {/* WHAT IT DOES — benefits */}
              <section className="mb-7">
                <h3 className="text-[.7rem] font-bold uppercase tracking-[2px] text-navy mb-3">What It Does</h3>
                <ul className="flex flex-col gap-2.5 list-none p-0">
                  {product.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-[.86rem] text-text-mid leading-[1.6]">
                      <span className="w-5 h-5 rounded-md bg-navy-pale flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                        <IconCheck size={12} className="text-navy" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </section>

              {/* INGREDIENT SCIENCE */}
              <section className="mb-7">
                <h3 className="text-[.7rem] font-bold uppercase tracking-[2px] text-navy mb-3">The Science</h3>
                <div className="flex flex-col gap-3">
                  {product.keyIngredients.map((ing) => (
                    <div key={ing.name} className="bg-cream/60 rounded-xl p-4 border border-border">
                      <div className="font-serif text-[1rem] text-text mb-1">{ing.name}</div>
                      <p className="text-[.8rem] text-text-mid leading-[1.65]">{ing.benefit}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* HOW TO USE */}
              <section className="mb-7">
                <h3 className="text-[.7rem] font-bold uppercase tracking-[2px] text-navy mb-3">How To Use</h3>
                <p className="text-[.86rem] text-text-mid leading-[1.75] bg-navy-pale/40 p-4 rounded-xl border border-border">
                  {product.howToUse}
                </p>
              </section>

              {/* WHO IT'S FOR */}
              <section className="mb-7">
                <h3 className="text-[.7rem] font-bold uppercase tracking-[2px] text-navy mb-3">Ideal For</h3>
                <div className="flex flex-wrap gap-2">
                  {product.idealFor.map((tag) => (
                    <span
                      key={tag}
                      className="text-[.72rem] font-semibold text-navy-deep bg-navy-pale py-1.5 px-3 rounded-full border border-navy/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>

              {/* PAIRS WITH */}
              {product.pairsWith.length > 0 && (
                <section className="mb-8">
                  <h3 className="text-[.7rem] font-bold uppercase tracking-[2px] text-navy mb-3">Pairs Best With</h3>
                  <div className="flex flex-col gap-2">
                    {product.pairsWith.map((pairName) => {
                      const pairSlug = slugByName[pairName];
                      return (
                        <button
                          key={pairName}
                          type="button"
                          onClick={() => handlePairClick(pairName, pairSlug)}
                          className="flex items-center justify-between gap-3 bg-white border border-border hover:border-navy hover:shadow-sm transition-all rounded-xl p-3 text-left cursor-pointer group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="w-9 h-9 rounded-lg bg-gold-highlight flex items-center justify-center shrink-0 group-hover:bg-gold transition-colors" aria-hidden="true">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A6830" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2v20M2 12h20" />
                              </svg>
                            </span>
                            <span className="text-[.86rem] font-semibold text-text truncate">{pairName}</span>
                          </div>
                          <span className="text-[.72rem] text-navy font-semibold opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                            View &rarr;
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* CTA BAR — pinned to the end of the content column.
                  Add to Cart is the primary CTA when Stripe is wired up.
                  When it isn't (no STRIPE_SECRET_KEY in env), we fall back to
                  the original Cal.com booking primary so the modal still has
                  a working primary action and the page never breaks. */}
              <div className="mt-auto pt-6 border-t border-border">
                <div className="flex flex-col gap-3">
                  {cart.stripeEnabled ? (
                    <>
                      <button
                        type="button"
                        onClick={handleAddToCart}
                        className="bg-navy text-white hover:bg-navy-deep hover:-translate-y-px hover:shadow-md rounded-xl font-semibold text-[.92rem] py-4 px-6 transition-all cursor-pointer border-0 w-full text-center inline-flex items-center justify-center gap-2"
                      >
                        <IconBag size={18} />
                        Add to cart — ${product.price}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleCtaClick('consultation');
                          openBooking('quick');
                        }}
                        className="bg-transparent border-[1.5px] border-navy text-navy hover:bg-navy hover:text-white rounded-xl font-semibold text-[.85rem] py-3 px-6 transition-all w-full text-center cursor-pointer"
                      >
                        Or chat with Marta first — Free 15 min
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          handleCtaClick('consultation');
                          openBooking('quick');
                        }}
                        className="bg-navy text-white hover:bg-navy-deep hover:-translate-y-px hover:shadow-md rounded-xl font-semibold text-[.92rem] py-4 px-6 transition-all cursor-pointer border-0 w-full text-center"
                      >
                        Add this to my regimen — Free 15-min chat
                      </button>
                      <a
                        href="/contact"
                        onClick={() => handleCtaClick('regimen')}
                        className="bg-transparent border-[1.5px] border-navy text-navy hover:bg-navy hover:text-white rounded-xl font-semibold text-[.85rem] py-3 px-6 transition-all w-full text-center no-underline"
                      >
                        Build my custom regimen
                      </a>
                    </>
                  )}
                </div>
                <p className="text-center text-[.7rem] text-text-light mt-3">
                  {cart.stripeEnabled
                    ? 'Free shipping over $75 · Secure checkout · USPS · Bilingual support'
                    : 'Free skin analysis · No purchase required · Bilingual EN/ES'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
