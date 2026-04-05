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
