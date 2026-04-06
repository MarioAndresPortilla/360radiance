import Image from 'next/image';
import { BUSINESS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { IconWhatsApp, IconScience } from '@/components/icons/Icons';
import { HeroStats } from './HeroStats';

export function Hero() {
  return (
    <section className="py-24 max-md:py-14 bg-cream" aria-labelledby="hero-heading">
      <div className="container-site">
        <div className="grid grid-cols-[1.1fr_1fr] gap-20 max-lg:gap-12 items-center max-lg:grid-cols-1 max-lg:text-center">
          <div className="max-lg:order-2">
            <div className="inline-flex items-center gap-2.5 bg-white border border-border py-2 px-5 rounded-full text-[.73rem] font-semibold text-teal mb-7 shadow-sm">
              <span className="w-1.5 h-1.5 bg-teal rounded-full" aria-hidden="true" />
              Face Reality Acne Certified
            </div>
            <h1 id="hero-heading" className="font-serif text-[clamp(2.2rem,4.5vw,3.4rem)] leading-[1.12] mb-6">
              Where Science Meets{' '}
              <span className="text-teal relative">
                Beautiful Skin
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gold/40 rounded-full" aria-hidden="true" />
              </span>
            </h1>
            <p className="text-[1.05rem] text-text-mid max-w-115 leading-[1.85] mb-9 max-lg:mx-auto">
              Paramedical skincare backed by 25+ years of medical expertise, European-grade serums, and a proven acne treatment protocol. Real results in as little as 2 weeks.
            </p>
            <div className="flex gap-4 flex-wrap mb-6 max-lg:justify-center max-md:flex-col max-md:items-stretch">
              <Button variant="teal" href="/contact" className="py-4! px-9! text-[.92rem]! rounded-xl! justify-center">
                Book Free Consultation &rarr;
              </Button>
              <Button variant="outline-teal" href="/results" className="py-3.5! px-8! text-[.92rem]! rounded-xl! justify-center">
                See Results
              </Button>
            </div>
            <div className="flex items-center gap-2 text-[.84rem] text-text-light mb-12 max-lg:justify-center">
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

          <div className="relative max-lg:order-1 max-lg:max-w-85 max-lg:mx-auto">
            <div className="w-full aspect-[3/4] rounded-3xl overflow-hidden relative shadow-lg ring-1 ring-black/5">
              <Image
                src="/images/marta-nazzar.jpg"
                alt="Marta Nazzar, Licensed Paramedical Aesthetician at 360 Radiance"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 1024px) 340px, 45vw"
              />
              <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-linear-to-t from-[rgba(26,35,50,.8)] to-transparent z-1" aria-hidden="true" />
              <div className="absolute bottom-7 left-7 z-2 text-white">
                <h3 className="font-serif text-[1.3rem] mb-1.5">Marta Nazzar</h3>
                <p className="text-[.78rem] opacity-90 font-medium tracking-wide">Licensed Paramedical Aesthetician</p>
              </div>
            </div>
            <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-sm rounded-2xl py-3 px-5 shadow-lg z-2 flex items-center gap-2.5 text-[.76rem] font-semibold text-teal">
              <IconScience size={18} className="text-teal" aria-hidden="true" />
              Face Reality Certified
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-gold/10 rounded-3xl -z-1 max-lg:hidden" aria-hidden="true" />
            <div className="absolute -top-3 -left-3 w-16 h-16 bg-teal/8 rounded-2xl -z-1 max-lg:hidden" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
