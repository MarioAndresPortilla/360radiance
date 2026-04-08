'use client';

import { useActionState, useId } from 'react';
import { useFormStatus } from 'react-dom';
import { useTranslations } from 'next-intl';
import { subscribeToNewsletter, type NewsletterFormState } from '@/lib/newsletter-actions';

/*
 * Newsletter signup form.
 *
 * Submits to the `subscribeToNewsletter` server action which (a) writes the
 * email to a Resend Audience if RESEND_AUDIENCE_ID is set, and (b) emails
 * Marta a notification so she sees signups in real time and never loses one
 * even if the audience write is skipped or fails. The audience IS the "db"
 * here — when Marta is ready to broadcast she creates a campaign in the
 * Resend dashboard and targets the audience.
 *
 * Used in two places (so form-element id collisions matter):
 *   1. /blog page (bottom of article list)
 *   2. Homepage pre-footer
 *
 * `useId()` namespaces the email input/label so multiple instances on the
 * same page don't break label-for / aria associations or pre-fill each other.
 */
type Props = {
  /** Submit button label override (e.g. "Get Skin Tips" on homepage). */
  buttonText?: string;
  /** Visually-hidden form aria-label override. */
  ariaLabel?: string;
};

const initialState: NewsletterFormState = { ok: false };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="bg-navy text-white py-3.5 px-8 rounded-xl font-semibold text-[.88rem] border-none cursor-pointer transition-all hover:bg-navy-deep hover:-translate-y-px hover:shadow-md font-sans shrink-0 disabled:opacity-60 disabled:cursor-wait disabled:hover:translate-y-0"
    >
      {pending ? (
        <span className="inline-flex items-center gap-2">
          <svg className="animate-spin" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden="true">
            <path d="M12 3a9 9 0 1 0 9 9" />
          </svg>
          {label}
        </span>
      ) : (
        label
      )}
    </button>
  );
}

export function NewsletterSignup({ buttonText = 'Subscribe', ariaLabel = 'Subscribe to newsletter' }: Props) {
  const formId = useId();
  const t = useTranslations('newsletter');
  const [state, formAction] = useActionState(subscribeToNewsletter, initialState);

  if (state.ok) {
    return (
      <div
        className="bg-navy-pale border border-navy/20 rounded-2xl p-8 text-center max-w-120 mx-auto"
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white">
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m5 12 5 5L20 7" />
          </svg>
        </div>
        <p className="font-serif text-[1.2rem] text-navy mb-2">{t('successTitle')}</p>
        <p className="text-text-mid text-[.88rem] leading-[1.65]">
          {state.message ?? t('successBody')}
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="flex gap-3 max-w-120 mx-auto max-md:flex-col"
      aria-label={ariaLabel}
      aria-describedby={state.message ? `${formId}-error` : undefined}
      noValidate
    >
      {/* Honeypot — visually hidden but available to bots. Real users won't fill it. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Leave this field empty</label>
        <input id={`${formId}-website`} type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex-1">
        <label htmlFor={`${formId}-email`} className="sr-only">Email address</label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          required
          placeholder="Your email address"
          autoComplete="email"
          className="w-full py-3.5 px-5 rounded-xl border border-border bg-white text-text text-[.88rem] outline-none focus:border-navy focus:ring-2 focus:ring-navy/20 transition-all font-sans"
        />
      </div>
      <SubmitButton label={buttonText} />

      {state.message && !state.ok && (
        <p id={`${formId}-error`} className="text-[.78rem] text-red-600 mt-1 text-center w-full" role="alert">
          {state.message}
        </p>
      )}
    </form>
  );
}
