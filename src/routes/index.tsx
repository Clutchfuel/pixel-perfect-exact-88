import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/Logo";
import { HomepageMarketing } from "@/components/landing/HomepageMarketing";
import { PillarRing } from "@/components/clutch-score/PillarRing";
import { ScoreRing } from "@/components/clutch-score/ScoreRing";
import { ShareCard } from "@/components/clutch-score/ShareCard";
import { submitFeedback } from "@/lib/feedback.functions";
import {
  ASSESSMENT_QUESTIONS,
  ASSESSMENT_SCALE,
  computeClutchScore,
  legacyQuestionFields,
  type ClutchScoreResult,
  type NumericAnswer,
  type Pillar,
} from "@/lib/clutch-score-assessment";
import { canonical, makeMeta } from "@/lib/seo";
import { toast } from "sonner";

const QUESTION_COUNT = ASSESSMENT_QUESTIONS.length;

const SOURCES = ["Run Club", "Basketball", "HYROX", "Instagram", "Friend", "Other"];

const PILLAR_TAG: Record<Pillar, string> = {
  prepare: "bg-[#FF5A1F] text-white",
  perform: "bg-black text-white",
  recover: "bg-[#1FB6D6] text-[#04262c]",
};

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
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return generateSessionToken().slice(0, 36);
}

function emptyAnswers(): (NumericAnswer | null)[] {
  return Array.from({ length: QUESTION_COUNT }, () => null);
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: makeMeta({
      title: "ClutchFuel — Prepare. Perform. Recover.",
      description:
        "Performance habits for competitive athletes. Take the Clutch Score in 60 seconds — hydration, fueling, recovery, sleep and preparation.",
      path: "/",
    }),
    links: canonical("/"),
  }),
  component: ClutchScoreApp,
});

type Step =
  | { kind: "landing" }
  | { kind: "quiz"; index: number }
  | { kind: "email" }
  | { kind: "result"; id: string; sessionToken: string; result: ClutchScoreResult };

function ClutchScoreApp() {
  const [step, setStep] = useState<Step>({ kind: "landing" });
  const [answers, setAnswers] = useState<(NumericAnswer | null)[]>(emptyAnswers);

  const startAssessment = () => {
    window.scrollTo({ top: 0 });
    setAnswers(emptyAnswers());
    setStep({ kind: "quiz", index: 0 });
  };

  if (step.kind === "landing") {
    return (
      <main id="main">
        <HomepageMarketing onGetScore={startAssessment} />
      </main>
    );
  }

  if (step.kind === "result") {
    return (
      <main id="main" className="min-h-screen bg-[#0B0D10] text-white">
        <Result
          id={step.id}
          sessionToken={step.sessionToken}
          result={step.result}
          onRetake={() => {
            setAnswers(emptyAnswers());
            setStep({ kind: "landing" });
            window.scrollTo({ top: 0 });
          }}
        />
      </main>
    );
  }

  const isQuiz = step.kind === "quiz";

  return (
    <main
      id="main"
      className={`min-h-screen ${
        isQuiz ? "bg-[#F5F4EF] text-[#0B0D10]" : "bg-[#0B0D10] text-white"
      }`}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-6 pt-5 pb-10 sm:py-14">
        <header className="mb-2 flex items-center justify-between">
          <Logo size="lg" variant={isQuiz ? "dark" : "light"} />
          {isQuiz && (
            <button
              onClick={() => {
                setStep({ kind: "landing" });
                window.scrollTo({ top: 0 });
              }}
              type="button"
              className="text-sm font-semibold text-[#767f8c] transition hover:text-[#0B0D10]"
            >
              Exit
            </button>
          )}
        </header>

        {isQuiz && (
          <>
            <div className="mb-1 h-1 overflow-hidden rounded-full bg-[#e2e0d6]">
              <div
                className="h-full rounded-full bg-[#FF5A1F] transition-all duration-300"
                style={{ width: `${(step.index / QUESTION_COUNT) * 100}%` }}
              />
            </div>
            <p className="font-display pt-2.5 text-[11px] uppercase tracking-[0.1em] text-[#767f8c]">
              Question {step.index + 1} / {QUESTION_COUNT} —{" "}
              {ASSESSMENT_QUESTIONS[step.index].pillar.toUpperCase()}
            </p>
          </>
        )}

        {step.kind === "quiz" && (
          <Quiz
            index={step.index}
            answers={answers}
            onAnswer={(value) => {
              const next = [...answers];
              next[step.index] = value;
              setAnswers(next);
              if (step.index < QUESTION_COUNT - 1) {
                setStep({ kind: "quiz", index: step.index + 1 });
              } else {
                setStep({ kind: "email" });
              }
            }}
            onBack={() => {
              if (step.index === 0) {
                setStep({ kind: "landing" });
                window.scrollTo({ top: 0 });
              } else {
                setStep({ kind: "quiz", index: step.index - 1 });
              }
            }}
          />
        )}

        {step.kind === "email" && (
          <EmailCapture
            answers={answers as NumericAnswer[]}
            onBack={() => setStep({ kind: "quiz", index: QUESTION_COUNT - 1 })}
            onComplete={(id, token, result) =>
              setStep({ kind: "result", id, sessionToken: token, result })
            }
          />
        )}
      </div>
    </main>
  );
}

function useSelectThenAdvance(onSelect: (value: NumericAnswer) => void, delayMs = 220) {
  const [pending, setPending] = useState<NumericAnswer | null>(null);
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

  return { pending, choose: (value: NumericAnswer) => setPending(value) };
}

function Quiz({
  index,
  answers,
  onAnswer,
  onBack,
}: {
  index: number;
  answers: (NumericAnswer | null)[];
  onAnswer: (a: NumericAnswer) => void;
  onBack: () => void;
}) {
  const question = ASSESSMENT_QUESTIONS[index];
  const { pending, choose } = useSelectThenAdvance(onAnswer);
  const selected = answers[index];

  return (
    <section className="flex flex-1 flex-col pt-6">
      <span
        className={`mb-5 inline-block w-fit rounded-full px-3.5 py-1.5 font-display text-[11px] font-bold uppercase tracking-[0.1em] ${PILLAR_TAG[question.pillar]}`}
      >
        {question.pillar}
      </span>

      <h2 className="max-w-md text-balance text-[clamp(1.375rem,5.6vw,1.75rem)] font-bold leading-snug">
        {question.text}
      </h2>

      <div className="mt-9 flex flex-col gap-2.5 sm:mt-auto">
        {ASSESSMENT_SCALE.map((label, i) => {
          const value = (i + 1) as NumericAnswer;
          const active = selected === value || pending === value;
          return (
            <button
              key={label}
              onClick={() => choose(value)}
              disabled={pending !== null}
              type="button"
              className={`flex w-full items-center justify-between rounded-[14px] border-[1.5px] px-5 py-[18px] text-left text-[15px] font-semibold transition active:scale-[0.99] disabled:cursor-wait ${
                active
                  ? "border-[#FF5A1F] bg-[#fff0e8] text-[#0B0D10]"
                  : "border-[#e2e0d6] bg-white text-[#0B0D10] hover:border-[#FF5A1F] hover:bg-[#fff0e8]"
              }`}
            >
              <span>{label}</span>
              <span
                className={`h-5 w-5 shrink-0 rounded-full border-2 ${
                  active ? "border-[#FF5A1F] bg-[#FF5A1F]" : "border-[#e2e0d6]"
                }`}
                aria-hidden
              />
            </button>
          );
        })}
      </div>

      <div className="mt-7">
        <button
          onClick={onBack}
          disabled={index === 0 || pending !== null}
          type="button"
          className="text-[13px] font-semibold text-[#767f8c] transition hover:text-[#0B0D10] disabled:invisible"
        >
          ← Back
        </button>
      </div>
    </section>
  );
}

function EmailCapture({
  answers,
  onBack,
  onComplete,
}: {
  answers: NumericAnswer[];
  onBack: () => void;
  onComplete: (id: string, sessionToken: string, result: ClutchScoreResult) => void;
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
    const result = computeClutchScore(answers);
    const legacy = legacyQuestionFields(answers);
    const sessionToken = generateSessionToken();
    const id = generateId();
    try {
      const { error } = await supabase.from("assessment_responses").insert({
        id,
        first_name: firstName.trim() || null,
        email: email.trim(),
        source: source || null,
        ...legacy,
        clutch_score: result.overall,
        opportunity: result.opportunity.title,
        next_step: result.opportunity.move,
        session_token: sessionToken,
      });
      if (error) {
        console.error("[Clutch Score] assessment save failed:", error.message);
      }
    } catch (err) {
      console.error("[Clutch Score] assessment save error:", err);
    } finally {
      setSubmitting(false);
    }
    onComplete(id, sessionToken, result);
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
          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-base text-white placeholder:text-white/35 focus:border-[#FF5A1F] focus:outline-none"
        />
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name (optional)"
          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-base text-white placeholder:text-white/35 focus:border-[#FF5A1F] focus:outline-none"
        />
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-base text-white focus:border-[#FF5A1F] focus:outline-none"
        >
          <option value="">How did you hear about Clutch Score? (optional)</option>
          {SOURCES.map((s) => (
            <option key={s} value={s} className="bg-[#0B0D10]">
              {s}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={submitting}
          className="mt-2 w-full rounded-full bg-[#FF5A1F] px-8 py-5 text-base font-semibold text-white transition hover:bg-[#D4460F] disabled:opacity-60"
        >
          {submitting ? "Calculating…" : "Show My Result"}
        </button>
      </form>
    </section>
  );
}

function Result({
  id,
  sessionToken,
  result,
  onRetake,
}: {
  id: string;
  sessionToken: string;
  result: ClutchScoreResult;
  onRetake: () => void;
}) {
  const [showShare, setShowShare] = useState(false);
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const submitFeedbackFn = useServerFn(submitFeedback);

  const { overall, pillars, opportunity, tagline } = result;

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
    <div className="mx-auto w-full max-w-xl px-6 py-10 pb-16 sm:py-14">
      <section className="flex flex-col">
        <p className="text-center font-display text-[11px] uppercase tracking-[0.14em] text-[#8b93a0]">
          Your Clutch Score™
        </p>

        <div className="mt-4 flex justify-center">
          <ScoreRing score={overall} size={220} stroke={14} />
        </div>

        <p className="mt-2 text-center text-sm text-[#c9cdd4]">{tagline}</p>

        <div className="mt-8 flex gap-3">
          <div className="flex flex-1 flex-col items-center rounded-[14px] border border-white/10 bg-white/[0.04] px-2.5 py-4">
            <PillarRing score={pillars.prepare} label="Prepare" accent="orange" size={56} />
          </div>
          <div className="flex flex-1 flex-col items-center rounded-[14px] border border-white/10 bg-white/[0.04] px-2.5 py-4">
            <PillarRing score={pillars.perform} label="Perform" accent="orange" size={56} />
          </div>
          <div className="flex flex-1 flex-col items-center rounded-[14px] border border-white/10 bg-white/[0.04] px-2.5 py-4">
            <PillarRing score={pillars.recover} label="Recover" accent="cyan" size={56} />
          </div>
        </div>

        <div className="mt-7 rounded-2xl border border-[#ff5a1f]/40 bg-[#ff5a1f]/12 px-5 py-5">
          <p className="font-display text-[11px] uppercase tracking-[0.12em] text-[#ffb894]">
            Your Biggest Opportunity
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-white">{opportunity.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#e5e8ec]">{opportunity.text}</p>
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-5">
          <p className="font-display text-[11px] uppercase tracking-[0.12em] text-[#1FB6D6]">
            Your First Clutch Move
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-white">{opportunity.move}</p>
        </div>

        <div className="mt-8 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={() => setShowShare((v) => !v)}
            className="inline-flex w-full items-center justify-center rounded-full bg-[#FF5A1F] px-6 py-4 font-display text-[13px] font-semibold uppercase tracking-wide text-white transition hover:bg-[#D4460F]"
          >
            {showShare ? "Hide Share Card" : "Share My Score"}
          </button>
          <button
            type="button"
            onClick={onRetake}
            className="inline-flex w-full items-center justify-center rounded-full border border-white/30 px-6 py-4 font-display text-[13px] font-semibold uppercase tracking-wide text-white transition hover:bg-white/[0.06]"
          >
            Retake My Clutch Score Later
          </button>
        </div>

        {showShare && (
          <div className="mt-6">
            <ShareCard overall={overall} pillars={pillars} opportunityTitle={opportunity.title} />
          </div>
        )}

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          {submitted ? (
            <p className="text-center text-sm text-white/70">Thanks — your feedback is recorded.</p>
          ) : (
            <>
              <p className="text-sm font-semibold text-white/70">Was this result helpful?</p>
              <div className="mt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setHelpful(true)}
                  className={`flex-1 rounded-xl border px-4 py-3 text-lg transition ${
                    helpful === true
                      ? "border-[#FF5A1F] bg-[#ff5a1f]/10 text-[#FF5A1F]"
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
                      ? "border-[#FF5A1F] bg-[#ff5a1f]/10 text-[#FF5A1F]"
                      : "border-white/10 bg-white/[0.03] hover:border-white/30"
                  }`}
                >
                  👎 No
                </button>
              </div>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={2}
                placeholder="Optional note"
                className="mt-4 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#FF5A1F] focus:outline-none"
              />
              <button
                type="button"
                onClick={handleFeedback}
                disabled={submitting}
                className="mt-3 w-full rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#FF5A1F] hover:text-[#FF5A1F] disabled:opacity-60"
              >
                {submitting ? "Saving…" : "Submit Feedback"}
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
