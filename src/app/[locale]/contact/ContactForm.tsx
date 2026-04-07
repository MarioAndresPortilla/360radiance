'use client';

import { useActionState, useId } from 'react';
import { useFormStatus } from 'react-dom';
import { useTranslations } from 'next-intl';
import { sendContactEmail, type ContactFormState } from './actions';
import { cn } from '@/lib/utils';

const initialState: ContactFormState = { ok: false };

const inputBase =
  'w-full rounded-xl border border-border bg-white px-4 py-3 text-[.95rem] text-text placeholder:text-text-faint transition-colors focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/15';

const labelBase = 'block text-[.78rem] font-semibold text-text mb-2';
const errorText = 'mt-1.5 text-[.75rem] text-red-600';
const requiredMark = <span className="text-navy" aria-hidden="true">*</span>;

function SubmitButton({ label, sendingLabel }: { label: string; sendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-8 py-4 text-[.95rem] font-semibold text-white shadow-md transition-all',
        'hover:bg-navy-deep hover:-translate-y-px hover:shadow-lg',
        'disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0',
      )}
      aria-busy={pending}
    >
      {pending ? (
        <>
          <svg className="animate-spin" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden="true">
            <path d="M12 3a9 9 0 1 0 9 9" />
          </svg>
          {sendingLabel}
        </>
      ) : (
        <>
          {label}
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </>
      )}
    </button>
  );
}

export function ContactForm() {
  const t = useTranslations('contact.form');
  const [state, formAction] = useActionState(sendContactEmail, initialState);
  const formId = useId();

  if (state.ok) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-navy-pale border border-navy/20 rounded-2xl p-8 text-center"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white">
          <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m5 12 5 5L20 7" />
          </svg>
        </div>
        <h3 className="font-serif text-[1.4rem] text-text mb-2">{t('successTitle')}</h3>
        <p className="text-text-mid text-[.95rem] leading-relaxed max-w-100 mx-auto">
          {state.message ?? t('successBody')}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-5" noValidate aria-describedby={`${formId}-status`}>
      {/* Honeypot — visually hidden but available to bots */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Leave this field empty</label>
        <input id={`${formId}-website`} type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-5">
        <div>
          <label htmlFor={`${formId}-name`} className={labelBase}>
            {t('nameLabel')} {requiredMark}
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={t('namePlaceholder')}
            className={inputBase}
            aria-invalid={state.errors?.name ? 'true' : undefined}
            aria-describedby={state.errors?.name ? `${formId}-name-err` : undefined}
          />
          {state.errors?.name && (
            <p id={`${formId}-name-err`} className={errorText}>{state.errors.name[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-email`} className={labelBase}>
            {t('emailLabel')} {requiredMark}
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            placeholder={t('emailPlaceholder')}
            className={inputBase}
            aria-invalid={state.errors?.email ? 'true' : undefined}
            aria-describedby={state.errors?.email ? `${formId}-email-err` : undefined}
          />
          {state.errors?.email && (
            <p id={`${formId}-email-err`} className={errorText}>{state.errors.email[0]}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-5">
        <div>
          <label htmlFor={`${formId}-phone`} className={labelBase}>
            {t('phoneLabel')} {requiredMark}
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            placeholder={t('phonePlaceholder')}
            className={inputBase}
            aria-invalid={state.errors?.phone ? 'true' : undefined}
            aria-describedby={state.errors?.phone ? `${formId}-phone-err` : undefined}
          />
          {state.errors?.phone && (
            <p id={`${formId}-phone-err`} className={errorText}>{state.errors.phone[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor={`${formId}-concern`} className={labelBase}>
            {t('concernLabel')}
          </label>
          <select
            id={`${formId}-concern`}
            name="concern"
            defaultValue=""
            className={cn(inputBase, 'appearance-none bg-[length:1.1em] bg-no-repeat bg-[right_1rem_center] pr-10')}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%231A7F7E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")",
            }}
          >
            <option value="">{t('concernPlaceholder')}</option>
            <option value="acne">{t('concernAcne')}</option>
            <option value="rosacea">{t('concernRosacea')}</option>
            <option value="antiAging">{t('concernAntiAging')}</option>
            <option value="pigmentation">{t('concernPigmentation')}</option>
            <option value="sensitivity">{t('concernSensitivity')}</option>
            <option value="other">{t('concernOther')}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-5">
        <fieldset className="min-w-0">
          <legend className={labelBase}>{t('preferredContactLabel')}</legend>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={t('preferredContactLabel')}>
            {(['phone', 'whatsapp', 'email'] as const).map((opt) => (
              <label
                key={opt}
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-white px-3.5 py-2 text-[.82rem] font-medium text-text-mid transition-colors has-[:checked]:border-navy has-[:checked]:bg-navy-pale has-[:checked]:text-navy-deep"
              >
                <input type="radio" name="preferredContact" value={opt} className="sr-only" />
                {t(`preferredContact_${opt}` as 'preferredContact_phone')}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="min-w-0">
          <legend className={labelBase}>{t('bestTimeLabel')}</legend>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={t('bestTimeLabel')}>
            {(['morning', 'afternoon', 'evening', 'anytime'] as const).map((opt) => (
              <label
                key={opt}
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-white px-3.5 py-2 text-[.82rem] font-medium text-text-mid transition-colors has-[:checked]:border-navy has-[:checked]:bg-navy-pale has-[:checked]:text-navy-deep"
              >
                <input type="radio" name="bestTime" value={opt} className="sr-only" />
                {t(`bestTime_${opt}` as 'bestTime_morning')}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className={labelBase}>
          {t('messageLabel')} {requiredMark}
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={5}
          required
          placeholder={t('messagePlaceholder')}
          className={cn(inputBase, 'resize-y min-h-32')}
          aria-invalid={state.errors?.message ? 'true' : undefined}
          aria-describedby={state.errors?.message ? `${formId}-message-err` : undefined}
        />
        {state.errors?.message && (
          <p id={`${formId}-message-err`} className={errorText}>{state.errors.message[0]}</p>
        )}
      </div>

      <p className="text-[.75rem] text-text-light leading-relaxed">
        {t('privacy')}
      </p>

      <div className="flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-stretch">
        <SubmitButton label={t('submit')} sendingLabel={t('sending')} />
        <p
          id={`${formId}-status`}
          aria-live="polite"
          className={cn('text-[.85rem]', state.ok ? 'text-navy-deep' : 'text-red-600')}
        >
          {!state.ok && state.message ? state.message : ''}
        </p>
      </div>
    </form>
  );
}
