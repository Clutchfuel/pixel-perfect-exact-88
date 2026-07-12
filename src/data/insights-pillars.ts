import type { Article } from "./insights";

/** High-intent pillar articles that funnel to /clutch-score */
export const pillarArticles: Article[] = [
  {
    slug: "what-is-clutch-score",
    title: "What Is the Clutch Score? (And What It Isn’t)",
    excerpt:
      "A clear breakdown of ClutchFuel’s free 2-minute diagnostic — score, Biggest Opportunity, First Clutch Move — and how it differs from a sweat-rate test.",
    category: "Performance Science",
    readMinutes: 5,
    publishedAt: "2026-07-12",
    author: "ClutchFuel Performance Team",
    body: [
      {
        paragraphs: [
          "The Clutch Score is ClutchFuel’s free performance diagnostic for everyday athletes. In about two minutes you answer five questions about how you feel in training, recovery, frequency, and what you want to improve.",
          "You leave with three things: a score, your Biggest Opportunity, and a First Clutch Move™ — one concrete action for your next session.",
        ],
      },
      {
        heading: "What the Score measures",
        paragraphs: [
          "It is not a lab sweat-sodium test and it is not a medical diagnosis. It is a structured read on where you’re most likely leaving performance on the table based on how you describe your training reality.",
        ],
        bullets: [
          "Score — a readiness-style number from the diagnostic (roughly mid-40s to mid-90s).",
          "Biggest Opportunity — the theme to focus on first (for example Pre-Workout Hydration or Recovery Routine).",
          "First Clutch Move — a single, doable action before your next hard session.",
        ],
      },
      {
        heading: "What it is not",
        paragraphs: [
          "It does not replace a manual sweat-rate test if you need precise liters-per-hour targets. Use the Score for priority; use a sweat test for precision fluid math. Both belong in a serious athlete’s toolkit.",
        ],
      },
      {
        heading: "How to use your results",
        paragraphs: [
          "Do the First Clutch Move once before your next hard session. Notice the second half of the workout. Then explore the Prepare / Perform / Recover system that matches your opportunity — and retake the Score when your training block changes.",
        ],
      },
    ],
    relatedSlugs: [
      "first-clutch-move-how-to-use-your-results",
      "biggest-opportunity-performance-gaps",
      "how-to-calculate-your-sweat-rate",
    ],
  },
  {
    slug: "biggest-opportunity-performance-gaps",
    title: "Biggest Opportunity: The Performance Gaps Everyday Athletes Miss",
    excerpt:
      "Why identifying one priority — pre-workout hydration, recovery, electrolytes, endurance, or consistency — beats generic “drink more water” advice.",
    category: "Strategy",
    readMinutes: 6,
    publishedAt: "2026-07-12",
    author: "ClutchFuel Performance Team",
    body: [
      {
        paragraphs: [
          "Most athletes try to fix everything at once: more water, a new pre-workout, random magnesium, longer warm-ups. Progress stalls because nothing gets enough reps to matter.",
          "Your Biggest Opportunity is the opposite approach — one gap that, if closed, moves the rest of the system.",
        ],
      },
      {
        heading: "The five opportunities we score for",
        paragraphs: ["The Clutch Score maps answers into one of these focus areas:"],
        bullets: [
          "Pre-Workout Hydration — you arrive already behind; front-loading changes the second half.",
          "Recovery Routine — hard days are limited by what you do after, not only during.",
          "Endurance Support — your engine fades late; fueling and electrolytes usually beat “more fitness.”",
          "Hydration Consistency — boom-and-bust weeks; same baseline daily wins.",
          "Electrolyte Replacement — volume outruns plain water; sodium is the missing lever.",
        ],
      },
      {
        heading: "Why one gap beats ten tips",
        paragraphs: [
          "Everyday athletes train around jobs, family, and imperfect sleep. Bandwidth is limited. One clear opportunity plus one First Clutch Move is more honest — and more effective — than a 12-step protocol you’ll abandon by Thursday.",
        ],
      },
      {
        heading: "Find yours in two minutes",
        paragraphs: [
          "Take the free Clutch Score. You’ll see which opportunity fits your answers, then a single move to run before your next session.",
        ],
      },
    ],
    relatedSlugs: [
      "what-is-clutch-score",
      "pre-workout-hydration-for-everyday-athletes",
      "first-clutch-move-how-to-use-your-results",
    ],
  },
  {
    slug: "pre-workout-hydration-for-everyday-athletes",
    title: "Pre-Workout Hydration for Everyday Athletes",
    excerpt:
      "Why showing up under-hydrated makes hard sessions feel heavier — and a simple 60-minute front-load protocol that works for gym, court, and race day.",
    category: "Hydration Basics",
    readMinutes: 5,
    publishedAt: "2026-07-12",
    author: "ClutchFuel Performance Team",
    body: [
      {
        paragraphs: [
          "If the second half of training always feels worse than fitness should allow, check what you drank before you started — not only what you sipped during.",
          "Pre-workout hydration is one of the most common Biggest Opportunities in the Clutch Score. Athletes who finish strong usually front-loaded; athletes who fade often didn’t.",
        ],
      },
      {
        heading: "The 60-minute front-load",
        paragraphs: ["Keep it boring and repeatable:"],
        bullets: [
          "60 minutes before training: 16–20 oz of fluid with electrolytes.",
          "Don’t try to “catch up” only during the session.",
          "You should pee clear-ish once before you start when possible.",
          "Coffee can stay — just don’t make it your only morning fluid.",
        ],
      },
      {
        heading: "When this is (and isn’t) the main issue",
        paragraphs: [
          "If you recover slowly for days or cramp despite drinking, you may need recovery or electrolyte focus instead. That’s why the Score exists — to pick the priority instead of guessing.",
        ],
      },
      {
        heading: "Make it your First Clutch Move",
        paragraphs: [
          "If your Score points here, treat the next hard session as a test: front-load once, then notice late-session legs and focus. One clean rep beats a vague resolution to “hydrate better.”",
        ],
      },
    ],
    relatedSlugs: [
      "what-is-clutch-score",
      "electrolytes-vs-water-for-training",
      "morning-hydration-routine-for-athletes",
    ],
  },
  {
    slug: "electrolytes-vs-water-for-training",
    title: "Electrolytes vs Water for Training: When Each Wins",
    excerpt:
      "A practical decision tree for everyday athletes — when plain water is enough, when sodium matters, and how this ties to your Clutch Score opportunity.",
    category: "Hydration Basics",
    readMinutes: 6,
    publishedAt: "2026-07-12",
    author: "ClutchFuel Performance Team",
    body: [
      {
        paragraphs: [
          "Water is essential. It is not always sufficient. The longer and harder you go — especially in heat — the more sodium loss decides whether fluid actually helps.",
        ],
      },
      {
        heading: "Water-first situations",
        paragraphs: [
          "Short, easy sessions under ~45 minutes in cool conditions: water is often enough if you arrived hydrated. Overthinking electrolytes here is usually noise.",
        ],
      },
      {
        heading: "Electrolyte-first situations",
        paragraphs: ["Lean toward electrolytes when any of these are true:"],
        bullets: [
          "Sessions longer than 45–60 minutes at real intensity",
          "Hot gyms, outdoor summer work, or tournament days",
          "White salt rings on clothes or frequent late-session cramps",
          "You drink a lot of plain water but still feel flat or headachy",
        ],
      },
      {
        heading: "How this shows up in the Clutch Score",
        paragraphs: [
          "If your Biggest Opportunity is Electrolyte Replacement or Endurance Support, the First Clutch Move usually involves putting sodium in the bottle — not just “drink more.” Pair that with the Prepare / Perform / Recover system so you’re not improvising every session.",
        ],
      },
    ],
    relatedSlugs: [
      "electrolytes-explained-sodium-potassium-magnesium",
      "sports-drink-vs-water-for-athletes",
      "what-is-clutch-score",
    ],
  },
  {
    slug: "first-clutch-move-how-to-use-your-results",
    title: "First Clutch Move™: How to Use Your Clutch Score Results",
    excerpt:
      "You finished the assessment. Here’s how to turn your score and opportunity into one action this week — without overhauling your whole training plan.",
    category: "Strategy",
    readMinutes: 4,
    publishedAt: "2026-07-12",
    author: "ClutchFuel Performance Team",
    body: [
      {
        paragraphs: [
          "The Clutch Score is only useful if something changes before your next hard session. The First Clutch Move is designed to be that change — specific, short, and testable.",
        ],
      },
      {
        heading: "The 7-day protocol",
        paragraphs: ["Keep the bar low enough that you’ll actually do it:"],
        bullets: [
          "Day 0: Take the Score and email yourself the results.",
          "Next hard session: Execute only the First Clutch Move (not five new habits).",
          "Afterward: Note second-half energy, cramping, and recovery the next morning.",
          "Rest of the week: Repeat the same move; don’t rotate strategies yet.",
        ],
      },
      {
        heading: "Then layer the system",
        paragraphs: [
          "Once the move feels automatic, map it onto Prepare / Perform / Recover. Pre-workout opportunities lean ISO. In-session fade leans Flow. Slow bounce-back leans Recovery. The Score told you where to start; the system tells you how to sustain it.",
        ],
      },
      {
        heading: "Retake when life changes",
        paragraphs: [
          "New training block, heat wave, or race week? Retake the Score. Opportunities shift. The point is a living priority, not a permanent label.",
        ],
      },
    ],
    relatedSlugs: [
      "what-is-clutch-score",
      "biggest-opportunity-performance-gaps",
      "hydration-101-for-everyday-athletes",
    ],
  },
];
