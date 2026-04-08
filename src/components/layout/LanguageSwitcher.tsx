'use client';

/*
 * EN/ES locale switcher. Two visual modes:
 *
 *   - "compact": EN | ES pills used in the desktop header bar (always visible
 *     next to the phone number on lg+ viewports).
 *   - "labeled": "Language: English | Español" row used inside the mobile
 *     menu drawer where there's room for full names.
 *
 * Why a separate component: the same locale-switching logic was inlined
 * twice in Navbar.tsx (header + mobile menu), which forced any locale-state
 * change to touch the navbar in two places. Pulling it out lets the navbar
 * re-render only the locations where the switcher mounts, and lets us reuse
 * the switcher in the footer if/when we add one.
 */

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type Variant = 'compact' | 'labeled';

export function LanguageSwitcher({ variant }: { variant: Variant }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('nav');

  function switchLocale(newLocale: 'en' | 'es') {
    router.replace(pathname, { locale: newLocale });
  }

  if (variant === 'compact') {
    return (
      <div
        className="flex items-center gap-1 max-md:hidden text-[.78rem] font-semibold"
        role="group"
        aria-label={t('language')}
      >
        <button
          type="button"
          onClick={() => switchLocale('en')}
          className={cn(
            'px-2 py-1 rounded transition-colors cursor-pointer',
            locale === 'en' ? 'text-navy' : 'text-text-light hover:text-navy',
          )}
          aria-current={locale === 'en' ? 'true' : undefined}
          aria-label="English"
        >
          EN
        </button>
        <span className="text-text-faint" aria-hidden="true">/</span>
        <button
          type="button"
          onClick={() => switchLocale('es')}
          className={cn(
            'px-2 py-1 rounded transition-colors cursor-pointer',
            locale === 'es' ? 'text-navy' : 'text-text-light hover:text-navy',
          )}
          aria-current={locale === 'es' ? 'true' : undefined}
          aria-label="Español"
        >
          ES
        </button>
      </div>
    );
  }

  // labeled variant
  return (
    <div className="flex items-center gap-2 px-4 py-3" role="group" aria-label={t('language')}>
      <span className="text-[.78rem] text-text-light font-medium">{t('language')}:</span>
      <button
        type="button"
        onClick={() => switchLocale('en')}
        className={cn(
          'px-3 py-1 rounded text-[.82rem] font-semibold transition-colors',
          locale === 'en' ? 'bg-navy text-white' : 'text-text-mid hover:bg-navy-pale',
        )}
      >
        English
      </button>
      <button
        type="button"
        onClick={() => switchLocale('es')}
        className={cn(
          'px-3 py-1 rounded text-[.82rem] font-semibold transition-colors',
          locale === 'es' ? 'bg-navy text-white' : 'text-text-mid hover:bg-navy-pale',
        )}
      >
        Español
      </button>
    </div>
  );
}
