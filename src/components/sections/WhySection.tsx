import { WHY_CARDS } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Icon, type IconName } from '@/components/icons/Icons';

export function WhySection() {
  return (
    <section className="py-24 max-md:py-16" aria-labelledby="why-heading">
      <div className="max-w-300 mx-auto px-8 max-md:px-5">
        <ScrollReveal>
          <SectionHeader
            id="why-heading"
            tag="Why 360 Radiance"
            title="A Different Kind of Skincare Practice"
            subtitle="Marta combines medical expertise with personalized care to deliver results that store-bought products can't."
          />
        </ScrollReveal>
        <div className="grid grid-cols-3 gap-7 max-lg:grid-cols-2 max-lg:gap-6 max-md:grid-cols-1 max-md:gap-5" role="list">
          {WHY_CARDS.map((card) => (
            <ScrollReveal key={card.title}>
              <article className="group bg-white border border-border rounded-2xl p-8 max-md:p-6 transition-all duration-300 relative hover:border-border-hover hover:shadow-md hover:-translate-y-0.75" role="listitem">
                <div className="absolute top-0 left-6 right-6 h-0.5 bg-teal rounded-b-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${card.iconTheme === 'teal' ? 'bg-teal-pale' : 'bg-gold-pale'}`} aria-hidden="true">
                  <Icon name={card.icon as IconName} size={26} className={card.iconTheme === 'teal' ? 'text-teal' : 'text-gold-dark'} />
                </div>
                <h3 className="font-serif text-[1.15rem] mb-3">{card.title}</h3>
                <p className="text-text-mid text-[.88rem] leading-[1.75]">{card.description}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
