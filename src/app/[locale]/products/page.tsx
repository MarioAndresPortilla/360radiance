import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageShell } from '@/components/layout/PageShell';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { IconCheck, IconDropper } from '@/components/icons/Icons';
import { PRODUCT_FEATURES } from '@/lib/constants';
import { ProductShowcase } from './ProductShowcase';
import { SkinConcernMatcher } from './SkinConcernMatcher';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products' });
  return {
    title: 'Products',
    description: t('pageSubtitle'),
  };
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
                <span className="w-5 h-5 rounded-md bg-teal-pale flex items-center justify-center shrink-0" aria-hidden="true">
                  <IconCheck size={12} className="text-teal" />
                </span>
                {f.text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Skin concern matcher */}
      <section className="py-16 bg-cream" aria-labelledby="matcher-heading">
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
      <section className="py-16 bg-cream" aria-labelledby="how-heading">
        <div className="container-site">
          <ScrollReveal>
            <h2 id="how-heading" className="font-serif text-[1.6rem] text-center mb-10">How Our Products Are Different</h2>
            <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
              {[
                {
                  num: '01',
                  title: 'Clinician-Formulated',
                  desc: 'Every product is created by Marta Nazzar — not a marketing team. Formulas are built on 25+ years of medical expertise and real clinical outcomes.',
                },
                {
                  num: '02',
                  title: 'Treatment-Paired',
                  desc: 'Products are designed to extend and amplify your in-office results. Each is calibrated to work with our professional treatment protocols.',
                },
                {
                  num: '03',
                  title: 'Ingredient-First',
                  desc: 'We select actives based on clinical research — not trends. European-sourced, glass ampule-sealed, and concentrated for maximum efficacy.',
                },
              ].map((item) => (
                <div key={item.num} className="bg-white rounded-2xl p-8 border border-border">
                  <div className="font-serif text-[2rem] text-teal/20 mb-3">{item.num}</div>
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
                <span className="inline-block text-[.68rem] font-bold uppercase tracking-[2px] text-teal mb-3 bg-teal-pale px-3 py-1 rounded-full">
                  The Science
                </span>
                <h2 id="philosophy-heading" className="font-serif text-[1.9rem] mb-4 leading-[1.2]">
                  Why Ingredients Matter More Than Brands
                </h2>
                <p className="text-text-mid leading-[1.85] mb-4 text-[.92rem]">
                  The skincare industry spends billions on packaging and marketing. We spend ours on ingredients. Every formula in the Radiance Collection starts with a single question: <strong>what does the clinical data say?</strong>
                </p>
                <p className="text-text-mid leading-[1.85] mb-4 text-[.92rem]">
                  Our European glass ampule serums contain 4-10x higher concentrations of active ingredients than their retail counterparts. Single-use packaging eliminates oxidation — meaning every drop is as potent as the day it was formulated.
                </p>
                <p className="text-text-mid leading-[1.85] text-[.92rem]">
                  We publish every key ingredient and its clinical benefit because we believe informed clients make better skincare decisions. No proprietary blends hiding behind fancy names — just transparent, evidence-based formulas.
                </p>
              </div>
              <div className="bg-teal-pale rounded-2xl aspect-4/3 flex items-center justify-center flex-col gap-4" role="img" aria-label="Radiance Skin Care product line">
                <IconDropper size={64} className="text-teal" aria-hidden="true" />
                <span className="text-[.65rem] font-bold text-teal tracking-[2px] uppercase">European Glass Ampule Technology</span>
                <div className="flex gap-3 mt-2">
                  {['Germany', 'Spain', 'Switzerland', 'Italy'].map((c) => (
                    <span key={c} className="bg-white/70 text-teal-dark text-[.6rem] font-semibold py-1 px-2.5 rounded-full">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CtaBanner
        heading="Not Sure Which Products Are Right for You?"
        subtitle="Book a free skin analysis. Marta will design a personalized regimen with products tailored to your skin's specific needs."
        buttonText="Get Your Custom Regimen"
      />
    </PageShell>
  );
}
