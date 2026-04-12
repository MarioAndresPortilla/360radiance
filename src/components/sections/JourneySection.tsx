import { useTranslations } from 'next-intl';
import { JOURNEY_STEPS } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProgressBar } from '@/components/ui/ProgressBar';

export function JourneySection() {
  const t = useTranslations('results');
  return (
    <section className="py-14 max-md:py-10 bg-cream" id="results" aria-labelledby="results-heading">
      <div className="container-site">
        <ScrollReveal>
          <SectionHeader
            id="results-heading"
            tag={t('tag')}
            title={t('title')}
            subtitle={t('subtitle')}
          />
        </ScrollReveal>
        <ol className="grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-lg:gap-4 list-none">
          {JOURNEY_STEPS.map((step) => (
            <ScrollReveal key={step.number}>
              <li className="group bg-white border border-border rounded-2xl p-6 transition-all duration-300 hover:border-navy hover:shadow-md hover:-translate-y-0.5 h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md transition-shadow">
                  <span className="font-serif text-[1.2rem] text-gold leading-none">{step.number}</span>
                </div>
                <div className="text-[.6rem] font-bold uppercase tracking-[1.5px] text-gold-a11y mb-2">{step.weekLabel}</div>
                <h4 className="font-serif text-[.95rem] mb-2">{step.title}</h4>
                <p className="text-text-mid text-[.8rem] leading-[1.65] mb-auto">{step.description}</p>
                <div className="mt-3">
                  <ProgressBar targetWidth={step.progress} />
                  <div className="text-[.65rem] text-text-light mt-1 text-right font-medium">{step.progress}%</div>
                </div>
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
