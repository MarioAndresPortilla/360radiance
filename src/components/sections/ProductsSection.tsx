import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { PRODUCT_FEATURES } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { IconCheck } from '@/components/icons/Icons';

export function ProductsSection() {
  const t = useTranslations('products');
  return (
    <section className="py-16 max-md:py-12 bg-white" aria-labelledby="products-heading">
      <div className="container-site">
        <div className="grid grid-cols-[1.2fr_1fr] gap-20 max-lg:gap-12 items-center max-lg:grid-cols-1">
          <ScrollReveal>
            <div className="rounded-2xl aspect-4/3 relative overflow-hidden shadow-md border border-border">
              <Image
                src="/images/instagram/glow-with-radiance-line.webp"
                alt="The Radiance Skin Care Line — botanical serums and clinical formulas created by Marta Nazzar"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div>
              <span className="inline-block text-[.68rem] font-bold uppercase tracking-[2px] text-navy mb-4 bg-navy-pale px-4 py-1.5 rounded-full">
                {t('tag')}
              </span>
              <h2 id="products-heading" className="font-serif text-[clamp(1.6rem,3vw,2.3rem)] mb-5">{t('title')}</h2>
              <p className="text-text-mid mb-8 text-[.92rem]/[1.85]">
                {t('description')}
              </p>
              <ul className="flex flex-col gap-4 list-none" aria-label="Product features">
                {PRODUCT_FEATURES.map((f) => (
                  <li key={f.text} className="flex items-center gap-3 text-[.9rem] text-text-mid">
                    <span className="w-6 h-6 rounded-lg bg-navy-pale flex items-center justify-center shrink-0" aria-hidden="true">
                      <IconCheck size={13} className="text-navy" />
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
