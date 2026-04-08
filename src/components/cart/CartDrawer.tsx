'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useCart } from '@/lib/cart';
import { IconBag, IconTrash } from '@/components/icons/Icons';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

/*
 * Slide-out cart drawer. Mounted alongside `children` inside CartProvider so
 * it has direct access to cart state without prop drilling. Renders nothing
 * until the drawer is open AND the cart has been hydrated from localStorage
 * (the latter prevents an empty-cart flash on first paint).
 *
 * UX rules:
 *   - ESC closes
 *   - Click on the dim backdrop closes
 *   - Body scroll lock is owned by the provider (one place to maintain)
 *   - Slide-in animation reuses a CSS keyframe defined in globals.css so the
 *     existing prefers-reduced-motion guard kills it for users who opt out
 *
 * Checkout flow:
 *   - "Checkout securely →" calls /api/checkout with the cart items + locale
 *   - On 200 → window.location = response.url (Stripe-hosted checkout)
 *   - On error → show inline error, allow retry
 *   - We do NOT clear the cart here; that happens on /checkout/success after
 *     payment is actually confirmed by the webhook
 */
export function CartDrawer() {
  const cart = useCart();
  const t = useTranslations('cart');
  const locale = useLocale();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ESC to close
  useEffect(() => {
    if (!cart.isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        cart.close();
      }
    };
    document.addEventListener('keydown', handleKey);
    // Focus the drawer on open so screen readers announce it
    requestAnimationFrame(() => dialogRef.current?.focus());
    return () => document.removeEventListener('keydown', handleKey);
  }, [cart.isOpen, cart]);

  // Reset submission state when the drawer closes
  useEffect(() => {
    if (!cart.isOpen) {
      setSubmitting(false);
      setError(null);
    }
  }, [cart.isOpen]);

  if (!cart.stripeEnabled) return null;
  if (!cart.isOpen) return null;

  const handleCheckout = async () => {
    if (submitting || cart.lineItems.length === 0) return;
    setSubmitting(true);
    setError(null);
    track('checkout_start', {
      item_count: cart.count,
      subtotal_cents: Math.round(cart.subtotal * 100),
    });
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          items: cart.lineItems.map(({ product, qty }) => ({ slug: product.slug, qty })),
          locale,
        }),
      });
      if (!res.ok) {
        const payload = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(payload.error ?? 'Checkout failed');
      }
      const { url } = (await res.json()) as { url: string };
      // Stripe-hosted checkout — full-page redirect, not router.push
      window.location.href = url;
    } catch (err) {
      console.error('[checkout]', err);
      setError(t('checkoutError'));
      setSubmitting(false);
    }
  };

  const empty = cart.lineItems.length === 0;
  const remainingForFreeShipping = Math.max(0, cart.freeShippingThreshold - cart.subtotal);

  return (
    <div className="modal-overlay fixed inset-0 z-[110] flex justify-end" role="dialog" aria-modal="true" aria-labelledby="cart-drawer-title">
      {/* Backdrop */}
      <button
        type="button"
        aria-label={t('close')}
        onClick={cart.close}
        className="absolute inset-0 bg-navy-deep/60 backdrop-blur-sm cursor-pointer border-0 p-0"
      />

      {/* Drawer */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="cart-drawer relative bg-white w-full max-w-100 max-md:max-w-full h-full shadow-2xl flex flex-col focus:outline-none"
      >
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-5 border-b border-border shrink-0">
          <h2 id="cart-drawer-title" className="font-serif text-[1.3rem] flex items-center gap-2">
            <IconBag size={20} className="text-navy" />
            {t('title')}
            {cart.count > 0 && (
              <span className="text-text-light text-[.88rem] font-sans">({cart.count})</span>
            )}
          </h2>
          <button
            type="button"
            onClick={cart.close}
            aria-label={t('close')}
            className="w-9 h-9 rounded-full hover:bg-navy-pale flex items-center justify-center text-text-mid hover:text-navy transition-colors cursor-pointer border-0 bg-transparent"
          >
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        {/* Body */}
        {empty ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-navy-pale flex items-center justify-center mb-4">
              <IconBag size={28} className="text-navy/50" />
            </div>
            <p className="font-serif text-[1.1rem] text-text mb-2">{t('emptyTitle')}</p>
            <p className="text-text-mid text-[.85rem] leading-[1.65] max-w-70 mb-6">{t('emptyBody')}</p>
            <button
              type="button"
              onClick={cart.close}
              className="bg-navy text-white px-6 py-3 rounded-xl font-semibold text-[.85rem] hover:bg-navy-deep transition-colors cursor-pointer border-0"
            >
              {t('continueShopping')}
            </button>
          </div>
        ) : (
          <>
            {/* Scrollable line items */}
            <ul className="flex-1 overflow-y-auto px-6 py-4 space-y-4 list-none m-0">
              {cart.lineItems.map(({ product, qty }) => (
                <li key={product.slug} className="flex gap-4 pb-4 border-b border-border last:border-b-0">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-cream shrink-0 border border-border">
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-[.95rem] leading-tight mb-1 truncate">{product.name}</h3>
                    <p className="text-[.7rem] text-text-light mb-2">{product.size.split('·')[0].trim()}</p>
                    <div className="flex items-center justify-between gap-2">
                      {/* Qty stepper */}
                      <div className="inline-flex items-center border border-border rounded-lg overflow-hidden">
                        <button
                          type="button"
                          onClick={() => cart.setItemQty(product.slug, qty - 1)}
                          aria-label={t('decreaseQty', { name: product.name })}
                          className="w-7 h-7 flex items-center justify-center text-text-mid hover:bg-navy-pale hover:text-navy transition-colors cursor-pointer border-0 bg-transparent"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-[.82rem] font-semibold tabular-nums">{qty}</span>
                        <button
                          type="button"
                          onClick={() => cart.setItemQty(product.slug, qty + 1)}
                          aria-label={t('increaseQty', { name: product.name })}
                          className="w-7 h-7 flex items-center justify-center text-text-mid hover:bg-navy-pale hover:text-navy transition-colors cursor-pointer border-0 bg-transparent"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-[.95rem] text-navy tabular-nums">${(product.price * qty).toFixed(0)}</span>
                        <button
                          type="button"
                          onClick={() => {
                            cart.removeItem(product.slug);
                            track('cart_remove', { product_slug: product.slug });
                          }}
                          aria-label={t('removeItem', { name: product.name })}
                          className="text-text-light hover:text-red-600 transition-colors cursor-pointer border-0 bg-transparent p-1"
                        >
                          <IconTrash size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <footer className="border-t border-border px-6 py-5 shrink-0 bg-cream/30">
              {/* Free-shipping progress */}
              {cart.qualifiesForFreeShipping ? (
                <p className="text-[.78rem] text-navy font-semibold mb-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600" aria-hidden="true" />
                  {t('freeShippingUnlocked')}
                </p>
              ) : (
                <p className="text-[.78rem] text-text-mid mb-3">
                  {t('freeShippingHint', { remaining: `$${remainingForFreeShipping.toFixed(0)}` })}
                </p>
              )}

              <div className="flex items-baseline justify-between mb-4">
                <span className="text-[.85rem] text-text-mid">{t('subtotal')}</span>
                <span className="font-serif text-[1.4rem] text-navy tabular-nums">${cart.subtotal.toFixed(2)}</span>
              </div>
              <p className="text-[.7rem] text-text-light mb-4 leading-[1.5]">{t('shippingNote')}</p>

              {error && (
                <p role="alert" className="text-[.78rem] text-red-600 mb-3 text-center">
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={handleCheckout}
                disabled={submitting}
                aria-busy={submitting}
                className={cn(
                  'w-full bg-navy text-white py-4 px-6 rounded-xl font-semibold text-[.95rem] transition-all cursor-pointer border-0',
                  'hover:bg-navy-deep hover:-translate-y-px hover:shadow-md',
                  'disabled:opacity-60 disabled:cursor-wait disabled:hover:translate-y-0',
                )}
              >
                {submitting ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <svg className="animate-spin" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden="true">
                      <path d="M12 3a9 9 0 1 0 9 9" />
                    </svg>
                    {t('redirecting')}
                  </span>
                ) : (
                  <>
                    {t('checkout')} <span aria-hidden="true">→</span>
                  </>
                )}
              </button>
              <p className="text-center text-[.68rem] text-text-light mt-3">{t('securePayment')}</p>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}
