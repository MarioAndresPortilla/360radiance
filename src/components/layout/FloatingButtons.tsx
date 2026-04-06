'use client';

import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';
import { IconCalendar, IconWhatsApp } from '@/components/icons/Icons';

export function FloatingButtons() {
  return (
    <div className="fixed bottom-5 right-5 z-90 flex flex-col gap-2.5 items-end print:hidden" role="group" aria-label="Quick actions">
      <Link
        href="/contact"
        className="bg-teal text-white w-[50px] h-[50px] rounded-[12px] flex items-center justify-center cursor-pointer shadow-lg transition-all duration-250 border-none hover:bg-teal-dark hover:-translate-y-0.5 no-underline"
        aria-label="Book an appointment"
      >
        <IconCalendar size={22} className="text-white" />
      </Link>
      <a
        href={BUSINESS.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-whatsapp text-white w-[50px] h-[50px] rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_20px_rgba(37,211,102,.3)] transition-all duration-250 border-none hover:bg-whatsapp-dark hover:scale-[1.08] relative"
        aria-label="Chat with us on WhatsApp"
      >
        <div className="absolute right-[58px] bg-white text-text py-1.5 px-3 rounded-lg text-[.72rem] font-semibold shadow-md whitespace-nowrap opacity-0 translate-x-2 transition-all duration-250 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0" aria-hidden="true">
          Chat with us
        </div>
        <IconWhatsApp size={26} className="fill-white" />
      </a>
    </div>
  );
}
