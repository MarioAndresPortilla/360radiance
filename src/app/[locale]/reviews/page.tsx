import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { TESTIMONIALS } from '@/lib/constants';
import { buildPageMetadata } from '@/lib/seo';
import { PageShell } from '@/components/layout/PageShell';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { IconStar } from '@/components/icons/Icons';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'testimonials' });
  const tr = await getTranslations({ locale, namespace: 'reviews' });
  return buildPageMetadata({
    locale,
    path: '/reviews',
    title: t('title'),
    description: tr('pageSubtitle'),
  });
}

export default async function ReviewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('testimonials');
  const tr = await getTranslations('reviews');

  return (
    <PageShell>
      <PageHeader
        tag={t('tag')}
        title={t('title')}
        subtitle={tr('pageSubtitle')}
      />

      {/* Rating summary */}
      <section className="bg-white border-b border-border py-10">
        <div className="container-site">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-8 max-md:flex-col max-md:gap-4">
              <div className="text-center">
                <div className="font-serif text-[3rem] text-navy leading-none">5.0</div>
                <div className="flex gap-0.5 justify-center my-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStar key={i} size={18} className="text-gold" aria-hidden="true" />
                  ))}
                </div>
                <div className="text-[.78rem] text-text-mid">{tr('basedOn')}</div>
              </div>
              <div className="w-px h-16 bg-border max-md:hidden" aria-hidden="true" />
              <div className="text-center">
                <div className="font-serif text-[2rem] text-navy">100%</div>
                <div className="text-[.78rem] text-text-mid">{tr('wouldRecommend')}</div>
              </div>
              <div className="w-px h-16 bg-border max-md:hidden" aria-hidden="true" />
              <div className="text-center">
                <div className="font-serif text-[2rem] text-navy">90%+</div>
                <div className="text-[.78rem] text-text-mid">{tr('avgImprovement')}</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* All testimonials */}
      <section className="py-20 max-md:py-14" aria-labelledby="all-reviews-heading">
        <div className="container-site">
          <h2 id="all-reviews-heading" className="sr-only">{tr('allReviews')}</h2>
          <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
            {TESTIMONIALS.map((t) => (
              <ScrollReveal key={t.name}>
                <blockquote className="bg-white border border-border rounded-2xl p-8 transition-all duration-300 hover:shadow-md hover:border-border-hover h-full flex flex-col">
                  <div className="flex gap-0.5 mb-4" aria-label="Rated 5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <IconStar key={j} size={16} className="text-gold" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="text-text-mid text-[.92rem] leading-[1.85] italic mb-6 flex-1">&ldquo;{t.text}&rdquo;</p>
                  <footer className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center text-[.8rem] font-bold text-white shrink-0 ${t.avatarColor}`} aria-hidden="true">
                      {t.initial}
                    </div>
                    <div>
                      <cite className="font-semibold text-[.88rem] not-italic block">{t.name}</cite>
                      <div className="text-[.72rem] text-text-light">{t.condition}</div>
                    </div>
                  </footer>
                </blockquote>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Share your story */}
      <section className="py-16 bg-cream" aria-labelledby="share-heading">
        <div className="container-site text-center">
          <ScrollReveal>
            <h2 id="share-heading" className="font-serif text-[1.6rem] mb-3">{tr('shareTitle')}</h2>
            <p className="text-text-mid max-w-130 mx-auto text-[.95rem] leading-[1.7] mb-6">
              {tr('shareBody')}
            </p>
            <a
              href="https://g.page/r/360radiance/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-transparent border-[1.5px] border-navy text-navy rounded-lg font-semibold text-[.85rem] px-6 py-3 transition-all hover:bg-navy hover:text-white no-underline"
            >
              {tr('leaveReview')}
            </a>
          </ScrollReveal>
        </div>
      </section>

      <CtaBanner
        heading={tr('ctaHeading')}
        subtitle={tr('ctaSubtitle')}
      />
    </PageShell>
  );
}
