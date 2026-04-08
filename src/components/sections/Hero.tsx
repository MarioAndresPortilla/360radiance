import { useTranslations } from 'next-intl';
import { BUSINESS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { IconWhatsApp, IconStar } from '@/components/icons/Icons';
import { HeroStats } from './HeroStats';
import { HeroImageRotator } from './HeroImageRotator';

/*
 * Home page hero — contained-card variant.
 *
 * History:
 *   - Original hero: Marta's portrait in a contained portrait card on the right
 *   - Replaced Marta's photo with a rotating before/after gallery (Apr 2026)
 *     because she was already shown twice elsewhere on the page
 *   - Briefly tried an edge-bleed split-screen layout for the gallery, but on
 *     wide monitors (1920+) the right column ended up much wider than the
 *     square images and `object-contain` left huge navy bands on either side.
 *     Reverted (Apr 2026) to a contained card that matches the rest of the
 *     site's image treatment — rounded corners, soft shadow, light ring, no
 *     backdrop dead space.
 *
 * Layout:
 *   - 3-cell grid pattern so mobile flow is intro → image → actions and
 *     desktop is intro top-left, actions bottom-left, image right column
 *     spanning both rows. Same pattern the original Hero used.
 *   - Image card is `aspect-square` (matches the source images at 1:1) so
 *     `object-cover` perfectly fills it with zero cropping.
 *   - Decorative gold + navy accent squares behind the card on desktop for
 *     visual interest, hidden on mobile so they don't crowd the layout.
 */
export function Hero() {
  const t = useTranslations('hero');
  return (
    <section className="bg-white py-16 max-md:py-12" aria-labelledby="hero-heading">
      <div className="container-site">
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

            {/* Above-the-fold social proof. A single short, punchy review
                placed between the description and the CTA buttons. This is
                the highest-impact spot for social proof — visitors see it
                BEFORE they decide to click anything. */}
            <figure className="mt-7 max-w-115 max-lg:mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-0.5" aria-label={t('reviewStarsLabel')}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStar key={i} size={14} className="text-gold" />
                  ))}
                </div>
                <span className="text-[.72rem] font-bold uppercase tracking-[1px] text-navy">{t('reviewBadge')}</span>
              </div>
              <blockquote className="text-[.92rem] text-text leading-[1.65] italic">
                &ldquo;{t('reviewQuote')}&rdquo;
              </blockquote>
              <figcaption className="text-[.72rem] text-text-light mt-1.5 not-italic">
                — {t('reviewAttribution')}
              </figcaption>
            </figure>
          </div>

          {/* 2. Image — mobile: second; desktop: right column spanning both rows */}
          <div className="relative w-full max-w-105 max-lg:mx-auto lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center">
            <div className="w-full aspect-square rounded-3xl overflow-hidden relative shadow-lg ring-1 ring-black/5">
              <HeroImageRotator />
            </div>
            {/* Decorative accent shapes — on-brand visual interest behind the card. */}
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
            <div className="flex items-center gap-2 text-[.84rem] text-text-light mb-10 max-lg:justify-center">
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
