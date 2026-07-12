export interface FaqItem {
  q: string;
  a: string;
}

export const faqGroups: { title: string; items: FaqItem[] }[] = [
  {
    title: "About ClutchFuel",
    items: [
      {
        q: "What is ClutchFuel?",
        a: "ClutchFuel is a performance intelligence brand for everyday athletes. We combine a free Clutch Score assessment, sport-specific hydration guidance, and a three-stage product system designed for how athletes actually train and compete.",
      },
      {
        q: "Who is this built for?",
        a: "Everyday athletes — basketball players, runners, Hyrox competitors, gym athletes, trainers, and youth athletes. If you train hard enough to care about how you feel in the fourth quarter, this is for you.",
      },
      {
        q: "Is this a supplement company?",
        a: "No. Products are part of a system, not the point of the system. The point is performance — clearer insight into how you train, recover, and hydrate so you show up ready.",
      },
    ],
  },
  {
    title: "The Clutch Score",
    items: [
      {
        q: "What is the Clutch Score?",
        a: "A free 5-question performance diagnostic. You get a score, your Biggest Opportunity (where you're leaving the most on the table), and a First Clutch Move™ — one concrete action for your next session.",
      },
      {
        q: "How long does it take?",
        a: "About two minutes.",
      },
      {
        q: "Is it really free?",
        a: "Yes. Taking the Clutch Score and emailing yourself the results is free.",
      },
      {
        q: "Is this the same as measuring my sweat rate?",
        a: "No. The Clutch Score is a performance diagnostic based on how you feel, recover, and train. A manual sweat-rate test is still the gold standard for fluid loss per hour — we teach that separately on our Sweat Rate page. Use both: Score for your priority, sweat test for precision fluid targets.",
      },
    ],
  },
  {
    title: "Hydration & Performance",
    items: [
      {
        q: "Isn't water enough?",
        a: "For light activity, often yes. For training sessions over 45 minutes, especially in heat, plain water alone tends to be urinated out without restoring electrolyte balance. Sodium is what makes fluid retention possible.",
      },
      {
        q: "How much should I drink during training?",
        a: "Most athletes need to replace 60-80% of their sweat losses in real time. Run a simple sweat-rate test (or start with a conservative 0.5–1.0 L/hr plan) and adjust from how you feel in the second half of sessions.",
      },
      {
        q: "Why do I cramp even though I drink during workouts?",
        a: "Cramping is often a sodium problem, not only a fluid problem. Drinking plain water without sodium can make it worse. If cramping is your main issue, the Clutch Score often surfaces Electrolyte Replacement or Recovery as your Biggest Opportunity.",
      },
    ],
  },
  {
    title: "Products",
    items: [
      {
        q: "Do I need all three products?",
        a: "No. Many athletes start with Clutch Flow (in-session) and add the others as they get more serious. The full system is for athletes training 4+ days a week or competing.",
      },
      {
        q: "Are they third-party tested?",
        a: "Yes. Every batch is tested for label accuracy and banned substances. Certificates available on request.",
      },
      {
        q: "Are they NSF Certified for Sport?",
        a: "We're in the certification process for the full product line. Reach out for current status.",
      },
    ],
  },
];
