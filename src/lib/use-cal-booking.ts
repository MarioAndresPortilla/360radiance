'use client';

import { useCallback, useEffect, useRef } from 'react';
import { getCalApi } from '@calcom/embed-react';
import { CAL, type CalEventKey } from './constants';

type CalApi = Awaited<ReturnType<typeof getCalApi>>;

// Timeout for embed script load before falling back to a direct cal.com tab.
// Covers adblockers, CSP blocks, offline state, and transient cal.com CDN hiccups.
// 2.5s is long enough for a slow 4G cold-cache load and short enough that a
// user who taps the booking button doesn't sit staring at nothing.
const EMBED_LOAD_TIMEOUT_MS = 2500;

/**
 * Reusable Cal.com booking hook.
 *
 * Warms up the embed on mount, opens the brand-themed modal on `openBooking()`,
 * and — critically — falls back to opening the raw `cal.com/…` URL in a new
 * tab if the embed script fails to load or the modal throws. Without this
 * fallback, users behind an adblocker / strict corporate proxy / CSP policy
 * would tap the "Book" CTA and silently get nothing. Marta's support inbox
 * has seen several of these; the direct-link fallback routes them through.
 *
 * Usage:
 *   const { openBooking } = useCalBooking();
 *   <button onClick={() => openBooking('quick')}>Book</button>
 */
export function useCalBooking() {
  const calRef = useRef<CalApi | null>(null);
  const themedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const cal = await withTimeout(
          getCalApi({ namespace: CAL.namespace }),
          EMBED_LOAD_TIMEOUT_MS,
        );
        if (cancelled) return;
        calRef.current = cal;
        if (!themedRef.current) {
          cal('ui', {
            theme: 'light',
            cssVarsPerTheme: {
              light: { 'cal-brand': '#2F3269' },
              // Site is light-only, but the embed types require both keys.
              dark: { 'cal-brand': '#2F3269' },
            },
            hideEventTypeDetails: false,
            layout: 'month_view',
          });
          themedRef.current = true;
        }
      } catch {
        // Silent — openBooking() has its own fallback so a blocked embed
        // script doesn't stop the user from booking. We deliberately don't
        // console-error in production when an adblocker kills the script.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const openBooking = useCallback(async (event: CalEventKey = 'full') => {
    const link = CAL.events[event].link;
    const fallback = () => {
      if (typeof window === 'undefined') return;
      window.open(`https://cal.com/${link}`, '_blank', 'noopener,noreferrer');
    };

    let cal = calRef.current;
    if (!cal) {
      try {
        cal = await withTimeout(
          getCalApi({ namespace: CAL.namespace }),
          EMBED_LOAD_TIMEOUT_MS,
        );
        calRef.current = cal;
      } catch {
        fallback();
        return;
      }
    }

    try {
      cal('modal', {
        calLink: link,
        config: { layout: 'month_view', theme: 'light' },
      });
    } catch {
      fallback();
    }
  }, []);

  return { openBooking };
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Cal embed load timed out')), ms),
    ),
  ]);
}
