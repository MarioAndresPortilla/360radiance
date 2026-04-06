'use client';

import { useEffect, type ReactNode } from 'react';
import { getCalApi } from '@calcom/embed-react';
import { CAL, type CalEventKey } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface CalPopupButtonProps {
  children: ReactNode;
  className?: string;
  // Allow callers to override the variant; default matches the site's primary teal CTA.
  variant?: 'teal' | 'white' | 'outline-teal' | 'outline-white';
  // Which Cal event type to open. Defaults to the 30-minute full consultation.
  event?: CalEventKey;
  ariaLabel?: string;
}

const variantStyles: Record<NonNullable<CalPopupButtonProps['variant']>, string> = {
  teal:
    'bg-teal text-white hover:bg-teal-dark hover:-translate-y-px hover:shadow-md',
  white:
    'bg-white text-teal hover:scale-[1.03] hover:shadow-2xl shadow-xl',
  'outline-teal':
    'bg-transparent border-[1.5px] border-teal text-teal hover:bg-teal hover:text-white',
  'outline-white':
    'bg-transparent border-[1.5px] border-white/60 text-white hover:bg-white/10 hover:border-white',
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold text-[.95rem] px-8 py-4 transition-all duration-250 cursor-pointer no-underline';

// Click-to-open Cal.com modal. The actual modal is opened by Cal's embed
// script via the `data-cal-*` attributes — we just have to make sure the
// namespace is initialized once on mount, which `getCalApi` does.
export function CalPopupButton({
  children,
  className,
  variant = 'teal',
  event = 'full',
  ariaLabel,
}: CalPopupButtonProps) {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cal = await getCalApi({ namespace: CAL.namespace });
      if (cancelled) return;
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

  return (
    <button
      type="button"
      data-cal-link={CAL.events[event].link}
      data-cal-namespace={CAL.namespace}
      data-cal-config={JSON.stringify({ layout: 'month_view', theme: 'light' })}
      className={cn(base, variantStyles[variant], className)}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
