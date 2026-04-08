'use client';

import { useTranslations } from 'next-intl';
import { useCart } from '@/lib/cart';
import { IconBag } from '@/components/icons/Icons';
import { track } from '@/lib/analytics';

/*
 * Header cart trigger. Hidden entirely when:
 *   - Stripe is not configured (build wasn't given STRIPE_SECRET_KEY)
 *   - The localStorage hydration hasn't finished yet (prevents the count
 *     badge from flashing 0 → real-count after the first paint)
 *
 * Renders a small bag icon with a circular count badge that appears once
 * the cart has at least one item. Click opens the drawer (state lives in
 * the CartProvider).
 */
export function CartButton() {
  const cart = useCart();
  const t = useTranslations('cart');

  if (!cart.stripeEnabled) return null;
  if (!cart.hydrated) return null;

  const handleClick = () => {
    cart.open();
    track('cart_open', { source: 'navbar', item_count: cart.count });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={t('openCart', { count: cart.count })}
      className="relative inline-flex w-10 h-10 max-md:w-9 max-md:h-9 items-center justify-center rounded-full text-navy hover:bg-navy-pale transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy cursor-pointer border-0 bg-transparent p-0 shrink-0"
    >
      <IconBag size={20} />
      {cart.count > 0 && (
        <span
          className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 rounded-full bg-navy text-white text-[.66rem] font-bold flex items-center justify-center shadow-sm"
          aria-hidden="true"
        >
          {cart.count > 9 ? '9+' : cart.count}
        </span>
      )}
    </button>
  );
}
