import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SERVICES, SERVICE_DETAILS } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Icon, type IconName } from '@/components/icons/Icons';
import { cn } from '@/lib/utils';

const FEATURED_COUNT = 8;

// Match a landing-page service card to its corresponding deep-link on the
// /services page. SERVICES and SERVICE_DETAILS share the same ordering, but
// fall back to a title match so a future reorder doesn't silently break the
// links. Final fallback is the bare /services route.
function serviceHref(title: string, index: number): string {
  const detail =
    SERVICE_DETAILS[index]?.title === title
      ? SERVICE_DETAILS[index]
      : SERVICE_DETAILS.find((d) => d.title === title);
  return detail ? `/services#${detail.slug}` : '/services';
}

export function ServicesSection() {
  const t = useTranslations('services');
  const featured = SERVICES.slice(0, FEATURED_COUNT);

  return (
    <section className="py-24 max-md:py-16 bg-white" id="services" aria-labelledby="services-heading">
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
          {featured.map((svc, i) => (
            <ScrollReveal key={svc.title}>
              <Link
                href={serviceHref(svc.title, i)}
                role="listitem"
                aria-label={`${svc.title} — learn more`}
                className={cn(
                  'group block bg-white border rounded-2xl p-6 transition-all duration-300 relative hover:border-navy hover:shadow-md hover:-translate-y-0.5 h-full no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy',
                  svc.featured ? 'border-navy bg-navy-bg' : 'border-border'
                )}
              >
                {svc.featured && (
                  <span className="absolute -top-3 right-5 bg-gold text-navy text-[.6rem] font-bold py-1 px-3 rounded-full uppercase tracking-[.5px]">
                    Signature
                  </span>
                )}
                <div className={cn(
                  'w-11 h-11 rounded-xl flex items-center justify-center mb-3',
                  svc.featured ? 'bg-navy/12' : 'bg-navy-pale'
                )} aria-hidden="true">
                  <Icon name={svc.icon as IconName} size={20} className="text-navy" />
                </div>
                <h3 className="font-serif text-[.98rem] mb-1.5 text-text group-hover:text-navy transition-colors">{svc.title}</h3>
                <p className="text-text-mid text-[.82rem] leading-[1.7] mb-3">{svc.description}</p>
                <span className="inline-block bg-navy-pale text-navy py-1 px-3 rounded-lg text-[.62rem] font-bold uppercase tracking-[.5px]">
                  {svc.tag}
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
        {SERVICES.length > FEATURED_COUNT && (
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 bg-transparent border-[1.5px] border-navy text-navy rounded-xl font-semibold text-[.88rem] px-7 py-3 transition-all hover:bg-navy hover:text-white no-underline"
            >
              {t('viewAll', { count: SERVICES.length })}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
