/*
 * Service detail data — full per-treatment content rendered by the
 * /services page. Split out of src/lib/constants.ts (Apr 2026) because
 * the constants file had grown to 1459 lines, mixing business config,
 * marketing copy, and data blobs in one place. Moved here so future
 * service edits don't require scrolling through CAL config and blog
 * imports.
 *
 * Re-exported from src/lib/constants.ts for backwards compatibility,
 * so existing import sites (`import { SERVICE_DETAILS } from '@/lib/constants'`)
 * keep working without churn. New code should import directly from
 * '@/data/services'.
 */

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
    image: '/images/instagram/before-after-acne-3.webp',
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
    image: '/images/instagram/treatment-tranelux-serum.webp',
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
    image: '/images/instagram/treatment-led-light-therapy.webp',
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
    image: '/images/instagram/treatment-microneedling.webp',
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
    image: '/images/instagram/treatment-laser-pigmentation.webp',
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
    image: '/images/instagram/treatment-dermal-filler.webp',
    imageAlt: 'Signature deep-cleansing facial treatment in progress at 360 Radiance',
  },
];
