import type { Service, Testimonial, WhyCard, Credential, JourneyStep, ProductFeature, HourEntry, TrustItem } from '@/types';

export const BUSINESS = {
  name: '360 Radiance',
  phone: '(561) 632-8218',
  phoneRaw: '5616328218',
  whatsapp: 'https://wa.me/15616328218',
  address: '12651 W. Sunrise Blvd, Suite 301',
  city: 'Sunrise',
  state: 'FL',
  zip: '33323',
  mapUrl: 'https://maps.google.com/?q=12651+W+Sunrise+Blvd+Suite+301+Sunrise+FL+33323',
  social: {
    facebook: 'https://facebook.com/360radiance',
    instagram: 'https://instagram.com/360radianceinc',
  },
} as const;

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
    iconTheme: 'teal',
    title: 'Medical-Grade Expertise',
    description: ' 25 years of medical background with a B.S. in Biology and A.S. in Lab Sciences. Clinical precision in every consultation.',
  },
  {
    icon: 'science',
    iconTheme: 'gold',
    title: 'Certified Acne Protocol',
    description: 'Face Reality certified under Dr. James E. Fulton, the pioneer of Retin-A. A proven system — not guesswork.',
  },
  {
    icon: 'globe',
    iconTheme: 'teal',
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
    iconTheme: 'teal',
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
    title: 'Face Reality Acne Program',
    description: 'Clinical acne management for hormonal, cystic, and rosacea acne. Professional treatments + custom home-care.',
    tag: 'Results in 2–4 weeks',
    featured: true,
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
    description: 'Comprehensive evaluation of your skin type, conditions, and lifestyle. Your treatment roadmap starts here.',
    tag: 'Free with booking',
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
    title: 'Consultation',
    description: 'Skin analysis, first treatment, custom regimen begins.',
    progress: 20,
  },
  {
    number: '02',
    weekLabel: 'Week 2',
    title: 'First Signs',
    description: 'Inflammation drops. 30–50% improvement for most clients.',
    progress: 45,
  },
  {
    number: '03',
    weekLabel: 'Week 4',
    title: 'Breakthrough',
    description: 'Dramatic clearing. Rosacea clients often fully clear.',
    progress: 75,
  },
  {
    number: '04',
    weekLabel: 'Week 8',
    title: 'Radiance',
    description: '90%+ improvement. Go out makeup-free with confidence.',
    progress: 95,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    text: 'Within the first week, many of my inflamed cysts had reduced. This regime has my skin controlled — I would have never believed it.',
    name: 'Carla',
    condition: 'Hormonal Acne',
    avatarColor: 'bg-teal',
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
    avatarColor: 'bg-teal-dark',
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
    avatarColor: 'bg-teal-light',
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
}

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: 'face-reality-acne-program',
    icon: 'science',
    title: 'Face Reality Acne Program',
    tagline: 'Clinical acne management with a proven protocol — not guesswork.',
    tag: 'Results in 2–4 weeks',
    featured: true,
    description: [
      'The Face Reality Acne Program is a comprehensive, clinical approach to clearing acne — developed by Dr. James E. Fulton, the pioneer of Retin-A. Marta is personally certified under this protocol and has used it to transform hundreds of clients\' skin.',
      'Unlike store-bought products that treat symptoms, Face Reality addresses the root causes of acne: excess sebum, dead skin cell buildup, and bacterial overgrowth. Each client receives a customized combination of professional in-office treatments and a tailored home-care regimen.',
      'Most clients see a 30–50% improvement within the first two weeks. Rosacea clients frequently clear completely within four weeks. The program includes bi-weekly professional treatments, custom product selection, and ongoing regimen adjustments as your skin responds.',
    ],
    benefits: [
      'Addresses hormonal, cystic, and rosacea acne',
      'Bi-weekly professional treatments in-office',
      'Custom home-care regimen with medical-grade products',
      'Progress tracking and regimen adjustments',
      'Most clients see 90%+ improvement by week 8',
      'Certified protocol — backed by clinical research',
    ],
    idealFor: ['Hormonal acne', 'Cystic acne', 'Rosacea', 'Persistent breakouts', 'Adult acne', 'Teen acne'],
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
  },
  {
    slug: 'skin-analysis-consultation',
    icon: 'scan',
    title: 'Skin Analysis & Consultation',
    tagline: 'Your treatment roadmap starts with a comprehensive skin evaluation.',
    tag: 'Free with booking',
    description: [
      'Every successful skin treatment begins with understanding. Marta\'s comprehensive skin analysis evaluates your skin type, current conditions, lifestyle factors, and treatment history to develop a personalized roadmap to your best skin.',
      'Using her 25 years of medical expertise and B.S. in Biology, Marta examines your skin at a deeper level than most aestheticians. She identifies underlying causes — not just symptoms — and creates a treatment plan that addresses the root of your concerns.',
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
];

export const BOOKING_SERVICES = [
  'Acne Consultation',
  'Microdermabrasion',
  'Skin Analysis',
  'Botanical Treatment',
  'Rosacea Program',
  'Custom Regimen',
] as const;

export const BOOKING_DAYS = [
  'Monday',
  'Tuesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;
