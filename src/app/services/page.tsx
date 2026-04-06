import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICE_DETAILS } from '@/lib/constants';
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
  description: 'Expert skincare treatments at 360 Radiance: Face Reality Acne Program, microdermabrasion, European glass ampule serums, botanical treatments, and custom regimen design.',
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
          subtitle="Every treatment is tailored to your unique skin type and concerns. Marta combines 25 years of medical expertise with cutting-edge protocols for real results."
        />

        <section className="py-20 max-md:py-14">
          <div className="max-w-300 mx-auto px-8 max-md:px-5">
            <div className="flex flex-col gap-20">
              {SERVICE_DETAILS.map((svc, i) => (
                <ScrollReveal key={svc.slug}>
                  <div id={svc.slug} className="scroll-mt-24">
                    <div className={cn(
                      'grid grid-cols-[1fr_1.2fr] gap-16 items-start max-lg:grid-cols-1',
                      i % 2 === 1 && 'max-lg:flex max-lg:flex-col'
                    )}>
                      <div className={cn(i % 2 === 1 && 'max-lg:order-none lg:order-2')}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={cn(
                            'w-12 h-12 rounded-xl flex items-center justify-center',
                            svc.featured ? 'bg-teal/12' : 'bg-teal-pale'
                          )} aria-hidden="true">
                            <Icon name={svc.icon as IconName} size={24} className="text-teal" />
                          </div>
                          <div>
                            <span className="inline-block bg-teal-pale text-teal py-0.5 px-2 rounded-md text-[.6rem] font-bold uppercase tracking-[.5px] mb-1">
                              {svc.tag}
                            </span>
                            <h2 className="font-serif text-[1.5rem] leading-tight">{svc.title}</h2>
                          </div>
                        </div>
                        <p className="text-teal font-medium text-[.95rem] mb-6">{svc.tagline}</p>
                        {svc.description.map((p, j) => (
                          <p key={j} className="text-text-mid leading-[1.85] mb-4 text-[.92rem]">{p}</p>
                        ))}
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1.5 bg-teal text-white rounded-lg font-semibold text-[.85rem] px-6 py-3 transition-all hover:bg-teal-dark hover:-translate-y-px hover:shadow-md no-underline mt-4"
                        >
                          Book This Treatment &rarr;
                        </Link>
                      </div>

                      <div className={cn(i % 2 === 1 && 'max-lg:order-none lg:order-1')}>
                        <div className="bg-cream rounded-2xl p-8 max-md:p-6">
                          <h3 className="font-serif text-[1.1rem] mb-4">Benefits</h3>
                          <ul className="flex flex-col gap-3 list-none mb-8">
                            {svc.benefits.map((b) => (
                              <li key={b} className="flex items-start gap-2.5 text-[.88rem] text-text-mid">
                                <span className="w-5 h-5 rounded-md bg-teal-pale flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                                  <IconCheck size={12} className="text-teal" />
                                </span>
                                {b}
                              </li>
                            ))}
                          </ul>
                          <h3 className="font-serif text-[1.1rem] mb-3">Ideal For</h3>
                          <div className="flex flex-wrap gap-2">
                            {svc.idealFor.map((item) => (
                              <span key={item} className="bg-teal-pale text-teal-dark py-1.5 px-3 rounded-lg text-[.72rem] font-semibold">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {i < SERVICE_DETAILS.length - 1 && (
                      <hr className="border-border mt-20 max-md:mt-14" />
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-teal">
          <div className="max-w-300 mx-auto px-8 max-md:px-5 text-center text-white">
            <h2 className="font-serif text-[2rem] mb-3">Not Sure Which Treatment Is Right?</h2>
            <p className="opacity-80 max-w-112.5 mx-auto mb-8 text-[.95rem] leading-[1.7]">
              Book a free skin analysis and Marta will design a treatment plan tailored to your unique needs.
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
