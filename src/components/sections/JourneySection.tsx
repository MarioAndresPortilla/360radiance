import { useTranslations } from 'next-intl';
import { JOURNEY_STEPS } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProgressBar } from '@/components/ui/ProgressBar';

export function JourneySection() {
  const t = useTranslations('results');
  return (
    <section className="py-24 max-md:py-16 bg-cream" id="results" aria-labelledby="results-heading">
      <div className="container-site">
        <ScrollReveal>
          <SectionHeader
            id="results-heading"
            tag={t('tag')}
            title={t('title')}
            subtitle={t('subtitle')}
          />
        </ScrollReveal>
        <ol className="grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-lg:gap-5 list-none">
          {JOURNEY_STEPS.map((step) => (
            <ScrollReveal key={step.number}>
              <li className="bg-white border border-border rounded-2xl p-7 max-md:p-6 text-center transition-all duration-300 hover:border-navy hover:shadow-md">
                <div className="font-serif text-[1.8rem] text-navy mb-2" aria-hidden="true">{step.number}</div>
                <div className="text-[.62rem] font-bold uppercase tracking-[1.5px] text-gold-a11y mb-3">{step.weekLabel}</div>
                <h4 className="font-serif text-[.98rem] mb-2">{step.title}</h4>
                <p className="text-text-mid text-[.82rem] leading-[1.65]">{step.description}</p>
                <ProgressBar targetWidth={step.progress} />
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
