import { NextResponse, type NextRequest } from 'next/server';
import { headers } from 'next/headers';
import { z } from 'zod';
import { PRODUCTS } from '@/lib/constants';
import { getStripe } from '@/lib/stripe-server';
import { SITE_URL } from '@/lib/seo';

/*
 * Stripe Checkout Session creation endpoint.
 *
 * POST body: { items: [{ slug, qty }], locale: 'en' | 'es' }
 * Response:  { url: string }   ← Stripe-hosted Checkout URL; client redirects
 *
 * Strategy: pass `price_data` inline for each line item rather than syncing a
 * Stripe Products catalog. The product source of truth stays in
 * src/data/products.ts — Stripe just records each transaction with the line
 * items the user actually paid for. No sync drift, no Stripe Dashboard data
 * entry, price changes are a one-file commit.
 *
 * Shipping is a flat $8 USD with free shipping over $75 subtotal. Stripe
 * collects the address itself (US only — Marta isn't shipping international
 * yet). Tax is intentionally OFF — Marta absorbs FL sales tax for now;
 * flipping the switch later is one line: `automatic_tax: { enabled: true }`.
 *
 * Runtime: nodejs (NOT edge). The Stripe SDK depends on Node's `crypto` for
 * webhook signature verification, and although this endpoint doesn't verify
 * webhooks, keeping all Stripe routes on the same runtime simplifies
 * deployment + caching mental model.
 */
export const runtime = 'nodejs';

const Body = z.object({
  items: z
    .array(
      z.object({
        slug: z.string().min(1).max(120),
        qty: z.number().int().min(1).max(20),
      }),
    )
    .min(1)
    .max(20),
  locale: z.enum(['en', 'es']),
});

const FREE_SHIPPING_THRESHOLD_CENTS = 7500;
const FLAT_SHIPPING_CENTS = 800;

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  if (!stripe) {
    // Build deployed without Stripe configured. Return 503 — the cart UI
    // is supposed to be hidden in this case, so reaching this branch means
    // someone hand-crafted a request. Tell them honestly.
    return NextResponse.json(
      { error: 'Checkout is not configured yet. Please contact us to place an order.' },
      { status: 503 },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid cart' }, { status: 400 });
  }

  const productMap = new Map(PRODUCTS.map((p) => [p.slug, p]));

  // Build line items, rejecting any unknown slug. We trust price/name from
  // the catalog (NOT from the client) so a tampered request can't change the
  // price.
  const lineItems: Array<{
    price_data: {
      currency: string;
      unit_amount: number;
      product_data: { name: string; description: string; images: string[]; metadata: Record<string, string> };
    };
    quantity: number;
  }> = [];

  for (const { slug, qty } of parsed.data.items) {
    const product = productMap.get(slug);
    if (!product) {
      return NextResponse.json({ error: `Unknown product: ${slug}` }, { status: 400 });
    }
    lineItems.push({
      price_data: {
        currency: 'usd',
        unit_amount: Math.round(product.price * 100),
        product_data: {
          name: product.name,
          description: product.tagline,
          images: [`${SITE_URL}${product.image}`],
          metadata: { slug: product.slug, category: product.category },
        },
      },
      quantity: qty,
    });
  }

  // Free shipping over the threshold; flat $8 otherwise.
  const subtotalCents = lineItems.reduce(
    (sum, li) => sum + li.price_data.unit_amount * li.quantity,
    0,
  );
  const freeShipping = subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS;
  const shippingAmountCents = freeShipping ? 0 : FLAT_SHIPPING_CENTS;

  // Build absolute URLs from the request host so dev and prod both work
  // without separate env vars. Falls back to SITE_URL if for some reason
  // the host header is missing.
  const h = await headers();
  const host = h.get('host');
  const proto = h.get('x-forwarded-proto') ?? 'https';
  const origin = host ? `${proto}://${host}` : SITE_URL;
  const localePrefix = parsed.data.locale === 'es' ? '/es' : '';

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      locale: parsed.data.locale === 'es' ? 'es' : 'en',
      shipping_address_collection: { allowed_countries: ['US'] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: shippingAmountCents, currency: 'usd' },
            display_name: freeShipping
              ? 'Free shipping (5–7 business days)'
              : 'Standard shipping (5–7 business days)',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 7 },
            },
          },
        },
      ],
      success_url: `${origin}${localePrefix}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${localePrefix}/checkout/cancel`,
      automatic_tax: { enabled: false },
      // Allow promotion codes — Marta can create coupons in the Stripe
      // dashboard later (e.g. WELCOME10) and customers can apply them.
      allow_promotion_codes: true,
    });

    if (!session.url) {
      console.error('[checkout] Stripe returned a session without a URL', session.id);
      return NextResponse.json({ error: 'Checkout session is missing a URL' }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('[checkout] Stripe error', err);
    return NextResponse.json(
      { error: 'Could not create checkout session. Please try again.' },
      { status: 500 },
    );
  }
}
