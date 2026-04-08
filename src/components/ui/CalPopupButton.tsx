'use client';

import { useCallback, useEffect, useRef, type ReactNode } from 'react';
import { getCalApi } from '@calcom/embed-react';
import { CAL, type CalEventKey } from '@/lib/constants';
import { cn } from '@/lib/utils';

type CalApi = Awaited<ReturnType<typeof getCalApi>>;

interface CalPopupButtonProps {
  children: ReactNode;
  className?: string;
  // Allow callers to override the variant; default matches the site's primary navy CTA.
  // `link-white` renders as a plain text link (no button shape) so it can sit
  // beneath a primary CTA as a visually-quieter secondary option without
  // competing for the eye.
  variant?: 'navy' | 'white' | 'outline-navy' | 'outline-white' | 'link-white';
  // Which Cal event type to open. Defaults to the 30-minute full consultation.
  event?: CalEventKey;
  ariaLabel?: string;
}

const variantStyles: Record<NonNullable<CalPopupButtonProps['variant']>, string> = {
  navy:
    'rounded-xl font-semibold text-[.95rem] px-8 py-4 bg-navy text-white hover:bg-navy-deep hover:-translate-y-px hover:shadow-md',
  white:
    'rounded-xl font-semibold text-[.95rem] px-8 py-4 bg-white text-navy hover:scale-[1.03] hover:shadow-2xl shadow-xl',
  'outline-navy':
    'rounded-xl font-semibold text-[.95rem] px-8 py-4 bg-transparent border-[1.5px] border-navy text-navy hover:bg-navy hover:text-white',
  'outline-white':
    'rounded-xl font-semibold text-[.95rem] px-8 py-4 bg-transparent border-[1.5px] border-white/60 text-white hover:bg-white/10 hover:border-white',
  'link-white':
    'text-[.85rem] text-white/80 underline underline-offset-4 decoration-white/30 hover:text-white hover:decoration-white/70 px-0 py-0 bg-transparent border-0',
};

const base =
  'inline-flex items-center justify-center gap-2 transition-all duration-250 cursor-pointer';

// Click-to-open Cal.com modal. We warm up the embed namespace on mount and
// open the modal via an explicit onClick that calls the cal stub function
// directly. The stub queues commands until embed.js finishes downloading,
// so the very first click is honored even if the user clicks before the
// embed script has loaded — relying on data-cal-link click delegation
// (attached only after embed.js loads) drops the first click.
export function CalPopupButton({
  children,
  className,
  variant = 'navy',
  event = 'full',
  ariaLabel,
}: CalPopupButtonProps) {
  const calRef = useRef<CalApi | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cal = await getCalApi({ namespace: CAL.namespace });
      if (cancelled) return;
      calRef.current = cal;
      // Theme the modal so it matches our brand. Light mode only — the site
      // doesn't have a dark theme so we lock it down to avoid OS-level flips.
      cal('ui', {
        theme: 'light',
        cssVarsPerTheme: {
          light: { 'cal-brand': '#1A7F7E' },
          // Site is light-only, but the embed types require both keys —
          // mirror the same brand color so dark mode degrades gracefully.
          dark: { 'cal-brand': '#1A7F7E' },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const openModal = useCallback(async () => {
    let cal = calRef.current;
    if (!cal) {
      cal = await getCalApi({ namespace: CAL.namespace });
      calRef.current = cal;
    }
    cal('modal', {
      calLink: CAL.events[event].link,
      config: { layout: 'month_view', theme: 'light' },
    });
  }, [event]);

  return (
    <button
      type="button"
      onClick={openModal}
      className={cn(base, variantStyles[variant], className)}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
