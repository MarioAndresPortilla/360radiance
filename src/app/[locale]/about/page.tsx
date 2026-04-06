import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { CREDENTIALS } from '@/lib/constants';
import { PageShell } from '@/components/layout/PageShell';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Icon, type IconName } from '@/components/icons/Icons';
import { IconDiploma } from '@/components/icons/Icons';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: 'About Marta Nazzar',
    description: t('pageSubtitle'),
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <PageShell>
      <PageHeader
        tag={t('tag')}
        title={`${t('titleText')} ${t('titleHighlight')}`}
        subtitle={t('pageSubtitle')}
      />

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
                  <div className="w-8 h-8 bg-gold-pale rounded-2.5 flex items-center justify-center" aria-hidden="true">
                    <IconDiploma size={18} className="text-gold-dark" />
                  </div>
                  <div className="text-[.7rem] font-semibold text-teal">
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
                <p className="text-text-mid leading-[1.85] mb-4 text-[.92rem]">{t('p1')}</p>
                <p className="text-text-mid leading-[1.85] mb-4 text-[.92rem]">{t('p2')}</p>
                <p className="text-text-mid leading-[1.85] mb-4 text-[.92rem]">{t('p3')}</p>
                <p className="text-text-mid leading-[1.85] mb-4 text-[.92rem]">{t('p4')}</p>
                <p className="text-text-mid leading-[1.85] text-[.92rem]">{t('p5')}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-16 bg-cream" aria-labelledby="cred-heading">
        <div className="container-site">
          <ScrollReveal>
            <h2 id="cred-heading" className="font-serif text-[1.6rem] text-center mb-10">{t('credentialsHeading')}</h2>
          </ScrollReveal>
          <div className="grid grid-cols-6 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2">
            {CREDENTIALS.map((cred) => (
              <ScrollReveal key={cred.label}>
                <div className="bg-white rounded-2xl p-6 text-center border border-border hover:border-border-hover hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-teal-pale rounded-xl flex items-center justify-center mx-auto mb-3" aria-hidden="true">
                    <Icon name={cred.icon as IconName} size={24} className="text-teal" />
                  </div>
                  <div className="font-semibold text-[.82rem]">{cred.label}</div>
                </div>
              </ScrollReveal>
            ))}
            <ScrollReveal>
              <div className="bg-white rounded-2xl p-6 text-center border border-border hover:border-border-hover hover:shadow-md transition-all flex items-center justify-center">
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
