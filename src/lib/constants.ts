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
    title: 'Acne Treatment Program',
    description: 'Complete 12-week clinical program: consultation, acne facial, custom home-care regimen, and bi-monthly monitoring. Starting at $280.',
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
    description: 'Comprehensive evaluation of your skin type, conditions, and lifestyle. Your treatment roadmap starts here. $50.',
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
    title: 'Consultation & First Facial',
    description: 'Health history, skin analysis, sensitivity test, acne facial, and your custom home-care regimen. $50 consultation + $50 facial.',
    progress: 15,
  },
  {
    number: '02',
    weekLabel: 'Weeks 2–4',
    title: 'First Signs',
    description: 'Home-care regimen takes effect. Inflammation drops. 30–50% improvement for most clients. Bi-monthly visit ($80).',
    progress: 40,
  },
  {
    number: '03',
    weekLabel: 'Weeks 4–8',
    title: 'Breakthrough',
    description: 'Dramatic clearing. Rosacea clients often fully clear. Acne facial + regimen adjustment at bi-monthly visit.',
    progress: 70,
  },
  {
    number: '04',
    weekLabel: 'Weeks 8–12',
    title: 'Clear Skin',
    description: '90%+ improvement. Maintenance phase begins. Final visit to lock in results and transition to long-term care.',
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

export const ACNE_PROGRAM_PRICING = {
  consultation: 50,
  acneFacial: 50,
  homeCareProducts: 180,
  totalStarting: 280,
  biMonthlyVisit: 80,
  programLength: '12 weeks',
  visitFrequency: 'Bi-monthly for 3 months',
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
    tagline: 'A complete 12-week clinical program to clear your skin — starting at $280.',
    tag: '12-Week Program',
    featured: true,
    description: [
      'The Acne Treatment Program is a comprehensive 12-week clinical protocol designed to create clear skin. Built on the Face Reality method — developed by Dr. James E. Fulton, the pioneer of Retin-A — this program combines professional in-office treatments with a custom home-care regimen tailored to your specific acne type.',
      'Your program begins with an initial consultation ($50) that includes a full health history review, allergy and medication screening, lifestyle assessment, skin analysis to determine your skin type, acne type, and a sensitivity test. You\'ll then receive your first acne facial ($50), customized to your specific condition, followed by a complete take-home package with home-care products (approximately $180) and lifestyle recommendations.',
      'Over the following 12 weeks, you\'ll have bi-monthly visits ($80 each) for 3 months. Each visit includes progress monitoring and an acne facial to prepare your skin for the next phase of your home-care regimen. Most clients see 30–50% improvement within the first two weeks, and 90%+ improvement by the end of the program.',
    ],
    benefits: [
      'Initial consultation with health history & skin analysis — $50',
      'First acne facial customized to your condition — $50',
      '12 weeks of home-care products — approximately $180',
      'Bi-monthly monitoring visits with acne facial — $80 each',
      'Complete take-home package with lifestyle guidelines',
      'Total program starting at $280 + bi-monthly visits',
    ],
    idealFor: ['Hormonal acne', 'Cystic acne', 'Rosacea', 'Persistent breakouts', 'Adult acne', 'Teen acne'],
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
  },
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  date: string;
  featured?: boolean;
  tags: string[];
}

export const BLOG_CATEGORIES = [
  'All',
  'Acne Science',
  'Ingredients',
  'Skin Health',
  'Treatments',
  'Product Guides',
] as const;

export const BLOG_POSTS: BlogPost[] = [
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

export const BOOKING_SERVICES = [
  'Acne Treatment Program',
  'Back Facial',
  'Microdermabrasion',
  'Skin Analysis & Consultation',
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
