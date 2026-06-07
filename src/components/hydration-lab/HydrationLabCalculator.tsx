import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Scale, Watch } from "lucide-react";
import {
  bathroomOptions,
  conditionOptions,
  durationOptions,
  fluidOptions,
  hydrationLabBrand,
  hydrationLabCopy,
  intensityOptions,
  stepCopy,
  trainingTypeOptions,
  zoneResults,
} from "@/data/hydration-lab";
import {
  calculatePrecision,
  calculateQuick,
  type HydrationLabMode,
  type HydrationLabResult,
  type PrecisionInput,
  type QuickInput,
} from "@/lib/hydration-lab";
import { CFButton } from "@/components/CFButton";
import { ResultsMetricsGuide } from "@/components/ResultsMetricsGuide";
import { cn } from "@/lib/utils";
import { optionButtonClass, quizCardClass, quizMutedClass, quizSurface } from "@/lib/quiz-surface";

const ACCENT = hydrationLabBrand.accent;
const DARK = quizSurface.dark;

type StepId = keyof typeof stepCopy;

function OptionButton({
  selected,
  onClick,
  label,
  theme,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  theme: "light" | "dark";
}) {
  return (
    <button type="button" onClick={onClick} className={optionButtonClass(theme, selected)}>
      <div className={cn("font-medium", theme === "light" ? "text-ink" : "text-white")}>
        {label}
      </div>
    </button>
  );
}

function PerformanceCard({
  children,
  theme,
  className = "",
}: {
  children: React.ReactNode;
  theme: "light" | "dark";
  className?: string;
}) {
  if (theme === "light") {
    return <div className={cn(quizCardClass("light"), className)}>{children}</div>;
  }
  return (
    <div className={cn(quizCardClass("dark"), className)} style={DARK.cardInline}>
      {children}
    </div>
  );
}

function ResultsView({ result, onRestart }: { result: HydrationLabResult; onRestart: () => void }) {
  const zone = zoneResults[result.zone];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <PerformanceCard theme="dark">
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.12em]",
            quizMutedClass("dark"),
          )}
        >
          {hydrationLabCopy.badge}
        </p>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
          {hydrationLabCopy.resultsHeadline}
        </h2>
        <p className={cn("mt-3 text-sm leading-relaxed", quizMutedClass("dark"))}>
          {hydrationLabCopy.resultsSupporting}
        </p>

        <div className="mt-10 flex justify-center">
          <div
            className="rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide"
            style={{ background: "rgba(183,255,0,0.12)", color: ACCENT }}
          >
            {zone.badge}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              label: "Sweat rate",
              value: `${result.sweatRateLph} L/hr`,
              sub: `${result.sweatRateOph} oz/hr`,
            },
            {
              label: "Sweat loss",
              value: `${result.totalSweatLossL} L`,
              sub: result.modeLabel,
            },
            {
              label: "Sodium loss (est.)",
              value: `${result.sodiumLossMg.toLocaleString()} mg`,
              sub: "Typical range for your profile",
            },
            ...(result.bodyMassLossKg != null
              ? [
                  {
                    label: "Body mass loss",
                    value: `${result.bodyMassLossKg} kg`,
                    sub: "From pre/post weight",
                  },
                ]
              : []),
          ].map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border p-5"
              style={{ borderColor: DARK.optionBorder, background: DARK.optionBg }}
            >
              <div className={cn("text-xs uppercase tracking-wider", quizMutedClass("dark"))}>
                {metric.label}
              </div>
              <div className="mt-2 font-display text-2xl font-bold text-white">{metric.value}</div>
              <div className={cn("mt-1 text-sm", quizMutedClass("dark"))}>{metric.sub}</div>
            </div>
          ))}
        </div>

        <ResultsMetricsGuide
          theme="dark"
          showBodyMass={result.bodyMassLossKg != null}
          className="mt-10"
        />

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-white/90">
          <div>
            <h3 className="font-display text-lg font-bold text-white">{zone.insightTitle}</h3>
            <p className={cn("mt-2", quizMutedClass("dark"))}>{zone.insightBody}</p>
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-white">Your Game Plan</h3>
            <ul className="mt-3 space-y-2">
              {zone.gamePlan.map((item) => (
                <li key={item} className={cn("flex gap-3", quizMutedClass("dark"))}>
                  <span style={{ color: ACCENT }} aria-hidden>
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className={cn("text-sm", quizMutedClass("dark"))}>{zone.keyInsight}</p>
        </div>

        <p
          className={cn("mt-10 border-t pt-6 text-xs", quizMutedClass("dark"))}
          style={{ borderColor: DARK.optionBorder }}
        >
          {hydrationLabCopy.resultsDisclaimer}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <CFButton to="/platform" variant="primary" size="md">
            {hydrationLabCopy.resultsCta}
          </CFButton>
          <button
            type="button"
            onClick={onRestart}
            className="rounded-full border px-5 py-2.5 text-sm font-medium text-white/70 transition hover:text-white"
            style={{ borderColor: DARK.optionBorder }}
          >
            {hydrationLabCopy.resultsRetake}
          </button>
        </div>
      </PerformanceCard>
    </motion.div>
  );
}

export function HydrationLabCalculator({
  onPhaseChange,
}: {
  onPhaseChange?: (phase: "intro" | "mode" | "steps" | "results") => void;
}) {
  const [phase, setPhase] = useState<"intro" | "mode" | "steps" | "results">("intro");
  const [mode, setMode] = useState<HydrationLabMode>("quick");
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<HydrationLabResult | null>(null);

  const [quick, setQuick] = useState<QuickInput>({
    calories: 0,
    durationKey: "",
    conditionKey: "",
    intensityKey: "",
    fluidKey: "",
    trainingType: "",
  });

  const [precision, setPrecision] = useState<PrecisionInput>({
    weightUnit: "lbs",
    preWeight: 0,
    postWeight: 0,
    durationKey: "",
    fluidKey: "",
    bathroomKey: "",
    trainingType: "",
  });

  const [caloriesText, setCaloriesText] = useState("");
  const [preWeightText, setPreWeightText] = useState("");
  const [postWeightText, setPostWeightText] = useState("");

  const quickSteps: StepId[] = [
    "calories",
    "duration",
    "conditions",
    "intensity",
    "fluids",
    "training",
  ];
  const precisionSteps: StepId[] = ["pre", "post", "duration", "fluids", "bathroom", "training"];

  const steps = mode === "quick" ? quickSteps : precisionSteps;
  const current = steps[step];
  const copy = current ? stepCopy[current] : null;
  const stepTheme = "light" as const;

  useEffect(() => {
    onPhaseChange?.(phase);
  }, [phase, onPhaseChange]);

  function restart() {
    setPhase("intro");
    setStep(0);
    setResult(null);
    setCaloriesText("");
    setPreWeightText("");
    setPostWeightText("");
  }

  function selectMode(m: HydrationLabMode) {
    setMode(m);
    setStep(0);
    setPhase("steps");
  }

  function canAdvance(): boolean {
    if (mode === "quick") {
      switch (current) {
        case "calories":
          return Number(caloriesText) >= 50;
        case "duration":
          return Boolean(quick.durationKey);
        case "conditions":
          return Boolean(quick.conditionKey);
        case "intensity":
          return Boolean(quick.intensityKey);
        case "fluids":
          return Boolean(quick.fluidKey);
        case "training":
          return Boolean(quick.trainingType);
        default:
          return false;
      }
    }
    switch (current) {
      case "pre":
        return Number(preWeightText) > 0;
      case "post":
        return Number(postWeightText) > 0 && Number(postWeightText) <= Number(preWeightText);
      case "duration":
        return Boolean(precision.durationKey);
      case "fluids":
        return Boolean(precision.fluidKey);
      case "bathroom":
        return Boolean(precision.bathroomKey);
      case "training":
        return Boolean(precision.trainingType);
      default:
        return false;
    }
  }

  function finish() {
    if (mode === "quick") {
      setResult(calculateQuick({ ...quick, calories: Number(caloriesText) }));
    } else {
      setResult(
        calculatePrecision({
          ...precision,
          preWeight: Number(preWeightText),
          postWeight: Number(postWeightText),
        }),
      );
    }
    setPhase("results");
  }

  function goNext() {
    if (step >= steps.length - 1) {
      finish();
      return;
    }
    setStep((s) => s + 1);
  }

  function goBack() {
    if (step === 0) {
      setPhase("mode");
      return;
    }
    setStep((s) => s - 1);
  }

  if (phase === "results" && result) {
    return <ResultsView result={result} onRestart={restart} />;
  }

  if (phase === "intro") {
    return (
      <PerformanceCard theme={stepTheme}>
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.12em]",
            quizMutedClass(stepTheme),
          )}
        >
          {hydrationLabCopy.badge}
        </p>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          {hydrationLabCopy.introHeadline}
        </h2>
        <p className={cn("mt-4 text-sm leading-relaxed", quizMutedClass(stepTheme))}>
          {hydrationLabCopy.introBody}
        </p>
        <button
          type="button"
          onClick={() => setPhase("mode")}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink transition hover:bg-lime-dark"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </button>
      </PerformanceCard>
    );
  }

  if (phase === "mode") {
    return (
      <div className="space-y-4">
        <p className={cn("text-center text-sm", quizMutedClass(stepTheme))}>
          How would you like to build your profile?
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {(
            [
              { mode: "precision" as const, icon: Scale, copy: hydrationLabCopy.modePrecision },
              { mode: "quick" as const, icon: Watch, copy: hydrationLabCopy.modeQuick },
            ] as const
          ).map(({ mode: m, icon: Icon, copy: c }) => (
            <button
              key={m}
              type="button"
              onClick={() => selectMode(m)}
              className="rounded-[20px] border border-ink/10 bg-white p-6 text-left shadow-sm transition hover:border-lime/50"
            >
              <Icon className="h-5 w-5 text-lime" />
              <div className="mt-4 font-display text-lg font-bold text-ink">{c.label}</div>
              <div className="mt-1 text-sm font-medium text-lime">{c.hint}</div>
              <p className={cn("mt-3 text-sm", quizMutedClass(stepTheme))}>{c.description}</p>
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setPhase("intro")}
          className={cn(
            "mx-auto mt-4 flex items-center gap-2 text-sm transition hover:text-ink",
            quizMutedClass(stepTheme),
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${mode}-${step}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <PerformanceCard theme={stepTheme}>
          <div className="mb-8 flex items-center justify-between gap-4">
            <span className={cn("text-xs uppercase tracking-wider", quizMutedClass(stepTheme))}>
              Step {step + 1} of {steps.length}
            </span>
            <div className="h-1 flex-1 max-w-[100px] overflow-hidden rounded-full bg-ink/10">
              <div
                className="h-full rounded-full bg-lime transition-all duration-500"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {copy ? (
            <>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
                {copy.headline}
              </h2>
              <p className={cn("mt-3 text-sm leading-relaxed", quizMutedClass(stepTheme))}>
                {copy.subheadline}
              </p>
            </>
          ) : null}

          <div className="mt-8 space-y-3">
            {mode === "quick" && current === "calories" && (
              <input
                type="number"
                min={50}
                max={5000}
                value={caloriesText}
                onChange={(e) => setCaloriesText(e.target.value)}
                placeholder="e.g. 520"
                className="h-14 w-full rounded-2xl border border-ink/15 bg-mist/30 px-4 text-xl text-ink placeholder:text-ink/35 focus:outline-none focus:ring-1 focus:ring-lime"
              />
            )}

            {mode === "precision" && current === "pre" && (
              <>
                <div className="mb-3 flex gap-2">
                  {(["lbs", "kg"] as const).map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setPrecision((p) => ({ ...p, weightUnit: u }))}
                      className={cn(
                        "rounded-full px-4 py-1.5 text-xs font-semibold uppercase",
                        precision.weightUnit === u ? "bg-lime text-ink" : "bg-mist/50 text-ink",
                      )}
                    >
                      {u}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min={1}
                  value={preWeightText}
                  onChange={(e) => setPreWeightText(e.target.value)}
                  placeholder={`Pre-training (${precision.weightUnit})`}
                  className="h-14 w-full rounded-2xl border border-ink/15 bg-mist/30 px-4 text-lg text-ink placeholder:text-ink/35 focus:outline-none focus:ring-1 focus:ring-lime"
                />
              </>
            )}

            {mode === "precision" && current === "post" && (
              <input
                type="number"
                min={1}
                value={postWeightText}
                onChange={(e) => setPostWeightText(e.target.value)}
                placeholder={`Post-training (${precision.weightUnit})`}
                className="h-14 w-full rounded-2xl border border-ink/15 bg-mist/30 px-4 text-lg text-ink placeholder:text-ink/35 focus:outline-none focus:ring-1 focus:ring-lime"
              />
            )}

            {current === "duration" &&
              durationOptions.map((opt) => (
                <OptionButton
                  key={opt.value}
                  theme={stepTheme}
                  selected={
                    mode === "quick"
                      ? quick.durationKey === opt.value
                      : precision.durationKey === opt.value
                  }
                  onClick={() =>
                    mode === "quick"
                      ? setQuick((q) => ({ ...q, durationKey: opt.value }))
                      : setPrecision((p) => ({ ...p, durationKey: opt.value }))
                  }
                  label={opt.label}
                />
              ))}

            {mode === "quick" &&
              current === "conditions" &&
              conditionOptions.map((opt) => (
                <OptionButton
                  key={opt.value}
                  theme={stepTheme}
                  selected={quick.conditionKey === opt.value}
                  onClick={() => setQuick((q) => ({ ...q, conditionKey: opt.value }))}
                  label={opt.label}
                />
              ))}

            {mode === "quick" &&
              current === "intensity" &&
              intensityOptions.map((opt) => (
                <OptionButton
                  key={opt.value}
                  theme={stepTheme}
                  selected={quick.intensityKey === opt.value}
                  onClick={() => setQuick((q) => ({ ...q, intensityKey: opt.value }))}
                  label={opt.label}
                />
              ))}

            {current === "fluids" &&
              fluidOptions.map((opt) => (
                <OptionButton
                  key={opt.value}
                  theme={stepTheme}
                  selected={
                    mode === "quick"
                      ? quick.fluidKey === opt.value
                      : precision.fluidKey === opt.value
                  }
                  onClick={() =>
                    mode === "quick"
                      ? setQuick((q) => ({ ...q, fluidKey: opt.value }))
                      : setPrecision((p) => ({ ...p, fluidKey: opt.value }))
                  }
                  label={opt.label}
                />
              ))}

            {mode === "precision" &&
              current === "bathroom" &&
              bathroomOptions.map((opt) => (
                <OptionButton
                  key={opt.value}
                  theme={stepTheme}
                  selected={precision.bathroomKey === opt.value}
                  onClick={() => setPrecision((p) => ({ ...p, bathroomKey: opt.value }))}
                  label={opt.label}
                />
              ))}

            {current === "training" &&
              trainingTypeOptions.map((opt) => (
                <OptionButton
                  key={opt.value}
                  theme={stepTheme}
                  selected={
                    mode === "quick"
                      ? quick.trainingType === opt.value
                      : precision.trainingType === opt.value
                  }
                  onClick={() =>
                    mode === "quick"
                      ? setQuick((q) => ({ ...q, trainingType: opt.value }))
                      : setPrecision((p) => ({ ...p, trainingType: opt.value }))
                  }
                  label={opt.label}
                />
              ))}
          </div>

          <div className="mt-10 flex items-center justify-between">
            <button
              type="button"
              onClick={goBack}
              className={cn(
                "inline-flex items-center gap-2 text-sm transition hover:text-ink",
                quizMutedClass(stepTheme),
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!canAdvance()}
              className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink transition hover:bg-lime-dark disabled:opacity-40"
            >
              {step >= steps.length - 1 ? "See my profile" : "Next"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </PerformanceCard>
      </motion.div>
    </AnimatePresence>
  );
}

export function HydrationLabHeader() {
  return (
    <div className="text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-ink">
        {hydrationLabCopy.badge}
      </p>
      <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
        {hydrationLabCopy.title}
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-ink">
        {hydrationLabCopy.subtitle}
      </p>
    </div>
  );
}

export function HydrationLabFooterNote() {
  return (
    <p className="mt-10 text-center text-xs text-muted-ink">
      Want the full experience?{" "}
      <Link to="/clutch-score" className="text-ink underline hover:opacity-80">
        Unlock your Clutch Score
      </Link>
    </p>
  );
}
