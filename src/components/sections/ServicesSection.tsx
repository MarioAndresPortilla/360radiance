import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { SERVICES } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Icon, type IconName } from '@/components/icons/Icons';
import { cn } from '@/lib/utils';

const FEATURED_COUNT = 8;

export function ServicesSection() {
  const t = useTranslations('services');
  const featured = SERVICES.slice(0, FEATURED_COUNT);

  return (
    <section className="py-24 max-md:py-16 bg-cream" id="services" aria-labelledby="services-heading">
      <div className="container-site">
        <ScrollReveal>
          <SectionHeader
            id="services-heading"
            tag={t('tag')}
            title={t('title')}
            subtitle={t('subtitle')}
          />
        </ScrollReveal>
        <div className="grid grid-cols-4 gap-5 max-lg:grid-cols-3 max-lg:gap-5 max-md:grid-cols-1 max-md:gap-4" role="list">
          {featured.map((svc) => (
            <ScrollReveal key={svc.title}>
              <article
                role="listitem"
                className={cn(
                  'bg-white border rounded-2xl p-6 transition-all duration-300 relative hover:border-teal hover:shadow-md h-full',
                  svc.featured ? 'border-teal bg-teal-bg' : 'border-border'
                )}
              >
                {svc.featured && (
                  <span className="absolute -top-3 right-5 bg-gold text-white text-[.6rem] font-bold py-1 px-3 rounded-full uppercase tracking-[.5px]">
                    Signature
                  </span>
                )}
                <div className={cn(
                  'w-11 h-11 rounded-xl flex items-center justify-center mb-3',
                  svc.featured ? 'bg-teal/12' : 'bg-teal-pale'
                )} aria-hidden="true">
                  <Icon name={svc.icon as IconName} size={20} className="text-teal" />
                </div>
                <h3 className="font-serif text-[.98rem] mb-1.5">{svc.title}</h3>
                <p className="text-text-mid text-[.82rem] leading-[1.7] mb-3">{svc.description}</p>
                <span className="inline-block bg-teal-pale text-teal py-1 px-3 rounded-lg text-[.62rem] font-bold uppercase tracking-[.5px]">
                  {svc.tag}
                </span>
              </article>
            </ScrollReveal>
          ))}
        </div>
        {SERVICES.length > FEATURED_COUNT && (
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 bg-transparent border-[1.5px] border-teal text-teal rounded-xl font-semibold text-[.88rem] px-7 py-3 transition-all hover:bg-teal hover:text-white no-underline"
            >
              {t('viewAll', { count: SERVICES.length })}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
