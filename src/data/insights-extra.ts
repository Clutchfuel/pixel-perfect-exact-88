import type { Article } from "./insights";

export const extraArticles: Article[] = [
  {
    slug: "how-much-water-should-athletes-drink",
    title: "How Much Water Should Athletes Drink?",
    excerpt:
      "Daily targets, training-day adjustments, and why 'eight glasses a day' fails most active people.",
    category: "Hydration Basics",
    readMinutes: 6,
    publishedAt: "2025-11-04",
    author: "ClutchFuel Performance Team",
    body: [
      {
        paragraphs: [
          "Athletes ask this constantly — and most answers online are either too vague ('drink when thirsty') or too rigid ('half your body weight in ounces'). The truth sits in the middle: your baseline needs depend on body size and climate, but your training load is what actually moves the number.",
        ],
      },
      {
        heading: "Daily baseline (rest days)",
        paragraphs: [
          "A practical starting point for active adults is 0.5–0.7 oz per pound of body weight per day from all fluids — water, coffee, tea, and food. For a 160-pound athlete that's roughly 80–112 oz (2.4–3.3 L). Food contributes 20–30% of total water intake, so you don't need to chug it all from a bottle.",
          "Add electrolytes to at least one morning serving so you're not flushing sodium with plain water all day.",
        ],
      },
      {
        heading: "Training days: add sweat replacement",
        paragraphs: [
          "On days you train, add back what you lose. If your sweat rate is 1.2 L/hr and you train 75 minutes, you're down roughly 1.5 L before accounting for what you drank during the session.",
        ],
        bullets: [
          "Weigh yourself before and after a typical session to estimate fluid loss.",
          "Replace 125–150% of that loss over the next 4–6 hours (extra covers ongoing urine losses).",
          "Include sodium with recovery fluid so you retain what you drink.",
        ],
      },
      {
        heading: "Signs you're under-shooting",
        paragraphs: [
          "Dark urine by midday, headaches, elevated resting heart rate, and 'heavy legs' in sessions that should feel normal often trace back to chronic under-drinking — not fitness.",
        ],
      },
      {
        heading: "Signs you're over-shooting",
        paragraphs: [
          "Clear urine all day, bloating during training, and needing to urinate every 30 minutes may mean too much plain water without sodium. Balance matters more than volume alone.",
        ],
      },
    ],
    relatedSlugs: [
      "how-to-calculate-your-sweat-rate",
      "signs-of-dehydration-during-exercise",
      "hydration-101-for-everyday-athletes",
    ],
  },
  {
    slug: "signs-of-dehydration-during-exercise",
    title: "7 Signs of Dehydration During Exercise (Before You Feel Thirsty)",
    excerpt:
      "Thirst lags behind performance loss. Learn the early signals athletes miss — and what to do in the moment.",
    category: "Hydration Basics",
    readMinutes: 5,
    publishedAt: "2025-11-11",
    author: "ClutchFuel Performance Team",
    body: [
      {
        paragraphs: [
          "By the time you feel thirsty during a hard session, you're often already 1–2% down on body weight — enough to reduce power output and slow decision-making. These seven signs show up earlier.",
        ],
      },
      {
        heading: "Early warning signs",
        bullets: [
          "Heart rate drifts 5–10 bpm higher than usual at the same pace or load.",
          "Perceived effort spikes — RPE 7 feels like RPE 9.",
          "Grip strength and fine motor control slip (missed shots, sloppy footwork).",
          "Skin feels hot and dry despite sweating earlier in the session.",
          "Headache or pressure behind the eyes, especially in indoor heat.",
          "Muscle twinges or early cramp sensations in calves or hamstrings.",
          "Irritability or mental fog — hydration affects cognition before it affects quads.",
        ],
      },
      {
        heading: "What to do immediately",
        paragraphs: [
          "Don't wait for a break. Take 4–6 oz of an electrolyte drink, reduce intensity for 3–5 minutes, and reassess. Catching dehydration early costs almost nothing; pushing through costs the whole session.",
        ],
      },
      {
        heading: "Prevention beats reaction",
        paragraphs: [
          "Front-load 16 oz with electrolytes 60–90 minutes before training, sip every 15–20 minutes during sessions over 45 minutes, and know your sweat rate so you're not guessing.",
        ],
      },
    ],
    relatedSlugs: [
      "how-much-water-should-athletes-drink",
      "pre-during-post-workout-hydration-guide",
      "electrolytes-explained-sodium-potassium-magnesium",
    ],
  },
  {
    slug: "best-electrolytes-for-athletes",
    title: "Best Electrolytes for Athletes: What to Look For (And Skip)",
    excerpt:
      "Sodium first, sugar second, gimmicks last. A practical buyer's guide for training and race day.",
    category: "Strategy",
    readMinutes: 7,
    publishedAt: "2025-11-18",
    author: "ClutchFuel Performance Team",
    body: [
      {
        paragraphs: [
          "The electrolyte aisle is chaos — neon labels, trace minerals you've never heard of, and 'hydration multipliers' with no evidence. For athletes, the decision tree is simpler than marketing suggests.",
        ],
      },
      {
        heading: "Non-negotiable: sodium",
        paragraphs: [
          "Sweat is salty. Any product meant for training should lead with sodium — typically 300–1,000 mg per serving for intense sessions, scaled to your sweat sodium losses. Products with under 100 mg sodium are fine for desk hydration, not for the gym.",
        ],
      },
      {
        heading: "When carbs belong in the bottle",
        paragraphs: [
          "Sessions under 60 minutes at moderate intensity rarely need carbs in your drink. Past 60–75 minutes, or in hot conditions with high output, a 6–8% carbohydrate solution (about 14–20 g carbs per 8 oz) supports blood glucose without gut distress.",
        ],
      },
      {
        heading: "What to skip",
        bullets: [
          "Products where sodium is buried below 'proprietary blends.'",
          "Extreme magnesium doses marketed as cramp cures (fix sodium first).",
          "Zero-calorie sports drinks with no sodium — they're flavored water.",
          "Anything that promises to 'alkalize' or 'detox' your sweat.",
        ],
      },
      {
        heading: "Match product to moment",
        paragraphs: [
          "Prepare: higher sodium, moderate fluid before training. Perform: balanced sodium + optional carbs during. Recover: sodium + protein + carbs within 30 minutes. A three-stage system beats one bottle for everything.",
        ],
      },
    ],
    relatedSlugs: [
      "electrolytes-explained-sodium-potassium-magnesium",
      "sports-drink-vs-water-for-athletes",
      "pre-during-post-workout-hydration-guide",
    ],
  },
  {
    slug: "sports-drink-vs-water-for-athletes",
    title: "Sports Drink vs Water: When Each One Wins",
    excerpt:
      "Water isn't wrong — it's just incomplete for most training. Here's the decision framework coaches use.",
    category: "Hydration Basics",
    readMinutes: 5,
    publishedAt: "2025-11-25",
    author: "ClutchFuel Performance Team",
    body: [
      {
        paragraphs: [
          "Water is the default for a reason: it's free, available, and fine for short, easy sessions. The moment intensity, duration, or heat rises, water alone becomes a performance limiter.",
        ],
      },
      {
        heading: "When water is enough",
        bullets: [
          "Sessions under 45 minutes at low to moderate intensity.",
          "Cool conditions with light sweat losses.",
          "Recovery sipping at your desk (pair with a salty snack).",
        ],
      },
      {
        heading: "When you need electrolytes + carbs",
        bullets: [
          "Training past 60 minutes or in heat above 75°F (24°C).",
          "High-intensity intervals, team sports, or Hyrox-style mixed modal work.",
          "Back-to-back sessions or tournament days.",
          "Any session where you finish with salt stains on your kit.",
        ],
      },
      {
        heading: "The hyponatremia risk",
        paragraphs: [
          "Drinking large volumes of plain water during long events without sodium can dilute blood sodium — a serious condition more common in endurance athletes than dehydration. Electrolytes aren't optional for long, hot efforts.",
        ],
      },
      {
        heading: "Practical rule",
        paragraphs: [
          "If you're sweating enough to need a towel, you probably need sodium in the bottle. If you're going long enough to bonk, add carbs. Everything else can stay simple.",
        ],
      },
    ],
    relatedSlugs: [
      "best-electrolytes-for-athletes",
      "hyponatremia-and-overhydration-risk",
      "hydration-101-for-everyday-athletes",
    ],
  },
  {
    slug: "marathon-hydration-strategy",
    title: "Marathon Hydration Strategy: A Mile-by-Mile Plan",
    excerpt:
      "Aid stations, sodium targets, and pacing your intake so mile 20 doesn't feel like mile 30.",
    category: "Sport-Specific",
    readMinutes: 8,
    publishedAt: "2025-12-02",
    author: "ClutchFuel Performance Team",
    body: [
      {
        paragraphs: [
          "Marathon hydration is a logistics problem disguised as a fitness problem. You know how to run; the failure mode is drinking too little early, too much plain water mid-race, or trying new products on race day.",
        ],
      },
      {
        heading: "Race-week loading",
        paragraphs: [
          "Start topping off plasma volume 72 hours out — consistent electrolyte intake with meals, not a single gallon chug the night before.",
        ],
        bullets: [
          "Monday–Wednesday: normal training hydration + extra sodium at meals.",
          "Thursday–Friday: reduce training volume, maintain sodium and fluid.",
          "Saturday: carb load; sip electrolyte water throughout the day.",
        ],
      },
      {
        heading: "Race morning",
        paragraphs: [
          "16–20 oz with electrolytes 2–3 hours before the start. Top up with 4–6 oz at 30 minutes if tolerated. Use products you've trained with — nothing new.",
        ],
      },
      {
        heading: "On the course",
        paragraphs: [
          "Aim for 3–6 oz every 15–20 minutes at marathon pace — roughly 400–800 ml per hour depending on sweat rate and conditions. Alternate water and sports drink at aid stations if both are offered; prioritize sodium in heat.",
        ],
      },
      {
        heading: "Miles 18–26",
        paragraphs: [
          "This is where under-fueled athletes walk. If you've hit your fluid plan and still fade, it's usually glycogen — add carbs at the next station. Cramps here are almost always sodium, not potassium.",
        ],
      },
    ],
    relatedSlugs: [
      "how-to-calculate-your-sweat-rate",
      "hyponatremia-and-overhydration-risk",
      "pre-during-post-workout-hydration-guide",
    ],
  },
  {
    slug: "muscle-cramps-and-electrolytes",
    title: "Muscle Cramps During Workouts: Electrolytes, Fatigue, or Both?",
    excerpt:
      "Why cramps happen in the third set, the fourth quarter, or mile 22 — and the fix order that actually works.",
    category: "Performance Science",
    readMinutes: 6,
    publishedAt: "2025-12-09",
    author: "ClutchFuel Performance Team",
    body: [
      {
        paragraphs: [
          "Cramps are multifactorial, but athletes consistently under-treat sodium and over-treat magnesium. Here's the hierarchy that sports scientists and coaches agree on.",
        ],
      },
      {
        heading: "Sodium deficiency (most common in sweaty athletes)",
        paragraphs: [
          "Heavy sweaters losing 1,000+ mg sodium per hour who replace with plain water or low-sodium products create a sodium deficit that shows up as localized cramping — often calves, hamstrings, or abs.",
        ],
      },
      {
        heading: "Neuromuscular fatigue",
        paragraphs: [
          "Novel intensity, heat, and duration can cramp muscles even with adequate electrolytes. Pacing and conditioning matter; cramps at the end of a hard session aren't always a bottle problem.",
        ],
      },
      {
        heading: "Fix order",
        bullets: [
          "1. Increase sodium intake 48 hours before hard sessions or events.",
          "2. Match in-session fluid to sweat rate (60–80% replacement).",
          "3. Address sleep and overall training load if cramps persist at moderate intensity.",
          "4. Consider magnesium for recovery and sleep — not as a mid-set cramp cure.",
        ],
      },
    ],
    relatedSlugs: [
      "electrolytes-explained-sodium-potassium-magnesium",
      "best-electrolytes-for-athletes",
      "signs-of-dehydration-during-exercise",
    ],
  },
  {
    slug: "hyponatremia-and-overhydration-risk",
    title: "Hyponatremia: When Drinking Too Much Water Becomes Dangerous",
    excerpt:
      "Low blood sodium affects endurance athletes who over-drink plain water. Know the symptoms and prevention plan.",
    category: "Performance Science",
    readMinutes: 6,
    publishedAt: "2025-12-16",
    author: "ClutchFuel Performance Team",
    body: [
      {
        paragraphs: [
          "Hyponatremia — blood sodium below normal — makes headlines at marathons and triathlons when athletes drink aggressively without replacing sodium. It's rare in gym training but real in events over 3 hours, especially in cool weather when thirst signals are blunted.",
        ],
      },
      {
        heading: "How it happens",
        paragraphs: [
          "Large volumes of hypotonic fluid (plain water) dilute extracellular sodium. Your cells swell; symptoms range from nausea and confusion to seizures in severe cases. It's preventable with a sodium-aware drinking plan.",
        ],
      },
      {
        heading: "Symptoms to watch",
        bullets: [
          "Nausea, vomiting, or bloating despite drinking",
          "Headache and confusion disproportionate to effort",
          "Swelling in hands, feet, or face",
          "Worsening symptoms as you continue drinking water at aid stations",
        ],
      },
      {
        heading: "Prevention",
        bullets: [
          "Include sodium in all race-day and long-training fluids.",
          "Drink to thirst in cool conditions — don't force excessive volume.",
          "Weigh yourself during long training runs; weight gain mid-run is a red flag.",
          "Use electrolyte products you've tested in training.",
        ],
      },
    ],
    relatedSlugs: [
      "sports-drink-vs-water-for-athletes",
      "marathon-hydration-strategy",
      "how-much-water-should-athletes-drink",
    ],
  },
  {
    slug: "hydration-for-hot-weather-training",
    title: "Hydration for Hot Weather Training: Heat, Humidity, and Sweat Rate",
    excerpt:
      "Summer sessions can double your fluid needs. Adjust targets before you adjust your program.",
    category: "Strategy",
    readMinutes: 6,
    publishedAt: "2025-12-23",
    author: "ClutchFuel Performance Team",
    body: [
      {
        paragraphs: [
          "Heat stress increases sweat rate, heart rate, and perceived effort at the same power output. Athletes who use winter hydration habits in July under-fuel by 30–50% without realizing it.",
        ],
      },
      {
        heading: "Adjust your targets",
        paragraphs: [
          "Re-test sweat rate in conditions you'll actually race in. A 1.0 L/hr athlete in spring can hit 1.8 L/hr in August humidity. Scale fluid and sodium proportionally.",
        ],
      },
      {
        heading: "Pre-cooling and timing",
        bullets: [
          "Train earlier or later when possible; quality drops in peak heat.",
          "Pre-load with cold electrolyte fluid 60 minutes out.",
          "Wear lighter kit; dark colors and cotton trap heat.",
          "Extend warm-up gradually — core temperature spikes fast in humidity.",
        ],
      },
      {
        heading: "Recovery in heat",
        paragraphs: [
          "Rehydrate in a cool environment. Cold fluids plus sodium speed gastric emptying and help you retain what you drink. Don't skip recovery because you're 'used to' summer training.",
        ],
      },
    ],
    relatedSlugs: [
      "how-to-calculate-your-sweat-rate",
      "signs-of-dehydration-during-exercise",
      "pre-during-post-workout-hydration-guide",
    ],
  },
  {
    slug: "crossfit-hydration-guide",
    title: "CrossFit Hydration Guide: WODs, Metcons, and Recovery",
    excerpt:
      "High intensity + short rest = sweat rates that rival endurance sport. Here's how to fuel inside the box.",
    category: "Sport-Specific",
    readMinutes: 6,
    publishedAt: "2026-01-06",
    author: "ClutchFuel Performance Team",
    body: [
      {
        paragraphs: [
          "CrossFit athletes often treat hydration like a long-run problem or ignore it entirely because sessions are 'only' 60 minutes. Metcon density drives sweat losses comparable to team sports — especially in heated boxes with limited air flow.",
        ],
      },
      {
        heading: "Before class",
        paragraphs: [
          "12–16 oz with electrolytes 45–60 minutes before. If you're training fasted, sodium matters more — you won't have meal sodium to draw from.",
        ],
      },
      {
        heading: "During the WOD",
        paragraphs: [
          "Sip between pieces in strength work; small hits during longer AMRAPs if breaks allow. For 20+ minute efforts, 4–6 oz of electrolyte drink mid-session prevents the grip-and-engine fade in round 3.",
        ],
      },
      {
        heading: "Double sessions",
        paragraphs: [
          "Morning strength + evening metcon days need deliberate recovery windows: fluid, sodium, protein, and carbs within 30 minutes of session one, then re-prepare before session two.",
        ],
      },
    ],
    relatedSlugs: [
      "pre-during-post-workout-hydration-guide",
      "muscle-cramps-and-electrolytes",
      "best-electrolytes-for-athletes",
    ],
  },
  {
    slug: "morning-hydration-routine-for-athletes",
    title: "Morning Hydration Routine for Athletes (Before Coffee)",
    excerpt:
      "The first 30 minutes after waking set plasma volume for the whole day. A simple protocol that sticks.",
    category: "Strategy",
    readMinutes: 4,
    publishedAt: "2026-01-13",
    author: "ClutchFuel Performance Team",
    body: [
      {
        paragraphs: [
          "You lose fluid overnight through respiration and sweat — roughly 0.5–1.0 L depending on room temperature. Most athletes wake up under-hydrated and reach for coffee, which is a mild diuretic. Flip the order.",
        ],
      },
      {
        heading: "The 10-minute protocol",
        bullets: [
          "16 oz water with 300–500 mg sodium (electrolyte mix or salted water) within 10 minutes of waking.",
          "Wait 15–20 minutes before coffee if possible — let gastric emptying happen.",
          "Second small serving (8 oz) before mid-morning training if you train early.",
        ],
      },
      {
        heading: "Why sodium in the morning",
        paragraphs: [
          "Overnight fluid loss concentrates blood sodium slightly; plain water alone gets excreted faster. Sodium helps you retain morning fluid and supports the blood volume you'll need in your first session.",
        ],
      },
      {
        heading: "Make it automatic",
        paragraphs: [
          "Prep the bottle the night before. Same glass, same spot, same mix. Habit beats optimization — athletes who nail mornings hydrate better all day without thinking about it.",
        ],
      },
    ],
    relatedSlugs: [
      "hydration-101-for-everyday-athletes",
      "how-much-water-should-athletes-drink",
      "pre-during-post-workout-hydration-guide",
    ],
  },
];
