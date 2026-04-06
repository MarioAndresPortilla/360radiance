'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { getCalApi } from '@calcom/embed-react';
import { BUSINESS, CAL } from '@/lib/constants';
import { IconCalendar, IconWhatsApp } from '@/components/icons/Icons';

export function FloatingButtons() {
  const tCommon = useTranslations('common');

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: 'booking-popup' });
      cal('ui', {
        theme: 'light',
        cssVarsPerTheme: {
          light: { 'cal-brand': '#1A7F7E' },
          dark: { 'cal-brand': '#1A7F7E' },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  return (
    <div className="fixed bottom-6 right-6 max-md:bottom-4 max-md:right-4 z-90 flex flex-col gap-3 items-end print:hidden" role="group">
      <button
        type="button"
        data-cal-namespace="booking-popup"
        data-cal-link={CAL.link}
        data-cal-config='{"layout":"month_view","theme":"light"}'
        className="bg-teal text-white w-13 h-13 rounded-2xl flex items-center justify-center cursor-pointer shadow-lg transition-all duration-250 border-none hover:bg-teal-dark hover:-translate-y-0.5"
        aria-label={tCommon('bookConsultation')}
      >
        <IconCalendar size={22} className="text-white" />
      </button>
      <a
        href={BUSINESS.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-whatsapp text-white w-13 h-13 rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_20px_rgba(37,211,102,.3)] transition-all duration-250 border-none hover:bg-whatsapp-dark hover:scale-[1.08] relative"
        aria-label="WhatsApp"
      >
        <IconWhatsApp size={26} className="fill-white" />
      </a>
    </div>
  );
}
