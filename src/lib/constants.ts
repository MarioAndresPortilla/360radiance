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
    // Third-party review/listing profiles. These feed JSON-LD `sameAs` so
    // Google can stitch them into the Knowledge Graph "About the source" panel
    // that appears next to our search result. The old skincaretherapy.net site
    // had these connections built up over years of crawling — surfacing them
    // explicitly in structured data is the fastest way to get the new domain
    // (360radianceskincare.com) the same treatment.
    yelp: 'https://www.yelp.com/biz/360-radiance-sunrise',
    groupon: 'https://www.groupon.com/biz/sunrise-fl/360-radiance-1',
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
    image: '/images/instagram/before-after-acne-1.webp',
    postUrl: 'https://instagram.com/360radianceinc',
    alt: 'Real client acne transformation — clearer skin and a confident smile after the 12-week Acne Treatment Program at 360 Radiance',
    caption: 'Acne transformation',
  },
  {
    id: 2,
    image: '/images/instagram/treatment-microneedling.webp',
    postUrl: 'https://instagram.com/360radianceinc',
    alt: 'Microneedling treatment in progress at 360 Radiance — Marta performing the procedure',
    caption: 'Microneedling in progress',
  },
  {
    id: 3,
    image: '/images/instagram/radiance-serums-five.webp',
    postUrl: 'https://instagram.com/360radianceinc',
    alt: 'The Radiance Skin Care Line — five signature serums including Peptide, Radian-C, Glycolic, Collagen, and Eye Rescue',
    caption: 'The Radiance Serums',
  },
  {
    id: 4,
    image: '/images/instagram/before-after-rosacea-2.webp',
    postUrl: 'https://instagram.com/360radianceinc',
    alt: 'Rosacea before and after — calmed redness and even tone after treatment at 360 Radiance',
    caption: 'Rosacea cleared',
  },
  {
    id: 5,
    image: '/images/instagram/treatment-mesotherapy-serums.webp',
    postUrl: 'https://instagram.com/360radianceinc',
    alt: 'Mesotherapy facial serum treatment in progress at 360 Radiance',
    caption: 'Mesotherapy serums',
  },
  {
    id: 6,
    image: '/images/instagram/before-after-pigmentation.webp',
    postUrl: 'https://instagram.com/360radianceinc',
    alt: 'Hyperpigmentation and sun damage cleared — before and after at 360 Radiance',
    caption: 'Pigmentation cleared',
  },
  {
    id: 7,
    image: '/images/instagram/before-after-acne-2.webp',
    postUrl: 'https://instagram.com/360radianceinc',
    alt: 'Dramatic acne transformation — before and after the 12-week Acne Treatment Program',
    caption: '12-week transformation',
  },
  {
    id: 8,
    image: '/images/instagram/radiance-glycolic-trio.webp',
    postUrl: 'https://instagram.com/360radianceinc',
    alt: 'Radiance Skin Care Glycolic line — Gentle Glycolic Cleanser, Glycolic Serum, and Equalizing Moisture Gel',
    caption: 'The Glycolic line',
  },
  {
    id: 9,
    image: '/images/instagram/treatment-ultrasonic-extractions.webp',
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


// Service detail data was moved to src/data/services.ts (Apr 2026) to keep
// this file focused on business config + small data. Re-exported here so
// existing import sites continue to work without churn.
export type { ServiceDetail } from '@/data/services';
export { ACNE_PROGRAM_PRICING, ACNE_PROGRAM_CONTRAINDICATIONS, SERVICE_DETAILS } from '@/data/services';



// Product catalog moved to src/data/products.ts (Apr 2026). Re-exported
// here so existing import sites continue to work without churn.
export type { SkinConcern, Product, ProductBundle } from '@/data/products';
export { SKIN_CONCERNS, PRODUCT_CATEGORIES, PRODUCTS, PRODUCT_BUNDLES } from '@/data/products';


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

