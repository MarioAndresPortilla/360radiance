'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { getCalApi } from '@calcom/embed-react';
import { BUSINESS, CAL } from '@/lib/constants';
import { IconPhone, IconWhatsApp } from '@/components/icons/Icons';

type CalApi = Awaited<ReturnType<typeof getCalApi>>;

// Floating action stack: Cal.com booking (primary), phone (tel:), and
// WhatsApp. We warm up the Cal embed on mount AND open the modal via an
// explicit onClick that calls the cal stub function directly. The stub
// queues commands until embed.js finishes downloading, so the very first
// click is honored even if the user taps the FAB before the embed script
// has loaded — fixing a bug where data-cal-link click delegation (which is
// only attached after embed.js loads) silently dropped the first click.
export function FloatingButtons() {
  const tCommon = useTranslations('common');
  const calRef = useRef<CalApi | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cal = await getCalApi({ namespace: CAL.namespace });
      if (cancelled) return;
      calRef.current = cal;
      cal('ui', {
        theme: 'light',
        cssVarsPerTheme: {
          // Cal.com modal accent — must match the brand navy primary so the
          // embedded picker doesn't flash a foreign color when it opens.
          light: { 'cal-brand': '#2F3269' },
          dark: { 'cal-brand': '#2F3269' },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
    return () => { cancelled = true; };
  }, []);

  const openBooking = useCallback(async () => {
    let cal = calRef.current;
    if (!cal) {
      cal = await getCalApi({ namespace: CAL.namespace });
      calRef.current = cal;
    }
    cal('modal', {
      calLink: CAL.defaultLink,
      config: { layout: 'month_view', theme: 'light' },
    });
  }, []);

  return (
    <div className="fab-stack fixed z-90 flex flex-col gap-3 items-end print:hidden" role="group">
      <button
        type="button"
        onClick={openBooking}
        className="bg-gold text-navy w-13 h-13 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-250 hover:bg-gold-light hover:-translate-y-0.5 cursor-pointer"
        aria-label={tCommon('bookFreeConsultation')}
      >
        {/* Calendar icon */}
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      </button>
      <a
        href={`tel:${BUSINESS.phoneRaw}`}
        className="bg-navy text-white w-13 h-13 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-250 hover:bg-navy-deep hover:-translate-y-0.5 no-underline"
        aria-label={`${tCommon('bookConsultation')} — ${BUSINESS.phone}`}
      >
        <IconPhone size={22} className="text-white" />
      </a>
      <a
        href={BUSINESS.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-whatsapp text-white w-13 h-13 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,.3)] transition-all duration-250 hover:bg-whatsapp-dark hover:scale-[1.08] relative"
        aria-label="WhatsApp"
      >
        <IconWhatsApp size={26} className="fill-white" />
      </a>
    </div>
  );
}
