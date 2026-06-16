import { imageSets } from "@/assets/image-sets";

export const brand = {
  hero: {
    tag: "BASKETBALL · HYROX · RUNNING · FOOTBALL · COMBAT · CROSSFIT",
    headline: "Stay Clutch.",
    tagline: "Hydration built for athletes who refuse to fade when it matters most.",
    supporting: [
      "Take the Clutch Assessment™ and discover your Clutch Score™.",
      "Trusted by athletes, coaches, competitors, and everyday grinders.",
    ],
    primaryCta: "Find My Clutch Score",
    secondaryCta: "How It Works",
  },
  preparation: {
    id: "why-hydration",
    headline: "Most Athletes Train Hard. Few Hydrate With Intention.",
    cards: [
      {
        title: "Train Harder",
        copy: "Strength, speed, skill, conditioning — you put in the work. Don't guess on hydration.",
        icon: "target" as const,
      },
      {
        title: "Recover Smarter",
        copy: "Replace what your body actually loses. Sodium, potassium, magnesium, fluids.",
        icon: "droplet" as const,
      },
      {
        title: "Stay Clutch",
        copy: "The difference between feeling great and fading late is often hydration.",
        icon: "calendar" as const,
      },
    ],
  },
  everydayAthletes: {
    id: "everyday-athletes",
    headline: "Built For Everyday Athletes.",
    sub: "Not pros. Not influencers. People balancing work, family, training, and competition — who still show up when it matters.",
    sports: [
      {
        name: "Basketball",
        quote: "Fourth quarter is won in the first.",
        insight: "Court sessions demand rhythm — hydration is part of the warmup.",
        image: imageSets.sportBasketball,
        href: "/athletes/basketball",
      },
      {
        name: "Running",
        quote: "I show up ready, not guessing.",
        insight: "Miles add up. So does fluid loss before sunrise.",
        image: imageSets.sportRunning,
        href: "/athletes/running",
      },
      {
        name: "Hyrox",
        quote: "Every station is earned in advance.",
        insight: "Hybrid racing punishes athletes who skip preparation.",
        image: imageSets.sportHyrox,
        href: "/athletes/hyrox",
      },
      {
        name: "Strength & Combat",
        quote: "Recovery starts with what I drink.",
        insight: "Heavy sessions need intentional hydration between sets.",
        image: imageSets.sportGym,
        href: "/athletes/gym",
      },
    ],
  },
  featuredAthletes: {
    id: "featured-athletes",
    headline: "Athletes Who Stay Clutch.",
    sub: "Journeys, not highlight reels.",
    stories: [
      {
        name: "Maya T.",
        role: "College basketball",
        story:
          "I stopped guessing on game days. My prep routine is the same whether it's practice or playoffs.",
        image: imageSets.sportBasketball,
      },
      {
        name: "Jordan K.",
        role: "High school track",
        story:
          "Hydration used to be an afterthought. Now it's how I show up for myself before the gun goes off.",
        image: imageSets.sportRunning,
      },
      {
        name: "Alex R.",
        role: "Weekend runner",
        story:
          "I'm not pro. I'm consistent. Understanding my sweat profile changed how I train on Saturdays.",
        image: imageSets.platformHero,
      },
      {
        name: "Sam L.",
        role: "Competitive Hyrox",
        story:
          "Stations don't wait. Neither does my body — I prepare hydration like I prepare pacing.",
        image: imageSets.sportHyrox,
      },
    ],
  },
  coachesCorner: {
    id: "coaches",
    headline: "Performance Starts With Understanding.",
    sub: "Real data. No bro science. No fear tactics. Practical education from coaches who've been there.",
    articles: [
      {
        title: "Hydration habits that stick",
        topic: "Hydration science",
        excerpt: "Simple cues athletes actually follow between sessions.",
        href: "/insights/hydration-101-for-everyday-athletes",
      },
      {
        title: "Recovery routines that compound",
        topic: "Recovery strategies",
        excerpt: "Why the hour after training sets up tomorrow's readiness.",
        href: "/insights/sleep-recovery-and-hydration",
      },
      {
        title: "Preparation rituals before competition",
        topic: "Athlete stories",
        excerpt: "What disciplined athletes do in the 24 hours before they perform.",
        href: "/insights/signs-of-dehydration-during-exercise",
      },
      {
        title: "Game-day readiness checklist",
        topic: "Coach perspectives",
        excerpt: "A calm, repeatable framework for coaches and captains.",
        href: "/insights/how-much-water-should-athletes-drink",
      },
    ],
  },
  learn: {
    id: "learn",
    headline: "The Education Hub.",
    sub: "Articles, science, athlete stories, and training insights for everyday athletes.",
    articles: [
      { title: "Hydration 101", href: "/insights/hydration-101-for-everyday-athletes" },
      {
        title: "How Much Water Do Athletes Need?",
        href: "/insights/how-much-water-should-athletes-drink",
      },
      { title: "Pre-Workout Hydration", href: "/products/clutch-iso" },
      { title: "Recovery Strategies", href: "/insights/sleep-recovery-and-hydration" },
      { title: "Signs Of Dehydration", href: "/insights/signs-of-dehydration-during-exercise" },
      { title: "Fueling For Performance", href: "/insights/cycling-hydration-guide" },
    ],
  },
  clutchScore: {
    id: "clutch-score",
    headline: "Meet The Clutch Assessment™.",
    sub: "In less than 60 seconds, discover the hydration habits, sweat patterns, and recovery gaps holding back your performance. You'll receive your Clutch Score™, Athlete Profile, Sweat Profile, personalized recommendations, and your Clutch Blueprint™.",
    sample: {
      score: 87,
      profile: "The Workhorse",
      readiness: "High",
    },
    cta: "Start Assessment",
  },
  profiles: {
    id: "profiles",
    headline: "What's Your Athlete Profile?",
    sub: "No two athletes sweat the same. No two athletes should hydrate the same.",
    cards: [
      {
        name: "The Competitor",
        copy: "You thrive under pressure. You want every edge when the game is on the line.",
      },
      {
        name: "The Grinder",
        copy: "You train constantly. Your challenge isn't effort — it's recovery.",
      },
      {
        name: "The Workhorse",
        copy: "You sweat heavily. You train in demanding conditions and ask a lot from your body.",
      },
      {
        name: "The Closer",
        copy: "Strong athletes finish strong. You want the strategy to perform deep into competition.",
      },
      {
        name: "The Optimizer",
        copy: "You already do many things right. You're chasing marginal gains — and those gains matter.",
      },
    ],
    cta: "Find Your Profile",
  },
  system: {
    id: "system",
    headline: "Introducing ClutchFuel Core™.",
    sub: "Daily performance hydration. The foundation of your strategy — built for training, competition, and recovery. Staying hydrated isn't a game-day decision. It's a daily habit.",
    products: [
      {
        name: "ISO",
        stage: "Prepare",
        copy: "Prime your body before activity.",
        href: "/products/clutch-iso",
      },
      {
        name: "CORE",
        stage: "Perform",
        copy: "Daily hydration that supports performance, endurance, and consistency.",
        href: "/products/clutch-flow",
        accent: true,
      },
      {
        name: "RECOVERY",
        stage: "Recover",
        copy: "Replenish and rebuild after every session.",
        href: "/products/clutch-recovery",
      },
    ],
  },
  community: {
    id: "community",
    headline: "The Everyday Athlete Community.",
    sub: "We're building more than a hydration brand. We're building a movement.",
    pillars: [
      { title: "Run clubs", copy: "Pace groups that prepare together, finish stronger." },
      {
        title: "Basketball communities",
        copy: "Leagues and crews who treat hydration as culture.",
      },
      { title: "HYROX & CrossFit", copy: "Gym floors and boxes building shared discipline." },
      { title: "Combat athletes", copy: "Camps and fight teams who train for the late rounds." },
      { title: "Coaches & parents", copy: "The people behind every athlete showing up prepared." },
    ],
  },
  founder: {
    id: "founder",
    name: "Jamar Gopie",
    headline: "Why We Started ClutchFuel.",
    story: [
      "As athletes and coaches, we've seen the same thing happen over and over. Athletes train harder than ever — yet many still struggle with cramping, poor recovery, fatigue, and inconsistent performance.",
      "Not because they aren't working hard. Because they don't understand what their body actually needs.",
      "ClutchFuel exists to close that gap. To help athletes understand themselves, build better habits, and stay clutch when it matters most.",
    ],
    image: imageSets.aboutTeam,
    closing: "Stay Clutch.",
  },
  newsletter: {
    id: "newsletter",
    headline: "Join The Movement.",
    sub: "Hydration insights, athlete stories, coaching tips, and performance education — delivered weekly.",
    cta: "Join The Community",
  },
} as const;

export type BrandSport = (typeof brand.everydayAthletes.sports)[number];
export type BrandStory = (typeof brand.featuredAthletes.stories)[number];
export type BrandProfile = (typeof brand.profiles.cards)[number];
