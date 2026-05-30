export const hero = {
  badge: "PERFORMANCE INSIGHTS",
  headline: "Performance Starts With Preparation.",
  sub: "Most athletes hydrate based on guesswork. Discover your personalized hydration profile and understand what your body needs to perform at its best.",
  cta: "Unlock My Clutch Score",
  supporting: "Built for everyday athletes. Takes less than 60 seconds.",
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
  eyebrow: "PERFORMANCE INSIGHTS",
  headline: "PREPARATION BEATS GUESSWORK.",
  sub: "Understand what your body needs before, during, and after training — so you show up confident and ready.",
  rows: [
    {
      title: "Personalized Profile",
      copy: "Your hydration readiness, built from how you actually train.",
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
      href: "/platform",
    },
  ],
  card: {
    title: "Your Hydration Profile",
    stats: [
      { value: "<60 sec", label: "to start" },
      { value: "Personal", label: "insights" },
      { value: "Ready", label: "for your next session" },
    ],
    copy: "Build a profile from your training habits — confidence, preparation, and performance insights in one place.",
    cta: "Unlock My Clutch Score",
  },
};

export const howItWorks = {
  headline: "Three steps to your edge.",
  steps: [
    {
      n: "01",
      title: "Answer Questions",
      copy: "Tell us about your body, training, and goals.",
      icon: "list",
      href: "/clutch-score",
    },
    {
      n: "02",
      title: "Unlock Your Clutch Score",
      copy: "Get your personalized hydration and performance profile.",
      icon: "score",
      href: "/clutch-score",
    },
    {
      n: "03",
      title: "Track Your Performance",
      copy: "Watch your trends improve every time you train.",
      icon: "trend",
      href: "/platform",
    },
  ],
};

export const dashboard = {
  headline: "Performance Starts With Preparation.",
  sub: "Track your hydration habits, monitor trends, and improve your Clutch Score over time.",
  welcome: "Welcome back, Jay.",
  score: 87,
  scoreLabel: "Clutch Score",
  scoreDelta: "+4 this week",
  sweatProfile: { title: "Sweat Profile", value: "Heavy Sweater", sub: "1.6 L / hr avg" },
  sessionIntensity: { label: "Session intensity", value: "78", sub: "estimated" },
  caloriesBurned: { label: "Calories burned", value: "420", sub: "last session · from watch" },
  fluidLoss: { label: "Est. fluid loss", value: "32 oz", sub: "personalized" },
  tiles: [
    { label: "Sessions", value: "14", sub: "last 30 days" },
    { label: "Consistency", value: "92%", sub: "hydration goals hit" },
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
  caloriesTrend: [
    { d: "Mon", v: 310 },
    { d: "Tue", v: 380 },
    { d: "Wed", v: 290 },
    { d: "Thu", v: 420 },
    { d: "Fri", v: 360 },
    { d: "Sat", v: 510 },
    { d: "Sun", v: 420 },
  ],
  intensityTrend: [
    { d: "Mon", v: 62 },
    { d: "Tue", v: 68 },
    { d: "Wed", v: 58 },
    { d: "Thu", v: 74 },
    { d: "Fri", v: 70 },
    { d: "Sat", v: 82 },
    { d: "Sun", v: 78 },
  ],
  sweatRateTrend: [
    { d: "Mon", v: 1.2 },
    { d: "Tue", v: 1.3 },
    { d: "Wed", v: 1.1 },
    { d: "Thu", v: 1.5 },
    { d: "Fri", v: 1.4 },
    { d: "Sat", v: 1.7 },
    { d: "Sun", v: 1.6 },
  ],
  consistencyTrend: [
    { d: "Mon", v: 78 },
    { d: "Tue", v: 82 },
    { d: "Wed", v: 80 },
    { d: "Thu", v: 88 },
    { d: "Fri", v: 85 },
    { d: "Sat", v: 92 },
    { d: "Sun", v: 92 },
  ],
  history: [
    {
      name: "Court Session",
      time: "Today · 6:20 PM",
      score: 87,
      type: "Basketball",
      calories: 420,
      intensity: 78,
      href: "/athletes/basketball",
    },
    {
      name: "Threshold Run",
      time: "Yesterday · 7:00 AM",
      score: 84,
      type: "Run",
      calories: 510,
      intensity: 82,
      href: "/athletes/running",
    },
    {
      name: "Hyrox Sim",
      time: "Wed · 5:30 PM",
      score: 81,
      type: "Hyrox",
      calories: 620,
      intensity: 85,
      href: "/athletes/hyrox",
    },
    {
      name: "Strength + Conditioning",
      time: "Tue · 6:00 AM",
      score: 79,
      type: "Gym",
      intensity: 68,
      href: "/athletes/gym",
    },
  ],
};

export const profiles = {
  headline: "Every athlete has a profile.",
  sub: "Discover your performance identity.",
  cards: [
    {
      name: "Balanced Sweater",
      copy: "Steady output, steady losses. Your edge is consistency.",
      icon: "balance",
      href: "/clutch-score",
    },
    {
      name: "High Output Athlete",
      copy: "You push the redline. Fuel matches the intensity.",
      icon: "flame",
      href: "/clutch-score",
    },
    {
      name: "Recovery Focused",
      copy: "You play the long game. Bounce back stronger every session.",
      icon: "heart",
      href: "/clutch-score",
    },
    {
      name: "Heavy Sweater",
      copy: "You leave it on the floor. Replace what you lose, precisely.",
      icon: "droplet",
      href: "/clutch-score",
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
  sub: "Track your score, your consistency, and your progress over time.",
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

export const testimonials = {
  headline: "Trusted by athletes and coaches.",
  items: [
    {
      name: "Coach Marcus W.",
      role: "Strength & Conditioning Coach",
      quote:
        "The sweat profile gave me a real number to coach to. My athletes feel the difference in the fourth quarter.",
      href: "/insights/hydration-for-basketball-performance",
    },
    {
      name: "Imani R.",
      role: "Hyrox Athlete",
      quote: "I used to bonk in the back half. Dialing in my hydration changed how I close races.",
      href: "/insights/hydration-strategy-for-hyrox-athletes",
    },
    {
      name: "Eastside Performance",
      role: "Training Facility",
      quote: "Our members finally have a simple read on hydration. Less guesswork, more progress.",
      href: "/platform",
    },
  ],
};

export const finalCta = {
  headline: "Performance Starts With Preparation.",
  sub: "Unlock your Clutch Score and train with an edge.",
  cta: "Unlock My Clutch Score",
};
