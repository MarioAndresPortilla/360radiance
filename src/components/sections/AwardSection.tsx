import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { IconStar } from '@/components/icons/Icons';

export function AwardSection() {
  const t = useTranslations('award');
  return (
    <section className="py-16 max-md:py-12 bg-text overflow-hidden" aria-labelledby="award-heading">
      <div className="container-site">
        <div className="grid grid-cols-[1fr_1.2fr] gap-16 max-lg:gap-10 items-center max-lg:grid-cols-1">
          <ScrollReveal>
            <div className="max-lg:max-w-80 max-lg:mx-auto">
              <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,.4)] border border-white/10">
                <Image
                  src="/images/best-of-2026-award.jpg"
                  alt="Best of 2026 Award Winner — BusinessRate — 360 Radiance Skin Care Clinic, Sunrise, Florida — Powered by Google Reviews"
                  width={600}
                  height={780}
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 320px, 45vw"
                  quality={95}
                />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="text-white">
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar key={i} size={20} className="text-gold" aria-hidden="true" />
                ))}
              </div>
              <span className="inline-block text-[.68rem] font-bold uppercase tracking-[3px] text-gold mb-4">
                {t('tag')}
              </span>
              <h2 id="award-heading" className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.15] mb-6">
                {t('title1')}<br />
                <span className="text-gold">{t('title2')}</span>
              </h2>
              <p className="text-white/60 text-[1rem] leading-[1.85] mb-8 max-w-120">
                {t('description')}
              </p>
              <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1 max-md:gap-4 mb-8">
                {[
                  { value: '4.9', label: t('googleRating') },
                  { value: '#1', label: t('rank') },
                  { value: '2026', label: t('year') },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/5 rounded-xl p-5 text-center border border-white/8">
                    <div className="font-serif text-[1.6rem] text-gold mb-1">{stat.value}</div>
                    <div className="text-[.72rem] text-white/50 font-medium uppercase tracking-[1px]">{stat.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-white/40 text-[.78rem]">
                {t('footer')}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
