export const hero = {
  badge: "Performance Insights",
  headline: "Hydration built for the big moment.",
  sub: "For the athletes who perform under pressure.",
  cta: "Unlock My Clutch Score",
  supporting:
    "Takes about 2 minutes · Built for everyday athletes · Score, opportunity, and First Clutch Move",
};

export const systemSection = {
  headline: "A SMARTER HYDRATION SYSTEM FOR ATHLETES.",
  sub: "Built to support performance at every stage. Hydration designed for how athletes actually train and compete.",
  stages: ["Prepare", "Perform", "Recover"] as const,
  products: [
    {
      name: "Clutch ISO",
      stage: "Prepare",
      copy: "Complete hydration system to prime your body before you start.",
      accent: false,
      href: "/products/clutch-iso",
    },
    {
      name: "Clutch Flow",
      stage: "Perform",
      copy: "Clean, effective energy and electrolytes to keep you locked in.",
      accent: true,
      href: "/products/clutch-flow",
    },
    {
      name: "Clutch Recovery",
      stage: "Recover",
      copy: "Replenish and rebuild so you bounce back stronger.",
      accent: false,
      href: "/products/clutch-recovery",
    },
  ],
  features: [
    {
      title: "Electrolyte-Focused",
      copy: "Electrolytes and essential minerals to support hydration before it starts.",
      icon: "droplet",
      href: "/insights/electrolytes-explained-sodium-potassium-magnesium",
    },
    {
      title: "Clean Energy",
      copy: "Light, effective energy to help you perform without the crash.",
      icon: "bolt",
      href: "/products/clutch-flow",
    },
    {
      title: "3-Stage System",
      copy: "Hydration that works in sync with your training and goals.",
      icon: "layers",
      href: "/system",
    },
  ],
};

export const sweatSection = {
  eyebrow: "KNOW YOUR SWEAT RATE",
  headline: "HYDRATION ISN'T ONE-SIZE-FITS-ALL.",
  sub: "Your sweat rate determines how much fluid and electrolytes you actually need to perform at your best.",
  rows: [
    {
      title: "Personalized Results",
      copy: "Get your Biggest Opportunity and a First Clutch Move based on how you actually train.",
      icon: "user",
      href: "/clutch-score",
    },
    {
      title: "Performance Focused",
      copy: "Built around how you train to fuel better workouts and faster recovery.",
      icon: "activity",
      href: "/products/clutch-flow",
    },
    {
      title: "Data You Can Use",
      copy: "Simple insights to help you train, compete, and win.",
      icon: "chart",
      href: "/insights",
    },
  ],
  card: {
    title: "Get your Clutch Score",
    stats: [
      { value: "2 min", label: "to complete" },
      { value: "5", label: "questions" },
      { value: "Results", label: "instantly" },
    ],
    copy: "Answer a few quick questions to unlock your score, biggest opportunity, and First Clutch Move™.",
    cta: "Unlock My Clutch Score",
  },
};

export const howItWorks = {
  headline: "Three steps to your edge.",
  steps: [
    {
      n: "01",
      title: "Answer Questions",
      copy: "Tell us how you feel, recover, and train.",
      icon: "list",
      href: "/clutch-score",
    },
    {
      n: "02",
      title: "Unlock Your Clutch Score",
      copy: "Get your score, biggest opportunity, and First Clutch Move™.",
      icon: "score",
      href: "/clutch-score",
    },
    {
      n: "03",
      title: "Take Your First Move",
      copy: "Apply one concrete action before your next hard session.",
      icon: "trend",
      href: "/clutch-score",
    },
  ],
};

export const dashboard = {
  headline: "This is a real athlete performance platform.",
  sub: "Your Clutch Score, biggest opportunity, and the moves that compound — in one place.",
  score: 87,
  scoreLabel: "Clutch Score",
  scoreDelta: "+4 this week",
  sweatProfile: {
    title: "Biggest Opportunity",
    value: "Pre-Workout Hydration",
    sub: "Front-load before your next session",
  },
  tiles: [
    { label: "Sessions", value: "14", sub: "last 30 days" },
    { label: "Consistency", value: "92%", sub: "goals hit" },
  ],
  trend: [
    { d: "Mon", v: 72 },
    { d: "Tue", v: 78 },
    { d: "Wed", v: 75 },
    { d: "Thu", v: 82 },
    { d: "Fri", v: 80 },
    { d: "Sat", v: 86 },
    { d: "Sun", v: 87 },
  ],
  history: [
    {
      name: "Court Session",
      time: "Today · 6:20 PM",
      score: 87,
      type: "Basketball",
      href: "/athletes/basketball",
    },
    {
      name: "Threshold Run",
      time: "Yesterday · 7:00 AM",
      score: 84,
      type: "Run",
      href: "/athletes/running",
    },
    {
      name: "Hyrox Sim",
      time: "Wed · 5:30 PM",
      score: 81,
      type: "Hyrox",
      href: "/athletes/hyrox",
    },
    {
      name: "Strength + Conditioning",
      time: "Tue · 6:00 AM",
      score: 79,
      type: "Gym",
      href: "/athletes/gym",
    },
  ],
};

export const profiles = {
  eyebrow: "Everyday athletes",
  headline: "Built for how you actually train.",
  sub: "League night, race day, gym floors, and everything in between — same Clutch Score, same edge.",
  mission: "Performance Starts With Preparation — for athletes who train under real-life pressure.",
  cards: [
    {
      name: "Gym & Strength",
      copy: "Heavy sessions, short rest, crowded boxes. Hydration still decides your last sets.",
      icon: "flame",
      href: "/athletes/gym",
    },
    {
      name: "Court & League",
      copy: "Pickup, rec leagues, tournament weekends. Stay locked in through the fourth quarter.",
      icon: "balance",
      href: "/athletes/basketball",
    },
    {
      name: "Road & Race",
      copy: "5Ks, long runs, Hyrox, endurance days. Hold output when the back half gets hard.",
      icon: "droplet",
      href: "/athletes/running",
    },
    {
      name: "Weekend Warriors",
      copy: "Inconsistent weeks, real jobs, real life. Consistency beats intensity — start here.",
      icon: "heart",
      href: "/athletes",
    },
  ],
};

export const featuredInsightSlugs = [
  "how-much-water-should-athletes-drink",
  "how-to-calculate-your-sweat-rate",
  "hydration-myths-debunked",
  "sweat-sodium-testing-guide",
  "triathlon-hydration-guide",
  "strength-training-hydration-guide",
] as const;

export const longGame = {
  headline: "Built for the long game.",
  sub: "Score. Opportunity. Consistency. Progress compounds when you keep showing up prepared.",
  trend: Array.from({ length: 12 }, (_, i) => ({
    w: `W${i + 1}`,
    v: 62 + Math.round(Math.sin(i / 2) * 6 + i * 2),
  })),
  streak: 38,
  sessions: [
    { d: "M", on: true },
    { d: "T", on: true },
    { d: "W", on: true },
    { d: "T", on: false },
    { d: "F", on: true },
    { d: "S", on: true },
    { d: "S", on: true },
  ],
  recentSessions: [
    { label: "Court Session", score: 87, href: "/athletes/basketball" },
    { label: "Threshold Run", score: 84, href: "/athletes/running" },
    { label: "Hyrox Sim", score: 81, href: "/athletes/hyrox" },
  ],
};

export const finalCta = {
  headline: "Performance Starts With Preparation.",
  sub: "Unlock your Clutch Score — your opportunity and First Clutch Move in under two minutes.",
  cta: "Unlock My Clutch Score",
};
