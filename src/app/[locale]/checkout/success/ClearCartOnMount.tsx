'use client';

import { useEffect } from 'react';
import { useCart } from '@/lib/cart';
import { track } from '@/lib/analytics';

/*
 * Tiny client island that runs once on the success page:
 *   1. Clears the localStorage cart so the next visit is fresh
 *   2. Fires the `purchase` analytics event with order id + value
 *
 * We dedupe via sessionStorage keyed on the Stripe session id so refreshing
 * the page doesn't re-fire the conversion event. The cart clear is idempotent
 * (clearing an empty cart is a noop) so it doesn't need its own dedupe.
 */
const TRACK_KEY = '360radiance_purchase_tracked_v1';

interface Props {
  sessionId: string;
  totalCents: number;
  itemCount: number;
}

export function ClearCartOnMount({ sessionId, totalCents, itemCount }: Props) {
  const cart = useCart();
  useEffect(() => {
    // Always clear the cart — even if we somehow re-fire, an empty cart
    // stays empty.
    cart.clear();

    // Dedupe analytics so a refresh doesn't double-count.
    let alreadyTracked = false;
    try {
      const tracked = sessionStorage.getItem(TRACK_KEY);
      alreadyTracked = tracked === sessionId;
    } catch {
      // sessionStorage disabled — fire anyway
    }
    if (!alreadyTracked) {
      track('purchase', {
        order_id: sessionId,
        value_cents: totalCents,
        item_count: itemCount,
      });
      try {
        sessionStorage.setItem(TRACK_KEY, sessionId);
      } catch {
        // ignore
      }
    }
    // Intentionally no dependencies — fire once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
