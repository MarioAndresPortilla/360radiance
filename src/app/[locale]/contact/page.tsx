import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { BUSINESS } from '@/lib/constants';
import { buildPageMetadata } from '@/lib/seo';
import { PageShell } from '@/components/layout/PageShell';
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
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative bg-navy overflow-hidden py-24 max-md:py-16">
        {/* Decorative geometry */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/[.04]" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        </div>

        <div className="container-site relative z-1">
          <ScrollReveal>
            <div className="max-w-2xl">
              <span className="inline-block text-[.65rem] font-bold uppercase tracking-[2.5px] text-gold mb-5 bg-white/[.08] px-4 py-1.5 rounded-full border border-white/10">
                {t('tag')}
              </span>
              <h1 className="font-serif text-white text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.1] mb-5">
                {t('title')}
              </h1>
              <p className="text-white/70 text-[1.05rem] leading-[1.85] max-w-110">
                {t('subtitle')}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Quick contact strip ──────────────────────────────────── */}
      <section className="relative z-10 -mt-8 max-md:-mt-6" aria-label="Quick contact methods">
        <div className="container-site">
          <ScrollReveal>
            <div className="grid grid-cols-3 max-md:grid-cols-1 gap-4">
              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                className="group flex items-center gap-4 bg-white rounded-2xl p-6 no-underline shadow-lg ring-1 ring-black/[.06] transition-all hover:-translate-y-1 hover:shadow-xl"
                aria-label={tNav('callUs', { phone: BUSINESS.phone })}
              >
                <div className="w-13 h-13 bg-navy rounded-xl flex items-center justify-center shrink-0 group-hover:bg-navy-deep transition-colors" aria-hidden="true">
                  <IconPhone size={22} className="text-white" />
                </div>
                <div className="min-w-0">
                  <h2 className="font-serif text-[1rem] text-text mb-0.5">{t('callUsTitle')}</h2>
                  <p className="text-navy font-semibold text-[.92rem] truncate">{BUSINESS.phone}</p>
                  <p className="text-text-light text-[.72rem]">{t('callUsSub')}</p>
                </div>
              </a>

              <a
                href={BUSINESS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-white rounded-2xl p-6 no-underline shadow-lg ring-1 ring-black/[.06] transition-all hover:-translate-y-1 hover:shadow-xl"
                aria-label="Chat with us on WhatsApp"
              >
                <div className="w-13 h-13 bg-whatsapp rounded-xl flex items-center justify-center shrink-0 group-hover:brightness-110 transition-all" aria-hidden="true">
                  <IconWhatsApp size={22} className="fill-white" />
                </div>
                <div className="min-w-0">
                  <h2 className="font-serif text-[1rem] text-text mb-0.5">{t('whatsappTitle')}</h2>
                  <p className="text-whatsapp-dark font-semibold text-[.92rem]">{t('whatsappBody')}</p>
                  <p className="text-text-light text-[.72rem]">{t('whatsappSub')}</p>
                </div>
              </a>

              <a
                href={BUSINESS.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-white rounded-2xl p-6 no-underline shadow-lg ring-1 ring-black/[.06] transition-all hover:-translate-y-1 hover:shadow-xl"
                aria-label="Get directions to our office"
              >
                <div className="w-13 h-13 bg-gold rounded-xl flex items-center justify-center shrink-0 group-hover:brightness-110 transition-all" aria-hidden="true">
                  <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h2 className="font-serif text-[1rem] text-text mb-0.5">{t('visitTitle')}</h2>
                  <p className="text-text-mid font-medium text-[.88rem] truncate">{BUSINESS.address}</p>
                  <p className="text-text-light text-[.72rem]">{BUSINESS.city}, {BUSINESS.state} {BUSINESS.zip}</p>
                </div>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Book consultation ────────────────────────────────────── */}
      <section className="py-20 max-md:py-14 bg-cream" aria-labelledby="schedule-heading">
        <div className="container-site">
          <ScrollReveal>
            <div className="relative bg-navy-deep rounded-3xl overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gold/[.06]" />
                <div className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full bg-white/[.03]" />
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/[.03] to-transparent" />
              </div>

              <div className="relative z-1 grid grid-cols-[1fr_auto] max-lg:grid-cols-1 items-center">
                {/* Copy */}
                <div className="p-12 max-md:p-8">
                  <span className="inline-block text-[.62rem] font-bold uppercase tracking-[2.5px] text-gold mb-5 border border-gold/30 px-3.5 py-1.5 rounded-full">
                    {t('scheduleTag')}
                  </span>
                  <h2 id="schedule-heading" className="font-serif text-white text-[clamp(1.6rem,3.5vw,2.4rem)] leading-[1.15] mb-5">
                    {t('scheduleTitle')}
                  </h2>
                  <p className="text-white/65 text-[.95rem] leading-[1.85] mb-8 max-w-110">
                    {t('scheduleSubtitle')}
                  </p>

                  <div className="flex flex-wrap gap-4 items-center mb-10">
                    <CalPopupButton variant="white" event="quick" ariaLabel={t('scheduleCtaFull')}>
                      {t('scheduleCtaFull')}
                    </CalPopupButton>
                    <span className="text-[.85rem] text-white/50 italic">
                      {t('scheduleCtaQuick')}
                    </span>
                  </div>

                  <ul className="grid grid-cols-3 max-md:grid-cols-1 gap-4" aria-label="What to expect">
                    {(['scheduleBullet1', 'scheduleBullet2', 'scheduleBullet3'] as const).map((k) => (
                      <li key={k} className="flex items-start gap-3 text-[.82rem] text-white/75 bg-white/[.05] rounded-xl p-4 border border-white/[.06]">
                        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-gold" aria-hidden="true">
                          <path d="m5 12 5 5L20 7" />
                        </svg>
                        {t(k)}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Decorative sidebar accent */}
                <div className="hidden lg:flex w-56 h-full items-center justify-center" aria-hidden="true">
                  <div className="w-32 h-32 rounded-full border-2 border-gold/20 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border border-gold/15 flex items-center justify-center">
                      <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="text-gold/50">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Contact form ─────────────────────────────────────────── */}
      <section className="py-20 max-md:py-14 bg-white" aria-labelledby="contact-form-heading">
        <div className="container-site">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10 max-md:mb-8">
                <span className="inline-block text-[.62rem] font-bold uppercase tracking-[2.5px] text-navy mb-4 bg-navy-pale px-4 py-1.5 rounded-full">
                  {t('formTag')}
                </span>
                <h2 id="contact-form-heading" className="font-serif text-[clamp(1.6rem,3.6vw,2.2rem)] mb-4 leading-[1.15]">
                  {t('formTitle')}
                </h2>
                <p className="text-text-mid text-[.95rem] leading-[1.85] max-w-130 mx-auto">
                  {t('formSubtitle')}
                </p>
              </div>
              <div className="bg-white rounded-3xl shadow-lg ring-1 ring-black/[.06] p-10 max-md:p-6">
                <ContactForm />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <HoursSection />

      {/* ── Map ──────────────────────────────────────────────────── */}
      <section className="bg-cream py-16 max-md:py-10" aria-label="Location map">
        <div className="container-site">
          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden ring-1 ring-black/[.06] shadow-lg">
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
