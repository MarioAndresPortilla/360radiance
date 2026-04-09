/*
 * Product catalog data — full Product / Bundle / Concern definitions used by
 * the /products page (ProductShowcase, PackageDeals, SkinConcernMatcher).
 * Split out of src/lib/constants.ts (Apr 2026) to keep the constants file
 * focused on business config + small data.
 *
 * Re-exported from src/lib/constants.ts for backwards compatibility, so the
 * existing import sites (`import { PRODUCTS } from '@/lib/constants'`) keep
 * working without churn. New code should import directly from '@/data/products'.
 */

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
    price: 35,
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
    image: '/images/Radiance_Gentle_Herbal_Cleanser.jpeg',
    imageAlt: 'Radiance Gentle Herbal Cleanser — botanical sulfate-free formula',
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
    price: 35,
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
    image: '/images/Radiance_5_Serum_Lineup_Dark_Background.jpeg',
    imageAlt: 'Radiance Clarifying Botanical Toner shown with the Radiance serum lineup',
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
    price: 35,
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
    image: '/images/Radiance_Glycolic_Serum_Bokeh.jpeg',
    imageAlt: 'Radiance Glycolic Acne Control Serum with salicylic acid, mandelic acid, and zinc PCA',
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
    price: 35,
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
    image: '/images/Radiance_Radian_C_Vitamin_C_Serum.jpeg',
    imageAlt: 'Radiance Radian-C Vitamin C Brightening Serum — stable, potent L-ascorbic formula',
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
    price: 35,
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
    image: '/images/Radiance_Peptide_Serum_Hyaluronic_Acid.jpeg',
    imageAlt: 'Radiance Peptide Serum with Hyaluronic Acid — Swiss-formulated triple-weight HA',
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
    image: '/images/Radiance_Collagen_Serum_Bokeh.jpeg',
    imageAlt: 'Radiance Collagen Serum used in the Rosacea Calm Treatment routine',
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
    image: '/images/Radiance_Retinol_Renewal_Serum.jpeg',
    imageAlt: 'Radiance Retinol Renewal Serum — encapsulated retinol with bakuchiol',
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
    price: 35,
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
    image: '/images/Radiance_Natural_Velvet_Moisturizer.jpeg',
    imageAlt: 'Radiance Natural Velvet Hydra-Repair Moisturizer with ceramide complex and jojoba oil',
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
    price: 35,
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
    image: '/images/Radiance_Normalizing_Moisture_Cream.jpeg',
    imageAlt: 'Radiance Normalizing Moisture Cream — botanical overnight repair with calendula and rosehip',
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
    image: '/images/Radiance_Equalizing_Moisture_Gel.jpeg',
    imageAlt: 'Radiance Equalizing Moisture Gel paired with the Microderm Polish exfoliating routine',
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
    bundlePrice: 119,
    badge: 'Save $21',
    forConcern: 'Acne & Breakouts',
    accent: 'navy',
    image: '/images/Radiance_4_Serums_On_Greenery.jpeg',
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
    bundlePrice: 119,
    badge: 'Save $21',
    highlight: true,
    forConcern: 'Dark Spots & Dullness',
    accent: 'gold',
    image: '/images/Radiance_Serum_Quad_Collagen_Glycolic_Glyctide_Tone_Rescue.jpeg',
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
    bundlePrice: 164,
    badge: 'Save $29',
    forConcern: 'Fine Lines & Firmness',
    accent: 'purple',
    image: '/images/Radiance_Holiday_Collection_6_Products.jpeg',
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
    bundlePrice: 149,
    badge: 'Save $28',
    forConcern: 'Rosacea & Sensitivity',
    accent: 'rose',
    image: '/images/instagram/before-after-rosacea-1.webp',
  },
];
