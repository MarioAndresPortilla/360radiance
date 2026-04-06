import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { IconStar } from '@/components/icons/Icons';

export function AwardSection() {
  return (
    <section className="py-24 max-md:py-16 bg-text overflow-hidden" aria-labelledby="award-heading">
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
                Award Winner
              </span>
              <h2 id="award-heading" className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.15] mb-6">
                Best of 2026<br />
                <span className="text-gold">Skin Care Clinic</span>
              </h2>
              <p className="text-white/60 text-[1rem] leading-[1.85] mb-8 max-w-120">
                360 Radiance has been recognized as the <strong className="text-white/90">Best Skin Care Clinic in Sunrise, Florida</strong> by BusinessRate, powered by Google Reviews. This award reflects the trust, satisfaction, and real results our clients experience every day.
              </p>
              <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1 max-md:gap-4 mb-8">
                {[
                  { value: '5.0', label: 'Google Rating' },
                  { value: '#1', label: 'Skin Care Clinic' },
                  { value: '2026', label: 'Award Year' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/5 rounded-xl p-5 text-center border border-white/8">
                    <div className="font-serif text-[1.6rem] text-gold mb-1">{stat.value}</div>
                    <div className="text-[.72rem] text-white/50 font-medium uppercase tracking-[1px]">{stat.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-white/40 text-[.78rem]">
                Powered by Google Reviews &middot; BusinessRate Verified
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
