export type Pillar = "prepare" | "perform" | "recover";

export type OpportunityKey =
  | "recovery"
  | "fueling"
  | "preparation"
  | "energy"
  | "consistency"
  | "focus";

export type AssessmentQuestion = {
  pillar: Pillar;
  key: string;
  opp: OpportunityKey;
  text: string;
};

export const ASSESSMENT_SCALE = [
  "Never",
  "Rarely",
  "Sometimes",
  "Usually",
  "Almost Always",
] as const;

export type ScaleAnswer = (typeof ASSESSMENT_SCALE)[number];

/** 1–5 numeric answers aligned with ASSESSMENT_SCALE indices. */
export type NumericAnswer = 1 | 2 | 3 | 4 | 5;

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    pillar: "prepare",
    key: "sleep_prep",
    opp: "preparation",
    text: "How consistently have you gotten enough quality sleep to feel ready for training or games?",
  },
  {
    pillar: "prepare",
    key: "hydration_prep",
    opp: "preparation",
    text: "How consistently are you drinking enough throughout the day instead of trying to catch up right before practice?",
  },
  {
    pillar: "prepare",
    key: "fueling_prep",
    opp: "fueling",
    text: "How consistently are you eating enough before training or competition to have good energy?",
  },
  {
    pillar: "prepare",
    key: "routine_prep",
    opp: "preparation",
    text: "How consistently do you have a routine before practices or games?",
  },
  {
    pillar: "prepare",
    key: "readiness_prep",
    opp: "preparation",
    text: "How physically ready have you felt when practices or games begin?",
  },
  {
    pillar: "perform",
    key: "energy_perf",
    opp: "energy",
    text: "How consistently have you maintained good energy through practices and games?",
  },
  {
    pillar: "perform",
    key: "focus_perf",
    opp: "focus",
    text: "How locked in have you felt during training and competition?",
  },
  {
    pillar: "perform",
    key: "confidence_perf",
    opp: "focus",
    text: "How confident and prepared have you felt when it's time to compete?",
  },
  {
    pillar: "perform",
    key: "effort_perf",
    opp: "energy",
    text: "How consistently can you maintain your effort when you become tired?",
  },
  {
    pillar: "perform",
    key: "consistency_perf",
    opp: "consistency",
    text: "How often have you felt like the athlete you know you're capable of being?",
  },
  {
    pillar: "recover",
    key: "soreness_rec",
    opp: "recovery",
    text: "How recovered has your body felt before your next practice or game?",
  },
  {
    pillar: "recover",
    key: "postfuel_rec",
    opp: "fueling",
    text: "How consistently do you eat and rehydrate after hard practices or games?",
  },
  {
    pillar: "recover",
    key: "sleep_rec",
    opp: "recovery",
    text: "How consistently do you prioritize sleep after demanding training or competition?",
  },
  {
    pillar: "recover",
    key: "routine_rec",
    opp: "recovery",
    text: "How consistently do you do something intentional to help your body recover?",
  },
  {
    pillar: "recover",
    key: "bounceback_rec",
    opp: "recovery",
    text: "How ready do you usually feel for your next session after a hard training day or game?",
  },
];

export type OpportunityInsight = {
  title: string;
  text: string;
  move: string;
  plan: string[];
};

export const OPPORTUNITY_INSIGHTS: Record<OpportunityKey, OpportunityInsight> = {
  recovery: {
    title: "Recovery",
    text: "You're training consistently, but your recovery habits aren't keeping pace with your workload. Your body may not be getting enough opportunity to adapt to the work.",
    move: "Start your hydration and recovery routine immediately after practice — instead of waiting until you get home several hours later.",
    plan: [
      "Begin recovery within 30 minutes of every hard session",
      "Protect your sleep window on practice and game nights",
      "Check in with your Clutch Score before your next training day",
    ],
  },
  fueling: {
    title: "Fueling",
    text: "Your effort is there, but inconsistent fueling may be making it harder to sustain your energy through a full practice or game.",
    move: "Eat a carbohydrate-rich meal or snack 2–3 hours before your next practice or game.",
    plan: [
      "Eat something within 30–45 minutes after every hard session",
      "Plan your pre-training meal the night before, not the morning of",
      "Keep a snack and water with you on practice and game days",
    ],
  },
  preparation: {
    title: "Preparation",
    text: "You're relying too much on showing up and figuring it out. A more consistent routine before practices and games can help you feel more in control before the work begins.",
    move: "Build a simple pre-practice routine — same warm-up, same mental checklist, every time you step on the court.",
    plan: [
      "Lay out gear and set a pre-practice checklist the night before",
      "Arrive with enough time to run your full warm-up, not a rushed one",
      "Hydrate consistently through the day, not just right before practice",
    ],
  },
  energy: {
    title: "Energy",
    text: "You start strong but have trouble maintaining energy through demanding sessions, especially as fatigue sets in.",
    move: "Add a light snack and extra water in the second half of your day to protect your energy through the final quarter.",
    plan: [
      "Add a small carb + protein snack mid-afternoon on training days",
      "Track how your energy trends across a full practice this week",
      "Prioritize one extra glass of water before every session",
    ],
  },
  consistency: {
    title: "Consistency",
    text: "Your best days are strong. The next step is making those days repeatable instead of occasional.",
    move: "Pick the one habit from this assessment that scored lowest, and track it — just that one — every day this week.",
    plan: [
      "Track one target habit daily using a simple yes/no check-in",
      "Review your week and note what your best day had in common",
      "Retake your Clutch Score in 7 days to see what moved",
    ],
  },
  focus: {
    title: "Focus",
    text: "You're putting in the physical work. A stronger mental preparation routine may help you access it more consistently when it matters.",
    move: "Build a 60-second pre-game routine that gets your mind locked in the same way, every single time.",
    plan: [
      "Use a short breathing or visualization routine before tip-off",
      "Set one specific focus cue for your next game",
      "Reflect for two minutes after each game on what helped you focus",
    ],
  },
};

export type PillarScores = {
  prepare: number;
  perform: number;
  recover: number;
};

export type ClutchScoreResult = {
  overall: number;
  pillars: PillarScores;
  opportunity: OpportunityInsight;
  opportunityKey: OpportunityKey;
  tagline: string;
};

function pillarScore(answers: NumericAnswer[], pillar: Pillar): number {
  const indices = ASSESSMENT_QUESTIONS.map((q, i) => ({ ...q, i })).filter(
    (q) => q.pillar === pillar,
  );
  const sum = indices.reduce((acc, q) => acc + (answers[q.i] ?? 3), 0);
  const min = indices.length;
  const max = indices.length * 5;
  return Math.round(((sum - min) / (max - min)) * 100);
}

export function scoreTagline(overall: number): string {
  if (overall >= 80) return "You're building strong habits.";
  if (overall >= 60) return "You're building a solid foundation.";
  return "There's real opportunity ahead.";
}

export function computeClutchScore(answers: NumericAnswer[]): ClutchScoreResult {
  const prepare = pillarScore(answers, "prepare");
  const perform = pillarScore(answers, "perform");
  const recover = pillarScore(answers, "recover");
  const overall = Math.round(prepare * 0.35 + perform * 0.35 + recover * 0.3);

  let lowestIdx = 0;
  let lowestVal = 6;
  ASSESSMENT_QUESTIONS.forEach((q, i) => {
    const v = answers[i] ?? 3;
    if (v < lowestVal) {
      lowestVal = v;
      lowestIdx = i;
    }
  });

  const opportunityKey = ASSESSMENT_QUESTIONS[lowestIdx].opp;
  const opportunity = OPPORTUNITY_INSIGHTS[opportunityKey];

  return {
    overall,
    pillars: { prepare, perform, recover },
    opportunity,
    opportunityKey,
    tagline: scoreTagline(overall),
  };
}

export function numericToScaleLabel(value: NumericAnswer): ScaleAnswer {
  return ASSESSMENT_SCALE[value - 1];
}

/** Maps first five answers to legacy q1–q5 columns for Supabase. */
export function legacyQuestionFields(answers: NumericAnswer[]) {
  return {
    q1: numericToScaleLabel(answers[0] ?? 3),
    q2: numericToScaleLabel(answers[1] ?? 3),
    q3: numericToScaleLabel(answers[2] ?? 3),
    q4: numericToScaleLabel(answers[3] ?? 3),
    q5: numericToScaleLabel(answers[4] ?? 3),
  };
}
