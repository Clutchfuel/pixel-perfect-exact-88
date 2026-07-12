import { extraArticles } from "./insights-extra";
import { batch2Articles } from "./insights-batch2";
import { pillarArticles } from "./insights-pillars";

export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: "Hydration Basics" | "Performance Science" | "Sport-Specific" | "Strategy";
  readMinutes: number;
  publishedAt: string; // ISO
  author: string;
  body: ArticleSection[];
  relatedSlugs?: string[];
}

export const baseArticles: Article[] = [
  {
    slug: "hydration-101-for-everyday-athletes",
    title: "Hydration 101 for Everyday Athletes",
    excerpt:
      "Why most athletes are quietly under-hydrated, what hydration actually does for performance, and how to fix it in one week.",
    category: "Hydration Basics",
    readMinutes: 6,
    publishedAt: "2025-08-12",
    author: "ClutchFuel Performance Team",
    body: [
      {
        paragraphs: [
          "If you train more than three times a week, hydration is probably the single biggest variable you're under-managing. It outranks supplements, gear, and most program details — and almost no one talks about it past 'drink more water.'",
          "Here's what's actually going on, why it matters, and a one-week protocol to fix it without overhauling your life.",
        ],
      },
      {
        heading: "What hydration actually does",
        paragraphs: [
          "Hydration isn't just about thirst. Water is the medium your body moves nutrients, oxygen, and heat through. When you lose fluid through sweat, three performance-critical things happen in order:",
        ],
        bullets: [
          "Plasma volume drops, so your heart has to beat harder to move the same oxygen.",
          "Sodium losses begin to outpace what's left in your blood, which is how cramps start.",
          "Core temperature climbs because you can't dissipate heat as effectively, and your output drops.",
        ],
      },
      {
        heading: "The 2% rule",
        paragraphs: [
          "Research consistently shows that losing 2% of your body weight in fluid is enough to measurably reduce performance. For a 170-pound athlete that's roughly 1.5 liters — easy to hit in a 90-minute training session in summer.",
          "Most athletes don't track this, so they never see it. They just feel 'flat' and blame sleep or motivation.",
        ],
      },
      {
        heading: "A one-week fix",
        paragraphs: ["Try this for seven days and notice how you feel in your sessions:"],
        bullets: [
          "Drink 16-20 oz of water with electrolytes the moment you wake up.",
          "Front-load before training — 16 oz with electrolytes 60 minutes out.",
          "Sip during every session past 45 minutes, not just the long ones.",
          "Within 30 minutes of finishing, replace fluid + sodium + carbs.",
        ],
      },
      {
        heading: "Make it personal",
        paragraphs: [
          "Generic rules get you 80% of the way. The other 20% comes from knowing your priority — which gap to close first. That’s what the Clutch Score is built to surface: your Biggest Opportunity and a First Clutch Move.",
        ],
      },
    ],
    relatedSlugs: [
      "how-much-water-should-athletes-drink",
      "how-to-calculate-your-sweat-rate",
      "electrolytes-explained-sodium-potassium-magnesium",
    ],
  },
  {
    slug: "how-to-calculate-your-sweat-rate",
    title: "How to Calculate Your Sweat Rate (And Why It Matters)",
    excerpt:
      "A simple at-home test that tells you exactly how much fluid you're losing per hour — and what to do with the number.",
    category: "Performance Science",
    readMinutes: 5,
    publishedAt: "2025-08-26",
    author: "ClutchFuel Performance Team",
    body: [
      {
        paragraphs: [
          "Sweat rate is the missing number behind every hydration recommendation you've ever ignored. Once you know yours, generic advice gets replaced by a personal target — and your training feels different inside a week.",
        ],
      },
      {
        heading: "The simple test",
        paragraphs: [
          "You need a scale, a stopwatch, and a single training session. Here's the protocol:",
        ],
        bullets: [
          "Weigh yourself naked and dry, right before training.",
          "Train normally for 60 minutes. Note exactly how much fluid you drink during the session.",
          "Towel off completely and weigh yourself naked again.",
          "Sweat rate (L/hr) = (start weight − end weight in kg) + fluid intake in liters.",
        ],
      },
      {
        heading: "What the number means",
        paragraphs: [
          "Most athletes land between 0.8 L/hr and 2.0 L/hr. Heavy sweaters in hot conditions can climb above 2.5 L/hr. Whatever your number is, that's the target your in-session intake needs to get close to.",
          "You don't need to replace it exactly — replacing 60-80% in real time is usually enough. The rest gets restored after the session.",
        ],
      },
      {
        heading: "Sodium matters as much as fluid",
        paragraphs: [
          "Sweat rate tells you fluid. It doesn't tell you sodium losses, which vary dramatically between athletes. If you finish workouts with white salt rings on your gear or you cramp regularly, you're likely a salty sweater and need a higher sodium concentration.",
        ],
      },
      {
        heading: "The faster way",
        paragraphs: [
          "Want a faster starting point before the scale test? Take the Clutch Score — a 5-question diagnostic that surfaces your Biggest Opportunity and a First Clutch Move™. Pair it with a sweat-rate test later when you want precise fluid targets.",
        ],
      },
    ],
    relatedSlugs: [
      "hydration-101-for-everyday-athletes",
      "electrolytes-explained-sodium-potassium-magnesium",
    ],
  },
  {
    slug: "electrolytes-explained-sodium-potassium-magnesium",
    title: "Electrolytes Explained: Sodium, Potassium, Magnesium",
    excerpt:
      "What each electrolyte actually does in your body, why sodium leads, and how to know if you're getting enough.",
    category: "Hydration Basics",
    readMinutes: 7,
    publishedAt: "2025-09-09",
    author: "ClutchFuel Performance Team",
    body: [
      {
        paragraphs: [
          "Most athletes know electrolytes matter and have no idea what each one actually does. That gap is why so many over-supplement magnesium and under-replace sodium — and wonder why they're still cramping.",
        ],
      },
      {
        heading: "Sodium: the one that leads",
        paragraphs: [
          "Sodium is the primary electrolyte you lose through sweat. It's responsible for maintaining plasma volume (the watery part of your blood) and triggering muscle contraction. When sodium drops too low relative to fluid intake, you risk hyponatremia — which is more common in long-event endurance athletes than dehydration itself.",
          "A practical target for active athletes is 500-1,500 mg sodium per hour of intense training, scaled to sweat rate and sodium concentration.",
        ],
      },
      {
        heading: "Potassium: the partner",
        paragraphs: [
          "Potassium works with sodium to manage fluid balance and supports muscle contraction. You lose less of it through sweat, but losses still matter in long sessions. Most diets get enough from food — the gap shows up during and right after big training blocks.",
        ],
      },
      {
        heading: "Magnesium: the recovery story",
        paragraphs: [
          "Magnesium is involved in over 300 enzymatic reactions, including muscle relaxation and sleep quality. You don't lose much through sweat, but training depletes intramuscular stores. Steady daily intake supports recovery more than mid-session dosing.",
        ],
      },
      {
        heading: "What this means for your hydration plan",
        paragraphs: [
          "If you cramp regularly, you're almost always under-sodium-ing — not under-magnesium-ing. Add sodium first, then look at the rest. The right electrolyte product matches the ratios your sweat is actually losing.",
        ],
      },
    ],
    relatedSlugs: [
      "how-to-calculate-your-sweat-rate",
      "hydration-101-for-everyday-athletes",
      "best-electrolytes-for-athletes",
    ],
  },
  {
    slug: "hydration-for-basketball-performance",
    title: "Hydration for Basketball Performance",
    excerpt:
      "Why guards and wings fade in the fourth quarter — and the pre-game, in-game, post-game routine that fixes it.",
    category: "Sport-Specific",
    readMinutes: 6,
    publishedAt: "2025-09-23",
    author: "ClutchFuel Performance Team",
    body: [
      {
        paragraphs: [
          "Basketball is one of the worst hydration environments in mainstream sport: indoor heat, stage lighting, repeat-sprint demand, and a clock that doesn't care how you feel. Most players are noticeably dehydrated by the second quarter and don't know it.",
        ],
      },
      {
        heading: "Why basketball is brutal on hydration",
        paragraphs: [
          "Indoor games run hot. Add lighting, a packed crowd, and a uniform that doesn't breathe like training kit, and sweat rates above 1.5 L/hr are routine for guards and wings.",
          "Repeat-sprint efforts also blunt thirst — your brain prioritizes performance over signals, so by the time you feel thirsty, you're already 1-2% down on body weight.",
        ],
      },
      {
        heading: "Pre-game (2 hours out)",
        paragraphs: ["Front-load to give your body something to draw from:"],
        bullets: [
          "16-20 oz of fluid with electrolytes 90 minutes before tipoff.",
          "Avoid caffeine spikes that increase early urinary loss.",
          "Skip plain water alone — without sodium, you'll urinate most of it out.",
        ],
      },
      {
        heading: "In-game",
        paragraphs: [
          "You don't have time for big drinks. Build a habit of small, frequent sips at every dead ball, timeout, and quarter break. Aim for 4-6 oz of an electrolyte-carb drink every break — small enough to absorb, frequent enough to stay ahead.",
        ],
      },
      {
        heading: "Post-game",
        paragraphs: [
          "If you have a back-to-back or a tournament weekend, recovery isn't optional. Inside 30 minutes: fluid + sodium + protein + carbs. Skip this and tomorrow's game starts at 80%.",
        ],
      },
      {
        heading: "Tournament weekends",
        paragraphs: [
          "Multi-game days demand a real plan. Recovery hydration between games matters more than what you drank during. Treat the 90-minute gap as work — not a rest.",
        ],
      },
    ],
    relatedSlugs: [
      "hydration-101-for-everyday-athletes",
      "pre-during-post-workout-hydration-guide",
      "signs-of-dehydration-during-exercise",
    ],
  },
  {
    slug: "hydration-strategy-for-hyrox-athletes",
    title: "Hydration Strategy for Hyrox Athletes",
    excerpt:
      "Eight runs, eight stations, one number that decides whether your legs are there at the sled push: sodium.",
    category: "Sport-Specific",
    readMinutes: 6,
    publishedAt: "2025-10-07",
    author: "ClutchFuel Performance Team",
    body: [
      {
        paragraphs: [
          "Hyrox sits in a unique hydration zone. The work is long enough to matter (60-90 minutes for most age-groupers), intense enough to drive real sweat losses, and mixed-modal in a way that punishes any weakness in your fueling plan.",
        ],
      },
      {
        heading: "The race-week build",
        paragraphs: [
          "Hydration on race day starts on Monday. Don't wait until the morning of to load fluid — sodium needs days of consistent intake to fully top off plasma volume.",
        ],
        bullets: [
          "All week: add electrolytes to your morning water and to every training session.",
          "48 hours out: prioritize sodium with meals (salt your food, eat broth-based sides).",
          "Race morning: 16-20 oz with electrolytes 2 hours before your wave.",
        ],
      },
      {
        heading: "On the course",
        paragraphs: [
          "If your event allows you to drink between zones, take the opportunity. Small sips of an electrolyte-carb mix between stations keep blood glucose steady and replace the sodium you're actively losing.",
          "If your event is dry until the end, prioritize the warm-up window — get as much in as you can tolerate in the final 20 minutes before the cannon.",
        ],
      },
      {
        heading: "The sled push moment",
        paragraphs: [
          "The sled push and burpee broad jumps are where dehydrated athletes fall apart. If your legs feel oddly heavy and slow, it's usually not strength — it's sodium and fluid. The athletes who finish strong almost always have a better hydration plan than the athletes who fade.",
        ],
      },
      {
        heading: "Recovery starts at the finish line",
        paragraphs: [
          "Get fluid, sodium, protein, and carbs in within 30 minutes. Your next training block, and your next race, are built right here.",
        ],
      },
    ],
    relatedSlugs: [
      "hydration-101-for-everyday-athletes",
      "electrolytes-explained-sodium-potassium-magnesium",
    ],
  },
  {
    slug: "pre-during-post-workout-hydration-guide",
    title: "Pre, During, Post: The Complete Workout Hydration Guide",
    excerpt:
      "The three windows that decide whether your hydration helps you train — or just keeps you hydrated.",
    category: "Strategy",
    readMinutes: 7,
    publishedAt: "2025-10-21",
    author: "ClutchFuel Performance Team",
    body: [
      {
        paragraphs: [
          "Most athletes drink water whenever they remember and call it a hydration plan. A real plan has three windows, each with a different goal: prepare, perform, recover. Get all three right and you'll feel the difference in a week.",
        ],
      },
      {
        heading: "Window 1: Prepare (90 minutes before)",
        paragraphs: [
          "The goal here is plasma volume. You want to walk into your session topped up so your body has something to draw from.",
        ],
        bullets: [
          "16-20 oz of fluid with electrolytes 60-90 minutes out.",
          "Sodium is the lead actor — water alone gets urinated out.",
          "Avoid huge carb loads close to training. Light, paired with fluid, is the move.",
        ],
      },
      {
        heading: "Window 2: Perform (during the session)",
        paragraphs: [
          "The goal shifts from preparation to maintenance. You're trying to replace 60-80% of what you're losing in real time — full replacement is usually too much for the gut to handle at intensity.",
        ],
        bullets: [
          "Small, frequent sips beat large, infrequent gulps.",
          "Match electrolyte concentration to sweat sodium — heavy sweaters need more.",
          "Past 60 minutes, add a low-osmolality carb source to maintain blood glucose.",
        ],
      },
      {
        heading: "Window 3: Recover (first 30 minutes)",
        paragraphs: [
          "Recovery hydration is where most athletes leave performance on the table. The 30-minute window after training is when your body is most receptive to fluid, sodium, protein, and carbs — and when restoring all four together speeds your turnaround for tomorrow.",
        ],
        bullets: [
          "Aim to replace 1.5x the fluid you lost (weigh yourself if you can).",
          "Pair fluid with sodium so you actually retain it.",
          "Add 20-25 g of complete protein and a carb source.",
        ],
      },
      {
        heading: "Making it stick",
        paragraphs: [
          "A protocol you forget is worse than a simpler one you actually do. Build habit cues: same bottle every morning, same routine before sessions, same recovery drink after. Consistency beats optimization.",
        ],
      },
    ],
    relatedSlugs: [
      "hydration-101-for-everyday-athletes",
      "how-to-calculate-your-sweat-rate",
      "morning-hydration-routine-for-athletes",
    ],
  },
];

export const articles: Article[] = [
  ...pillarArticles,
  ...baseArticles,
  ...extraArticles,
  ...batch2Articles,
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
