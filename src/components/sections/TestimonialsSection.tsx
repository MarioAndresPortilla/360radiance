import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { BUSINESS } from '@/lib/constants';
import { getGoogleReviews, hasGoogleReviews, type GoogleReview } from '@/lib/google-reviews';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { IconStar } from '@/components/icons/Icons';

const GoogleG = ({ size = 16, mono = false }: { size?: number; mono?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path fill={mono ? '#fff' : '#4285F4'} d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" opacity={mono ? 0.95 : 1} />
    <path fill={mono ? '#fff' : '#34A853'} d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" opacity={mono ? 0.75 : 1} />
    <path fill={mono ? '#fff' : '#FBBC05'} d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" opacity={mono ? 0.55 : 1} />
    <path fill={mono ? '#fff' : '#EA4335'} d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" opacity={mono ? 0.95 : 1} />
  </svg>
);

function GoogleReviewMiniCard({ review }: { review: GoogleReview }) {
  const filledStars = Math.round(review.rating);
  return (
    <blockquote className="bg-white border border-border rounded-2xl p-7 max-md:p-5 transition-all duration-300 hover:shadow-lg hover:border-navy hover:-translate-y-0.5 h-full flex flex-col" role="listitem">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1" aria-label={`Rated ${review.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <IconStar
              key={i}
              size={14}
              className={i < filledStars ? 'text-gold' : 'text-border'}
              aria-hidden="true"
            />
          ))}
        </div>
        <span className="inline-flex items-center gap-1 text-[.6rem] font-bold uppercase tracking-[1px] text-text-light">
          <GoogleG size={11} />
          Google
        </span>
      </div>
      <p className="text-text-mid text-[.88rem] leading-[1.8] italic mb-6 flex-1">&ldquo;{review.text}&rdquo;</p>
      <footer className="flex items-center gap-3">
        {review.authorPhotoUrl ? (
          <Image
            src={review.authorPhotoUrl}
            alt=""
            aria-hidden="true"
            width={40}
            height={40}
            unoptimized
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-[.72rem] font-bold text-white shrink-0" aria-hidden="true">
            {review.authorName.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <cite className="font-semibold text-[.85rem] not-italic">{review.authorName}</cite>
          {review.relativeTime && (
            <div className="text-[.72rem] text-text-light mt-0.5">{review.relativeTime}</div>
          )}
        </div>
      </footer>
    </blockquote>
  );
}

export async function TestimonialsSection() {
  const t = await getTranslations('testimonials');
  const googleReviews = await getGoogleReviews();

  // Live Google reviews are now the only source of truth. If the Places API
  // returns nothing (missing creds, rate limit, transient failure) we hide
  // the entire section rather than fall back to hand-curated quotes — Marta
  // explicitly wanted only authentic, verifiable reviews on the site.
  if (!hasGoogleReviews(googleReviews)) return null;

  const featured = googleReviews.reviews.slice(0, 3);

  return (
    <section className="py-14 max-md:py-10 bg-cream" id="reviews" aria-labelledby="reviews-heading">
      <div className="container-site">
        <ScrollReveal>
          <SectionHeader id="reviews-heading" tag={t('tag')} title={t('title')} />
        </ScrollReveal>
        <div className="grid grid-cols-3 gap-7 max-lg:grid-cols-2 max-lg:gap-6 max-md:grid-cols-1 max-md:gap-5" role="list">
          {featured.map((review, i) => (
            <ScrollReveal key={`${review.authorName}-${i}`}>
              <GoogleReviewMiniCard review={review} />
            </ScrollReveal>
          ))}
        </div>
        <div className="text-center mt-10 flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-1.5 bg-transparent border-[1.5px] border-navy text-navy rounded-xl font-semibold text-[.88rem] px-7 py-3 transition-all hover:bg-navy hover:text-white no-underline"
          >
            {t('readAll')}
          </Link>
          <a
            href={BUSINESS.googleReviewWrite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-navy text-white rounded-xl font-semibold text-[.88rem] px-7 py-3 transition-all hover:bg-navy-deep no-underline"
          >
            <GoogleG size={16} mono />
            {t('leaveGoogleReview')}
          </a>
        </div>
      </div>
    </section>
  );
}
