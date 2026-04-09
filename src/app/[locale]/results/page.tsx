import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { JOURNEY_STEPS } from '@/lib/constants';
import { buildPageMetadata } from '@/lib/seo';
import { PageShell } from '@/components/layout/PageShell';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { IconCheck } from '@/components/icons/Icons';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'results' });
  return buildPageMetadata({
    locale,
    path: '/results',
    title: locale === 'es' ? 'Resultados' : 'Results',
    description: t('pageSubtitle'),
  });
}

export default async function ResultsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('results');

  const STATS = [
    { value: '90%+', label: t('stats.improvement') },
    { value: t('stats.weeksValue'), label: t('stats.weeks') },
    { value: t('stats.visitsValue'), label: t('stats.visits') },
    { value: '25+', label: t('stats.years') },
  ];

  return (
    <PageShell>
      <PageHeader
        tag={t('tag')}
        title={t('title')}
        subtitle={t('pageSubtitle')}
      />

      {/* Stats bar */}
      <section className="bg-white border-b border-border py-10">
        <div className="container-site">
          <div className="grid grid-cols-4 gap-8 max-md:grid-cols-2 max-md:gap-6">
            {STATS.map((stat) => (
              <ScrollReveal key={stat.label}>
                <div className="text-center">
                  <div className="font-serif text-[2rem] text-navy mb-1">{stat.value}</div>
                  <div className="text-[.78rem] text-text-mid leading-[1.5]">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Journey timeline */}
      <section className="py-20 max-md:py-14" aria-labelledby="timeline-heading">
        <div className="container-site">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 id="timeline-heading" className="font-serif text-[clamp(1.6rem,3vw,2.3rem)] mb-2.5">{t('timelineHeading')}</h2>
              <p className="text-text-mid max-w-130 mx-auto text-[.95rem] leading-[1.7]">
                {t('timelineSubtitle')}
              </p>
            </div>
          </ScrollReveal>
          <div className="max-w-200 mx-auto">
            {JOURNEY_STEPS.map((step, i) => (
              <ScrollReveal key={step.number}>
                <div className="grid grid-cols-[80px_1fr] gap-8 max-md:gap-4 mb-12 last:mb-0">
                  <div className="text-center">
                    <div className="font-serif text-[2.5rem] text-navy leading-none">{step.number}</div>
                    <div className="text-[.6rem] font-bold uppercase tracking-[1.5px] text-gold-a11y mt-1">{step.weekLabel}</div>
                  </div>
                  <div className="bg-cream rounded-2xl p-6">
                    <h3 className="font-serif text-[1.1rem] mb-2">{step.title}</h3>
                    <p className="text-text-mid text-[.88rem] leading-[1.7] mb-3">{step.description}</p>
                    <ProgressBar targetWidth={step.progress} />
                    <div className="text-[.72rem] text-text-light mt-2 text-right">{step.progress}% progress</div>
                  </div>
                  {i < JOURNEY_STEPS.length - 1 && (
                    <div className="col-start-1 flex justify-center" aria-hidden="true">
                      <div className="w-px h-6 bg-border" />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After */}
      <section className="py-20 max-md:py-14 bg-white" aria-labelledby="before-after-heading">
        <div className="container-site">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block text-[.68rem] font-bold uppercase tracking-[2px] text-navy mb-3 bg-navy-pale px-4 py-1.5 rounded-full">
                {t('beforeAfterTag')}
              </span>
              <h2 id="before-after-heading" className="font-serif text-[clamp(1.6rem,3vw,2.3rem)] mb-3">{t('beforeAfterTitle')}</h2>
              <p className="text-text-mid max-w-130 mx-auto text-[.95rem] leading-[1.7]">
                {t('beforeAfterSubtitle')}
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1 max-w-260 mx-auto">
            {[
              {
                src: '/images/instagram/before-after-acne-1.webp',
                alt: 'Client before and after acne treatment — clearer skin and a confident smile after the 12-week program',
                label: t('acneTreatmentLabel'),
              },
              {
                src: '/images/instagram/before-after-rosacea-2.webp',
                alt: 'Client before and after rosacea treatment — calmed redness and even skin tone',
                label: t('rosaceaLabel'),
              },
              {
                src: '/images/instagram/before-after-melasma.webp',
                alt: 'Client before and after melasma and hyperpigmentation treatment — even, brighter skin tone',
                label: t('melasmaLabel'),
              },
              {
                src: '/images/instagram/before-after-acne-2.webp',
                alt: 'Client before and after the 12-week Acne Treatment Program — dramatic clearing of persistent acne',
                label: t('twelveWeekLabel'),
              },
              {
                src: '/images/instagram/before-after-aging.webp',
                alt: 'Client before and after anti-aging facial treatment — firmer, more lifted appearance',
                label: t('antiAgingLabel'),
              },
              {
                src: '/images/instagram/before-after-eye-area.webp',
                alt: 'Client before and after eye area treatment — reduced fine lines and brighter under-eye',
                label: t('eyeAreaLabel'),
              },
            ].map((item) => (
              <ScrollReveal key={item.src}>
                <div className="rounded-2xl overflow-hidden shadow-md border border-border h-full flex flex-col">
                  <div className="relative aspect-square">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5 bg-white">
                    <div className="flex justify-between items-center">
                      <span className="text-[.72rem] font-bold uppercase tracking-[1px] text-text-light">{t('beforeAfterLabel')}</span>
                      <span className="text-[.68rem] font-semibold text-navy bg-navy-pale py-1 px-2.5 rounded-md">{item.label}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="py-16 bg-white" aria-labelledby="expect-heading">
        <div className="container-site">
          <ScrollReveal>
            <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1">
              <div>
                <h2 id="expect-heading" className="font-serif text-[1.9rem] mb-4 leading-[1.2]">{t('expectHeading')}</h2>
                <p className="text-text-mid mb-6 text-[.92rem]/[1.85]">
                  {t('expectBody')}
                </p>
                <ul className="flex flex-col gap-3 list-none">
                  {[
                    t('expect.item1'),
                    t('expect.item2'),
                    t('expect.item3'),
                    t('expect.item4'),
                    t('expect.item5'),
                    t('expect.item6'),
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[.88rem] text-text-mid">
                      <span className="w-5 h-5 rounded-md bg-navy-pale flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                        <IconCheck size={12} className="text-navy" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-navy-pale rounded-2xl p-10 text-center">
                <div className="font-serif text-[3rem] text-navy mb-2">90%+</div>
                <div className="text-[.85rem] text-text-mid mb-6">{t('avgImprovementCaption')}</div>
                <p className="text-text-mid text-[.88rem] leading-[1.7] italic">
                  {t('quote')}
                </p>
                <div className="mt-4 text-[.78rem] font-semibold text-navy">{t('quoteAttribution')}</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Read all reviews CTA — the previous "Featured testimonials" grid
          rendered hand-curated quotes from constants.ts. Removed when we
          consolidated review content to live Google reviews only; the
          /reviews page is now the single canonical place for testimonials,
          and this CTA points visitors there. */}
      <section className="py-20 max-md:py-14" aria-labelledby="stories-heading">
        <div className="container-site">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h2 id="stories-heading" className="font-serif text-[clamp(1.6rem,3vw,2.3rem)] mb-2.5">{t('stories')}</h2>
              <p className="text-text-mid max-w-130 mx-auto text-[.95rem] leading-[1.7]">
                {t('storiesSubtitle')}
              </p>
            </div>
            <div className="text-center">
              <Link href="/reviews" className="inline-flex items-center gap-1.5 bg-transparent border-[1.5px] border-navy text-navy rounded-lg font-semibold text-[.85rem] px-6 py-3 transition-all hover:bg-navy hover:text-white no-underline">
                {t('readAllReviews')}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CtaBanner
        heading={t('ctaHeading')}
        subtitle={t('ctaSubtitle')}
      />
    </PageShell>
  );
}
