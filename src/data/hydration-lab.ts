export const hydrationLabBrand = {
  background: "#000000",
  accent: "#C6FF00",
} as const;

export const hydrationLabCopy = {
  title: "ClutchFuel Hydration Lab",
  subtitle:
    "An elite athlete performance tool to estimate sweat rate, fluid loss, and hydration needs for peak training outcomes.",
  modePrecision: {
    label: "Precision Mode",
    hint: "I have a scale",
    description: "Weight before and after training for the most accurate sweat rate.",
  },
  modeQuick: {
    label: "Quick Mode",
    hint: "I have wearable data",
    description: "Use calories from your watch or fitness app for a fast estimate.",
  },
  resultsDisclaimer:
    "Important Note: Sweat rate results are estimates for educational and hydration-planning purposes only. Individual hydration needs vary based on environment, intensity, and physiology.",
} as const;

export const durationOptions = [
  { value: "under45", label: "Under 45 min", hours: 0.75 },
  { value: "60", label: "~60 min", hours: 1.0 },
  { value: "90", label: "~90 min", hours: 1.5 },
  { value: "105plus", label: "105+ min", hours: 2.0 },
] as const;

export const conditionOptions = [
  { value: "indoor", label: "Indoor / Climate Controlled", modifier: 1.0, tag: "env_indoor" },
  { value: "mild", label: "Mild Outdoor (under 75°F)", modifier: 1.15, tag: "env_mild" },
  { value: "hot", label: "Hot & Humid (75°F+)", modifier: 1.35, tag: "env_hot" },
] as const;

export const intensityOptions = [
  { value: "light", label: "Light (easy, conversational)", modifier: 0.85 },
  { value: "moderate", label: "Moderate (steady effort)", modifier: 1.0 },
  { value: "hard", label: "Hard (pushing limits)", modifier: 1.15 },
  { value: "max", label: "Max Effort (competition / all out)", modifier: 1.3 },
] as const;

export const fluidOptions = [
  { value: "none", label: "None", liters: 0 },
  { value: "some", label: "Some", liters: 0.25 },
  { value: "16oz", label: "16 oz", liters: 0.5 },
  { value: "32oz", label: "32 oz+", liters: 1.0 },
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
    emoji: string;
    color: string;
    whatThisMeans: string;
    gamePlan: string[];
    hydrationNote: string;
    keyInsight: string;
  }
> = {
  low: {
    badge: "LOW SWEAT RATE",
    emoji: "🟢",
    color: "#22c55e",
    whatThisMeans:
      "You lose fluid at a lower rate than most athletes. While dehydration risk is generally lower, consistency still matters — especially during longer sessions, warmer conditions, or consecutive training days.",
    gamePlan: [
      "Prepare: Start sessions hydrated, particularly if training longer than 45 minutes",
      "Perform: Drink to thirst, increasing intake in heat or higher intensity sessions",
      "Recover: Rehydrate post-training to stay ready for your next workout",
    ],
    hydrationNote:
      "Most of your fluid loss comes from water. Electrolytes may be helpful during longer sessions, hot conditions, or back-to-back training days.",
    keyInsight:
      "Low sweat rate doesn't mean \"no strategy.\" Performance still drops when hydration is inconsistent across the week.",
  },
  moderate: {
    badge: "MODERATE SWEAT RATE",
    emoji: "🟡",
    color: "#eab308",
    whatThisMeans:
      "You lose a noticeable amount of fluid during training. Without intentional hydration, fatigue, cramping, or performance drop-offs may appear late in sessions or the following day.",
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
    badge: "HIGH SWEAT RATE",
    emoji: "🔴",
    color: "#ef4444",
    whatThisMeans:
      "You lose fluid rapidly during training. Dehydration and electrolyte loss can directly impact endurance, strength output, focus, and recovery if hydration isn't intentional.",
    gamePlan: [
      "Prepare: Begin training hydrated and consider electrolyte support before longer or intense sessions",
      "Perform: Hydrate consistently — don't wait until thirst sets in",
      "Recover: Rehydrate promptly after training to replace both fluid and electrolyte losses",
    ],
    hydrationNote:
      "Electrolyte replacement is critical at your sweat rate. Water alone may not be enough to sustain performance or support proper recovery.",
    keyInsight:
      "Heavy sweaters perform best with a structured hydration strategy — not guesswork.",
  },
};

export const zoneTagMap: Record<SweatRateZone, string> = {
  low: "sweat_rate_low",
  moderate: "sweat_rate_moderate",
  high: "sweat_rate_high",
};
