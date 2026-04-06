import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { BUSINESS } from '@/lib/constants';
import { IconPhone } from '@/components/icons/Icons';

type FooterLink = { label: string; href: string; external?: boolean; tel?: boolean };

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  const FOOTER_LINKS: { title: string; links: FooterLink[] }[] = [
    {
      title: t('services'),
      links: [
        { label: tNav('services'), href: '/services' },
      ],
    },
    {
      title: t('company'),
      links: [
        { label: tNav('about'), href: '/about' },
        { label: tNav('results'), href: '/results' },
        { label: tNav('blog'), href: '/blog' },
        { label: tNav('products'), href: '/products' },
      ],
    },
    {
      title: t('contact'),
      links: [
        { label: BUSINESS.phone, href: `tel:${BUSINESS.phoneRaw}`, tel: true },
        { label: 'Instagram', href: BUSINESS.social.instagram, external: true },
        { label: 'Facebook', href: BUSINESS.social.facebook, external: true },
        { label: 'Google', href: BUSINESS.social.google, external: true },
        { label: tNav('contact'), href: '/contact' },
      ],
    },
  ];

  return (
    <footer className="bg-[#141C27] text-white/45 pt-20 pb-10" role="contentinfo">
      <div className="container-site">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-14 pb-14 border-b border-white/8 max-lg:grid-cols-2 max-lg:gap-10 max-md:grid-cols-1 max-md:gap-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 no-underline text-white mb-6" aria-label={tNav('homeAria')}>
              <span className="font-serif text-[1.3rem]">360 Radiance</span>
            </Link>
            <p className="text-[.88rem] leading-[1.85] max-w-75 mb-6">{t('description')}</p>
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="inline-flex items-center gap-2 text-white/60 text-[.88rem] font-medium no-underline hover:text-white transition-colors"
              aria-label={tNav('callUs', { phone: BUSINESS.phone })}
            >
              <IconPhone size={16} />
              {BUSINESS.phone}
            </a>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="text-white text-[.75rem] font-bold uppercase tracking-[2px] mb-6">{col.title}</h4>
              <ul className="list-none flex flex-col gap-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-white/40 no-underline text-[.88rem] hover:text-teal-light transition-colors">
                        {link.label}
                      </a>
                    ) : link.tel ? (
                      <a href={link.href} className="text-white/40 no-underline text-[.88rem] hover:text-teal-light transition-colors">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href as '/services' | '/about' | '/results' | '/blog' | '/products' | '/contact'} className="text-white/40 no-underline text-[.88rem] hover:text-teal-light transition-colors">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex justify-between items-center text-[.78rem] max-md:flex-col max-md:gap-3 max-md:text-center text-white/25">
          <span>{t('copyright')}</span>
          <span>{t('credentials')}</span>
        </div>
      </div>
    </footer>
  );
}
