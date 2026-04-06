import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';
import { IconRadiance, IconWhatsApp } from '@/components/icons/Icons';

const FOOTER_SERVICES = [
  { label: 'Acne Treatment', href: '/services#face-reality-acne-program' },
  { label: 'Microdermabrasion', href: '/services#microdermabrasion' },
  { label: 'Skin Analysis', href: '/services#skin-analysis-consultation' },
  { label: 'Botanical Care', href: '/services#botanical-treatments' },
  { label: 'Rosacea Program', href: '/services#face-reality-acne-program' },
];

const FOOTER_COMPANY = [
  { label: 'About Marta', href: '/about' },
  { label: 'Results', href: '/results' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Blog', href: '#' },
];

const FOOTER_CONTACT = [
  { label: BUSINESS.phone, href: `tel:${BUSINESS.phoneRaw}` },
  { label: 'WhatsApp', href: BUSINESS.whatsapp, external: true },
  { label: 'Instagram', href: BUSINESS.social.instagram, external: true },
  { label: 'Facebook', href: BUSINESS.social.facebook, external: true },
  { label: 'Book Online', href: '/contact' },
];

export function Footer() {
  return (
    <footer className="bg-text text-white/50 pt-14 pb-6" role="contentinfo">
      <div className="max-w-300 mx-auto px-8 max-md:px-5">
        <div className="grid grid-cols-[2.2fr_1fr_1fr_1fr] gap-10 pb-10 border-b border-white/6 max-lg:grid-cols-2 max-md:grid-cols-1">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 no-underline text-white mb-3" aria-label="360 Radiance — Home">
              <div className="w-9.5 h-9.5 bg-teal rounded-2.5 flex items-center justify-center">
                <IconRadiance size={24} className="text-white" />
              </div>
              <span className="font-serif text-xl">360 Radiance</span>
            </Link>
            <p className="text-[.82rem] leading-[1.7] max-w-70 mb-4">
              Advanced paramedical skincare in Sunrise, FL. European serums, certified acne treatment, and proprietary botanical formulas.
            </p>
            <a
              href={BUSINESS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-whatsapp text-white rounded-lg text-[.75rem] font-semibold py-2 px-3.5 hover:bg-whatsapp-dark transition-all"
              aria-label="Chat with us on WhatsApp"
            >
              <IconWhatsApp size={14} className="fill-white" />
              Chat on WhatsApp
            </a>
          </div>

          <FooterCol title="Services" links={FOOTER_SERVICES} />
          <FooterCol title="Company" links={FOOTER_COMPANY} />
          <FooterCol title="Contact" links={FOOTER_CONTACT} />
        </div>

        <div className="pt-6 flex justify-between items-center text-[.7rem] max-md:flex-col max-md:gap-2.5 max-md:text-center">
          <span>&copy; 2026 360 Radiance. All rights reserved. &middot; ASCP Member</span>
          <div role="group" aria-label="Language selection">
            <a href="#" className="text-gold-light no-underline ml-2.5" aria-current="page" aria-label="English (current language)">English</a>
            <a href="#" className="text-white/30 no-underline ml-2.5 hover:text-gold-light transition-colors" aria-label="Spanish" hrefLang="es">Espa&ntilde;ol</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string; external?: boolean }[] }) {
  return (
    <div>
      <h4 className="text-white text-[.72rem] font-bold uppercase tracking-[1.5px] mb-3">{title}</h4>
      <ul className="list-none">
        {links.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/40 no-underline text-[.82rem] mb-1.5 hover:text-teal-light transition-colors"
              >
                {link.label}
              </a>
            ) : link.href.startsWith('tel:') || link.href === '#' ? (
              <a href={link.href} className="block text-white/40 no-underline text-[.82rem] mb-1.5 hover:text-teal-light transition-colors">
                {link.label}
              </a>
            ) : (
              <Link href={link.href} className="block text-white/40 no-underline text-[.82rem] mb-1.5 hover:text-teal-light transition-colors">
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
