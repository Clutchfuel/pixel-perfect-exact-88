import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { submitAssessment } from "@/lib/assessment.functions";
import { SegmentedClutchRing } from "@/components/clutch-score/ScoreRing";
import { toast } from "sonner";

function generateSessionToken(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${crypto.randomUUID()}${crypto.randomUUID()}`.replace(/-/g, "");
  }
  return (
    Math.random().toString(36).slice(2) +
    Math.random().toString(36).slice(2) +
    Date.now().toString(36)
  );
}

/* ---------- Goals (outcome-based labels) ---------- */

const GOALS = [
  { id: "energy", label: "More Energy" },
  { id: "cramping", label: "Fewer Cramps" },
  { id: "recover", label: "Faster Recovery" },
  { id: "endurance", label: "Greater Endurance" },
  { id: "consistency", label: "Improved Daily Performance" },
  { id: "feel", label: "Better Hydration" },
] as const;
type GoalId = (typeof GOALS)[number]["id"];

const ATHLETE_TYPES = [
  "Runner",
  "Basketball",
  "Strength",
  "HYROX",
  "Cycling",
  "General Fitness",
] as const;
type AthleteType = (typeof ATHLETE_TYPES)[number];

/* ---------- Habit questions ---------- */

const ANSWERS = ["Never", "Rarely", "Sometimes", "Often", "Always"] as const;
type Answer = (typeof ANSWERS)[number];

const QUESTIONS = [
  "How often do you cramp during training?",
  "How often do you finish workouts feeling dehydrated?",
  "How often do you use electrolytes during training?",
  "How often do you feel your hydration strategy is working?",
  "How often do you recover well after intense sessions?",
] as const;

const SOURCES = [
  "Run Club",
  "Event",
  "Instagram",
  "TikTok",
  "Google",
  "Friend / Word of Mouth",
  "Other",
] as const;

const pts = (a: Answer) => ANSWERS.indexOf(a);
const isOftenOrAlways = (a: Answer) => a === "Often" || a === "Always";
const isNeverOrRarely = (a: Answer) => a === "Never" || a === "Rarely";

type Opportunity = "Hydration Timing" | "Electrolyte Use" | "Recovery & Cramping" | "Consistency";

const NEXT_STEP: Record<Opportunity, Partial<Record<GoalId, string>> & { default: string }> = {
  "Hydration Timing": {
    default:
      "Drink electrolytes 15 to 30 minutes before training, not just during. Try it for your next 3 sessions.",
    endurance:
      "If you want to build endurance, pre-hydrate 20 to 30 minutes before your long sessions, sodium in, then start. Small change, big change in the back half.",
    energy:
      "If you want more energy in workouts, hydrate 20 minutes before you train. Most 'low energy' sessions start under-fueled on fluid.",
  },
  "Electrolyte Use": {
    default:
      "Add electrolytes to your next 3 workouts, even short ones. Consistency matters more than amount.",
    cramping:
      "If the goal is to stop cramping, add electrolytes to every session for the next 2 weeks, even the short ones. This is the single highest-leverage change for you.",
    endurance:
      "Building endurance is a sodium problem as much as a mileage problem. Add electrolytes to every session over 45 minutes.",
  },
  "Recovery & Cramping": {
    default: "Rehydrate within 60 minutes after training, even if you don't feel thirsty yet.",
    recover:
      "To recover faster, rehydrate with sodium within 60 minutes of finishing. Water alone isn't recovery — it's dilution.",
    cramping:
      "To stop cramping, rebuild sodium within an hour of training. Cramps tomorrow are usually a recovery problem from today.",
  },
  Consistency: {
    default:
      "You're close. Lock in electrolytes before every session this week and notice the difference.",
    consistency:
      "You're already consistent with training. Now make hydration equally boring: same routine, before every session, for 2 weeks.",
    feel:
      "You want to feel better after workouts. That comes from doing the small stuff every time, pre-hydrate, then train. Two weeks.",
    energy:
      "You're close. Make pre-workout hydration a non-negotiable habit for 2 weeks — that's usually where the energy shows up.",
  },
};

function goalLabel(id: GoalId | null | undefined): string {
  if (!id) return "";
  return GOALS.find((g) => g.id === id)?.label ?? "";
}

/** Combines the selected goal chips with the free-text "Other" goal, if any. */
function combinedGoalsLabel(ids: GoalId[], other: string): string {
  const base = ids.map((id) => goalLabel(id)).filter(Boolean);
  const trimmedOther = other.trim();
  if (trimmedOther) base.push(trimmedOther);
  if (!base.length) return "Performance";
  return base.join(" · ");
}

function scoreStatus(score: number): string {
  if (score >= 85) return "Elite Alignment";
  if (score >= 70) return "Strong Alignment";
  if (score >= 55) return "Building Momentum";
  return "Room to Align";
}

type BehaviorPillar = "Hydration" | "Recovery" | "Training" | "Nutrition" | "Consistency";

/** Maps scoring opportunity → the behavior pillar users see. */
function opportunityPillar(opportunity: Opportunity): BehaviorPillar {
  if (opportunity === "Hydration Timing") return "Hydration";
  if (opportunity === "Electrolyte Use") return "Nutrition";
  if (opportunity === "Recovery & Cramping") return "Recovery";
  return "Consistency";
}

const OPPORTUNITY_INSIGHT: Record<
  BehaviorPillar,
  { description: string; whyItMatters: string }
> = {
  Hydration: {
    description:
      "Based on your responses, improving your hydration habits will have the greatest impact on your performance.",
    whyItMatters:
      "Hydration influences energy, focus, and how well you hold up through a session. Getting this right helps you train harder and finish stronger.",
  },
  Recovery: {
    description:
      "Based on your responses, improving your recovery habits will have the greatest impact on your performance.",
    whyItMatters:
      "Recovery influences how well you train, adapt, and perform. Improving this area will help you recover faster, reduce soreness, and be ready for your next workout.",
  },
  Training: {
    description:
      "Based on your responses, refining your training habits will have the greatest impact on your performance.",
    whyItMatters:
      "Training quality compounds when intensity, recovery, and consistency stay in balance. Focusing here sharpens how you show up for every session.",
  },
  Nutrition: {
    description:
      "Based on your responses, improving your nutrition and electrolyte habits will have the greatest impact on your performance.",
    whyItMatters:
      "What you put in before and during training shapes energy, cramp risk, and how you feel afterward. This is one of the highest-leverage places to improve.",
  },
  Consistency: {
    description:
      "Based on your responses, building consistency is the highest-impact habit to improve right now.",
    whyItMatters:
      "Small behaviors repeated over time beat occasional perfection. Locking in one reliable routine is what turns insights into lasting performance gains.",
  },
};

/** Structured result payload — UI renders fields independently (no goal string splicing). */
type ResultInsight = {
  goal: string;
  biggestOpportunity: BehaviorPillar;
  headline: string;
  description: string;
  whyItMatters: string;
  firstClutchMove: string;
};

function buildResultInsight(
  opportunity: Opportunity,
  nextStep: string,
  goals: GoalId[],
  goalOther: string,
): ResultInsight {
  const biggestOpportunity = opportunityPillar(opportunity);
  const insight = OPPORTUNITY_INSIGHT[biggestOpportunity];
  return {
    goal: combinedGoalsLabel(goals, goalOther),
    biggestOpportunity,
    headline: biggestOpportunity,
    description: insight.description,
    whyItMatters: insight.whyItMatters,
    firstClutchMove: nextStep,
  };
}

type BehaviorContribution = {
  id: string;
  color: string;
  level: number;
  fill: number;
};

function adjustedScores(answers: Answer[]): number[] {
  return answers.map((a, i) => (i < 2 ? 4 - pts(a) : pts(a)));
}

function toLevel(raw: number): number {
  return Math.max(0, Math.min(5, Math.round((raw / 4) * 5)));
}

/** Behavior contributions for the goal-alignment model (not health grades). */
function behaviorContributions(
  answers: Answer[],
  opportunity?: Opportunity,
): BehaviorContribution[] {
  const a = adjustedScores(answers);
  const mean = (...vals: number[]) => vals.reduce((s, v) => s + v, 0) / vals.length;

  const hydration = mean(a[1], a[3]);
  const recovery = mean(a[0], a[4]);
  const training = mean(a[3], a[4]);
  const nutrition = a[2];
  const consistency = mean(...a);

  const raw: BehaviorContribution[] = [
    { id: "Hydration", color: "#c1ff00", level: toLevel(hydration), fill: hydration / 4 },
    { id: "Recovery", color: "#f5c542", level: toLevel(recovery), fill: recovery / 4 },
    { id: "Training", color: "#4da3ff", level: toLevel(training), fill: training / 4 },
    { id: "Nutrition", color: "#a78bfa", level: toLevel(nutrition), fill: nutrition / 4 },
    { id: "Consistency", color: "#d4d4d4", level: toLevel(consistency), fill: consistency / 4 },
  ];

  // Keep the scored opportunity visually lowest so the ring matches the story.
  if (opportunity) {
    const focus = opportunityPillar(opportunity);
    const focused = raw.find((b) => b.id === focus);
    if (focused) {
      const othersMin = Math.min(...raw.filter((b) => b.id !== focus).map((b) => b.fill));
      if (focused.fill >= othersMin) {
        focused.fill = Math.max(0.12, othersMin - 0.18);
        focused.level = Math.max(1, Math.min(focused.level, Math.round(focused.fill * 5)));
      }
    }
  }

  return raw;
}

function ContributionDots({
  level,
  color,
  empty = "rgba(255,255,255,0.15)",
}: {
  level: number;
  color: string;
  empty?: string;
}) {
  return (
    <span className="inline-flex gap-1" aria-label={`${level} of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className="h-2.5 w-2.5 rounded-full"
          style={{
            backgroundColor: i < level ? color : empty,
          }}
        />
      ))}
    </span>
  );
}

function computeResult(answers: Answer[], goals: GoalId[]) {
  const adjusted = adjustedScores(answers);
  const sum = adjusted.reduce((s, v) => s + v, 0);
  const clutch_score = Math.min(100, Math.round((sum / 20) * 100) + 10);
  const [q1, , q3, q4, q5] = answers;

  let opportunity: Opportunity;
  if (isOftenOrAlways(q3) && isNeverOrRarely(q4)) opportunity = "Hydration Timing";
  else if (isNeverOrRarely(q3)) opportunity = "Electrolyte Use";
  else if (isOftenOrAlways(q1) || isNeverOrRarely(q5)) opportunity = "Recovery & Cramping";
  else opportunity = "Consistency";

  const copy = NEXT_STEP[opportunity];
  // Prefer the first selected goal that has specialized coaching copy.
  const matched = goals.find((g) => copy[g]);
  const next_step = (matched && copy[matched]) || copy.default;
  return { clutch_score, opportunity, next_step };
}

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

function scrollToAssessment() {
  document.getElementById("clutch-assessment")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function emitPhase(phase: string) {
  window.dispatchEvent(new CustomEvent("clutch-score:phase", { detail: { phase } }));
}

/* ---------- State machine ---------- */

type Step =
  | { kind: "goal" }
  | { kind: "athlete" }
  | { kind: "quiz"; index: number }
  | {
      kind: "result";
      score: number;
      opportunity: Opportunity;
      nextStep: string;
      goals: GoalId[];
      goalOther: string;
      athleteType: AthleteType | null;
      athleteOther: string;
      answers: Answer[];
    };

export function Assessment() {
  const [step, setStep] = useState<Step>({ kind: "goal" });
  const [goals, setGoals] = useState<GoalId[]>([]);
  const [goalOther, setGoalOther] = useState("");
  const [athleteType, setAthleteType] = useState<AthleteType | null>(null);
  const [athleteOther, setAthleteOther] = useState("");
  const [answers, setAnswers] = useState<(Answer | null)[]>([null, null, null, null, null]);

  useEffect(() => {
    emitPhase(step.kind);
  }, [step.kind]);

  return (
    <div className={`mx-auto w-full ${step.kind === "result" ? "max-w-2xl" : "max-w-xl"}`}>
      {step.kind === "goal" && (
        <GoalStep
          selected={goals}
          onChange={setGoals}
          otherValue={goalOther}
          onOtherChange={setGoalOther}
          onContinue={() => setStep({ kind: "athlete" })}
        />
      )}

      {step.kind === "athlete" && (
        <AthleteStep
          goals={goals}
          goalOther={goalOther}
          selected={athleteType}
          otherValue={athleteOther}
          onSelect={(t) => {
            setAthleteType(t);
            setAthleteOther("");
            setStep({ kind: "quiz", index: 0 });
          }}
          onSelectOther={(text) => {
            setAthleteType(null);
            setAthleteOther(text);
            setStep({ kind: "quiz", index: 0 });
          }}
          onBack={() => setStep({ kind: "goal" })}
        />
      )}

      {step.kind === "quiz" && (
        <Quiz
          index={step.index}
          answers={answers}
          onAnswer={(value) => {
            const next = [...answers];
            next[step.index] = value;
            setAnswers(next);
            if (step.index < QUESTIONS.length - 1) {
              setStep({ kind: "quiz", index: step.index + 1 });
            } else {
              const result = computeResult(next as Answer[], goals);
              setStep({
                kind: "result",
                score: result.clutch_score,
                opportunity: result.opportunity,
                nextStep: result.next_step,
                goals,
                goalOther,
                athleteType,
                athleteOther,
                answers: next as Answer[],
              });
            }
          }}
          onBack={() => {
            if (step.index > 0) setStep({ kind: "quiz", index: step.index - 1 });
            else setStep({ kind: "athlete" });
          }}
        />
      )}

      {step.kind === "result" && (
        <Result
          score={step.score}
          opportunity={step.opportunity}
          nextStep={step.nextStep}
          goals={step.goals}
          goalOther={step.goalOther}
          athleteType={step.athleteType}
          athleteOther={step.athleteOther}
          answers={step.answers}
          onRetake={() => {
            setGoals([]);
            setGoalOther("");
            setAthleteType(null);
            setAthleteOther("");
            setAnswers([null, null, null, null, null]);
            setStep({ kind: "goal" });
            scrollToAssessment();
          }}
        />
      )}
    </div>
  );
}

/* ---------- Steps ---------- */

function StepHeader({
  step,
  total,
  onBack,
  fillWithinStep = 1,
}: {
  step: number;
  total: number;
  onBack?: () => void;
  fillWithinStep?: number;
}) {
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div
          className="flex flex-1 gap-1.5"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={step}
          aria-label={`Step ${step} of ${total}`}
        >
          {Array.from({ length: total }, (_, i) => {
            const n = i + 1;
            const complete = n < step;
            const current = n === step;
            const width = complete ? "100%" : current ? `${Math.max(8, fillWithinStep * 100)}%` : "0%";
            return (
              <div key={n} className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/[0.10]">
                <div
                  className="h-full rounded-full bg-electric transition-all duration-300"
                  style={{ width }}
                />
              </div>
            );
          })}
        </div>
        {onBack && (
          <button
            onClick={onBack}
            className="shrink-0 text-xs uppercase tracking-eyebrow text-muted-foreground/80 hover:text-foreground"
            type="button"
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}

function useSelectThenAdvance<T>(onSelect: (value: T) => void, delayMs = 180) {
  const [pending, setPending] = useState<T | null>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    if (pending === null) return;
    const id = window.setTimeout(() => {
      onSelectRef.current(pending);
      setPending(null);
    }, delayMs);
    return () => window.clearTimeout(id);
  }, [pending, delayMs]);

  return {
    selected: pending,
    choose: (value: T) => setPending(value),
  };
}

function OtherToggle({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex min-h-[4.5rem] w-full items-center rounded-2xl border px-5 py-5 text-left text-base font-semibold transition active:scale-[0.99] ${
        active
          ? "border-electric bg-electric text-black shadow-[0_0_0_1px_rgba(157,255,61,0.35)]"
          : "border-black/10 bg-black/[0.03] text-foreground hover:border-black/30 hover:bg-black/[0.06]"
      }`}
    >
      {label}
    </button>
  );
}

function GoalStep({
  selected,
  onChange,
  otherValue,
  onOtherChange,
  onContinue,
}: {
  selected: GoalId[];
  onChange: (goals: GoalId[]) => void;
  otherValue: string;
  onOtherChange: (value: string) => void;
  onContinue: () => void;
}) {
  const toggle = (id: GoalId) => {
    onChange(
      selected.includes(id) ? selected.filter((g) => g !== id) : [...selected, id],
    );
  };
  const [otherOpen, setOtherOpen] = useState(otherValue.trim().length > 0);
  const canContinue = selected.length > 0 || otherValue.trim().length > 0;

  return (
    <section>
      <StepHeader step={1} total={3} />
      <p className="text-xs uppercase tracking-eyebrow text-electric-dark">
        Let's start with what matters to you
      </p>
      <h2 className="mt-3 text-balance text-3xl font-bold leading-tight sm:text-4xl">
        What are you trying to achieve?
      </h2>
      <p className="mt-3 text-base text-muted-foreground">
        Select all that apply. We'll build your insight around your goals.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {GOALS.map((g) => {
          const active = selected.includes(g.id);
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => toggle(g.id)}
              aria-pressed={active}
              className={`flex min-h-[4.5rem] w-full items-center rounded-2xl border px-5 py-5 text-left text-base font-semibold transition active:scale-[0.99] ${
                active
                  ? "border-electric bg-electric text-black shadow-[0_0_0_1px_rgba(157,255,61,0.35)]"
                  : "border-black/10 bg-black/[0.03] text-foreground hover:border-black/30 hover:bg-black/[0.06]"
              }`}
            >
              {g.label}
            </button>
          );
        })}
        <OtherToggle
          label="Other"
          active={otherOpen}
          onClick={() => setOtherOpen(true)}
        />
      </div>

      {otherOpen && (
        <input
          type="text"
          value={otherValue}
          onChange={(e) => onOtherChange(e.target.value)}
          placeholder="Tell us your goal"
          className="mt-3 w-full rounded-2xl border border-black/10 bg-black/[0.03] px-5 py-4 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-electric focus:outline-none"
        />
      )}

      <button
        type="button"
        disabled={!canContinue}
        onClick={onContinue}
        className="mt-8 w-full rounded-full bg-electric px-6 py-4 text-sm font-semibold text-black transition hover:bg-electric-dark disabled:cursor-not-allowed disabled:opacity-40"
      >
        Continue
      </button>
    </section>
  );
}

function AthleteStep({
  goals,
  goalOther,
  selected,
  otherValue,
  onSelect,
  onSelectOther,
  onBack,
}: {
  goals: GoalId[];
  goalOther: string;
  selected: AthleteType | null;
  otherValue: string;
  onSelect: (t: AthleteType) => void;
  onSelectOther: (text: string) => void;
  onBack: () => void;
}) {
  const { selected: pending, choose } = useSelectThenAdvance(onSelect);
  const [otherOpen, setOtherOpen] = useState(otherValue.trim().length > 0 && !selected);
  const [otherText, setOtherText] = useState(otherValue);

  return (
    <section>
      <StepHeader step={2} total={3} onBack={onBack} />
      <p className="text-xs uppercase tracking-eyebrow text-electric-dark">
        A little about how you train
      </p>
      {(goals.length > 0 || goalOther.trim().length > 0) && (
        <p className="mt-2 text-sm text-muted-foreground">
          Goals · <span className="text-foreground">{combinedGoalsLabel(goals, goalOther)}</span>
        </p>
      )}
      <h2 className="mt-3 text-balance text-3xl font-bold leading-tight sm:text-4xl">
        What kind of athlete are you?
      </h2>
      <p className="mt-3 text-base text-muted-foreground">Pick the closest fit.</p>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {ATHLETE_TYPES.map((t) => {
          const active = selected === t || pending === t;
          return (
            <button
              key={t}
              type="button"
              onClick={() => choose(t)}
              disabled={pending !== null}
              className={`w-full rounded-2xl border px-5 py-5 text-left text-base font-semibold transition active:scale-[0.99] disabled:cursor-wait ${
                active
                  ? "border-electric bg-electric text-black"
                  : "border-black/10 bg-black/[0.03] text-foreground hover:border-black/30 hover:bg-black/[0.06]"
              }`}
            >
              {t}
            </button>
          );
        })}
        <OtherToggle
          label="Other"
          active={otherOpen}
          onClick={() => setOtherOpen(true)}
        />
      </div>

      {otherOpen && (
        <div className="mt-4">
          <input
            type="text"
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
            placeholder="Tell us how you train"
            className="w-full rounded-2xl border border-black/10 bg-black/[0.03] px-5 py-4 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-electric focus:outline-none"
          />
          <button
            type="button"
            disabled={otherText.trim().length === 0}
            onClick={() => onSelectOther(otherText.trim())}
            className="mt-3 w-full rounded-full bg-electric px-6 py-4 text-sm font-semibold text-black transition hover:bg-electric-dark disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue
          </button>
        </div>
      )}
    </section>
  );
}

function Quiz({
  index,
  answers,
  onAnswer,
  onBack,
}: {
  index: number;
  answers: (Answer | null)[];
  onAnswer: (a: Answer) => void;
  onBack: () => void;
}) {
  const { selected: pending, choose } = useSelectThenAdvance(onAnswer);
  const fill = (index + 1) / QUESTIONS.length;

  return (
    <section>
      <StepHeader step={3} total={3} onBack={onBack} fillWithinStep={fill} />
      <p className="text-xs uppercase tracking-eyebrow text-electric-dark">
        Habit {index + 1} of {QUESTIONS.length}
      </p>
      <h2 className="mt-3 text-balance text-3xl font-bold leading-tight sm:text-4xl">
        {QUESTIONS[index]}
      </h2>
      <div className="mt-8 flex flex-col gap-3">
        {ANSWERS.map((a) => {
          const active = answers[index] === a || pending === a;
          return (
            <button
              key={a}
              type="button"
              onClick={() => choose(a)}
              disabled={pending !== null}
              className={`w-full rounded-2xl border px-5 py-4 text-left text-base font-semibold transition active:scale-[0.99] disabled:cursor-wait ${
                active
                  ? "border-electric bg-electric text-black"
                  : "border-black/10 bg-black/[0.03] text-foreground hover:border-black/30 hover:bg-black/[0.06]"
              }`}
            >
              {a}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function Result({
  score,
  opportunity,
  nextStep,
  goals,
  goalOther,
  athleteType,
  athleteOther,
  answers,
  onRetake,
}: {
  score: number;
  opportunity: Opportunity;
  nextStep: string;
  goals: GoalId[];
  goalOther: string;
  athleteType: AthleteType | null;
  athleteOther: string;
  answers: Answer[];
  onRetake: () => void;
}) {
  const status = scoreStatus(score);
  const behaviors = behaviorContributions(answers, opportunity);
  const insight = buildResultInsight(opportunity, nextStep, goals, goalOther);
  const totalGoalCount = goals.length + (goalOther.trim().length > 0 ? 1 : 0);

  useEffect(() => {
    // Intro collapses on result phase; reset so the score ring is above the fold.
    scrollToTop();
    const id = window.setTimeout(scrollToTop, 50);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section className="space-y-14 pb-8 sm:space-y-16">
      {/* Score hero */}
      <FadeIn>
        <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-[#070707] px-6 py-14 text-center sm:px-10 sm:py-20">
          <SegmentedClutchRing score={score} segments={behaviors} />
          <p className="mt-10 text-sm font-semibold uppercase tracking-[0.22em] text-[#c1ff00]">
            {status}
          </p>
          <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-white/40">
            How well your current behaviors support your goal
            {totalGoalCount > 1 ? "s" : ""}.
          </p>
        </div>
      </FadeIn>

      {/* Your Goal — metadata only */}
      <FadeIn delay={0.06}>
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            {totalGoalCount > 1 ? "Your Goals" : "Your Goal"}
          </p>
          <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
            {insight.goal}
          </h2>
        </div>
      </FadeIn>

      {/* Biggest Opportunity */}
      <FadeIn delay={0.1}>
        <div className="rounded-[2rem] border border-black/10 bg-white px-8 py-10 sm:px-12 sm:py-12">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-electric-dark">
            Your Biggest Opportunity
          </p>
          <h3 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {insight.headline}
          </h3>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {insight.description}
          </p>
        </div>
      </FadeIn>

      {/* Why This Matters */}
      <FadeIn delay={0.14}>
        <div className="rounded-[2rem] border border-black/10 bg-muted/50 px-8 py-10 sm:px-12 sm:py-12">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Why This Matters
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground sm:text-xl">
            {insight.whyItMatters}
          </p>
        </div>
      </FadeIn>

      {/* First Clutch Move */}
      <FadeIn delay={0.18}>
        <div className="rounded-[2rem] border border-[#c1ff00]/35 bg-[#070707] px-8 py-10 text-white sm:px-12 sm:py-12">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#c1ff00]">
            First Clutch Move
          </p>
          <p className="mt-5 text-xl font-semibold leading-snug sm:text-2xl">
            {insight.firstClutchMove}
          </p>
          <p className="mt-5 text-sm text-white/40">One action for the next 24 hours.</p>
        </div>
      </FadeIn>

      {/* How Your Score Was Built */}
      <FadeIn delay={0.22}>
        <div className="rounded-[2rem] border border-black/10 bg-white px-8 py-10 sm:px-12 sm:py-12">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            How Your Score Was Built
          </p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            These are the behaviors influencing your score.
          </p>
          <ul className="mt-10 space-y-5">
            {behaviors.map((b) => (
              <li key={b.id} className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-3 text-sm font-semibold text-foreground">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: b.color }}
                    aria-hidden
                  />
                  {b.id}
                </span>
                <ContributionDots
                  level={b.level}
                  color={b.color}
                  empty="rgba(0,0,0,0.12)"
                />
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>

      <FadeIn delay={0.26}>
        <EmailCapture
          answers={answers}
          goals={goals}
          goalOther={goalOther}
          athleteType={athleteType}
          athleteOther={athleteOther}
          score={score}
          opportunity={opportunity}
          nextStep={nextStep}
        />
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="text-center">
          <button
            type="button"
            onClick={onRetake}
            className="text-sm font-medium text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline"
          >
            Retake Assessment
          </button>
        </div>
      </FadeIn>
    </section>
  );
}

function EmailCapture({
  answers,
  goals,
  goalOther,
  athleteType,
  athleteOther,
  score,
  opportunity,
  nextStep,
}: {
  answers: Answer[];
  goals: GoalId[];
  goalOther: string;
  athleteType: AthleteType | null;
  athleteOther: string;
  score: number;
  opportunity: Opportunity;
  nextStep: string;
}) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("");
  const [sourceOther, setSourceOther] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return toast.error("Email is required");
    if (!trimmedEmail.includes("@") || trimmedEmail.length < 5) {
      return toast.error("Enter a valid email address.");
    }

    setSubmitting(true);
    const sessionToken = generateSessionToken();
    const sourceValue =
      source === "Other" && sourceOther.trim()
        ? `Other: ${sourceOther.trim()}`
        : source || null;
    const goalValue = combinedGoalsLabel(goals, goalOther) || null;
    const athleteTypeValue =
      athleteType ?? (athleteOther.trim() ? `Other: ${athleteOther.trim()}` : null);

    const payload = {
      first_name: firstName.trim() || null,
      email: trimmedEmail,
      source: sourceValue,
      goal: goalValue,
      athlete_type: athleteTypeValue,
      q1: answers[0],
      q2: answers[1],
      q3: answers[2],
      q4: answers[3],
      q5: answers[4],
      clutch_score: score,
      opportunity,
      next_step: nextStep,
      session_token: sessionToken,
    };

    try {
      await submitAssessment({ data: payload });
      setSaved(true);
      toast.success("You're on the list.");
    } catch (err) {
      console.error("[Clutch Score] save error:", err);
      const message = err instanceof Error ? err.message : "";
      toast.error(
        message.length > 0 && message.length < 120
          ? message
          : "Couldn't save your details. Try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (saved) {
    return (
      <div className="rounded-[2rem] border border-black/10 bg-[#070707] px-6 py-12 text-center text-white sm:px-10">
        <p className="text-2xl font-bold">You're in.</p>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/55">
          Watch for Clutch Moves and performance insights. We'll check in in two weeks to see how
          your first move is landing.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-black/10 bg-white px-6 py-10 sm:px-10 sm:py-12">
      <h3 className="text-center text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        Keep Improving
      </h3>
      <p className="mx-auto mt-4 max-w-md text-center text-base leading-relaxed text-muted-foreground">
        Join the ClutchFuel community to receive personalized performance insights, weekly Clutch
        Moves, new assessment tools, and early access to everything we're building.
      </p>

      <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          className="w-full rounded-2xl border border-black/10 bg-black/[0.03] px-5 py-4 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-electric focus:outline-none"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full rounded-2xl border border-black/10 bg-black/[0.03] px-5 py-4 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-electric focus:outline-none"
        />

        <div className="pt-1">
          <p className="text-center text-xs text-muted-foreground">
            How did you hear about us? (optional)
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {SOURCES.map((s) => {
              const active = source === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSource((prev) => (prev === s ? "" : s))}
                  className={`rounded-full border px-3.5 py-2 text-sm font-medium transition ${
                    active
                      ? "border-electric bg-electric text-black"
                      : "border-black/10 bg-black/[0.03] text-foreground hover:border-black/30"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
          {source === "Other" && (
            <input
              type="text"
              value={sourceOther}
              onChange={(e) => setSourceOther(e.target.value)}
              placeholder="Tell us where (optional)"
              className="mt-3 w-full rounded-2xl border border-black/10 bg-black/[0.03] px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-electric focus:outline-none"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-3 w-full rounded-full bg-electric px-8 py-4 text-base font-semibold text-black transition hover:bg-electric-dark disabled:opacity-60"
        >
          {submitting ? "Saving..." : "Unlock My Performance Insights"}
        </button>
      </form>
    </div>
  );
}
