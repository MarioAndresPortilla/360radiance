import { SERVICES } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Icon, type IconName } from '@/components/icons/Icons';
import { cn } from '@/lib/utils';

export function ServicesSection() {
  return (
    <section className="py-20 max-md:py-14 bg-cream" id="services" aria-labelledby="services-heading">
      <div className="max-w-300 mx-auto px-8 max-md:px-5">
        <ScrollReveal>
          <SectionHeader
            id="services-heading"
            tag="Our Services"
            title="Expert Skincare Treatments"
            subtitle="Every treatment is tailored to your unique skin type and concerns."
          />
        </ScrollReveal>
        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1" role="list">
          {SERVICES.map((svc) => (
            <ScrollReveal key={svc.title}>
              <article
                role="listitem"
                className={cn(
                  'bg-white border rounded-2xl p-7 transition-all duration-300 cursor-pointer relative hover:border-teal hover:shadow-md',
                  svc.featured ? 'border-teal bg-teal-bg' : 'border-border'
                )}
              >
                {svc.featured && (
                  <span className="absolute -top-2.5 right-4 bg-gold text-white text-[.58rem] font-bold py-1 px-2.5 rounded-full uppercase tracking-[.5px]">
                    Most Popular
                  </span>
                )}
                <div className={cn(
                  'w-11 h-11 rounded-xl flex items-center justify-center mb-3',
                  svc.featured ? 'bg-teal/12' : 'bg-teal-pale'
                )} aria-hidden="true">
                  <Icon name={svc.icon as IconName} size={22} className="text-teal" />
                </div>
                <h3 className="font-serif text-base mb-1.5">{svc.title}</h3>
                <p className="text-text-mid text-[.82rem] leading-[1.7] mb-3">{svc.description}</p>
                <span className="inline-block bg-teal-pale text-teal py-0.5 px-2 rounded-md text-[.6rem] font-bold uppercase tracking-[.5px]">
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
