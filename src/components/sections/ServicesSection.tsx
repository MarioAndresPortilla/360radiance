import { SERVICES } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Icon, type IconName } from '@/components/icons/Icons';
import { cn } from '@/lib/utils';

export function ServicesSection() {
  return (
    <section className="py-24 max-md:py-16 bg-cream" id="services" aria-labelledby="services-heading">
      <div className="max-w-300 mx-auto px-8 max-md:px-5">
        <ScrollReveal>
          <SectionHeader
            id="services-heading"
            tag="Our Services"
            title="Expert Skincare Treatments"
            subtitle="Every treatment is tailored to your unique skin type and concerns."
          />
        </ScrollReveal>
        <div className="grid grid-cols-3 gap-7 max-lg:grid-cols-2 max-lg:gap-6 max-md:grid-cols-1 max-md:gap-5" role="list">
          {SERVICES.map((svc) => (
            <ScrollReveal key={svc.title}>
              <article
                role="listitem"
                className={cn(
                  'bg-white border rounded-2xl p-8 max-md:p-6 transition-all duration-300 cursor-pointer relative hover:border-teal hover:shadow-md',
                  svc.featured ? 'border-teal bg-teal-bg' : 'border-border'
                )}
              >
                {svc.featured && (
                  <span className="absolute -top-3 right-5 bg-gold text-white text-[.6rem] font-bold py-1 px-3 rounded-full uppercase tracking-[.5px]">
                    Most Popular
                  </span>
                )}
                <div className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
                  svc.featured ? 'bg-teal/12' : 'bg-teal-pale'
                )} aria-hidden="true">
                  <Icon name={svc.icon as IconName} size={22} className="text-teal" />
                </div>
                <h3 className="font-serif text-[1.05rem] mb-2">{svc.title}</h3>
                <p className="text-text-mid text-[.85rem] leading-[1.75] mb-4">{svc.description}</p>
                <span className="inline-block bg-teal-pale text-teal py-1 px-3 rounded-lg text-[.65rem] font-bold uppercase tracking-[.5px]">
                  {svc.tag}
                </span>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
