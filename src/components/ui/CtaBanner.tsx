import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

interface CtaBannerProps {
  heading: string;
  subtitle: string;
  buttonText?: string;
}

export function CtaBanner({ heading, subtitle, buttonText }: CtaBannerProps) {
  const tCommon = useTranslations('common');
  const label = buttonText ?? tCommon('bookFreeConsultation');
  return (
    <section className="py-16 bg-navy">
      <div className="container-site text-center text-white">
        <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] mb-4">{heading}</h2>
        <p className="opacity-80 max-w-112.5 mx-auto mb-8 text-[.95rem] leading-[1.7]">{subtitle}</p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 bg-gold text-navy rounded-xl font-bold text-[.92rem] px-8 py-3.5 transition-all hover:bg-gold-light hover:-translate-y-0.5 no-underline"
        >
          {label}
        </Link>
      </div>
    </section>
  );
}
