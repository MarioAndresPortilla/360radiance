import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';
import { IconPhone } from '@/components/icons/Icons';

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
      { label: BUSINESS.phone, href: `tel:${BUSINESS.phoneRaw}` },
      { label: 'Instagram', href: BUSINESS.social.instagram, external: true },
      { label: 'Facebook', href: BUSINESS.social.facebook, external: true },
      { label: 'Book Online', href: '/contact' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#141C27] text-white/45 pt-20 pb-10" role="contentinfo">
      <div className="container-site">
        {/* Top section */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-14 pb-14 border-b border-white/8 max-lg:grid-cols-2 max-lg:gap-10 max-md:grid-cols-1 max-md:gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 no-underline text-white mb-6" aria-label="360 Radiance — Home">
              <span className="font-serif text-[1.3rem]">360 Radiance</span>
            </Link>
            <p className="text-[.88rem] leading-[1.85] max-w-75 mb-6">
              Award-winning paramedical skincare in Sunrise, FL. 25+ years of medical expertise, European serums, and proprietary botanical formulas.
            </p>
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="inline-flex items-center gap-2 text-white/60 text-[.88rem] font-medium no-underline hover:text-white transition-colors"
              aria-label={`Call us at ${BUSINESS.phone}`}
            >
              <IconPhone size={16} />
              {BUSINESS.phone}
            </a>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="text-white text-[.75rem] font-bold uppercase tracking-[2px] mb-6">{col.title}</h4>
              <ul className="list-none flex flex-col gap-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 no-underline text-[.88rem] hover:text-teal-light transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : link.href.startsWith('tel:') ? (
                      <a href={link.href} className="text-white/40 no-underline text-[.88rem] hover:text-teal-light transition-colors">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-white/40 no-underline text-[.88rem] hover:text-teal-light transition-colors">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 flex justify-between items-center text-[.78rem] max-md:flex-col max-md:gap-3 max-md:text-center text-white/25">
          <span>&copy; 2026 360 Radiance. All rights reserved.</span>
          <span>ASCP Member &middot; Best of 2026 Award Winner</span>
        </div>
      </div>
    </footer>
  );
}
