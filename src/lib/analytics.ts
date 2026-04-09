'use client';

/*
 * Lightweight analytics helper, wired to Vercel Web Analytics.
 *
 * Vercel Analytics is loaded once at the layout level via the <Analytics />
 * component (src/app/[locale]/layout.tsx). That component handles automatic
 * pageview tracking and exposes a `track()` function that we wrap here so the
 * rest of the codebase keeps importing `track` from this module — no
 * vendor-specific imports leak into product / cart / bundle code.
 *
 * SSR-safe: every call is a no-op on the server (the underlying Vercel
 * helper is also a no-op there, but we guard up front so the function never
 * touches `window` during render).
 *
 * Why not GA4 / Plausible: we're hosted on Vercel, Vercel Analytics ships
 * privacy-friendly + cookie-less + zero-config tracking, no extra vendor
 * dashboards to log into, and the events show up alongside Speed Insights
 * in the same Vercel project. If we ever need a richer event store, the
 * shape of `track()` is generic enough to fan out to a second backend
 * (Sentry breadcrumbs, PostHog, etc.) without changing call sites.
 *
 * For local debugging, every event is also pushed onto a small in-memory
 * ring buffer at `window.__360_events` and console.debug-logged outside of
 * production builds.
 */

import { track as vercelTrack } from '@vercel/analytics/react';

type AnalyticsValue = string | number | boolean | null | undefined;
export type AnalyticsProps = Record<string, AnalyticsValue>;

interface AnalyticsWindow extends Window {
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

  // Forward to Vercel Web Analytics. Vercel only accepts non-undefined values
  // in the property bag, so strip undefineds defensively — keeps us out of
  // their "invalid event property" warning path.
  if (props) {
    const cleaned: Record<string, string | number | boolean | null> = {};
    for (const [k, v] of Object.entries(props)) {
      if (v !== undefined) cleaned[k] = v;
    }
    vercelTrack(event, cleaned);
  } else {
    vercelTrack(event);
  }

  // Local ring buffer — inspect with `window.__360_events` in DevTools
  const w = window as AnalyticsWindow;
  const ring = w.__360_events ?? (w.__360_events = []);
  ring.push({ t: Date.now(), event, props });
  if (ring.length > RING_LIMIT) ring.shift();

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', event, props ?? {});
  }
}
