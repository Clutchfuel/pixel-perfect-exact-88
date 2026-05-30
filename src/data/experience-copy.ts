/** Outcome-focused copy for performance platform surfaces (WHOOP / Apple Fitness tone). */
export const experienceCopy = {
  badge: "PERFORMANCE INSIGHTS",
  tagline: "Performance Starts With Preparation.",

  intro: {
    headline: "Let's Build Your Hydration Profile",
    body: "Answer a few questions about your training habits and we'll generate your personalized Clutch Score, hydration profile, and performance insights.",
    cta: "Continue",
  },

  quickSteps: {
    sport: {
      headline: "What's Your Primary Sport?",
      subheadline: "Your hydration needs are unique to how you train.",
    },
    duration: {
      headline: "How Long Was Your Workout?",
      subheadline: "Duration is one of the biggest factors affecting hydration demand.",
    },
    intensity: {
      headline: "How Hard Did You Train?",
      subheadline: "The harder you push, the more hydration support your body may need.",
    },
    sweatLevel: {
      headline: "How Much Did You Sweat?",
      subheadline: "This helps us better understand your hydration profile.",
    },
  },

  results: {
    headline: "Your Clutch Score",
    supporting:
      "Your Clutch Score reflects your estimated hydration readiness and performance profile based on your training data.",
    hydrationInsightTitle: "Hydration Insight",
    hydrationInsightBody:
      "Based on your profile, your hydration demand appears elevated compared to the average athlete. Consistent hydration before, during, and after activity may improve performance and recovery.",
    cta: "Track My Next Session",
    retake: "Build a new profile",
  },

  dashboard: {
    welcome: "Welcome back, Jay.",
    supporting:
      "Track your hydration habits, monitor trends, and improve your Clutch Score over time.",
  },

  modes: {
    quick: { label: "Quick profile", hint: "Under 60 seconds" },
    full: { label: "Full profile", hint: "Deeper insights" },
  },
} as const;
