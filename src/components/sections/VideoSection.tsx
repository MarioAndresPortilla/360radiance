'use client';

/*
 * VideoSection — short treatment / behind-the-scenes clips on the landing page.
 *
 * Placement (highest ROI per landing-page funnel research):
 *   …JourneySection → **VideoSection** → TestimonialsSection → InstagramSection…
 * Why here: by this point a visitor has seen the offer (Services), met Marta
 * (About), and learned what the program looks like (Journey). They're in the
 * "show me it's real" mindset — short treatment clips close that gap right
 * before they hit the social-proof wall (Testimonials + Google reviews +
 * Instagram). This sequence tested better than putting videos in the hero
 * (where autoplay competes with the headline) or after testimonials (where
 * they feel like an afterthought).
 *
 * Pattern: horizontal Apple-style scroll strip on desktop, single-column
 * stack on mobile (horizontal scrolling on phones fights the page scroll
 * gesture). Each card is a button that opens a lightbox with the actual
 * <video> element. The cards themselves only show the poster image, so the
 * page-load cost is zero video bytes until the user clicks.
 *
 * No render when VIDEOS is empty — the section disappears entirely until
 * Marta has clips ready (see src/lib/constants.ts:VIDEOS).
 */

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { VIDEOS, type VideoClip } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function VideoSection() {
  const t = useTranslations('videos');
  const [openVideo, setOpenVideo] = useState<VideoClip | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Lock body scroll while the lightbox is open and restore on close. Also
  // wires Escape-to-close — every modal on the web should respect Escape.
  useEffect(() => {
    if (!openVideo) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenVideo(null);
    };
    window.addEventListener('keydown', onKey);
    // Move focus into the dialog for screen readers and keyboard users.
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [openVideo]);

  // Empty list = section hides. We don't even render the heading because an
  // empty "See It in Motion" section reads worse than no section at all.
  if (VIDEOS.length === 0) return null;

  return (
    <section className="py-16 max-md:py-12 bg-cream" aria-labelledby="videos-heading">
      <div className="container-site">
        <ScrollReveal>
          <SectionHeader
            id="videos-heading"
            tag={t('tag')}
            title={t('title')}
            subtitle={t('subtitle')}
          />
        </ScrollReveal>

        {/* Desktop: horizontal scroll strip with snap. Mobile: single-column
            stack to avoid fighting the vertical scroll gesture. The negative
            margin + scroll padding lets the first/last card breathe against
            the container edge while the snap still aligns cleanly. */}
        <div
          className="
            flex gap-5 overflow-x-auto snap-x snap-mandatory
            -mx-4 px-4 pb-4
            max-md:flex-col max-md:overflow-visible max-md:gap-4 max-md:mx-0 max-md:px-0
            scrollbar-thin scrollbar-thumb-border
          "
          role="list"
        >
          {VIDEOS.map((video) => (
            <ScrollReveal key={video.id}>
              <button
                type="button"
                onClick={() => setOpenVideo(video)}
                role="listitem"
                aria-label={t('playLabel', { title: video.alt })}
                className="
                  group relative shrink-0 w-[340px] max-md:w-full snap-start
                  rounded-2xl overflow-hidden bg-navy-deep
                  border border-border hover:border-navy hover:shadow-lg
                  transition-all cursor-pointer
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy
                "
              >
                <div className="relative aspect-[9/16] max-md:aspect-[16/9]">
                  <Image
                    src={video.poster}
                    alt={video.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 340px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle bottom gradient for caption legibility */}
                  <div className="absolute inset-0 bg-linear-to-t from-navy-deep/90 via-navy-deep/20 to-transparent" aria-hidden="true" />
                  {/* Centered play icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/95 group-hover:bg-white group-hover:scale-110 transition-all flex items-center justify-center shadow-xl">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-navy translate-x-0.5" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  {/* Caption pinned bottom-left */}
                  <div className="absolute bottom-4 left-4 right-4 text-white text-left">
                    <h3 className="font-serif text-[1.05rem] leading-tight mb-0.5">{video.alt}</h3>
                    <p className="text-[.72rem] opacity-85 font-medium">{video.caption}</p>
                  </div>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox — only mounted when a video is open. Backdrop click and
          Escape both close. The <video> uses controls + autoplay so a click
          immediately starts playback. */}
      {openVideo && (
        <div
          className="fixed inset-0 z-200 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 max-md:p-2"
          onClick={() => setOpenVideo(null)}
          role="dialog"
          aria-modal="true"
          aria-label={openVideo.alt}
          ref={dialogRef}
          tabIndex={-1}
        >
          <button
            type="button"
            onClick={() => setOpenVideo(null)}
            aria-label={t('close')}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm text-white flex items-center justify-center transition-all focus-visible:outline-2 focus-visible:outline-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
          {/* Stop propagation so clicking inside the video doesn't dismiss */}
          <div onClick={(e) => e.stopPropagation()} className="relative max-w-5xl w-full max-h-[90vh]">
            <video
              key={openVideo.id}
              src={openVideo.src}
              poster={openVideo.poster}
              controls
              autoPlay
              playsInline
              className="w-full h-full max-h-[90vh] rounded-2xl shadow-2xl bg-black object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
