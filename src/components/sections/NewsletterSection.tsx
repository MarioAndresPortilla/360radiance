/*
 * Homepage newsletter section.
 *
 * Why exists: prior to this section, the only place to capture an email
 * address was deeply buried at the bottom of the /blog page. Visitors who
 * weren't ready to book a consult or call had no way to stay in touch — a
 * silent leak of warm leads. This section sits in the homepage footer
 * stack so every landing-page visitor sees it on their first scroll.
 *
 * Reuses NewsletterSignup (the same component used on /blog) so we ship one
 * form with two surfaces. The component's `useId()` keeps form-element ids
 * unique even if both signups end up on the same page (e.g. blog index).
 */

import { useTranslations } from 'next-intl';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { NewsletterSignup } from '@/app/[locale]/blog/NewsletterSignup';

export function NewsletterSection() {
  const t = useTranslations('newsletter');
  return (
    <section className="py-14 max-md:py-10 bg-navy-pale" aria-labelledby="newsletter-heading">
      <div className="container-site">
        <ScrollReveal>
          <div className="max-w-150 mx-auto text-center">
            <span className="inline-block text-[.68rem] font-bold uppercase tracking-[2px] text-navy mb-4 bg-white/70 px-4 py-1.5 rounded-full">
              {t('tag')}
            </span>
            <h2 id="newsletter-heading" className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] mb-3 leading-[1.2]">
              {t('title')}
            </h2>
            <p className="text-text-mid text-[.95rem] leading-[1.7] mb-8 max-w-130 mx-auto">
              {t('subtitle')}
            </p>
            <NewsletterSignup buttonText={t('cta')} ariaLabel={t('ariaLabel')} />
            <p className="text-[.72rem] text-text-light mt-4">{t('finePrint')}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
