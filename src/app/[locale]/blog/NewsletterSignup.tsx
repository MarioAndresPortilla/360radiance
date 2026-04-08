'use client';

import { useId } from 'react';
import { useTranslations } from 'next-intl';

/*
 * Newsletter signup form — currently in COMING SOON mode.
 *
 * The backend wiring (ESP — likely Resend Audiences since we already use Resend
 * for the contact form) is intentionally deferred. Rather than fake a successful
 * subscription and silently drop visitor emails into a void, we lock the form
 * and tell visitors honestly that the feature is launching shortly. This way
 * Marta can finish the integration on her own clock without misleading anyone.
 *
 * To re-enable when the ESP is wired up:
 *   1. Restore the email state + handleSubmit + submitted state below
 *   2. Replace the disabled button with a real submit button
 *   3. Remove the COMING_SOON_OVERLAY block
 *
 * Used in two places (so form-element id collisions matter):
 *   1. /blog page (bottom of article list)
 *   2. Homepage pre-footer
 *
 * `useId()` namespaces the email input/label so multiple instances on the same
 * page don't break label-for / aria associations.
 */
type Props = {
  /** Submit button label override (kept for parity once re-enabled). */
  buttonText?: string;
  /** Visually-hidden form aria-label override. */
  ariaLabel?: string;
};

export function NewsletterSignup({ ariaLabel = 'Subscribe to newsletter' }: Props) {
  const formId = useId();
  const t = useTranslations('newsletter');

  return (
    <div className="relative max-w-120 mx-auto">
      {/* Coming-soon ribbon — sits above the form so visitors see it before
          they read the disabled input. */}
      <div className="flex justify-center mb-4">
        <span className="inline-flex items-center gap-1.5 text-[.66rem] font-bold uppercase tracking-[2px] text-navy bg-gold/30 px-3 py-1.5 rounded-full ring-1 ring-gold/40">
          <span className="w-1.5 h-1.5 rounded-full bg-navy animate-pulse" aria-hidden="true" />
          {t('comingSoonTag')}
        </span>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex gap-3 max-md:flex-col opacity-70"
        aria-label={ariaLabel}
      >
        <div className="flex-1">
          <label htmlFor={`${formId}-email`} className="sr-only">Email address</label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            placeholder="Your email address"
            disabled
            aria-disabled="true"
            autoComplete="email"
            className="w-full py-3.5 px-5 rounded-xl border border-border bg-white/60 text-text-light text-[.88rem] outline-none transition-all font-sans cursor-not-allowed"
          />
        </div>
        <button
          type="button"
          disabled
          aria-disabled="true"
          aria-describedby={`${formId}-hint`}
          className="bg-navy/40 text-white py-3.5 px-8 rounded-xl font-semibold text-[.88rem] border-none transition-all font-sans shrink-0 cursor-not-allowed"
        >
          {t('comingSoonButton')}
        </button>
      </form>

      <p id={`${formId}-hint`} className="text-[.78rem] text-text-mid mt-4 leading-[1.7] text-center">
        {t('comingSoonBody')}
      </p>
    </div>
  );
}
