import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import { PageShell } from '@/components/layout/PageShell';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

// Section keys must match the structure under `terms.sections.*` in
// messages/en.json and messages/es.json. Adding a new section means adding it
// in BOTH locale files AND here — this list is the rendering order.
const SECTION_KEYS = [
  'acceptance',
  'services',
  'noMedicalAdvice',
  'booking',
  'contraindications',
  'results',
  'payments',
  'ip',
  'userConduct',
  'thirdParty',
  'liability',
  'indemnity',
  'law',
  'changes',
  'contact',
] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'terms' });
  return buildPageMetadata({
    locale,
    path: '/terms',
    title: t('title'),
    description: t('subtitle'),
  });
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('terms');

  return (
    <PageShell>
      <PageHeader tag={t('tag')} title={t('title')} subtitle={t('subtitle')} />

      <section className="py-16 max-md:py-12" aria-labelledby="terms-content-heading">
        <div className="container-site">
          <article className="max-w-175 mx-auto">
            <h2 id="terms-content-heading" className="sr-only">
              {t('title')}
            </h2>
            <ScrollReveal>
              <p className="text-[.82rem] text-text-light mb-8 italic">{t('lastUpdated')}</p>
              <p className="text-[.98rem] text-text leading-loose mb-12">{t('intro')}</p>
            </ScrollReveal>
            {SECTION_KEYS.map((key) => (
              <ScrollReveal key={key}>
                <section className="mb-10">
                  <h3 className="font-serif text-[1.4rem] mb-4">{t(`sections.${key}.heading`)}</h3>
                  <p className="text-[.95rem] text-text-mid leading-loose">
                    {t(`sections.${key}.body`)}
                  </p>
                </section>
              </ScrollReveal>
            ))}
          </article>
        </div>
      </section>
    </PageShell>
  );
}
