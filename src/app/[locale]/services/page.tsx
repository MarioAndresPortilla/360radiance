import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { SERVICE_DETAILS, ACNE_PROGRAM_PRICING, ACNE_PROGRAM_CONTRAINDICATIONS } from '@/lib/constants';
import { buildPageMetadata } from '@/lib/seo';
import { PageShell } from '@/components/layout/PageShell';
import { CtaBanner } from '@/components/ui/CtaBanner';
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
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative bg-navy overflow-hidden py-24 max-md:py-16">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/[.04]" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="absolute top-1/2 -left-24 w-80 h-80 rounded-full bg-gold/[.04]" />
        </div>

        <div className="container-site relative z-1 text-center">
          <ScrollReveal>
            <span className="inline-block text-[.65rem] font-bold uppercase tracking-[2.5px] text-gold mb-5 bg-white/8 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
              {t('tag')}
            </span>
            <h1 className="font-serif text-white text-[clamp(2.2rem,4.5vw,3.4rem)] leading-[1.12] mb-5">
              {t('title')}
            </h1>
            <p className="text-white/80 text-[1.02rem] leading-[1.8] max-w-130 mx-auto">
              {t('pageSubtitle')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Pricing overview — elevated cards ────────────────────── */}
      <section className="relative z-10 -mt-8 max-md:-mt-6 mb-8">
        <div className="container-site">
          <ScrollReveal>
            <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2">
              {[
                { value: t('free'), label: t('consultation'), accent: false },
                { value: `$${ACNE_PROGRAM_PRICING.acneFacial}`, label: t('acneFacial'), accent: false },
                { value: `~$${ACNE_PROGRAM_PRICING.homeCareProducts}`, label: t('homeCare'), accent: false },
                { value: `$${ACNE_PROGRAM_PRICING.totalStarting}`, label: t('totalStarting'), accent: true },
              ].map((item) => (
                <div
                  key={item.label}
                  className={cn(
                    'rounded-2xl p-5 text-center shadow-lg ring-1 ring-black/[.06] transition-all hover:-translate-y-0.5 hover:shadow-xl',
                    item.accent
                      ? 'bg-navy text-white'
                      : 'bg-white'
                  )}
                >
                  <div className={cn(
                    'font-serif text-[1.6rem] max-md:text-[1.3rem] leading-tight',
                    item.accent ? 'text-gold' : 'text-navy'
                  )}>
                    {item.value}
                  </div>
                  <div className={cn(
                    'text-[.72rem] font-semibold uppercase tracking-[.5px] mt-1.5',
                    item.accent ? 'text-white/70' : 'text-text-mid'
                  )}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Service details ──────────────────────────────────────── */}
      {SERVICE_DETAILS.map((svc, i) => (
        <section
          key={svc.slug}
          id={svc.slug}
          className={cn(
            'scroll-mt-24 py-16 max-md:py-10',
            i % 2 === 0 ? 'bg-white' : 'bg-cream'
          )}
        >
          <div className="container-site">
            <ScrollReveal>
              <div className={cn(
                'grid grid-cols-[1fr_1.15fr] gap-12 max-lg:gap-8 items-start max-lg:grid-cols-1',
                i % 2 === 1 && 'max-lg:flex max-lg:flex-col'
              )}>
                {/* ── Text column ── */}
                <div className={cn(i % 2 === 1 && 'max-lg:order-none lg:order-2')}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
                      svc.featured ? 'bg-navy text-white' : 'bg-navy-pale'
                    )} aria-hidden="true">
                      <Icon name={svc.icon as IconName} size={22} className={svc.featured ? 'text-gold' : 'text-navy'} />
                    </div>
                    <div>
                      <span className={cn(
                        'inline-block py-0.5 px-2.5 rounded-md text-[.6rem] font-bold uppercase tracking-[.5px] mb-1',
                        svc.featured
                          ? 'bg-gold/15 text-gold-a11y'
                          : 'bg-navy-pale text-navy'
                      )}>
                        {svc.tag}
                      </span>
                      <h2 className="font-serif text-[1.4rem] leading-tight">{svc.title}</h2>
                    </div>
                  </div>

                  <p className="text-navy font-medium text-[.92rem] mb-4 leading-[1.7]">{svc.tagline}</p>

                  {svc.description.map((p, j) => (
                    <p key={j} className="text-text-mid mb-3.5 text-[.88rem]/[1.8]">{p}</p>
                  ))}

                  {/* Contraindications for acne program */}
                  {svc.slug === 'acne-treatment-program' && (
                    <div className="bg-gold-highlight border border-gold-light/30 rounded-xl p-5 mt-4">
                      <h3 className="font-serif text-[.95rem] text-gold-a11y mb-2.5">{t('contraindicationsTitle')}</h3>
                      <ul className="flex flex-col gap-2 list-none">
                        {ACNE_PROGRAM_CONTRAINDICATIONS.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-[.78rem] text-gold-a11y/80 leading-[1.6]">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-dark mt-2 shrink-0" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Link
                    href="/contact"
                    className={cn(
                      'inline-flex items-center gap-2 rounded-xl font-semibold text-[.85rem] px-7 py-3.5 transition-all hover:-translate-y-px hover:shadow-md no-underline mt-5',
                      svc.featured
                        ? 'bg-gold text-navy hover:bg-gold-light'
                        : 'bg-navy text-white hover:bg-navy-deep'
                    )}
                  >
                    {svc.slug === 'free-consultation' ? t('bookConsultation') : t('bookTreatment')}
                  </Link>
                </div>

                {/* ── Card column ── */}
                <div className={cn(i % 2 === 1 && 'max-lg:order-none lg:order-1')}>
                  <div className={cn(
                    'rounded-2xl overflow-hidden border',
                    svc.featured
                      ? 'bg-navy-bg border-navy/10 shadow-lg ring-1 ring-navy/[.06]'
                      : 'bg-white border-border shadow-md'
                  )}>
                    {svc.image && (
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={svc.image}
                          alt={svc.imageAlt ?? svc.title}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 45vw"
                        />
                        {svc.featured && (
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
                        )}
                      </div>
                    )}
                    <div className="p-7 max-md:p-5">
                      <h3 className="font-serif text-[1.05rem] mb-4">
                        {svc.slug === 'acne-treatment-program' ? t('programIncludes') : t('benefits')}
                      </h3>
                      <ul className="flex flex-col gap-2.5 list-none mb-6">
                        {svc.benefits.map((b) => (
                          <li key={b} className="flex items-start gap-2.5 text-[.82rem] text-text-mid leading-[1.6]">
                            <span className={cn(
                              'w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5',
                              svc.featured ? 'bg-gold/15' : 'bg-navy-pale'
                            )} aria-hidden="true">
                              <IconCheck size={11} className={svc.featured ? 'text-gold-a11y' : 'text-navy'} />
                            </span>
                            {b}
                          </li>
                        ))}
                      </ul>

                      {/* Bi-weekly visit pricing for acne program */}
                      {svc.slug === 'acne-treatment-program' && (
                        <div className="bg-cream rounded-xl p-4 mb-5 border border-border">
                          <div className="text-[.75rem] font-semibold text-text mb-1.5">{t('biWeekly')}</div>
                          <div className="flex items-baseline gap-1">
                            <span className="font-serif text-[1.4rem] text-navy">${ACNE_PROGRAM_PRICING.biWeeklyVisit}</span>
                            <span className="text-[.72rem] text-text-light">{t('perVisit')}</span>
                          </div>
                          <p className="text-[.72rem] text-text-mid mt-1.5 leading-[1.5]">
                            {t('biWeeklyDesc')}
                          </p>
                        </div>
                      )}

                      <h3 className="font-serif text-[1rem] mb-3">{t('idealFor')}</h3>
                      <div className="flex flex-wrap gap-2">
                        {svc.idealFor.map((item) => (
                          <span key={item} className={cn(
                            'py-1.5 px-3 rounded-lg text-[.68rem] font-semibold',
                            svc.featured
                              ? 'bg-gold/10 text-gold-a11y'
                              : 'bg-navy-pale text-navy-deep'
                          )}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      ))}

      <CtaBanner
        heading={t('ctaHeading')}
        subtitle={t('ctaSubtitle')}
        buttonText={t('ctaButton')}
        secondaryText={t('ctaBookTreatment')}
        secondaryHref="/contact"
      />
    </PageShell>
  );
}
