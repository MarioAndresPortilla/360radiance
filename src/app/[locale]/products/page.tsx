import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageShell } from '@/components/layout/PageShell';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { IconCheck } from '@/components/icons/Icons';
import { PRODUCT_FEATURES } from '@/lib/constants';
import { buildPageMetadata } from '@/lib/seo';
import { ProductShowcase } from './ProductShowcase';
import { SkinConcernMatcher } from './SkinConcernMatcher';
import { PackageDeals } from './PackageDeals';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products' });
  return buildPageMetadata({
    locale,
    path: '/products',
    title: locale === 'es' ? 'Productos' : 'Products',
    description: t('pageSubtitle'),
  });
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('products');

  return (
    <PageShell>
      {/* Editorial hero — replaces the flat PageHeader on this page only.
          Same structural pattern as the About hero (full-bleed image + dark
          gradient overlay) but with two looped CSS animations layered in:
          a slow Ken Burns zoom on the product image and a soft gold radial
          pulse. Both animations are pure CSS (defined in globals.css) and
          are automatically silenced by the global prefers-reduced-motion
          block, so users who opt out of motion get a static hero. */}
      <section className="relative bg-navy-deep overflow-hidden" aria-labelledby="products-hero-heading">
        <div className="absolute inset-0">
          <Image
            src="/images/Radiance_Complete_360_Product_Line.jpeg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%] max-md:object-[center_top] opacity-55 lg:opacity-70 animate-hero-kenburns"
          />
          {/* Mobile: dark wash across whole image. Desktop: left-side gradient
              so the headline copy on the left always has high contrast even
              while the photo dominates the right half. */}
          <div className="absolute inset-0 bg-navy-deep/65 lg:bg-linear-to-r lg:from-navy-deep lg:via-navy-deep/85 lg:to-navy-deep/15" aria-hidden="true" />
          {/* Soft gold radial that gently breathes — adds perceived "glow"
              warmth to an otherwise cool navy hero. Sits above the gradient
              so it tints the whole composition. */}
          <div className="absolute inset-0 animate-hero-pulse pointer-events-none" aria-hidden="true" />
        </div>
        <div className="relative container-site py-28 max-md:py-20">
          <ScrollReveal>
            <div className="max-w-2xl">
              <span className="inline-block text-[.65rem] font-bold uppercase tracking-[2.5px] text-gold-light mb-5 bg-white/8 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
                {t('pageTag')}
              </span>
              <h1 id="products-hero-heading" className="font-serif text-[clamp(2.2rem,4.5vw,3.4rem)] leading-[1.12] mb-5 text-white">
                {t('pageTitle')}
              </h1>
              <p className="text-white/80 max-w-130 text-[1.02rem] leading-[1.8]">{t('pageSubtitle')}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Promise bar */}
      <section className="bg-white border-b border-border py-8">
        <div className="container-site">
          <ul className="flex justify-center gap-10 flex-wrap list-none max-md:gap-4 max-md:justify-start" aria-label="Product promises">
            {PRODUCT_FEATURES.map((f) => (
              <li key={f.text} className="flex items-center gap-2 text-[.82rem] font-medium text-text-mid">
                <span className="w-5 h-5 rounded-md bg-navy-pale flex items-center justify-center shrink-0" aria-hidden="true">
                  <IconCheck size={12} className="text-navy" />
                </span>
                {f.text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Skin concern matcher */}
      <section className="py-16 bg-white" aria-labelledby="matcher-heading">
        <div className="container-site">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 id="matcher-heading" className="font-serif text-[clamp(1.6rem,3vw,2.3rem)] mb-2.5">{t('matcherTitle')}</h2>
              <p className="text-text-mid max-w-130 mx-auto text-[.95rem] leading-[1.7]">
                {t('matcherSubtitle')}
              </p>
            </div>
          </ScrollReveal>
          <SkinConcernMatcher />
        </div>
      </section>

      {/* Full product catalog */}
      <section className="py-20 max-md:py-14" aria-labelledby="catalog-heading">
        <div className="container-site">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 id="catalog-heading" className="font-serif text-[clamp(1.6rem,3vw,2.3rem)] mb-2.5">{t('catalogTitle')}</h2>
              <p className="text-text-mid max-w-130 mx-auto text-[.95rem] leading-[1.7]">
                {t('catalogSubtitle')}
              </p>
            </div>
          </ScrollReveal>
          <ProductShowcase />
        </div>
      </section>

      {/* Curated bundles — package deals */}
      <section className="py-20 max-md:py-14 bg-cream/40 border-y border-border" aria-labelledby="bundles-heading">
        <div className="container-site">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block text-[.68rem] font-bold uppercase tracking-[2px] text-navy mb-3 bg-navy-pale px-3 py-1 rounded-full">
                Save more · Better results
              </span>
              <h2 id="bundles-heading" className="font-serif text-[clamp(1.6rem,3vw,2.3rem)] mb-2.5">
                Curated Bundles
              </h2>
              <p className="text-text-mid max-w-150 mx-auto text-[.95rem] leading-[1.7]">
                Pre-built routines hand-selected by Marta — every product chosen to amplify the next. Save up to 16% versus buying individually.
              </p>
            </div>
          </ScrollReveal>
          <PackageDeals />
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white" aria-labelledby="how-heading">
        <div className="container-site">
          <ScrollReveal>
            <h2 id="how-heading" className="font-serif text-[1.6rem] text-center mb-10">{t('howHeading')}</h2>
            <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
              {[
                { num: '01', title: t('how.clinician.title'), desc: t('how.clinician.desc') },
                { num: '02', title: t('how.treatmentPaired.title'), desc: t('how.treatmentPaired.desc') },
                { num: '03', title: t('how.ingredient.title'), desc: t('how.ingredient.desc') },
              ].map((item) => (
                <div key={item.num} className="bg-white rounded-2xl p-8 border border-border">
                  <div className="font-serif text-[2rem] text-navy/20 mb-3">{item.num}</div>
                  <h3 className="font-serif text-[1.1rem] mb-2">{item.title}</h3>
                  <p className="text-text-mid text-[.85rem] leading-[1.7]">{item.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Ingredient philosophy */}
      <section className="py-20 max-md:py-14" aria-labelledby="philosophy-heading">
        <div className="container-site">
          <ScrollReveal>
            <div className="grid grid-cols-[1.2fr_1fr] gap-16 items-center max-lg:grid-cols-1">
              <div>
                <span className="inline-block text-[.68rem] font-bold uppercase tracking-[2px] text-navy mb-3 bg-navy-pale px-3 py-1 rounded-full">
                  {t('scienceTag')}
                </span>
                <h2 id="philosophy-heading" className="font-serif text-[1.9rem] mb-4 leading-[1.2]">
                  {t('ingredientHeading')}
                </h2>
                <p className="text-text-mid mb-4 text-[.92rem]/[1.85]">
                  {t.rich('ingredient.p1', { strong: (chunks) => <strong>{chunks}</strong> })}
                </p>
                <p className="text-text-mid mb-4 text-[.92rem]/[1.85]">
                  {t('ingredient.p2')}
                </p>
                <p className="text-text-mid text-[.92rem]/[1.85]">
                  {t('ingredient.p3')}
                </p>
              </div>
              <div className="relative">
                <div className="rounded-2xl aspect-4/3 relative overflow-hidden shadow-md border border-border">
                  <Image
                    src="/images/Radiance_Peptide_Serum_Benefits_Lifestyle.jpeg"
                    alt="Radiance Peptide Serum with Hyaluronic Acid — clinical benefits breakdown showing deep hydration, smoothing, collagen support, and gentle daily-use formula"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white border border-border rounded-full py-1.5 px-4 shadow-sm flex items-center gap-2 whitespace-nowrap">
                  <span className="text-[.62rem] font-bold text-navy tracking-[1.5px] uppercase">{t('ampuleTech')}</span>
                  <span className="w-1 h-1 bg-navy/30 rounded-full" aria-hidden="true" />
                  <span className="text-[.62rem] font-semibold text-text-mid">Germany · Spain · Switzerland · Italy</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CtaBanner
        heading={t('ctaHeading')}
        subtitle={t('ctaSubtitle')}
        buttonText={t('ctaButton')}
      />
    </PageShell>
  );
}
