import Link from 'next/link';

interface CtaBannerProps {
  heading: string;
  subtitle: string;
  buttonText?: string;
  buttonHref?: string;
}

export function CtaBanner({
  heading,
  subtitle,
  buttonText = 'Book Free Consultation',
  buttonHref = '/contact',
}: CtaBannerProps) {
  return (
    <section className="py-16 bg-teal">
      <div className="container-site text-center text-white">
        <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] mb-4">{heading}</h2>
        <p className="opacity-80 max-w-112.5 mx-auto mb-8 text-[.95rem] leading-[1.7]">{subtitle}</p>
        <Link
          href={buttonHref}
          className="inline-flex items-center gap-1.5 bg-gold text-white rounded-xl font-bold text-[.92rem] px-8 py-3.5 transition-all hover:bg-gold-dark hover:-translate-y-0.5 no-underline"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
