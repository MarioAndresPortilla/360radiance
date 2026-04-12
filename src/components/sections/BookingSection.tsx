import { useTranslations } from 'next-intl';
import { BUSINESS } from '@/lib/constants';
import { Link } from '@/i18n/navigation';
import { IconPhone, IconWhatsApp } from '@/components/icons/Icons';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { CalPopupButton } from '@/components/ui/CalPopupButton';

export function BookingSection() {
  const t = useTranslations('booking');

  return (
    <section className="py-14 max-md:py-10" id="booking" aria-labelledby="booking-heading">
      <div className="container-site">
        <ScrollReveal>
          <div className="bg-navy rounded-3xl px-8 py-12 sm:px-12 sm:py-14 lg:px-16 lg:py-14 text-center text-white relative overflow-hidden">
            <div className="absolute -top-[60%] -right-[15%] w-100 h-100 rounded-full bg-white/4" aria-hidden="true" />

            <h2 id="booking-heading" className="font-serif text-[clamp(1.5rem,4vw,2.2rem)] mb-4 relative z-1">
              {t('title')}
            </h2>
            <p className="opacity-80 max-w-120 mx-auto mb-8 relative z-1 text-[.95rem] leading-[1.85]">
              {t('subtitle')}
            </p>

            <div className="relative z-1 flex flex-col items-center gap-5">
              <CalPopupButton variant="white" event="quick" ariaLabel={t('scheduleCtaFull')}>
                {t('scheduleCtaFull')}
              </CalPopupButton>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-white/80 text-[.85rem] hover:text-white transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-white/70"
              >
                {t('freshaCtaLabel')}
              </Link>

              <div className="flex items-center gap-6 max-md:flex-col max-md:gap-3 mt-1">
                <a
                  href={`tel:${BUSINESS.phoneRaw}`}
                  className="inline-flex items-center gap-2 text-white/75 text-[.85rem] no-underline hover:text-white transition-colors"
                  aria-label={`${t('callCta')} — ${BUSINESS.phone}`}
                >
                  <IconPhone size={15} className="text-current" />
                  <span>{t('callCta')} · {BUSINESS.phone}</span>
                </a>
                <span className="text-white/30 max-md:hidden" aria-hidden="true">·</span>
                <a
                  href={BUSINESS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/75 text-[.85rem] no-underline hover:text-white transition-colors"
                >
                  <IconWhatsApp size={15} className="fill-current" />
                  <span>{t('whatsappCta')}</span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
