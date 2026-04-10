import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { SERVICE_DETAILS, ACNE_PROGRAM_PRICING, ACNE_PROGRAM_CONTRAINDICATIONS, FRESHA } from '@/lib/constants';
import { buildPageMetadata } from '@/lib/seo';
import { PageShell } from '@/components/layout/PageShell';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Icon, type IconName } from '@/components/icons/Icons';
import { IconCheck } from '@/components/icons/Icons';
import { cn } from '@/lib/utils';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  return buildPageMetadata({
    locale,
    path: '/services',
    title: t('pageTitle'),
    description: t('pageSubtitle'),
  });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('services');

  return (
    <PageShell>
      <PageHeader
        tag={t('tag')}
        title={t('title')}
        subtitle={t('pageSubtitle')}
      />

      {/* Pricing overview */}
      <section className="bg-white border-b border-border py-10">
        <div className="container-site">
          <ScrollReveal>
            <div className="grid grid-cols-4 gap-6 max-md:grid-cols-2 text-center">
              <div>
                <div className="font-serif text-[1.8rem] text-navy">{t('free')}</div>
                <div className="text-[.78rem] text-text-mid mt-1">{t('consultation')}</div>
              </div>
              <div>
                <div className="font-serif text-[1.8rem] text-navy">${ACNE_PROGRAM_PRICING.acneFacial}</div>
                <div className="text-[.78rem] text-text-mid mt-1">{t('acneFacial')}</div>
              </div>
              <div>
                <div className="font-serif text-[1.8rem] text-navy">~${ACNE_PROGRAM_PRICING.homeCareProducts}</div>
                <div className="text-[.78rem] text-text-mid mt-1">{t('homeCare')}</div>
              </div>
              <div>
                <div className="font-serif text-[1.8rem] text-gold-a11y">${ACNE_PROGRAM_PRICING.totalStarting}</div>
                <div className="text-[.78rem] text-text-mid mt-1">{t('totalStarting')}</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 max-md:py-16">
        <div className="container-site">
          <div className="flex flex-col gap-24 max-md:gap-16">
            {SERVICE_DETAILS.map((svc, i) => (
              <ScrollReveal key={svc.slug}>
                <div id={svc.slug} className="scroll-mt-24">
                  <div className={cn(
                    'grid grid-cols-[1fr_1.2fr] gap-16 max-lg:gap-10 items-start max-lg:grid-cols-1',
                    i % 2 === 1 && 'max-lg:flex max-lg:flex-col'
                  )}>
                    <div className={cn(i % 2 === 1 && 'max-lg:order-none lg:order-2')}>
                      <div className="flex items-center gap-4 mb-5">
                        <div className={cn(
                          'w-14 h-14 rounded-2xl flex items-center justify-center',
                          svc.featured ? 'bg-navy/12' : 'bg-navy-pale'
                        )} aria-hidden="true">
                          <Icon name={svc.icon as IconName} size={26} className="text-navy" />
                        </div>
                        <div>
                          <span className="inline-block bg-navy-pale text-navy py-1 px-3 rounded-lg text-[.62rem] font-bold uppercase tracking-[.5px] mb-1.5">
                            {svc.tag}
                          </span>
                          <h2 className="font-serif text-[1.5rem] leading-tight">{svc.title}</h2>
                        </div>
                      </div>
                      <p className="text-navy font-medium text-[.95rem] mb-6">{svc.tagline}</p>
                      {svc.description.map((p, j) => (
                        <p key={j} className="text-text-mid mb-5 text-[.92rem]/[1.85]">{p}</p>
                      ))}

                      {/* Contraindications for acne program */}
                      {svc.slug === 'acne-treatment-program' && (
                        <div className="bg-gold-highlight border border-gold-light/30 rounded-2xl p-6 mt-6">
                          <h3 className="font-serif text-[1rem] text-gold-a11y mb-3">{t('contraindicationsTitle')}</h3>
                          <ul className="flex flex-col gap-2.5 list-none">
                            {ACNE_PROGRAM_CONTRAINDICATIONS.map((item) => (
                              <li key={item} className="flex items-start gap-2.5 text-[.82rem] text-gold-a11y/80 leading-[1.6]">
                                <span className="w-1.5 h-1.5 rounded-full bg-gold-dark mt-2 shrink-0" aria-hidden="true" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {svc.slug === 'free-consultation' ? (
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1.5 bg-navy text-white rounded-xl font-semibold text-[.88rem] px-7 py-3.5 transition-all hover:bg-navy-deep hover:-translate-y-px hover:shadow-md no-underline mt-6"
                        >
                          {t('bookConsultation')}
                        </Link>
                      ) : (
                        <a
                          href={FRESHA.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-navy text-white rounded-xl font-semibold text-[.88rem] px-7 py-3.5 transition-all hover:bg-navy-deep hover:-translate-y-px hover:shadow-md no-underline mt-6"
                        >
                          {t('bookTreatment')}
                        </a>
                      )}
                    </div>

                    <div className={cn(i % 2 === 1 && 'max-lg:order-none lg:order-1')}>
                      <div className="bg-cream rounded-2xl p-8 max-md:p-6 overflow-hidden">
                        {svc.image && (
                          <div className="relative aspect-4/3 rounded-xl overflow-hidden mb-6 -mx-2 -mt-2 shadow-sm border border-border">
                            <Image
                              src={svc.image}
                              alt={svc.imageAlt ?? svc.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) 100vw, 45vw"
                            />
                          </div>
                        )}
                        <h3 className="font-serif text-[1.1rem] mb-5">
                          {svc.slug === 'acne-treatment-program' ? t('programIncludes') : t('benefits')}
                        </h3>
                        <ul className="flex flex-col gap-3.5 list-none mb-8">
                          {svc.benefits.map((b) => (
                            <li key={b} className="flex items-start gap-3 text-[.88rem] text-text-mid">
                              <span className="w-5.5 h-5.5 rounded-lg bg-navy-pale flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                                <IconCheck size={13} className="text-navy" />
                              </span>
                              {b}
                            </li>
                          ))}
                        </ul>

                        {/* Bi-weekly visit pricing for acne program */}
                        {svc.slug === 'acne-treatment-program' && (
                          <div className="bg-white rounded-xl p-5 mb-6 border border-border">
                            <div className="text-[.78rem] font-semibold text-text mb-2">{t('biWeekly')}</div>
                            <div className="flex items-baseline gap-1">
                              <span className="font-serif text-[1.5rem] text-navy">${ACNE_PROGRAM_PRICING.biWeeklyVisit}</span>
                              <span className="text-[.78rem] text-text-light">{t('perVisit')}</span>
                            </div>
                            <p className="text-[.75rem] text-text-mid mt-2 leading-[1.6]">
                              {t('biWeeklyDesc')}
                            </p>
                          </div>
                        )}

                        <h3 className="font-serif text-[1.1rem] mb-4">{t('idealFor')}</h3>
                        <div className="flex flex-wrap gap-2.5">
                          {svc.idealFor.map((item) => (
                            <span key={item} className="bg-navy-pale text-navy-deep py-2 px-3.5 rounded-lg text-[.72rem] font-semibold">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {i < SERVICE_DETAILS.length - 1 && (
                    <hr className="border-border mt-24 max-md:mt-16" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        heading={t('ctaHeading')}
        subtitle={t('ctaSubtitle')}
        buttonText={t('ctaButton')}
        secondaryText={t('ctaBookTreatment')}
        secondaryHref={FRESHA.url}
      />
    </PageShell>
  );
}
