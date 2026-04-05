'use client';

import { HOURS, BUSINESS } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { cn } from '@/lib/utils';

export function HoursSection() {
  const today = new Date().getDay();

  return (
    <section className="py-20 max-md:py-14 bg-cream" id="contact" aria-labelledby="hours-heading">
      <div className="max-w-300 mx-auto px-8 max-md:px-5">
        <ScrollReveal>
          <SectionHeader id="hours-heading" tag="Visit Us" title="Office Hours" />
        </ScrollReveal>
        <div className="max-w-137.5 mx-auto mt-6 grid gap-1" role="table" aria-label="Weekly office hours">
          <div className="sr-only" role="row">
            <span role="columnheader">Day</span>
            <span role="columnheader">Hours</span>
          </div>
          {HOURS.map((h, i) => (
            <div
              key={h.day}
              role="row"
              className={cn(
                'flex justify-between items-center py-2.5 px-4 rounded-lg text-[.85rem] transition-colors hover:bg-teal-pale',
                h.closed && 'opacity-45',
                i === today && 'bg-teal-pale font-semibold border border-border-hover'
              )}
            >
              <span role="cell" className="font-medium flex items-center gap-1.5">
                <span className={cn('w-1.5 h-1.5 rounded-full', h.closed ? 'bg-text-faint' : 'bg-teal')} aria-hidden="true" />
                {h.day}
                {i === today && <span className="sr-only">(today)</span>}
              </span>
              <span role="cell" className="text-text-mid">
                {h.time}
              </span>
            </div>
          ))}
        </div>
        <div className="text-center mt-6 text-[.88rem] text-text-mid">
          <address className="not-italic inline">
            {BUSINESS.address} &middot; {BUSINESS.city}, {BUSINESS.state} {BUSINESS.zip}
          </address>
          {' '}&middot;{' '}
          <a href={BUSINESS.mapUrl} target="_blank" rel="noopener noreferrer" className="text-teal no-underline font-semibold">
            Get Directions &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
