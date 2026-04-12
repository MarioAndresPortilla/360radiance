import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { BUSINESS } from '@/lib/constants';
import { IconWhatsApp } from '@/components/icons/Icons';
import { Logo } from './Logo';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer className="bg-[#141C27] text-white/45 py-10" role="contentinfo">
      <div className="container-site flex flex-col gap-6 items-center text-center">
        {/* Brand */}
        <Link href="/" className="no-underline" aria-label={tNav('homeAria')}>
          <Logo className="h-10 w-auto" variant="light" />
        </Link>

        {/* Socials */}
        <div className="flex items-center gap-5 text-[.82rem]">
          <a href={BUSINESS.social.instagram} target="_blank" rel="noopener noreferrer" className="text-white/40 no-underline hover:text-white transition-colors">Instagram</a>
          <a href={BUSINESS.social.facebook} target="_blank" rel="noopener noreferrer" className="text-white/40 no-underline hover:text-white transition-colors">Facebook</a>
          <a href={BUSINESS.social.google} target="_blank" rel="noopener noreferrer" className="text-white/40 no-underline hover:text-white transition-colors">Google</a>
          <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer" className="text-white/40 no-underline hover:text-white transition-colors inline-flex items-center gap-1">
            <IconWhatsApp size={14} className="fill-current" />WhatsApp
          </a>
        </div>

        {/* Footer-only links (not in header nav) */}
        <div className="flex items-center gap-4 text-[.78rem]">
          <Link href="/reviews" className="text-white/35 no-underline hover:text-white/60 transition-colors">{tNav('testimonials')}</Link>
          <span className="text-white/15">|</span>
          <Link href="/privacy" className="text-white/35 no-underline hover:text-white/60 transition-colors">{t('privacy')}</Link>
          <span className="text-white/15">|</span>
          <Link href="/terms" className="text-white/35 no-underline hover:text-white/60 transition-colors">{t('terms')}</Link>
        </div>

        {/* Bottom line */}
        <div className="text-[.72rem] text-white/20 flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
          <span>{t('copyright')}</span>
          <span className="hidden sm:inline text-white/10">·</span>
          <span>{t('credentials')}</span>
        </div>
      </div>
    </footer>
  );
}
