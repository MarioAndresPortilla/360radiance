import { TESTIMONIALS } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { IconStar } from '@/components/icons/Icons';

export function TestimonialsSection() {
  return (
    <section className="py-24 max-md:py-16" id="reviews" aria-labelledby="reviews-heading">
      <div className="container-site">
        <ScrollReveal>
          <SectionHeader id="reviews-heading" tag="Client Stories" title="What Our Clients Say" />
        </ScrollReveal>
        <div className="grid grid-cols-3 gap-7 max-lg:grid-cols-2 max-lg:gap-6 max-md:grid-cols-1 max-md:gap-5" role="list">
          {TESTIMONIALS.map((t) => (
            <ScrollReveal key={t.name}>
              <blockquote className="bg-white border border-border rounded-2xl p-8 max-md:p-6 transition-all duration-300 hover:shadow-md hover:border-border-hover" role="listitem">
                <div className="flex gap-1 mb-4" aria-label="Rated 5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStar key={i} size={14} className="text-gold" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-text-mid text-[.88rem] leading-[1.8] italic mb-6">{t.text}</p>
                <footer className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[.72rem] font-bold text-white shrink-0 ${t.avatarColor}`} aria-hidden="true">
                    {t.initial}
                  </div>
                  <div>
                    <cite className="font-semibold text-[.85rem] not-italic">{t.name}</cite>
                    <div className="text-[.72rem] text-text-light mt-0.5">{t.condition}</div>
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
