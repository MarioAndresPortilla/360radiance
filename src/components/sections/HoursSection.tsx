'use client';

import { useTranslations } from 'next-intl';
import { HOURS, BUSINESS } from '@/lib/constants';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { cn } from '@/lib/utils';

export function HoursSection() {
  const t = useTranslations('hours');
  const today = new Date().getDay();

  return (
    <section className="py-24 max-md:py-16 bg-cream" id="contact" aria-labelledby="hours-heading">
      <div className="container-site">
        <ScrollReveal>
          <SectionHeader id="hours-heading" tag={t('tag')} title={t('title')} />
        </ScrollReveal>
        <div className="max-w-150 mx-auto mt-8 flex flex-col gap-2.5" role="table" aria-label={t('ariaTable')}>
          <div className="sr-only" role="row">
            <span role="columnheader">Day</span>
            <span role="columnheader">Hours</span>
          </div>
          {HOURS.map((h, i) => {
            const dayKey = h.day.toLowerCase();
            return (
              <div
                key={h.day}
                role="row"
                className={cn(
                  'flex justify-between items-center py-4 px-6 rounded-xl text-[.9rem] transition-colors hover:bg-navy-pale',
                  h.closed && 'opacity-45',
                  i === today && 'bg-navy-pale font-semibold border border-border-hover'
                )}
              >
                <span role="cell" className="font-medium flex items-center gap-2.5">
                  <span className={cn('w-2 h-2 rounded-full', h.closed ? 'bg-text-faint' : 'bg-navy')} aria-hidden="true" />
                  {t(dayKey)}
                  {i === today && <span className="sr-only">(today)</span>}
                </span>
                <span role="cell" className="text-text-mid">
                  {h.closed ? t('closed') : h.time}
                </span>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-10 text-[.9rem] text-text-mid">
          <address className="not-italic inline">
            {BUSINESS.address} &middot; {BUSINESS.city}, {BUSINESS.state} {BUSINESS.zip}
          </address>
          {' '}&middot;{' '}
          <a href={BUSINESS.mapUrl} target="_blank" rel="noopener noreferrer" className="text-navy no-underline font-semibold">
            Get Directions &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
