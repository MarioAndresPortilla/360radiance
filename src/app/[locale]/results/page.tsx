import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { JOURNEY_STEPS } from '@/lib/constants';
import { buildPageMetadata } from '@/lib/seo';
import { PageShell } from '@/components/layout/PageShell';
import { CtaBanner } from '@/components/ui/CtaBanner';
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
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative bg-navy overflow-hidden py-24 max-md:py-16">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/[.04]" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="absolute top-1/2 -left-24 w-80 h-80 rounded-full bg-gold/[.04]" />
        </div>

        <div className="container-site relative z-1 text-center">
          <ScrollReveal>
            <span className="inline-block text-[.65rem] font-bold uppercase tracking-[2.5px] text-gold mb-5 bg-white/8 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
              {t('tag')}
            </span>
            <h1 className="font-serif text-white text-[clamp(2.2rem,4.5vw,3.4rem)] leading-[1.12] mb-5">
              {t('title')}
            </h1>
            <p className="text-white/80 text-[1.02rem] leading-[1.8] max-w-130 mx-auto">
              {t('pageSubtitle')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Stats — floating cards ───────────────────────────────── */}
      <section className="relative z-10 -mt-8 max-md:-mt-6 mb-4">
        <div className="container-site">
          <ScrollReveal>
            <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2">
              {STATS.map((stat, idx) => (
                <div
                  key={stat.label}
                  className={`rounded-2xl p-5 text-center shadow-lg ring-1 ring-black/[.06] transition-all hover:-translate-y-0.5 hover:shadow-xl ${
                    idx === 0 ? 'bg-navy text-white' : 'bg-white'
                  }`}
                >
                  <div className={`font-serif text-[1.8rem] max-md:text-[1.4rem] leading-tight ${
                    idx === 0 ? 'text-gold' : 'text-navy'
                  }`}>
                    {stat.value}
                  </div>
                  <div className={`text-[.72rem] font-semibold uppercase tracking-[.5px] mt-1.5 leading-[1.4] ${
                    idx === 0 ? 'text-white/70' : 'text-text-mid'
                  }`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Journey timeline ─────────────────────────────────────── */}
      <section className="py-16 max-md:py-12 bg-white" aria-labelledby="timeline-heading">
        <div className="container-site">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 id="timeline-heading" className="font-serif text-[clamp(1.5rem,3vw,2.2rem)] mb-2">{t('timelineHeading')}</h2>
              <p className="text-text-mid max-w-130 mx-auto text-[.92rem] leading-[1.7]">
                {t('timelineSubtitle')}
              </p>
            </div>
          </ScrollReveal>
          <div className="max-w-200 mx-auto">
            {JOURNEY_STEPS.map((step, i) => (
              <ScrollReveal key={step.number}>
                <div className="grid grid-cols-[72px_1fr] gap-6 max-md:gap-4 mb-8 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-navy flex items-center justify-center shadow-md">
                      <span className="font-serif text-[1.3rem] text-gold leading-none">{step.number}</span>
                    </div>
                    <div className="text-[.58rem] font-bold uppercase tracking-[1px] text-gold-a11y mt-1.5 text-center">{step.weekLabel}</div>
                    {i < JOURNEY_STEPS.length - 1 && (
                      <div className="w-px flex-1 bg-gradient-to-b from-navy/20 to-transparent mt-2" aria-hidden="true" />
                    )}
                  </div>
                  <div className="bg-cream rounded-2xl p-5 border border-border hover:shadow-md transition-shadow">
                    <h3 className="font-serif text-[1.05rem] mb-1.5">{step.title}</h3>
                    <p className="text-text-mid text-[.85rem] leading-[1.7] mb-3">{step.description}</p>
                    <ProgressBar targetWidth={step.progress} />
                    <div className="text-[.68rem] text-text-light mt-1.5 text-right font-medium">{step.progress}% progress</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Before & After ───────────────────────────────────────── */}
      <section className="py-16 max-md:py-12 bg-cream" aria-labelledby="before-after-heading">
        <div className="container-site">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="inline-block text-[.65rem] font-bold uppercase tracking-[2px] text-navy mb-3 bg-navy-pale px-4 py-1.5 rounded-full">
                {t('beforeAfterTag')}
              </span>
              <h2 id="before-after-heading" className="font-serif text-[clamp(1.5rem,3vw,2.2rem)] mb-2">{t('beforeAfterTitle')}</h2>
              <p className="text-text-mid max-w-130 mx-auto text-[.92rem] leading-[1.7]">
                {t('beforeAfterSubtitle')}
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1 max-w-260 mx-auto">
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
                <div className="group rounded-2xl overflow-hidden shadow-md border border-border bg-white transition-all hover:-translate-y-1 hover:shadow-xl h-full flex flex-col">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <span className="text-[.68rem] font-bold uppercase tracking-[1px] text-text-light">{t('beforeAfterLabel')}</span>
                    <span className="text-[.65rem] font-semibold text-navy bg-navy-pale py-1 px-2.5 rounded-md">{item.label}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── What to expect ───────────────────────────────────────── */}
      <section className="py-16 max-md:py-12 bg-white" aria-labelledby="expect-heading">
        <div className="container-site">
          <ScrollReveal>
            <div className="grid grid-cols-[1.2fr_1fr] gap-12 items-center max-lg:grid-cols-1 max-lg:gap-8">
              <div>
                <h2 id="expect-heading" className="font-serif text-[1.8rem] mb-3 leading-[1.2]">{t('expectHeading')}</h2>
                <p className="text-text-mid mb-5 text-[.9rem]/[1.8]">
                  {t('expectBody')}
                </p>
                <ul className="flex flex-col gap-2.5 list-none">
                  {[
                    t('expect.item1'),
                    t('expect.item2'),
                    t('expect.item3'),
                    t('expect.item4'),
                    t('expect.item5'),
                    t('expect.item6'),
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[.85rem] text-text-mid">
                      <span className="w-5 h-5 rounded-md bg-navy-pale flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                        <IconCheck size={11} className="text-navy" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-navy to-navy-deep rounded-2xl p-8 max-md:p-6 text-center text-white relative overflow-hidden">
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gold/[.08]" aria-hidden="true" />
                <div className="relative z-1">
                  <div className="font-serif text-[3rem] text-gold mb-1.5">90%+</div>
                  <div className="text-[.82rem] text-white/70 mb-5">{t('avgImprovementCaption')}</div>
                  <p className="text-white/80 text-[.88rem] leading-[1.7] italic">
                    {t('quote')}
                  </p>
                  <div className="mt-3 text-[.75rem] font-semibold text-gold">{t('quoteAttribution')}</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Read all reviews CTA ─────────────────────────────────── */}
      <section className="py-14 max-md:py-10 bg-cream" aria-labelledby="stories-heading">
        <div className="container-site">
          <ScrollReveal>
            <div className="text-center">
              <h2 id="stories-heading" className="font-serif text-[clamp(1.4rem,3vw,2rem)] mb-2">{t('stories')}</h2>
              <p className="text-text-mid max-w-130 mx-auto text-[.92rem] leading-[1.7] mb-6">
                {t('storiesSubtitle')}
              </p>
              <Link href="/reviews" className="inline-flex items-center gap-1.5 bg-navy text-white rounded-xl font-semibold text-[.85rem] px-7 py-3.5 transition-all hover:bg-navy-deep hover:-translate-y-px hover:shadow-md no-underline">
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
