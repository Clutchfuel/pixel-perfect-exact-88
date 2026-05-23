export type ProductSlug = "clutch-iso" | "clutch-flow" | "clutch-recovery";

export interface Product {
  slug: ProductSlug;
  name: string;
  stage: "Prepare" | "Perform" | "Recover";
  tagline: string;
  description: string;
  headline: string;
  forWho: string;
  whenToUse: string;
  benefits: string[];
  ingredients: { name: string; role: string }[];
  faqs: { q: string; a: string }[];
  accent: boolean;
}

export const products: Product[] = [
  {
    slug: "clutch-iso",
    name: "Clutch ISO",
    stage: "Prepare",
    tagline: "Prime your body before the first whistle.",
    description:
      "Complete pre-training hydration system designed to fully saturate your body with the fluid and electrolytes you'll lose during effort.",
    headline: "Hydration that starts working before you do.",
    forWho:
      "Athletes who train early, compete in heat, or routinely start sessions already behind on fluid.",
    whenToUse:
      "60-90 minutes before training or competition. Sip with 12-16 oz of water and pair with a light carb source.",
    benefits: [
      "Builds an electrolyte reserve before sweat losses begin",
      "Reduces early-session fatigue from hidden dehydration",
      "Supports stable focus through the warm-up window",
      "Pairs cleanly with caffeine, creatine, or pre-workouts",
    ],
    ingredients: [
      { name: "Sodium (1,000 mg)", role: "Replaces the primary electrolyte lost through sweat" },
      { name: "Potassium (400 mg)", role: "Supports muscle contraction and fluid balance" },
      { name: "Magnesium (120 mg)", role: "Helps prevent cramping under sustained load" },
      { name: "Chloride", role: "Maintains plasma volume and blood pressure" },
      { name: "Trace minerals", role: "Rounds out a complete electrolyte profile" },
    ],
    faqs: [
      {
        q: "How is Clutch ISO different from a sports drink?",
        a: "Sports drinks were built around sugar delivery. Clutch ISO is built around fluid and electrolyte balance — closer to a clinical rehydration formula than a beverage.",
      },
      {
        q: "Can I use it on rest days?",
        a: "Yes. Heavy sweaters and athletes in hot climates often benefit from a serving on long active-recovery days.",
      },
      {
        q: "Does it contain caffeine?",
        a: "No. ISO is intentionally caffeine-free so you can stack it with whatever pre-workout you already use.",
      },
    ],
    accent: false,
  },
  {
    slug: "clutch-flow",
    name: "Clutch Flow",
    stage: "Perform",
    tagline: "Clean energy and electrolytes — locked in for the work.",
    description:
      "Mid-training fuel that delivers steady carbohydrates and the electrolytes you're actively losing, without the crash or gut distress of legacy sports drinks.",
    headline: "Stay locked in from the first rep to the last.",
    forWho:
      "Athletes pushing sessions past 45 minutes, training in heat, or holding high heart rate for long stretches.",
    whenToUse:
      "Sip continuously during training. Most athletes use one serving per 60-90 minutes of effort.",
    benefits: [
      "Steady-state energy without sugar spikes",
      "Replaces sodium and potassium as you lose them",
      "Engineered for fast gastric clearance — minimal sloshing",
      "Tastes light enough to drink the whole session",
    ],
    ingredients: [
      { name: "Cluster dextrin (25 g)", role: "Low-osmolality carb for steady energy delivery" },
      { name: "Sodium (700 mg)", role: "Replaces in-session sweat losses" },
      { name: "Potassium (300 mg)", role: "Supports neuromuscular firing" },
      { name: "Magnesium (60 mg)", role: "Helps maintain output under load" },
      { name: "Coconut water powder", role: "Adds natural electrolytes and palatability" },
    ],
    faqs: [
      {
        q: "Will Clutch Flow upset my stomach?",
        a: "It uses cluster dextrin — a low-osmolality carb specifically chosen to clear the stomach quickly. Most athletes tolerate it well even at race intensity.",
      },
      {
        q: "How much sugar is in it?",
        a: "25 g of slow-release carbs per serving. It's fuel, not a soft drink — most of the carb load is consumed by the work you're doing.",
      },
      {
        q: "Can I mix it stronger for longer sessions?",
        a: "We recommend a single serving per bottle. For longer sessions, drink a second bottle rather than over-concentrating.",
      },
    ],
    accent: true,
  },
  {
    slug: "clutch-recovery",
    name: "Clutch Recovery",
    stage: "Recover",
    tagline: "Replenish, rebuild, return ready.",
    description:
      "Post-training formula built to restore fluid, replace electrolytes, and deliver the protein and carbs that drive recovery between sessions.",
    headline: "How fast you bounce back is how fast you improve.",
    forWho:
      "Athletes training 4+ days per week, two-a-day athletes, and anyone serious about session-to-session quality.",
    whenToUse:
      "Within 30 minutes of finishing your session. Mix with 16-20 oz of cold water and pair with a real meal within two hours.",
    benefits: [
      "Restores hydration and electrolyte balance fast",
      "25 g of complete protein for muscle repair",
      "3:1 carb-to-protein ratio for glycogen restoration",
      "Supports faster turnaround for next-day quality",
    ],
    ingredients: [
      { name: "Whey isolate (25 g)", role: "Fast-absorbing complete protein" },
      { name: "Sodium (500 mg)", role: "Rehydrates after sweat losses" },
      { name: "Carbs (40 g)", role: "Restocks muscle glycogen" },
      { name: "Tart cherry extract", role: "Supports recovery from high-intensity work" },
      { name: "Electrolyte blend", role: "Returns body to baseline hydration state" },
    ],
    faqs: [
      {
        q: "Can I use it on days I'm not training hard?",
        a: "On easy days a normal meal does the job. Recovery shines after sessions that drained you.",
      },
      {
        q: "Is it a meal replacement?",
        a: "No. Treat it as a bridge — it covers the first 30-minute window, then eat a real meal.",
      },
      {
        q: "Will it help with soreness?",
        a: "Faster glycogen and protein restoration generally improves how you feel the next day. It's not a painkiller — it's a head start.",
      },
    ],
    accent: false,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
