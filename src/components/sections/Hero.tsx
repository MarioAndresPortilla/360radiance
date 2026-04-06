import { BUSINESS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { IconWhatsApp, IconScience } from '@/components/icons/Icons';
import { HeroStats } from './HeroStats';

export function Hero() {
  return (
    <section className="py-16 bg-cream" aria-labelledby="hero-heading">
      <div className="max-w-300 mx-auto px-8 max-md:px-5">
        <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:text-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white border border-border py-1.5 px-4 rounded-full text-[.72rem] font-semibold text-teal mb-5">
              <span className="w-1.5 h-1.5 bg-teal rounded-full" aria-hidden="true" />
              Face Reality Acne Certified
            </div>
            <h1 id="hero-heading" className="font-serif text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.15] mb-4">
              Where Science Meets <span className="text-teal">Beautiful Skin</span>
            </h1>
            <p className="text-base text-text-mid max-w-120 leading-[1.8] mb-7 max-lg:mx-auto">
              Paramedical skincare backed by 25 years of medical expertise, European-grade serums, and a proven acne treatment protocol. Real results in as little as 2 weeks.
            </p>
            <div className="flex gap-3 flex-wrap mb-4 max-lg:justify-center">
              <Button variant="teal" href="/contact" className="py-3! px-7! text-[.88rem]!">
                Book Free Consultation &rarr;
              </Button>
              <Button variant="outline-teal" href="/results" className="py-2.5! px-6! text-[.88rem]!">
                See Results
              </Button>
            </div>
            <div className="flex items-center gap-1.5 text-[.82rem] text-text-light mb-8 max-lg:justify-center">
              Or message us:{' '}
              <a
                href={BUSINESS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-whatsapp-dark font-semibold no-underline inline-flex items-center gap-1 hover:underline"
                aria-label="Message us on WhatsApp — we reply fast"
              >
                <IconWhatsApp size={16} className="fill-whatsapp" />
                WhatsApp — we reply fast
              </a>
            </div>
            <HeroStats />
          </div>

          <div className="relative max-lg:max-w-95 max-lg:mx-auto">
            <div className="w-full aspect-4/5 rounded-2xl overflow-hidden bg-teal-pale relative shadow-lg" role="img" aria-label="Marta Nazzar, Licensed Paramedical Aesthetician at 360 Radiance">
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-linear-to-br from-teal-pale to-cream">
                <div className="font-serif text-[4.5rem] text-teal opacity-20" aria-hidden="true">MN</div>
                <div className="text-[.68rem] text-text-light tracking-[1px] uppercase">Replace with Marta&apos;s photo</div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-linear-to-t from-[rgba(30,42,56,.7)] to-transparent z-1" aria-hidden="true" />
              <div className="absolute bottom-5 left-5 z-2 text-white">
                <h3 className="font-serif text-xl mb-0.5">Marta Nazzar</h3>
                <p className="text-[.72rem] opacity-85 font-medium">Licensed Paramedical Aesthetician</p>
              </div>
            </div>
            <div className="absolute top-4 right-4 bg-white rounded-xl py-2.5 px-3.5 shadow-md z-2 flex items-center gap-2 text-[.72rem] font-semibold text-teal">
              <IconScience size={18} className="text-teal" aria-hidden="true" />
              Face Reality Certified
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
