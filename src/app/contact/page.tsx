import type { Metadata } from 'next';
import { BUSINESS, HOURS } from '@/lib/constants';
import { PageShell } from '@/components/layout/PageShell';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { BookingSection } from '@/components/sections/BookingSection';
import { HoursSection } from '@/components/sections/HoursSection';
import { IconPhone, IconWhatsApp } from '@/components/icons/Icons';

export const metadata: Metadata = {
  title: 'Contact & Book',
  description: 'Book your free skincare consultation at 360 Radiance in Sunrise, FL. Call (561) 632-8218, WhatsApp, or book online. Open Mon-Sat.',
};

export default function ContactPage() {
  return (
    <PageShell>
      <PageHeader
        tag="Get in Touch"
        title="Book Your Free Consultation"
        subtitle="Ready for clear, radiant skin? Reach out any way you like — we're here to help you start your journey."
      />

      {/* Contact methods */}
      <section className="py-16 bg-white border-b border-border" aria-labelledby="contact-methods-heading">
        <div className="max-w-300 mx-auto px-8 max-md:px-5">
          <h2 id="contact-methods-heading" className="sr-only">Ways to reach us</h2>
          <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
            <ScrollReveal>
              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                className="group block bg-cream rounded-2xl p-8 text-center no-underline transition-all hover:shadow-md hover:-translate-y-1"
                aria-label={`Call us at ${BUSINESS.phone}`}
              >
                <div className="w-14 h-14 bg-teal-pale rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-teal/12 transition-colors" aria-hidden="true">
                  <IconPhone size={26} className="text-teal" />
                </div>
                <h3 className="font-serif text-[1.1rem] mb-1 text-text">Call Us</h3>
                <p className="text-teal font-semibold text-[.95rem]">{BUSINESS.phone}</p>
                <p className="text-text-light text-[.78rem] mt-1">Mon–Sat during business hours</p>
              </a>
            </ScrollReveal>

            <ScrollReveal>
              <a
                href={BUSINESS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-cream rounded-2xl p-8 text-center no-underline transition-all hover:shadow-md hover:-translate-y-1"
                aria-label="Chat with us on WhatsApp"
              >
                <div className="w-14 h-14 bg-[#e8f8ed] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-whatsapp/15 transition-colors" aria-hidden="true">
                  <IconWhatsApp size={26} className="fill-whatsapp" />
                </div>
                <h3 className="font-serif text-[1.1rem] mb-1 text-text">WhatsApp</h3>
                <p className="text-whatsapp-dark font-semibold text-[.95rem]">Message us anytime</p>
                <p className="text-text-light text-[.78rem] mt-1">We reply fast — usually within minutes</p>
              </a>
            </ScrollReveal>

            <ScrollReveal>
              <a
                href={BUSINESS.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-cream rounded-2xl p-8 text-center no-underline transition-all hover:shadow-md hover:-translate-y-1"
                aria-label="Get directions to our office"
              >
                <div className="w-14 h-14 bg-gold-pale rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/15 transition-colors" aria-hidden="true">
                  <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="text-gold-dark">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </div>
                <h3 className="font-serif text-[1.1rem] mb-1 text-text">Visit Us</h3>
                <p className="text-text-mid font-medium text-[.88rem]">{BUSINESS.address}</p>
                <p className="text-text-light text-[.78rem] mt-1">{BUSINESS.city}, {BUSINESS.state} {BUSINESS.zip}</p>
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <BookingSection />
      <HoursSection />

      {/* Map placeholder */}
      <section className="bg-white" aria-label="Location map">
        <div className="max-w-300 mx-auto px-8 max-md:px-5 pb-16">
          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.5!2d-80.2581!3d26.1368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s12651+W+Sunrise+Blvd+Suite+301+Sunrise+FL+33323!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="400"
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
