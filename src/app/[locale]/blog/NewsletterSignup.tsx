'use client';

import { useId, useState } from 'react';

/*
 * Newsletter signup form. Currently a stub — sets `submitted = true` without
 * actually sending the email anywhere. The backend wiring is intentionally
 * deferred until we pick an ESP (Mailchimp / Beehiiv / Resend Audiences) so
 * the form doesn't silently drop subscribers into a void.
 *
 * Used in two places (so form-element id collisions matter):
 *   1. /blog page (bottom of article list)
 *   2. Homepage pre-footer
 *
 * `useId()` namespaces the email input and label so multiple instances on the
 * same page don't break label-for / aria associations. Pre-`useId` we'd risk
 * either breaking accessibility or the second instance pre-filling the first.
 */
type Props = {
  /** Submit button label override (e.g. "Get Skin Tips" on homepage). */
  buttonText?: string;
  /** Visually-hidden form aria-label override. */
  ariaLabel?: string;
};

export function NewsletterSignup({ buttonText = 'Subscribe', ariaLabel = 'Subscribe to newsletter' }: Props) {
  const formId = useId();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-navy-pale rounded-2xl p-8 text-center" role="status" aria-live="polite">
        <p className="font-serif text-[1.2rem] text-navy mb-2">You&apos;re in!</p>
        <p className="text-text-mid text-[.88rem]">
          Check your inbox for a welcome email. Your first article arrives next week.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 max-w-120 mx-auto max-md:flex-col" aria-label={ariaLabel}>
      <div className="flex-1">
        <label htmlFor={`${formId}-email`} className="sr-only">Email address</label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          required
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="w-full py-3.5 px-5 rounded-xl border border-border bg-white text-text text-[.88rem] outline-none focus:border-navy focus:ring-2 focus:ring-navy/20 transition-all font-sans"
        />
      </div>
      <button
        type="submit"
        className="bg-navy text-white py-3.5 px-8 rounded-xl font-semibold text-[.88rem] border-none cursor-pointer transition-all hover:bg-navy-deep hover:-translate-y-px hover:shadow-md font-sans shrink-0"
      >
        {buttonText}
      </button>
    </form>
  );
}
