import type { Service, Testimonial, WhyCard, Credential, JourneyStep, ProductFeature, HourEntry, TrustItem } from '@/types';
import { BLOG_CONTENT } from './blog-content';
import { BLOG_CONTENT_2 } from './blog-content-2';
import { BLOG_CONTENT_ES } from './blog-content-es';
import { BLOG_CONTENT_2_ES } from './blog-content-2-es';

const ALL_BLOG_CONTENT_EN = { ...BLOG_CONTENT, ...BLOG_CONTENT_2 };
const ALL_BLOG_CONTENT_ES = { ...BLOG_CONTENT_ES, ...BLOG_CONTENT_2_ES };

export const BLOG_CONTENT_BY_LOCALE: Record<string, typeof ALL_BLOG_CONTENT_EN> = {
  en: ALL_BLOG_CONTENT_EN,
  es: ALL_BLOG_CONTENT_ES,
};

const BLOG_CTAS_EN: Record<string, string> = {
  'why-face-reality-works-when-everything-else-fails': 'Ready to break the cycle of failed acne treatments? Book a free consultation at 360 Radiance in Sunrise, FL. Marta\'s 12-week Face Reality program has helped hundreds of clients finally achieve clear skin — starting at $230, with bi-weekly visits over 3 months.',
  'the-science-of-glass-ampule-serums': 'Experience European glass ampule serums in person. Book a treatment at 360 Radiance and feel the difference clinical-grade actives make.',
  'rosacea-triggers-complete-guide': 'Struggling with rosacea? Marta has cleared rosacea clients in as little as 4 weeks. Book a free consultation at 360 Radiance in Sunrise, FL.',
  'microdermabrasion-what-actually-happens': 'Experience the most thorough microdermabrasion in South Florida. Book your treatment with Marta at 360 Radiance.',
  'your-skin-barrier-explained': 'Not sure if your skin barrier is damaged? Book a free skin analysis at 360 Radiance and get a personalized barrier-repair plan.',
  'retinol-vs-bakuchiol': 'Get a personalized anti-aging assessment with Marta at 360 Radiance. We use the best of both retinol and bakuchiol in our Retinol Renewal Treatment.',
  'hormonal-acne-root-cause': 'Hormonal acne is treatable — with the right protocol. Book the free consultation for our 12-week Face Reality program at 360 Radiance in Sunrise, FL. Starting at $230, with bi-weekly visits.',
  'building-a-morning-routine-that-works': 'Stop guessing. Get a Custom Regimen Design from Marta and learn exactly which products to use, in what order, and why.',
  'parabens-sulfates-toxins-what-to-actually-avoid': 'Try the Radiance Skin Care Line — clinically formulated, free of genuinely concerning ingredients, and designed to actually work. Available at 360 Radiance.',
};

const BLOG_CTAS_ES: Record<string, string> = {
  'why-face-reality-works-when-everything-else-fails': '¿Lista para romper el ciclo de tratamientos de acné fallidos? Reserve una consulta gratuita en 360 Radiance en Sunrise, FL. El programa Face Reality de 12 semanas de Marta ha ayudado a cientos de clientes a finalmente lograr una piel clara — desde $230, con visitas quincenales durante 3 meses.',
  'the-science-of-glass-ampule-serums': 'Experimente los sueros europeos en ampollas de vidrio en persona. Reserve un tratamiento en 360 Radiance y sienta la diferencia que hacen los activos de grado clínico.',
  'rosacea-triggers-complete-guide': '¿Sufre de rosácea? Marta ha aclarado clientes con rosácea en tan solo 4 semanas. Reserve una consulta gratuita en 360 Radiance en Sunrise, FL.',
  'microdermabrasion-what-actually-happens': 'Experimente la microdermoabrasión más completa del sur de la Florida. Reserve su tratamiento con Marta en 360 Radiance.',
  'your-skin-barrier-explained': '¿No está segura de si su barrera cutánea está dañada? Reserve un análisis gratuito de la piel en 360 Radiance y obtenga un plan personalizado de reparación.',
  'retinol-vs-bakuchiol': 'Obtenga una evaluación antienvejecimiento personalizada con Marta en 360 Radiance. Usamos lo mejor del retinol y el bakuchiol en nuestro Tratamiento de Renovación con Retinol.',
  'hormonal-acne-root-cause': 'El acné hormonal es tratable — con el protocolo correcto. Reserve la consulta gratuita del programa Face Reality de 12 semanas en 360 Radiance en Sunrise, FL. Desde $230, con visitas quincenales.',
  'building-a-morning-routine-that-works': 'Deje de adivinar. Obtenga un Diseño de Régimen Personalizado de Marta y aprenda exactamente qué productos usar, en qué orden y por qué.',
  'parabens-sulfates-toxins-what-to-actually-avoid': 'Pruebe la línea Radiance Skin Care — formulada clínicamente, libre de ingredientes genuinamente preocupantes, y diseñada para realmente funcionar. Disponible en 360 Radiance.',
};

export const BLOG_CTAS_BY_LOCALE: Record<string, Record<string, string>> = {
  en: BLOG_CTAS_EN,
  es: BLOG_CTAS_ES,
};

export const BUSINESS = {
  // Display name used throughout the UI (logo wordmark, footer, etc.).
  name: '360 Radiance',
  // Full registered legal entity. Use this in JSON-LD `legalName`, the footer
  // copyright line, contact-form email subject lines, the privacy policy, and
  // anywhere else a legal-grade attribution is required. Marketing copy should
  // continue to use `name` (shorter, friendlier).
  legalName: '360 Radiance Inc',
  phone: '(561) 632-8218',
  phoneRaw: '5616328218',
  whatsapp: 'https://wa.me/15616328218',
  address: '12651 W. Sunrise Blvd, Suite 301',
  city: 'Sunrise',
  state: 'FL',
  zip: '33323',
  mapUrl: 'https://maps.google.com/?q=12651+W+Sunrise+Blvd+Suite+301+Sunrise+FL+33323',
  social: {
    // NOTE: Facebook handle is "36oradiance" — second char is the letter "o",
    // not a zero. This is the legacy handle Marta currently controls; a clean
    // vanity URL is planned for the future. Don't "fix" the typo.
    facebook: 'https://www.facebook.com/36oradiance/',
    instagram: 'https://instagram.com/360radianceinc',
    // Google Business Profile share link. This is a `share.google` redirect
    // rather than the canonical maps URL because the share link is what Marta
    // had on hand. Will be replaced with the full /maps/place/... URL once
    // we have it (it makes JSON-LD `sameAs` cleaner for SEO).
    google: 'https://share.google/EZwBBcNduMb0gdThC',
  },
  // Google review surfaces.
  //
  // `googleReviewWrite` is computed at module load: when the GOOGLE_PLACE_ID
  // env var is provisioned (it already is, for the live Places API integration
  // in src/lib/google-reviews.ts), we build the canonical "write a review"
  // deep link — clicking it opens Google's review form directly with the
  // 5-star rating selector, no extra hop through the business profile. The
  // `share.google` redirect remains as a fallback for environments where the
  // env var isn't set (preview deploys, local builds without .env.local).
  //
  // Place IDs are public information (they appear in Google Maps URLs), so
  // there's no security concern with the URL bouncing through a server-
  // rendered page. constants.ts is imported by both server and client modules
  // — the only consumers of `googleReviewWrite` are server components, so
  // reading process.env at module init is safe.
  //
  // `googleProfile` stays as the share link (used for "View on Google" CTAs).
  googleReviewWrite: process.env.GOOGLE_PLACE_ID
    ? `https://search.google.com/local/writereview?placeid=${process.env.GOOGLE_PLACE_ID}`
    : 'https://share.google/EZwBBcNduMb0gdThC',
  googleProfile: 'https://share.google/EZwBBcNduMb0gdThC',
} as const;

// Cal.com booking — popup mode only. Inline iframe was tried and rolled back
// because it emits preload/forced-reflow warnings from Cal.com's own bundle
// that we cannot suppress from our origin. Click-to-open modal avoids that.
//
// Marta exposes two consultation event types: a 15-minute quick chat (free)
// and a 30-minute full consultation ($35 — under the ~$50 industry average for
// a paid 30-min esthetician consult, e.g. Clear Beauty Skincare in Frisco TX
// charges $50). The 30-min fee is waived for clients booking the Acne Treatment
// Program — that consultation is always free. Both surfaces (home
// BookingSection and /contact schedule card) show both event types so visitors
// can self-select. Default in places where only one button fits
// (FloatingButtons) is the 30-min event. NOTE: the paid status of the 30-min
// event must also be configured in Cal.com's dashboard (Stripe app) — this
// constant only governs how we *describe* the price in our own UI.
const CAL_USERNAME = '360radianceskincare';
export const CAL = {
  username: CAL_USERNAME,
  // Single namespace per surface so the same Cal modal can be opened from
  // any button on the page without re-initializing the embed.
  namespace: 'booking',
  events: {
    quick: { slug: '15min', minutes: 15, link: `${CAL_USERNAME}/15min` },
    full: { slug: '30min', minutes: 30, link: `${CAL_USERNAME}/30min` },
  },
  // Default link for single-button surfaces (FloatingButtons FAB).
  // Points at the FREE 15-min quick chat to keep the entry-point friction as
  // low as possible — the FAB is the click of last resort, so we don't want a
  // $35 paywall in front of it. Visitors who want the deeper 30-min consult
  // can still find it on /contact and the home BookingSection.
  get defaultLink() {
    return this.events.quick.link;
  },
} as const;

export type CalEventKey = keyof typeof CAL.events;

// Pricing for the general consultation event types (NOT the Acne Program — that
// consultation is always free; see ACNE_PROGRAM_PRICING below). The 15-min
// quick chat is free as a low-friction entry point. The 30-min consult is
// priced under the ~$50 industry average so we beat it without cheapening the
// service. Update both Cal.com and this constant in lockstep.
export const CONSULTATION_PRICING = {
  quickChatMinutes: 15,
  quickChatPrice: 0,
  fullConsultMinutes: 30,
  fullConsultPrice: 35,
} as const;

// Instagram showcase: each entry is one card on the homepage.
// Real client transformations and treatment shots from the @360radianceinc feed.
export const INSTAGRAM_POSTS: { id: number; image: string; postUrl: string; alt: string; caption: string }[] = [
  {
    id: 1,
    image: '/images/instagram/before-after-acne-1.jpg',
    postUrl: 'https://instagram.com/360radianceinc',
    alt: 'Real client acne transformation — clearer skin and a confident smile after the 12-week Acne Treatment Program at 360 Radiance',
    caption: 'Acne transformation',
  },
  {
    id: 2,
    image: '/images/instagram/treatment-microneedling.jpg',
    postUrl: 'https://instagram.com/360radianceinc',
    alt: 'Microneedling treatment in progress at 360 Radiance — Marta performing the procedure',
    caption: 'Microneedling in progress',
  },
  {
    id: 3,
    image: '/images/instagram/radiance-serums-five.jpg',
    postUrl: 'https://instagram.com/360radianceinc',
    alt: 'The Radiance Skin Care Line — five signature serums including Peptide, Radian-C, Glycolic, Collagen, and Eye Rescue',
    caption: 'The Radiance Serums',
  },
  {
    id: 4,
    image: '/images/instagram/before-after-rosacea-2.jpg',
    postUrl: 'https://instagram.com/360radianceinc',
    alt: 'Rosacea before and after — calmed redness and even tone after treatment at 360 Radiance',
    caption: 'Rosacea cleared',
  },
  {
    id: 5,
    image: '/images/instagram/treatment-mesotherapy-serums.jpg',
    postUrl: 'https://instagram.com/360radianceinc',
    alt: 'Mesotherapy facial serum treatment in progress at 360 Radiance',
    caption: 'Mesotherapy serums',
  },
  {
    id: 6,
    image: '/images/instagram/before-after-pigmentation.jpg',
    postUrl: 'https://instagram.com/360radianceinc',
    alt: 'Hyperpigmentation and sun damage cleared — before and after at 360 Radiance',
    caption: 'Pigmentation cleared',
  },
  {
    id: 7,
    image: '/images/instagram/before-after-acne-2.jpg',
    postUrl: 'https://instagram.com/360radianceinc',
    alt: 'Dramatic acne transformation — before and after the 12-week Acne Treatment Program',
    caption: '12-week transformation',
  },
  {
    id: 8,
    image: '/images/instagram/radiance-glycolic-trio.jpg',
    postUrl: 'https://instagram.com/360radianceinc',
    alt: 'Radiance Skin Care Glycolic line — Gentle Glycolic Cleanser, Glycolic Serum, and Equalizing Moisture Gel',
    caption: 'The Glycolic line',
  },
  {
    id: 9,
    image: '/images/instagram/treatment-ultrasonic-extractions.jpg',
    postUrl: 'https://instagram.com/360radianceinc',
    alt: 'Ultrasonic extractions facial treatment in progress at 360 Radiance',
    caption: 'Ultrasonic extractions',
  },
];

// Videos showcase — short treatment / behind-the-scenes clips that play in a
// click-to-open lightbox on the landing page. Empty array = section hides
// entirely (graceful no-op until Marta has clips ready). When adding entries:
//
//   - `src`: public URL to an MP4 (preferably H.264 + AAC, ≤15s, ≤4MB). Host
//     in /public/videos/ — Vercel serves them straight from the edge cache.
//   - `poster`: a static thumbnail (16:9) shown before the video plays. The
//     poster carries 100% of the visual weight before someone clicks, so make
//     it strong (treatment in-progress, hero shot of Marta, before-after).
//   - `alt`: descriptive caption for the card title AND aria-label.
//   - `caption`: short subtitle under the title (e.g. "Microneedling · 12s").
//
// We DO NOT use a Vimeo/YouTube embed — those add a 1MB+ player and tracking.
// A native <video> tag is ~8KB and stays on-brand.
export type VideoClip = {
  id: string;
  src: string;
  poster: string;
  alt: string;
  caption: string;
};
export const VIDEOS: VideoClip[] = [];

export const HOURS: HourEntry[] = [
  { day: 'Sunday', time: 'Closed', closed: true },
  { day: 'Monday', time: '9:00 AM – 7:00 PM', closed: false },
  { day: 'Tuesday', time: '9:00 AM – 7:00 PM', closed: false },
  { day: 'Wednesday', time: 'Closed', closed: true },
  { day: 'Thursday', time: '9:00 AM – 7:00 PM', closed: false },
  { day: 'Friday', time: '9:00 AM – 7:00 PM', closed: false },
  { day: 'Saturday', time: '9:00 AM – 5:00 PM', closed: false },
];

export const TRUST_ITEMS: TrustItem[] = [
  { icon: 'diploma', label: 'B.S. Biology' },
  { icon: 'science', label: 'Face Reality Certified' },
  { icon: 'medical', label: '25+ Years Medical' },
  { icon: 'globe', label: 'European Serums' },
  { icon: 'shield', label: 'ASCP Member' },
  { icon: 'language', label: 'Bilingual EN/ES' },
];

export const WHY_CARDS: WhyCard[] = [
  {
    icon: 'medical',
    iconTheme: 'navy',
    title: 'Medical-Grade Expertise',
    description: ' 25+ years of medical background with a B.S. in Biology and A.S. in Lab Sciences. Clinical precision in every consultation.',
  },
  {
    icon: 'science',
    iconTheme: 'gold',
    title: 'Certified Acne Protocol',
    description: 'Face Reality certified under Dr. James E. Fulton, the pioneer of Retin-A. A proven system — not guesswork.',
  },
  {
    icon: 'globe',
    iconTheme: 'navy',
    title: 'European-Grade Serums',
    description: 'Premium glass ampule serums from Germany, Spain, Switzerland, and Italy. Concentrated actives unavailable in stores.',
  },
  {
    icon: 'leaf',
    iconTheme: 'gold',
    title: 'Proprietary Botanicals',
    description: 'The Radiance Skin Care Line is toxin-free, paraben-free, and sulfate-free. Created by Marta for real skin conditions.',
  },
  {
    icon: 'clipboard',
    iconTheme: 'navy',
    title: 'Personalized Regimens',
    description: 'No two skin types are the same. Every client receives a custom treatment roadmap and take-home protocol.',
  },
  {
    icon: 'language',
    iconTheme: 'gold',
    title: 'Bilingual Care',
    description: 'Fluent in English and Spanish, ensuring every client feels understood and confident in their treatment plan.',
  },
];

export const SERVICES: Service[] = [
  {
    icon: 'science',
    title: 'Acne Treatment Program',
    description: 'Complete 12-week clinical program: free consultation, acne facial, custom home-care regimen, and bi-weekly visits over 3 months. Starting at $230.',
    tag: '12-Week Program',
    featured: true,
  },
  {
    icon: 'care',
    title: 'Back Facial',
    description: 'Professional deep-cleansing treatment for back acne and congestion. Extractions, exfoliation, and targeted serums.',
    tag: 'Specialty',
  },
  {
    icon: 'sparkle',
    title: 'Microdermabrasion',
    description: 'Non-invasive exfoliation. Stimulates collagen, reveals smoother, brighter skin. Painless with immediate results.',
    tag: 'Anti-Aging',
  },
  {
    icon: 'vial',
    title: 'Glass Ampule Serums',
    description: 'Concentrated active serums from Germany, Spain, Switzerland, and Italy. Targeted treatment for precise concerns.',
    tag: 'European Grade',
  },
  {
    icon: 'scan',
    title: 'Skin Analysis & Consultation',
    description: 'Comprehensive evaluation of your skin type, conditions, and lifestyle. Your treatment roadmap starts here. Free 15-min chat or $35 30-min deep dive (free with the Acne Program).',
    tag: 'Starting Point',
  },
  {
    icon: 'leaf',
    title: 'Botanical Treatments',
    description: 'Proprietary Radiance formulas. Science meets botanical ingredients. Toxin-free, paraben-free, sulfate-free.',
    tag: 'Proprietary',
  },
  {
    icon: 'clipboard',
    title: 'Custom Regimen Design',
    description: 'Take-home protocol with product selection, application schedule, and ongoing progress adjustments.',
    tag: 'Ongoing Care',
  },
  {
    icon: 'sparkle',
    title: 'HydraFacial',
    description: 'Multi-step hydradermabrasion: cleanse, extract, and hydrate in one session. Instant glow with zero downtime.',
    tag: 'Signature',
  },
  {
    icon: 'radiance',
    title: 'LED Facial Therapy',
    description: 'Medical-grade light therapy targeting acne bacteria, inflammation, and collagen production at the cellular level.',
    tag: 'Light Therapy',
  },
  {
    icon: 'vial',
    title: 'Chemical Peels',
    description: 'Clinical-grade peels customized to your skin type. Accelerates cell turnover for smoother, even-toned skin.',
    tag: 'Resurfacing',
  },
  {
    icon: 'medical',
    title: 'Microneedling',
    description: 'Collagen induction therapy using precision micro-needles. Triggers your skin\'s natural repair for firmer, smoother texture.',
    tag: 'Collagen Boost',
  },
  {
    icon: 'scan',
    title: 'Tattoo Removal Laser',
    description: 'Advanced Q-switched laser technology for safe, effective tattoo removal. Gradual fading with minimal scarring.',
    tag: 'Laser',
  },
  {
    icon: 'dropper',
    title: 'Oxygen Facial Therapy',
    description: 'Pressurized oxygen infuses serums deep into the skin. Instantly plumps, hydrates, and revives dull complexions.',
    tag: 'Rejuvenation',
  },
  {
    icon: 'flask',
    title: 'Carbon Yag Laser',
    description: 'Carbon peel laser treatment for deep pore cleansing, oil control, and dramatic skin rejuvenation. The "Hollywood Peel."',
    tag: 'Laser Peel',
  },
  {
    icon: 'globe',
    title: 'Sulwhasoo Korean Facial',
    description: 'Luxury organic Korean skincare ritual using Sulwhasoo botanicals. Ginseng-infused for deep nourishment and radiance.',
    tag: 'Luxury',
  },
  {
    icon: 'care',
    title: 'Skin Deep Facial',
    description: 'Our comprehensive deep-cleansing facial. Extractions, enzyme peel, custom mask, and hydrating finish for all skin types.',
    tag: 'Classic',
  },
];

export const CREDENTIALS: Credential[] = [
  { icon: 'diploma', label: 'B.S. Biology' },
  { icon: 'science', label: 'Face Reality Certified' },
  { icon: 'shield', label: 'ASCP Member' },
  { icon: 'language', label: 'Bilingual EN/ES' },
  { icon: 'flask', label: 'Lab Sciences A.S.' },
];

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    number: '01',
    weekLabel: 'Week 1',
    title: 'Free Consultation & First Facial',
    description: 'Free consultation: health history, skin analysis, and sensitivity test. Followed by your first acne facial and custom home-care regimen. Visit 1 of 6.',
    progress: 15,
  },
  {
    number: '02',
    weekLabel: 'Weeks 2–4',
    title: 'First Signs',
    description: 'Bi-weekly visits begin. Home-care regimen takes effect, inflammation drops, 30–50% improvement for most clients. Visits 2–3 of 6 ($80 each).',
    progress: 40,
  },
  {
    number: '03',
    weekLabel: 'Weeks 4–8',
    title: 'Breakthrough',
    description: 'Dramatic clearing. Rosacea clients often fully clear. Acne facial + regimen adjustment at every bi-weekly visit. Visits 4–5 of 6.',
    progress: 70,
  },
  {
    number: '04',
    weekLabel: 'Weeks 8–12',
    title: 'Clear Skin',
    description: '90%+ improvement. Final bi-weekly visit (6 of 6) locks in results and transitions you to long-term maintenance care.',
    progress: 95,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    text: 'Within the first week, many of my inflamed cysts had reduced. This regime has my skin controlled — I would have never believed it.',
    name: 'Carla',
    condition: 'Hormonal Acne',
    avatarColor: 'bg-navy',
    initial: 'C',
  },
  {
    text: 'After 2 weeks — 50% better. After 2 months — 90%. After 2 years of hiding behind makeup, I can finally go out with clear skin.',
    name: 'Marissa C.',
    condition: 'Cystic Acne · 2 Years',
    avatarColor: 'bg-gold',
    initial: 'M',
  },
  {
    text: "Truly a GEM. EXTREMELY knowledgeable, professional, and AMAZING. She's giving me the radiant skin I always dreamed of.",
    name: 'Karen K.',
    condition: 'Acne Rosacea',
    avatarColor: 'bg-navy-deep',
    initial: 'K',
  },
  {
    text: '20 years of rosacea. 2 weeks to see improvement. 4 weeks — completely clear. Beyond all expectations.',
    name: 'Delcy V.',
    condition: 'Rosacea · 20 Years',
    avatarColor: 'bg-gold-dark',
    initial: 'D',
  },
  {
    text: 'She got to the source of my acne. Within weeks — total transformation. Clear skin, scar free.',
    name: 'Vanessa P.',
    condition: 'Persistent Acne',
    avatarColor: 'bg-purple-soft',
    initial: 'V',
  },
  {
    text: "Most thorough microderm I've ever had — out of about 10 aestheticians. Didn't leave without making my next appointment.",
    name: 'New from NJ',
    condition: 'Microdermabrasion',
    avatarColor: 'bg-gold',
    initial: 'J',
  },
];

export const PRODUCT_FEATURES: ProductFeature[] = [
  { text: 'Free of toxins, parabens & sulfates' },
  { text: 'European glass ampule technology' },
  { text: 'Formulated for all skin types' },
  { text: 'Clinically paired with in-office treatments' },
  { text: 'Created by Marta Nazzar' },
];

export interface ServiceDetail {
  slug: string;
  icon: string;
  title: string;
  tagline: string;
  tag: string;
  featured?: boolean;
  description: string[];
  benefits: string[];
  idealFor: string[];
  /** Optional treatment photo from /public/images/instagram/ — shown above the benefits box on /services. */
  image?: string;
  imageAlt?: string;
}

export const ACNE_PROGRAM_PRICING = {
  // Consultation is FREE for the Acne Program (was $50). Marta waives it as a
  // commitment to anyone serious about clearing their skin — first
  // appointment includes the consultation and the first acne facial.
  consultation: 0,
  acneFacial: 50,
  homeCareProducts: 180,
  // 0 (consult) + 50 (first facial) + ~180 (home-care kit) = 230
  totalStarting: 230,
  // Bi-WEEKLY (every 2 weeks) — 6 visits over the 12-week / 3-month program.
  // Earlier copy mistakenly said "bi-monthly" which would be only ~1.5 visits
  // in 12 weeks. The Spanish copy already used "quincenal" (every 15 days)
  // which is correct.
  biWeeklyVisit: 80,
  totalVisits: 6,
  programLength: '12 weeks',
  visitFrequency: 'Bi-weekly for 3 months',
} as const;

export const ACNE_PROGRAM_CONTRAINDICATIONS = [
  'You must not be currently under Accutane, nor have used it within the last 30 days.',
  'You must not be currently using, nor used within the past 2 weeks: Retin-A, Tazorac, or Differin.',
  'You must not be currently using topical or oral antibiotics such as tetracycline, doxycycline, erythromycin, or clindamycin.',
] as const;

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: 'acne-treatment-program',
    icon: 'science',
    title: 'Acne Treatment Program',
    tagline: 'A complete 12-week / 3-month clinical program to clear your skin — free consultation, starting at $230.',
    tag: '12-Week Program',
    featured: true,
    description: [
      'The Acne Treatment Program is a comprehensive 12-week clinical protocol designed to create clear skin. Built on the Face Reality method — developed by Dr. James E. Fulton, the pioneer of Retin-A — this program combines professional in-office treatments with a custom home-care regimen tailored to your specific acne type.',
      'Your program begins with a completely free consultation that includes a full health history review, allergy and medication screening, lifestyle assessment, skin analysis to determine your skin type, acne type, and a sensitivity test. There is no charge for the consultation when you commit to the program. You\'ll then receive your first acne facial ($50), customized to your specific condition, followed by a complete take-home package with home-care products (approximately $180) and lifestyle recommendations.',
      'Over the following 12 weeks (3 months), you\'ll have bi-weekly visits — every two weeks, for a total of 6 in-clinic appointments — at $80 each. Each visit includes progress monitoring and an acne facial to prepare your skin for the next phase of your home-care regimen. Most clients see 30–50% improvement within the first two weeks, and 90%+ improvement by the end of the program.',
    ],
    benefits: [
      'Free consultation with health history & skin analysis (no charge for the Acne Program)',
      'First acne facial customized to your condition — $50',
      '12 weeks of home-care products — approximately $180',
      'Bi-weekly monitoring visits with acne facial — $80 each (6 visits over 3 months)',
      'Complete take-home package with lifestyle guidelines',
      'Total program starting at $230 + bi-weekly visits',
    ],
    idealFor: ['Hormonal acne', 'Cystic acne', 'Rosacea', 'Persistent breakouts', 'Adult acne', 'Teen acne'],
    image: '/images/instagram/before-after-acne-3.jpg',
    imageAlt: 'Real client before and after the 12-week Acne Treatment Program at 360 Radiance',
  },
  {
    slug: 'back-facial',
    icon: 'care',
    title: 'Back Facial',
    tagline: 'Professional deep-cleansing treatment for back acne, congestion, and uneven texture.',
    tag: 'Specialty',
    description: [
      'The back is one of the most acne-prone areas of the body — and one of the hardest to treat at home. Our Back Facial is a professional-grade treatment that addresses back acne, congestion, blackheads, and uneven texture with the same clinical precision we apply to facial treatments.',
      'The treatment includes thorough cleansing, steam, professional extractions, enzyme or chemical exfoliation based on your skin sensitivity, and targeted serums to calm inflammation and prevent future breakouts. We finish with a soothing mask and hydrating treatment.',
      'Whether you\'re dealing with active back acne, post-inflammatory scarring, or simply want smoother, clearer skin on your back and shoulders — this treatment delivers visible results in a single session.',
    ],
    benefits: [
      'Deep cleansing and professional extractions',
      'Enzyme or chemical exfoliation based on skin type',
      'Targeted anti-acne and anti-inflammatory serums',
      'Soothing mask and hydrating finish',
      'Addresses blackheads, congestion, and scarring',
      'Visible improvement after a single session',
    ],
    idealFor: ['Back acne', 'Shoulder breakouts', 'Blackheads & congestion', 'Post-inflammatory scarring', 'Pre-event skin prep', 'Athletes & active lifestyles'],
  },
  {
    slug: 'microdermabrasion',
    icon: 'sparkle',
    title: 'Microdermabrasion',
    tagline: 'Non-invasive exfoliation that reveals smoother, brighter skin instantly.',
    tag: 'Anti-Aging',
    description: [
      'Microdermabrasion is a non-invasive exfoliation treatment that removes the outer layer of dead skin cells, revealing the fresher, younger skin beneath. It stimulates collagen production and improves overall skin texture.',
      'Marta\'s approach to microdermabrasion is the most thorough in the industry — clients consistently report it\'s the best they\'ve ever experienced. The treatment is painless with zero downtime, and results are visible immediately after your first session.',
      'Regular microdermabrasion treatments help reduce fine lines, minimize pores, even out skin tone, and enhance the absorption of your skincare products by up to 50%.',
    ],
    benefits: [
      'Immediate visible improvement after first session',
      'Stimulates collagen and elastin production',
      'Reduces appearance of fine lines and wrinkles',
      'Minimizes enlarged pores',
      'Evens out skin tone and reduces hyperpigmentation',
      'Zero downtime — return to daily activities immediately',
    ],
    idealFor: ['Fine lines & wrinkles', 'Dull complexion', 'Enlarged pores', 'Uneven skin tone', 'Sun damage', 'Age spots'],
  },
  {
    slug: 'glass-ampule-serums',
    icon: 'vial',
    title: 'Glass Ampule Serums',
    tagline: 'Concentrated European actives for precision-targeted skin treatment.',
    tag: 'European Grade',
    description: [
      'Our glass ampule serums are sourced from the finest laboratories in Germany, Spain, Switzerland, and Italy. Each ampule contains a highly concentrated dose of active ingredients — far more potent than anything available in retail stores.',
      'Glass ampules preserve the integrity of active ingredients by eliminating exposure to air and light. Each ampule is a single-use dose, ensuring maximum freshness and potency with every application.',
      'Marta selects specific ampule formulations based on each client\'s unique skin analysis, targeting concerns like dehydration, hyperpigmentation, redness, and aging with clinical precision.',
    ],
    benefits: [
      'Premium serums from Germany, Spain, Switzerland, and Italy',
      'Single-use glass ampules preserve ingredient potency',
      'Concentrated actives unavailable in retail products',
      'Targeted treatment for specific skin concerns',
      'Paired with in-office treatments for enhanced results',
      'Professional-grade ingredients with clinical efficacy',
    ],
    idealFor: ['Dehydrated skin', 'Hyperpigmentation', 'Redness & sensitivity', 'Aging concerns', 'Dull complexion', 'Post-treatment recovery'],
    image: '/images/instagram/treatment-tranelux-serum.jpg',
    imageAlt: 'European glass ampule serum (Tranelux mesotherapy booster) being prepared during a treatment at 360 Radiance',
  },
  {
    slug: 'skin-analysis-consultation',
    icon: 'scan',
    title: 'Skin Analysis & Consultation',
    tagline: 'Your treatment roadmap starts with a comprehensive skin evaluation.',
    tag: 'Free with booking',
    description: [
      'Every successful skin treatment begins with understanding. Marta\'s comprehensive skin analysis evaluates your skin type, current conditions, lifestyle factors, and treatment history to develop a personalized roadmap to your best skin.',
      'Using her 25+ years of medical expertise and B.S. in Biology, Marta examines your skin at a deeper level than most aestheticians. She identifies underlying causes — not just symptoms — and creates a treatment plan that addresses the root of your concerns.',
      'The consultation is completely free when you book a treatment. You\'ll leave with a clear understanding of your skin, a customized treatment plan, and product recommendations tailored specifically to you.',
    ],
    benefits: [
      'Comprehensive evaluation of skin type and conditions',
      'Analysis of lifestyle factors affecting your skin',
      'Personalized treatment roadmap',
      'Product recommendations tailored to your needs',
      'Free with any treatment booking',
      'Bilingual consultation available (English/Spanish)',
    ],
    idealFor: ['First-time clients', 'Unsure which treatment to choose', 'Multiple skin concerns', 'Sensitive skin types', 'Product-overwhelmed clients', 'Anyone seeking expert guidance'],
  },
  {
    slug: 'botanical-treatments',
    icon: 'leaf',
    title: 'Botanical Treatments',
    tagline: 'Science meets nature in proprietary toxin-free formulas.',
    tag: 'Proprietary',
    description: [
      'The Radiance Skin Care Line was created by Marta Nazzar herself — a proprietary collection of botanical formulas that blend clinical science with nature\'s most beneficial ingredients.',
      'Every product in the line is free of toxins, parabens, and sulfates. These aren\'t just "clean" products — they\'re clinically formulated to deliver real results while being gentle enough for even the most sensitive skin types.',
      'Botanical treatments at 360 Radiance use these proprietary formulas in combination with professional techniques, resulting in healthier, younger-looking skin without the harsh chemicals found in many commercial products.',
    ],
    benefits: [
      'Proprietary formulas created by Marta Nazzar',
      'Free of toxins, parabens, and sulfates',
      'Clinically formulated botanical ingredients',
      'Gentle enough for sensitive skin',
      'Paired with professional in-office application',
      'Take-home products available for continued care',
    ],
    idealFor: ['Sensitive skin', 'Chemical-free preference', 'Redness & irritation', 'Eczema-prone skin', 'Post-procedure care', 'Holistic skincare approach'],
  },
  {
    slug: 'custom-regimen-design',
    icon: 'clipboard',
    title: 'Custom Regimen Design',
    tagline: 'A personalized take-home protocol built for your skin and your life.',
    tag: 'Ongoing Care',
    description: [
      'No two skin types are the same — and your skincare routine shouldn\'t be either. Marta designs a custom regimen for every client that includes product selection, application schedules, and clear instructions for at-home care.',
      'Your regimen is built around your skin analysis results, treatment plan, lifestyle, and budget. It evolves with you — as your skin improves, Marta adjusts your products and protocol to maintain and build on your progress.',
      'This isn\'t a one-time recommendation. Clients receive ongoing support, progress check-ins, and regimen modifications as needed. The goal is long-term skin health, not just short-term results.',
    ],
    benefits: [
      'Completely personalized to your skin type',
      'Product selection based on professional analysis',
      'Clear application schedules and instructions',
      'Ongoing adjustments as your skin improves',
      'Budget-conscious product recommendations',
      'Long-term skin health, not just quick fixes',
    ],
    idealFor: ['Clients finishing a treatment program', 'Inconsistent skincare routines', 'Product-overwhelmed clients', 'Maintenance after clearing', 'Budget-conscious skincare', 'Anyone wanting expert guidance'],
  },
  {
    slug: 'hydrafacial',
    icon: 'sparkle',
    title: 'HydraFacial',
    tagline: 'Cleanse. Extract. Hydrate. The three-step treatment that delivers instant, visible results.',
    tag: 'Signature',
    description: [
      'The HydraFacial is a patented multi-step treatment that combines cleansing, exfoliation, extraction, and hydration in a single session. Using vortex-fusion technology, it delivers potent serums directly into the skin while simultaneously removing impurities.',
      'Unlike traditional facials, the HydraFacial is completely customizable. Marta selects boosters and serums based on your specific skin concerns — whether that\'s fine lines, dark spots, congestion, or dehydration. The result is immediately visible: plumper, clearer, more radiant skin in under 45 minutes.',
      'With zero downtime and no discomfort, this is the perfect treatment before an event, as a monthly maintenance ritual, or as an introduction to professional skincare. 95% of clients report it as the best facial they\'ve ever experienced.',
    ],
    benefits: [
      'Immediate visible glow — walk out camera-ready',
      'Deep pore cleansing with painless extractions',
      'Customizable serums for your specific concerns',
      'Hydrates and plumps with hyaluronic acid infusion',
      'Zero downtime — perfect before events',
      '95% client satisfaction rate',
    ],
    idealFor: ['Dull complexion', 'Congested pores', 'Dehydrated skin', 'Pre-event prep', 'First-time facial clients', 'Monthly maintenance'],
  },
  {
    slug: 'led-facial-therapy',
    icon: 'radiance',
    title: 'LED Facial Therapy',
    tagline: 'Medical-grade light therapy that heals, clears, and rejuvenates at the cellular level.',
    tag: 'Light Therapy',
    description: [
      'LED (Light Emitting Diode) therapy uses specific wavelengths of light to trigger natural cellular processes. Blue light (415nm) kills acne-causing bacteria. Red light (630nm) stimulates collagen production and reduces inflammation. Near-infrared (830nm) accelerates healing deep within the tissue.',
      'Our medical-grade LED panels deliver clinical-strength dosages — significantly more powerful than at-home devices. Each session is painless, relaxing, and takes 20-30 minutes. Results compound over time: most clients see dramatic improvement in acne, redness, and skin texture within 4-6 sessions.',
      'LED therapy is FDA-cleared, has no UV exposure, and works beautifully as a standalone treatment or paired with facials, chemical peels, or microneedling for amplified results.',
    ],
    benefits: [
      'Blue light kills 99.7% of acne bacteria',
      'Red light stimulates collagen production',
      'Reduces inflammation and post-procedure redness',
      'FDA-cleared with zero side effects',
      'Painless — most clients find it relaxing',
      'Amplifies results when paired with other treatments',
    ],
    idealFor: ['Active acne', 'Anti-aging', 'Post-procedure healing', 'Rosacea & redness', 'Inflammation', 'Collagen stimulation'],
    image: '/images/instagram/treatment-led-light-therapy.jpg',
    imageAlt: 'Medical-grade LED light therapy treatment in progress at 360 Radiance',
  },
  {
    slug: 'chemical-peels',
    icon: 'vial',
    title: 'Chemical Peels',
    tagline: 'Clinical-grade peels customized to your skin — from gentle glow to deep resurfacing.',
    tag: 'Resurfacing',
    description: [
      'Chemical peels use controlled acid solutions to remove damaged outer layers of skin, revealing fresher, smoother skin beneath. Marta offers a range of peel depths — from light glycolic peels for a quick refresh to medium-depth TCA peels for significant texture improvement.',
      'Every peel is customized based on your skin analysis. Marta evaluates your skin type, sensitivity, and goals to select the ideal acid type and concentration. Options include glycolic acid, salicylic acid, lactic acid, mandelic acid, and TCA — each targeting different concerns with precision.',
      'Peels are one of the most cost-effective professional treatments available. A series of 4-6 peels can dramatically improve acne scarring, hyperpigmentation, fine lines, and overall skin texture. Marta provides detailed aftercare instructions and sun protection guidance for optimal healing.',
    ],
    benefits: [
      'Accelerates cell turnover for fresh, new skin',
      'Reduces acne scarring and hyperpigmentation',
      'Smooths fine lines and rough texture',
      'Multiple acid options for precise customization',
      'Cost-effective with dramatic results',
      'Detailed aftercare protocol included',
    ],
    idealFor: ['Acne scarring', 'Hyperpigmentation', 'Fine lines', 'Rough texture', 'Sun damage', 'Uneven skin tone'],
  },
  {
    slug: 'microneedling',
    icon: 'medical',
    title: 'Microneedling Collagen Induction Therapy',
    tagline: 'Your skin\'s natural repair system, activated. Firmer, smoother, more even-toned skin.',
    tag: 'Collagen Boost',
    description: [
      'Microneedling uses a device with fine, sterile needles to create thousands of microscopic channels in the skin. This controlled micro-injury triggers your body\'s natural wound-healing cascade — producing new collagen, elastin, and healthy tissue.',
      'The result is measurable: clinical studies show a 400% increase in collagen and elastin production after a series of microneedling treatments. Fine lines soften, acne scars flatten, pores tighten, and overall skin texture improves dramatically.',
      'Marta enhances every microneedling session by infusing growth factors, hyaluronic acid, or vitamin C serums through the micro-channels — delivering actives directly where they\'re most effective. Most clients see visible improvement after the first session, with optimal results after 3-4 treatments spaced 4-6 weeks apart.',
    ],
    benefits: [
      '400% increase in collagen and elastin production',
      'Reduces acne scars and stretch marks',
      'Tightens enlarged pores',
      'Improves fine lines and skin laxity',
      'Enhances product absorption by 3000%',
      'Visible improvement after first session',
    ],
    idealFor: ['Acne scarring', 'Fine lines & wrinkles', 'Enlarged pores', 'Skin laxity', 'Stretch marks', 'Dull, textured skin'],
    image: '/images/instagram/treatment-microneedling.jpg',
    imageAlt: 'Microneedling collagen induction therapy in progress at 360 Radiance',
  },
  {
    slug: 'tattoo-removal-laser',
    icon: 'scan',
    title: 'Tattoo Removal Laser',
    tagline: 'Advanced Q-switched laser technology for safe, gradual tattoo removal.',
    tag: 'Laser',
    description: [
      'Our Q-switched Nd:YAG laser delivers ultra-short pulses of high-intensity light that shatter tattoo ink particles into fragments small enough for your body\'s immune system to flush away naturally. The surrounding skin remains unharmed.',
      'Treatment plans are customized based on your tattoo\'s size, color, depth, age, and your skin type. Black and dark blue inks respond fastest. Most tattoos require 6-12 sessions spaced 6-8 weeks apart for complete removal, though fading is visible after the first session.',
      'Marta\'s medical background ensures safe, precise treatment with proper wound care. We provide numbing cream, cooling technology during treatment, and detailed aftercare instructions. Consultations include a realistic timeline and honest assessment of expected results.',
    ],
    benefits: [
      'FDA-cleared Q-switched laser technology',
      'Safe for most skin types',
      'Visible fading after first session',
      'Minimal scarring with proper aftercare',
      'Medical-grade numbing and cooling for comfort',
      'Honest consultation with realistic timelines',
    ],
    idealFor: ['Full tattoo removal', 'Partial fading for cover-ups', 'Old or faded tattoos', 'Multi-color tattoos', 'Small to medium tattoos', 'Professional appearance needs'],
  },
  {
    slug: 'oxygen-facial-therapy',
    icon: 'dropper',
    title: 'Oxygen Facial Therapy',
    tagline: 'Pressurized oxygen delivers pure hydration and instant radiance deep into your skin.',
    tag: 'Rejuvenation',
    description: [
      'Oxygen facial therapy uses a specialized device to deliver a high-pressure stream of oxygen infused with customized serums — including hyaluronic acid, peptides, and botanical extracts — directly into the epidermis.',
      'The pressurized delivery pushes active ingredients deeper than topical application alone, resulting in immediate plumping, hydration, and a visible glow. Oxygen also has natural antibacterial properties, making this treatment excellent for acne-prone skin that needs hydration without breakouts.',
      'This is the treatment celebrities choose before red-carpet events — and for good reason. Results are immediate and dramatic. Skin looks plumper, smoother, and more luminous within minutes. It pairs beautifully with LED therapy or as a finishing step after microdermabrasion.',
    ],
    benefits: [
      'Instant plumping and hydration',
      'Delivers serums deeper than topical application',
      'Natural antibacterial properties',
      'Celebrity-favorite pre-event treatment',
      'Zero downtime or irritation',
      'Pairs beautifully with other treatments',
    ],
    idealFor: ['Dehydrated skin', 'Pre-event glow', 'Acne-prone skin needing hydration', 'Dull complexion', 'Post-travel skin revival', 'Sensitive skin'],
  },
  {
    slug: 'carbon-yag-laser',
    icon: 'flask',
    title: 'Carbon Yag Laser',
    tagline: 'The "Hollywood Peel" — deep pore cleansing and skin rejuvenation in one dramatic treatment.',
    tag: 'Laser Peel',
    description: [
      'The Carbon Yag Laser treatment — also known as the "Hollywood Peel" or "Carbon Peel" — begins with a layer of liquid carbon applied to your face. The carbon penetrates deep into your pores, bonding with oil, dead skin cells, and contaminants.',
      'A Q-switched Nd:YAG laser then passes over the skin, vaporizing the carbon along with everything it has bonded to. The laser energy also heats the deeper layers of the dermis, stimulating collagen production and tightening pores from the inside out.',
      'The result is immediately visible: dramatically cleaner pores, reduced oil production, smoother texture, and an even, radiant complexion. Most clients describe the sensation as a mild tingling. There\'s no downtime — you can return to your day with noticeably better skin.',
    ],
    benefits: [
      'Deep pore cleansing — removes oil and dead cells',
      'Reduces oiliness and shine for weeks',
      'Stimulates collagen for firmer skin',
      'Minimizes pore size visibly',
      'Evens skin tone and reduces dark spots',
      'Zero downtime — the perfect lunch-hour treatment',
    ],
    idealFor: ['Oily skin', 'Enlarged pores', 'Dull complexion', 'Uneven skin tone', 'Pre-event prep', 'Acne-prone skin'],
    image: '/images/instagram/treatment-laser-pigmentation.jpg',
    imageAlt: 'Q-switched Nd:YAG laser treatment for pigmentation and the Carbon Hollywood Peel at 360 Radiance',
  },
  {
    slug: 'sulwhasoo-korean-facial',
    icon: 'globe',
    title: 'Sulwhasoo Organic Korean Facial',
    tagline: 'Luxury Korean skincare ritual infused with ginseng and traditional herbal wisdom.',
    tag: 'Luxury',
    description: [
      'The Sulwhasoo Korean Facial is a luxury treatment that combines the best of traditional Korean herbal medicine with modern skincare science. Using Sulwhasoo\'s premium product line — centered around Korean ginseng and rare botanical extracts — this facial delivers deep nourishment that Western products simply cannot replicate.',
      'The treatment follows the traditional Korean multi-step protocol: oil cleansing, double cleansing, gentle exfoliation, essence application, serum layering, sheet mask, ginseng eye treatment, and moisturizing seal. Each step builds on the last, creating a cumulative effect of deep hydration and cellular rejuvenation.',
      'Korean skincare has led the global beauty industry for decades — and Sulwhasoo is its most prestigious house. This isn\'t a trend facial — it\'s a time-honored ritual that delivers visibly healthier, more luminous skin. Clients leave feeling deeply relaxed and visibly transformed.',
    ],
    benefits: [
      'Premium Sulwhasoo ginseng-infused products',
      'Traditional Korean multi-step protocol',
      'Deep nourishment with rare botanical extracts',
      'Anti-aging ginseng eye treatment included',
      'Deeply relaxing spa-grade experience',
      'Visibly luminous, rejuvenated skin',
    ],
    idealFor: ['Luxury skincare lovers', 'Aging & mature skin', 'Dehydrated skin', 'Special occasion pampering', 'Fans of Korean skincare', 'Gift experiences'],
  },
  {
    slug: 'skin-deep-facial',
    icon: 'care',
    title: 'Skin Deep Facial',
    tagline: 'Our signature deep-cleansing facial — thorough, effective, and tailored to every skin type.',
    tag: 'Classic',
    description: [
      'The Skin Deep Facial is our comprehensive deep-cleansing treatment — and it\'s the foundation of everything we do at 360 Radiance. It includes thorough cleansing, steam, professional extractions, enzyme or chemical exfoliation, a custom treatment mask, and a hydrating finish.',
      'What makes our Skin Deep Facial different is precision. Marta doesn\'t use a one-size-fits-all approach. She selects every product and technique based on your skin analysis — adjusting the exfoliation method, mask ingredients, and serums to target your specific concerns.',
      'Whether you\'re dealing with congestion, dullness, dehydration, or simply want a professional-grade reset for your skin — this treatment delivers. Many clients book this monthly as their cornerstone maintenance treatment, keeping their skin clear, balanced, and healthy year-round.',
    ],
    benefits: [
      'Professional extractions by an expert aesthetician',
      'Customized exfoliation method for your skin type',
      'Treatment mask selected for your specific concerns',
      'Deep hydration finish for lasting results',
      'Perfect as a monthly maintenance treatment',
      'Suitable for all skin types, including sensitive',
    ],
    idealFor: ['All skin types', 'Monthly maintenance', 'Congested pores', 'Dull complexion', 'First-time clients', 'Skin in need of a reset'],
    image: '/images/instagram/treatment-dermal-filler.jpg',
    imageAlt: 'Signature deep-cleansing facial treatment in progress at 360 Radiance',
  },
];

export type SkinConcern = 'acne' | 'aging' | 'rosacea' | 'hyperpigmentation' | 'dehydration' | 'sensitivity';

export const SKIN_CONCERNS: { id: SkinConcern; label: string; icon: string }[] = [
  { id: 'acne', label: 'Acne & Breakouts', icon: 'scan' },
  { id: 'aging', label: 'Anti-Aging', icon: 'sparkle' },
  { id: 'rosacea', label: 'Rosacea', icon: 'care' },
  { id: 'hyperpigmentation', label: 'Dark Spots', icon: 'dropper' },
  { id: 'dehydration', label: 'Dehydration', icon: 'vial' },
  { id: 'sensitivity', label: 'Sensitivity', icon: 'leaf' },
];

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  category: 'cleanser' | 'serum' | 'treatment' | 'moisturizer' | 'specialty';
  concerns: SkinConcern[];
  keyIngredients: { name: string; benefit: string }[];
  howToUse: string;
  pairsWith: string[];
  badge?: string;
  origin?: string;
  // Extended fields powering the rich product modal + bundle pricing.
  // `accent` selects a brand-approved gradient for the modal hero so each
  // category gets a distinct, recognizable look without needing per-product
  // photography we don't have. `image` reuses the closest matching shot from
  // the curated /images/instagram/ set.
  price: number;
  size: string;
  description: string;
  benefits: string[];
  idealFor: string[];
  routineStep: number; // 1=cleanse, 2=tone, 3=treat, 4=moisturize, 5=specialty
  image: string;
  imageAlt: string;
  accent: 'navy' | 'purple' | 'gold' | 'sage' | 'rose';
}

export const PRODUCT_CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'cleanser', label: 'Cleansers' },
  { id: 'serum', label: 'Serums' },
  { id: 'treatment', label: 'Treatments' },
  { id: 'moisturizer', label: 'Moisturizers' },
  { id: 'specialty', label: 'Specialty' },
] as const;

export const PRODUCTS: Product[] = [
  {
    slug: 'radiance-purifying-cleanser',
    name: 'Purifying Gel Cleanser',
    tagline: 'Deep-clean without stripping. Botanical-powered, pH-balanced.',
    category: 'cleanser',
    concerns: ['acne', 'sensitivity'],
    keyIngredients: [
      { name: 'Tea Tree Extract', benefit: 'Natural antibacterial that fights breakout-causing bacteria without irritation' },
      { name: 'Aloe Vera', benefit: 'Soothes and hydrates while maintaining the skin\'s natural moisture barrier' },
      { name: 'Green Tea Polyphenols', benefit: 'Antioxidant protection that neutralizes free radicals from daily exposure' },
    ],
    howToUse: 'Apply to damp skin morning and evening. Massage gently for 60 seconds, focusing on the T-zone. Rinse with lukewarm water.',
    pairsWith: ['Radiance Clarifying Toner', 'Acne Control Serum'],
    badge: 'Best Seller',
    price: 42,
    size: '5 fl oz · 150 ml',
    description: 'A pH-balanced, sulfate-free gel that lifts pore-clogging debris and excess oil while leaving your barrier intact. Built around clinical-grade botanicals, it cleans the way your skin actually wants to be cleaned — thoroughly, but never harsh.',
    benefits: [
      'Removes makeup, sunscreen, and pollution in one step',
      'Won\'t strip the acid mantle or trigger rebound oil',
      'Calms post-breakout inflammation as it cleanses',
      'Safe for daily use morning and evening',
      'Fragrance-free, paraben-free, sulfate-free',
    ],
    idealFor: ['Acne-prone', 'Combination skin', 'Sensitive skin', 'Daily use'],
    routineStep: 1,
    image: '/images/instagram/product-line-natural.jpg',
    imageAlt: 'Radiance Purifying Gel Cleanser — botanical sulfate-free formula',
    accent: 'sage',
  },
  {
    slug: 'radiance-clarifying-toner',
    name: 'Clarifying Botanical Toner',
    tagline: 'Rebalance. Refine pores. Prep for serums.',
    category: 'cleanser',
    concerns: ['acne', 'hyperpigmentation'],
    keyIngredients: [
      { name: 'Witch Hazel', benefit: 'Natural astringent that tightens pores without alcohol-based drying' },
      { name: 'Niacinamide (B3)', benefit: 'Reduces inflammation, minimizes pores, and evens skin tone simultaneously' },
      { name: 'Chamomile Extract', benefit: 'Anti-inflammatory botanical that calms redness and prepares skin for treatment' },
    ],
    howToUse: 'After cleansing, apply to a cotton pad and sweep across face and neck. Let absorb for 30 seconds before applying serum.',
    pairsWith: ['Purifying Gel Cleanser', 'Vitamin C Brightening Serum'],
    price: 38,
    size: '5 fl oz · 150 ml',
    description: 'The bridge between cleanse and treat. This alcohol-free toner restores your skin\'s natural pH after cleansing, sweeps away the last traces of grime, and primes your skin to absorb up to 60% more of your serums.',
    benefits: [
      'Rebalances pH after cleansing in seconds',
      'Visibly refines pore appearance over 4 weeks',
      'Boosts serum absorption with hydration prep',
      'Calms post-cleanse tightness instantly',
      'Alcohol-free — never drying',
    ],
    idealFor: ['Enlarged pores', 'Uneven tone', 'Oily T-zone', 'All skin types'],
    routineStep: 2,
    image: '/images/instagram/radiance-serums-hydrangea.jpg',
    imageAlt: 'Radiance Clarifying Botanical Toner with witch hazel and niacinamide',
    accent: 'sage',
  },
  {
    slug: 'acne-control-serum',
    name: 'Acne Control Serum',
    tagline: 'Targeted acne treatment with clinical-grade actives.',
    category: 'serum',
    concerns: ['acne'],
    keyIngredients: [
      { name: 'Salicylic Acid (2%)', benefit: 'Penetrates pores to dissolve oil and dead skin buildup — the root cause of breakouts' },
      { name: 'Mandelic Acid', benefit: 'Gentle AHA that exfoliates surface cells and reduces post-inflammatory hyperpigmentation' },
      { name: 'Zinc PCA', benefit: 'Regulates sebum production and reduces inflammation at the cellular level' },
    ],
    howToUse: 'Apply 3-4 drops to clean skin in the evening. Focus on active breakout areas. Follow with moisturizer. Introduce gradually — every other night for the first week.',
    pairsWith: ['Purifying Gel Cleanser', 'Hydra-Repair Moisturizer'],
    badge: 'Face Reality Protocol',
    price: 68,
    size: '1 fl oz · 30 ml',
    description: 'The serum we hand every Face Reality program client on day one. Salicylic acid dissolves the oil plugging your pores, mandelic acid fades the marks left behind, and zinc PCA tells your skin to stop overproducing sebum in the first place.',
    benefits: [
      'Visible reduction in active breakouts within 14 days',
      'Fades post-acne dark marks (PIH) over 8 weeks',
      'Regulates oil without overdrying',
      'Compatible with the Face Reality protocol',
      'Won\'t clog pores or trigger purging beyond week 2',
    ],
    idealFor: ['Active acne', 'Hormonal breakouts', 'Cystic acne', 'Oily skin', 'Post-acne marks'],
    routineStep: 3,
    image: '/images/instagram/treatment-non-inflamed-acne.jpg',
    imageAlt: 'Acne Control Serum with salicylic acid, mandelic acid, and zinc PCA',
    accent: 'navy',
  },
  {
    slug: 'vitamin-c-brightening-serum',
    name: 'Vitamin C Brightening Serum',
    tagline: 'European glass ampule technology for maximum potency.',
    category: 'serum',
    concerns: ['hyperpigmentation', 'aging'],
    keyIngredients: [
      { name: 'L-Ascorbic Acid (15%)', benefit: 'The gold standard of vitamin C — stimulates collagen and fades dark spots' },
      { name: 'Ferulic Acid', benefit: 'Doubles the photoprotective capacity of vitamin C and stabilizes the formula' },
      { name: 'Vitamin E', benefit: 'Synergistic antioxidant that enhances vitamin C absorption by 400%' },
    ],
    howToUse: 'Snap open one glass ampule. Apply entire contents to clean, dry skin in the morning. Follow with moisturizer and SPF.',
    pairsWith: ['Clarifying Botanical Toner', 'Hydra-Repair Moisturizer'],
    badge: 'European Grade',
    origin: 'Germany',
    price: 95,
    size: '7 × 2 ml glass ampules',
    description: 'Sealed in single-dose German glass ampules so every drop is as potent as the day it was formulated — no oxidation, no compromise. The Skoch ferulic + L-ascorbic complex is up to 4× more effective than the same actives in a bottled serum.',
    benefits: [
      'Visibly brightens dull skin in 7 days',
      'Fades hyperpigmentation, melasma, and sun spots',
      'Stimulates collagen — softens fine lines over 8 weeks',
      'Photoprotective: amplifies your SPF',
      'Air-sealed potency in every dose',
    ],
    idealFor: ['Dark spots', 'Sun damage', 'Dullness', 'Early signs of aging', 'Uneven tone'],
    routineStep: 3,
    image: '/images/instagram/radiance-serums-five.jpg',
    imageAlt: 'Vitamin C Brightening Serum — German glass ampules with L-ascorbic acid',
    accent: 'gold',
  },
  {
    slug: 'hyaluronic-hydration-serum',
    name: 'Hyaluronic Hydration Serum',
    tagline: 'Multi-weight hyaluronic acid for deep, lasting hydration.',
    category: 'serum',
    concerns: ['dehydration', 'aging', 'sensitivity'],
    keyIngredients: [
      { name: 'Triple-Weight Hyaluronic Acid', benefit: 'Three molecular sizes penetrate different skin layers for surface and deep hydration' },
      { name: 'Panthenol (B5)', benefit: 'Strengthens the moisture barrier and accelerates skin repair' },
      { name: 'Marine Collagen Peptides', benefit: 'Signal fibroblasts to produce more collagen, improving firmness over time' },
    ],
    howToUse: 'Apply 4-5 drops to damp skin morning and evening. Pat gently — do not rub. Layer under moisturizer for best results.',
    pairsWith: ['Vitamin C Brightening Serum', 'Botanical Repair Cream'],
    origin: 'Switzerland',
    price: 78,
    size: '1 fl oz · 30 ml',
    description: 'Three molecular weights of hyaluronic acid — each engineered to reach a different layer of your skin. The result: surface plumping, mid-layer hydration, and deep-tissue water retention from a single bottle. Lab-formulated in Switzerland.',
    benefits: [
      'Holds 1,000× its weight in water',
      'Plumps fine lines on contact',
      'Restores barrier strength in 2 weeks',
      'Layers under any moisturizer',
      'Safe for the most reactive skin',
    ],
    idealFor: ['Dehydration', 'Tight skin', 'Fine lines', 'Sensitive skin', 'Post-treatment recovery'],
    routineStep: 3,
    image: '/images/instagram/treatment-tranelux-serum.jpg',
    imageAlt: 'Hyaluronic Hydration Serum — Swiss-formulated triple-weight HA',
    accent: 'navy',
  },
  {
    slug: 'rosacea-calm-treatment',
    name: 'Rosacea Calm Treatment',
    tagline: 'Clinical-strength redness reduction. Gentle enough for daily use.',
    category: 'treatment',
    concerns: ['rosacea', 'sensitivity'],
    keyIngredients: [
      { name: 'Azelaic Acid (10%)', benefit: 'Clinically proven to reduce rosacea redness, papules, and pustules' },
      { name: 'Centella Asiatica', benefit: 'Cica extract that strengthens capillary walls and reduces visible redness' },
      { name: 'Licorice Root Extract', benefit: 'Natural anti-inflammatory that inhibits melanin production and soothes irritation' },
    ],
    howToUse: 'Apply a thin layer to affected areas twice daily after cleansing. Can be used under moisturizer. Avoid direct sun exposure.',
    pairsWith: ['Purifying Gel Cleanser', 'Botanical Repair Cream'],
    price: 72,
    size: '1 fl oz · 30 ml',
    description: 'A clinical-strength rosacea treatment built around 10% azelaic acid — the same hero ingredient dermatologists prescribe — softened with cica and licorice so you can actually use it daily without retreating from a flare-up.',
    benefits: [
      'Reduces visible redness in 4 weeks',
      'Calms rosacea papules and pustules',
      'Strengthens capillary walls long-term',
      'Anti-inflammatory and brightening',
      'Gentle enough for twice-daily use',
    ],
    idealFor: ['Rosacea', 'Persistent redness', 'Reactive skin', 'Couperose', 'Post-laser flush'],
    routineStep: 3,
    image: '/images/instagram/treatment-mesotherapy-serums.jpg',
    imageAlt: 'Rosacea Calm Treatment with azelaic acid and centella asiatica',
    accent: 'rose',
  },
  {
    slug: 'retinol-renewal-treatment',
    name: 'Retinol Renewal Treatment',
    tagline: 'Time-released retinol encapsulated in botanical microspheres.',
    category: 'treatment',
    concerns: ['aging', 'hyperpigmentation', 'acne'],
    keyIngredients: [
      { name: 'Encapsulated Retinol (0.5%)', benefit: 'Time-released delivery minimizes irritation while maximizing collagen stimulation' },
      { name: 'Bakuchiol', benefit: 'Plant-based retinol alternative that enhances results without increasing sensitivity' },
      { name: 'Squalane', benefit: 'Lightweight oil that prevents retinol-induced dryness while supporting skin barrier' },
    ],
    howToUse: 'Apply a pea-sized amount to clean, dry skin every other evening. Build to nightly use over 4 weeks. Always use SPF the following morning.',
    pairsWith: ['Hyaluronic Hydration Serum', 'Hydra-Repair Moisturizer'],
    origin: 'Spain',
    price: 88,
    size: '1 fl oz · 30 ml',
    description: 'The most-requested retinol in the clinic. Encapsulated 0.5% retinol releases over 8 hours instead of all at once, paired with bakuchiol and squalane so you get full anti-aging results without the redness, peeling, or downtime.',
    benefits: [
      'Visibly smooths fine lines and wrinkles',
      'Refines texture and minimizes pores',
      'Fades sun damage and hyperpigmentation',
      'Builds collagen — firmer skin over 12 weeks',
      'No retinol burn, peeling, or downtime',
    ],
    idealFor: ['Fine lines', 'Loss of firmness', 'Texture concerns', 'Enlarged pores', 'Sun damage'],
    routineStep: 3,
    image: '/images/instagram/radiance-glycolic-trio.jpg',
    imageAlt: 'Retinol Renewal Treatment — encapsulated retinol with bakuchiol',
    accent: 'purple',
  },
  {
    slug: 'hydra-repair-moisturizer',
    name: 'Hydra-Repair Moisturizer',
    tagline: 'Lightweight barrier repair. Locks in actives. Never greasy.',
    category: 'moisturizer',
    concerns: ['dehydration', 'sensitivity', 'acne'],
    keyIngredients: [
      { name: 'Ceramide Complex', benefit: 'Restores the lipid barrier — the #1 factor in healthy, resilient skin' },
      { name: 'Jojoba Oil', benefit: 'Mimics natural sebum, so skin absorbs it instantly without clogging pores' },
      { name: 'Allantoin', benefit: 'Promotes cell regeneration and soothes post-treatment skin' },
    ],
    howToUse: 'Apply generously to face and neck morning and evening as the final step in your routine. Can be used over serums and treatments.',
    pairsWith: ['Acne Control Serum', 'Hyaluronic Hydration Serum'],
    badge: 'Best Seller',
    price: 58,
    size: '1.7 fl oz · 50 ml',
    description: 'The everyday moisturizer Marta recommends to almost every client — barrier-first, weightless, and engineered to lock in everything you applied underneath without ever feeling tacky or heavy.',
    benefits: [
      'Restores ceramide barrier in 14 days',
      'Locks in serums for 8+ hours',
      'Non-comedogenic — safe for acne-prone',
      'Doubles as a soothing post-treatment cream',
      'Layers under SPF and makeup invisibly',
    ],
    idealFor: ['Daily wear', 'Acne-prone', 'Sensitive skin', 'After actives', 'All ages'],
    routineStep: 4,
    image: '/images/instagram/product-line-holiday.jpg',
    imageAlt: 'Hydra-Repair Moisturizer with ceramide complex and jojoba oil',
    accent: 'sage',
  },
  {
    slug: 'botanical-repair-cream',
    name: 'Botanical Repair Cream',
    tagline: 'Rich, restorative. For post-treatment and overnight recovery.',
    category: 'moisturizer',
    concerns: ['sensitivity', 'rosacea', 'dehydration'],
    keyIngredients: [
      { name: 'Shea Butter', benefit: 'Deep moisturization with natural vitamins A, E, and F for overnight repair' },
      { name: 'Calendula Extract', benefit: 'Powerful wound-healing botanical that accelerates post-treatment recovery' },
      { name: 'Rosehip Seed Oil', benefit: 'Rich in essential fatty acids that reduce scarring and improve skin elasticity' },
    ],
    howToUse: 'Apply a generous layer to clean skin in the evening. Ideal as a sleeping mask after treatments. Use nightly or as needed for recovery.',
    pairsWith: ['Rosacea Calm Treatment', 'Hyaluronic Hydration Serum'],
    price: 72,
    size: '1.7 fl oz · 50 ml',
    description: 'A luxurious overnight cream that repairs while you sleep. Calendula speeds tissue recovery, rosehip oil reduces scarring, and shea butter pulls moisture deep into the dermis. Wake up looking like you just left the treatment room.',
    benefits: [
      'Accelerates post-treatment recovery',
      'Reduces scarring and dark marks over time',
      'Deeply hydrates without clogging pores',
      'Rebuilds elasticity in dehydrated skin',
      'Works as a sleeping mask once a week',
    ],
    idealFor: ['Dry skin', 'Mature skin', 'Post-treatment', 'Reactive skin', 'Overnight repair'],
    routineStep: 4,
    image: '/images/instagram/glow-with-radiance-line.jpg',
    imageAlt: 'Botanical Repair Cream with calendula, shea butter, and rosehip oil',
    accent: 'gold',
  },
  {
    slug: 'microderm-polish',
    name: 'Microderm Polish',
    tagline: 'Professional-grade exfoliant for at-home maintenance.',
    category: 'specialty',
    concerns: ['aging', 'hyperpigmentation', 'acne'],
    keyIngredients: [
      { name: 'Aluminum Oxide Crystals', benefit: 'Same medical-grade crystals used in professional microdermabrasion treatments' },
      { name: 'Papaya Enzyme', benefit: 'Natural enzyme exfoliant that dissolves dead skin without abrasion' },
      { name: 'Kaolin Clay', benefit: 'Absorbs excess oil and refines pore appearance without over-drying' },
    ],
    howToUse: 'Use 1-2 times per week on damp skin. Massage in small circles for 2 minutes, avoiding the eye area. Rinse thoroughly.',
    pairsWith: ['Clarifying Botanical Toner', 'Vitamin C Brightening Serum'],
    badge: 'Professional Grade',
    price: 52,
    size: '3.4 fl oz · 100 ml',
    description: 'Bring the in-clinic microdermabrasion result home, once a week. Same medical-grade aluminum oxide crystals we use in the treatment room, buffered by papaya enzyme so you get clinical-level resurfacing without the harsh edges.',
    benefits: [
      'Reveals smoother, brighter skin in 1 use',
      'Stimulates collagen — like a mini in-office treatment',
      'Refines pores and unclogs blackheads',
      'Boosts the absorption of every product after',
      'Use 1–2× per week as maintenance',
    ],
    idealFor: ['Dull skin', 'Texture concerns', 'Clogged pores', 'Pre-event glow', 'Maintenance'],
    routineStep: 5,
    image: '/images/instagram/treatment-ultrasonic-extractions.jpg',
    imageAlt: 'Microderm Polish with aluminum oxide crystals and papaya enzyme',
    accent: 'purple',
  },
];

/**
 * Curated bundle deals that show up on the products page beneath the catalog.
 * Each bundle pulls real products from PRODUCTS by slug, then defines its own
 * `bundlePrice` (the discounted total). Original price is computed at render
 * time so it always stays consistent with each product's individual `price`.
 *
 * Pricing rule of thumb: ~15–20% off the sum of MSRPs. Don't go cheaper without
 * checking margin with Marta — clinic product margin already accounts for the
 * fact that these formulas are dispensed in-clinic, not retail.
 */
export interface ProductBundle {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  productSlugs: string[];
  bundlePrice: number;
  badge?: string;
  highlight?: boolean;
  forConcern: string;
  accent: 'navy' | 'purple' | 'gold' | 'sage' | 'rose';
  image: string;
}

export const PRODUCT_BUNDLES: ProductBundle[] = [
  {
    slug: 'clear-skin-starter',
    name: 'The Clear Skin Starter',
    tagline: 'The exact 4-step routine Marta builds for new acne clients.',
    description:
      'Everything you need to break the breakout cycle — the cleanser that won\'t strip, the toner that primes, the serum dermatologists wish they could prescribe, and the moisturizer that lets you actually use the actives.',
    productSlugs: [
      'radiance-purifying-cleanser',
      'radiance-clarifying-toner',
      'acne-control-serum',
      'hydra-repair-moisturizer',
    ],
    bundlePrice: 179,
    badge: 'Save $27',
    forConcern: 'Acne & Breakouts',
    accent: 'navy',
    image: '/images/instagram/before-after-acne-1.jpg',
  },
  {
    slug: 'brightening-ritual',
    name: 'The Brightening Ritual',
    tagline: 'Even tone. Visible glow. The European-grade morning routine.',
    description:
      'Built around the German vitamin C ampules. Pair them with our Swiss-formulated hyaluronic and the daily moisturizer your skin already loves, and dark spots start fading in two weeks.',
    productSlugs: [
      'radiance-clarifying-toner',
      'vitamin-c-brightening-serum',
      'hyaluronic-hydration-serum',
      'hydra-repair-moisturizer',
    ],
    bundlePrice: 229,
    badge: 'Save $40',
    highlight: true,
    forConcern: 'Dark Spots & Dullness',
    accent: 'gold',
    image: '/images/instagram/before-after-pigmentation.jpg',
  },
  {
    slug: 'anti-aging-system',
    name: 'The Anti-Aging System',
    tagline: 'Encapsulated retinol + collagen-building actives. No downtime.',
    description:
      'A complete day-and-night anti-aging protocol. Retinol stimulates collagen overnight without burning your skin, vitamin C protects you all day, and the rest of the system makes sure neither leaves you irritated.',
    productSlugs: [
      'vitamin-c-brightening-serum',
      'retinol-renewal-treatment',
      'hyaluronic-hydration-serum',
      'botanical-repair-cream',
    ],
    bundlePrice: 279,
    badge: 'Save $54',
    forConcern: 'Fine Lines & Firmness',
    accent: 'purple',
    image: '/images/instagram/before-after-aging.jpg',
  },
  {
    slug: 'sensitive-calm-set',
    name: 'The Sensitive Skin Calm Set',
    tagline: 'For rosacea, redness, and skin that overreacts to everything.',
    description:
      'A full reactive-skin protocol. The cleanser respects your barrier, the azelaic acid treatment quiets visible redness, and the botanical repair cream rebuilds you overnight.',
    productSlugs: [
      'radiance-purifying-cleanser',
      'rosacea-calm-treatment',
      'hyaluronic-hydration-serum',
      'botanical-repair-cream',
    ],
    bundlePrice: 199,
    badge: 'Save $35',
    forConcern: 'Rosacea & Sensitivity',
    accent: 'rose',
    image: '/images/instagram/before-after-rosacea-1.jpg',
  },
];

export interface BlogSection {
  heading?: string;
  body: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  date: string;
  featured?: boolean;
  tags: string[];
  content: BlogSection[];
  cta?: string;
}

export const BLOG_CATEGORIES = [
  'All',
  'Acne Science',
  'Ingredients',
  'Skin Health',
  'Treatments',
  'Product Guides',
] as const;

type BlogPostMeta = Omit<BlogPost, 'content' | 'cta'>;

const BLOG_POSTS_META: BlogPostMeta[] = [
  {
    slug: 'why-face-reality-works-when-everything-else-fails',
    title: 'Why Face Reality Works When Everything Else Fails',
    excerpt: 'After years of dermatologists, antibiotics, and over-the-counter products — why does this protocol finally clear your skin? The answer lies in how Face Reality treats acne as a chronic condition, not a one-time event.',
    category: 'Acne Science',
    readTime: 8,
    date: '2026-03-28',
    featured: true,
    tags: ['Face Reality', 'acne', 'protocol', 'clinical'],
  },
  {
    slug: 'the-science-of-glass-ampule-serums',
    title: 'The Science of Glass Ampule Serums: Why Europe Got It Right',
    excerpt: 'European skincare labs have used glass ampule technology for decades. Here\'s why single-dose, air-sealed delivery makes your serums 4x more effective than anything in a bottle.',
    category: 'Ingredients',
    readTime: 6,
    date: '2026-03-21',
    tags: ['serums', 'European', 'glass ampule', 'ingredients'],
  },
  {
    slug: 'rosacea-triggers-complete-guide',
    title: 'Rosacea Triggers: The Complete Guide to What\'s Inflaming Your Skin',
    excerpt: 'Rosacea isn\'t random. From gut health to UV exposure to specific ingredients in your current products — here are the 12 most common triggers and exactly how to avoid them.',
    category: 'Skin Health',
    readTime: 10,
    date: '2026-03-14',
    tags: ['rosacea', 'triggers', 'inflammation', 'gut health'],
  },
  {
    slug: 'microdermabrasion-what-actually-happens',
    title: 'Microdermabrasion: What Actually Happens to Your Skin (Layer by Layer)',
    excerpt: 'Most people know microdermabrasion "exfoliates" — but what does that mean at a cellular level? A clinical breakdown of how crystal exfoliation triggers your skin\'s repair cascade.',
    category: 'Treatments',
    readTime: 7,
    date: '2026-03-07',
    tags: ['microdermabrasion', 'exfoliation', 'collagen', 'treatment'],
  },
  {
    slug: 'your-skin-barrier-explained',
    title: 'Your Skin Barrier Explained: Why It Matters More Than Any Product',
    excerpt: 'The acid mantle, the lipid matrix, the microbiome. Your skin barrier is a complex ecosystem — and most skincare routines are accidentally destroying it. Here\'s how to rebuild it.',
    category: 'Skin Health',
    readTime: 9,
    date: '2026-02-28',
    tags: ['skin barrier', 'acid mantle', 'microbiome', 'ceramides'],
  },
  {
    slug: 'retinol-vs-bakuchiol',
    title: 'Retinol vs. Bakuchiol: A Clinician\'s Honest Comparison',
    excerpt: 'Bakuchiol is marketed as "natural retinol" — but does it deliver the same results? We break down the clinical data, the ideal use cases, and why we use both in our Retinol Renewal Treatment.',
    category: 'Ingredients',
    readTime: 7,
    date: '2026-02-21',
    tags: ['retinol', 'bakuchiol', 'anti-aging', 'ingredients'],
  },
  {
    slug: 'hormonal-acne-root-cause',
    title: 'Hormonal Acne: Getting to the Root Cause (Not Just the Surface)',
    excerpt: 'Hormonal acne follows patterns — jawline, chin, cyclical flares. Understanding the androgen-sebum connection is the first step to breaking the cycle without harsh medications.',
    category: 'Acne Science',
    readTime: 8,
    date: '2026-02-14',
    tags: ['hormonal acne', 'androgens', 'sebum', 'jawline acne'],
  },
  {
    slug: 'building-a-morning-routine-that-works',
    title: 'Building a Morning Routine That Actually Works (And Why Order Matters)',
    excerpt: 'Cleanser, toner, serum, moisturizer, SPF — but the order, wait times, and layering technique matter as much as the products themselves. A step-by-step guide from our clinic.',
    category: 'Product Guides',
    readTime: 6,
    date: '2026-02-07',
    tags: ['routine', 'morning', 'layering', 'SPF'],
  },
  {
    slug: 'parabens-sulfates-toxins-what-to-actually-avoid',
    title: 'Parabens, Sulfates, Toxins: What to Actually Avoid (And What\'s Just Marketing)',
    excerpt: 'Not all "clean beauty" claims are equal. A science-based guide to which ingredients genuinely harm your skin and which "scary" chemicals are perfectly safe.',
    category: 'Ingredients',
    readTime: 9,
    date: '2026-01-31',
    tags: ['clean beauty', 'parabens', 'sulfates', 'toxins'],
  },
];

// English by default for any code that just iterates metadata
export const BLOG_POSTS: BlogPost[] = BLOG_POSTS_META.map((meta) => ({
  ...meta,
  content: ALL_BLOG_CONTENT_EN[meta.slug] ?? [],
  cta: BLOG_CTAS_EN[meta.slug],
}));

// Locale-aware lookup for article pages
export function getBlogPosts(locale: string): BlogPost[] {
  const content = BLOG_CONTENT_BY_LOCALE[locale] ?? ALL_BLOG_CONTENT_EN;
  const ctas = BLOG_CTAS_BY_LOCALE[locale] ?? BLOG_CTAS_EN;
  return BLOG_POSTS_META.map((meta) => ({
    ...meta,
    content: content[meta.slug] ?? ALL_BLOG_CONTENT_EN[meta.slug] ?? [],
    cta: ctas[meta.slug],
  }));
}

export function getBlogPost(locale: string, slug: string): BlogPost | undefined {
  return getBlogPosts(locale).find((p) => p.slug === slug);
}

