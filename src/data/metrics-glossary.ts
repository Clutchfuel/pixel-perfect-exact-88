export const metricsGlossary = {
  title: "Understanding your results",
  intro:
    "These numbers are personalized estimates based on your training inputs — built to help you prepare, perform, and recover with confidence.",
  items: [
    {
      id: "clutch-score",
      term: "Clutch Score",
      definition:
        "A 0–100 readiness score that reflects how demanding hydration is for your profile — based on how you train, how hard you push, where you train, and how you sweat. Higher scores suggest more intentional hydration support may improve performance and recovery.",
    },
    {
      id: "sweat-rate",
      term: "Sweat rate",
      definition:
        "How much fluid you lose per hour of training (liters or ounces per hour). We estimate this from your session inputs — or from pre/post weight when you use a scale — to size your hydration plan.",
    },
    {
      id: "sweat-loss",
      term: "Sweat loss (fluid loss)",
      definition:
        "Total fluid lost during your session. With a scale, this combines body mass change plus what you drank. In quick profile mode, we estimate loss from training load, duration, intensity, and conditions.",
    },
    {
      id: "sodium-loss",
      term: "Sodium loss",
      definition:
        "Electrolytes leave with sweat — not just water. We estimate sodium loss from your sweat volume and profile using typical athlete sweat-sodium ranges. Heavy sweaters often need more sodium replacement, not just more water.",
    },
    {
      id: "body-mass-loss",
      term: "Body mass loss",
      definition:
        "When you weigh in before and after training, the difference reflects fluid (and small fuel) loss. That weight delta is the most direct signal we use for precision sweat-rate estimates.",
    },
  ],
} as const;
