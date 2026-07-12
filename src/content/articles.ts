import cramp from "@/assets/articles/cramp.jpg";
import hydrationMyths from "@/assets/articles/hydration-myths.jpg";
import recovery from "@/assets/articles/recovery.jpg";
import howMuchWater from "@/assets/articles/how-much-water.jpg";
import habits from "@/assets/articles/habits.jpg";
import electrolytes from "@/assets/articles/electrolytes.jpg";
import sweat from "@/assets/articles/sweat.jpg";
import sleep from "@/assets/articles/sleep.jpg";
import preWorkout from "@/assets/articles/pre-workout.jpg";
import postWorkout from "@/assets/articles/post-workout.jpg";
import mindset from "@/assets/articles/mindset.jpg";
import strengthCardio from "@/assets/articles/strength-cardio.jpg";

export type ArticleCategory =
  | "Hydration"
  | "Recovery"
  | "Fueling"
  | "Performance"
  | "Training"
  | "Mindset";

export type Article = {
  slug: string;
  title: string;
  category: ArticleCategory;
  excerpt: string;
  readingTime: string;
  featured?: boolean;
  image: string;
  body: string[];
  takeaways: string[];
};

export const ARTICLES: Article[] = [
  {
    slug: "why-you-always-cramp",
    title: "Why you always cramp, and what your body is really telling you",
    category: "Hydration",
    excerpt:
      "Cramping isn't random. It's a signal about how you fueled hours before your workout even started.",
    readingTime: "4 min read",
    featured: true,
    image: cramp,
    body: [
      "Most athletes treat cramping as a random surprise mid-workout. It rarely is. Cramps typically follow a pattern that starts hours before you lace up, sometimes the day before.",
      "The most common driver isn't total dehydration. It's an imbalance between how much sodium you lose in sweat and how much you take back in during longer or harder sessions. When your body sweats out more sodium than it replaces, muscle firing gets noisy and unpredictable.",
      "That's why endurance athletes who drink plenty of plain water still cramp. Volume isn't the whole story, composition is. Water without sodium can even dilute what electrolytes you have left, making the problem worse.",
      "The other overlooked variable is your baseline. If you started your training session already low on sodium, magnesium, or glycogen, no amount of sipping mid-workout will catch you up. You're playing defense the whole time.",
      "The fix is boring and effective. Start every session hydrated the day before, not five minutes before. Add electrolytes to what you drink during any effort over 60 minutes. Then rehydrate deliberately, fluids and sodium together, inside the first hour after training.",
      "Cramping is your body sending an invoice for choices you made earlier. Once you see it that way, prevention gets a lot simpler than treatment.",
    ],
    takeaways: [
      "Cramps are usually a sodium balance problem, not a total water problem.",
      "Start hydrated the day before hard sessions, you can't catch up mid-workout.",
      "Add electrolytes to any effort lasting over 60 minutes.",
      "Rehydrate with fluids AND sodium within the first hour after training.",
    ],
  },
  {
    slug: "hydration-myths",
    title: "The three hydration myths still holding athletes back",
    category: "Hydration",
    excerpt:
      "Drink eight glasses. Clear pee is healthy. Water is enough. Here's what the research actually says.",
    readingTime: "5 min read",
    featured: true,
    image: hydrationMyths,
    body: [
      "Hydration advice from the 1990s still dominates locker rooms and gym floors. Some of it is harmless. A surprising amount of it is quietly costing you performance.",
      "Myth one: eight glasses a day works for everyone. Your actual baseline depends on body size, climate, training load, sodium intake, and how much water you're getting from food. A 200-pound athlete training in July needs a very different volume than a 130-pound office worker in January.",
      "Myth two: clear urine means you're well-hydrated. Pale straw is the target. Truly clear urine often means you've over-diluted your electrolytes, a subtle problem that shows up as fatigue, brain fog, and, in extreme cases, hyponatremia.",
      "Myth three: water alone rehydrates you after a hard session. Water without sodium runs through you before your body can put it to work. That's why you can chug a liter after a run and still feel wrung out an hour later. Pair fluids with electrolytes and food and the picture changes.",
      "None of this means hydration is complicated. It means the shortcuts we inherited weren't built for people who actually sweat for a living, or for two hours before dinner.",
    ],
    takeaways: [
      "There is no universal water target, yours depends on size, sweat rate, and climate.",
      "Aim for pale straw urine. Perfectly clear is a warning sign, not a win.",
      "Rehydration = fluids + sodium + food. Water alone isn't enough after hard training.",
    ],
  },
  {
    slug: "science-of-recovery",
    title: "The science of recovery: what your first 60 minutes really matter for",
    category: "Recovery",
    excerpt:
      "The hour after training decides more than the workout itself. Here's how to actually use it.",
    readingTime: "6 min read",
    image: recovery,
    body: [
      "Recovery isn't rest. It's an active biological window your body uses to adapt to the stimulus you just gave it. Skip the window and you're doing the work without collecting the reward.",
      "The first 60 minutes prioritize three things in parallel: glycogen replenishment in your muscles, protein synthesis to repair tissue, and fluid and electrolyte rebalancing. Miss any of the three and the adaptation you trained for slows down.",
      "This doesn't mean you need supplements or shakes. A real meal with carbs and protein does the job. What matters is that it actually happens within the window, not two hours later once you finally shower and answer emails.",
      "Hydration in this window is different from mid-workout hydration. You're not fighting to keep up anymore. You're rebuilding. That means fluids with sodium first, then food, then a few quiet minutes before diving back into your day.",
      "The athletes who plateau usually aren't undertraining. They're under-recovering. The workout was fine. The 60 minutes after it disappeared.",
    ],
    takeaways: [
      "Recovery is active adaptation, not passive rest.",
      "The first 60 minutes matter most: refuel, rebuild, rehydrate.",
      "A real meal beats a supplement stack, as long as it actually happens on time.",
      "Chronic plateaus are usually a recovery problem, not a training problem.",
    ],
  },
  {
    slug: "how-much-water",
    title: "How much water do you actually need?",
    category: "Hydration",
    excerpt: "The honest answer isn't a number, it's a system. Here's how to build yours.",
    readingTime: "4 min read",
    image: howMuchWater,
    body: [
      "Fixed water targets ignore the variables that actually matter: your sweat rate, sodium loss, training intensity, climate, and diet. Two athletes of the same weight can have hydration needs that differ by 40%.",
      "Instead of chasing a number, build a system. Start every day with a full glass before coffee. Drink to thirst between meals. Add electrolytes to any effort over 60 minutes. Rehydrate deliberately after training with both fluids and sodium.",
      "If you want a rough anchor, weigh yourself before and after a hard session. Every pound lost is roughly 16 oz of fluid that needs to come back, plus the sodium that left with it.",
      "The point isn't precision. It's paying attention. Athletes who feel dialed in aren't the ones counting ounces. They're the ones who've built a repeatable ritual.",
    ],
    takeaways: [
      "There's no universal ounces-per-day target, build a repeatable ritual instead.",
      "Weigh yourself before and after hard sessions for a real feedback loop.",
      "Consistency beats precision. Simple habits outperform obsessive tracking.",
    ],
  },
  {
    slug: "performance-habits",
    title: "Six performance habits that quietly beat any supplement",
    category: "Performance",
    excerpt: "The unglamorous stack, sleep, sodium, timing, consistency, that outperforms every shortcut.",
    readingTime: "5 min read",
    image: habits,
    body: [
      "Supplements are the last five percent. Habits are the first ninety-five. The order matters because most athletes reverse it and wonder why nothing works.",
      "Sleep first. It's the single biggest performance lever most people ignore. One hour of consistent extra sleep will out-train any pre-workout on the shelf.",
      "Sodium second. If you sweat for more than an hour and you're not replacing it, you're leaving output on the table. This isn't optional for endurance work.",
      "Consistent training third. Three real sessions a week for six months beats seven perfect sessions for two weeks. Adaptation compounds; heroics don't.",
      "Pre-hydration fourth. What you drink the day before matters more than what you sip during. Show up already topped off.",
      "Post-workout refueling fifth. Use the 60-minute window. Real food, real fluids, real sodium.",
      "Recovery days sixth. They aren't lost days. They're where the adaptation actually happens. Treat them like part of the plan, not a break from it.",
    ],
    takeaways: [
      "Habits deliver 95% of results. Supplements are the last 5%.",
      "Sleep, sodium, and consistency beat every performance product on the market.",
      "Show up already hydrated, you can't catch up mid-workout.",
      "Recovery days are where adaptation happens. Protect them.",
    ],
  },
  {
    slug: "electrolytes-explained",
    title: "Electrolytes explained without the marketing",
    category: "Fueling",
    excerpt:
      "Sodium, potassium, magnesium, what they actually do, and how to tell if you're getting enough.",
    readingTime: "5 min read",
    image: electrolytes,
    body: [
      "Every electrolyte brand claims to fix your performance. Understanding what these minerals actually do makes it easier to see through the noise, and to buy less of it.",
      "Sodium is the workhorse. It keeps your fluid balance and nerve signals steady. It's also what your body loses the most of in sweat, which is why sodium-free hydration falls apart during long sessions.",
      "Potassium works alongside sodium to support muscle contraction and heart rhythm. It's easier to get from food than from a drink, bananas, potatoes, greens, and yogurt do most of the work.",
      "Magnesium plays a quieter role. It supports recovery, muscle relaxation, and sleep quality. Low magnesium often shows up as twitching, poor sleep, or lingering soreness rather than an acute problem.",
      "The ratios matter as much as the amounts. Chugging a supplement heavy in one and light in the others can make you feel worse, not better. Balanced sources, real food plus a well-formulated drink during long efforts, beat mega-dosing any single mineral.",
    ],
    takeaways: [
      "Sodium is the most critical electrolyte for athletes, it's what you lose most in sweat.",
      "Potassium and magnesium are easier to get from food than from drinks.",
      "Ratios matter. Mega-dosing one electrolyte can create new problems.",
      "Real food + a balanced drink during long efforts beats supplement stacks.",
    ],
  },
  {
    slug: "what-your-sweat-says",
    title: "What your sweat is telling you about your training",
    category: "Performance",
    excerpt: "Sweat is feedback, not just a symptom. Reading it changes how you fuel.",
    readingTime: "3 min read",
    image: sweat,
    body: [
      "Salty streaks on your shirt aren't just proof you worked hard. They're a data point. Heavy sodium loss suggests you need to front-load electrolytes rather than chase them mid-session.",
      "Volume matters too. If you finish drenched after a 45-minute session, your fluid needs during any longer effort are going to outpace what a single water bottle can carry. Plan the bottles, not the sips.",
      "Timing is the third signal. If you're sweating heavily in the first ten minutes, your body is telling you it started the session already warm and under-fueled. Adjust the day before, not the moment before.",
      "Once you know your sweat pattern, adjustments get simple: front-load, plan volume, and give your body an easier starting line next time.",
    ],
    takeaways: [
      "Salty sweat = front-load electrolytes before, don't chase them during.",
      "Heavy volume = plan bottle count, not sip frequency.",
      "Sweating hard in the first 10 minutes means yesterday's prep was off.",
    ],
  },
  {
    slug: "sleep-and-performance",
    title: "Why sleep is the performance stack no one is selling you",
    category: "Recovery",
    excerpt:
      "One extra hour of sleep will out-train any supplement. Here's why, and how to actually get it.",
    readingTime: "5 min read",
    image: sleep,
    body: [
      "Sleep is where your body does the work training only starts. Growth hormone spikes, muscle repair kicks in, and the nervous system finally exhales. Skip it and you spend the next day paying interest on training you never fully absorbed.",
      "Research on athletes is remarkably consistent: sleep deprivation lowers reaction time, cuts endurance, and blunts strength gains within days. One study of college basketball players who extended sleep to 10 hours showed measurable improvements in sprint times and shooting accuracy in weeks.",
      "You don't need 10 hours. You need consistency. Going to bed and waking up at the same time, even on weekends, matters more than raw duration for most everyday athletes.",
      "The two easiest levers are light and temperature. Bright light in the morning, dim light after sunset, and a cool bedroom (65 to 68°F) do more for sleep quality than any supplement.",
      "If you train hard and sleep poorly, you're not really training hard. You're just accumulating fatigue.",
    ],
    takeaways: [
      "Sleep is when adaptation actually happens, training is just the stimulus.",
      "Consistency (same bed and wake time) beats raw hours for most athletes.",
      "Morning light, dim evening light, cool bedroom = the free sleep stack.",
      "Poor sleep + hard training = accumulated fatigue, not fitness.",
    ],
  },
  {
    slug: "pre-workout-nutrition",
    title: "What to eat before a workout, and how far ahead",
    category: "Fueling",
    excerpt:
      "The pre-workout meal isn't about hacks. It's about giving your body something to actually work with.",
    readingTime: "5 min read",
    image: preWorkout,
    body: [
      "A good pre-workout meal answers one question: does my body have enough available energy to do the thing I'm about to ask it to do? Most athletes overcomplicate the answer.",
      "For sessions under 60 minutes, you can often train fasted or with something light, a banana, a handful of dates, or half a bowl of oats an hour before is plenty for most people.",
      "For anything longer or more intense, aim for a real meal 2 to 3 hours ahead: carbs for fuel, a moderate amount of protein, and low to moderate fat. Think oatmeal with berries and a scoop of yogurt, or rice with chicken and vegetables.",
      "Timing is the underrated variable. Eating too close to a hard session sends blood to your gut when you need it in your muscles. Eating too far ahead leaves you running on empty. The 2 to 3 hour window is the sweet spot for a meal; 30 to 60 minutes is the window for a small snack.",
      "Caffeine is optional but effective, 60 to 90 minutes before is when most people feel the biggest lift. Add it to your ritual, don't invent a new one around it.",
    ],
    takeaways: [
      "Under 60 min: light snack or fasted is usually fine.",
      "Longer or harder sessions: real meal 2 to 3 hours before.",
      "Small snack in the 30 to 60 min window if the meal was too far back.",
      "Caffeine peaks 60 to 90 minutes after intake, plan accordingly.",
    ],
  },
  {
    slug: "post-workout-window",
    title: "The post-workout window: what actually matters in the first hour",
    category: "Recovery",
    excerpt:
      "Forget shakes and gimmicks. Here's what your body actually wants after a hard session.",
    readingTime: "5 min read",
    image: postWorkout,
    body: [
      "The 'anabolic window' has been oversold for a decade. It's real, but it's wider and simpler than the supplement aisle would have you believe.",
      "Within about 60 minutes of finishing hard training, your body is primed to absorb carbs, protein, fluids, and sodium efficiently. This is when glycogen replenishment is fastest and protein synthesis is most responsive.",
      "A real meal covers all four bases: rice and eggs, a chicken bowl, pasta with meat sauce, a peanut butter sandwich and a glass of milk. You don't need a specialized product to check the boxes.",
      "For hydration, aim for roughly 16 to 24 oz of fluid per pound lost during the session, ideally with sodium in the mix. Plain water alone leaves the recovery incomplete.",
      "The single biggest mistake isn't picking the wrong food. It's skipping the window entirely, showering, answering emails, and eating three hours later. The window closes quietly, and the workout you did loses some of its return.",
    ],
    takeaways: [
      "The window is real but wide, aim for a real meal within 60 minutes.",
      "Cover carbs, protein, fluids, and sodium. No supplement needed.",
      "Replace 16 to 24 oz of fluid per pound lost, ideally with sodium.",
      "Skipping the window entirely is the biggest recovery mistake.",
    ],
  },
  {
    slug: "mental-game-consistency",
    title: "The mental game of showing up, what separates consistent athletes",
    category: "Mindset",
    excerpt:
      "Motivation is a lie you'll get bored of. Here's what actually keeps people training for years.",
    readingTime: "4 min read",
    image: mindset,
    body: [
      "The most consistent athletes aren't the most motivated. They're the ones who built a life where training is the default, not a decision they have to make every morning.",
      "Motivation is a mood. It shows up when you don't need it and vanishes when you do. Consistency comes from systems: a set time, a laid-out bag, a route you don't have to think about, a workout you don't have to plan.",
      "The 'never miss twice' rule is one of the most durable frameworks in behavior change. Missing one session is life. Missing two in a row is the beginning of a new pattern. Protect the second one and the first stops mattering.",
      "Identity beats goals. Athletes who think 'I am someone who trains' outlast athletes who think 'I want to hit this number by December.' Goals expire; identities compound.",
      "The mental game isn't about pushing harder on the days you feel good. It's about being reliable on the days you don't.",
    ],
    takeaways: [
      "Motivation is unreliable. Systems and defaults are what actually work.",
      "Never miss twice, one missed session is life, two is a new pattern.",
      "Identity ('I am an athlete') outlasts any specific goal.",
      "Consistency is defined by your bad days, not your good ones.",
    ],
  },
  {
    slug: "strength-vs-cardio",
    title: "Strength or cardio: how to actually balance both",
    category: "Training",
    excerpt:
      "You don't have to pick a side. You just have to stop training them like they're the same thing.",
    readingTime: "5 min read",
    image: strengthCardio,
    body: [
      "The strength-versus-cardio debate is mostly a straw man. Almost every everyday athlete benefits from both, the trick is running them side by side without one drowning the other out.",
      "Two rules cover most cases. First, prioritize the one you care about more by doing it fresh, ideally on its own day or first in the session. Second, keep the secondary work supportive rather than competitive, hard enough to matter, easy enough not to steal from the primary.",
      "For runners and endurance athletes, that usually means 2 strength sessions per week focused on compound lifts, squats, deadlifts, presses, rows. Not bodybuilding. Not circuits. Real strength work.",
      "For lifters and strength athletes, that usually means 2 conditioning sessions per week, zone-2 cardio for the aerobic base and one shorter, harder effort for the anaerobic side. Skip it and you'll gas out on your own warmup sets a year from now.",
      "The mistake isn't doing both. It's treating both like they need to be maximum effort. Pick a priority, keep the other supportive, and adjust every 8 to 12 weeks.",
    ],
    takeaways: [
      "You don't have to pick a side, but you do have to pick a priority.",
      "Do your priority fresh. Keep the secondary work supportive, not competitive.",
      "Runners: 2 real strength sessions a week (compound lifts).",
      "Lifters: 2 conditioning sessions a week (zone 2 + one harder effort).",
    ],
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}

export function relatedArticles(slug: string, count = 3) {
  return ARTICLES.filter((a) => a.slug !== slug).slice(0, count);
}
