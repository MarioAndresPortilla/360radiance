import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICE_DETAILS, ACNE_PROGRAM_PRICING, ACNE_PROGRAM_CONTRAINDICATIONS } from '@/lib/constants';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingButtons } from '@/components/layout/FloatingButtons';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Icon, type IconName } from '@/components/icons/Icons';
import { IconCheck } from '@/components/icons/Icons';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Expert skincare treatments at 360 Radiance: 12-week Acne Treatment Program starting at $280, Back Facial, microdermabrasion, European glass ampule serums, and more.',
};

export default function ServicesPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main id="main-content">
        <PageHeader
          tag="Our Services"
          title="Expert Skincare Treatments"
          subtitle="Every treatment is tailored to your unique skin type and concerns. Marta combines 20+ years of medical expertise with cutting-edge protocols for real results."
        />

        {/* Pricing overview */}
        <section className="bg-white border-b border-border py-10">
          <div className="max-w-300 mx-auto px-8 max-md:px-5">
            <ScrollReveal>
              <div className="grid grid-cols-4 gap-6 max-md:grid-cols-2 text-center">
                <div>
                  <div className="font-serif text-[1.8rem] text-teal">${ACNE_PROGRAM_PRICING.consultation}</div>
                  <div className="text-[.78rem] text-text-mid mt-1">Consultation</div>
                </div>
                <div>
                  <div className="font-serif text-[1.8rem] text-teal">${ACNE_PROGRAM_PRICING.acneFacial}</div>
                  <div className="text-[.78rem] text-text-mid mt-1">Acne Facial</div>
                </div>
                <div>
                  <div className="font-serif text-[1.8rem] text-teal">~${ACNE_PROGRAM_PRICING.homeCareProducts}</div>
                  <div className="text-[.78rem] text-text-mid mt-1">Home-Care Products</div>
                </div>
                <div>
                  <div className="font-serif text-[1.8rem] text-gold">${ACNE_PROGRAM_PRICING.totalStarting}</div>
                  <div className="text-[.78rem] text-text-mid mt-1">Total Starting At</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-24 max-md:py-16">
          <div className="max-w-300 mx-auto px-8 max-md:px-5">
            <div className="flex flex-col gap-24 max-md:gap-16">
              {SERVICE_DETAILS.map((svc, i) => (
                <ScrollReveal key={svc.slug}>
                  <div id={svc.slug} className="scroll-mt-24">
                    <div className={cn(
                      'grid grid-cols-[1fr_1.2fr] gap-16 max-lg:gap-10 items-start max-lg:grid-cols-1',
                      i % 2 === 1 && 'max-lg:flex max-lg:flex-col'
                    )}>
                      <div className={cn(i % 2 === 1 && 'max-lg:order-none lg:order-2')}>
                        <div className="flex items-center gap-4 mb-5">
                          <div className={cn(
                            'w-14 h-14 rounded-2xl flex items-center justify-center',
                            svc.featured ? 'bg-teal/12' : 'bg-teal-pale'
                          )} aria-hidden="true">
                            <Icon name={svc.icon as IconName} size={26} className="text-teal" />
                          </div>
                          <div>
                            <span className="inline-block bg-teal-pale text-teal py-1 px-3 rounded-lg text-[.62rem] font-bold uppercase tracking-[.5px] mb-1.5">
                              {svc.tag}
                            </span>
                            <h2 className="font-serif text-[1.5rem] leading-tight">{svc.title}</h2>
                          </div>
                        </div>
                        <p className="text-teal font-medium text-[.95rem] mb-6">{svc.tagline}</p>
                        {svc.description.map((p, j) => (
                          <p key={j} className="text-text-mid leading-[1.85] mb-5 text-[.92rem]">{p}</p>
                        ))}

                        {/* Contraindications for acne program */}
                        {svc.slug === 'acne-treatment-program' && (
                          <div className="bg-gold-pale border border-gold-light/30 rounded-2xl p-6 mt-6">
                            <h3 className="font-serif text-[1rem] text-gold-dark mb-3">Important: Before Beginning Treatment</h3>
                            <ul className="flex flex-col gap-2.5 list-none">
                              {ACNE_PROGRAM_CONTRAINDICATIONS.map((item) => (
                                <li key={item} className="flex items-start gap-2.5 text-[.82rem] text-gold-dark/80 leading-[1.6]">
                                  <span className="w-1.5 h-1.5 rounded-full bg-gold-dark mt-2 shrink-0" aria-hidden="true" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1.5 bg-teal text-white rounded-xl font-semibold text-[.88rem] px-7 py-3.5 transition-all hover:bg-teal-dark hover:-translate-y-px hover:shadow-md no-underline mt-6"
                        >
                          Book This Treatment &rarr;
                        </Link>
                      </div>

                      <div className={cn(i % 2 === 1 && 'max-lg:order-none lg:order-1')}>
                        <div className="bg-cream rounded-2xl p-8 max-md:p-6">
                          <h3 className="font-serif text-[1.1rem] mb-5">
                            {svc.slug === 'acne-treatment-program' ? 'Program Includes' : 'Benefits'}
                          </h3>
                          <ul className="flex flex-col gap-3.5 list-none mb-8">
                            {svc.benefits.map((b) => (
                              <li key={b} className="flex items-start gap-3 text-[.88rem] text-text-mid">
                                <span className="w-5.5 h-5.5 rounded-lg bg-teal-pale flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                                  <IconCheck size={13} className="text-teal" />
                                </span>
                                {b}
                              </li>
                            ))}
                          </ul>

                          {/* Bi-monthly pricing for acne program */}
                          {svc.slug === 'acne-treatment-program' && (
                            <div className="bg-white rounded-xl p-5 mb-6 border border-border">
                              <div className="text-[.78rem] font-semibold text-text mb-2">Bi-Monthly Visits</div>
                              <div className="flex items-baseline gap-1">
                                <span className="font-serif text-[1.5rem] text-teal">${ACNE_PROGRAM_PRICING.biMonthlyVisit}</span>
                                <span className="text-[.78rem] text-text-light">per visit &middot; 3 months</span>
                              </div>
                              <p className="text-[.75rem] text-text-mid mt-2 leading-[1.6]">
                                Includes progress monitoring and an acne facial to prepare your skin for the next phase of treatment.
                              </p>
                            </div>
                          )}

                          <h3 className="font-serif text-[1.1rem] mb-4">Ideal For</h3>
                          <div className="flex flex-wrap gap-2.5">
                            {svc.idealFor.map((item) => (
                              <span key={item} className="bg-teal-pale text-teal-dark py-2 px-3.5 rounded-lg text-[.72rem] font-semibold">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {i < SERVICE_DETAILS.length - 1 && (
                      <hr className="border-border mt-24 max-md:mt-16" />
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-teal">
          <div className="max-w-300 mx-auto px-8 max-md:px-5 text-center text-white">
            <h2 className="font-serif text-[2rem] mb-4">Not Sure Which Treatment Is Right?</h2>
            <p className="opacity-80 max-w-112.5 mx-auto mb-8 text-[.95rem] leading-[1.7]">
              Book a consultation ($50) and Marta will design a treatment plan tailored to your unique needs.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 bg-gold text-white rounded-xl font-bold text-[.92rem] px-8 py-3.5 transition-all hover:bg-gold-dark hover:-translate-y-0.5 no-underline"
            >
              Book Your Consultation
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
