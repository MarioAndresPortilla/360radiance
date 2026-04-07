import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { BUSINESS, TESTIMONIALS } from '@/lib/constants';
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
            <div className="text-center mt-6">
              <a
                href={BUSINESS.googleProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[.82rem] text-navy font-semibold no-underline hover:underline"
              >
                <svg width={16} height={16} viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                {tr('viewOnGoogle')}
              </a>
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
      <section className="py-16 bg-white" aria-labelledby="share-heading">
        <div className="container-site text-center">
          <ScrollReveal>
            <h2 id="share-heading" className="font-serif text-[1.6rem] mb-3">{tr('shareTitle')}</h2>
            <p className="text-text-mid max-w-130 mx-auto text-[.95rem] leading-[1.7] mb-6">
              {tr('shareBody')}
            </p>
            <a
              href={BUSINESS.googleReviewWrite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-navy border-[1.5px] border-navy text-white rounded-lg font-semibold text-[.85rem] px-6 py-3 transition-all hover:bg-navy-deep hover:border-navy-deep no-underline"
            >
              <svg width={18} height={18} viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" opacity=".95" />
                <path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" opacity=".75" />
                <path fill="#fff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" opacity=".55" />
                <path fill="#fff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" opacity=".95" />
              </svg>
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
