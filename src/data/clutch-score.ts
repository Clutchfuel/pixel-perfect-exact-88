export const clutchScoreQuiz = {
  title: "Let's Build Your Hydration Profile",
  subtitle:
    "Answer a few questions about your training habits and we'll generate your personalized Clutch Score, hydration profile, and performance insights.",
  steps: [
    {
      id: "bodyType",
      question: "What's your typical build?",
      options: [
        { value: "lighter", label: "Lean or lighter build", description: "Smaller frame for your sport" },
        { value: "average", label: "Average athletic build", description: "Typical build for how you train" },
        { value: "heavier", label: "Broader or heavier build", description: "More muscle mass or larger frame" },
      ],
    },
    {
      id: "trainingLoad",
      question: "How often do you train hard?",
      options: [
        {
          value: "light",
          label: "1–2 sessions / week",
          description: "Maintenance or casual training",
        },
        {
          value: "moderate",
          label: "3–4 sessions / week",
          description: "Consistent training block",
        },
        { value: "heavy", label: "5+ sessions / week", description: "High-volume athlete" },
      ],
    },
    {
      id: "sweatLevel",
      question: "How would you describe your sweat rate?",
      options: [
        {
          value: "light",
          label: "Light sweater",
          description: "Dry quickly, minimal salt residue",
        },
        {
          value: "moderate",
          label: "Moderate sweater",
          description: "Noticeable sweat, normal losses",
        },
        { value: "heavy", label: "Heavy sweater", description: "Soaked shirts, salt on skin" },
      ],
    },
    {
      id: "environment",
      question: "Where do you train most often?",
      options: [
        { value: "indoor", label: "Climate-controlled", description: "Gym, indoor court, studio" },
        { value: "mixed", label: "Mixed conditions", description: "Indoor + outdoor training" },
        { value: "hot", label: "Heat / humidity", description: "Outdoor, hot box, summer sport" },
      ],
    },
    {
      id: "goal",
      question: "What's your primary performance goal?",
      options: [
        {
          value: "performance",
          label: "Peak performance",
          description: "Compete and push intensity",
        },
        {
          value: "endurance",
          label: "Endurance & output",
          description: "Long sessions, sustained effort",
        },
        {
          value: "recovery",
          label: "Recovery & consistency",
          description: "Bounce back and train daily",
        },
      ],
    },
  ],
  result: {
    emailPlaceholder: "you@example.com",
    emailCta: "Save my results",
    emailHint: "We'll email your profile and hydration targets.",
  },
} as const;

export type QuizField = (typeof clutchScoreQuiz.steps)[number]["id"];
export type QuizAnswers = Record<QuizField, string>;
