import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Droplets } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/Badge";
import { ScoreRing } from "@/components/ScoreRing";
import { CFButton } from "@/components/CFButton";
import { FormConsent } from "@/components/FormConsent";
import { TurnstileWidget } from "@/components/TurnstileWidget";
import { clutchScoreQuiz, type QuizAnswers } from "@/data/clutch-score";
import { calculateClutchScore, getProfileCopy, type ClutchScoreResult } from "@/lib/clutch-score";
import { leadErrorMessage } from "@/lib/form-errors";
import { makeMeta, canonical } from "@/lib/seo";
import { DEFAULT_OG_IMAGE } from "@/config";
import { trackEvent } from "@/lib/analytics";
import clutchHeroAvif from "@/assets/clutch-score-hero.avif";
import clutchHeroWebp from "@/assets/clutch-score-hero.webp";
import clutchHero from "@/assets/clutch-score-hero.jpg";
import { OptimizedImage } from "@/components/OptimizedImage";

export const Route = createFileRoute("/clutch-score")({
  head: () => ({
    meta: makeMeta({
      title: "Clutch Score — Personalized Hydration Profile | ClutchFuel",
      description:
        "Answer 5 quick questions and unlock your Clutch Score, sweat profile, and personalized hydration guidance in under 60 seconds.",
      path: "/clutch-score",
      image: DEFAULT_OG_IMAGE,
    }),
    links: canonical("/clutch-score"),
  }),
  component: ClutchScorePage,
});

const emptyAnswers = (): QuizAnswers => ({
  bodyType: "",
  trainingLoad: "",
  sweatLevel: "",
  environment: "",
  goal: "",
});

function ClutchScorePage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(emptyAnswers);
  const [result, setResult] = useState<ClutchScoreResult | null>(null);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  const current = clutchScoreQuiz.steps[step];
  const isLast = step === clutchScoreQuiz.steps.length - 1;
  const field = current?.id;
  const selected = field ? answers[field] : "";

  function selectOption(value: string) {
    if (!field) return;
    setAnswers((prev) => ({ ...prev, [field]: value }));
  }

  function retakeQuiz() {
    setResult(null);
    setStep(0);
    setAnswers(emptyAnswers());
    setEmail("");
    setSaved(false);
    setTurnstileToken("");
  }

  function goNext() {
    if (!selected || !field) return;
    trackEvent("clutch_score_step", { step: String(step + 1) });
    if (isLast) {
      const finalAnswers = { ...answers, [field]: selected } as QuizAnswers;
      setAnswers(finalAnswers);
      const scored = calculateClutchScore(finalAnswers);
      setResult(scored);
      trackEvent("clutch_score_complete", { score: scored.score, profile: scored.profile });
      return;
    }
    setStep((s) => s + 1);
  }

  function goBack() {
    if (result) {
      retakeQuiz();
      return;
    }
    setStep((s) => Math.max(0, s - 1));
  }

  async function saveResults(e: React.FormEvent) {
    e.preventDefault();
    if (!result || !email) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads/clutch-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          answers,
          ...(turnstileToken ? { turnstileToken } : {}),
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? leadErrorMessage(res.status));
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

  const progress = result
    ? 100
    : Math.round(((step + (selected ? 1 : 0)) / clutchScoreQuiz.steps.length) * 100);

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
            aria-label="Quiz progress"
          >
            <div
              className="h-full rounded-full bg-lime transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="rounded-3xl glass-dark p-8 md:p-12 lime-glow"
              >
                <div className="text-center">
                  <Badge variant="lime">
                    <Droplets className="h-3.5 w-3.5" />
                    Your profile
                  </Badge>
                  <h1 className="mt-6 font-display text-3xl font-extrabold tracking-display text-white md:text-4xl">
                    {result.profile}
                  </h1>
                  <p className="mx-auto mt-3 max-w-md text-muted-dark">
                    {getProfileCopy(result.profile)}
                  </p>
                </div>

                <div className="mt-10 flex justify-center">
                  <ScoreRing value={result.score} label="Clutch Score" />
                </div>

                <ul className="mt-10 space-y-3">
                  {result.hydrationGuidance.map((tip) => (
                    <li
                      key={tip}
                      className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90"
                    >
                      <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                      {tip}
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <CFButton
                    to={`/products/${result.recommendedProductSlug}`}
                    variant="primary"
                    size="lg"
                  >
                    Shop your match →
                  </CFButton>
                  <button
                    type="button"
                    onClick={retakeQuiz}
                    className="text-sm text-muted-dark underline-offset-4 hover:text-white hover:underline"
                  >
                    Retake quiz
                  </button>
                </div>

                {!saved ? (
                  <form onSubmit={saveResults} className="mt-10 border-t border-white/10 pt-10">
                    <p className="text-center text-sm text-muted-dark">
                      {clutchScoreQuiz.result.emailHint}
                    </p>
                    <div className="mx-auto mt-4 flex max-w-md flex-col gap-2 sm:flex-row sm:rounded-full sm:border sm:border-white/15 sm:bg-white/5 sm:p-1.5">
                      <input
                        type="email"
                        required
                        maxLength={254}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={clutchScoreQuiz.result.emailPlaceholder}
                        className="h-12 flex-1 rounded-full border border-white/15 bg-white/5 px-5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-lime sm:border-0 sm:bg-transparent"
                      />
                      <button
                        type="submit"
                        disabled={submitting}
                        className="h-12 rounded-full bg-lime px-6 text-sm font-semibold text-ink transition hover:bg-lime-dark disabled:opacity-60"
                      >
                        {submitting ? "Saving…" : clutchScoreQuiz.result.emailCta}
                      </button>
                    </div>
                    <div className="mx-auto mt-4 max-w-md text-center text-white/60">
                      <FormConsent />
                    </div>
                    <TurnstileWidget
                      onToken={setTurnstileToken}
                      onExpire={() => setTurnstileToken("")}
                    />
                  </form>
                ) : (
                  <p className="mt-10 text-center text-sm text-lime">
                    Results saved — check your inbox.
                  </p>
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
                  Question {step + 1} of {clutchScoreQuiz.steps.length}
                </p>
                <h1
                  id={`quiz-q-${step}`}
                  className="mt-4 font-display text-3xl font-extrabold tracking-display text-white md:text-4xl"
                >
                  {current.question}
                </h1>
                <p className="mt-2 text-sm text-muted-dark">{clutchScoreQuiz.subtitle}</p>

                <div
                  className="mt-8 space-y-3"
                  role="radiogroup"
                  aria-labelledby={`quiz-q-${step}`}
                >
                  {current.options.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      role="radio"
                      aria-checked={selected === opt.value}
                      onClick={() => selectOption(opt.value)}
                      className={`w-full rounded-2xl border px-5 py-4 text-left transition ${
                        selected === opt.value
                          ? "border-lime bg-lime/10"
                          : "border-white/10 bg-white/5 hover:border-white/25"
                      }`}
                    >
                      <div className="font-medium text-white">{opt.label}</div>
                      <div className="mt-1 text-sm text-muted-dark">{opt.description}</div>
                    </button>
                  ))}
                </div>

                <div className="mt-10 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={step === 0}
                    className="inline-flex items-center gap-2 text-sm text-muted-dark transition hover:text-white disabled:opacity-30"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!selected}
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
            Not medical advice. For training hydration guidance only.{" "}
            <Link to="/privacy" className="underline hover:text-white">
              Privacy
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
