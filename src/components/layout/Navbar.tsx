'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import Image from 'next/image';
import { BUSINESS } from '@/lib/constants';
import { IconPhone } from '@/components/icons/Icons';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileNav } from './MobileNav';
import { cn } from '@/lib/utils';

/*
 * Top-level site header.
 *
 * Owns just the desktop nav layout, the action cluster (locale, phone, Book
 * Now, hamburger), and the open/close state of the mobile drawer. The drawer
 * itself lives in MobileNav.tsx, the locale pills in LanguageSwitcher.tsx —
 * pulled out Apr 2026 when this component crossed 220 lines and became
 * painful to scan.
 *
 * /reviews lives between /results and /about — the "trust funnel" ordering:
 * see treatments → see outcomes → see what others say → meet the practitioner
 * → read the journal → contact. Reviews used to be a dead-end page only
 * reachable from footer/Testimonials CTA, which buried the highest-trust
 * signal a service business has.
 */
export function Navbar() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/services' as const, label: t('services') },
    { href: '/products' as const, label: t('products') },
    { href: '/results' as const, label: t('results') },
    { href: '/reviews' as const, label: t('reviews') },
    { href: '/about' as const, label: t('about') },
    { href: '/blog' as const, label: t('blog') },
    { href: '/contact' as const, label: t('contact') },
  ];

  // Lock body scroll when the mobile drawer opens.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Auto-close the drawer on route change.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="bg-white sticky top-0 z-100 border-b border-border">
      <nav aria-label={t('ariaLabel')}>
        <div className="container-site flex justify-between items-center h-16 gap-6 max-lg:gap-3 max-md:gap-2">
          <Link href="/" className="flex items-center no-underline min-w-0" aria-label={t('homeAria')}>
            {/*
              The horizontal lotus logo has an 8:1 aspect ratio (480x60), so at
              h-9 it renders ~288px wide — wider than half a 360px Samsung viewport.
              We CAP the rendered width on small mobiles (max-w-[160px]) and let
              the height auto-derive, so the logo always fits next to the
              "Book Now" + hamburger cluster without clipping. On lg+ we let it
              breathe at its natural h-9 size.
            */}
            <Image
              src="/logo-horizontal-purple-light.svg"
              alt="360 Radiance"
              width={240}
              height={30}
              priority
              className="h-9 w-auto max-lg:h-8 max-md:h-7 max-md:max-w-40 max-[380px]:max-w-35"
            />
          </Link>

          <div className="flex gap-6 items-center max-lg:hidden" role="list">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                role="listitem"
                className={cn(
                  'no-underline text-[.85rem] font-medium transition-colors duration-200 hover:text-navy',
                  pathname === link.href ? 'text-navy' : 'text-text-mid'
                )}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 max-md:gap-1.5 shrink-0">
            <LanguageSwitcher variant="compact" />

            {/* Desktop: full phone number with label. Hidden on mobile because
                there isn't enough header room next to the Book Now button. */}
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="text-navy no-underline text-[.82rem] font-semibold flex items-center gap-1 max-lg:hidden hover:text-navy-deep transition-colors"
              aria-label={t('callUs', { phone: BUSINESS.phone })}
            >
              <IconPhone size={14} className="text-navy" />
              {BUSINESS.phone}
            </a>

            {/* Mobile: icon-only tappable phone button. Single biggest
                mobile-conversion lever for a brick-and-mortar service business
                — phone calls remain the dominant conversion channel for
                skincare/aesthetics, and burying the number behind a menu tap
                measurably reduces call volume. Tap target is 40x40 (well above
                the 24x24 WCAG 2.5.8 minimum, comfortable for thumbs). */}
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="hidden max-lg:inline-flex w-10 h-10 max-md:w-9 max-md:h-9 items-center justify-center rounded-full bg-navy-pale text-navy hover:bg-navy hover:text-white transition-colors no-underline shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
              aria-label={t('callUs', { phone: BUSINESS.phone })}
            >
              <IconPhone size={16} />
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 bg-navy text-white rounded-lg font-semibold text-[.82rem] max-md:text-[.74rem] px-5 py-2.5 max-md:px-3 max-md:py-2 transition-all cursor-pointer hover:bg-navy-deep hover:-translate-y-px hover:shadow-md no-underline whitespace-nowrap"
            >
              {tCommon('bookNow')}
            </Link>

            <button
              type="button"
              className="hidden max-lg:flex flex-col justify-center items-center w-10 h-10 max-md:w-9 max-md:h-9 gap-1.5 bg-transparent border-none cursor-pointer p-1 shrink-0"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
            >
              <span className={`block w-5 h-0.5 bg-text transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <span className={`block w-5 h-0.5 bg-text transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-text transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} navLinks={navLinks} />
    </header>
  );
}
