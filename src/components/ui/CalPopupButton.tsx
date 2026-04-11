'use client';

import { type ReactNode } from 'react';
import { type CalEventKey } from '@/lib/constants';
import { useCalBooking } from '@/lib/use-cal-booking';
import { cn } from '@/lib/utils';

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

// Click-to-open Cal.com modal. All embed init + error-fallback logic lives in
// useCalBooking — if cal.com's script fails to load (adblocker, CSP, offline,
// transient CDN outage), `openBooking` opens the raw cal.com booking page in
// a new tab so the user still gets through to Marta's availability.
export function CalPopupButton({
  children,
  className,
  variant = 'navy',
  event = 'full',
  ariaLabel,
}: CalPopupButtonProps) {
  const { openBooking } = useCalBooking();

  return (
    <button
      type="button"
      onClick={() => openBooking(event)}
      className={cn(base, variantStyles[variant], className)}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
