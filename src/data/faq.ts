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
        a: "ClutchFuel is a hydration intelligence platform for everyday athletes. We combine a personalized performance score (the Clutch Score), sport-specific hydration guidance, and a three-stage product system designed for how athletes actually train and compete.",
      },
      {
        q: "Who is this built for?",
        a: "Everyday athletes — basketball players, runners, Hyrox competitors, gym athletes, trainers, and youth athletes. If you train hard enough to care about how you feel in the fourth quarter, this is for you.",
      },
      {
        q: "Is this a supplement company?",
        a: "No. Products are part of a system, not the point of the system. The point is performance — hydration intelligence that helps you train smarter and recover faster.",
      },
    ],
  },
  {
    title: "The Clutch Score",
    items: [
      {
        q: "What is the Clutch Score?",
        a: "A personalized hydration and performance profile generated from a 5-question intake about your body, training, and goals. It estimates your sweat rate, sodium needs, and gives you a per-session hydration target.",
      },
      {
        q: "How long does it take?",
        a: "Under 60 seconds.",
      },
      {
        q: "Is it really free?",
        a: "Yes. The Clutch Score and your ongoing dashboard are free.",
      },
      {
        q: "How accurate is the estimate vs. measuring my actual sweat rate?",
        a: "The Clutch Score uses validated correlations between body composition, training intensity, and sweat losses. It's a strong starting point. For the most precise number, you can run a manual sweat test alongside it and we'll calibrate.",
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
        a: "Most athletes need to replace 60-80% of their sweat losses in real time. Your Clutch Score gives you a per-hour target based on your profile.",
      },
      {
        q: "Why do I cramp even though I drink during workouts?",
        a: "Cramping is almost always a sodium problem, not a fluid problem. Drinking plain water without sodium can actually make it worse.",
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
