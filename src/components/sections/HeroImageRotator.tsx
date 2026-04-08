'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { IconScience } from '@/components/icons/Icons';

/*
 * Hero image carousel — auto-rotates through a curated set of real client
 * before/after photos with a soft cross-fade. Stops scrolling because the
 * user sees a face transforming, not a generic stock shot.
 *
 * Behavior:
 *   - Each image holds for ~6s, cross-fades over ~1.2s
 *   - Hover (or focus) pauses the rotation so the visitor can inspect
 *   - First image is `priority` so the LCP element loads instantly
 *   - All other images are `loading="eager"` so the cross-fade doesn't
 *     stutter on a slow network — there are only 5 photos, ~80KB each
 *   - prefers-reduced-motion: respects the global guard via the `.hero-rotator-fade`
 *     class which is silenced by the existing @media block in globals.css.
 *     We also detect the preference manually here and skip the interval so
 *     the image never auto-advances under reduced motion.
 *   - A small dot pagination at the bottom announces the current index for
 *     keyboard/screen-reader users; clicking a dot jumps the carousel.
 *
 * The image overlays (concern label + "verified" pill) live in this same
 * component so they swap atomically with the photo — no risk of the wrong
 * label sitting on the wrong client.
 */

interface RotatorImage {
  src: string;
  alt: string;
  /** Concern label shown in the bottom overlay (e.g. "Cystic Acne"). */
  concernKey: 'rotatorAcne' | 'rotatorMelasma' | 'rotatorRosacea' | 'rotatorAging' | 'rotatorAcneScars';
}

const IMAGES: RotatorImage[] = [
  {
    src: '/images/instagram/before-after-acne-2.webp',
    alt: 'Before and after — cystic acne treatment, real 360 Radiance client',
    concernKey: 'rotatorAcne',
  },
  {
    src: '/images/instagram/before-after-melasma.webp',
    alt: 'Before and after — melasma treatment, real 360 Radiance client',
    concernKey: 'rotatorMelasma',
  },
  {
    src: '/images/instagram/before-after-acne-3.webp',
    alt: 'Before and after — hormonal acne treatment, real 360 Radiance client',
    concernKey: 'rotatorAcneScars',
  },
  {
    src: '/images/instagram/before-after-rosacea-2.webp',
    alt: 'Before and after — rosacea treatment, real 360 Radiance client',
    concernKey: 'rotatorRosacea',
  },
  {
    src: '/images/instagram/before-after-aging.webp',
    alt: 'Before and after — anti-aging treatment, real 360 Radiance client',
    concernKey: 'rotatorAging',
  },
];

const HOLD_MS = 6000; // dwell time on each image

export function HeroImageRotator() {
  const t = useTranslations('hero');
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-advance with respect for prefers-reduced-motion. Reduced-motion
  // users get a static first image — they explicitly opted out of motion
  // and a 6-second auto-advance is exactly the kind of thing they're
  // opting out of.
  useEffect(() => {
    if (paused) return;
    if (typeof window !== 'undefined') {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) return;
    }
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % IMAGES.length);
    }, HOLD_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused]);

  return (
    <div
      className="relative h-full w-full overflow-hidden lg:rounded-none rounded-3xl max-lg:shadow-lg max-lg:ring-1 max-lg:ring-black/5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      role="region"
      aria-label={t('rotatorAriaLabel')}
      aria-roledescription="carousel"
    >
      {/* Stacked images, opacity-faded to reveal the active one. */}
      {IMAGES.map((img, i) => (
        <div
          key={img.src}
          className="absolute inset-0 hero-rotator-fade"
          style={{ opacity: i === index ? 1 : 0 }}
          aria-hidden={i !== index}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={i === 0}
            loading={i === 0 ? undefined : 'eager'}
            className="object-cover object-center"
          />
        </div>
      ))}

      {/* Bottom gradient + label overlay */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-t from-navy-deep/90 via-navy-deep/40 to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-7 left-7 right-7 max-md:bottom-6 max-md:left-6 max-md:right-6 text-white text-left">
        <p className="text-[.66rem] font-bold uppercase tracking-[2px] text-gold-light mb-1.5">
          {t('rotatorVerified')}
        </p>
        <h3 className="font-serif text-[1.4rem] max-md:text-[1.2rem] leading-tight">
          {t(IMAGES[index].concernKey)}
        </h3>
      </div>

      {/* Top-right floating cert pill */}
      <div className="absolute top-5 right-5 max-md:top-3 max-md:right-3 bg-white/95 backdrop-blur-sm rounded-2xl py-3 px-5 max-md:py-2 max-md:px-3.5 shadow-lg inline-flex items-center gap-2.5 max-md:gap-1.5 text-[.76rem] max-md:text-[.65rem] font-semibold text-navy whitespace-nowrap">
        <IconScience size={16} className="text-navy shrink-0" aria-hidden="true" />
        {t('certBadge')}
      </div>

      {/* Pagination dots — bottom center, above the label so they don't fight it */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5" role="tablist" aria-label={t('rotatorPaginationAria')}>
        {IMAGES.map((img, i) => (
          <button
            key={img.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={t('rotatorGoTo', { index: i + 1, total: IMAGES.length })}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all cursor-pointer border-0 p-0 ${
              i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/55 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
