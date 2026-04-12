'use client';

/*
 * Mobile navigation drawer — slides down from under the navbar on lg- viewports.
 *
 * Was inlined inside Navbar.tsx until Apr 2026, when the navbar component
 * crossed 220 lines and started mixing four concerns: desktop nav links, the
 * action cluster (phone/book/hamburger), the mobile drawer, AND the locale
 * switcher. Pulling the drawer into its own component lets the navbar focus
 * on the desktop layout + state ownership; the drawer reads the open/close
 * state via props.
 *
 * Rendered as a sibling of the <header> (not a child) so `position: fixed`
 * resolves against the viewport. The overlay covers `inset-0` (full screen)
 * with `pt-16` on the inner nav to clear the sticky header (h-16 / z-100),
 * which paints on top. No JS measurement needed. Earlier version
 * used a ~40% black backdrop beneath an auto-height panel, which on mobile
 * read as a broken/unfinished overlay where the page content bled through
 * below the menu items. Closing is handled by the hamburger toggle in the
 * navbar above.
 *
 * overflow-hidden on the dialog wrapper masks the slide-in transform so the
 * white drawer can't peek above its anchor and overlap the navbar mid-animation.
 * The Y-translate animation (not opacity-only) is what makes it read as a
 * "menu sliding down" rather than a fade-in modal.
 */

import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { BUSINESS } from '@/lib/constants';
import { IconPhone, IconWhatsApp } from '@/components/icons/Icons';
import { LanguageSwitcher } from './LanguageSwitcher';
import { cn } from '@/lib/utils';

type NavLink = { href: string; label: string };

export function MobileNav({
  open,
  onClose,
  navLinks,
}: {
  open: boolean;
  onClose: () => void;
  navLinks: NavLink[];
}) {
  const t = useTranslations('nav');
  const pathname = usePathname();

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-label={t('mobileMenu')}
      aria-hidden={!open}
      className={cn(
        'hidden max-lg:block fixed inset-0 z-95 transition-opacity duration-250 ease-out',
        open ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none',
      )}
    >
      {/* pt-16 clears the sticky header (h-16 / z-100) which paints on top
          of this overlay. No JS measurement needed — the header is always
          64px when stuck at top-0. */}
      <nav
        aria-label={t('mobileMenu')}
        className={cn(
          'w-full h-full pt-16 bg-white shadow-lg overflow-y-auto overscroll-contain transition-transform duration-250 ease-out',
          open ? 'translate-y-0' : '-translate-y-full',
        )}
        onClick={(e) => {
          // Dismiss when tapping the empty area below the menu items, but
          // let taps on actual links/buttons bubble normally. Any click whose
          // target is the nav element itself (i.e. the empty space) closes.
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="flex flex-col px-5 py-4 gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              // i18n/navigation Link expects a Pathname union; the links are
              // typed loosely here as plain strings since they're passed through
              // from Navbar.tsx where the union narrowing happens.
              href={link.href as never}
              className={cn(
                'no-underline text-base font-medium py-3 px-4 rounded-lg hover:bg-navy-pale hover:text-navy transition-colors',
                pathname === link.href ? 'text-navy bg-navy-pale' : 'text-text',
              )}
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
          <hr className="border-border my-2" />
          <LanguageSwitcher variant="labeled" />
          <a
            href={`tel:${BUSINESS.phoneRaw}`}
            className="text-text-mid no-underline text-[.88rem] font-medium flex items-center gap-2 py-3 px-4"
            aria-label={t('callUs', { phone: BUSINESS.phone })}
          >
            <IconPhone size={16} className="text-text-mid" />
            {BUSINESS.phone}
          </a>
          <a
            href={BUSINESS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-whatsapp text-white rounded-lg text-[.85rem] font-semibold py-3 px-4 hover:bg-whatsapp-dark transition-all mt-1"
            aria-label="Chat with us on WhatsApp"
          >
            <IconWhatsApp size={18} className="fill-white" />
            WhatsApp
          </a>
        </div>
      </nav>
    </div>
  );
}
