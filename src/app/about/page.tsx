import type { Metadata } from 'next';
import Image from 'next/image';
import { CREDENTIALS } from '@/lib/constants';
import { PageShell } from '@/components/layout/PageShell';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Icon, type IconName } from '@/components/icons/Icons';
import { IconDiploma, IconCheck } from '@/components/icons/Icons';

export const metadata: Metadata = {
  title: 'About Marta Nazzar',
  description: 'Meet Marta Nazzar — licensed Paramedical Aesthetician with 25+ years of medical expertise, B.S. in Biology, and Face Reality Acne Certification.',
};

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        tag="Meet Marta Nazzar"
        title="The Science Behind Your Best Skin"
        subtitle="25+ years of medical expertise, a deep passion for skincare science, and a commitment to results that change lives."
      />

      {/* Main bio */}
      <section className="py-20 max-md:py-14" aria-labelledby="bio-heading">
        <div className="max-w-300 mx-auto px-8 max-md:px-5">
          <div className="grid grid-cols-[1fr_1.4fr] gap-16 items-start max-lg:grid-cols-1">
            <ScrollReveal>
              <div className="relative max-lg:max-w-75 max-lg:mx-auto">
                <div className="rounded-2xl overflow-hidden aspect-3/4 shadow-md relative">
                  <Image
                    src="/images/marta-nazzar.jpg"
                    alt="Marta Nazzar, Licensed Paramedical Aesthetician"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 300px, 35vw"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl py-3 px-4 shadow-lg flex items-center gap-2">
                  <div className="w-8 h-8 bg-gold-pale rounded-2.5 flex items-center justify-center" aria-hidden="true">
                    <IconDiploma size={18} className="text-gold-dark" />
                  </div>
                  <div className="text-[.7rem] font-semibold text-teal">
                    25+ Years
                    <span className="block font-normal text-text-light text-[.6rem]">Medical Experience</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div>
                <h2 id="bio-heading" className="sr-only">About Marta Nazzar</h2>
                <h3 className="font-serif text-[1.6rem] mb-4 leading-[1.2]">From Medical Science to Skincare Artistry</h3>
                <p className="text-text-mid leading-[1.85] mb-4 text-[.92rem]">
                  Marta Nazzar is a licensed Paramedical Aesthetician whose path to skincare was built on a deep foundation of medical science. With a B.S. in Biology and an A.S. in Medical &amp; Laboratory Studies from Florida College of Natural Health, she brings a level of clinical precision that sets her apart from traditional aestheticians.
                </p>
                <p className="text-text-mid leading-[1.85] mb-4 text-[.92rem]">
                  Her 25+ years in the medical field gave her an understanding of skin at a cellular level — how it heals, what triggers inflammation, and why certain ingredients work while others don&apos;t. This knowledge is the backbone of every treatment she provides.
                </p>
                <p className="text-text-mid leading-[1.85] mb-4 text-[.92rem]">
                  Certified under renowned acne expert Dr. James E. Fulton through the Face Reality program, Marta evaluates diverse skin types to determine the best solution for each individual. Dr. Fulton pioneered Retin-A — and his clinical protocol is the foundation of Marta&apos;s acne treatment approach.
                </p>
                <p className="text-text-mid leading-[1.85] mb-4 text-[.92rem]">
                  She created the Radiance Skin Care Line — a proprietary collection of botanical formulas free of toxins, parabens, and sulfates. Every product blends clinical science with nature&apos;s most beneficial ingredients, designed for real skin conditions and real results.
                </p>
                <p className="text-text-mid leading-[1.85] text-[.92rem]">
                  Fluent in English and Spanish, Marta ensures every client feels understood and confident in their treatment plan. Her practice isn&apos;t just about clearing skin — it&apos;s about restoring confidence and changing lives.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-16 bg-cream" aria-labelledby="cred-heading">
        <div className="max-w-300 mx-auto px-8 max-md:px-5">
          <ScrollReveal>
            <h2 id="cred-heading" className="font-serif text-[1.6rem] text-center mb-10">Credentials &amp; Certifications</h2>
          </ScrollReveal>
          <div className="grid grid-cols-6 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2">
            {CREDENTIALS.map((cred) => (
              <ScrollReveal key={cred.label}>
                <div className="bg-white rounded-2xl p-6 text-center border border-border hover:border-border-hover hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-teal-pale rounded-xl flex items-center justify-center mx-auto mb-3" aria-hidden="true">
                    <Icon name={cred.icon as IconName} size={24} className="text-teal" />
                  </div>
                  <div className="font-semibold text-[.82rem]">{cred.label}</div>
                </div>
              </ScrollReveal>
            ))}
            <ScrollReveal>
              <div className="bg-white rounded-2xl p-6 text-center border border-border hover:border-border-hover hover:shadow-md transition-all flex items-center justify-center">
                <Image
                  src="/images/ascp-member.png"
                  alt="Associated Skin Care Professionals Member"
                  width={100}
                  height={60}
                  className="object-contain"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 max-md:py-14" aria-labelledby="philosophy-heading">
        <div className="max-w-300 mx-auto px-8 max-md:px-5">
          <ScrollReveal>
            <div className="max-w-175 mx-auto">
              <h2 id="philosophy-heading" className="font-serif text-[1.6rem] text-center mb-8">The 360 Radiance Philosophy</h2>
              <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
                {[
                  { title: 'Science-First Approach', desc: 'Every recommendation is backed by clinical research and 25+ years of medical experience. No trends, no guesswork — just proven results.' },
                  { title: 'Personalized Care', desc: 'No two skin types are the same. Every client receives a custom treatment roadmap and take-home protocol designed for their unique needs.' },
                  { title: 'Clean Ingredients', desc: 'The Radiance line is toxin-free, paraben-free, and sulfate-free. We believe effective skincare should never compromise your health.' },
                  { title: 'Long-Term Health', desc: 'We treat the root cause, not just symptoms. Our goal is lasting skin health and the confidence that comes with it.' },
                ].map((item) => (
                  <div key={item.title} className="bg-cream rounded-2xl p-6">
                    <h3 className="font-serif text-[1rem] mb-2">{item.title}</h3>
                    <p className="text-text-mid text-[.85rem] leading-[1.7]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CtaBanner
        heading="Ready to Meet Marta?"
        subtitle="Book a free consultation and experience the difference that real expertise makes."
      />
    </PageShell>
  );
}
