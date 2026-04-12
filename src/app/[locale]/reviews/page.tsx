import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { BUSINESS } from '@/lib/constants';
import { getGoogleReviews, hasGoogleReviews, type GoogleReview } from '@/lib/google-reviews';
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

const GoogleG = ({ size = 16, mono = false }: { size?: number; mono?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path fill={mono ? '#fff' : '#4285F4'} d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" opacity={mono ? 0.95 : 1} />
    <path fill={mono ? '#fff' : '#34A853'} d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" opacity={mono ? 0.75 : 1} />
    <path fill={mono ? '#fff' : '#FBBC05'} d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" opacity={mono ? 0.55 : 1} />
    <path fill={mono ? '#fff' : '#EA4335'} d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" opacity={mono ? 0.95 : 1} />
  </svg>
);

function GoogleReviewCard({ review }: { review: GoogleReview }) {
  const filledStars = Math.round(review.rating);
  return (
    <blockquote className="bg-white border border-border rounded-2xl p-8 transition-all duration-300 hover:shadow-md hover:border-navy/20 hover:-translate-y-0.5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-0.5" aria-label={`Rated ${review.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, j) => (
            <IconStar
              key={j}
              size={16}
              className={j < filledStars ? 'text-gold' : 'text-border'}
              aria-hidden="true"
            />
          ))}
        </div>
        <span className="inline-flex items-center gap-1 text-[.62rem] font-bold uppercase tracking-[1px] text-text-light">
          <GoogleG size={11} />
          Google
        </span>
      </div>
      <p className="text-text-mid text-[.92rem] leading-[1.85] italic mb-6 flex-1">&ldquo;{review.text}&rdquo;</p>
      <footer className="flex items-center gap-3">
        {review.authorPhotoUrl ? (
          <Image
            src={review.authorPhotoUrl}
            alt=""
            width={44}
            height={44}
            unoptimized
            className="w-11 h-11 rounded-full object-cover shrink-0"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-navy flex items-center justify-center text-[.8rem] font-bold text-white shrink-0" aria-hidden="true">
            {review.authorName.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <cite className="font-semibold text-[.88rem] not-italic block">{review.authorName}</cite>
          {review.relativeTime && (
            <div className="text-[.72rem] text-text-light">{review.relativeTime}</div>
          )}
        </div>
      </footer>
    </blockquote>
  );
}

export default async function ReviewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('testimonials');
  const tr = await getTranslations('reviews');

  const googleReviews = await getGoogleReviews();
  const showGoogleSection = hasGoogleReviews(googleReviews);
  // Numbers come straight from the live Places API. If the API is
  // unavailable both fields will be null and the rating summary block
  // hides — we no longer ship a hand-tracked baseline since Marta
  // wanted only authentic Google data on the site.
  const displayRating = googleReviews.rating?.toFixed(1) ?? null;
  const displayCount = googleReviews.totalReviews ?? null;
  const showRatingSummary = displayRating !== null;

  return (
    <PageShell>
      <PageHeader
        tag={t('tag')}
        title={t('title')}
        subtitle={tr('pageSubtitle')}
      />

      {/* Rating summary — only renders when the live Places API returned a
          numeric rating. Without that we'd be showing a fake star count. */}
      {showRatingSummary && (
        <section className="bg-white border-b border-border py-10">
          <div className="container-site">
            <ScrollReveal>
              <div className="flex items-center justify-center gap-8 max-md:flex-col max-md:gap-4">
                <div className="text-center">
                  <div className="font-serif text-[3rem] text-navy leading-none">{displayRating}</div>
                  <div className="flex gap-0.5 justify-center my-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <IconStar key={i} size={18} className="text-gold" aria-hidden="true" />
                    ))}
                  </div>
                  <div className="text-[.78rem] text-text-mid">
                    {displayCount !== null ? tr('basedOnCount', { count: displayCount }) : tr('basedOn')}
                  </div>
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
                  <GoogleG size={16} />
                  {tr('viewOnGoogle')}
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Live Google reviews — the only review section on this page now.
          Hidden when the Places API returns nothing so we never render an
          empty grid. The "share your story" section below still drives
          visitors to write a new review even when this section is hidden. */}
      {showGoogleSection && (
        <section className="py-20 max-md:py-14 bg-white" aria-labelledby="google-reviews-heading">
          <div className="container-site">
            <ScrollReveal>
              <div className="text-center mb-10">
                <span className="inline-flex items-center gap-2 text-[.68rem] font-bold uppercase tracking-[2px] text-navy mb-3 bg-navy-pale px-4 py-1.5 rounded-full">
                  <GoogleG size={12} />
                  {tr('googleVerifiedTag')}
                </span>
                <h2 id="google-reviews-heading" className="font-serif text-[clamp(1.4rem,2.5vw,1.9rem)] mb-2.5">{tr('googleHeading')}</h2>
                <p className="text-text-mid max-w-130 mx-auto text-[.9rem] leading-[1.7]">{tr('googleSubtitle')}</p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              {googleReviews.reviews.map((review, i) => (
                <ScrollReveal key={`${review.authorName}-${i}`}>
                  <GoogleReviewCard review={review} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

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
              <GoogleG size={18} mono />
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
