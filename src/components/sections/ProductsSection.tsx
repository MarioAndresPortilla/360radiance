import { useTranslations } from 'next-intl';
import { PRODUCT_FEATURES } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { IconDropper, IconCheck } from '@/components/icons/Icons';

export function ProductsSection() {
  const t = useTranslations('products');
  return (
    <section className="py-24 max-md:py-16 bg-cream" aria-labelledby="products-heading">
      <div className="container-site">
        <div className="grid grid-cols-[1.2fr_1fr] gap-20 max-lg:gap-12 items-center max-lg:grid-cols-1">
          <ScrollReveal>
            <div className="bg-teal-pale rounded-2xl aspect-4/3 flex items-center justify-center flex-col gap-5 relative" role="img" aria-label="Radiance Skin Care product line">
              <IconDropper size={64} className="text-teal" aria-hidden="true" />
              <span className="text-[.65rem] font-bold text-teal tracking-[2px] uppercase">{t('lineLabel')}</span>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div>
              <span className="inline-block text-[.68rem] font-bold uppercase tracking-[2px] text-teal mb-4 bg-teal-pale px-4 py-1.5 rounded-full">
                {t('tag')}
              </span>
              <h2 id="products-heading" className="font-serif text-[clamp(1.6rem,3vw,2.3rem)] mb-5">{t('title')}</h2>
              <p className="text-text-mid leading-[1.85] mb-8 text-[.92rem]">
                {t('description')}
              </p>
              <ul className="flex flex-col gap-4 list-none" aria-label="Product features">
                {PRODUCT_FEATURES.map((f) => (
                  <li key={f.text} className="flex items-center gap-3 text-[.9rem] text-text-mid">
                    <span className="w-6 h-6 rounded-lg bg-teal-pale flex items-center justify-center shrink-0" aria-hidden="true">
                      <IconCheck size={13} className="text-teal" />
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
