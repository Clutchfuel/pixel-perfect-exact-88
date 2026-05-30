export const hydrationLabBrand = {
  background: "#0A0A0A",
  surface: "#171717",
  surfaceSecondary: "#121212",
  border: "#242424",
  accent: "#B7FF00",
  textSecondary: "#A1A1A1",
} as const;

export const hydrationLabCopy = {
  badge: "PERFORMANCE INSIGHTS",
  title: "Performance Starts With Preparation.",
  subtitle:
    "Most athletes hydrate based on guesswork. Discover your personalized hydration profile and understand what your body needs to perform at its best.",
  introHeadline: "Let's Build Your Hydration Profile",
  introBody:
    "Answer a few questions about your training habits and we'll generate your personalized Clutch Score, hydration profile, and performance insights.",
  modePrecision: {
    label: "Precision profile",
    hint: "I have a scale",
    description: "Use pre- and post-training weight for your most accurate hydration profile.",
  },
  modeQuick: {
    label: "Quick profile",
    hint: "I have wearable data",
    description: "Use calories from your watch or fitness app for a fast performance snapshot.",
  },
  resultsHeadline: "Your Hydration Profile",
  resultsSupporting:
    "Your profile reflects your estimated hydration readiness based on your training data.",
  resultsCta: "Track My Next Session",
  resultsRetake: "Build a new profile",
  resultsDisclaimer:
    "Performance insights are estimates for educational and hydration-planning purposes only. Individual needs vary based on environment, intensity, and physiology.",
} as const;

export const stepCopy = {
  calories: {
    headline: "What was your training load?",
    subheadline: "Optional — check your Apple Watch, Garmin, WHOOP, or fitness app.",
  },
  duration: {
    headline: "How Long Was Your Workout?",
    subheadline: "Duration is one of the biggest factors affecting hydration demand.",
  },
  conditions: {
    headline: "What were your training conditions?",
    subheadline: "You don't need the exact temperature — pick what it felt like.",
  },
  intensity: {
    headline: "How Hard Did You Train?",
    subheadline: "The harder you push, the more hydration support your body may need.",
  },
  fluids: {
    headline: "Did you drink during training?",
    subheadline: "Pick the closest match. We'll estimate how much you had.",
  },
  training: {
    headline: "What's Your Primary Sport?",
    subheadline: "Your hydration needs are unique to how you train.",
  },
  pre: {
    headline: "Pre-training weight",
    subheadline: "Weigh yourself before your session for the most accurate profile.",
  },
  post: {
    headline: "Post-training weight",
    subheadline: "Weigh yourself immediately after training, before rehydrating.",
  },
  bathroom: {
    headline: "Any bathroom breaks?",
    subheadline: "This helps refine your fluid loss estimate.",
  },
} as const;

export const durationOptions = [
  { value: "under45", label: "Under 45 min", hours: 0.75 },
  { value: "60", label: "~60 min", hours: 1.0 },
  { value: "90", label: "~90 min", hours: 1.5 },
  { value: "105plus", label: "105+ min", hours: 2.0 },
] as const;

export const conditionOptions = [
  { value: "indoor", label: "Indoor / climate controlled", modifier: 1.0, tag: "env_indoor" },
  { value: "mild", label: "Outdoor — comfortable", modifier: 1.15, tag: "env_mild" },
  { value: "hot", label: "Outdoor — hot or humid", modifier: 1.35, tag: "env_hot" },
] as const;

export const intensityOptions = [
  { value: "light", label: "Light (easy, conversational)", modifier: 0.85 },
  { value: "moderate", label: "Moderate (steady effort)", modifier: 1.0 },
  { value: "hard", label: "Hard (pushing limits)", modifier: 1.15 },
  { value: "max", label: "Max Effort (competition / all out)", modifier: 1.3 },
] as const;

export const fluidOptions = [
  { value: "none", label: "I didn't drink during training", liters: 0 },
  { value: "some", label: "I sipped some water", liters: 0.35 },
  { value: "regular", label: "I drank throughout the session", liters: 0.65 },
  { value: "heavy", label: "I drank a lot (full bottle or more)", liters: 1.0 },
] as const;

export const bathroomOptions = [
  { value: "none", label: "None", liters: 0 },
  { value: "once", label: "Once", liters: 0.2 },
  { value: "multiple", label: "Multiple", liters: 0.4 },
] as const;

export const trainingTypeOptions = [
  { value: "running", label: "Running", tag: "train_running" },
  { value: "hybrid", label: "Hybrid / Functional", tag: "train_hybrid" },
  { value: "strength", label: "Strength / Gym", tag: "train_strength" },
  { value: "cycling", label: "Cycling", tag: "train_cycling" },
  { value: "team", label: "Team Sport", tag: "train_team_sport" },
  { value: "other", label: "Other", tag: "train_other" },
] as const;

export type SweatRateZone = "low" | "moderate" | "high";

export const zoneResults: Record<
  SweatRateZone,
  {
    badge: string;
    color: string;
    insightTitle: string;
    insightBody: string;
    gamePlan: string[];
    hydrationNote: string;
    keyInsight: string;
  }
> = {
  low: {
    badge: "STEADY PROFILE",
    color: "#B7FF00",
    insightTitle: "Hydration Insight",
    insightBody:
      "Your hydration demand appears moderate compared to most athletes. Consistency still matters — especially during longer sessions, warmer conditions, or consecutive training days.",
    gamePlan: [
      "Prepare: Start sessions hydrated, particularly if training longer than 45 minutes",
      "Perform: Drink to thirst, increasing intake in heat or higher intensity sessions",
      "Recover: Rehydrate post-training to stay ready for your next workout",
    ],
    hydrationNote:
      "Most of your fluid loss comes from water. Electrolytes may be helpful during longer sessions, hot conditions, or back-to-back training days.",
    keyInsight:
      "A steady profile doesn't mean no strategy. Performance still drops when hydration is inconsistent across the week.",
  },
  moderate: {
    badge: "ELEVATED DEMAND",
    color: "#B7FF00",
    insightTitle: "Hydration Insight",
    insightBody:
      "Based on your profile, your hydration demand appears elevated compared to the average athlete. Consistent hydration before, during, and after activity may improve performance and recovery.",
    gamePlan: [
      "Prepare: Prioritize hydration 30–60 minutes before training",
      "Perform: Sip fluids consistently during sessions lasting over 60 minutes",
      "Recover: Rehydrate within 60 minutes post-training to support recovery and output",
    ],
    hydrationNote:
      "You're losing both fluid and electrolytes during training. Adding electrolytes can help maintain hydration balance and support consistent performance — especially during longer or more intense sessions.",
    keyInsight:
      "Consistency before and after training is critical to maintaining output and speeding recovery.",
  },
  high: {
    badge: "HIGH DEMAND",
    color: "#B7FF00",
    insightTitle: "Hydration Insight",
    insightBody:
      "Your body may need aggressive hydration support during and after training. Dehydration and electrolyte loss can directly impact endurance, strength output, focus, and recovery if preparation isn't intentional.",
    gamePlan: [
      "Prepare: Begin training hydrated and consider electrolyte support before longer or intense sessions",
      "Perform: Hydrate consistently — don't wait until thirst sets in",
      "Recover: Rehydrate promptly after training to replace both fluid and electrolyte losses",
    ],
    hydrationNote:
      "Electrolyte replacement is critical at your demand level. Water alone may not be enough to sustain performance or support proper recovery.",
    keyInsight:
      "Athletes with high demand perform best with a structured hydration strategy — not guesswork.",
  },
};

export const zoneTagMap: Record<SweatRateZone, string> = {
  low: "sweat_rate_low",
  moderate: "sweat_rate_moderate",
  high: "sweat_rate_high",
};
