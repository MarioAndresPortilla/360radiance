import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { BUSINESS } from '@/lib/constants';
import { PageShell } from '@/components/layout/PageShell';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { BookingSection } from '@/components/sections/BookingSection';
import { HoursSection } from '@/components/sections/HoursSection';
import { IconPhone, IconWhatsApp } from '@/components/icons/Icons';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
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

      {/* Contact methods */}
      <section className="py-20 max-md:py-14 bg-white" aria-labelledby="contact-methods-heading">
        <div className="container-site">
          <h2 id="contact-methods-heading" className="sr-only">Ways to reach us</h2>
          <div className="grid grid-cols-3 gap-8 max-md:grid-cols-1 max-md:gap-5">
            <ScrollReveal>
              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                className="group block bg-cream rounded-2xl p-10 max-md:p-8 text-center no-underline transition-all hover:shadow-md hover:-translate-y-1"
                aria-label={tNav('callUs', { phone: BUSINESS.phone })}
              >
                <div className="w-16 h-16 bg-teal-pale rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-teal/12 transition-colors" aria-hidden="true">
                  <IconPhone size={28} className="text-teal" />
                </div>
                <h3 className="font-serif text-[1.15rem] mb-2 text-text">{t('callUsTitle')}</h3>
                <p className="text-teal font-semibold text-[1rem] mb-2">{BUSINESS.phone}</p>
                <p className="text-text-light text-[.82rem]">{t('callUsSub')}</p>
              </a>
            </ScrollReveal>

            <ScrollReveal>
              <a
                href={BUSINESS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-cream rounded-2xl p-10 max-md:p-8 text-center no-underline transition-all hover:shadow-md hover:-translate-y-1"
                aria-label="Chat with us on WhatsApp"
              >
                <div className="w-16 h-16 bg-[#e8f8ed] rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-whatsapp/15 transition-colors" aria-hidden="true">
                  <IconWhatsApp size={28} className="fill-whatsapp" />
                </div>
                <h3 className="font-serif text-[1.15rem] mb-2 text-text">{t('whatsappTitle')}</h3>
                <p className="text-whatsapp-dark font-semibold text-[1rem] mb-2">{t('whatsappBody')}</p>
                <p className="text-text-light text-[.82rem]">{t('whatsappSub')}</p>
              </a>
            </ScrollReveal>

            <ScrollReveal>
              <a
                href={BUSINESS.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-cream rounded-2xl p-10 max-md:p-8 text-center no-underline transition-all hover:shadow-md hover:-translate-y-1"
                aria-label="Get directions to our office"
              >
                <div className="w-16 h-16 bg-gold-pale rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/15 transition-colors" aria-hidden="true">
                  <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="text-gold-dark">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </div>
                <h3 className="font-serif text-[1.15rem] mb-2 text-text">{t('visitTitle')}</h3>
                <p className="text-text-mid font-medium text-[.95rem] mb-2">{BUSINESS.address}</p>
                <p className="text-text-light text-[.82rem]">{BUSINESS.city}, {BUSINESS.state} {BUSINESS.zip}</p>
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <BookingSection />
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
