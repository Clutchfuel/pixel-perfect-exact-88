import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Flame } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScoreRing } from "@/components/ScoreRing";
import { CFButton } from "@/components/CFButton";
import { FormConsent } from "@/components/FormConsent";
import { TurnstileWidget } from "@/components/TurnstileWidget";
import { DeviceConnectSection } from "@/components/DeviceConnectSection";
import { clutchScoreQuiz, type QuizAnswers } from "@/data/clutch-score";
import {
  calculatorMessaging,
  quickEstimateFields,
  quickStepOrder,
  type CalculatorMode,
  type QuickEstimateAnswers,
  type QuickStepKey,
} from "@/data/calculator";
import { experienceCopy } from "@/data/experience-copy";
import { calculateClutchScore, getProfileCopy, type ClutchScoreResult } from "@/lib/clutch-score";
import { leadErrorMessage } from "@/lib/form-errors";
import { makeMeta, canonical } from "@/lib/seo";
import { DEFAULT_OG_IMAGE } from "@/config";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/clutch-score")({
  head: () => ({
    meta: makeMeta({
      title: "Clutch Score — Personalized Hydration Profile | ClutchFuel",
      description:
        "Discover your personalized hydration profile and understand what your body needs to perform at its best. Takes less than 60 seconds.",
      path: "/clutch-score",
      image: DEFAULT_OG_IMAGE,
    }),
    links: canonical("/clutch-score"),
  }),
  component: ClutchScorePage,
});

const CARD = "performance-card p-8 md:p-10";
const BORDER = "#242424";
const MUTED = "#A1A1A1";

const emptyAnswers = (): QuizAnswers => ({
  bodyType: "",
  trainingLoad: "",
  sweatLevel: "",
  environment: "",
  goal: "",
});

const emptyQuick = (): QuickEstimateAnswers => ({
  sport: "",
  duration: "",
  intensity: "",
  sweatLevel: "",
  hydrationFeeling: "okay",
});

function parseCalories(value: string): number | undefined {
  const n = Number(value.trim());
  if (!value.trim() || !Number.isFinite(n) || n < 50 || n > 5000) return undefined;
  return Math.round(n);
}

function CaloriesField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="mt-8 rounded-2xl border p-4" style={{ borderColor: BORDER, background: "#121212" }}>
      <label htmlFor="calories-burned" className="flex items-center gap-2 text-sm font-medium text-white">
        <Flame className="h-4 w-4 text-lime" aria-hidden />
        {calculatorMessaging.caloriesLabel}
      </label>
      <input
        id="calories-burned"
        type="number"
        min={50}
        max={5000}
        inputMode="numeric"
        placeholder="e.g. 420"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 h-11 w-full rounded-xl border px-4 text-white placeholder:text-white/35 focus:outline-none focus:ring-1 focus:ring-lime"
        style={{ borderColor: BORDER, background: "#0A0A0A" }}
      />
      <p className="mt-2 text-xs" style={{ color: MUTED }}>
        {calculatorMessaging.caloriesHint}
      </p>
    </div>
  );
}

function IntroCard({ onContinue }: { onContinue: () => void }) {
  return (
    <div className={CARD}>
      <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: MUTED }}>
        {experienceCopy.badge}
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
        {experienceCopy.intro.headline}
      </h1>
      <p className="mt-4 text-sm leading-relaxed" style={{ color: MUTED }}>
        {experienceCopy.intro.body}
      </p>
      <button
        type="button"
        onClick={onContinue}
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink transition hover:bg-lime-dark"
      >
        {experienceCopy.intro.cta}
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function ClutchScorePage() {
  const [mode, setMode] = useState<CalculatorMode>("quick");
  const [showIntro, setShowIntro] = useState(true);
  const [step, setStep] = useState(0);
  const [quickStep, setQuickStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(emptyAnswers);
  const [quick, setQuick] = useState<QuickEstimateAnswers>(emptyQuick);
  const [caloriesInput, setCaloriesInput] = useState("");
  const [result, setResult] = useState<ClutchScoreResult | null>(null);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);

  const current = clutchScoreQuiz.steps[step];
  const isLastFull = step === clutchScoreQuiz.steps.length - 1;
  const field = current?.id;
  const selected = field ? answers[field] : "";
  const caloriesBurned = parseCalories(caloriesInput);

  const quickFieldKey = quickStepOrder[quickStep] as QuickStepKey;
  const quickFieldDef = quickEstimateFields[quickFieldKey];
  const quickStepCopy = experienceCopy.quickSteps[quickFieldKey];
  const quickSelected = quick[quickFieldKey];
  const isLastQuick = quickStep === quickStepOrder.length - 1;

  const quickReady =
    quick.sport && quick.duration && quick.intensity && quick.sweatLevel;

  function selectOption(value: string) {
    if (!field) return;
    setAnswers((prev) => ({ ...prev, [field]: value }));
  }

  function retakeQuiz() {
    setResult(null);
    setStep(0);
    setQuickStep(0);
    setShowIntro(true);
    setAnswers(emptyAnswers());
    setQuick(emptyQuick());
    setCaloriesInput("");
    setEmail("");
    setSaved(false);
    setTurnstileToken("");
  }

  function runScore() {
    const calories = parseCalories(caloriesInput);
    if (mode === "quick") {
      if (!quickReady) return;
      const scored = calculateClutchScore({
        mode: "quick",
        quick: { ...quick, hydrationFeeling: quick.hydrationFeeling || "okay" },
        caloriesBurned: calories,
      });
      setResult(scored);
      trackEvent("clutch_score_complete", {
        score: scored.score,
        profile: scored.profile,
        mode: "quick",
      });
      return;
    }
    const finalAnswers = { ...answers, [field!]: selected } as QuizAnswers;
    setAnswers(finalAnswers);
    const scored = calculateClutchScore({
      mode: "full",
      answers: finalAnswers,
      caloriesBurned: calories,
    });
    setResult(scored);
    trackEvent("clutch_score_complete", {
      score: scored.score,
      profile: scored.profile,
      mode: "full",
    });
  }

  function goNextFull() {
    if (!selected || !field) return;
    trackEvent("clutch_score_step", { step: String(step + 1) });
    if (isLastFull) {
      runScore();
      return;
    }
    setStep((s) => s + 1);
  }

  function goNextQuick() {
    if (!quickSelected) return;
    trackEvent("clutch_score_step", { step: String(quickStep + 1), mode: "quick" });
    if (isLastQuick) {
      runScore();
      return;
    }
    setQuickStep((s) => s + 1);
  }

  function goBackFull() {
    if (showIntro) return;
    if (step === 0) {
      setShowIntro(true);
      return;
    }
    setStep((s) => Math.max(0, s - 1));
  }

  function goBackQuick() {
    if (showIntro) return;
    if (quickStep === 0) {
      setShowIntro(true);
      return;
    }
    setQuickStep((s) => Math.max(0, s - 1));
  }

  function switchMode(m: CalculatorMode) {
    setMode(m);
    setStep(0);
    setQuickStep(0);
    setShowIntro(true);
    setResult(null);
  }

  async function saveResults(e: React.FormEvent) {
    e.preventDefault();
    if (!result || !email) return;
    setSubmitting(true);
    try {
      const payload =
        mode === "quick"
          ? { mode: "quick" as const, quick, caloriesBurned }
          : { mode: "full" as const, answers, caloriesBurned };

      const res = await fetch("/api/leads/clutch-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          ...payload,
          marketingConsent: true,
          ...(turnstileToken ? { turnstileToken } : {}),
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? leadErrorMessage(res.status));
      trackEvent("form_submit", { form: "clutch-score" });
      setSaved(true);
      toast.success("Profile saved — check your inbox.");
    } catch (err) {
      const message = err instanceof Error ? err.message : leadErrorMessage(500);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  const totalSteps = mode === "quick" ? quickStepOrder.length : clutchScoreQuiz.steps.length;
  const currentStepIndex = showIntro
    ? 0
    : mode === "quick"
      ? quickStep + 1
      : step + 1;
  const progress = result ? 100 : Math.round((currentStepIndex / (totalSteps + 1)) * 100);

  return (
    <>
      <Header overDark />
      <main
        id="main"
        className="relative min-h-screen performance-surface pt-28 pb-24 md:pt-36 md:pb-32"
        style={{ background: "#0A0A0A" }}
      >
        <div className="relative mx-auto max-w-2xl px-6 md:px-10">
          {!result && (
            <div
              className="mb-8 flex rounded-full border p-1"
              style={{ borderColor: BORDER, background: "#121212" }}
            >
              {(["quick", "full"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => switchMode(m)}
                  className={`flex-1 rounded-full px-4 py-2.5 text-sm font-medium transition ${
                    mode === m ? "bg-lime text-ink" : "text-white/70 hover:text-white"
                  }`}
                >
                  {m === "quick"
                    ? experienceCopy.modes.quick.label
                    : experienceCopy.modes.full.label}
                </button>
              ))}
            </div>
          )}

          <div
            className="mb-8 h-1 overflow-hidden rounded-full"
            style={{ background: BORDER }}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-label="Profile progress"
          >
            <div
              className="h-full rounded-full bg-lime transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className={CARD}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: MUTED }}>
                  {experienceCopy.badge}
                </p>
                <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
                  {experienceCopy.results.headline}
                </h1>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: MUTED }}>
                  {experienceCopy.results.supporting}
                </p>

                <div className="mt-10 flex justify-center">
                  <ScoreRing value={result.score} label="Clutch Score" />
                </div>

                <p className="mt-4 text-center font-display text-lg font-bold text-white">
                  {result.profile}
                </p>
                <p className="mx-auto mt-2 max-w-md text-center text-sm" style={{ color: MUTED }}>
                  {getProfileCopy(result.profile)}
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Session intensity", value: result.sessionIntensity },
                    { label: "Hydration demand", value: `${result.estimatedSweatRateLhr} L/hr` },
                    { label: "Fluid loss", value: `${result.estimatedFluidLossOz} oz` },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl border p-4 text-center"
                      style={{ borderColor: BORDER, background: "#121212" }}
                    >
                      <div className="text-[11px] uppercase tracking-wider" style={{ color: MUTED }}>
                        {metric.label}
                      </div>
                      <div className="mt-1 font-display text-2xl font-bold text-white">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-8 rounded-2xl border p-5"
                  style={{ borderColor: BORDER, background: "#121212" }}
                >
                  <h2 className="font-display text-lg font-bold text-white">
                    {experienceCopy.results.hydrationInsightTitle}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTED }}>
                    {result.hydrationRecommendation || experienceCopy.results.hydrationInsightBody}
                  </p>
                </div>

                <ul className="mt-6 space-y-2">
                  {result.hydrationGuidance.map((tip) => (
                    <li key={tip} className="text-sm leading-relaxed" style={{ color: MUTED }}>
                      {tip}
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <CFButton to="/platform" variant="primary" size="lg">
                    {experienceCopy.results.cta}
                  </CFButton>
                  <button
                    type="button"
                    onClick={retakeQuiz}
                    className="text-sm transition hover:text-white"
                    style={{ color: MUTED }}
                  >
                    {experienceCopy.results.retake}
                  </button>
                </div>

                {!saved ? (
                  <form
                    onSubmit={saveResults}
                    className="mt-10 border-t pt-10"
                    style={{ borderColor: BORDER }}
                  >
                    <p className="text-center text-sm" style={{ color: MUTED }}>
                      {clutchScoreQuiz.result.emailHint}
                    </p>
                    <div className="mx-auto mt-4 flex max-w-md flex-col gap-2 sm:flex-row">
                      <input
                        type="email"
                        required
                        maxLength={254}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={clutchScoreQuiz.result.emailPlaceholder}
                        className="h-12 flex-1 rounded-full border px-5 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-lime"
                        style={{ borderColor: BORDER, background: "#121212" }}
                      />
                      <button
                        type="submit"
                        disabled={submitting}
                        className="h-12 rounded-full bg-lime px-6 text-sm font-semibold text-ink transition hover:bg-lime-dark disabled:opacity-60"
                      >
                        {submitting ? "Saving…" : clutchScoreQuiz.result.emailCta}
                      </button>
                    </div>
                    <div className="mx-auto mt-4 max-w-md text-center">
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
                  <p className="mt-10 text-center text-sm text-lime">
                    Profile saved — check your inbox.
                  </p>
                )}
              </motion.div>
            ) : showIntro ? (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <IntroCard onContinue={() => setShowIntro(false)} />
              </motion.div>
            ) : mode === "quick" ? (
              <motion.div
                key={`quick-${quickStep}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className={CARD}
              >
                <p className="text-xs uppercase tracking-wider" style={{ color: MUTED }}>
                  Step {quickStep + 1} of {quickStepOrder.length}
                </p>
                <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
                  {quickStepCopy.headline}
                </h1>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: MUTED }}>
                  {quickStepCopy.subheadline}
                </p>

                <div className="mt-8 grid gap-2 sm:grid-cols-2">
                  {quickFieldDef.options.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setQuick((prev) => ({ ...prev, [quickFieldKey]: opt.value }))}
                      className={`rounded-2xl border px-4 py-4 text-left transition ${
                        quickSelected === opt.value ? "border-lime bg-lime/10" : ""
                      }`}
                      style={{
                        borderColor: quickSelected === opt.value ? undefined : BORDER,
                        background: quickSelected === opt.value ? undefined : "#121212",
                      }}
                    >
                      <div className="font-medium text-white">{opt.label}</div>
                      {"description" in opt && opt.description ? (
                        <div className="mt-1 text-xs" style={{ color: MUTED }}>
                          {opt.description}
                        </div>
                      ) : null}
                    </button>
                  ))}
                </div>

                {isLastQuick && (
                  <>
                    <CaloriesField value={caloriesInput} onChange={setCaloriesInput} />
                    <DeviceConnectSection />
                  </>
                )}

                <div className="mt-10 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={goBackQuick}
                    className="inline-flex items-center gap-2 text-sm transition hover:text-white"
                    style={{ color: MUTED }}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={goNextQuick}
                    disabled={!quickSelected}
                    className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink transition hover:bg-lime-dark disabled:opacity-40"
                  >
                    {isLastQuick ? "See my score" : "Next"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`full-${step}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className={CARD}
              >
                <p className="text-xs uppercase tracking-wider" style={{ color: MUTED }}>
                  Step {step + 1} of {clutchScoreQuiz.steps.length}
                </p>
                <h1
                  id={`quiz-q-${step}`}
                  className="mt-4 font-display text-3xl font-bold tracking-tight text-white md:text-4xl"
                >
                  {current.question}
                </h1>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: MUTED }}>
                  {calculatorMessaging.fullProfileSub}
                </p>

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
                        selected === opt.value ? "border-lime bg-lime/10" : ""
                      }`}
                      style={{
                        borderColor: selected === opt.value ? undefined : BORDER,
                        background: selected === opt.value ? undefined : "#121212",
                      }}
                    >
                      <div className="font-medium text-white">{opt.label}</div>
                      <div className="mt-1 text-sm" style={{ color: MUTED }}>
                        {opt.description}
                      </div>
                    </button>
                  ))}
                </div>

                {isLastFull && <CaloriesField value={caloriesInput} onChange={setCaloriesInput} />}
                {step === 0 && <DeviceConnectSection />}

                <div className="mt-10 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={goBackFull}
                    className="inline-flex items-center gap-2 text-sm transition hover:text-white"
                    style={{ color: MUTED }}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={goNextFull}
                    disabled={!selected}
                    className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink transition hover:bg-lime-dark disabled:opacity-40"
                  >
                    {isLastFull ? "See my score" : "Next"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-8 text-center text-xs" style={{ color: MUTED }}>
            Performance insights for educational and training purposes — not medical advice.{" "}
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
