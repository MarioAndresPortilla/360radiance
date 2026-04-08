import { useTranslations } from 'next-intl';
import { BUSINESS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { IconWhatsApp, IconStar } from '@/components/icons/Icons';
import { HeroStats } from './HeroStats';
import { HeroImageRotator } from './HeroImageRotator';

/*
 * Home page hero — split-screen full-height variant.
 *
 * Why this layout:
 *   - Marta's portrait used to live in the right column. She's already shown
 *     full-bleed on the About page and again in AboutSection lower on this
 *     same page, so a third surface was redundant. We swap her photo for a
 *     rotating set of real client before/after transformations
 *     (HeroImageRotator) — the strongest emotional pull an aesthetics
 *     business can put above the fold.
 *   - The right column bleeds all the way to the right edge of the viewport
 *     (cinematic, premium feel) while the left conversion column stays
 *     aligned with `container-site` so the badge / headline / review quote
 *     / CTAs / WhatsApp link / stats bar all sit exactly where they did
 *     before. Conversion machinery is preserved; aesthetics improved.
 *   - On mobile (default) the layout collapses to a single column: text
 *     intro → image carousel → CTAs → stats. Same conversion order as the
 *     previous hero.
 *
 * The `.hero-left-pad` utility is defined in globals.css — it computes a
 * left padding that aligns the inner edge of the left column with where
 * `container-site` would otherwise begin (handles the 1140 / 1320 / 1480
 * stepped widths). The right column has no padding so the image goes edge
 * to edge.
 */
export function Hero() {
  const t = useTranslations('hero');
  return (
    <section className="bg-white relative" aria-labelledby="hero-heading">
      <div className="grid lg:grid-cols-2 lg:min-h-[640px] lg:items-stretch max-lg:gap-8 max-lg:py-8">
        {/* LEFT — conversion column. Aligned with container-site on desktop. */}
        <div className="hero-left-pad max-lg:px-[clamp(1rem,4vw,3rem)] lg:pr-12 lg:py-14 flex flex-col justify-center max-lg:text-center">
          <div>
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

            {/* Above-the-fold social proof — see comment in the prior Hero
                version for the full reasoning. Pairs naturally with the
                rotating before/after image to the right: visitor reads the
                quote, then sees an actual transformation. */}
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

            <div className="mt-9">
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

        {/* RIGHT — image rotator. On mobile: constrained square card centered.
            On desktop: stretches to fill the right column, edge-to-edge with
            the viewport. The thin gold left border on desktop is a deliberate
            visual seam — it punctuates the transition from the white
            conversion column to the dark cinematic gallery so the layout
            reads as "intro | proof" rather than a chopped-in-half page. */}
        <div className="relative max-lg:aspect-square max-lg:max-w-105 max-lg:mx-auto max-lg:px-[clamp(1rem,4vw,3rem)] lg:p-0 lg:min-h-[640px] lg:border-l-[2px] lg:border-gold/50">
          <HeroImageRotator />
        </div>
      </div>
    </section>
  );
}
