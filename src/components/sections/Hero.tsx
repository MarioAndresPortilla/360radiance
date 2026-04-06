import Image from 'next/image';
import { BUSINESS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { IconWhatsApp, IconScience } from '@/components/icons/Icons';
import { HeroStats } from './HeroStats';

export function Hero() {
  return (
    <section className="py-20 max-md:py-12 bg-cream" aria-labelledby="hero-heading">
      <div className="max-w-300 mx-auto px-8 max-md:px-5">
        <div className="grid grid-cols-2 gap-16 max-lg:gap-10 items-center max-lg:grid-cols-1 max-lg:text-center">
          <div>
            <div className="inline-flex items-center gap-2.5 bg-white border border-border py-2 px-5 rounded-full text-[.72rem] font-semibold text-teal mb-6">
              <span className="w-1.5 h-1.5 bg-teal rounded-full" aria-hidden="true" />
              Face Reality Acne Certified
            </div>
            <h1 id="hero-heading" className="font-serif text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.15] mb-5">
              Where Science Meets <span className="text-teal">Beautiful Skin</span>
            </h1>
            <p className="text-base text-text-mid max-w-120 leading-[1.8] mb-8 max-lg:mx-auto">
              Paramedical skincare backed by 25+ years of medical expertise, European-grade serums, and a proven acne treatment protocol. Real results in as little as 2 weeks.
            </p>
            <div className="flex gap-4 flex-wrap mb-5 max-lg:justify-center max-md:flex-col max-md:items-center">
              <Button variant="teal" href="/contact" className="py-3.5! px-8! text-[.9rem]!">
                Book Free Consultation &rarr;
              </Button>
              <Button variant="outline-teal" href="/results" className="py-3! px-7! text-[.9rem]!">
                See Results
              </Button>
            </div>
            <div className="flex items-center gap-2 text-[.82rem] text-text-light mb-10 max-lg:justify-center">
              Or message us:{' '}
              <a
                href={BUSINESS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-whatsapp-dark font-semibold no-underline inline-flex items-center gap-1.5 hover:underline"
                aria-label="Message us on WhatsApp — we reply fast"
              >
                <IconWhatsApp size={16} className="fill-whatsapp" />
                WhatsApp — we reply fast
              </a>
            </div>
            <HeroStats />
          </div>

          <div className="relative max-lg:max-w-95 max-lg:mx-auto">
            <div className="w-full aspect-4/5 rounded-2xl overflow-hidden relative shadow-lg">
              <Image
                src="/images/marta-nazzar.jpg"
                alt="Marta Nazzar, Licensed Paramedical Aesthetician at 360 Radiance"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 1024px) 380px, 50vw"
              />
              <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-linear-to-t from-[rgba(30,42,56,.75)] to-transparent z-1" aria-hidden="true" />
              <div className="absolute bottom-6 left-6 z-2 text-white">
                <h3 className="font-serif text-xl mb-1">Marta Nazzar</h3>
                <p className="text-[.75rem] opacity-90 font-medium">Licensed Paramedical Aesthetician</p>
              </div>
            </div>
            <div className="absolute top-4 right-4 bg-white rounded-xl py-2.5 px-4 shadow-md z-2 flex items-center gap-2.5 text-[.75rem] font-semibold text-teal">
              <IconScience size={18} className="text-teal" aria-hidden="true" />
              Face Reality Certified
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
