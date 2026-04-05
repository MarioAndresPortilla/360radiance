import { JOURNEY_STEPS } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProgressBar } from '@/components/ui/ProgressBar';

export function JourneySection() {
  return (
    <section className="py-20 max-md:py-14 bg-cream" id="results" aria-labelledby="results-heading">
      <div className="max-w-300 mx-auto px-8 max-md:px-5">
        <ScrollReveal>
          <SectionHeader
            id="results-heading"
            tag="Real Results"
            title="Your Clear Skin Journey"
            subtitle="What clients typically experience with the Face Reality program."
          />
        </ScrollReveal>
        <ol className="grid grid-cols-4 gap-5 max-lg:grid-cols-2 list-none">
          {JOURNEY_STEPS.map((step) => (
            <ScrollReveal key={step.number}>
              <li className="bg-white border border-border rounded-2xl p-6 text-center transition-all duration-300 hover:border-teal hover:shadow-md">
                <div className="font-serif text-[1.8rem] text-teal mb-1.5" aria-hidden="true">{step.number}</div>
                <div className="text-[.6rem] font-bold uppercase tracking-[1.5px] text-gold-dark mb-2.5">{step.weekLabel}</div>
                <h4 className="font-serif text-[.95rem] mb-1">{step.title}</h4>
                <p className="text-text-mid text-[.78rem] leading-[1.6]">{step.description}</p>
                <ProgressBar targetWidth={step.progress} />
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
