import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageShell } from '@/components/layout/PageShell';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { IconCheck } from '@/components/icons/Icons';
import { getStripe } from '@/lib/stripe-server';
import { ClearCartOnMount } from './ClearCartOnMount';

/*
 * Post-purchase success landing.
 *
 * Server component that fetches the Stripe session by id (passed as
 * `?session_id=` from Stripe's redirect) and renders the order summary.
 * The webhook is the source of truth for fulfillment — this page is just
 * the customer's "you're done" confirmation.
 *
 * `<ClearCartOnMount />` is a tiny client island that empties the localStorage
 * cart and fires the `purchase` analytics event with the order details. We
 * dedupe via sessionStorage so refreshing the success page doesn't fire the
 * conversion twice.
 *
 * `dynamic = 'force-dynamic'` because the session id is a query param and
 * the page must NEVER be cached or prerendered.
 */
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Order confirmed',
  robots: { index: false, follow: false },
};

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ session_id?: string }>;
}

export default async function CheckoutSuccessPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { session_id: sessionId } = await searchParams;
  const t = await getTranslations('checkout');

  // No session id → bounce to home. Don't render an empty success page.
  if (!sessionId) {
    redirect(locale === 'es' ? '/es' : '/');
  }

  const stripe = getStripe();
  if (!stripe) {
    // Build was deployed without Stripe. The cart UI shouldn't have rendered
    // either, so reaching this URL means someone navigated here directly.
    notFound();
  }

  let session: Awaited<ReturnType<typeof stripe.checkout.sessions.retrieve>> | null = null;
  let lineItems: Awaited<ReturnType<typeof stripe.checkout.sessions.listLineItems>>['data'] = [];
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
    const list = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 50 });
    lineItems = list.data;
  } catch {
    // Bad session id (someone hand-crafted the URL) — just show a generic
    // confirmation rather than crashing.
  }

  const total =
    session?.amount_total != null
      ? `$${(session.amount_total / 100).toFixed(2)}`
      : null;
  const customerName = session?.customer_details?.name ?? null;

  return (
    <PageShell>
      <ClearCartOnMount sessionId={sessionId} totalCents={session?.amount_total ?? 0} itemCount={lineItems.length} />
      <section className="bg-cream/30 py-24 max-md:py-16" aria-labelledby="success-heading">
        <div className="container-site max-w-2xl">
          <ScrollReveal>
            <div className="bg-white border border-border rounded-3xl p-10 max-md:p-7 shadow-md text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-navy text-white">
                <IconCheck size={32} />
              </div>
              <h1 id="success-heading" className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] mb-3 leading-tight">
                {t('successTitle')}
              </h1>
              {customerName && (
                <p className="text-text-mid text-[1rem] mb-2">Thank you, {customerName}.</p>
              )}
              <p className="text-text-mid text-[.95rem] leading-[1.8] max-w-130 mx-auto mb-8">
                {t('successBody')}
              </p>

              {total && (
                <div className="inline-flex flex-col items-center bg-navy-pale rounded-2xl px-8 py-5 mb-8">
                  <span className="text-[.7rem] font-bold uppercase tracking-[2px] text-navy mb-1">{t('successOrderId')}</span>
                  <span className="font-serif text-[1.6rem] text-navy tabular-nums">{total}</span>
                  <span className="text-[.7rem] text-text-light mt-1 font-mono break-all max-w-60">{sessionId}</span>
                </div>
              )}

              {lineItems.length > 0 && (
                <ul className="text-left list-none p-0 mt-6 mb-8 border-t border-border pt-6 space-y-3">
                  {lineItems.map((li) => (
                    <li key={li.id} className="flex items-baseline justify-between gap-4 text-[.88rem]">
                      <span className="text-text">
                        <span className="text-text-light tabular-nums mr-2">{li.quantity}×</span>
                        {li.description}
                      </span>
                      <span className="text-navy font-semibold tabular-nums shrink-0">
                        ${((li.amount_total ?? 0) / 100).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 bg-transparent border-[1.5px] border-navy text-navy rounded-xl font-semibold text-[.88rem] px-7 py-3 transition-all hover:bg-navy hover:text-white no-underline"
              >
                {t('successContinue')} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageShell>
  );
}
