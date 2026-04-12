import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { CREDENTIALS } from '@/lib/constants';
import { buildPageMetadata } from '@/lib/seo';
import { PageShell } from '@/components/layout/PageShell';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Icon, type IconName } from '@/components/icons/Icons';
import { IconDiploma } from '@/components/icons/Icons';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return buildPageMetadata({
    locale,
    path: '/about',
    title: locale === 'es' ? 'Acerca de Marta Nazzar' : 'About Marta Nazzar',
    description: t('pageSubtitle'),
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <PageShell>
      {/* Editorial hero with full-bleed background image of Marta — replaces the
          stock PageHeader on this page only. Visual signal that the about page
          is the "story" page; everywhere else still uses the flat PageHeader.
          The image is positioned right-of-center on desktop so the headline
          column has a dark gradient backdrop for AAA contrast. On mobile the
          gradient covers the full image. */}
      <section className="relative bg-navy-deep overflow-hidden" aria-labelledby="about-hero-heading">
        <div className="absolute inset-0">
          <Image
            src="/images/marta-nazzar.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_top] lg:object-[70%_25%] opacity-55 lg:opacity-75"
          />
          {/* Mobile: dark wash across whole image. Desktop: left-side gradient
              so the headline copy on the left always has high contrast even
              while the photo dominates the right half. */}
          <div className="absolute inset-0 bg-navy-deep/65 lg:bg-linear-to-r lg:from-navy-deep lg:via-navy-deep/85 lg:to-navy-deep/10" aria-hidden="true" />
        </div>
        <div className="relative container-site py-28 max-md:py-20">
          <ScrollReveal>
            <div className="max-w-2xl">
              <span className="inline-block text-[.65rem] font-bold uppercase tracking-[2.5px] text-gold-light mb-5 bg-white/8 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
                {t('tag')}
              </span>
              <h1 id="about-hero-heading" className="font-serif text-[clamp(2.2rem,4.5vw,3.4rem)] leading-[1.12] mb-5 text-white">
                {t('titleText')} <span className="text-gold-light">{t('titleHighlight')}</span>
              </h1>
              <p className="text-white/80 max-w-130 text-[1.02rem] leading-[1.8]">{t('pageSubtitle')}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Main bio */}
      <section className="py-20 max-md:py-14" aria-labelledby="bio-heading">
        <div className="container-site">
          <div className="grid grid-cols-[1fr_1.4fr] gap-16 items-start max-lg:grid-cols-1">
            <ScrollReveal>
              <div className="relative max-lg:max-w-75 max-lg:mx-auto">
                <div className="rounded-2xl overflow-hidden aspect-3/4 shadow-md relative">
                  <Image
                    src="/images/marta-nazzar.jpg"
                    alt="Marta Nazzar, Licensed Paramedical Aesthetician"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 300px, 35vw"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl py-3 px-4 shadow-lg flex items-center gap-2">
                  <div className="w-8 h-8 bg-gold-highlight rounded-2.5 flex items-center justify-center" aria-hidden="true">
                    <IconDiploma size={18} className="text-gold-dark" />
                  </div>
                  <div className="text-[.7rem] font-semibold text-navy">
                    {t('yearsBadge')}
                    <span className="block font-normal text-text-light text-[.6rem]">{t('yearsBadgeSub')}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div>
                <h2 id="bio-heading" className="sr-only">{t('bioHeadingSr')}</h2>
                <h3 className="font-serif text-[1.6rem] mb-4 leading-[1.2]">{t('bioHeading')}</h3>
                <p className="text-text-mid mb-4 text-[.92rem]/[1.85]">{t('p1')}</p>
                <p className="text-text-mid mb-4 text-[.92rem]/[1.85]">{t('p2')}</p>
                <p className="text-text-mid text-[.92rem]/[1.85]">{t('p3')}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-16 bg-white" aria-labelledby="cred-heading">
        <div className="container-site">
          <ScrollReveal>
            <h2 id="cred-heading" className="font-serif text-[1.6rem] text-center mb-10">{t('credentialsHeading')}</h2>
          </ScrollReveal>
          <div className="grid grid-cols-6 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2">
            {CREDENTIALS.map((cred) => (
              <ScrollReveal key={cred.label}>
                <div className="bg-white rounded-2xl p-6 text-center border border-border hover:border-navy/20 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <div className="w-12 h-12 bg-navy-pale rounded-xl flex items-center justify-center mx-auto mb-3" aria-hidden="true">
                    <Icon name={cred.icon as IconName} size={24} className="text-navy" />
                  </div>
                  <div className="font-semibold text-[.82rem]">{cred.label}</div>
                </div>
              </ScrollReveal>
            ))}
            <ScrollReveal>
              <div className="bg-white rounded-2xl p-6 text-center border border-border hover:border-navy/20 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center">
                <Image
                  src="/images/ascp-member.png"
                  alt="Associated Skin Care Professionals Member"
                  width={100}
                  height={60}
                  className="object-contain"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 max-md:py-14" aria-labelledby="philosophy-heading">
        <div className="container-site">
          <ScrollReveal>
            <div className="max-w-175 mx-auto">
              <h2 id="philosophy-heading" className="font-serif text-[1.6rem] text-center mb-8">{t('philosophyHeading')}</h2>
              <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
                {[
                  { title: t('philosophy.scienceFirst.title'), desc: t('philosophy.scienceFirst.desc') },
                  { title: t('philosophy.personalized.title'), desc: t('philosophy.personalized.desc') },
                  { title: t('philosophy.cleanIngredients.title'), desc: t('philosophy.cleanIngredients.desc') },
                  { title: t('philosophy.longTerm.title'), desc: t('philosophy.longTerm.desc') },
                ].map((item) => (
                  <div key={item.title} className="bg-cream rounded-2xl p-6">
                    <h3 className="font-serif text-[1rem] mb-2">{item.title}</h3>
                    <p className="text-text-mid text-[.85rem] leading-[1.7]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CtaBanner
        heading={t('ctaHeading')}
        subtitle={t('ctaSubtitle')}
      />
    </PageShell>
  );
}
