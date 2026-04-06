import { useTranslations } from 'next-intl';
import { TESTIMONIALS } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { IconStar } from '@/components/icons/Icons';

export function TestimonialsSection() {
  const t = useTranslations('testimonials');
  return (
    <section className="py-24 max-md:py-16" id="reviews" aria-labelledby="reviews-heading">
      <div className="container-site">
        <ScrollReveal>
          <SectionHeader id="reviews-heading" tag={t('tag')} title={t('title')} />
        </ScrollReveal>
        <div className="grid grid-cols-3 gap-7 max-lg:grid-cols-2 max-lg:gap-6 max-md:grid-cols-1 max-md:gap-5" role="list">
          {TESTIMONIALS.map((tm) => (
            <ScrollReveal key={tm.name}>
              <blockquote className="bg-white border border-border rounded-2xl p-8 max-md:p-6 transition-all duration-300 hover:shadow-md hover:border-border-hover" role="listitem">
                <div className="flex gap-1 mb-4" aria-label={t('starRating')}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStar key={i} size={14} className="text-gold" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-text-mid text-[.88rem] leading-[1.8] italic mb-6">{tm.text}</p>
                <footer className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[.72rem] font-bold text-white shrink-0 ${tm.avatarColor}`} aria-hidden="true">
                    {tm.initial}
                  </div>
                  <div>
                    <cite className="font-semibold text-[.85rem] not-italic">{tm.name}</cite>
                    <div className="text-[.72rem] text-text-light mt-0.5">{tm.condition}</div>
                  </div>
                </footer>
              </blockquote>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
