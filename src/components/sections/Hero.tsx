import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { BUSINESS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { IconWhatsApp, IconScience } from '@/components/icons/Icons';
import { HeroStats } from './HeroStats';

export function Hero() {
  const t = useTranslations('hero');
  return (
    <section className="py-24 max-md:py-12 bg-cream" aria-labelledby="hero-heading">
      <div className="container-site">
        {/*
          Mobile flow (default, single column): intro → image → actions.
          The intro (badge + headline + description) lands above the photo so
          users grasp the value prop before seeing a face. CTAs + stats follow
          the photo since visual trust primes conversion.

          Desktop flow (lg+): the image moves into a right-hand column that
          spans both rows; intro sits top-left, actions sit bottom-left.
          Visually equivalent to the original 2-col layout.
        */}
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-x-20 lg:gap-y-0 lg:items-center max-lg:text-center">
          {/* 1. Intro — mobile: first; desktop: top-left */}
          <div className="lg:col-start-1 lg:row-start-1">
            <div className="inline-flex items-center gap-2.5 bg-white border border-border py-2 px-5 rounded-full text-[.73rem] max-md:text-[.68rem] font-semibold text-navy mb-7 max-md:mb-5 shadow-sm whitespace-nowrap">
              <span className="w-1.5 h-1.5 bg-navy rounded-full shrink-0" aria-hidden="true" />
              {t('badge')}
            </div>
            <h1 id="hero-heading" className="font-serif text-[clamp(2.2rem,4.5vw,3.4rem)] leading-[1.12] mb-6">
              {t('headline1')}{' '}
              <span className="text-navy relative">
                {t('headline2')}
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gold/40 rounded-full" aria-hidden="true" />
              </span>
            </h1>
            <p className="text-[1.05rem] text-text-mid max-w-115 leading-[1.85] max-lg:mx-auto">
              {t('description')}
            </p>
          </div>

          {/* 2. Image — mobile: second; desktop: right column spanning both rows */}
          <div className="relative w-full max-lg:max-w-80 max-lg:mx-auto lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center">
            <div className="w-full aspect-[3/4] rounded-3xl overflow-hidden relative shadow-lg ring-1 ring-black/5">
              <Image
                src="/images/marta-nazzar.jpg"
                alt="Marta Nazzar, Licensed Paramedical Aesthetician at 360 Radiance"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 1024px) 320px, 45vw"
              />
              <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-linear-to-t from-[rgba(26,35,50,.8)] to-transparent z-1" aria-hidden="true" />
              <div className="absolute bottom-7 left-7 right-7 z-2 text-white text-left">
                <h3 className="font-serif text-[1.3rem] mb-1.5">{t('photoTitle')}</h3>
                <p className="text-[.78rem] opacity-90 font-medium tracking-wide">{t('photoSubtitle')}</p>
              </div>
            </div>
            <div className="absolute top-5 right-5 max-md:top-3 max-md:right-3 bg-white/95 backdrop-blur-sm rounded-2xl py-3 px-5 max-md:py-2 max-md:px-3.5 shadow-lg z-2 inline-flex items-center gap-2.5 max-md:gap-1.5 text-[.76rem] max-md:text-[.65rem] font-semibold text-navy whitespace-nowrap">
              <IconScience size={16} className="text-navy shrink-0" aria-hidden="true" />
              {t('certBadge')}
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-gold/10 rounded-3xl -z-1 max-lg:hidden" aria-hidden="true" />
            <div className="absolute -top-3 -left-3 w-16 h-16 bg-navy/8 rounded-2xl -z-1 max-lg:hidden" aria-hidden="true" />
          </div>

          {/* 3. Actions — mobile: third; desktop: bottom-left */}
          <div className="lg:col-start-1 lg:row-start-2 lg:mt-9">
            <div className="flex gap-4 flex-wrap mb-6 max-lg:justify-center max-md:flex-col max-md:items-stretch">
              <Button variant="navy" href="/contact" className="py-4! px-9! text-[.92rem]! rounded-xl! justify-center">
                {t('ctaPrimary')}
              </Button>
              <Button variant="outline-navy" href="/results" className="py-3.5! px-8! text-[.92rem]! rounded-xl! justify-center">
                {t('ctaSecondary')}
              </Button>
            </div>
            <div className="flex items-center gap-2 text-[.84rem] text-text-light mb-12 max-lg:justify-center">
              {t('messageUs')}{' '}
              <a
                href={BUSINESS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-whatsapp-dark font-semibold no-underline inline-flex items-center gap-1.5 hover:underline"
                aria-label={t('whatsappLink')}
              >
                <IconWhatsApp size={16} className="fill-whatsapp" />
                {t('whatsappLink')}
              </a>
            </div>
            <HeroStats />
          </div>
        </div>
      </div>
    </section>
  );
}
