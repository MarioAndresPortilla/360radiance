import type { Metadata } from 'next';
import { DM_Serif_Display, Plus_Jakarta_Sans } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { BUSINESS } from '@/lib/constants';
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

const META: Record<string, { title: string; description: string; ogTitle: string; ogDescription: string; twDescription: string; skipLink: string }> = {
  en: {
    title: '360 Radiance | Paramedical Skincare · Sunrise, FL',
    description: 'Advanced paramedical skincare in Sunrise, FL. Face Reality Acne Certified. European-grade serums. 25+ years medical expertise. Book your free consultation.',
    ogTitle: '360 Radiance | Paramedical Skincare',
    ogDescription: 'Clear skin in as little as 2 weeks. Face Reality Acne Certified. European serums. Book free consultation.',
    twDescription: 'Clear skin in as little as 2 weeks. Book free consultation.',
    skipLink: 'Skip to main content',
  },
  es: {
    title: '360 Radiance | Cuidado Paramédico de la Piel · Sunrise, FL',
    description: 'Cuidado paramédico avanzado de la piel en Sunrise, FL. Certificada en Face Reality. Sueros europeos. Más de 25 años de experiencia médica. Reserve su consulta gratuita.',
    ogTitle: '360 Radiance | Cuidado Paramédico de la Piel',
    ogDescription: 'Piel clara en tan solo 2 semanas. Certificada en Face Reality. Sueros europeos. Reserve consulta gratuita.',
    twDescription: 'Piel clara en tan solo 2 semanas. Reserve consulta gratuita.',
    skipLink: 'Saltar al contenido principal',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale] ?? META.en;
  return {
    title: { default: m.title, template: '%s | 360 Radiance' },
    description: m.description,
    keywords: [
      'skincare', 'acne treatment', 'Sunrise FL', 'Face Reality',
      'microdermabrasion', 'paramedical aesthetician', 'rosacea treatment',
      'botanical skincare', 'European serums', 'acne specialist',
      'HydraFacial', 'microneedling', 'chemical peel', 'tattoo removal',
      'LED therapy', 'Korean facial', 'oxygen facial', 'carbon laser peel',
      'back facial', 'cuidado de la piel', 'tratamiento de acné',
      'esteticista paramédica', 'facial Sunrise FL',
    ],
    metadataBase: new URL('https://360radianceskincare.com'),
    alternates: {
      canonical: locale === 'en' ? '/' : `/${locale}`,
      languages: {
        en: '/',
        es: '/es',
      },
    },
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: locale === 'en' ? 'https://360radianceskincare.com' : `https://360radianceskincare.com/${locale}`,
      siteName: '360 Radiance',
      locale: locale === 'es' ? 'es_US' : 'en_US',
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: '360 Radiance' }],
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
      googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    other: { 'geo.region': 'US-FL', 'geo.placename': 'Sunrise' },
  };
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: BUSINESS.name,
  description: 'Paramedical skincare clinic specializing in acne treatment, microdermabrasion, and botanical skincare.',
  url: 'https://360radianceskincare.com',
  telephone: '+15616328218',
  image: 'https://360radianceskincare.com/og-image.png',
  priceRange: '$$',
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
  founder: { '@type': 'Person', name: 'Marta Nazzar', jobTitle: 'Licensed Paramedical Aesthetician' },
  memberOf: { '@type': 'Organization', name: 'Associated Skin Care Professionals' },
  sameAs: [BUSINESS.social.facebook, BUSINESS.social.instagram],
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

  const m = META[locale] ?? META.en;

  return (
    <html lang={locale} className={`${dmSerif.variable} ${jakarta.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a href="#main-content" className="skip-link">{m.skipLink}</a>
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
