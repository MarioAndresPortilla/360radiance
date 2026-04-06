import { useTranslations } from 'next-intl';
import { BUSINESS } from '@/lib/constants';
import { IconPhone, IconWhatsApp } from '@/components/icons/Icons';

// When Marta gets a Cal.com account, the phone button can be replaced with a
// `data-cal-link` button + `getCalApi` popup namespace. Until then, "tel:" is
// the booking pathway and avoids any third-party iframe noise.
export function FloatingButtons() {
  const tCommon = useTranslations('common');

  return (
    <div className="fixed bottom-6 right-6 max-md:bottom-4 max-md:right-4 z-90 flex flex-col gap-3 items-end print:hidden" role="group">
      <a
        href={`tel:${BUSINESS.phoneRaw}`}
        className="bg-teal text-white w-13 h-13 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-250 hover:bg-teal-dark hover:-translate-y-0.5 no-underline"
        aria-label={`${tCommon('bookConsultation')} — ${BUSINESS.phone}`}
      >
        <IconPhone size={22} className="text-white" />
      </a>
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
