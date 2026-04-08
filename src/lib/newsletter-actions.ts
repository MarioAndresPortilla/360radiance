'use server';

import { Resend } from 'resend';
import { z } from 'zod';

/*
 * Newsletter signup server action.
 *
 * Strategy: we don't run our own database. Instead the signup writes to a
 * Resend Audience (if RESEND_AUDIENCE_ID is set) and ALSO emails Marta a
 * notification so signups never get silently lost. The audience write is the
 * "real db" — when Marta is ready to broadcast she creates a campaign in the
 * Resend dashboard and targets the audience. Until she sets the env var, the
 * email notification is the only persistence.
 *
 * Mirrors the contact form action at [locale]/contact/actions.ts so the
 * Resend wiring stays consistent across the site.
 *
 * Honeypot: a hidden `website` field that real users won't fill but bots will.
 * Tripped honeypot returns success silently so bots can't probe for behavior
 * differences.
 */
const NewsletterSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address').max(200),
  // Honeypot — must be empty for a real submission.
  website: z.string().max(0).optional(),
});

export type NewsletterFormState = {
  ok: boolean;
  message?: string;
};

export async function subscribeToNewsletter(
  _prevState: NewsletterFormState,
  formData: FormData,
): Promise<NewsletterFormState> {
  const parsed = NewsletterSchema.safeParse({
    email: formData.get('email'),
    website: formData.get('website') || undefined,
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: 'Please enter a valid email address.',
    };
  }

  // Honeypot tripped — silently report success so bots don't learn anything.
  if (parsed.data.website) {
    return { ok: true, message: 'Thanks! You\'re on the list.' };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !to || !from) {
    console.error('[newsletter] Missing RESEND_API_KEY / CONTACT_EMAIL_TO / CONTACT_EMAIL_FROM');
    return {
      ok: false,
      message: 'Subscription is temporarily unavailable. Please try again in a moment.',
    };
  }

  const { email } = parsed.data;
  const resend = new Resend(apiKey);

  // 1. Try to add the contact to the Resend Audience. This is the "db".
  // If RESEND_AUDIENCE_ID isn't set yet (Marta hasn't created the audience),
  // we skip this step and rely on the email notification only — signups still
  // work, they just don't auto-populate the broadcast list yet.
  let audienceWriteOk = false;
  let audienceWriteSkipped = !audienceId;
  if (audienceId) {
    try {
      const { error } = await resend.contacts.create({
        audienceId,
        email,
        unsubscribed: false,
      });
      if (error) {
        // Resend treats duplicate contacts as an error — that's fine, the
        // address is already in the audience so the user is "in" anyway.
        const msg = (error as { message?: string }).message ?? '';
        if (msg.toLowerCase().includes('already exists') || msg.toLowerCase().includes('duplicate')) {
          audienceWriteOk = true;
        } else {
          console.error('[newsletter] Resend audience write error:', error);
        }
      } else {
        audienceWriteOk = true;
      }
    } catch (err) {
      // Don't fail the user-facing signup if the audience write blows up —
      // the notification email below is the safety net.
      console.error('[newsletter] Resend audience write exception:', err);
    }
  }

  // 2. Always email Marta a notification so she sees signups in real time and
  // has a backup record even if the audience write was skipped or failed.
  try {
    const subject = `360 Radiance Inc — Newsletter signup — ${email}`;
    const text = [
      `New newsletter signup`,
      ``,
      `Email: ${email}`,
      `Audience: ${audienceWriteOk ? 'added to Resend audience' : audienceWriteSkipped ? 'audience not configured (set RESEND_AUDIENCE_ID)' : 'audience write FAILED — see server logs'}`,
      `Time: ${new Date().toISOString()}`,
    ].join('\n');
    const html = `
      <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#1A2332;line-height:1.6;max-width:560px">
        <h2 style="margin:0 0 16px;font-size:18px">New newsletter signup</h2>
        <table style="border-collapse:collapse;width:100%;font-size:14px">
          <tr><td style="padding:6px 0;color:#7F8FA0;width:140px">Email</td><td style="padding:6px 0"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:6px 0;color:#7F8FA0">Audience</td><td style="padding:6px 0">${audienceWriteOk ? '✓ added to Resend audience' : audienceWriteSkipped ? '⚠ audience not configured' : '✗ audience write failed'}</td></tr>
          <tr><td style="padding:6px 0;color:#7F8FA0">Time</td><td style="padding:6px 0">${new Date().toISOString()}</td></tr>
        </table>
      </div>
    `;
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text,
      html,
    });
    if (error) {
      console.error('[newsletter] Resend notification error:', error);
      // Even if notification fails, if the audience write succeeded the signup
      // is still recorded — return ok in that case.
      if (!audienceWriteOk) {
        return {
          ok: false,
          message: 'Something went wrong on our end. Please try again or message us directly.',
        };
      }
    }
  } catch (err) {
    console.error('[newsletter] Resend notification exception:', err);
    if (!audienceWriteOk) {
      return {
        ok: false,
        message: 'Something went wrong on our end. Please try again or message us directly.',
      };
    }
  }

  return {
    ok: true,
    message: 'Thanks! You\'re on the list. Watch your inbox for the first issue.',
  };
}
