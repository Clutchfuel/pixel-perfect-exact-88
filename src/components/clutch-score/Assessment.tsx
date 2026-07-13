import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { submitFeedback } from "@/lib/feedback.functions";
import { ATHLETE_TYPES, type AthleteType } from "@/data/athlete-types";
import { toast } from "sonner";

function generateSessionToken(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${crypto.randomUUID()}${crypto.randomUUID()}`.replace(/-/g, "");
  }
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return generateSessionToken().slice(0, 36);
}

const GOALS = [
  { id: "energy", label: "Have more energy during workouts" },
  { id: "cramping", label: "Stop cramping" },
  { id: "recover", label: "Recover faster" },
  { id: "endurance", label: "Build endurance" },
  { id: "strength", label: "Get stronger" },
  { id: "weight", label: "Lose weight without sacrificing performance" },
  { id: "gameday", label: "Improve game-day performance" },
  { id: "consistency", label: "Stay consistent" },
  { id: "hyrox", label: "Prepare for my first HYROX" },
  { id: "5k", label: "Run a faster 5K" },
  { id: "basketball", label: "Train for basketball season" },
  { id: "feel", label: "Simply feel better after workouts" },
] as const;
type GoalId = (typeof GOALS)[number]["id"];

const ANSWERS = ["Never", "Rarely", "Sometimes", "Often", "Always"] as const;
type Answer = (typeof ANSWERS)[number];

type Pillar = "Hydration" | "Recovery" | "Nutrition" | "Consistency" | "Sleep";

const QUESTIONS: readonly {
  pillar: Pillar;
  prompt: string;
  coach: string;
  /** Higher answer index = better habit when true; false = inverted (bad symptom). */
  positive: boolean;
}[] = [
  {
    pillar: "Hydration",
    prompt: "How often do hard sessions leave you feeling drained — dry mouth, heavy legs, foggy head?",
    coach: "Be honest. Most athletes under-drink without realizing it.",
    positive: false,
  },
  {
    pillar: "Recovery",
    prompt: "How often are you bouncing back ready for the next session within a day or two?",
    coach: "Recovery is where the gains actually land.",
    positive: true,
  },
  {
    pillar: "Nutrition",
    prompt: "How often do you get protein and real fuel within an hour after training?",
    coach: "The window after a workout is when your body is listening hardest.",
    positive: true,
  },
  {
    pillar: "Consistency",
    prompt: "How often do you actually show up for the workouts you planned this week?",
    coach: "Consistency beats intensity when the calendar gets busy.",
    positive: true,
  },
  {
    pillar: "Sleep",
    prompt: "How often do you get a full night of sleep before a tough training day?",
    coach: "Sleep is the cheapest performance upgrade most athletes skip.",
    positive: true,
  },
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

const ANALYZE_LINES = [
  "Analyzing your performance habits...",
  "Comparing your responses...",
  "Building your Clutch Score...",
] as const;

type Opportunity = Pillar;

type ResultPayload = {
  clutch_score: number;
  opportunity: Opportunity;
  next_step: string;
  level: string;
  why: string;
  impact: string;
  opportunityLine: string;
};

const FIRST_MOVE: Record<Opportunity, Partial<Record<GoalId, string>> & { default: string }> = {
  Hydration: {
    default: "Drink 20 oz of fluid with electrolytes 15–30 minutes before your next 3 sessions.",
    energy: "Pre-hydrate with 20 oz and electrolytes 20 minutes before training — most low-energy sessions start under-fueled on fluid.",
    endurance: "For longer sessions, front-load sodium and fluid 20–30 minutes before you start.",
    hyrox: "Before your next metcon, electrolytes 20 minutes out. Late-station fade is often timing, not fitness.",
  },
  Recovery: {
    default: "Rehydrate with sodium within 60 minutes after every hard session this week — even when you don't feel thirsty.",
    recover: "Make the first hour after training non-negotiable: fluid + sodium before you leave the gym.",
    cramping: "Rebuild sodium within an hour of finishing. Tomorrow's cramps often start in today's recovery.",
  },
  Nutrition: {
    default: "Eat protein within one hour after every workout for the next two weeks.",
    strength: "Post-lift: fluid, then protein within 60 minutes. Treat it like the last set.",
    weight: "Keep protein in the post-workout window even when calories are down — performance depends on it.",
  },
  Consistency: {
    default: "Schedule three non-negotiable sessions this week and protect them like appointments.",
    consistency: "You're chasing consistency — make the small pre-session ritual (hydrate, then train) automatic for 14 days.",
  },
  Sleep: {
    default: "Sleep 30 minutes earlier three nights this week before your hardest sessions.",
    gameday: "Protect the night before game day like warm-up: earlier bedtime, screens down, lights out.",
    energy: "If energy is the goal, start with sleep — three earlier nights often unlock more than another supplement.",
  },
};

const WHY: Record<Opportunity, string> = {
  Hydration:
    "Fluid and sodium status shape how hard you can push in the back half of a session. When intake is late or inconsistent, perceived effort climbs and output drops — even if fitness is there.",
  Recovery:
    "Adaptation happens between sessions. Incomplete recovery stacks fatigue, raises injury risk, and quietly caps how hard you can train next time.",
  Nutrition:
    "Post-workout protein and fuel refill what training used. Skip the window often enough and progress stalls even when the workouts look good on paper.",
  Consistency:
    "The biggest gains come from showing up. Missed sessions compound faster than a perfect plan you only half-follow.",
  Sleep:
    "Sleep drives recovery hormones, reaction time, and next-day effort. Under-sleeping turns hard training into expensive stress.",
};

const IMPACT: Record<Opportunity, string> = {
  Hydration: "Support better endurance, steadier energy, and less late-session fade.",
  Recovery: "Improve recovery consistency and reduce next-day heaviness.",
  Nutrition: "Support muscle repair and steadier training quality week to week.",
  Consistency: "Build stronger daily habits and more reliable progress over months.",
  Sleep: "Support better recovery, focus, and readiness for hard efforts.",
};

const OPPORTUNITY_LINE: Record<Opportunity, string> = {
  Hydration: "Your hydration habits are limiting your performance more than your workouts.",
  Recovery: "Your recovery habits are limiting your performance more than your workouts.",
  Nutrition: "Your fueling habits are limiting your performance more than your training plan.",
  Consistency: "Your consistency gaps are costing you more progress than intensity ever will.",
  Sleep: "Your sleep habits are capping how well you can perform and recover.",
};

function goalLabel(id: GoalId | null): string {
  return GOALS.find((g) => g.id === id)?.label ?? "";
}

function performanceLevel(score: number): string {
  if (score >= 85) return "Elite Habits";
  if (score >= 70) return "High Performer";
  if (score >= 55) return "Competitive";
  if (score >= 40) return "Consistent";
  return "Developing";
}

function computeResult(answers: Answer[], goal: GoalId | null): ResultPayload {
  const scores = answers.map((a, i) => {
    const raw = ANSWERS.indexOf(a);
    return QUESTIONS[i].positive ? raw : 4 - raw;
  });
  const sum = scores.reduce((s, v) => s + v, 0);
  const clutch_score = Math.min(100, Math.round((sum / 20) * 100) + 8);

  // Lowest pillar score = biggest opportunity
  let opportunity: Opportunity = QUESTIONS[0].pillar;
  let worst = scores[0];
  scores.forEach((s, i) => {
    if (s < worst) {
      worst = s;
      opportunity = QUESTIONS[i].pillar;
    }
  });

  const move = FIRST_MOVE[opportunity];
  const next_step = (goal && move[goal]) || move.default;

  return {
    clutch_score,
    opportunity,
    next_step,
    level: performanceLevel(clutch_score),
    why: WHY[opportunity],
    impact: IMPACT[opportunity],
    opportunityLine: OPPORTUNITY_LINE[opportunity],
  };
}

type Step =
  | { kind: "idle" }
  | { kind: "goal" }
  | { kind: "athlete" }
  | { kind: "quiz"; index: number }
  | { kind: "analyze"; next: "quiz" | "email"; nextIndex?: number }
  | { kind: "email" }
  | { kind: "result"; id: string; sessionToken: string; payload: ResultPayload; goal: GoalId | null };

function useSelectThenAdvance<T>(onSelect: (value: T) => void, delayMs = 220) {
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

  return { selected: pending, choose: (value: T) => setPending(value) };
}

export function Assessment() {
  const [step, setStep] = useState<Step>({ kind: "idle" });
  const [goal, setGoal] = useState<GoalId | null>(null);
  const [athleteType, setAthleteType] = useState<AthleteType | null>(null);
  const [answers, setAnswers] = useState<(Answer | null)[]>(Array(QUESTIONS.length).fill(null));
  const reduce = useReducedMotion();

  useEffect(() => {
    const onStart = () => setStep((s) => (s.kind === "idle" ? { kind: "goal" } : s));
    window.addEventListener("clutch-score:start", onStart);
    return () => window.removeEventListener("clutch-score:start", onStart);
  }, []);

  const phase =
    step.kind === "goal"
      ? 1
      : step.kind === "athlete"
        ? 2
        : step.kind === "quiz" || step.kind === "analyze" || step.kind === "email"
          ? 3
          : 0;

  const fillWithin =
    step.kind === "quiz"
      ? (step.index + 1) / QUESTIONS.length
      : step.kind === "email" || (step.kind === "analyze" && step.next === "email")
        ? 1
        : step.kind === "analyze" && step.next === "quiz"
          ? ((step.nextIndex ?? 0) + 0.5) / QUESTIONS.length
          : 1;

  return (
    <div className="mx-auto w-full max-w-xl">
      {phase > 0 && step.kind !== "result" && (
        <ProgressBar step={phase} total={3} fillWithinStep={fillWithin} />
      )}

      <AnimatePresence mode="wait">
        {step.kind === "idle" && (
          <motion.div
            key="idle"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-10 text-center"
          >
            <p className="text-sm text-white/55">Ready when you are.</p>
            <button
              type="button"
              onClick={() => setStep({ kind: "goal" })}
              className="mt-5 rounded-full bg-[#c1ff00] px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-[#d6ff4d]"
            >
              Start assessment
            </button>
          </motion.div>
        )}

        {step.kind === "goal" && (
          <StepFrame key="goal">
            <GoalStep
              selected={goal}
              onSelect={(g) => {
                setGoal(g);
                setStep({ kind: "athlete" });
              }}
            />
          </StepFrame>
        )}

        {step.kind === "athlete" && (
          <StepFrame key="athlete">
            <AthleteStep
              goal={goal}
              selected={athleteType}
              onBack={() => setStep({ kind: "goal" })}
              onSelect={(t) => {
                setAthleteType(t);
                setStep({ kind: "quiz", index: 0 });
              }}
            />
          </StepFrame>
        )}

        {step.kind === "quiz" && (
          <StepFrame key={`quiz-${step.index}`}>
            <Quiz
              index={step.index}
              answers={answers}
              onBack={() => {
                if (step.index > 0) setStep({ kind: "quiz", index: step.index - 1 });
                else setStep({ kind: "athlete" });
              }}
              onAnswer={(value) => {
                const next = [...answers];
                next[step.index] = value;
                setAnswers(next);
                if (step.index < QUESTIONS.length - 1) {
                  setStep({ kind: "analyze", next: "quiz", nextIndex: step.index + 1 });
                } else {
                  setStep({ kind: "analyze", next: "email" });
                }
              }}
            />
          </StepFrame>
        )}

        {step.kind === "analyze" && (
          <StepFrame key="analyze">
            <AnalyzeBeat
              onDone={() => {
                if (step.next === "quiz") setStep({ kind: "quiz", index: step.nextIndex ?? 0 });
                else setStep({ kind: "email" });
              }}
            />
          </StepFrame>
        )}

        {step.kind === "email" && (
          <StepFrame key="email">
            <EmailCapture
              answers={answers as Answer[]}
              goal={goal}
              athleteType={athleteType}
              onBack={() => setStep({ kind: "quiz", index: QUESTIONS.length - 1 })}
              onComplete={(id, token, payload) =>
                setStep({ kind: "result", id, sessionToken: token, payload, goal })
              }
            />
          </StepFrame>
        )}

        {step.kind === "result" && (
          <StepFrame key="result">
            <Result
              id={step.id}
              sessionToken={step.sessionToken}
              payload={step.payload}
              goal={step.goal}
            />
          </StepFrame>
        )}
      </AnimatePresence>
    </div>
  );
}

function StepFrame({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ProgressBar({
  step,
  total,
  fillWithinStep = 1,
}: {
  step: number;
  total: number;
  fillWithinStep?: number;
}) {
  return (
    <div
      className="mb-10 flex gap-2"
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
        const width = complete ? "100%" : current ? `${Math.max(10, fillWithinStep * 100)}%` : "0%";
        return (
          <div key={n} className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-[#c1ff00] transition-all duration-400" style={{ width }} />
          </div>
        );
      })}
    </div>
  );
}

function OptionButton({
  active,
  children,
  onClick,
  disabled,
  className = "",
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-2xl border px-5 py-5 text-left text-base font-semibold transition active:scale-[0.99] disabled:cursor-wait ${
        active
          ? "border-[#c1ff00] bg-[#c1ff00] text-black"
          : "border-white/12 bg-white/[0.04] text-white hover:border-white/25 hover:bg-white/[0.07]"
      } ${className}`}
    >
      {children}
    </button>
  );
}

function GoalStep({ selected, onSelect }: { selected: GoalId | null; onSelect: (g: GoalId) => void }) {
  const { selected: pending, choose } = useSelectThenAdvance(onSelect);
  return (
    <section>
      <p className="text-xs uppercase tracking-[0.2em] text-[#c1ff00]/Question 01</p>
      <h2 className="mt-3 text-balance text-3xl font-bold leading-tight sm:text-4xl">
        What are you trying to achieve?
      </h2>
      <p className="mt-3 text-base text-white/55">Pick the one that fits best right now.</p>
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {GOALS.map((g) => (
          <OptionButton
            key={g.id}
            active={selected === g.id || pending === g.id}
            onClick={() => choose(g.id)}
            disabled={pending !== null}
            className="min-h-[4.75rem]"
          >
            {g.label}
          </OptionButton>
        ))}
      </div>
    </section>
  );
}

function AthleteStep({
  goal,
  selected,
  onSelect,
  onBack,
}: {
  goal: GoalId | null;
  selected: AthleteType | null;
  onSelect: (a: AthleteType) => void;
  onBack: () => void;
}) {
  const { selected: pending, choose } = useSelectThenAdvance(onSelect);
  return (
    <section>
      <div className="mb-2 flex justify-end">
        <button type="button" onClick={onBack} className="text-xs uppercase tracking-[0.18em] text-white/45 hover:text-white">
          ← Back
        </button>
      </div>
      <p className="text-xs uppercase tracking-[0.2em] text-[#c1ff00]">Question 02</p>
      {goal && (
        <p className="mt-2 text-xs text-white/40">Goal · {goalLabel(goal)}</p>
      )}
      <h2 className="mt-3 text-balance text-3xl font-bold leading-tight sm:text-4xl">
        What kind of athlete are you?
      </h2>
      <p className="mt-3 text-base text-white/55">This helps us read your habits in context.</p>
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {ATHLETE_TYPES.map((t) => (
          <OptionButton
            key={t}
            active={selected === t || pending === t}
            onClick={() => choose(t)}
            disabled={pending !== null}
            className="min-h-[4.5rem]"
          >
            {t}
          </OptionButton>
        ))}
      </div>
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
  const q = QUESTIONS[index];
  const selected = answers[index];
  const { selected: pending, choose } = useSelectThenAdvance(onAnswer);
  const num = String(index + 3).padStart(2, "0");

  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.2em] text-[#c1ff00]">
          Question {num} · {q.pillar}
        </p>
        <button type="button" onClick={onBack} className="text-xs uppercase tracking-[0.18em] text-white/45 hover:text-white">
          ← Back
        </button>
      </div>
      <h2 className="mt-3 text-balance text-3xl font-bold leading-tight sm:text-4xl">{q.prompt}</h2>
      <p className="mt-3 text-base text-white/50">{q.coach}</p>
      <div className="mt-8 flex flex-col gap-3">
        {ANSWERS.map((a) => (
          <OptionButton
            key={a}
            active={selected === a || pending === a}
            onClick={() => choose(a)}
            disabled={pending !== null}
            className="py-5 text-lg"
          >
            {a}
          </OptionButton>
        ))}
      </div>
    </section>
  );
}

function AnalyzeBeat({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const lineTimer = window.setInterval(() => {
      setI((v) => (v + 1) % ANALYZE_LINES.length);
    }, 320);
    const done = window.setTimeout(() => onDoneRef.current(), reduce ? 200 : 900);
    return () => {
      window.clearInterval(lineTimer);
      window.clearTimeout(done);
    };
  }, [reduce]);

  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-[#c1ff00]" aria-hidden />
      <p className="mt-6 text-sm font-medium tracking-wide text-white/70">{ANALYZE_LINES[i]}</p>
    </div>
  );
}

function EmailCapture({
  answers,
  goal,
  athleteType,
  onBack,
  onComplete,
}: {
  answers: Answer[];
  goal: GoalId | null;
  athleteType: AthleteType | null;
  onBack: () => void;
  onComplete: (id: string, sessionToken: string, payload: ResultPayload) => void;
}) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("");
  const [sourceOther, setSourceOther] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return toast.error("Email is required");
    setSubmitting(true);
    const result = computeResult(answers, goal);
    const sessionToken = generateSessionToken();
    const id = generateId();
    const sourceValue =
      source === "Other" && sourceOther.trim() ? `Other: ${sourceOther.trim()}` : source || null;
    try {
      const { error } = await supabase.from("assessment_responses").insert({
        id,
        first_name: firstName.trim() || null,
        email: email.trim(),
        source: sourceValue,
        goal: goal ?? null,
        athlete_type: athleteType ?? null,
        q1: answers[0],
        q2: answers[1],
        q3: answers[2],
        q4: answers[3],
        q5: answers[4],
        clutch_score: result.clutch_score,
        opportunity: result.opportunity,
        next_step: result.next_step,
        session_token: sessionToken,
      });
      if (error) console.error("[Clutch Score] save failed:", error.message);
    } catch (err) {
      console.error("[Clutch Score] save error:", err);
    } finally {
      setSubmitting(false);
    }
    onComplete(id, sessionToken, result);
  };

  return (
    <section>
      <button
        type="button"
        onClick={onBack}
        className="mb-6 text-xs uppercase tracking-[0.18em] text-white/45 hover:text-white"
      >
        ← Back
      </button>
      <h2 className="text-balance text-3xl font-bold leading-tight sm:text-4xl">
        Get Your Personalized Performance Report
      </h2>
      <p className="mt-4 text-base leading-relaxed text-white/55">
        Enter your email to unlock your full Clutch Score, biggest opportunity, First Clutch Move,
        and weekly recommendations — built for{" "}
        <span className="text-white">{goalLabel(goal).toLowerCase() || "your next session"}</span>.
      </p>
      <ul className="mt-5 space-y-2 text-sm text-white/50">
        <li>• Full Clutch Score + performance level</li>
        <li>• Biggest opportunity + First Clutch Move</li>
        <li>• Future check-ins and weekly Clutch Moves</li>
      </ul>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email *"
          className="w-full rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-4 text-base text-white placeholder:text-white/35 focus:border-[#c1ff00] focus:outline-none"
        />
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name (optional)"
          className="w-full rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-4 text-base text-white placeholder:text-white/35 focus:border-[#c1ff00] focus:outline-none"
        />

        <div className="pt-1">
          <p className="text-sm text-white/70">
            How did you hear about us? <span className="text-white/40">(optional)</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SOURCES.map((s) => {
              const active = source === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSource((prev) => (prev === s ? "" : s))}
                  className={`rounded-full border px-3.5 py-2 text-sm font-medium transition ${
                    active
                      ? "border-[#c1ff00] bg-[#c1ff00] text-black"
                      : "border-white/12 bg-white/[0.04] text-white/80 hover:border-white/30"
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
              className="mt-3 w-full rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#c1ff00] focus:outline-none"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 w-full rounded-full bg-[#c1ff00] px-8 py-5 text-base font-semibold text-black transition hover:bg-[#d6ff4d] disabled:opacity-60"
        >
          {submitting ? "Building your report…" : "Unlock My Report"}
        </button>
      </form>
    </section>
  );
}

function ScoreCircle({ score }: { score: number }) {
  const reduce = useReducedMotion();
  const r = 54;
  const c = 2 * Math.PI * r;
  const [offset, setOffset] = useState(c);

  useEffect(() => {
    const target = c - (score / 100) * c;
    const id = window.requestAnimationFrame(() => setOffset(reduce ? target : target));
    return () => window.cancelAnimationFrame(id);
  }, [score, c, reduce]);

  return (
    <div className="relative mx-auto h-40 w-40">
      <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90">
        <circle cx="64" cy="64" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
        <circle
          cx="64"
          cy="64"
          r={r}
          fill="none"
          stroke="#c1ff00"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: reduce ? undefined : "stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-extrabold tracking-tight text-white">{score}</span>
        <span className="text-xs uppercase tracking-[0.18em] text-white/45">/ 100</span>
      </div>
    </div>
  );
}

function Result({
  id,
  sessionToken,
  payload,
  goal,
}: {
  id: string;
  sessionToken: string;
  payload: ResultPayload;
  goal: GoalId | null;
}) {
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const submitFeedbackFn = useServerFn(submitFeedback);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleFeedback = async () => {
    if (helpful === null && !feedback.trim()) {
      return toast.error("Add a 👍/👎 or a quick note first.");
    }
    setSubmitting(true);
    try {
      await submitFeedbackFn({
        data: {
          id,
          session_token: sessionToken,
          helpful_result: helpful,
          feedback_text: feedback.trim() || null,
        },
      });
      setSubmitted(true);
      toast.success("Thanks for the feedback.");
    } catch {
      toast.error("Couldn't save feedback. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
        <p className="text-center text-xs uppercase tracking-[0.22em] text-white/45">Your Clutch Score</p>
        <div className="mt-6">
          <ScoreCircle score={payload.clutch_score} />
        </div>
        <p className="mt-5 text-center text-sm font-semibold uppercase tracking-[0.18em] text-[#c1ff00]">
          {payload.level}
        </p>
        {goal && (
          <p className="mt-2 text-center text-xs text-white/40">Based on · {goalLabel(goal)}</p>
        )}

        <div className="mt-10 space-y-8 border-t border-white/10 pt-8">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/40">Biggest opportunity</p>
            <p className="mt-3 text-2xl font-bold leading-snug text-white">{payload.opportunityLine}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#c1ff00]">First Clutch Move</p>
            <p className="mt-3 text-lg leading-relaxed text-white/90">{payload.next_step}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/40">Why this matters</p>
            <p className="mt-3 text-base leading-relaxed text-white/60">{payload.why}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/40">Potential impact</p>
            <p className="mt-3 text-base leading-relaxed text-white/60">{payload.impact}</p>
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-white/45">
        Try your First Clutch Move for two weeks — then come back and raise your score.
      </p>

      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
        {submitted ? (
          <p className="text-center text-sm text-white/55">Thanks — your feedback is recorded.</p>
        ) : (
          <>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/50">
              Was this insight helpful?
            </p>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => setHelpful(true)}
                className={`flex-1 rounded-xl border px-4 py-3 text-lg transition ${
                  helpful === true
                    ? "border-[#c1ff00] bg-[#c1ff00] text-black"
                    : "border-white/12 bg-white/[0.04] hover:border-white/30"
                }`}
              >
                👍 Yes
              </button>
              <button
                type="button"
                onClick={() => setHelpful(false)}
                className={`flex-1 rounded-xl border px-4 py-3 text-lg transition ${
                  helpful === false
                    ? "border-[#c1ff00] bg-[#c1ff00] text-black"
                    : "border-white/12 bg-white/[0.04] hover:border-white/30"
                }`}
              >
                👎 No
              </button>
            </div>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={3}
              placeholder="Optional note"
              className="mt-4 w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#c1ff00] focus:outline-none"
            />
            <button
              type="button"
              onClick={handleFeedback}
              disabled={submitting}
              className="mt-4 w-full rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#c1ff00] disabled:opacity-60"
            >
              {submitting ? "Saving…" : "Submit Feedback"}
            </button>
          </>
        )}
      </div>
    </section>
  );
}
