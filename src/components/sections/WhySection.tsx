import { useTranslations } from 'next-intl';
import { WHY_CARDS } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Icon, type IconName } from '@/components/icons/Icons';

const WHY_KEYS = ['expertise', 'protocol', 'european', 'botanicals', 'personalized', 'bilingual'] as const;

export function WhySection() {
  const t = useTranslations('why');
  return (
    <section className="py-14 max-md:py-10" aria-labelledby="why-heading">
      <div className="container-site">
        <ScrollReveal>
          <SectionHeader
            id="why-heading"
            tag={t('tag')}
            title={t('title')}
            subtitle={t('subtitle')}
          />
        </ScrollReveal>
        <div className="grid grid-cols-3 gap-7 max-lg:grid-cols-2 max-lg:gap-6 max-md:grid-cols-1 max-md:gap-5" role="list">
          {WHY_CARDS.map((card, i) => {
            const key = WHY_KEYS[i];
            return (
              <ScrollReveal key={card.title}>
                <article className="group bg-white border border-border rounded-2xl p-7 max-md:p-5 transition-all duration-300 relative hover:border-navy hover:shadow-lg hover:-translate-y-1" role="listitem">
                  <div className="absolute top-0 left-6 right-6 h-0.5 bg-navy rounded-b-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${card.iconTheme === 'navy' ? 'bg-navy-pale' : 'bg-gold-highlight'}`} aria-hidden="true">
                    <Icon name={card.icon as IconName} size={26} className={card.iconTheme === 'navy' ? 'text-navy' : 'text-gold-dark'} />
                  </div>
                  <h3 className="font-serif text-[1.15rem] mb-3">{t(`cards.${key}.title`)}</h3>
                  <p className="text-text-mid text-[.88rem] leading-[1.75]">{t(`cards.${key}.description`)}</p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
