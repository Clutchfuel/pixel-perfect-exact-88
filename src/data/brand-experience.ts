import { imageSets } from "@/assets/image-sets";

export const brand = {
  hero: {
    tag: "PERFORMANCE PREPARATION",
    headline: "Performance Starts With Preparation.",
    tagline: "Hydration intelligence for everyday athletes.",
    supporting: [
      "Most athletes train with intention.",
      "Few hydrate with intention.",
      "ClutchFuel helps athletes understand their body, build better hydration habits, and prepare to perform at their best.",
    ],
    primaryCta: "Build My Athlete Profile",
    secondaryCta: "Learn How It Works",
  },
  preparation: {
    id: "why-preparation",
    headline: "Why Preparation Matters",
    cards: [
      {
        title: "Preparation",
        copy: "The best performance starts long before competition.",
        icon: "target" as const,
      },
      {
        title: "Hydration",
        copy: "Your body performs differently when properly hydrated.",
        icon: "droplet" as const,
      },
      {
        title: "Consistency",
        copy: "Daily habits create long-term results.",
        icon: "calendar" as const,
      },
    ],
  },
  everydayAthletes: {
    id: "everyday-athletes",
    headline: "Built For Everyday Athletes",
    sub: "The athletes who perform best prepare differently.",
    sports: [
      {
        name: "Basketball",
        quote: "Preparation gives me confidence.",
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
        name: "Strength Training",
        quote: "Recovery starts with what I drink.",
        insight: "Heavy sessions need intentional hydration between sets.",
        image: imageSets.sportGym,
        href: "/athletes/gym",
      },
    ],
  },
  featuredAthletes: {
    id: "featured-athletes",
    headline: "Featured Athletes",
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
    headline: "Coaches Corner",
    sub: "Performance education from coaches who care about preparation.",
    articles: [
      {
        title: "Hydration habits that stick",
        topic: "Hydration habits",
        excerpt: "Simple cues athletes actually follow between sessions.",
        href: "/insights/hydration-101-for-everyday-athletes",
      },
      {
        title: "Recovery routines that compound",
        topic: "Recovery routines",
        excerpt: "Why the hour after training sets up tomorrow's readiness.",
        href: "/insights/sleep-recovery-and-hydration",
      },
      {
        title: "Preparation rituals before competition",
        topic: "Preparation rituals",
        excerpt: "What disciplined athletes do in the 24 hours before they perform.",
        href: "/insights/signs-of-dehydration-during-exercise",
      },
      {
        title: "Game-day readiness checklist",
        topic: "Game-day readiness",
        excerpt: "A calm, repeatable framework for coaches and captains.",
        href: "/insights/how-much-water-should-athletes-drink",
      },
    ],
  },
  learn: {
    id: "learn",
    headline: "Learn",
    sub: "Performance education — not a blog. A media hub for everyday athletes.",
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
    headline: "Understand Your Hydration Readiness.",
    sub: "The Clutch Score helps athletes better understand how their hydration habits, training demands, and consistency impact performance.",
    sample: {
      score: 87,
      profile: "High Output Athlete",
      readiness: "High",
    },
    cta: "Build My Athlete Profile",
  },
  system: {
    id: "system",
    headline: "The ClutchFuel System",
    sub: "Three stages. One preparation philosophy.",
    products: [
      {
        name: "ISO",
        stage: "Prepare",
        copy: "Hydrate before activity.",
        href: "/products/clutch-iso",
      },
      {
        name: "FLOW",
        stage: "Perform",
        copy: "Hydrate during activity.",
        href: "/products/clutch-flow",
        accent: true,
      },
      {
        name: "RECOVERY",
        stage: "Recover",
        copy: "Replenish after activity.",
        href: "/products/clutch-recovery",
      },
    ],
  },
  community: {
    id: "community",
    headline: "Community",
    sub: "Belonging is part of preparation.",
    pillars: [
      { title: "Run clubs", copy: "Pace groups that prepare together, finish stronger." },
      {
        title: "Basketball communities",
        copy: "Leagues and crews who treat hydration as culture.",
      },
      { title: "Training groups", copy: "Gym floors and Hyrox boxes building shared discipline." },
      { title: "Local events", copy: "Pop-ups, clinics, and meetups — show up prepared." },
      { title: "Athlete stories", copy: "Real journeys from everyday athletes like you." },
    ],
  },
  founder: {
    id: "founder",
    name: "Jamar Gopie",
    headline: "Built for athletes who prepare differently.",
    story: [
      "Jamar Gopie is a lifelong athlete and coach obsessed with the gap between how hard people train and how intentionally they prepare.",
      "He saw everyday athletes — students, parents, weekend warriors — doing the work in the gym but guessing on hydration. Not because they didn't care. Because nobody gave them a system that felt personal.",
      "ClutchFuel exists to close that gap: hydration intelligence, athlete identity, and habits that compound. Not supplements. Preparation.",
    ],
    image: imageSets.aboutTeam,
    closing: "Performance Starts With Preparation.",
  },
  newsletter: {
    id: "newsletter",
    headline: "Stay Prepared.",
    sub: "Get hydration insights, athlete stories, coaching tips, and performance education delivered weekly.",
    cta: "Join The Community",
  },
} as const;

export type BrandSport = (typeof brand.everydayAthletes.sports)[number];
export type BrandStory = (typeof brand.featuredAthletes.stories)[number];
