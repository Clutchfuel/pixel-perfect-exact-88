import { useEffect, useState } from "react";
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
  const [q1, , q3, q4, q5] = answers;
  let opportunity: Opportunity;
  if (isOftenOrAlways(q3) && isNeverOrRarely(q4)) opportunity = "Hydration Timing";
  else if (isNeverOrRarely(q3)) opportunity = "Electrolyte Use";
  else if (isOftenOrAlways(q1) || isNeverOrRarely(q5)) opportunity = "Recovery & Cramping";
  else opportunity = "Consistency";
  return { clutch_score, opportunity, next_step: NEXT_STEP[opportunity] };
}

type Step =
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

export function Assessment() {
  const [step, setStep] = useState<Step>({ kind: "quiz", index: 0 });
  const [answers, setAnswers] = useState<(Answer | null)[]>([null, null, null, null, null]);

  return (
    <div className="mx-auto w-full max-w-xl">
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
  const progress = ((index + 1) / QUESTIONS.length) * 100;
  const selected = answers[index];

  return (
    <section>
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-eyebrow text-muted-foreground/80">
          <span>
            Question {index + 1} of {QUESTIONS.length}
          </span>
          {index > 0 && (
            <button onClick={onBack} className="hover:text-foreground" type="button">
              ← Back
            </button>
          )}
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-black/[0.10]">
          <div
            className="h-full bg-electric transition-all duration-300"
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
                  ? "border-electric bg-electric/15 text-electric"
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
    if (!email.trim()) return toast.error("Email is required");
    setSubmitting(true);
    const result = computeResult(answers);
    const sessionToken = generateSessionToken();
    const id = generateId();
    try {
      const { error } = await supabase.from("assessment_responses").insert({
        id,
        first_name: firstName.trim() || null,
        email: email.trim(),
        source: source || null,
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
      <button
        onClick={onBack}
        type="button"
        className="mb-6 self-start text-xs uppercase tracking-eyebrow text-muted-foreground/80 transition hover:text-foreground"
      >
        ← Back
      </button>
      <h2 className="text-balance text-4xl font-bold leading-tight sm:text-5xl">
        Your Clutch Score is ready
      </h2>
      <p className="mt-4 text-lg text-muted-foreground">Enter your email to see your result.</p>

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
        <select
          value={source} onChange={(e) => setSource(e.target.value)}
          className="w-full rounded-2xl border border-black/10 bg-black/[0.03] px-5 py-4 text-base text-foreground focus:border-electric focus:outline-none"
        >
          <option value="">How did you hear about Clutch Score? (optional)</option>
          {SOURCES.map((s) => (
            <option key={s} value={s} className="bg-background">{s}</option>
          ))}
        </select>
        <button
          type="submit" disabled={submitting}
          className="mt-2 w-full rounded-full bg-electric px-8 py-5 text-base font-semibold text-black transition hover:bg-electric-dark disabled:opacity-60"
        >
          {submitting ? "Calculating…" : "Show My Result"}
        </button>
      </form>
    </section>
  );
}

function Result({
  id, sessionToken, score, opportunity, nextStep,
}: {
  id: string; sessionToken: string; score: number; opportunity: Opportunity; nextStep: string;
}) {
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const submitFeedbackFn = useServerFn(submitFeedback);

  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  const handleFeedback = async () => {
    if (helpful === null && !feedback.trim()) {
      return toast.error("Add a 👍/👎 or a quick note first.");
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

  return (
    <section>
      <p className="text-xs uppercase tracking-eyebrow text-electric">
        Your biggest performance opportunity
      </p>
      <h2 className="mt-3 text-balance text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
        {opportunity}
      </h2>

      <div className="mt-10">
        <p className="text-xs uppercase tracking-eyebrow text-muted-foreground/70">What to do next</p>
        <p className="mt-3 text-xl leading-relaxed text-foreground">{nextStep}</p>
      </div>

      <div className="mt-10 inline-flex items-baseline gap-3 self-start rounded-2xl border border-black/10 bg-black/[0.03] px-5 py-4">
        <span className="text-xs uppercase tracking-eyebrow text-muted-foreground/80">Clutch Score</span>
        <span className="text-2xl font-bold text-foreground">{score}</span>
        <span className="text-sm text-muted-foreground/70">/ 100</span>
      </div>

      <p className="mt-10 text-sm leading-relaxed text-muted-foreground">
        Try your Next Step for the next 2 weeks. We'll check back and see what changed.
      </p>

      <div className="mt-12 rounded-2xl border border-black/10 bg-black/[0.02] p-6">
        {submitted ? (
          <p className="text-center text-sm text-muted-foreground">Thanks — your feedback is recorded.</p>
        ) : (
          <>
            <p className="text-sm font-semibold uppercase tracking-eyebrow text-muted-foreground">
              Was this result helpful?
            </p>
            <div className="mt-4 flex gap-3">
              <button
                type="button" onClick={() => setHelpful(true)}
                className={`flex-1 rounded-xl border px-4 py-3 text-lg transition ${
                  helpful === true ? "border-electric bg-electric/15 text-electric" : "border-black/10 bg-black/[0.03] hover:border-black/30"
                }`}
              >👍 Yes</button>
              <button
                type="button" onClick={() => setHelpful(false)}
                className={`flex-1 rounded-xl border px-4 py-3 text-lg transition ${
                  helpful === false ? "border-electric bg-electric/15 text-electric" : "border-black/10 bg-black/[0.03] hover:border-black/30"
                }`}
              >👎 No</button>
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
              {submitting ? "Saving…" : "Submit Feedback"}
            </button>
          </>
        )}
      </div>
    </section>
  );
}
