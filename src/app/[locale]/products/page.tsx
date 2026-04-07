import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageShell } from '@/components/layout/PageShell';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { IconCheck } from '@/components/icons/Icons';
import { PRODUCT_FEATURES } from '@/lib/constants';
import { buildPageMetadata } from '@/lib/seo';
import { ProductShowcase } from './ProductShowcase';
import { SkinConcernMatcher } from './SkinConcernMatcher';

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
      <PageHeader
        tag={t('pageTag')}
        title={t('pageTitle')}
        subtitle={t('pageSubtitle')}
      />

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

      {/* How it works */}
      <section className="py-16 bg-white" aria-labelledby="how-heading">
        <div className="container-site">
          <ScrollReveal>
            <h2 id="how-heading" className="font-serif text-[1.6rem] text-center mb-10">{t('howHeading')}</h2>
            <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
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
                    src="/images/instagram/product-line-natural.jpg"
                    alt="The full Radiance Skin Care product line — 100% natural botanical formulas"
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
