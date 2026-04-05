'use client';

import { useState, useEffect } from 'react';
import { BUSINESS } from '@/lib/constants';
import { IconRadiance, IconPhone, IconWhatsApp } from '@/components/icons/Icons';
import { Button } from '@/components/ui/Button';

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#results', label: 'Results' },
  { href: '#about', label: 'About' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header className="bg-white sticky top-0 z-100 border-b border-border">
      <nav aria-label="Main navigation" className="px-8 max-md:px-4">
        <div className="max-w-300 mx-auto flex justify-between items-center h-16">
          <a href="#" className="flex items-center gap-2.5 no-underline text-text" aria-label="360 Radiance — Home">
            <div className="w-9.5 h-9.5 bg-teal rounded-2.5 flex items-center justify-center">
              <IconRadiance size={24} className="text-white" />
            </div>
            <span className="font-serif text-xl">360 Radiance</span>
          </a>

          <div className="flex gap-7 items-center max-md:hidden" role="list">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                role="listitem"
                className="text-text-mid no-underline text-[.85rem] font-medium transition-colors duration-200 hover:text-teal"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="text-text-mid no-underline text-[.82rem] font-medium flex items-center gap-1 max-md:hidden"
              aria-label={`Call us at ${BUSINESS.phone}`}
            >
              <IconPhone size={14} className="text-text-mid" />
              {BUSINESS.phone}
            </a>
            <span className="max-md:hidden">
              <Button variant="whatsapp" href={BUSINESS.whatsapp} external>
                WhatsApp
              </Button>
            </span>
            <Button variant="teal" href="#booking">
              Book Now
            </Button>
            <button
              type="button"
              className="hidden max-md:flex flex-col justify-center items-center w-10 h-10 gap-1.5 bg-transparent border-none cursor-pointer p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <span className={`block w-5 h-0.5 bg-text transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <span className={`block w-5 h-0.5 bg-text transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-text transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
        className={`hidden max-md:block fixed inset-0 top-16 z-90 transition-all duration-300 ${mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
        <nav
          aria-label="Mobile navigation links"
          className={`relative bg-white border-t border-border shadow-lg transition-transform duration-300 ${mobileOpen ? 'translate-y-0' : '-translate-y-4'}`}
        >
          <div className="flex flex-col p-6 gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-text no-underline text-base font-medium py-3 px-4 rounded-lg hover:bg-teal-pale hover:text-teal transition-colors"
              >
                {link.label}
              </a>
            ))}
            <hr className="border-border my-2" />
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="text-text-mid no-underline text-[.88rem] font-medium flex items-center gap-2 py-3 px-4"
              aria-label={`Call us at ${BUSINESS.phone}`}
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
              WhatsApp — we reply fast
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
