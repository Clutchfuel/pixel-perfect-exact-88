export type ArticleCategory =
  | "Hydration"
  | "Recovery"
  | "Fueling"
  | "Performance"
  | "Training"
  | "Mindset";

export type Article = {
  slug: string;
  title: string;
  category: ArticleCategory;
  excerpt: string;
  readingTime: string;
  featured?: boolean;
  gradient: string;
  body: string[];
};

export const ARTICLES: Article[] = [
  {
    slug: "why-you-always-cramp",
    title: "Why you always cramp — and what your body is really telling you",
    category: "Hydration",
    excerpt:
      "Cramping isn't a mystery. It's usually a signal about how you're fueling before you even start.",
    readingTime: "4 min read",
    featured: true,
    gradient: "from-electric/40 via-navy-soft to-navy",
    body: [
      "Most athletes treat cramping as a random surprise. It rarely is. Cramps typically follow a pattern that starts hours before your workout, not minutes.",
      "The most common driver isn't dehydration — it's an imbalance between sodium loss and sodium intake during long or intense sessions. When your body sweats out more sodium than it takes in, muscle firing gets noisy.",
      "The fix is boring and effective: start hydrated, add electrolytes to what you drink during longer efforts, and rehydrate deliberately within the first 60 minutes after training.",
    ],
  },
  {
    slug: "hydration-myths",
    title: "The three hydration myths still holding athletes back",
    category: "Hydration",
    excerpt:
      "Drink eight glasses. Clear pee is healthy. Water is enough. Here's what the research actually says.",
    readingTime: "5 min read",
    featured: true,
    gradient: "from-electric-dark/40 via-navy-soft to-navy",
    body: [
      "Hydration advice from the 90s still dominates locker rooms. Some of it is harmless. Some of it costs you performance.",
      "Myth one: eight glasses a day works for everyone. Your baseline depends on body size, climate, training load, and sodium intake — not a round number.",
      "Myth two: clear urine means well-hydrated. Pale straw is the target. Truly clear can mean you've over-diluted your electrolytes.",
      "Myth three: water alone rehydrates you after a hard session. Water without sodium runs through you. Pair fluids with electrolytes and food.",
    ],
  },
  {
    slug: "science-of-recovery",
    title: "The science of recovery: what your first 60 minutes really matter for",
    category: "Recovery",
    excerpt:
      "The hour after training decides more than the workout itself. Here's how to use it.",
    readingTime: "6 min read",
    gradient: "from-electric/30 via-navy-soft to-navy-deep",
    body: [
      "Recovery isn't rest. It's an active window your body uses to adapt to the stimulus you just gave it.",
      "The first 60 minutes prioritize glycogen replenishment, protein synthesis, and fluid rebalance. Skipping any of the three delays the adaptation you trained for.",
      "A simple stack: fluids with electrolytes, a real meal with carbs and protein, and 10 quiet minutes before diving back into your day.",
    ],
  },
  {
    slug: "how-much-water",
    title: "How much water do you actually need?",
    category: "Hydration",
    excerpt: "The honest answer isn't a number — it's a system. Here's how to build yours.",
    readingTime: "4 min read",
    gradient: "from-electric-dark/30 via-navy-soft to-navy",
    body: [
      "Fixed water targets ignore the variables that actually matter: your sweat rate, sodium loss, training intensity, and environment.",
      "Instead of a number, build a system: start every day with a full glass, drink to thirst between meals, and add electrolytes to any effort over 60 minutes.",
    ],
  },
  {
    slug: "performance-habits",
    title: "Six performance habits that quietly beat any supplement",
    category: "Performance",
    excerpt: "The unglamorous stack — sleep, sodium, timing, consistency — that outperforms every shortcut.",
    readingTime: "5 min read",
    gradient: "from-electric/25 via-navy-soft to-navy",
    body: [
      "Supplements are the last five percent. Habits are the first ninety-five.",
      "Sleep first. Sodium second. Consistent training third. Pre-hydration fourth. Post-workout refueling fifth. Recovery days sixth. That's the order that changes results.",
    ],
  },
  {
    slug: "electrolytes-explained",
    title: "Electrolytes explained without the marketing",
    category: "Fueling",
    excerpt:
      "Sodium, potassium, magnesium — what they actually do, and how to know if you're getting enough.",
    readingTime: "5 min read",
    gradient: "from-electric/20 via-navy-soft to-navy-deep",
    body: [
      "Every electrolyte brand claims to fix your performance. Understanding what these minerals actually do makes it easier to see through the noise.",
      "Sodium keeps your fluid balance and nerve signals steady. Potassium supports muscle contraction. Magnesium helps with recovery and sleep. The ratios matter as much as the amounts.",
    ],
  },
  {
    slug: "what-your-sweat-says",
    title: "What your sweat is telling you about your training",
    category: "Performance",
    excerpt: "Sweat is a signal, not a symptom. Reading it changes how you fuel.",
    readingTime: "3 min read",
    gradient: "from-electric-dark/25 via-navy-soft to-navy",
    body: [
      "Salty streaks on your shirt aren't just about hard work — they're feedback. Heavy sodium loss suggests you need to front-load electrolytes rather than chase them.",
      "The volume, timing, and saltiness of your sweat point to different fuel gaps. Once you know the pattern, adjustments get simple.",
    ],
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}

export function relatedArticles(slug: string, count = 3) {
  return ARTICLES.filter((a) => a.slug !== slug).slice(0, count);
}
