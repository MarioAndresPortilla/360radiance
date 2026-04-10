'use client';

import { useActionState, useId } from 'react';
import { useFormStatus } from 'react-dom';
import { useTranslations } from 'next-intl';
import { subscribeToNewsletter, type NewsletterFormState } from '@/lib/newsletter-actions';
import { cn } from '@/lib/utils';

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
 *   1. /blog page (dark bg — variant="dark")
 *   2. Homepage pre-footer (light bg — variant="light", the default)
 *
 * `useId()` namespaces the email input/label so multiple instances on the
 * same page don't break label-for / aria associations or pre-fill each other.
 */
type Props = {
  /** Submit button label override (e.g. "Get Skin Tips" on homepage). */
  buttonText?: string;
  /** Visually-hidden form aria-label override. */
  ariaLabel?: string;
  /** Color scheme: "light" for light backgrounds, "dark" for navy-deep. */
  variant?: 'light' | 'dark';
};

const initialState: NewsletterFormState = { ok: false };

function SubmitButton({ label, variant }: { label: string; variant: 'light' | 'dark' }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={cn(
        'py-3.5 px-8 rounded-xl font-semibold text-[.88rem] border-none cursor-pointer transition-all hover:-translate-y-px hover:shadow-md font-sans shrink-0 disabled:opacity-60 disabled:cursor-wait disabled:hover:translate-y-0',
        variant === 'dark'
          ? 'bg-white text-navy-deep hover:bg-gold'
          : 'bg-navy text-white hover:bg-navy-deep',
      )}
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

export function NewsletterSignup({ buttonText = 'Subscribe', ariaLabel = 'Subscribe to newsletter', variant = 'light' }: Props) {
  const formId = useId();
  const t = useTranslations('newsletter');
  const [state, formAction] = useActionState(subscribeToNewsletter, initialState);

  if (state.ok) {
    return (
      <div
        className={cn(
          'rounded-2xl p-8 text-center max-w-120 mx-auto border',
          variant === 'dark'
            ? 'bg-white/10 border-white/15'
            : 'bg-navy-pale border-navy/20',
        )}
        role="status"
        aria-live="polite"
      >
        <div className={cn(
          'mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full',
          variant === 'dark' ? 'bg-gold text-navy-deep' : 'bg-navy text-white',
        )}>
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m5 12 5 5L20 7" />
          </svg>
        </div>
        <p className={cn('font-serif text-[1.2rem] mb-2', variant === 'dark' ? 'text-white' : 'text-navy')}>
          {t('successTitle')}
        </p>
        <p className={cn('text-[.88rem] leading-[1.65]', variant === 'dark' ? 'text-white/60' : 'text-text-mid')}>
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
          className={cn(
            'w-full py-3.5 px-5 rounded-xl border text-[.88rem] outline-none transition-all font-sans',
            variant === 'dark'
              ? 'border-white/20 bg-white/[.12] text-white placeholder:text-white/50 focus:border-gold/50 focus:ring-2 focus:ring-gold/15 backdrop-blur-sm'
              : 'border-border bg-white text-text placeholder:text-text-faint focus:border-navy focus:ring-2 focus:ring-navy/20',
          )}
        />
      </div>
      <SubmitButton label={buttonText} variant={variant} />

      {state.message && !state.ok && (
        <p
          id={`${formId}-error`}
          className={cn('text-[.78rem] mt-1 text-center w-full', variant === 'dark' ? 'text-red-300' : 'text-red-600')}
          role="alert"
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
