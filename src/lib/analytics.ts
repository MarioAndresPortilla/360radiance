'use client';

/*
 * Lightweight, vendor-agnostic analytics helper.
 *
 * Forwards every event to whichever provider happens to be loaded on the page
 * (GA4 / GTM via window.dataLayer, Plausible via window.plausible) and keeps a
 * small in-memory ring buffer for live debugging in DevTools (window.__360_events).
 *
 * SSR-safe: every call is a no-op on the server. Adding a new provider only
 * requires another forwarder inside `track()`.
 */

type AnalyticsValue = string | number | boolean | null | undefined;
export type AnalyticsProps = Record<string, AnalyticsValue>;

interface AnalyticsWindow extends Window {
  dataLayer?: Array<Record<string, unknown>>;
  plausible?: (event: string, opts?: { props?: AnalyticsProps }) => void;
  __360_events?: Array<{ t: number; event: string; props?: AnalyticsProps }>;
}

const RING_LIMIT = 50;

export type AnalyticsEvent =
  | 'product_filter_change'
  | 'product_card_click'
  | 'product_modal_open'
  | 'product_modal_close'
  | 'product_modal_cta_click'
  | 'product_modal_pair_click'
  | 'product_modal_tab_change'
  | 'bundle_view'
  | 'bundle_cta_click'
  | 'bundle_product_click'
  | 'cart_add'
  | 'cart_remove'
  | 'cart_open'
  | 'checkout_start'
  | 'purchase';

export function track(event: AnalyticsEvent, props?: AnalyticsProps): void {
  if (typeof window === 'undefined') return;
  const w = window as AnalyticsWindow;

  // GA4 / Google Tag Manager
  const payload = { event, ...props };
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push(payload);
  } else {
    w.dataLayer = [payload];
  }

  // Plausible (loaded as a separate snippet)
  if (typeof w.plausible === 'function') {
    w.plausible(event, props ? { props } : undefined);
  }

  // Local ring buffer — inspect with `window.__360_events` in DevTools
  const ring = w.__360_events ?? (w.__360_events = []);
  ring.push({ t: Date.now(), event, props });
  if (ring.length > RING_LIMIT) ring.shift();

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', event, props ?? {});
  }
}
