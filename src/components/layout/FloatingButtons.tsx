'use client';

import { useTranslations } from 'next-intl';
import { BUSINESS } from '@/lib/constants';
import { useCalBooking } from '@/lib/use-cal-booking';
import { IconWhatsApp } from '@/components/icons/Icons';

// Floating action stack: Cal.com booking (primary) + WhatsApp. Embed init +
// fallback-to-direct-link logic lives in useCalBooking — if cal.com's script
// is blocked or the embed fails, `openBooking('quick')` opens the raw cal.com
// page in a new tab so the user still reaches Marta's availability.
export function FloatingButtons() {
  const tCommon = useTranslations('common');
  const { openBooking } = useCalBooking();

  return (
    <div className="fab-stack fixed z-90 flex flex-col gap-3 items-end print:hidden" role="group">
      <button
        type="button"
        onClick={() => openBooking('quick')}
        className="bg-gold text-navy rounded-2xl flex items-center gap-2 px-4 py-3 shadow-lg transition-all duration-250 hover:bg-gold-light hover:-translate-y-0.5 cursor-pointer font-semibold text-sm whitespace-nowrap"
      >
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        {tCommon('bookNow')}
      </button>
      <a
        href={BUSINESS.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-whatsapp text-white w-13 h-13 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,.3)] transition-all duration-250 hover:bg-whatsapp-dark hover:scale-[1.08] relative"
        aria-label="WhatsApp"
      >
        <IconWhatsApp size={26} className="fill-white" />
      </a>
    </div>
  );
}
