// Single source of truth for ClutchFuel diagnostic.
// Edit copy, scoring, and mapping here — no UI changes needed.

export type AnswerIndex = 0 | 1 | 2 | 3 | 4;

export type OpportunityKey =
  | "pre_workout_hydration"
  | "recovery_routine"
  | "endurance_support"
  | "hydration_consistency"
  | "electrolyte_replacement";

export type GoalKey =
  | "consistent_energy"
  | "better_endurance"
  | "faster_recovery"
  | "better_consistency"
  | "less_cramping";

export interface QuestionDef {
  id: "q1" | "q2" | "q3" | "q4" | "q5";
  prompt: string;
  options: string[]; // index 0..4
}

export const questions: QuestionDef[] = [
  {
    id: "q1",
    prompt: "Which statement sounds most like you during training or competition?",
    options: [
      "I finish feeling strong",
      "I slow down near the end",
      "My energy drops more than I'd like",
      "I struggle to recover between sessions",
      "It depends",
    ],
  },
  {
    id: "q2",
    prompt: "How often do you feel like your body isn't keeping up with your effort?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Almost every workout"],
  },
  {
    id: "q3",
    prompt: "After a hard workout, when do you usually feel ready to perform again?",
    options: [
      "Later that day",
      "The next day",
      "Two days later",
      "Longer than two days",
      "It varies a lot",
    ],
  },
  {
    id: "q4",
    prompt: "Which best describes your training right now?",
    options: [
      "1–2 days/week",
      "3–4 days/week",
      "5–6 days/week",
      "Nearly every day",
      "Multiple sessions most days",
    ],
  },
  {
    id: "q5",
    prompt:
      "If you could improve one thing before your next month of training, what would matter most?",
    options: [
      "More consistent energy",
      "Better endurance",
      "Faster recovery",
      "Better consistency",
      "Less cramping",
    ],
  },
];

export type Answers = {
  q1: AnswerIndex;
  q2: AnswerIndex;
  q3: AnswerIndex;
  q4: AnswerIndex;
  q5: AnswerIndex;
};

// ----- Scoring -----
// Each answer maps to a point delta. Sum + base, clamped to [45, 95].
const SCORE_BASE = 70;
const SCORE_FLOOR = 45;
const SCORE_CEILING = 95;

// Positive = trends with readiness, Negative = trends with opportunity
const q1Points: number[] = [12, -2, -6, -10, -4]; // finish strong → struggle
const q2Points: number[] = [10, 5, -2, -8, -12]; // never → almost every workout
const q3Points: number[] = [8, 4, -4, -10, -2]; // recover fast → slow
const q4Points: number[] = [0, 1, 2, 1, -2]; // training frequency context only

export function computeScore(a: Answers): number {
  const raw = SCORE_BASE + q1Points[a.q1] + q2Points[a.q2] + q3Points[a.q3] + q4Points[a.q4];
  return Math.max(SCORE_FLOOR, Math.min(SCORE_CEILING, Math.round(raw)));
}

// ----- Biggest Opportunity mapping -----
// Evaluated top-to-bottom. First match wins. Fallback at the end.
type Pattern = { match: (a: Answers) => boolean; opportunity: OpportunityKey };

const q1Negative = (i: AnswerIndex) => i === 1 || i === 2 || i === 3;
const q2OftenOrAlways = (i: AnswerIndex) => i === 3 || i === 4;
const q2SometimesOrOften = (i: AnswerIndex) => i === 2 || i === 3;
const q3SameOrNextDay = (i: AnswerIndex) => i === 0 || i === 1;
const q3TwoOrMoreDays = (i: AnswerIndex) => i === 2 || i === 3;
const q4HighFreq = (i: AnswerIndex) => i === 2 || i === 3 || i === 4;
const q4FiveOrMore = (i: AnswerIndex) => i === 2 || i === 3 || i === 4;
const q4LowMod = (i: AnswerIndex) => i === 0 || i === 1;

const patterns: Pattern[] = [
  {
    opportunity: "pre_workout_hydration",
    match: (a) => q1Negative(a.q1) && q2OftenOrAlways(a.q2) && q3SameOrNextDay(a.q3),
  },
  {
    opportunity: "recovery_routine",
    match: (a) => q3TwoOrMoreDays(a.q3) && q2OftenOrAlways(a.q2),
  },
  {
    opportunity: "electrolyte_replacement",
    match: (a) => q1Negative(a.q1) && q4FiveOrMore(a.q4),
  },
  {
    opportunity: "endurance_support",
    match: (a) => (a.q1 === 1 || a.q1 === 2) && q2SometimesOrOften(a.q2) && q4HighFreq(a.q4),
  },
  {
    opportunity: "hydration_consistency",
    match: (a) => a.q1 === 4 && a.q2 === 2 && q4LowMod(a.q4),
  },
];

export function computeOpportunity(a: Answers): OpportunityKey {
  for (const p of patterns) if (p.match(a)) return p.opportunity;
  // Sensible fallback: if mostly positive, point at consistency; else hydration.
  return q1Negative(a.q1) || q2OftenOrAlways(a.q2)
    ? "pre_workout_hydration"
    : "hydration_consistency";
}

// ----- Display labels -----
export const opportunityLabel: Record<OpportunityKey, string> = {
  pre_workout_hydration: "Pre-Workout Hydration",
  recovery_routine: "Recovery Routine",
  endurance_support: "Endurance Support",
  hydration_consistency: "Hydration Consistency",
  electrolyte_replacement: "Electrolyte Replacement",
};

export const goalLabel: Record<GoalKey, string> = {
  consistent_energy: "More consistent energy",
  better_endurance: "Better endurance",
  faster_recovery: "Faster recovery",
  better_consistency: "Better consistency",
  less_cramping: "Less cramping",
};

const goalByIndex: GoalKey[] = [
  "consistent_energy",
  "better_endurance",
  "faster_recovery",
  "better_consistency",
  "less_cramping",
];

export function goalFromAnswers(a: Answers): GoalKey {
  return goalByIndex[a.q5];
}

// ----- Result copy -----
// Paragraph by (goal × opportunity). Falls back to opportunity-only copy.
const opportunityParagraph: Record<OpportunityKey, string> = {
  pre_workout_hydration:
    "You're showing up to sessions already behind on hydration, which makes effort feel heavier than it should. Most athletes notice the second half of a workout improves dramatically once they front-load fluids and electrolytes before training — not during.",
  recovery_routine:
    "Your recovery is the bottleneck right now. Performance days are limited by how you treat the hours after training, not the work itself. A simple post-session refuel routine compounds quickly into more usable training days each week.",
  endurance_support:
    "Your engine is there — it just fades. That late-session drop is almost always a fueling and electrolyte gap, not a fitness gap. Holding output through the back half of sessions is the fastest unlock for athletes who train like you.",
  hydration_consistency:
    "You bounce between feeling great and feeling flat, and that swing is the signal. The athletes who feel locked in week after week aren't drinking more — they're drinking the same way every day. Consistency beats intensity here.",
  electrolyte_replacement:
    "You're training at a volume that outruns plain water. Sodium loss adds up fast, and the symptoms — fatigue, cramping, slow recovery — show up before you'd ever connect them to electrolytes. This is the most fixable piece of your puzzle.",
};

// Optional goal+opportunity overrides. Add as you learn from real athletes.
const goalOpportunityCopy: Partial<Record<`${GoalKey}:${OpportunityKey}`, string>> = {
  "less_cramping:electrolyte_replacement":
    "You said cramping is the thing you want to fix — and the assessment agrees. Your training volume is outrunning your sodium intake, which is the #1 cause of late-session cramping in everyday athletes. Replacing what you sweat out, on schedule, fixes this faster than any stretching routine.",
  "faster_recovery:recovery_routine":
    "You want faster recovery, and recovery is exactly where your biggest gap is. The hours after a hard session shape how you feel the next day more than the session itself. A repeatable post-training refuel changes this within a week.",
};

export function resultParagraph(a: Answers): string {
  const goal = goalFromAnswers(a);
  const opp = computeOpportunity(a);
  return goalOpportunityCopy[`${goal}:${opp}` as const] ?? opportunityParagraph[opp];
}

// ----- First Clutch Move -----
const clutchMoveByOpportunity: Record<OpportunityKey, { title: string; body: string }> = {
  pre_workout_hydration: {
    title: "Drink 16–20 oz of water with electrolytes 60 minutes before your next session.",
    body: "Don't sip during — front-load it. You should be peeing clear once before you start.",
  },
  recovery_routine: {
    title: "Refuel within 30 minutes of finishing your next workout.",
    body: "Fluids + electrolytes + a protein source. Treat the window like part of the session, not after it.",
  },
  endurance_support: {
    title: "Add electrolytes to your bottle for any session over 45 minutes.",
    body: "Plain water dilutes you when you're working hard. Hold output by replacing what you're losing in real time.",
  },
  hydration_consistency: {
    title: "Drink the same baseline every day, training or not.",
    body: "Pick a number — half your bodyweight in ounces is a strong start — and hit it daily for one week.",
  },
  electrolyte_replacement: {
    title: "Replace sodium during and after every hard session.",
    body: "Aim for at least 500mg sodium per hour of intense training. Water alone is making you feel worse, not better.",
  },
};

export function firstClutchMove(a: Answers) {
  return clutchMoveByOpportunity[computeOpportunity(a)];
}
