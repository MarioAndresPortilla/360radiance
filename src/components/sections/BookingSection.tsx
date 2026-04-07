import { useTranslations } from 'next-intl';
import { BUSINESS } from '@/lib/constants';
import { IconPhone, IconWhatsApp } from '@/components/icons/Icons';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { CalPopupButton } from '@/components/ui/CalPopupButton';

export function BookingSection() {
  const t = useTranslations('booking');

  return (
    <section className="py-24 max-md:py-16" id="booking" aria-labelledby="booking-heading">
      <div className="container-site">
        <ScrollReveal>
          <div className="bg-navy rounded-3xl px-8 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-20 text-center text-white relative overflow-hidden">
            <div className="absolute -top-[60%] -right-[15%] w-100 h-100 rounded-full bg-white/4" aria-hidden="true" />

            <h2 id="booking-heading" className="font-serif text-[clamp(1.5rem,4vw,2.2rem)] mb-5 relative z-1">
              {t('title')}
            </h2>
            <p className="opacity-80 max-w-120 mx-auto mb-10 relative z-1 text-[.95rem] leading-[1.85]">
              {t('subtitle')}
            </p>

            <div className="relative z-1 flex flex-col items-center gap-6">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <CalPopupButton variant="white" event="full" ariaLabel={t('scheduleCtaFull')}>
                  {t('scheduleCtaFull')}
                </CalPopupButton>
                <CalPopupButton variant="outline-white" event="quick" ariaLabel={t('scheduleCtaQuick')}>
                  {t('scheduleCtaQuick')}
                </CalPopupButton>
              </div>

              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                className="inline-flex items-center gap-2 text-white/85 text-[.9rem] no-underline hover:text-white transition-colors"
                aria-label={`${t('callCta')} — ${BUSINESS.phone}`}
              >
                <IconPhone size={16} className="text-current" />
                <span>{t('callCta')} · {BUSINESS.phone}</span>
              </a>

              <a
                href={BUSINESS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/85 text-[.9rem] no-underline hover:text-white transition-colors"
              >
                <IconWhatsApp size={16} className="fill-current" />
                <span>{t('whatsappCta')}</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
