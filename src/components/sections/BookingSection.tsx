'use client';

import { useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Cal, { getCalApi } from '@calcom/embed-react';
import { BUSINESS, CAL } from '@/lib/constants';
import { IconPhone, IconWhatsApp } from '@/components/icons/Icons';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function BookingSection() {
  const t = useTranslations('booking');
  const locale = useLocale();

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: 'booking-inline' });
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
    <section className="py-24 max-md:py-16" id="booking" aria-labelledby="booking-heading">
      <div className="container-site">
        <ScrollReveal>
          <div className="bg-teal rounded-3xl px-8 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-20 text-center text-white relative overflow-hidden">
            <div className="absolute -top-[60%] -right-[15%] w-100 h-100 rounded-full bg-white/4" aria-hidden="true" />

            <h2 id="booking-heading" className="font-serif text-[clamp(1.5rem,4vw,2.2rem)] mb-5 relative z-1">
              {t('title')}
            </h2>
            <p className="opacity-80 max-w-120 mx-auto mb-10 relative z-1 text-[.95rem] leading-[1.85]">
              {t('subtitle')}
            </p>

            <div className="bg-white rounded-2xl overflow-hidden relative z-1 mx-auto max-w-3xl shadow-xl">
              <Cal
                namespace="booking-inline"
                calLink={CAL.link}
                style={{ width: '100%', height: '100%', overflow: 'scroll' }}
                config={{ layout: 'month_view', theme: 'light', language: locale }}
              />
            </div>

            <div className="mt-10 flex justify-center gap-8 relative z-1 flex-wrap max-md:gap-6">
              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                className="text-white/80 text-[.88rem] no-underline flex items-center gap-2 hover:text-white transition-colors"
                aria-label={`Call us at ${BUSINESS.phone}`}
              >
                <IconPhone size={18} className="text-current" />
                {BUSINESS.phone}
              </a>
              <a
                href={BUSINESS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 text-[.88rem] no-underline flex items-center gap-2 hover:text-white transition-colors"
                aria-label="Chat with us on WhatsApp"
              >
                <IconWhatsApp size={18} className="fill-current" />
                WhatsApp
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
