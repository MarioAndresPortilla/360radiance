import type { Metadata } from 'next';
import Link from 'next/link';
import { JOURNEY_STEPS, TESTIMONIALS } from '@/lib/constants';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingButtons } from '@/components/layout/FloatingButtons';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { IconStar, IconCheck } from '@/components/icons/Icons';

export const metadata: Metadata = {
  title: 'Results',
  description: 'See real results from 360 Radiance clients. Most see 30-50% improvement in 2 weeks and 90%+ improvement in 8 weeks with the Face Reality acne program.',
};

const STATS = [
  { value: '90%+', label: 'Average client improvement by week 8' },
  { value: '2 Weeks', label: 'Typical time to see first visible results' },
  { value: '500+', label: 'Clients treated with the Face Reality protocol' },
  { value: '25+', label: 'Years of medical expertise behind every treatment' },
];

export default function ResultsPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main id="main-content">
        <PageHeader
          tag="Real Results"
          title="Your Clear Skin Journey"
          subtitle="From first consultation to radiant confidence — here's what clients experience with the Face Reality program and our expert treatments."
        />

        {/* Stats bar */}
        <section className="bg-white border-b border-border py-10">
          <div className="max-w-300 mx-auto px-8 max-md:px-5">
            <div className="grid grid-cols-4 gap-8 max-md:grid-cols-2 max-md:gap-6">
              {STATS.map((stat) => (
                <ScrollReveal key={stat.label}>
                  <div className="text-center">
                    <div className="font-serif text-[2rem] text-teal mb-1">{stat.value}</div>
                    <div className="text-[.78rem] text-text-mid leading-[1.5]">{stat.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Journey timeline */}
        <section className="py-20 max-md:py-14" aria-labelledby="timeline-heading">
          <div className="max-w-300 mx-auto px-8 max-md:px-5">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 id="timeline-heading" className="font-serif text-[clamp(1.6rem,3vw,2.3rem)] mb-2.5">The Treatment Timeline</h2>
                <p className="text-text-mid max-w-130 mx-auto text-[.95rem] leading-[1.7]">
                  Every client&apos;s skin is different, but here&apos;s the typical progression with the Face Reality program.
                </p>
              </div>
            </ScrollReveal>
            <div className="max-w-200 mx-auto">
              {JOURNEY_STEPS.map((step, i) => (
                <ScrollReveal key={step.number}>
                  <div className="grid grid-cols-[80px_1fr] gap-8 max-md:gap-4 mb-12 last:mb-0">
                    <div className="text-center">
                      <div className="font-serif text-[2.5rem] text-teal leading-none">{step.number}</div>
                      <div className="text-[.6rem] font-bold uppercase tracking-[1.5px] text-gold-dark mt-1">{step.weekLabel}</div>
                    </div>
                    <div className="bg-cream rounded-2xl p-6">
                      <h3 className="font-serif text-[1.1rem] mb-2">{step.title}</h3>
                      <p className="text-text-mid text-[.88rem] leading-[1.7] mb-3">{step.description}</p>
                      <ProgressBar targetWidth={step.progress} />
                      <div className="text-[.72rem] text-text-light mt-2 text-right">{step.progress}% progress</div>
                    </div>
                    {i < JOURNEY_STEPS.length - 1 && (
                      <div className="col-start-1 flex justify-center" aria-hidden="true">
                        <div className="w-px h-6 bg-border" />
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* What to expect */}
        <section className="py-16 bg-cream" aria-labelledby="expect-heading">
          <div className="max-w-300 mx-auto px-8 max-md:px-5">
            <ScrollReveal>
              <div className="grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1">
                <div>
                  <h2 id="expect-heading" className="font-serif text-[1.9rem] mb-4 leading-[1.2]">What to Expect During Treatment</h2>
                  <p className="text-text-mid leading-[1.85] mb-6 text-[.92rem]">
                    Your journey to clear skin is a partnership. Marta guides you every step of the way with professional treatments, custom home-care, and ongoing adjustments based on your skin&apos;s response.
                  </p>
                  <ul className="flex flex-col gap-3 list-none">
                    {[
                      'Comprehensive skin analysis at your first visit',
                      'Bi-weekly professional treatments in-office',
                      'Custom home-care regimen with medical-grade products',
                      'Progress tracking and regimen adjustments',
                      'Bilingual support in English and Spanish',
                      'Ongoing care after clearing for maintenance',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[.88rem] text-text-mid">
                        <span className="w-5 h-5 rounded-md bg-teal-pale flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                          <IconCheck size={12} className="text-teal" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-teal-pale rounded-2xl p-10 text-center">
                  <div className="font-serif text-[3rem] text-teal mb-2">90%+</div>
                  <div className="text-[.85rem] text-text-mid mb-6">Average improvement by week 8</div>
                  <p className="text-text-mid text-[.88rem] leading-[1.7] italic">
                    &ldquo;After 2 weeks — 50% better. After 2 months — 90%. After 2 years of hiding behind makeup, I can finally go out with clear skin.&rdquo;
                  </p>
                  <div className="mt-4 text-[.78rem] font-semibold text-teal">— Marissa C., Cystic Acne</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Featured testimonials */}
        <section className="py-20 max-md:py-14" aria-labelledby="stories-heading">
          <div className="max-w-300 mx-auto px-8 max-md:px-5">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 id="stories-heading" className="font-serif text-[clamp(1.6rem,3vw,2.3rem)] mb-2.5">Client Success Stories</h2>
                <p className="text-text-mid max-w-130 mx-auto text-[.95rem] leading-[1.7]">
                  Real stories from real clients who transformed their skin.
                </p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
              {TESTIMONIALS.slice(0, 3).map((t) => (
                <ScrollReveal key={t.name}>
                  <blockquote className="bg-white border border-border rounded-2xl p-7 transition-all duration-300 hover:shadow-md hover:border-border-hover">
                    <div className="flex gap-0.5 mb-3" aria-label="Rated 5 out of 5 stars">
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
            <div className="text-center mt-10">
              <Link href="/reviews" className="inline-flex items-center gap-1.5 bg-transparent border-[1.5px] border-teal text-teal rounded-lg font-semibold text-[.85rem] px-6 py-3 transition-all hover:bg-teal hover:text-white no-underline">
                Read All Reviews &rarr;
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-teal">
          <div className="max-w-300 mx-auto px-8 max-md:px-5 text-center text-white">
            <h2 className="font-serif text-[2rem] mb-3">Ready to Start Your Journey?</h2>
            <p className="opacity-80 max-w-112.5 mx-auto mb-8 text-[.95rem] leading-[1.7]">
              Most clients see visible improvement within 2 weeks. Book your free consultation today.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 bg-gold text-white rounded-lg font-bold text-[.92rem] px-8 py-3.5 transition-all hover:bg-gold-dark hover:-translate-y-0.5 no-underline"
            >
              Book Free Consultation
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
