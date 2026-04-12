'use client';

import { useActionState, useId } from 'react';
import { useFormStatus } from 'react-dom';
import { useTranslations } from 'next-intl';
import { sendContactEmail, type ContactFormState } from './actions';
import { cn } from '@/lib/utils';

const initialState: ContactFormState = { ok: false };

// Format US phone numbers as the user types: 5551234567 → (555) 123-4567.
// Numbers starting with "+" are treated as international and left mostly
// alone (digits + spaces only) so users can type their own format without
// us mangling it.
function formatPhoneNumber(value: string): string {
  if (value.startsWith('+')) return value.replace(/[^\d+ ]/g, '').slice(0, 20);
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length === 0) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

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
            defaultValue={state.values?.name ?? ''}
            key={`name-${state.values?.name ?? ''}`}
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
            defaultValue={state.values?.email ?? ''}
            key={`email-${state.values?.email ?? ''}`}
            aria-invalid={state.errors?.email ? 'true' : undefined}
            aria-describedby={state.errors?.email ? `${formId}-email-err` : undefined}
          />
          {state.errors?.email && (
            <p id={`${formId}-email-err`} className={errorText}>{state.errors.email[0]}</p>
          )}
        </div>
      </div>

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
          defaultValue={state.values?.phone ?? ''}
          key={`phone-${state.values?.phone ?? ''}`}
          onInput={(e) => {
            // Live-format phone numbers without making the input controlled
            // (controlled inputs caused a hydration mismatch in production).
            // We mutate the DOM value directly and restore the cursor offset
            // adjusted for added/removed formatting characters so the caret
            // doesn't jump to the end while the user is editing the middle.
            const input = e.currentTarget;
            const cursor = input.selectionStart ?? input.value.length;
            const before = input.value;
            const after = formatPhoneNumber(before);
            if (before === after) return;
            input.value = after;
            const next = Math.max(0, cursor + (after.length - before.length));
            input.setSelectionRange(next, next);
          }}
          aria-invalid={state.errors?.phone ? 'true' : undefined}
          aria-describedby={state.errors?.phone ? `${formId}-phone-err` : undefined}
        />
        {state.errors?.phone && (
          <p id={`${formId}-phone-err`} className={errorText}>{state.errors.phone[0]}</p>
        )}
      </div>

      <fieldset className="min-w-0">
        <legend className={labelBase}>{t('concernLabel')}</legend>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={t('concernLabel')}>
          {(['acne', 'rosacea', 'antiAging', 'pigmentation', 'sensitivity', 'other'] as const).map((opt) => (
            <label
              key={opt}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-white px-3.5 py-2 text-[.82rem] font-medium text-text-mid transition-colors has-[:checked]:border-navy has-[:checked]:bg-navy-pale has-[:checked]:text-navy-deep"
            >
              <input
                type="radio"
                name="concern"
                value={opt}
                className="sr-only"
                defaultChecked={state.values?.concern === opt}
                key={`concern-${opt}-${state.values?.concern ?? ''}`}
              />
              {t(`concern${opt.charAt(0).toUpperCase() + opt.slice(1)}` as 'concernAcne')}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-5">
        <fieldset className="min-w-0">
          <legend className={labelBase}>{t('preferredContactLabel')}</legend>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={t('preferredContactLabel')}>
            {(['phone', 'whatsapp', 'email'] as const).map((opt) => (
              <label
                key={opt}
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-white px-3.5 py-2 text-[.82rem] font-medium text-text-mid transition-colors has-[:checked]:border-navy has-[:checked]:bg-navy-pale has-[:checked]:text-navy-deep"
              >
                <input
                  type="radio"
                  name="preferredContact"
                  value={opt}
                  className="sr-only"
                  defaultChecked={state.values?.preferredContact === opt}
                  key={`preferredContact-${opt}-${state.values?.preferredContact ?? ''}`}
                />
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
                <input
                  type="radio"
                  name="bestTime"
                  value={opt}
                  className="sr-only"
                  defaultChecked={state.values?.bestTime === opt}
                  key={`bestTime-${opt}-${state.values?.bestTime ?? ''}`}
                />
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
          defaultValue={state.values?.message ?? ''}
          key={`message-${state.values?.message ?? ''}`}
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
