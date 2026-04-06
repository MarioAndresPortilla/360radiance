import Link from 'next/link';
import Image from 'next/image';
import { BUSINESS } from '@/lib/constants';
import { IconWhatsApp } from '@/components/icons/Icons';

const FOOTER_LINKS = [
  {
    title: 'Services',
    links: [
      { label: 'Acne Treatment', href: '/services#acne-treatment-program' },
      { label: 'HydraFacial', href: '/services#hydrafacial' },
      { label: 'Microneedling', href: '/services#microneedling' },
      { label: 'Chemical Peels', href: '/services#chemical-peels' },
      { label: 'All Services', href: '/services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Marta', href: '/about' },
      { label: 'Results', href: '/results' },
      { label: 'Reviews', href: '/reviews' },
      { label: 'Products', href: '/products' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: BUSINESS.phone, href: `tel:${BUSINESS.phoneRaw}`, external: false },
      { label: 'WhatsApp', href: BUSINESS.whatsapp, external: true },
      { label: 'Instagram', href: BUSINESS.social.instagram, external: true },
      { label: 'Facebook', href: BUSINESS.social.facebook, external: true },
      { label: 'Book Online', href: '/contact' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-text text-white/50 pt-16 pb-8" role="contentinfo">
      <div className="max-w-300 mx-auto px-8 max-md:px-5">
        <div className="grid grid-cols-[2.5fr_1fr_1fr_1fr] gap-12 pb-12 border-b border-white/8 max-lg:grid-cols-2 max-lg:gap-10 max-md:grid-cols-1 max-md:gap-8">
          {/* Brand column */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 no-underline text-white mb-5" aria-label="360 Radiance — Home">
              <Image
                src="/images/360-radiance-logo.png"
                alt=""
                width={44}
                height={44}
                className="rounded-lg object-contain"
              />
              <span className="font-serif text-xl">360 Radiance</span>
            </Link>
            <p className="text-[.85rem] leading-[1.8] max-w-75 mb-5 text-white/40">
              Award-winning paramedical skincare in Sunrise, FL. European serums, certified acne treatment, and proprietary botanical formulas.
            </p>
            <div className="flex items-center gap-4 mb-5">
              <Image
                src="/images/ascp-member.png"
                alt="ASCP Member"
                width={70}
                height={42}
                className="object-contain opacity-60"
              />
            </div>
            <a
              href={BUSINESS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-whatsapp text-white rounded-xl text-[.78rem] font-semibold py-2.5 px-4 hover:bg-whatsapp-dark transition-all"
              aria-label="Chat with us on WhatsApp"
            >
              <IconWhatsApp size={16} className="fill-white" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="text-white text-[.72rem] font-bold uppercase tracking-[2px] mb-5">{col.title}</h4>
              <ul className="list-none flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 no-underline text-[.85rem] hover:text-teal-light transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : link.href.startsWith('tel:') ? (
                      <a href={link.href} className="text-white/40 no-underline text-[.85rem] hover:text-teal-light transition-colors">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-white/40 no-underline text-[.85rem] hover:text-teal-light transition-colors">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex justify-between items-center text-[.75rem] max-md:flex-col max-md:gap-3 max-md:text-center text-white/30">
          <span>&copy; 2026 360 Radiance. All rights reserved. &middot; ASCP Member &middot; Best of 2026 Award Winner</span>
          <div role="group" aria-label="Language selection" className="flex gap-4">
            <a href="#" className="text-gold-light no-underline" aria-current="page" aria-label="English (current language)">English</a>
            <a href="#" className="text-white/30 no-underline hover:text-gold-light transition-colors" aria-label="Spanish" hrefLang="es">Espa&ntilde;ol</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
