import { PRODUCT_FEATURES } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { IconDropper, IconCheck } from '@/components/icons/Icons';

export function ProductsSection() {
  return (
    <section className="py-20 max-md:py-14 bg-cream" aria-labelledby="products-heading">
      <div className="max-w-300 mx-auto px-8 max-md:px-5">
        <div className="grid grid-cols-[1.2fr_1fr] gap-16 items-center max-lg:grid-cols-1">
          <ScrollReveal>
            <div className="bg-teal-pale rounded-2xl aspect-4/3 flex items-center justify-center flex-col gap-4 relative" role="img" aria-label="Radiance Skin Care product line">
              <IconDropper size={64} className="text-teal" aria-hidden="true" />
              <span className="text-[.65rem] font-bold text-teal tracking-[2px] uppercase">Radiance Skin Care Line</span>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div>
              <span className="inline-block text-[.68rem] font-bold uppercase tracking-[2px] text-teal mb-3 bg-teal-pale px-3 py-1 rounded-full">
                Proprietary Formulas
              </span>
              <h2 id="products-heading" className="font-serif text-[clamp(1.6rem,3vw,2.3rem)] mb-4">The Radiance Collection</h2>
              <p className="text-text-mid leading-[1.85] mb-6 text-[.92rem]">
                Every formula is a groundbreaking blend of clinical science with nature&apos;s most beneficial botanical ingredients — resulting in healthier, younger-looking skin.
              </p>
              <ul className="flex flex-col gap-2.5 list-none" aria-label="Product features">
                {PRODUCT_FEATURES.map((f) => (
                  <li key={f.text} className="flex items-center gap-2.5 text-[.88rem] text-text-mid">
                    <span className="w-5.5 h-5.5 rounded-md bg-teal-pale flex items-center justify-center shrink-0" aria-hidden="true">
                      <IconCheck size={12} className="text-teal" />
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
