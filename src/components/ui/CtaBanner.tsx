import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

interface CtaBannerProps {
  heading: string;
  subtitle: string;
  buttonText?: string;
  /** Optional secondary CTA (e.g. a Fresha "Book Treatment" link). */
  secondaryText?: string;
  secondaryHref?: string;
}

export function CtaBanner({ heading, subtitle, buttonText, secondaryText, secondaryHref }: CtaBannerProps) {
  const tCommon = useTranslations('common');
  const label = buttonText ?? tCommon('bookFreeConsultation');
  return (
    <section className="py-16 bg-navy">
      <div className="container-site text-center text-white">
        <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] mb-4">{heading}</h2>
        <p className="opacity-80 max-w-112.5 mx-auto mb-8 text-[.95rem] leading-[1.7]">{subtitle}</p>
        <div className="flex flex-col items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 bg-gold text-navy rounded-xl font-bold text-[.92rem] px-8 py-3.5 transition-all hover:bg-gold-light hover:-translate-y-0.5 no-underline"
          >
            {label}
          </Link>
          {secondaryText && secondaryHref && (
            secondaryHref.startsWith('/') ? (
              <Link
                href={secondaryHref}
                className="text-[.85rem] text-white/80 underline underline-offset-4 decoration-white/30 hover:text-white hover:decoration-white/70 transition-colors"
              >
                {secondaryText}
              </Link>
            ) : (
              <a
                href={secondaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[.85rem] text-white/80 underline underline-offset-4 decoration-white/30 hover:text-white hover:decoration-white/70 transition-colors"
              >
                {secondaryText}
              </a>
            )
          )}
        </div>
      </div>
    </section>
  );
}
