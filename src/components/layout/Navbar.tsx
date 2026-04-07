'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import Image from 'next/image';
import { BUSINESS } from '@/lib/constants';
import { IconPhone, IconWhatsApp } from '@/components/icons/Icons';
import { cn } from '@/lib/utils';

const NAV_HREFS = ['/services', '/products', '/results', '/about', '/blog', '/contact'] as const;

export function Navbar() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/services' as const, label: t('services') },
    { href: '/products' as const, label: t('products') },
    { href: '/results' as const, label: t('results') },
    { href: '/about' as const, label: t('about') },
    { href: '/blog' as const, label: t('blog') },
    { href: '/contact' as const, label: t('contact') },
  ];

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function switchLocale(newLocale: 'en' | 'es') {
    router.replace(pathname, { locale: newLocale });
  }

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
            {/* Language switcher */}
            <div className="flex items-center gap-1 max-md:hidden text-[.78rem] font-semibold" role="group" aria-label={t('language')}>
              <button
                type="button"
                onClick={() => switchLocale('en')}
                className={cn('px-2 py-1 rounded transition-colors cursor-pointer', locale === 'en' ? 'text-navy' : 'text-text-light hover:text-navy')}
                aria-current={locale === 'en' ? 'true' : undefined}
                aria-label="English"
              >
                EN
              </button>
              <span className="text-text-faint" aria-hidden="true">/</span>
              <button
                type="button"
                onClick={() => switchLocale('es')}
                className={cn('px-2 py-1 rounded transition-colors cursor-pointer', locale === 'es' ? 'text-navy' : 'text-text-light hover:text-navy')}
                aria-current={locale === 'es' ? 'true' : undefined}
                aria-label="Español"
              >
                ES
              </button>
            </div>

            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="text-text-mid no-underline text-[.82rem] font-medium flex items-center gap-1 max-lg:hidden"
              aria-label={t('callUs', { phone: BUSINESS.phone })}
            >
              <IconPhone size={14} className="text-text-mid" />
              {BUSINESS.phone}
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

      <div
        id="mobile-menu"
        role="dialog"
        aria-label={t('mobileMenu')}
        aria-hidden={!mobileOpen}
        className={`hidden max-lg:block fixed inset-0 top-16 z-90 transition-all duration-300 ${mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
        <nav
          aria-label={t('mobileMenu')}
          className={`relative bg-white border-t border-border shadow-lg transition-transform duration-300 ${mobileOpen ? 'translate-y-0' : '-translate-y-4'}`}
        >
          <div className="flex flex-col p-6 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'no-underline text-base font-medium py-3 px-4 rounded-lg hover:bg-navy-pale hover:text-navy transition-colors',
                  pathname === link.href ? 'text-navy bg-navy-pale' : 'text-text'
                )}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-border my-2" />
            {/* Mobile language switcher */}
            <div className="flex items-center gap-2 px-4 py-3" role="group" aria-label={t('language')}>
              <span className="text-[.78rem] text-text-light font-medium">{t('language')}:</span>
              <button
                type="button"
                onClick={() => switchLocale('en')}
                className={cn('px-3 py-1 rounded text-[.82rem] font-semibold transition-colors', locale === 'en' ? 'bg-navy text-white' : 'text-text-mid hover:bg-navy-pale')}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => switchLocale('es')}
                className={cn('px-3 py-1 rounded text-[.82rem] font-semibold transition-colors', locale === 'es' ? 'bg-navy text-white' : 'text-text-mid hover:bg-navy-pale')}
              >
                Español
              </button>
            </div>
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
              aria-label="WhatsApp"
            >
              <IconWhatsApp size={18} className="fill-white" />
              WhatsApp
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
