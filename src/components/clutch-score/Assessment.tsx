import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { submitFeedback } from "@/lib/feedback.functions";
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

function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return generateSessionToken().slice(0, 36);
}

/* ---------- Goals ---------- */

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

const ATHLETE_TYPES = [
  "Runner",
  "Basketball",
  "Strength",
  "CrossFit",
  "HYROX",
  "Cycling",
  "General Fitness",
  "Weekend Warrior",
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

/* Goal-aware next-step copy. Falls back to `default` if a goal isn't listed. */
const NEXT_STEP: Record<Opportunity, Partial<Record<GoalId, string>> & { default: string }> = {
  "Hydration Timing": {
    default:
      "Drink electrolytes 15 to 30 minutes before training, not just during. Try it for your next 3 sessions.",
    endurance:
      "If you want to build endurance, pre-hydrate 20 to 30 minutes before your long sessions, sodium in, then start. Small change, big change in the back half.",
    hyrox:
      "For HYROX prep, front-load electrolytes 20 minutes before your metcons. Fatigue in the final stations is usually a timing problem, not a fitness one.",
    "5k":
      "For a faster 5K, take electrolytes 15 to 20 minutes before hard efforts. You'll hold pace deeper into the effort.",
    gameday:
      "On game day, pre-hydrate 30 minutes before tip-off / kickoff, not while you're already warming up.",
    energy:
      "If you want more energy in workouts, hydrate 20 minutes before you train. Most 'low energy' sessions start under-fueled on fluid.",
  },
  "Electrolyte Use": {
    default:
      "Add electrolytes to your next 3 workouts, even short ones. Consistency matters more than amount.",
    cramping:
      "If the goal is to stop cramping, add electrolytes to every session for the next 2 weeks, even the short ones. This is the single highest-leverage change for you.",
    gameday:
      "For game-day performance, don't wait until you're depleted. Sip electrolytes through warm-up and the first quarter/half.",
    endurance:
      "Building endurance is a sodium problem as much as a mileage problem. Add electrolytes to every session over 45 minutes.",
    weight:
      "Losing weight without losing performance means keeping electrolytes in even when calories are down. Don't cut sodium with your food.",
  },
  "Recovery & Cramping": {
    default: "Rehydrate within 60 minutes after training, even if you don't feel thirsty yet.",
    recover:
      "To recover faster, rehydrate with sodium within 60 minutes of finishing. Water alone isn't recovery, it's dilution.",
    cramping:
      "To stop cramping, rebuild sodium within an hour of training. Cramps tomorrow are usually a recovery problem from today.",
    basketball:
      "For a basketball season, treat post-practice recovery as part of the practice. Fluids + sodium inside 60 minutes.",
    strength:
      "For strength gains, don't skip the post-lift refuel window. Fluid, sodium, protein, in that order, inside an hour.",
  },
  Consistency: {
    default:
      "You're close. Lock in electrolytes before every session this week and notice the difference.",
    consistency:
      "You're already consistent with training. Now make hydration equally boring: same routine, before every session, for 2 weeks.",
    feel:
      "You want to feel better after workouts. That comes from doing the small stuff every time, pre-hydrate, then train. Two weeks.",
    energy:
      "You're close. Make pre-workout hydration a non-negotiable habit for 2 weeks, that's usually where the energy shows up.",
  },
};

function goalLabel(id: GoalId | null): string {
  return GOALS.find((g) => g.id === id)?.label ?? "";
}

function computeResult(answers: Answer[], goal: GoalId | null) {
  const adjusted = answers.map((a, i) => (i < 2 ? 4 - pts(a) : pts(a)));
  const sum = adjusted.reduce((s, v) => s + v, 0);
  const clutch_score = Math.min(100, Math.round((sum / 20) * 100) + 10);
  const [q1, , q3, q4, q5] = answers;

  let opportunity: Opportunity;
  if (isOftenOrAlways(q3) && isNeverOrRarely(q4)) opportunity = "Hydration Timing";
  else if (isNeverOrRarely(q3)) opportunity = "Electrolyte Use";
  else if (isOftenOrAlways(q1) || isNeverOrRarely(q5)) opportunity = "Recovery & Cramping";
  else opportunity = "Consistency";

  const copy = NEXT_STEP[opportunity];
  const next_step = (goal && copy[goal]) || copy.default;
  return { clutch_score, opportunity, next_step };
}

/* ---------- State machine ---------- */

type Step =
  | { kind: "goal" }
  | { kind: "athlete" }
  | { kind: "quiz"; index: number }
  | { kind: "email" }
  | {
      kind: "result";
      id: string;
      sessionToken: string;
      score: number;
      opportunity: Opportunity;
      nextStep: string;
      goal: GoalId | null;
    };

export function Assessment() {
  const [step, setStep] = useState<Step>({ kind: "goal" });
  const [goal, setGoal] = useState<GoalId | null>(null);
  const [athleteType, setAthleteType] = useState<AthleteType | null>(null);
  const [answers, setAnswers] = useState<(Answer | null)[]>([null, null, null, null, null]);

  return (
    <div className="mx-auto w-full max-w-xl">
      {step.kind === "goal" && (
        <GoalStep
          selected={goal}
          onSelect={(g) => {
            setGoal(g);
            setStep({ kind: "athlete" });
          }}
        />
      )}

      {step.kind === "athlete" && (
        <AthleteStep
          goal={goal}
          selected={athleteType}
          onSelect={(t) => {
            setAthleteType(t);
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
              setStep({ kind: "email" });
            }
          }}
          onBack={() => {
            if (step.index > 0) setStep({ kind: "quiz", index: step.index - 1 });
            else setStep({ kind: "athlete" });
          }}
        />
      )}

      {step.kind === "email" && (
        <EmailCapture
          answers={answers as Answer[]}
          goal={goal}
          athleteType={athleteType}
          onBack={() => setStep({ kind: "quiz", index: QUESTIONS.length - 1 })}
          onComplete={(id, token, result) =>
            setStep({
              kind: "result",
              id,
              sessionToken: token,
              score: result.clutch_score,
              opportunity: result.opportunity,
              nextStep: result.next_step,
              goal,
            })
          }
        />
      )}

      {step.kind === "result" && (
        <Result
          id={step.id}
          sessionToken={step.sessionToken}
          score={step.score}
          opportunity={step.opportunity}
          nextStep={step.nextStep}
          goal={step.goal}
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
  /** 0–1 fill of the current segment (e.g. habit progress inside step 3). */
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

function GoalStep({
  selected,
  onSelect,
}: {
  selected: GoalId | null;
  onSelect: (g: GoalId) => void;
}) {
  const { selected: pending, choose } = useSelectThenAdvance(onSelect);

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
        Pick the one that fits best. We'll build your insight around it.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {GOALS.map((g) => {
          const active = selected === g.id || pending === g.id;
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => choose(g.id)}
              disabled={pending !== null}
              className={`flex min-h-[4.5rem] w-full items-center rounded-2xl border px-5 py-5 text-left text-base font-semibold transition active:scale-[0.99] disabled:cursor-wait ${
                active
                  ? "border-electric bg-electric text-black shadow-[0_0_0_1px_rgba(157,255,61,0.35)]"
                  : "border-black/10 bg-black/[0.03] text-foreground hover:border-black/30 hover:bg-black/[0.06]"
              }`}
            >
              {g.label}
            </button>
          );
        })}
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
      <StepHeader step={2} total={3} onBack={onBack} />
      {goal && (
        <p className="text-xs uppercase tracking-eyebrow text-electric-dark">
          Goal · {goalLabel(goal)}
        </p>
      )}
      <h2 className="mt-3 text-balance text-3xl font-bold leading-tight sm:text-4xl">
        What kind of athlete are you?
      </h2>
      <p className="mt-3 text-base text-muted-foreground">
        This shapes how we read your answers on the next step.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {ATHLETE_TYPES.map((t) => {
          const active = selected === t || pending === t;
          return (
            <button
              key={t}
              type="button"
              onClick={() => choose(t)}
              disabled={pending !== null}
              className={`flex min-h-[4.5rem] w-full items-center rounded-2xl border px-5 py-5 text-left text-base font-semibold transition active:scale-[0.99] disabled:cursor-wait ${
                active
                  ? "border-electric bg-electric text-black shadow-[0_0_0_1px_rgba(157,255,61,0.35)]"
                  : "border-black/10 bg-black/[0.03] text-foreground hover:border-black/30 hover:bg-black/[0.06]"
              }`}
            >
              {t}
            </button>
          );
        })}
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
  const selected = answers[index];
  const { selected: pending, choose } = useSelectThenAdvance(onAnswer);
  const fillWithinStep = (index + 1) / QUESTIONS.length;

  return (
    <section>
      <StepHeader step={3} total={3} onBack={onBack} fillWithinStep={fillWithinStep} />

      <h2 className="text-balance text-3xl font-bold leading-tight sm:text-4xl">
        {QUESTIONS[index]}
      </h2>

      <div className="mt-8 flex flex-col gap-3">
        {ANSWERS.map((a) => {
          const isSelected = selected === a || pending === a;
          return (
            <button
              key={a}
              onClick={() => choose(a)}
              disabled={pending !== null}
              className={`w-full rounded-2xl border px-6 py-5 text-left text-lg font-semibold transition active:scale-[0.99] disabled:cursor-wait ${
                isSelected
                  ? "border-electric bg-electric text-black shadow-[0_0_0_1px_rgba(157,255,61,0.35)]"
                  : "border-black/10 bg-black/[0.03] text-foreground hover:border-black/30 hover:bg-black/[0.06]"
              }`}
              type="button"
            >
              {a}
            </button>
          );
        })}
      </div>
    </section>
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
  onComplete: (
    id: string,
    sessionToken: string,
    result: { clutch_score: number; opportunity: Opportunity; next_step: string },
  ) => void;
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
      source === "Other" && sourceOther.trim()
        ? `Other: ${sourceOther.trim()}`
        : source || null;
    try {
      const { error } = await supabase.from("assessment_responses").insert({
        id,
        first_name: firstName.trim() || null,
        email: email.trim(),
        source: sourceValue,
        goal: goal ?? null,
        athlete_type: athleteType ?? null,
        q1: answers[0], q2: answers[1], q3: answers[2], q4: answers[3], q5: answers[4],
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
      <StepHeader step={3} total={3} onBack={onBack} fillWithinStep={1} />
      <h2 className="text-balance text-4xl font-bold leading-tight sm:text-5xl">
        Your personalized insight is ready
      </h2>
      <p className="mt-4 text-lg text-muted-foreground">
        Enter your email to see what's most likely holding you back from{" "}
        <span className="text-foreground">{goalLabel(goal).toLowerCase() || "your goal"}</span>.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <input
          type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="Email *"
          className="w-full rounded-2xl border border-black/10 bg-black/[0.03] px-5 py-4 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-electric focus:outline-none"
        />
        <input
          type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name (optional)"
          className="w-full rounded-2xl border border-black/10 bg-black/[0.03] px-5 py-4 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-electric focus:outline-none"
        />

        <div className="pt-2">
          <p className="text-sm font-semibold text-foreground">
            How did you hear about us?{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
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
          type="submit" disabled={submitting}
          className="mt-2 w-full rounded-full bg-electric px-8 py-5 text-base font-semibold text-black transition hover:bg-electric-dark disabled:opacity-60"
        >
          {submitting ? "Calculating…" : "Show My Insight"}
        </button>
      </form>
    </section>
  );
}

function ScoreRing({ score }: { score: number }) {
  const reduce = useReducedMotion();
  const size = 240;
  const stroke = 16;
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
        className="pointer-events-none absolute inset-[-20%] rounded-full transition-opacity duration-700"
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
          stroke="rgba(255,255,255,0.1)"
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
        <span className="text-6xl font-extrabold tracking-tight text-white tabular-nums sm:text-7xl">
          {display}
        </span>
        <span className="mt-1 text-[11px] font-medium uppercase tracking-[0.28em] text-white/45">
          Clutch Score
        </span>
      </div>
    </div>
  );
}

function Result({
  id, sessionToken, score, opportunity, nextStep, goal,
}: {
  id: string; sessionToken: string; score: number; opportunity: Opportunity; nextStep: string; goal: GoalId | null;
}) {
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const submitFeedbackFn = useServerFn(submitFeedback);

  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  const handleFeedback = async () => {
    if (helpful === null && !feedback.trim()) {
      return toast.error("Add a thumbs up/down or a quick note first.");
    }
    setSubmitting(true);
    try {
      await submitFeedbackFn({
        data: { id, session_token: sessionToken, helpful_result: helpful, feedback_text: feedback.trim() || null },
      });
      setSubmitted(true);
      toast.success("Thanks for the feedback.");
    } catch {
      toast.error("Couldn't save feedback. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const goalText = goalLabel(goal);

  return (
    <section>
      <div className="overflow-hidden rounded-3xl border border-black/10 bg-[#070707] px-6 py-12 text-center sm:px-10 sm:py-14">
        <ScoreRing score={score} />
        {goalText && (
          <p className="mt-8 text-xs uppercase tracking-eyebrow text-white/40">
            Based on your goal · {goalText}
          </p>
        )}
      </div>

      <div className="card-elevated mt-6 p-8 sm:p-10">
        <p className="text-xs uppercase tracking-eyebrow text-muted-foreground/80">Your insight</p>
        <h2 className="mt-3 text-balance text-3xl font-extrabold leading-snug tracking-tight sm:text-4xl">
          Your biggest opportunity: {opportunity}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{nextStep}</p>
      </div>

      <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
        Try your next step for the next 2 weeks. We'll check back and see what changed.
      </p>

      <div className="mt-10 rounded-2xl border border-black/10 bg-black/[0.02] p-6">
        {submitted ? (
          <p className="text-center text-sm text-muted-foreground">Thanks, your feedback is recorded.</p>
        ) : (
          <>
            <p className="text-sm font-semibold uppercase tracking-eyebrow text-muted-foreground">
              Was this insight helpful?
            </p>
            <div className="mt-4 flex gap-3">
              <button
                type="button" onClick={() => setHelpful(true)}
                className={`flex-1 rounded-xl border px-4 py-3 text-lg transition ${
                  helpful === true ? "border-electric bg-electric text-black" : "border-black/10 bg-black/[0.03] hover:border-black/30"
                }`}
              >
                Yes
              </button>
              <button
                type="button" onClick={() => setHelpful(false)}
                className={`flex-1 rounded-xl border px-4 py-3 text-lg transition ${
                  helpful === false ? "border-electric bg-electric text-black" : "border-black/10 bg-black/[0.03] hover:border-black/30"
                }`}
              >
                No
              </button>
            </div>

            <label className="mt-5 block text-sm text-muted-foreground">
              What surprised you most about your result?
            </label>
            <textarea
              value={feedback} onChange={(e) => setFeedback(e.target.value)} rows={3}
              placeholder="Optional"
              className="mt-2 w-full rounded-xl border border-black/10 bg-black/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-electric focus:outline-none"
            />

            <button
              type="button" onClick={handleFeedback} disabled={submitting}
              className="mt-4 w-full rounded-full border border-black/15 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-electric hover:text-foreground disabled:opacity-60"
            >
              {submitting ? "Saving..." : "Submit Feedback"}
            </button>
          </>
        )}
      </div>
    </section>
  );
}
