'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { getCalApi } from '@calcom/embed-react';
import { BUSINESS, CAL } from '@/lib/constants';
import { IconPhone, IconWhatsApp } from '@/components/icons/Icons';

// Floating action stack: Cal.com booking (primary), phone (tel:), and
// WhatsApp. The Cal popup is initialized once on mount via getCalApi so the
// data-cal-link button just opens the modal — no per-click setup.
export function FloatingButtons() {
  const tCommon = useTranslations('common');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cal = await getCalApi({ namespace: CAL.namespace });
      if (cancelled) return;
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

  return (
    <div className="fab-stack fixed z-90 flex flex-col gap-3 items-end print:hidden" role="group">
      <button
        type="button"
        data-cal-link={CAL.defaultLink}
        data-cal-namespace={CAL.namespace}
        data-cal-config={JSON.stringify({ layout: 'month_view', theme: 'light' })}
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
