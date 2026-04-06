import type { Metadata } from 'next';
import { DM_Serif_Display, Plus_Jakarta_Sans } from 'next/font/google';
import { BUSINESS } from '@/lib/constants';
import './globals.css';

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

export const metadata: Metadata = {
  title: {
    default: '360 Radiance | Paramedical Skincare · Sunrise, FL',
    template: '%s | 360 Radiance',
  },
  description:
    'Advanced paramedical skincare in Sunrise, FL. Face Reality Acne Certified. European-grade serums. 25 years medical expertise. Book your free consultation.',
  keywords: [
    'skincare',
    'acne treatment',
    'Sunrise FL',
    'Face Reality',
    'microdermabrasion',
    'paramedical aesthetician',
    'rosacea treatment',
    'botanical skincare',
    'European serums',
    'acne specialist',
  ],
  metadataBase: new URL('https://360radianceskincare.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '360 Radiance | Paramedical Skincare',
    description:
      'Clear skin in as little as 2 weeks. Face Reality Acne Certified. European serums. Book free consultation.',
    url: 'https://360radianceskincare.com',
    siteName: '360 Radiance',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '360 Radiance — Paramedical Skincare in Sunrise, FL',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '360 Radiance | Paramedical Skincare',
    description: 'Clear skin in as little as 2 weeks. Book free consultation.',
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
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: BUSINESS.name,
  description:
    'Paramedical skincare clinic specializing in acne treatment, microdermabrasion, and botanical skincare.',
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
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 26.1368,
    longitude: -80.2581,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '17:00',
    },
  ],
  founder: {
    '@type': 'Person',
    name: 'Marta Nazzar',
    jobTitle: 'Licensed Paramedical Aesthetician',
  },
  memberOf: {
    '@type': 'Organization',
    name: 'Associated Skin Care Professionals',
  },
  sameAs: [
    BUSINESS.social.facebook,
    BUSINESS.social.instagram,
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Skincare Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Face Reality Acne Program' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Microdermabrasion' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Skin Analysis & Consultation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Botanical Treatments' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Regimen Design' } },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${jakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
