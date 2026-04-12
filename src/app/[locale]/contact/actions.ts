'use server';

import { Resend } from 'resend';
import { z } from 'zod';

// Single source of truth for which fields the form accepts and how they are
// validated. Mirrored on the client purely for type-safety; server is
// authoritative.
const ContactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(100),
  email: z.string().trim().email('Please enter a valid email address').max(200),
  phone: z.string().trim().min(7, 'Please enter a valid phone number').max(40),
  concern: z.enum(['acne', 'rosacea', 'antiAging', 'pigmentation', 'sensitivity', 'other']).optional(),
  preferredContact: z.enum(['phone', 'whatsapp', 'email']).optional(),
  bestTime: z.enum(['morning', 'afternoon', 'evening', 'anytime']).optional(),
  message: z.string().trim().min(10, 'Please tell us a bit about what brings you in').max(2000),
  // Honeypot — real users won't fill this hidden field; bots usually do.
  website: z.string().max(0).optional(),
});

// Subset of form fields we echo back on error so the client can repopulate
// the inputs instead of wiping the user's work. React 19's useActionState
// does NOT automatically preserve form field values across a failed server
// action — inputs are uncontrolled by default, and re-renders don't touch
// their DOM values. The fix is to stash the submitted strings in state here
// and pass them as `defaultValue` on re-render.
export type ContactFormValues = {
  name?: string;
  email?: string;
  phone?: string;
  concern?: string;
  preferredContact?: string;
  bestTime?: string;
  message?: string;
};

export type ContactFormState = {
  ok: boolean;
  message?: string;
  errors?: Partial<Record<keyof z.infer<typeof ContactSchema>, string[]>>;
  values?: ContactFormValues;
};

function pickValues(formData: FormData): ContactFormValues {
  const getStr = (k: string) => {
    const v = formData.get(k);
    return typeof v === 'string' ? v : undefined;
  };
  return {
    name: getStr('name'),
    email: getStr('email'),
    phone: getStr('phone'),
    concern: getStr('concern'),
    preferredContact: getStr('preferredContact'),
    bestTime: getStr('bestTime'),
    message: getStr('message'),
  };
}

const CONCERN_LABELS: Record<string, string> = {
  acne: 'Acne',
  rosacea: 'Rosacea',
  antiAging: 'Anti-aging / fine lines',
  pigmentation: 'Hyperpigmentation',
  sensitivity: 'Sensitive / reactive skin',
  other: 'Other',
};

const PREFERRED_LABELS: Record<string, string> = {
  phone: 'Phone',
  whatsapp: 'WhatsApp',
  email: 'Email',
};

const TIME_LABELS: Record<string, string> = {
  morning: 'Morning',
  afternoon: 'Afternoon',
  evening: 'Evening',
  anytime: 'Anytime',
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function sendContactEmail(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    concern: formData.get('concern') || undefined,
    preferredContact: formData.get('preferredContact') || undefined,
    bestTime: formData.get('bestTime') || undefined,
    message: formData.get('message'),
    website: formData.get('website') || undefined,
  };

  const submittedValues = pickValues(formData);

  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      message: 'Please correct the highlighted fields and try again.',
      errors: parsed.error.flatten().fieldErrors as ContactFormState['errors'],
      values: submittedValues,
    };
  }

  // Honeypot tripped — silently report success so bots don't learn anything,
  // but don't actually send the email.
  if (parsed.data.website) {
    return { ok: true, message: 'Thanks! We\'ll be in touch shortly.' };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM;

  // Fail loud with the *specific* missing key so production misconfiguration
  // is diagnosable from logs alone. Never leak the API key value itself —
  // only whether it's present.
  if (!apiKey || !to || !from) {
    const missing: string[] = [];
    if (!apiKey) missing.push('RESEND_API_KEY');
    if (!to) missing.push('CONTACT_EMAIL_TO');
    if (!from) missing.push('CONTACT_EMAIL_FROM');
    console.error(`[contact] Missing env vars: ${missing.join(', ')}`);
    return {
      ok: false,
      message: 'Email service is not configured yet. Please call or message us directly while we get this fixed.',
      values: submittedValues,
    };
  }

  const { name, email, phone, concern, preferredContact, bestTime, message } = parsed.data;

  const lines: string[] = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
  ];
  if (concern) lines.push(`Skin concern: ${CONCERN_LABELS[concern] ?? concern}`);
  if (preferredContact) lines.push(`Preferred contact: ${PREFERRED_LABELS[preferredContact] ?? preferredContact}`);
  if (bestTime) lines.push(`Best time to reach: ${TIME_LABELS[bestTime] ?? bestTime}`);
  lines.push('', 'Message:', message);

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#1A2332;line-height:1.6;max-width:560px">
      <h2 style="margin:0 0 16px;font-size:18px">New consultation request</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        <tr><td style="padding:6px 0;color:#7F8FA0;width:140px">Name</td><td style="padding:6px 0">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#7F8FA0">Email</td><td style="padding:6px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#7F8FA0">Phone</td><td style="padding:6px 0"><a href="tel:${escapeHtml(phone.replace(/[^+\d]/g, ''))}">${escapeHtml(phone)}</a></td></tr>
        ${concern ? `<tr><td style="padding:6px 0;color:#7F8FA0">Skin concern</td><td style="padding:6px 0">${escapeHtml(CONCERN_LABELS[concern] ?? concern)}</td></tr>` : ''}
        ${preferredContact ? `<tr><td style="padding:6px 0;color:#7F8FA0">Preferred contact</td><td style="padding:6px 0">${escapeHtml(PREFERRED_LABELS[preferredContact] ?? preferredContact)}</td></tr>` : ''}
        ${bestTime ? `<tr><td style="padding:6px 0;color:#7F8FA0">Best time</td><td style="padding:6px 0">${escapeHtml(TIME_LABELS[bestTime] ?? bestTime)}</td></tr>` : ''}
      </table>
      <h3 style="margin:24px 0 8px;font-size:14px;color:#1A7F7E">Message</h3>
      <p style="margin:0;white-space:pre-wrap;background:#FAF8F5;padding:14px 16px;border-radius:10px">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `360 Radiance Inc — New consultation request — ${name}`,
      text: lines.join('\n'),
      html,
    });
    if (error) {
      console.error('[contact] Resend error:', error);
      return {
        ok: false,
        message: 'Something went wrong sending your message. Please call or WhatsApp us instead.',
        values: submittedValues,
      };
    }
    return {
      ok: true,
      message: 'Thanks! We received your message and will reach out shortly.',
    };
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return {
      ok: false,
      message: 'Something went wrong sending your message. Please call or WhatsApp us instead.',
      values: submittedValues,
    };
  }
}
