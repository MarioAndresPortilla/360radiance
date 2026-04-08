import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageShell } from '@/components/layout/PageShell';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

/*
 * Stripe redirects here when a customer abandons checkout (clicks back,
 * closes the tab, etc). We DON'T clear the cart — the items live in
 * localStorage so the customer can pick up where they left off.
 */
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Checkout cancelled',
  robots: { index: false, follow: false },
};

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function CheckoutCancelPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('checkout');

  return (
    <PageShell>
      <section className="bg-cream/30 py-24 max-md:py-16">
        <div className="container-site max-w-150">
          <ScrollReveal>
            <div className="bg-white border border-border rounded-3xl p-10 max-md:p-7 shadow-md text-center">
              <h1 className="font-serif text-[clamp(1.7rem,3vw,2.4rem)] mb-3 leading-tight">
                {t('cancelTitle')}
              </h1>
              <p className="text-text-mid text-[.95rem] leading-[1.8] max-w-130 mx-auto mb-8">
                {t('cancelBody')}
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 bg-navy text-white rounded-xl font-semibold text-[.88rem] px-7 py-3 transition-all hover:bg-navy-deep hover:-translate-y-px hover:shadow-md no-underline"
              >
                {t('cancelBackToCart')} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageShell>
  );
}
