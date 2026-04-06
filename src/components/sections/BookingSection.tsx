'use client';

import { useState } from 'react';
import { BUSINESS, BOOKING_SERVICES, BOOKING_DAYS } from '@/lib/constants';
import { IconPhone, IconWhatsApp } from '@/components/icons/Icons';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const inputBase = 'w-full py-4 px-5 border-none rounded-xl font-sans text-[.88rem] outline-none bg-white text-text focus:ring-2 focus:ring-white/40 placeholder:text-text-light';

export function BookingSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="py-24 max-md:py-16" id="booking" aria-labelledby="booking-heading">
      <div className="max-w-250 mx-auto px-8 max-md:px-5">
        <ScrollReveal>
          <div className="bg-teal rounded-3xl px-8 py-16 sm:px-12 sm:py-20 lg:px-20 lg:py-24 text-center text-white relative overflow-hidden">
            <div className="absolute -top-[60%] -right-[15%] w-100 h-100 rounded-full bg-white/4" aria-hidden="true" />

            <h2 id="booking-heading" className="font-serif text-[clamp(1.5rem,4vw,2.2rem)] mb-5 relative z-1">
              Ready for Clear, Radiant Skin?
            </h2>
            <p className="opacity-80 max-w-120 mx-auto mb-12 relative z-1 text-[.95rem] leading-[1.85]">
              Book a free consultation with Marta. Your personalized treatment roadmap starts with a single conversation.
            </p>

            {submitted ? (
              <div className="relative z-1 py-12" role="status" aria-live="polite">
                <p className="text-2xl font-semibold mb-3">Thank you!</p>
                <p className="opacity-80 text-[1rem] leading-[1.7]">
                  We&apos;ll be in touch within 24 hours to confirm your appointment.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-2 max-md:grid-cols-1 gap-4 max-w-140 mx-auto relative z-1 text-left"
                aria-label="Book a free consultation"
              >
                <div>
                  <label htmlFor="booking-name" className="sr-only">Full name</label>
                  <input id="booking-name" name="name" type="text" placeholder="Full name" required autoComplete="name" className={inputBase} />
                </div>
                <div>
                  <label htmlFor="booking-phone" className="sr-only">Phone number</label>
                  <input id="booking-phone" name="phone" type="tel" placeholder="Phone number" required autoComplete="tel" className={inputBase} />
                </div>
                <div className="col-span-full max-md:col-span-1">
                  <label htmlFor="booking-email" className="sr-only">Email address</label>
                  <input id="booking-email" name="email" type="email" placeholder="Email address" required autoComplete="email" className={inputBase} />
                </div>
                <div>
                  <label htmlFor="booking-service" className="sr-only">Select service</label>
                  <select id="booking-service" name="service" required className={`${inputBase} appearance-none cursor-pointer`}>
                    <option value="">Select service</option>
                    {BOOKING_SERVICES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="booking-day" className="sr-only">Preferred day</label>
                  <select id="booking-day" name="preferredDay" required className={`${inputBase} appearance-none cursor-pointer`}>
                    <option value="">Preferred day</option>
                    {BOOKING_DAYS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="col-span-full max-md:col-span-1 bg-gold text-white py-4 px-8 border-none rounded-xl font-sans text-[.95rem] font-bold cursor-pointer transition-all duration-250 hover:bg-gold-dark hover:-translate-y-0.5 mt-3"
                >
                  Book Free Consultation
                </button>
              </form>
            )}

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
