import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/Logo";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Clutch Score — The 60-second hydration assessment for athletes" },
      {
        name: "description",
        content:
          "What's your Clutch Score? Discover your biggest hydration opportunity in 60 seconds.",
      },
      { property: "og:title", content: "Clutch Score by ClutchFuel" },
      {
        property: "og:description",
        content: "The 60-second hydration assessment for athletes.",
      },
    ],
  }),
  component: ClutchScoreApp,
});

// ---------- Scoring ----------

const ANSWERS = ["Never", "Rarely", "Sometimes", "Often", "Always"] as const;
type Answer = (typeof ANSWERS)[number];

const QUESTIONS = [
  "How often do you cramp during training?",
  "How often do you finish workouts feeling dehydrated?",
  "How often do you use electrolytes during training?",
  "How often do you feel your hydration strategy is working?",
  "How often do you recover well after intense sessions?",
] as const;

const SOURCES = ["Run Club", "Basketball", "HYROX", "Instagram", "Friend", "Other"];

const pts = (a: Answer) => ANSWERS.indexOf(a);
const isOftenOrAlways = (a: Answer) => a === "Often" || a === "Always";
const isNeverOrRarely = (a: Answer) => a === "Never" || a === "Rarely";

type Opportunity = "Hydration Timing" | "Electrolyte Use" | "Recovery & Cramping" | "Consistency";

const NEXT_STEP: Record<Opportunity, string> = {
  "Hydration Timing":
    "Drink electrolytes 15–30 minutes before training, not just during. Try it for your next 3 sessions.",
  "Electrolyte Use":
    "Add electrolytes to your next 3 workouts, even short ones. Consistency matters more than amount.",
  "Recovery & Cramping":
    "Rehydrate within 60 minutes after training, even if you don't feel thirsty yet.",
  Consistency:
    "You're close. Lock in electrolytes before every session this week and notice the difference.",
};

function computeResult(answers: Answer[]) {
  const adjusted = answers.map((a, i) => (i < 2 ? 4 - pts(a) : pts(a)));
  const sum = adjusted.reduce((s, v) => s + v, 0);
  const clutch_score = Math.min(100, Math.round((sum / 20) * 100) + 10);

  const [q1, q2, q3, , q5] = answers;
  const q4 = answers[3];

  let opportunity: Opportunity;
  if (isOftenOrAlways(q3) && isNeverOrRarely(q4)) opportunity = "Hydration Timing";
  else if (isNeverOrRarely(q3)) opportunity = "Electrolyte Use";
  else if (isOftenOrAlways(q1) || isNeverOrRarely(q5)) opportunity = "Recovery & Cramping";
  else opportunity = "Consistency";

  // q2 referenced for completeness so unused-var rules don't trip on the destructure
  void q2;

  return { clutch_score, opportunity, next_step: NEXT_STEP[opportunity] };
}

// ---------- App ----------

type Step =
  | { kind: "landing" }
  | { kind: "quiz"; index: number }
  | { kind: "email" }
  | {
      kind: "result";
      id: string;
      sessionToken: string;
      score: number;
      opportunity: Opportunity;
      nextStep: string;
    };

function ClutchScoreApp() {
  const [step, setStep] = useState<Step>({ kind: "landing" });
  const [answers, setAnswers] = useState<(Answer | null)[]>([null, null, null, null, null]);

  return (
    <main id="main" className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-5 pt-6 pb-10 sm:py-16">
        <header className="mb-4 flex items-center gap-4 sm:mb-10">
          <Logo size="lg" />
        </header>

        {step.kind === "landing" && <Landing onStart={() => setStep({ kind: "quiz", index: 0 })} />}

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
              if (step.index === 0) setStep({ kind: "landing" });
              else setStep({ kind: "quiz", index: step.index - 1 });
            }}
          />
        )}

        {step.kind === "email" && (
          <EmailCapture
            answers={answers as Answer[]}
            onBack={() => setStep({ kind: "quiz", index: QUESTIONS.length - 1 })}
            onComplete={(id, token, result) =>
              setStep({
                kind: "result",
                id,
                sessionToken: token,
                score: result.clutch_score,
                opportunity: result.opportunity,
                nextStep: result.next_step,
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
          />
        )}
      </div>
    </main>
  );
}

// ---------- Landing ----------

function Landing({ onStart }: { onStart: () => void }) {
  return (
    <section className="flex flex-1 flex-col justify-start pt-2 sm:justify-center sm:pt-0">
      <h1 className="text-balance text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
        What's your <span className="text-lime">Clutch Score?</span>
      </h1>
      <p className="mt-4 text-lg text-white/70 sm:mt-6">
        Discover your biggest hydration opportunity in 60 seconds.
      </p>

      <div className="mt-6 sm:mt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
          What You'll Get
        </p>
        <ul className="mt-3 space-y-2">
          <li className="flex items-center gap-2.5 text-sm text-white/80">
            <span className="text-lime">•</span>
            Your Clutch Score
          </li>
          <li className="flex items-center gap-2.5 text-sm text-white/80">
            <span className="text-lime">•</span>
            Your Biggest Hydration Opportunity
          </li>
          <li className="flex items-center gap-2.5 text-sm text-white/80">
            <span className="text-lime">•</span>A Personalized Next Step
          </li>
        </ul>
      </div>

      <button
        onClick={onStart}
        className="mt-8 w-full rounded-full bg-lime px-8 py-5 text-base font-semibold text-background transition hover:bg-lime-dark sm:mt-10"
      >
        Start My Assessment
      </button>

      <p className="mt-3 text-center text-xs text-white/30">
        No tracking. No wearables. No complicated calculations.
      </p>

      <p className="mt-4 text-center text-xs text-white/25">
        Built for runners, HYROX athletes, basketball players, and everyday athletes.
      </p>
    </section>
  );
}

// ---------- Quiz ----------

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
  const progress = ((index + 1) / QUESTIONS.length) * 100;
  const selected = answers[index];

  return (
    <section className="flex flex-1 flex-col">
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-white/50">
          <span>
            Question {index + 1} of {QUESTIONS.length}
          </span>
          <button
            onClick={onBack}
            className="text-white/50 transition hover:text-white"
            type="button"
          >
            ← Back
          </button>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-lime transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h2 className="text-balance text-3xl font-bold leading-tight sm:text-4xl">
        {QUESTIONS[index]}
      </h2>

      <div className="mt-8 flex flex-col gap-3">
        {ANSWERS.map((a) => {
          const isSelected = selected === a;
          return (
            <button
              key={a}
              onClick={() => onAnswer(a)}
              className={`w-full rounded-2xl border px-6 py-5 text-left text-lg font-semibold transition active:scale-[0.99] ${
                isSelected
                  ? "border-lime bg-lime/10 text-lime"
                  : "border-white/10 bg-white/[0.03] text-white hover:border-white/30 hover:bg-white/[0.06]"
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

// ---------- Email Capture ----------

function EmailCapture({
  answers,
  onBack,
  onComplete,
}: {
  answers: Answer[];
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
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }
    setSubmitting(true);
    const result = computeResult(answers);
    const sessionToken = generateSessionToken();
    const { data, error } = await supabase
      .from("assessment_responses")
      .insert({
        first_name: firstName.trim() || null,
        email: email.trim(),
        source: source || null,
        q1: answers[0],
        q2: answers[1],
        q3: answers[2],
        q4: answers[3],
        q5: answers[4],
        clutch_score: result.clutch_score,
        opportunity: result.opportunity,
        next_step: result.next_step,
        session_token: sessionToken,
      })
      .select("id")
      .single();
    setSubmitting(false);
    if (error || !data) {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    onComplete(data.id, sessionToken, result);
  };

  return (
    <section className="flex flex-1 flex-col justify-center">
      <button
        onClick={onBack}
        type="button"
        className="mb-6 self-start text-xs uppercase tracking-[0.18em] text-white/50 transition hover:text-white"
      >
        ← Back
      </button>
      <h2 className="text-balance text-4xl font-bold leading-tight sm:text-5xl">
        Your Clutch Score is ready
      </h2>
      <p className="mt-4 text-lg text-white/70">Enter your email to see your result.</p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email *"
          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-base text-white placeholder:text-white/35 focus:border-lime focus:outline-none"
        />
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name (optional)"
          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-base text-white placeholder:text-white/35 focus:border-lime focus:outline-none"
        />
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-base text-white focus:border-lime focus:outline-none"
        >
          <option value="">How did you hear about Clutch Score? (optional)</option>
          {SOURCES.map((s) => (
            <option key={s} value={s} className="bg-background">
              {s}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={submitting}
          className="mt-2 w-full rounded-full bg-lime px-8 py-5 text-base font-semibold text-background transition hover:bg-lime-dark disabled:opacity-60"
        >
          {submitting ? "Calculating…" : "Show My Result"}
        </button>
      </form>
    </section>
  );
}

// ---------- Result ----------

function Result({
  id,
  sessionToken,
  score,
  opportunity,
  nextStep,
}: {
  id: string;
  sessionToken: string;
  score: number;
  opportunity: Opportunity;
  nextStep: string;
}) {
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const submitFeedbackFn = useServerFn(submitFeedback);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const handleFeedback = async () => {
    if (helpful === null && !feedback.trim()) {
      toast.error("Add a 👍/👎 or a quick note first.");
      return;
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
    <section className="flex flex-1 flex-col">
      <p className="text-xs uppercase tracking-[0.22em] text-lime">
        Your biggest hydration opportunity
      </p>
      <h2 className="mt-3 text-balance text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
        {opportunity}
      </h2>

      <div className="mt-10">
        <p className="text-xs uppercase tracking-[0.22em] text-white/40">What to do next</p>
        <p className="mt-3 text-xl leading-relaxed text-white">{nextStep}</p>
      </div>

      <div className="mt-10 inline-flex items-baseline gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 self-start">
        <span className="text-xs uppercase tracking-[0.18em] text-white/50">Clutch Score</span>
        <span className="text-2xl font-bold text-white">{score}</span>
        <span className="text-sm text-white/40">/ 100</span>
      </div>

      <p className="mt-10 text-sm leading-relaxed text-white/60">
        Try your Next Step for the next 2 weeks. We'll check back and see what changed.
      </p>

      <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        {submitted ? (
          <p className="text-center text-sm text-white/70">Thanks — your feedback is recorded.</p>
        ) : (
          <>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
              Was this result helpful?
            </p>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => setHelpful(true)}
                className={`flex-1 rounded-xl border px-4 py-3 text-lg transition ${
                  helpful === true
                    ? "border-lime bg-lime/10 text-lime"
                    : "border-white/10 bg-white/[0.03] hover:border-white/30"
                }`}
              >
                👍 Yes
              </button>
              <button
                type="button"
                onClick={() => setHelpful(false)}
                className={`flex-1 rounded-xl border px-4 py-3 text-lg transition ${
                  helpful === false
                    ? "border-lime bg-lime/10 text-lime"
                    : "border-white/10 bg-white/[0.03] hover:border-white/30"
                }`}
              >
                👎 No
              </button>
            </div>

            <label className="mt-5 block text-sm text-white/70">
              What surprised you most about your result?
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={3}
              placeholder="Optional"
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-lime focus:outline-none"
            />

            <button
              type="button"
              onClick={handleFeedback}
              disabled={submitting}
              className="mt-4 w-full rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-lime hover:text-lime disabled:opacity-60"
            >
              {submitting ? "Saving…" : "Submit Feedback"}
            </button>
          </>
        )}
      </div>
    </section>
  );
}
