import { TESTIMONIALS } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { IconStar } from '@/components/icons/Icons';

export function TestimonialsSection() {
  return (
    <section className="py-20 max-md:py-14" id="reviews" aria-labelledby="reviews-heading">
      <div className="max-w-300 mx-auto px-8 max-md:px-5">
        <ScrollReveal>
          <SectionHeader id="reviews-heading" tag="Client Stories" title="What Our Clients Say" />
        </ScrollReveal>
        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1" role="list">
          {TESTIMONIALS.map((t) => (
            <ScrollReveal key={t.name}>
              <blockquote className="bg-white border border-border rounded-2xl p-7 transition-all duration-300 hover:shadow-md hover:border-border-hover" role="listitem">
                <div className="flex gap-0.5 mb-3" aria-label={`Rated 5 out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStar key={i} size={14} className="text-gold" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-text-mid text-[.85rem] leading-[1.8] italic mb-5">{t.text}</p>
                <footer className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[.7rem] font-bold text-white shrink-0 ${t.avatarColor}`} aria-hidden="true">
                    {t.initial}
                  </div>
                  <div>
                    <cite className="font-semibold text-[.82rem] not-italic">{t.name}</cite>
                    <div className="text-[.68rem] text-text-light">{t.condition}</div>
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
