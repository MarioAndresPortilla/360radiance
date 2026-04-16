'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { BUSINESS } from '@/lib/constants';
import { IconPhone } from '@/components/icons/Icons';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileNav } from './MobileNav';
import { CartButton } from '@/components/cart/CartButton';
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
 * Testimonials (/reviews) was demoted out of the header into the footer in
 * Apr 2026 — six chrome links was already dense and the testimonials page
 * pulls more weight as a footer-tier "I want to see proof before I commit"
 * destination than as a top-of-funnel anchor. Blog stays in the header.
 */
export function Navbar() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [headerBottom, setHeaderBottom] = useState(64);
  const headerRef = useRef<HTMLElement>(null);
  const scrollYRef = useRef(0);
  const pathname = usePathname();

  const navLinks = [
    { href: '/services' as const, label: t('services') },
    { href: '/products' as const, label: t('products') },
    { href: '/results' as const, label: t('results') },
    { href: '/about' as const, label: t('about') },
    { href: '/blog' as const, label: t('blog') },
    { href: '/contact' as const, label: t('contact') },
  ];

  // Bulletproof scroll lock — `overflow: hidden` alone doesn't work on iOS
  // Safari. Pinning the body with `position: fixed` + saved scroll offset
  // prevents all background scrolling including momentum/rubber-band.
  const lockScroll = useCallback(() => {
    scrollYRef.current = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.overflow = '';
    window.scrollTo(0, scrollYRef.current);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      // Measure header bottom BEFORE locking scroll — the lock pins the
      // body with position:fixed which un-sticks the header, shifting it
      // if the announcement bar is still in view.
      if (headerRef.current) {
        setHeaderBottom(headerRef.current.getBoundingClientRect().bottom);
      }
      lockScroll();
    } else {
      unlockScroll();
    }
    return unlockScroll;
  }, [mobileOpen, lockScroll, unlockScroll]);

  // Auto-close the drawer on route change.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header ref={headerRef} className="bg-white sticky top-0 z-100 border-b border-border">
        <nav aria-label={t('ariaLabel')}>
          <div className="container-site flex justify-between items-center h-16 gap-6 max-lg:gap-3 max-md:gap-2">
            <Link href="/" className="flex items-center no-underline min-w-0" aria-label={t('homeAria')}>
              {/*
                Inline SVG logo — always renders as true vector, never rasterised
                by the Next.js image optimiser. The viewBox is ~8.7:1, so at h-9
                it renders ~313px wide. We CAP the rendered width on small mobiles
                (max-w-[160px]) so the logo fits next to the "Book Now" + hamburger
                cluster without clipping.
              */}
              <Logo className="h-9 w-auto max-lg:h-8 max-md:h-7 max-md:max-w-40 max-[380px]:max-w-35" />
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

              {/* Cart button — renders nothing when Stripe isn't configured,
                  so the buy flow doesn't show up in prod until env vars are set. */}
              <CartButton />

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
      </header>

      {/* Rendered OUTSIDE the <header> so `position: fixed` is relative to the
          viewport — not trapped inside the sticky header's stacking context,
          which on mobile browsers can use transforms internally and break
          fixed positioning for descendants. z-90 keeps it below the header
          (z-100) but above page content. */}
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} navLinks={navLinks} headerBottom={headerBottom} />
    </>
  );
}
