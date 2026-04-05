'use client';

import { useState } from 'react';
import { BUSINESS, BOOKING_SERVICES, BOOKING_DAYS } from '@/lib/constants';
import { IconPhone, IconWhatsApp } from '@/components/icons/Icons';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const inputBase = 'py-3 px-4 border-none rounded-lg font-sans text-[.85rem] outline-none bg-white text-text focus:ring-2 focus:ring-white/40';

export function BookingSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="py-20 max-md:py-14" id="booking" aria-labelledby="booking-heading">
      <div className="max-w-300 mx-auto px-8 max-md:px-5">
        <ScrollReveal>
          <div className="bg-teal rounded-2xl p-16 max-md:p-10 max-md:px-6 text-center text-white relative overflow-hidden">
            <div className="absolute -top-[60%] -right-[15%] w-100 h-100 rounded-full bg-white/4" aria-hidden="true" />
            <h2 id="booking-heading" className="font-serif text-[2rem] mb-2.5 relative z-1">
              Ready for Clear, Radiant Skin?
            </h2>
            <p className="opacity-80 max-w-112.5 mx-auto mb-8 relative z-1 text-[.95rem] leading-[1.7]">
              Book a free consultation with Marta. Your personalized treatment roadmap starts with a single conversation.
            </p>

            {submitted ? (
              <div className="relative z-1 py-8" role="status" aria-live="polite">
                <p className="text-xl font-semibold mb-2">Thank you!</p>
                <p className="opacity-80 text-[.95rem]">
                  We&apos;ll be in touch within 24 hours to confirm your appointment.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-2 max-md:grid-cols-1 gap-3 max-w-150 mx-auto relative z-1 text-left"
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
                  <input id="booking-email" name="email" type="email" placeholder="Email address" required autoComplete="email" className={`${inputBase} w-full`} />
                </div>
                <div>
                  <label htmlFor="booking-service" className="sr-only">Select service</label>
                  <select id="booking-service" name="service" required className={`${inputBase} w-full appearance-none cursor-pointer`}>
                    <option value="">Select service</option>
                    {BOOKING_SERVICES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="booking-day" className="sr-only">Preferred day</label>
                  <select id="booking-day" name="preferredDay" required className={`${inputBase} w-full appearance-none cursor-pointer`}>
                    <option value="">Preferred day</option>
                    {BOOKING_DAYS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="col-span-full max-md:col-span-1 bg-gold text-white py-3 px-8 border-none rounded-lg font-sans text-[.92rem] font-bold cursor-pointer transition-all duration-250 hover:bg-gold-dark hover:-translate-y-0.5"
                >
                  Book Free Consultation
                </button>
              </form>
            )}

            <div className="mt-6 flex justify-center gap-6 relative z-1 flex-wrap">
              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                className="text-white/80 text-[.82rem] no-underline flex items-center gap-1 hover:text-white transition-colors"
                aria-label={`Call us at ${BUSINESS.phone}`}
              >
                <IconPhone size={16} className="text-current" />
                {BUSINESS.phone}
              </a>
              <a
                href={BUSINESS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 text-[.82rem] no-underline flex items-center gap-1 hover:text-white transition-colors"
                aria-label="Chat with us on WhatsApp"
              >
                <IconWhatsApp size={16} className="fill-current" />
                WhatsApp
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
