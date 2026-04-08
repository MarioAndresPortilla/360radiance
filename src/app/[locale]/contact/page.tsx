import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { BUSINESS } from '@/lib/constants';
import { buildPageMetadata } from '@/lib/seo';
import { PageShell } from '@/components/layout/PageShell';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { CalPopupButton } from '@/components/ui/CalPopupButton';
import { HoursSection } from '@/components/sections/HoursSection';
import { IconPhone, IconWhatsApp } from '@/components/icons/Icons';
import { ContactForm } from './ContactForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return buildPageMetadata({
    locale,
    path: '/contact',
    title: t('title'),
    description: t('subtitle'),
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');
  const tNav = await getTranslations('nav');

  return (
    <PageShell>
      <PageHeader
        tag={t('tag')}
        title={t('title')}
        subtitle={t('subtitle')}
      />

      {/* Schedule directly + quick contact methods */}
      <section className="py-16 max-md:py-12 bg-white" aria-labelledby="schedule-heading">
        <div className="container-site">
          <ScrollReveal>
            <div className="grid grid-cols-[1.4fr_1fr] gap-10 max-lg:grid-cols-1 max-lg:gap-6">
              {/* Cal.com scheduler card */}
              <div className="bg-navy text-white rounded-3xl p-10 max-md:p-7 relative overflow-hidden">
                <div className="absolute -top-[40%] -right-[15%] w-80 h-80 rounded-full bg-white/5" aria-hidden="true" />
                <div className="relative z-1">
                  <span className="inline-block text-[.68rem] font-bold uppercase tracking-[2px] text-white/70 mb-4 bg-white/10 px-3 py-1.5 rounded-full">
                    {t('scheduleTag')}
                  </span>
                  <h2 id="schedule-heading" className="font-serif text-[clamp(1.5rem,3.2vw,2rem)] mb-4 leading-[1.2]">
                    {t('scheduleTitle')}
                  </h2>
                  <p className="text-white/80 text-[.95rem] leading-[1.85] mb-8 max-w-100">
                    {t('scheduleSubtitle')}
                  </p>
                  {/* Primary CTA = the FREE 15-min chat. Secondary = the
                      paid 30-min deep dive. The free option must lead so
                      first-time visitors don't bounce thinking everything
                      costs money. The translation keys keep their original
                      names (`scheduleCtaFull` = primary, `scheduleCtaQuick`
                      = secondary) but the events bound to them swap. */}
                  <div className="flex flex-wrap gap-3">
                    <CalPopupButton variant="white" event="quick" ariaLabel={t('scheduleCtaFull')}>
                      {t('scheduleCtaFull')}
                    </CalPopupButton>
                    <CalPopupButton variant="outline-white" event="full" ariaLabel={t('scheduleCtaQuick')}>
                      {t('scheduleCtaQuick')}
                    </CalPopupButton>
                  </div>
                  <ul className="mt-8 grid gap-2.5 text-[.85rem] text-white/85" aria-label="What to expect">
                    {(['scheduleBullet1', 'scheduleBullet2', 'scheduleBullet3'] as const).map((k) => (
                      <li key={k} className="flex items-start gap-2.5">
                        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-gold-light" aria-hidden="true">
                          <path d="m5 12 5 5L20 7" />
                        </svg>
                        {t(k)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quick contact methods */}
              <div className="grid gap-4">
                <a
                  href={`tel:${BUSINESS.phoneRaw}`}
                  className="group flex items-center gap-4 bg-cream rounded-2xl p-5 no-underline transition-all hover:shadow-md hover:-translate-y-0.5"
                  aria-label={tNav('callUs', { phone: BUSINESS.phone })}
                >
                  <div className="w-12 h-12 bg-navy-pale rounded-xl flex items-center justify-center shrink-0 group-hover:bg-navy/15 transition-colors" aria-hidden="true">
                    <IconPhone size={22} className="text-navy" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-[1rem] text-text mb-0.5">{t('callUsTitle')}</h3>
                    <p className="text-navy font-semibold text-[.92rem] truncate">{BUSINESS.phone}</p>
                    <p className="text-text-light text-[.75rem]">{t('callUsSub')}</p>
                  </div>
                </a>

                <a
                  href={BUSINESS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 bg-cream rounded-2xl p-5 no-underline transition-all hover:shadow-md hover:-translate-y-0.5"
                  aria-label="Chat with us on WhatsApp"
                >
                  <div className="w-12 h-12 bg-[#e8f8ed] rounded-xl flex items-center justify-center shrink-0 group-hover:bg-whatsapp/15 transition-colors" aria-hidden="true">
                    <IconWhatsApp size={22} className="fill-whatsapp" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-[1rem] text-text mb-0.5">{t('whatsappTitle')}</h3>
                    <p className="text-whatsapp-dark font-semibold text-[.92rem]">{t('whatsappBody')}</p>
                    <p className="text-text-light text-[.75rem]">{t('whatsappSub')}</p>
                  </div>
                </a>

                <a
                  href={BUSINESS.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 bg-cream rounded-2xl p-5 no-underline transition-all hover:shadow-md hover:-translate-y-0.5"
                  aria-label="Get directions to our office"
                >
                  <div className="w-12 h-12 bg-gold-highlight rounded-xl flex items-center justify-center shrink-0 group-hover:bg-gold/15 transition-colors" aria-hidden="true">
                    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="text-gold-dark">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-[1rem] text-text mb-0.5">{t('visitTitle')}</h3>
                    <p className="text-text-mid font-medium text-[.88rem] truncate">{BUSINESS.address}</p>
                    <p className="text-text-light text-[.75rem]">{BUSINESS.city}, {BUSINESS.state} {BUSINESS.zip}</p>
                  </div>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-20 max-md:py-14 bg-white" aria-labelledby="contact-form-heading">
        <div className="container-site">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10 max-md:mb-8">
                <span className="inline-block text-[.68rem] font-bold uppercase tracking-[2px] text-navy mb-4 bg-navy-pale px-4 py-1.5 rounded-full">
                  {t('formTag')}
                </span>
                <h2 id="contact-form-heading" className="font-serif text-[clamp(1.6rem,3.6vw,2.2rem)] mb-4 leading-[1.2]">
                  {t('formTitle')}
                </h2>
                <p className="text-text-mid text-[.95rem] leading-[1.85] max-w-130 mx-auto">
                  {t('formSubtitle')}
                </p>
              </div>
              <div className="bg-white rounded-3xl shadow-md ring-1 ring-border p-8 max-md:p-6">
                <ContactForm />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <HoursSection />

      {/* Map */}
      <section className="bg-white py-16 max-md:py-10" aria-label="Location map">
        <div className="container-site">
          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.5!2d-80.2581!3d26.1368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s12651+W+Sunrise+Blvd+Suite+301+Sunrise+FL+33323!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="360 Radiance location on Google Maps"
                className="w-full"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageShell>
  );
}
