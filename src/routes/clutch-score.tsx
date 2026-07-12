import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Target, Zap } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/Badge";
import { CFButton } from "@/components/CFButton";
import { FormConsent } from "@/components/FormConsent";
import { TurnstileWidget } from "@/components/TurnstileWidget";
import { type AnswerIndex, type Answers, questions } from "@/lib/diagnostic-config";
import { buildDiagnosticResult, type DiagnosticResult } from "@/lib/diagnostic-result";
import { leadErrorMessage } from "@/lib/form-errors";
import { makeMeta, canonical, webApplicationSchema, breadcrumbSchema } from "@/lib/seo";
import { DEFAULT_OG_IMAGE } from "@/config";
import { trackEvent } from "@/lib/analytics";
import clutchHeroAvif from "@/assets/clutch-score-hero.avif";
import clutchHeroWebp from "@/assets/clutch-score-hero.webp";
import clutchHero from "@/assets/clutch-score-hero.jpg";
import { OptimizedImage } from "@/components/OptimizedImage";
import { RelatedLinks } from "@/components/RelatedLinks";

export const Route = createFileRoute("/clutch-score")({
  head: () => ({
    meta: makeMeta({
      title: "Clutch Score — Performance Diagnostic | ClutchFuel",
      description:
        "Answer 5 quick questions and unlock your Clutch Score, biggest opportunity, and First Clutch Move in under two minutes.",
      path: "/clutch-score",
      image: DEFAULT_OG_IMAGE,
    }),
    links: canonical("/clutch-score"),
    scripts: [
      webApplicationSchema({
        name: "Clutch Score",
        description:
          "Free 5-question performance diagnostic for everyday athletes. Returns a Clutch Score, Biggest Opportunity, and First Clutch Move.",
        path: "/clutch-score",
      }),
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Clutch Score", path: "/clutch-score" },
      ]),
    ],
  }),
  component: ClutchScorePage,
});

type Phase = "intro" | "quiz" | "results";

const emptyAnswers = (): Partial<Answers> => ({});

function ClutchScorePage() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>(emptyAnswers);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const current = questions[step];
  const total = questions.length;
  const isLast = step === total - 1;
  const selected = current ? answers[current.id] : undefined;

  useEffect(() => {
    if (phase === "intro") {
      trackEvent("clutch_score_start");
    }
  }, [phase]);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [phase, step]);

  function choose(index: AnswerIndex) {
    if (!current) return;
    setAnswers((prev) => ({ ...prev, [current.id]: index }));
  }

  function retakeQuiz() {
    setPhase("intro");
    setResult(null);
    setStep(0);
    setAnswers(emptyAnswers());
    setEmail("");
    setSaved(false);
    setShowFeedback(false);
    setTurnstileToken("");
    setMarketingConsent(false);
  }

  function startQuiz() {
    setPhase("quiz");
    trackEvent("clutch_score_step", { step: 1 });
  }

  function goNext() {
    if (selected === undefined || !current) return;
    trackEvent("clutch_score_step", { step: step + 1 });

    if (isLast) {
      const finalAnswers = { ...answers, [current.id]: selected } as Answers;
      setAnswers(finalAnswers);
      const scored = buildDiagnosticResult(finalAnswers);
      setResult(scored);
      setPhase("results");
      trackEvent("clutch_score_complete", {
        score: scored.score,
        opportunity: scored.opportunity,
      });
      return;
    }
    setStep((s) => s + 1);
  }

  function goBack() {
    if (phase === "results") {
      retakeQuiz();
      return;
    }
    if (phase === "quiz" && step === 0) {
      setPhase("intro");
      return;
    }
    setStep((s) => Math.max(0, s - 1));
  }

  async function saveResults(e: React.FormEvent) {
    e.preventDefault();
    if (!result || !email || !marketingConsent) {
      toast.error("Please enter your email and agree to receive emails.");
      return;
    }
    const complete = answers as Answers;
    if (
      complete.q1 === undefined ||
      complete.q2 === undefined ||
      complete.q3 === undefined ||
      complete.q4 === undefined ||
      complete.q5 === undefined
    ) {
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/leads/clutch-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          answers: complete,
          marketingConsent: true,
          ...(turnstileToken ? { turnstileToken } : {}),
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? leadErrorMessage(res.status));
      trackEvent("clutch_score_email_save", { opportunity: result.opportunity });
      trackEvent("form_submit", { form: "clutch-score" });
      setSaved(true);
      toast.success("Results saved — check your inbox.");
    } catch (err) {
      const message = err instanceof Error ? err.message : leadErrorMessage(500);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  const progress =
    phase === "results"
      ? 100
      : phase === "intro"
        ? 0
        : Math.round(((step + (selected !== undefined ? 1 : 0)) / total) * 100);

  return (
    <>
      <Header overDark />
      <main
        id="main"
        className="relative min-h-screen overflow-hidden bg-dark pt-28 pb-24 md:pt-36 md:pb-32"
      >
        <OptimizedImage
          avif={clutchHeroAvif}
          webp={clutchHeroWebp}
          fallback={clutchHero}
          alt="Athlete viewing performance data on a phone"
          width={1920}
          height={1080}
          priority
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/70 to-dark" />
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/15 blur-[140px]" />

        <div className="relative mx-auto max-w-2xl px-6 md:px-10">
          <div
            className="mb-8 h-1.5 overflow-hidden rounded-full bg-white/10"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-label="Assessment progress"
          >
            <div
              className="h-full rounded-full bg-lime transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <AnimatePresence mode="wait">
            {phase === "intro" ? (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="rounded-3xl glass-dark p-8 md:p-12 lime-glow"
              >
                <Badge variant="lime">
                  <Zap className="h-3.5 w-3.5" />
                  Clutch Score
                </Badge>
                <h1
                  ref={headingRef}
                  tabIndex={-1}
                  className="mt-6 font-display text-3xl font-extrabold tracking-display text-white outline-none md:text-4xl"
                >
                  What&apos;s your Clutch Score?
                </h1>
                <p className="mt-4 text-muted-dark">
                  Five questions. Under two minutes. You&apos;ll get a score, your biggest
                  opportunity, and a First Clutch Move™ you can use before your next session.
                </p>
                <ul className="mt-8 space-y-3 text-sm text-white/85">
                  {[
                    "Built for everyday athletes",
                    "Personalized opportunity + action",
                    "Email yourself the results",
                  ].map((line) => (
                    <li key={line} className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                      {line}
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <button
                    type="button"
                    onClick={startQuiz}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime px-6 py-4 text-sm font-semibold text-ink transition hover:bg-lime-dark sm:w-auto"
                  >
                    Unlock My Clutch Score
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ) : phase === "results" && result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="rounded-3xl glass-dark p-8 md:p-12 lime-glow"
              >
                <div className="text-center" aria-live="polite">
                  <Badge variant="lime">
                    <Target className="h-3.5 w-3.5" />
                    Your Clutch Score
                  </Badge>
                  <h1 ref={headingRef} tabIndex={-1} className="sr-only outline-none">
                    Your Clutch Score results
                  </h1>
                  <CountUp target={result.score} />
                </div>

                <div className="mt-10 rounded-2xl border border-lime/40 bg-lime/5 p-5 md:p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-eyebrow text-lime">
                    Your Biggest Opportunity
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-extrabold tracking-display text-white">
                    {result.opportunityLabel}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">{result.paragraph}</p>
                </div>

                <div className="mt-5 rounded-2xl border border-lime/40 bg-gradient-to-b from-lime/10 to-transparent p-5 md:p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-eyebrow text-lime">
                    Your First Clutch Move™
                  </p>
                  <p className="mt-3 text-lg font-bold leading-snug text-white">
                    {result.firstClutchMove.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-dark">
                    {result.firstClutchMove.body}
                  </p>
                </div>

                <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <CFButton
                    to={`/products/${result.recommendedProductSlug}`}
                    variant="primary"
                    size="lg"
                  >
                    Explore your match →
                  </CFButton>
                  <button
                    type="button"
                    onClick={retakeQuiz}
                    className="text-sm text-muted-dark underline-offset-4 hover:text-white hover:underline"
                  >
                    Retake assessment
                  </button>
                </div>

                {!saved ? (
                  <form onSubmit={saveResults} className="mt-10 border-t border-white/10 pt-10">
                    <p className="text-center text-sm text-muted-dark">
                      Email my Clutch Score & First Clutch Move
                    </p>
                    <div className="mx-auto mt-4 flex max-w-md flex-col gap-2 sm:flex-row sm:rounded-full sm:border sm:border-white/15 sm:bg-white/5 sm:p-1.5">
                      <input
                        type="email"
                        required
                        maxLength={254}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@email.com"
                        className="h-12 flex-1 rounded-full border border-white/15 bg-white/5 px-5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-lime sm:border-0 sm:bg-transparent"
                      />
                      <button
                        type="submit"
                        disabled={submitting || !marketingConsent}
                        className="h-12 rounded-full bg-lime px-6 text-sm font-semibold text-ink transition hover:bg-lime-dark disabled:opacity-60"
                      >
                        {submitting ? "Saving…" : "Email my results"}
                      </button>
                    </div>
                    <div className="mx-auto mt-4 max-w-md text-center text-white/60">
                      <FormConsent
                        id="clutch-score-marketing-consent"
                        checked={marketingConsent}
                        onChange={setMarketingConsent}
                        className="justify-center text-white/70 [&_a]:text-white/90"
                      />
                    </div>
                    <TurnstileWidget
                      onToken={setTurnstileToken}
                      onExpire={() => setTurnstileToken("")}
                    />
                  </form>
                ) : (
                  <div className="mt-10 space-y-4 border-t border-white/10 pt-10 text-center">
                    <p className="text-sm text-lime">Results saved — check your inbox.</p>
                    {!showFeedback ? (
                      <button
                        type="button"
                        onClick={() => setShowFeedback(true)}
                        className="text-sm text-muted-dark underline-offset-4 hover:text-white hover:underline"
                      >
                        Help us improve (2 min feedback)
                      </button>
                    ) : (
                      <FeedbackForm
                        result={result}
                        answers={answers as Answers}
                        onDone={() => {
                          setShowFeedback(false);
                          toast.success("Thanks for the feedback.");
                        }}
                      />
                    )}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                className="rounded-3xl glass-dark p-8 md:p-12 lime-glow"
              >
                <p className="text-xs uppercase tracking-eyebrow text-lime">
                  Question {step + 1} of {total}
                </p>
                <h1
                  ref={headingRef}
                  id={`quiz-q-${step}`}
                  tabIndex={-1}
                  className="mt-4 font-display text-3xl font-extrabold tracking-display text-white outline-none md:text-4xl"
                >
                  {current.prompt}
                </h1>
                <p className="mt-2 text-sm text-muted-dark">
                  Pick the option that sounds most like you right now.
                </p>

                <div
                  className="mt-8 space-y-3"
                  role="radiogroup"
                  aria-labelledby={`quiz-q-${step}`}
                >
                  {current.options.map((option, i) => {
                    const index = i as AnswerIndex;
                    const isSelected = selected === index;
                    return (
                      <button
                        key={option}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => choose(index)}
                        className={`w-full rounded-2xl border px-5 py-4 text-left text-base font-medium transition ${
                          isSelected
                            ? "border-lime bg-lime/10 text-white"
                            : "border-white/10 bg-white/5 text-white/90 hover:border-white/25"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-10 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex items-center gap-2 text-sm text-muted-dark transition hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={selected === undefined}
                    className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink transition hover:bg-lime-dark disabled:opacity-40"
                  >
                    {isLast ? "See my score" : "Next"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-8 text-center text-xs text-muted-dark">
            Not medical advice. For training performance guidance only.{" "}
            <Link to="/privacy" className="underline hover:text-white">
              Privacy
            </Link>
          </p>
        </div>
      </main>
      <RelatedLinks
        theme="dark"
        title="Go deeper"
        items={[
          {
            label: "The System",
            to: "/system",
            description: "Prepare, perform, recover.",
          },
          {
            label: "Sweat rate guide",
            to: "/sweat-rate",
            description: "Measure fluid loss precisely.",
          },
          {
            label: "FAQ",
            to: "/faq",
            description: "How Clutch Score works.",
          },
          {
            label: "Products",
            to: "/products",
            description: "ISO, Flow, and Recovery.",
          },
        ]}
      />
      <Footer />
    </>
  );
}

function CountUp({ target }: { target: number }) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setValue(target);
      return;
    }

    const duration = 900;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const t = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target]);

  return (
    <div className="mt-6 font-display text-7xl font-extrabold tabular-nums leading-none text-lime md:text-8xl">
      {value}
    </div>
  );
}

function FeedbackForm({
  result,
  answers,
  onDone,
}: {
  result: DiagnosticResult;
  answers: Answers;
  onDone: () => void;
}) {
  const [accuracy, setAccuracy] = useState("");
  const [resonated, setResonated] = useState("");
  const [missing, setMissing] = useState("");
  const [recommend, setRecommend] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!accuracy) {
      toast.error("Please rate how accurate your result felt.");
      return;
    }
    setPending(true);
    try {
      const res = await fetch("/api/leads/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accuracy,
          resonated,
          missing,
          recommend,
          score: result.score,
          opportunity: result.opportunityLabel,
          firstMove: result.firstClutchMove.title,
          answers,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? leadErrorMessage(res.status));
      trackEvent("clutch_score_feedback_submit", { accuracy });
      onDone();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : leadErrorMessage(500));
    } finally {
      setPending(false);
    }
  }

  const accuracyOptions = [
    "Extremely accurate",
    "Mostly accurate",
    "Somewhat accurate",
    "Not accurate",
  ];

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md space-y-5 text-left">
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-white">
          How accurate did your result feel?
        </legend>
        <div className="space-y-2">
          {accuracyOptions.map((option) => (
            <label
              key={option}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-3 text-sm ${
                accuracy === option
                  ? "border-lime bg-lime/10 text-white"
                  : "border-white/10 bg-white/5 text-white/80"
              }`}
            >
              <input
                type="radio"
                name="accuracy"
                value={option}
                checked={accuracy === option}
                onChange={(e) => setAccuracy(e.target.value)}
                className="accent-lime"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="block text-sm text-white/80">
        What resonated most?
        <textarea
          value={resonated}
          onChange={(e) => setResonated(e.target.value)}
          rows={2}
          maxLength={2000}
          className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-lime"
        />
      </label>
      <label className="block text-sm text-white/80">
        What felt missing?
        <textarea
          value={missing}
          onChange={(e) => setMissing(e.target.value)}
          rows={2}
          maxLength={2000}
          className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-lime"
        />
      </label>
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-white">Recommend to a friend?</legend>
        <div className="flex gap-2">
          {["Yes", "Maybe", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setRecommend(option)}
              className={`flex-1 rounded-xl border py-3 text-sm ${
                recommend === option
                  ? "border-lime bg-lime/10 text-white"
                  : "border-white/10 bg-white/5 text-white/70"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-lime py-3 text-sm font-semibold text-ink disabled:opacity-60"
      >
        {pending ? "Sending…" : "Submit feedback"}
      </button>
    </form>
  );
}
