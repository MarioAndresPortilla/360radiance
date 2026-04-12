import type { Metadata } from 'next';
import { DM_Serif_Display, Plus_Jakarta_Sans } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { BUSINESS } from '@/lib/constants';
import { getGoogleReviews } from '@/lib/google-reviews';
import { SITE_URL, buildPageMetadata } from '@/lib/seo';
import { routing } from '@/i18n/routing';
import '../globals.css';

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif-display',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const META = {
  en: {
    title: '360 Radiance | Paramedical Skincare & Acne Specialist · Sunrise, FL',
    description: 'Award-winning paramedical skincare clinic in Sunrise, FL. Face Reality Acne Certified. 25+ years medical expertise. HydraFacial, microneedling, chemical peels, laser treatments. Bilingual (English/Spanish). Book your free consultation.',
    ogTitle: '360 Radiance | Paramedical Skincare & Acne Specialist',
    ogDescription: 'Best of 2026 Award Winner. Clear skin in as little as 2 weeks. Face Reality Certified. European serums. Bilingual care in Sunrise, FL.',
    twDescription: 'Award-winning skincare clinic. Clear skin in 2 weeks. Book free consultation.',
    skipLink: 'Skip to main content',
    locale: 'en_US',
    keywords: [
      'skincare clinic Sunrise FL',
      'acne treatment Sunrise',
      'paramedical aesthetician Florida',
      'Face Reality acne specialist',
      'best skincare clinic Sunrise',
      'HydraFacial Sunrise FL',
      'microneedling Florida',
      'chemical peel Sunrise',
      'tattoo removal Sunrise FL',
      'rosacea treatment Florida',
      'European skincare serums',
      'botanical skincare',
      'bilingual skincare clinic',
      'oxygen facial therapy',
      'carbon laser peel',
      'back facial treatment',
      'LED light therapy skin',
      'best of 2026 skincare',
      'Marta Nazzar aesthetician',
    ],
  },
  es: {
    title: '360 Radiance | Cuidado Paramédico de la Piel y Especialista en Acné · Sunrise, FL',
    description: 'Clínica galardonada de cuidado paramédico de la piel en Sunrise, FL. Certificada en Face Reality. Más de 25 años de experiencia médica. HydraFacial, microneedling, peelings químicos, tratamientos láser. Atención bilingüe. Reserve su consulta gratuita.',
    ogTitle: '360 Radiance | Cuidado Paramédico de la Piel y Especialista en Acné',
    ogDescription: 'Ganadora del premio Best of 2026. Piel clara en tan solo 2 semanas. Certificada en Face Reality. Sueros europeos. Atención bilingüe en Sunrise, FL.',
    twDescription: 'Clínica galardonada del cuidado de la piel. Piel clara en 2 semanas. Reserve consulta gratuita.',
    skipLink: 'Saltar al contenido principal',
    locale: 'es_US',
    keywords: [
      'clínica de cuidado de la piel Sunrise FL',
      'tratamiento de acné Sunrise',
      'esteticista paramédica Florida',
      'especialista en acné Face Reality',
      'mejor clínica de la piel Sunrise',
      'HydraFacial Sunrise FL',
      'microneedling Florida',
      'peeling químico Sunrise',
      'eliminación de tatuajes láser',
      'tratamiento rosácea Florida',
      'sueros europeos cuidado piel',
      'cuidado botánico de la piel',
      'clínica bilingüe cuidado piel',
      'terapia facial de oxígeno',
      'peeling láser carbono',
      'facial para espalda',
      'terapia LED para la piel',
      'mejor del 2026 cuidado piel',
      'Marta Nazzar esteticista',
      'facial profesional Sunrise',
      'tratamiento facial Florida',
    ],
  },
} as const;

// Layout-level metadata sets site-wide defaults that every page inherits:
// metadataBase, the title template, the keyword list, twitter card, robots
// directives, and the geo meta tags. Per-page generateMetadata calls (via
// `buildPageMetadata` from src/lib/seo.ts) override `alternates`, `openGraph`,
// `title`, and `description` with the page-specific values. We do NOT set a
// canonical here because Next.js does not auto-resolve `alternates.canonical`
// per route — without per-page overrides every URL would canonicalize to '/'.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale as keyof typeof META] ?? META.en;
  // Home page metadata: build alternates/openGraph for the root path so the
  // homepage itself has the right canonical even if its page.tsx doesn't
  // export its own generateMetadata.
  const home = buildPageMetadata({
    locale,
    path: '/',
    title: m.title,
    description: m.description,
  });
  return {
    title: { default: m.title, template: '%s | 360 Radiance' },
    description: m.description,
    keywords: [...m.keywords],
    metadataBase: new URL(SITE_URL),
    applicationName: '360 Radiance',
    authors: [{ name: 'Marta Nazzar' }],
    creator: '360 Radiance Inc',
    publisher: '360 Radiance Inc',
    alternates: home.alternates,
    openGraph: {
      ...home.openGraph,
      title: m.ogTitle,
      description: m.ogDescription,
      siteName: '360 Radiance',
    },
    twitter: {
      card: 'summary_large_image',
      title: m.ogTitle,
      description: m.twDescription,
      images: ['/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'geo.region': 'US-FL',
      'geo.placename': 'Sunrise',
      'geo.position': '26.1368;-80.2581',
      ICBM: '26.1368, -80.2581',
    },
  };
}

type AggregateRating = { ratingValue: string; reviewCount: string };

function buildJsonLd(locale: string, aggregateRating: AggregateRating | null) {
  const inLanguage = locale === 'es' ? 'es-US' : 'en-US';
  const description = locale === 'es'
    ? 'Clínica de cuidado paramédico de la piel especializada en tratamiento del acné, microdermoabrasión, HydraFacial, microneedling, peelings químicos, y cuidado botánico de la piel.'
    : 'Paramedical skincare clinic specializing in acne treatment, microdermabrasion, HydraFacial, microneedling, chemical peels, and botanical skincare.';

  // Build the base business object first, then conditionally attach the
  // aggregateRating only when we have real numbers from the Places API.
  // Google's Rich Results validator rejects AggregateRating objects with
  // missing ratingValue/reviewCount, so it's better to omit the property
  // entirely than to ship a placeholder — and we promised Marta the
  // schema would only ever reflect authentic Google data.
  const business: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['MedicalBusiness', 'BeautySalon'],
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    alternateName: ['360 Radiance Inc', '360 Radiance Skin Care Clinic'],
    description,
    inLanguage,
    url: `${SITE_URL}${locale === 'en' ? '' : `/${locale}`}`,
    telephone: '+15616328218',
    email: 'info@360radianceskincare.com',
    image: `${SITE_URL}/og-image.png`,
    logo: `${SITE_URL}/images/360-radiance-logo.png`,
    priceRange: '$$',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Credit Card, Debit Card',
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.address,
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.state,
      postalCode: BUSINESS.zip,
      addressCountry: 'US',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 26.1368, longitude: -80.2581 },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Thursday', 'Friday'], opens: '09:00', closes: '19:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '17:00' },
    ],
    founder: {
      '@type': 'Person',
      name: 'Marta Nazzar',
      jobTitle: locale === 'es' ? 'Esteticista Paramédica Licenciada' : 'Licensed Paramedical Aesthetician',
      knowsLanguage: ['en', 'es'],
    },
    memberOf: { '@type': 'Organization', name: 'Associated Skin Care Professionals' },
    award: 'Best of 2026 Skin Care Clinic — BusinessRate',
    sameAs: [
      BUSINESS.social.facebook,
      BUSINESS.social.instagram,
      BUSINESS.social.google,
      BUSINESS.social.yelp,
      BUSINESS.social.groupon,
    ],
    knowsLanguage: ['en', 'es'],
    areaServed: [
      { '@type': 'City', name: 'Sunrise', containedInPlace: { '@type': 'State', name: 'Florida' } },
      { '@type': 'City', name: 'Plantation' },
      { '@type': 'City', name: 'Weston' },
      { '@type': 'City', name: 'Davie' },
      { '@type': 'City', name: 'Fort Lauderdale' },
    ],
  };

  if (aggregateRating) {
    business.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: aggregateRating.ratingValue,
      bestRating: '5',
      reviewCount: aggregateRating.reviewCount,
    };
  }

  return business;
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: '360 Radiance',
  inLanguage: ['en-US', 'es-US'],
  publisher: { '@id': `${SITE_URL}/#business` },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const m = META[locale as keyof typeof META] ?? META.en;
  // Pull live Google review numbers from the Places API for the
  // AggregateRating schema. If the API call fails or both fields come
  // back null, we omit aggregateRating from the JSON-LD entirely
  // (buildJsonLd handles the null case) — better to ship valid schema
  // without a rating than schema with a stale hardcoded baseline that
  // would mislead Google's Rich Results.
  const reviews = await getGoogleReviews();
  const aggregateRating: AggregateRating | null =
    reviews.rating != null && reviews.totalReviews != null
      ? {
          ratingValue: reviews.rating.toFixed(1),
          reviewCount: String(reviews.totalReviews),
        }
      : null;
  const businessJsonLd = buildJsonLd(locale, aggregateRating);

  return (
    <html lang={locale} className={`${dmSerif.variable} ${jakarta.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </head>
      <body>
        <a href="#main-content" className="skip-link">{m.skipLink}</a>
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
        {/* Vercel Web Analytics + Speed Insights — both auto-no-op outside
            production deploys, so local dev / preview branches don't pollute
            the metrics. The src/lib/analytics.ts wrapper forwards every
            track() call to the same script that gets injected here. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
