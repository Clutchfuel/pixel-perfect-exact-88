import type { ProductSlug } from "./products";

export type SportSlug = "basketball" | "running" | "hyrox" | "gym";

export interface Sport {
  slug: SportSlug;
  name: string;
  eyebrow: string;
  headline: string;
  sub: string;
  challenges: { title: string; copy: string }[];
  strategy: string[];
  recommendedProducts: ProductSlug[];
  testimonial: { quote: string; name: string; role: string };
  relatedArticleSlug?: string;
}

export const sports: Sport[] = [
  {
    slug: "basketball",
    name: "Basketball",
    eyebrow: "FOR BASKETBALL ATHLETES",
    headline: "Hydration built for the fourth quarter.",
    sub: "High-intensity bursts, indoor heat, and back-to-back games drain hydration faster than most players realize. Show up ready — and stay sharp when it matters.",
    challenges: [
      {
        title: "Indoor heat and humidity",
        copy: "Gyms run hot. Add stage lights and a packed crowd and sweat rates climb above 1.5 L/hr for many guards and wings.",
      },
      {
        title: "Repeat-sprint demand",
        copy: "Basketball isn't steady-state — it's repeated maximal efforts. That intensity blunts thirst signals and accelerates losses.",
      },
      {
        title: "Tournament and back-to-back schedules",
        copy: "Two games in a day or four in a weekend means recovery hydration matters as much as in-game.",
      },
    ],
    strategy: [
      "Front-load with Clutch ISO 60-90 minutes before tipoff to build an electrolyte reserve.",
      "Sip Clutch Flow at every dead-ball and timeout — small, frequent sips beat one big bottle.",
      "Within 30 minutes of the final buzzer, hit Clutch Recovery so tomorrow's session has somewhere to start from.",
    ],
    recommendedProducts: ["clutch-iso", "clutch-flow", "clutch-recovery"],
    testimonial: {
      quote:
        "I used to fade by the third quarter. Locking in my hydration changed how I close games — my legs are there in the fourth.",
      name: "DeShawn M.",
      role: "Collegiate Guard",
    },
    relatedArticleSlug: "hydration-for-basketball-performance",
  },
  {
    slug: "running",
    name: "Running",
    eyebrow: "FOR RUNNERS",
    headline: "Train harder. Recover faster. Race smarter.",
    sub: "From threshold workouts to long runs to race day — the right hydration strategy is what turns training into actual progress.",
    challenges: [
      {
        title: "Long sessions, hidden losses",
        copy: "On a 90-minute run you can lose 1-2 L of fluid. Even a 2% body-weight loss starts to drag pace.",
      },
      {
        title: "Race-day pressure",
        copy: "Most runners under-hydrate before races and pay for it in the back half. Race performance is built the day before.",
      },
      {
        title: "Heat training",
        copy: "Summer base-building demands a different hydration plan than fall race prep — most runners use the same plan year-round.",
      },
    ],
    strategy: [
      "Use Clutch ISO the night before and morning of long runs and races.",
      "On runs over 60 minutes, Clutch Flow keeps blood glucose steady and replaces the sodium you're losing.",
      "After every quality session, Clutch Recovery shrinks the gap between today's effort and tomorrow's workout.",
    ],
    recommendedProducts: ["clutch-iso", "clutch-flow", "clutch-recovery"],
    testimonial: {
      quote:
        "My splits used to fall off at mile 16. Now I'm negative-splitting marathons. The hydration plan is half the reason.",
      name: "Imani R.",
      role: "Marathon Runner",
    },
    relatedArticleSlug: "pre-during-post-workout-hydration-guide",
  },
  {
    slug: "hyrox",
    name: "Hyrox",
    eyebrow: "FOR HYROX ATHLETES",
    headline: "Built for the work between the runs.",
    sub: "Eight 1K runs and eight workout stations test every system you have. Hydration is the one variable most Hyrox athletes still get wrong.",
    challenges: [
      {
        title: "Sustained mixed-modal output",
        copy: "Hyrox sits in that brutal zone above easy and below all-out — sweat rates climb and stay climbed for 60-90 minutes.",
      },
      {
        title: "Stations after stations",
        copy: "Sled push, burpee broad jumps, wall balls. Output stays high; thirst stays low. Cramps are almost always a sodium problem.",
      },
      {
        title: "Race-week taper",
        copy: "Most athletes taper training but not hydration — showing up under-saturated leaves real seconds on the table.",
      },
    ],
    strategy: [
      "Build your sodium reserve all race week with Clutch ISO — not just the morning of.",
      "If your event allows it, Clutch Flow between zones keeps glucose and electrolytes steady.",
      "Recovery is where your next race starts. Clutch Recovery the moment you cross the line.",
    ],
    recommendedProducts: ["clutch-iso", "clutch-flow", "clutch-recovery"],
    testimonial: {
      quote:
        "The sled push used to wreck me. Once I dialed in sodium, my legs stopped quitting. Three minutes off my PR.",
      name: "Marcus W.",
      role: "Hyrox Doubles Athlete",
    },
    relatedArticleSlug: "hydration-strategy-for-hyrox-athletes",
  },
  {
    slug: "gym",
    name: "Gym Athletes",
    eyebrow: "FOR LIFTERS & GENERAL GYM",
    headline: "Better sessions. Better recovery. Better results.",
    sub: "You don't need to be a pro to hydrate like one. The right system shows up in PRs, mood, and how often you actually want to train.",
    challenges: [
      {
        title: "Underestimated sweat losses",
        copy: "Heavy strength work and conditioning circuits drive real fluid losses. Lifters routinely train chronically under-hydrated.",
      },
      {
        title: "Performance plateaus",
        copy: "When sleep and nutrition are dialed and you're still stuck, hydration is often the missing third variable.",
      },
      {
        title: "Recovery between sessions",
        copy: "Training 4+ days a week means recovery decides whether you progress or just maintain.",
      },
    ],
    strategy: [
      "Start every session topped up. Clutch ISO before lifting, especially morning sessions.",
      "Sip Clutch Flow through long conditioning blocks or two-a-day sessions.",
      "Clutch Recovery post-session for anyone training 4+ days per week.",
    ],
    recommendedProducts: ["clutch-iso", "clutch-recovery"],
    testimonial: {
      quote:
        "Sounds basic, but I just feel different. Better workouts, way less of that wiped-out feeling at 3 PM.",
      name: "Jenna T.",
      role: "Functional Fitness Athlete",
    },
  },
];

export function getSport(slug: string): Sport | undefined {
  return sports.find((s) => s.slug === slug);
}
