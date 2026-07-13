import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { supabase } from "@/integrations/supabase/client";
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
  opportunityLine: string;
};

const FIRST_MOVE: Record<Opportunity, Partial<Record<GoalId, string>> & { default: string }> = {
  Hydration: {
    default: "Drink 20 oz of water within 30 minutes after every workout.",
    energy: "Pre-hydrate with 20 oz and electrolytes 20 minutes before training — most low-energy sessions start under-fueled on fluid.",
    endurance: "For longer sessions, front-load sodium and fluid 20–30 minutes before you start.",
    hyrox: "Before your next metcon, electrolytes 20 minutes out. Late-station fade is often timing, not fitness.",
  },
  Recovery: {
    default: "Drink 20 oz of water within 30 minutes after every workout.",
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

const OPPORTUNITY_LINE: Record<Opportunity, string> = {
  Hydration: "Your hydration habits have the greatest opportunity to improve your performance.",
  Recovery: "Your recovery habits have the greatest opportunity to improve your performance.",
  Nutrition: "Your fueling habits have the greatest opportunity to improve your performance.",
  Consistency: "Your consistency habits have the greatest opportunity to improve your performance.",
  Sleep: "Your sleep habits have the greatest opportunity to improve your performance.",
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
    opportunityLine: OPPORTUNITY_LINE[opportunity],
  };
}

type Step =
  | { kind: "idle" }
  | { kind: "goal" }
  | { kind: "athlete" }
  | { kind: "quiz"; index: number }
  | { kind: "analyze"; next: "quiz" | "result"; nextIndex?: number }
  | { kind: "result"; payload: ResultPayload; goal: GoalId | null; athleteType: AthleteType | null; answers: Answer[] };

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
        : step.kind === "quiz" || step.kind === "analyze"
          ? 3
          : 0;

  const fillWithin =
    step.kind === "quiz"
      ? (step.index + 1) / QUESTIONS.length
      : step.kind === "analyze" && step.next === "result"
        ? 1
        : step.kind === "analyze" && step.next === "quiz"
          ? ((step.nextIndex ?? 0) + 0.5) / QUESTIONS.length
          : 1;

  return (
    <div className={`mx-auto w-full ${step.kind === "result" ? "max-w-lg" : "max-w-xl"}`}>
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
                  setStep({ kind: "analyze", next: "result" });
                }
              }}
            />
          </StepFrame>
        )}

        {step.kind === "analyze" && (
          <StepFrame key="analyze">
            <AnalyzeBeat
              onDone={() => {
                if (step.next === "quiz") {
                  setStep({ kind: "quiz", index: step.nextIndex ?? 0 });
                } else {
                  const payload = computeResult(answers as Answer[], goal);
                  setStep({
                    kind: "result",
                    payload,
                    goal,
                    athleteType,
                    answers: answers as Answer[],
                  });
                }
              }}
            />
          </StepFrame>
        )}

        {step.kind === "result" && (
          <StepFrame key="result">
            <Result
              payload={step.payload}
              goal={step.goal}
              athleteType={step.athleteType}
              answers={step.answers}
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

function ScoreRing({ score }: { score: number }) {
  const reduce = useReducedMotion();
  const size = 260;
  const stroke = 18;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const [display, setDisplay] = useState(0);
  const [offset, setOffset] = useState(c);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    setSettled(false);
    if (reduce) {
      setDisplay(score);
      setOffset(c - (score / 100) * c);
      setSettled(true);
      return;
    }

    const duration = 1000;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out cubic — fills fast, settles soft
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(score * eased);
      setDisplay(value);
      setOffset(c - (value / 100) * c);
      if (t < 1) {
        frame = window.requestAnimationFrame(tick);
      } else {
        setDisplay(score);
        setOffset(c - (score / 100) * c);
        setSettled(true);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [score, c, reduce]);

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <div
        className="pointer-events-none absolute inset-[-22%] rounded-full transition-opacity duration-700"
        style={{
          opacity: settled ? 1 : 0.45,
          background:
            "radial-gradient(circle, rgba(193,255,0,0.28) 0%, rgba(193,255,0,0.08) 38%, transparent 68%)",
        }}
        aria-hidden
      />
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#c1ff00"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{
            filter: settled
              ? "drop-shadow(0 0 14px rgba(193,255,0,0.7))"
              : "drop-shadow(0 0 6px rgba(193,255,0,0.35))",
            transition: "filter 0.6s ease",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-7xl font-extrabold tracking-tight text-white tabular-nums sm:text-8xl">
          {display}
        </span>
        <span className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.28em] text-white/45">
          Clutch Score
        </span>
      </div>
    </div>
  );
}

function Result({
  payload,
  goal,
  athleteType,
  answers,
}: {
  payload: ResultPayload;
  goal: GoalId | null;
  athleteType: AthleteType | null;
  answers: Answer[];
}) {
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("");
  const [sourceOther, setSourceOther] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return toast.error("Enter your email to save your report.");
    setSubmitting(true);
    const sessionToken = generateSessionToken();
    const id = generateId();
    const sourceValue =
      source === "Other" && sourceOther.trim() ? `Other: ${sourceOther.trim()}` : source || null;
    try {
      const { error } = await supabase.from("assessment_responses").insert({
        id,
        first_name: null,
        email: email.trim(),
        source: sourceValue,
        goal: goal ?? null,
        athlete_type: athleteType ?? null,
        q1: answers[0],
        q2: answers[1],
        q3: answers[2],
        q4: answers[3],
        q5: answers[4],
        clutch_score: payload.clutch_score,
        opportunity: payload.opportunity,
        next_step: payload.next_step,
        session_token: sessionToken,
      });
      if (error) {
        console.error("[Clutch Score] save failed:", error.message);
        toast.error("Couldn't save your report. Try again.");
      } else {
        setSaved(true);
        toast.success("Report saved.");
      }
    } catch (err) {
      console.error("[Clutch Score] save error:", err);
      toast.error("Couldn't save your report. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-16 pb-10">
      {/* 1. Hero Score — visual identity */}
      <div className="pt-4 text-center">
        <ScoreRing score={payload.clutch_score} />
        <p className="mt-10 text-xl font-semibold tracking-wide text-[#c1ff00]">{payload.level}</p>
      </div>

      {/* 2. Biggest Opportunity */}
      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/40">
          Your Biggest Opportunity
        </p>
        <p className="mt-3 text-2xl font-bold text-white sm:text-3xl">{payload.opportunity}</p>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/60 sm:text-lg">
          {payload.opportunityLine}
        </p>
      </div>

      {/* 3. First Clutch Move */}
      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#c1ff00]">
          This week's Clutch Move
        </p>
        <p className="mx-auto mt-4 max-w-md text-xl font-semibold leading-snug text-white sm:text-2xl">
          {payload.next_step}
        </p>
      </div>

      {/* 4. Save Your Report */}
      <div className="border-t border-white/10 pt-12">
        {saved ? (
          <div className="text-center">
            <p className="text-lg font-semibold text-white">You're all set.</p>
            <p className="mt-2 text-sm text-white/50">
              Your Clutch Score and Clutch Move are saved.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-center text-2xl font-bold text-white sm:text-3xl">
              Want to keep your results?
            </h3>
            <p className="mx-auto mt-3 max-w-md text-center text-base text-white/55">
              Get your Clutch Score and personalized recommendations sent to your inbox.
            </p>
            <form onSubmit={handleSave} className="mx-auto mt-8 flex max-w-md flex-col gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-4 text-base text-white placeholder:text-white/35 focus:border-[#c1ff00] focus:outline-none"
              />
              <div className="pt-1">
                <p className="text-center text-xs text-white/40">
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
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                          active
                            ? "border-[#c1ff00] bg-[#c1ff00] text-black"
                            : "border-white/12 bg-white/[0.04] text-white/70 hover:border-white/30"
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
                    placeholder="Tell us where"
                    className="mt-3 w-full rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#c1ff00] focus:outline-none"
                  />
                )}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="mt-2 w-full rounded-full bg-[#c1ff00] px-8 py-4 text-base font-semibold text-black transition hover:bg-[#d6ff4d] disabled:opacity-60"
              >
                {submitting ? "Saving…" : "Get My Report"}
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
