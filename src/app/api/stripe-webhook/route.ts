import { NextResponse, type NextRequest } from 'next/server';
import { Resend } from 'resend';
import type Stripe from 'stripe';
import { getStripe } from '@/lib/stripe-server';

/*
 * Stripe webhook receiver — fires whenever Stripe finishes a checkout.
 *
 * Single event we care about: `checkout.session.completed`. When that fires
 * we (a) verify the signature so we trust the payload, (b) expand the
 * line_items so we know exactly what was bought, and (c) email Marta a
 * formatted order summary via Resend (mirroring the contact-form pattern at
 * [locale]/contact/actions.ts) so she can pack and ship.
 *
 * Stripe sends the customer their own receipt automatically — we don't need
 * to do that. The customer-facing /checkout/success page is just a "thank
 * you" landing.
 *
 * IMPORTANT: webhook signature verification needs the RAW request body. In
 * the App Router we get it via `await req.text()` — calling `req.json()`
 * would parse and re-stringify, which mangles whitespace and breaks the
 * signature. The route also exports `runtime = 'nodejs'` because the Stripe
 * SDK uses Node's `crypto` module under the hood; the Edge runtime would
 * silently fail signature verification.
 *
 * Set up:
 *   1. Deploy this file
 *   2. In Stripe Dashboard → Developers → Webhooks → Add endpoint
 *      URL: https://360radianceskincare.com/api/stripe-webhook
 *      Events: checkout.session.completed
 *   3. Copy the signing secret → set STRIPE_WEBHOOK_SECRET in Vercel
 *   4. Redeploy (Vercel auto-rebuilds on env var change)
 */
export const runtime = 'nodejs';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatMoney(amountCents: number | null | undefined, currency: string | null | undefined): string {
  if (amountCents == null) return '—';
  const dollars = (amountCents / 100).toFixed(2);
  return `${(currency ?? 'usd').toUpperCase()} $${dollars}`;
}

function formatAddress(addr: Stripe.Address | null | undefined): string {
  if (!addr) return '—';
  return [
    addr.line1,
    addr.line2,
    [addr.city, addr.state, addr.postal_code].filter(Boolean).join(', '),
    addr.country,
  ]
    .filter(Boolean)
    .join('\n');
}

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  if (!stripe) {
    // Webhook hit but Stripe isn't configured. Return 200 so Stripe doesn't
    // retry forever — there's nothing for us to do.
    return NextResponse.json({ received: true, skipped: 'stripe-not-configured' });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('[stripe-webhook] STRIPE_WEBHOOK_SECRET is not set');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  // Raw body for signature verification — see file header comment.
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown signature error';
    console.error('[stripe-webhook] signature verification failed:', message);
    return NextResponse.json({ error: `Invalid signature: ${message}` }, { status: 400 });
  }

  // Only handle the one event we care about. Acknowledge everything else
  // with 200 so Stripe stops retrying.
  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true, ignored: event.type });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // Expand line items + customer details — the webhook payload doesn't
  // include them by default, we have to retrieve them.
  let lineItems: Stripe.LineItem[] = [];
  try {
    const list = await stripe.checkout.sessions.listLineItems(session.id, { limit: 50 });
    lineItems = list.data;
  } catch (err) {
    console.error('[stripe-webhook] could not list line items for', session.id, err);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_NOTIFICATION_EMAIL_TO ?? process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM;

  if (!apiKey || !to || !from) {
    console.error('[stripe-webhook] Missing RESEND_API_KEY / ORDER_NOTIFICATION_EMAIL_TO / CONTACT_EMAIL_FROM — order received but no email sent', session.id);
    // Still return 200 — Stripe shouldn't retry.
    return NextResponse.json({ received: true, emailSent: false });
  }

  const customerEmail = session.customer_details?.email ?? '—';
  const customerName = session.customer_details?.name ?? 'Customer';
  const total = formatMoney(session.amount_total, session.currency);
  const subtotal = formatMoney(session.amount_subtotal, session.currency);
  const shipping = formatMoney(session.shipping_cost?.amount_total, session.currency);
  // Stripe SDK 18+ moved shipping_details under collected_information.
  const shippingAddress = formatAddress(session.collected_information?.shipping_details?.address);
  const phone = session.customer_details?.phone ?? '—';
  const dashboardUrl = `https://dashboard.stripe.com/${session.livemode ? '' : 'test/'}payments/${session.payment_intent}`;

  // Plain-text version (Marta will skim this in mobile mail apps)
  const textLines: string[] = [
    `New 360 Radiance order — ${customerName}`,
    ``,
    `Total: ${total}`,
    `Subtotal: ${subtotal}`,
    `Shipping: ${shipping}`,
    ``,
    `Customer: ${customerName}`,
    `Email: ${customerEmail}`,
    `Phone: ${phone}`,
    ``,
    `Ship to:`,
    shippingAddress,
    ``,
    `Items:`,
    ...lineItems.map((li) => `  • ${li.quantity}× ${li.description ?? 'Item'} — ${formatMoney(li.amount_total, li.currency)}`),
    ``,
    `Stripe session: ${session.id}`,
    `View in dashboard: ${dashboardUrl}`,
  ];

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#1A2332;line-height:1.6;max-width:580px">
      <h2 style="margin:0 0 6px;font-size:18px">New 360 Radiance order</h2>
      <p style="margin:0 0 18px;color:#6B7280;font-size:13px">Stripe just confirmed payment. Time to pack and ship.</p>

      <div style="background:#FAF8F5;border-radius:12px;padding:18px 20px;margin-bottom:18px">
        <div style="font-size:13px;color:#6B7280;margin-bottom:4px">Order total</div>
        <div style="font-size:24px;font-weight:600;color:#2F3269">${escapeHtml(total)}</div>
        <div style="font-size:12px;color:#6B7280;margin-top:6px">Subtotal ${escapeHtml(subtotal)} · Shipping ${escapeHtml(shipping)}</div>
      </div>

      <h3 style="margin:18px 0 8px;font-size:14px;color:#2F3269">Customer</h3>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        <tr><td style="padding:5px 0;color:#7F8FA0;width:120px">Name</td><td style="padding:5px 0">${escapeHtml(customerName)}</td></tr>
        <tr><td style="padding:5px 0;color:#7F8FA0">Email</td><td style="padding:5px 0"><a href="mailto:${escapeHtml(customerEmail)}">${escapeHtml(customerEmail)}</a></td></tr>
        <tr><td style="padding:5px 0;color:#7F8FA0">Phone</td><td style="padding:5px 0">${escapeHtml(phone)}</td></tr>
      </table>

      <h3 style="margin:18px 0 8px;font-size:14px;color:#2F3269">Ship to</h3>
      <p style="margin:0;white-space:pre-wrap;background:#F2F2FA;padding:12px 14px;border-radius:10px;font-size:13px">${escapeHtml(shippingAddress)}</p>

      <h3 style="margin:18px 0 8px;font-size:14px;color:#2F3269">Items (${lineItems.length})</h3>
      <table style="border-collapse:collapse;width:100%;font-size:14px;border-top:1px solid #E5E7EB">
        ${lineItems
          .map(
            (li) => `
          <tr style="border-bottom:1px solid #E5E7EB">
            <td style="padding:10px 0;color:#1A2332">${escapeHtml(li.description ?? 'Item')}</td>
            <td style="padding:10px 0;color:#6B7280;text-align:center;width:60px">${li.quantity ?? 1}×</td>
            <td style="padding:10px 0;color:#1A2332;text-align:right;font-variant-numeric:tabular-nums;width:100px">${escapeHtml(formatMoney(li.amount_total, li.currency))}</td>
          </tr>`,
          )
          .join('')}
      </table>

      <p style="margin:24px 0 0;font-size:12px;color:#6B7280">
        <a href="${dashboardUrl}" style="color:#2F3269">View in Stripe dashboard →</a>
      </p>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    const replyTo = customerEmail !== '—' ? customerEmail : undefined;
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo,
      subject: `360 Radiance Inc — New order — ${customerName} — ${total}`,
      text: textLines.join('\n'),
      html,
    });
    if (error) {
      console.error('[stripe-webhook] Resend error:', error);
      // Still return 200 — Stripe should NOT retry, the order is real and
      // we can recover from a missing notification email manually via the
      // Stripe dashboard.
    }
  } catch (err) {
    console.error('[stripe-webhook] Resend exception:', err);
  }

  return NextResponse.json({ received: true });
}
