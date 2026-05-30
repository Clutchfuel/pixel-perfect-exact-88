import { useState } from "react";
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

const { accent: ACCENT, border: BORDER, surface: SURFACE, textSecondary: MUTED } = hydrationLabBrand;

type StepId = keyof typeof stepCopy;

type OptionButtonProps = {
  selected: boolean;
  onClick: () => void;
  label: string;
};

function OptionButton({ selected, onClick, label }: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-2xl border px-5 py-4 text-left transition"
      style={{
        borderColor: selected ? ACCENT : BORDER,
        background: selected ? "rgba(183, 255, 0, 0.08)" : SURFACE,
      }}
    >
      <div className="font-medium text-white">{label}</div>
    </button>
  );
}

function PerformanceCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[20px] border p-8 md:p-10 ${className}`}
      style={{ borderColor: BORDER, background: SURFACE }}
    >
      {children}
    </div>
  );
}

function ResultsView({
  result,
  onRestart,
}: {
  result: HydrationLabResult;
  onRestart: () => void;
}) {
  const zone = zoneResults[result.zone];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <PerformanceCard>
        <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: MUTED }}>
          {hydrationLabCopy.badge}
        </p>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
          {hydrationLabCopy.resultsHeadline}
        </h2>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: MUTED }}>
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

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border p-5" style={{ borderColor: BORDER, background: "#121212" }}>
            <div className="text-xs uppercase tracking-wider" style={{ color: MUTED }}>
              Hydration demand
            </div>
            <div className="mt-2 font-display text-3xl font-bold text-white">
              {result.sweatRateLph}{" "}
              <span className="text-base font-normal" style={{ color: MUTED }}>
                L/hr
              </span>
            </div>
            <div className="mt-1 text-sm" style={{ color: MUTED }}>
              {result.sweatRateOph} oz/hr
            </div>
          </div>
          <div className="rounded-2xl border p-5" style={{ borderColor: BORDER, background: "#121212" }}>
            <div className="text-xs uppercase tracking-wider" style={{ color: MUTED }}>
              Session fluid loss
            </div>
            <div className="mt-2 font-display text-3xl font-bold text-white">
              {result.totalSweatLossL}{" "}
              <span className="text-base font-normal" style={{ color: MUTED }}>
                L
              </span>
            </div>
            <div className="mt-1 text-sm" style={{ color: MUTED }}>
              {result.modeLabel}
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-white/90">
          <div>
            <h3 className="font-display text-lg font-bold text-white">{zone.insightTitle}</h3>
            <p className="mt-2" style={{ color: MUTED }}>
              {zone.insightBody}
            </p>
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-white">Your Game Plan</h3>
            <ul className="mt-3 space-y-2">
              {zone.gamePlan.map((item) => (
                <li key={item} className="flex gap-3" style={{ color: MUTED }}>
                  <span style={{ color: ACCENT }} aria-hidden>
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm" style={{ color: MUTED }}>
            {zone.keyInsight}
          </p>
        </div>

        <p className="mt-10 border-t pt-6 text-xs" style={{ borderColor: BORDER, color: MUTED }}>
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
            style={{ borderColor: BORDER }}
          >
            {hydrationLabCopy.resultsRetake}
          </button>
        </div>
      </PerformanceCard>
    </motion.div>
  );
}

export function HydrationLabCalculator() {
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
      <PerformanceCard>
        <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: MUTED }}>
          {hydrationLabCopy.badge}
        </p>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
          {hydrationLabCopy.introHeadline}
        </h2>
        <p className="mt-4 text-sm leading-relaxed" style={{ color: MUTED }}>
          {hydrationLabCopy.introBody}
        </p>
        <button
          type="button"
          onClick={() => setPhase("mode")}
          className="mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-black transition"
          style={{ background: ACCENT }}
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
        <p className="text-center text-sm" style={{ color: MUTED }}>
          How would you like to build your profile?
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => selectMode("precision")}
            className="rounded-[20px] border p-6 text-left transition hover:border-[#B7FF00]/40"
            style={{ borderColor: BORDER, background: SURFACE }}
          >
            <Scale className="h-5 w-5" style={{ color: ACCENT }} />
            <div className="mt-4 font-display text-lg font-bold text-white">
              {hydrationLabCopy.modePrecision.label}
            </div>
            <div className="mt-1 text-sm font-medium" style={{ color: ACCENT }}>
              {hydrationLabCopy.modePrecision.hint}
            </div>
            <p className="mt-3 text-sm" style={{ color: MUTED }}>
              {hydrationLabCopy.modePrecision.description}
            </p>
          </button>
          <button
            type="button"
            onClick={() => selectMode("quick")}
            className="rounded-[20px] border p-6 text-left transition hover:border-[#B7FF00]/40"
            style={{ borderColor: BORDER, background: SURFACE }}
          >
            <Watch className="h-5 w-5" style={{ color: ACCENT }} />
            <div className="mt-4 font-display text-lg font-bold text-white">
              {hydrationLabCopy.modeQuick.label}
            </div>
            <div className="mt-1 text-sm font-medium" style={{ color: ACCENT }}>
              {hydrationLabCopy.modeQuick.hint}
            </div>
            <p className="mt-3 text-sm" style={{ color: MUTED }}>
              {hydrationLabCopy.modeQuick.description}
            </p>
          </button>
        </div>
        <button
          type="button"
          onClick={() => setPhase("intro")}
          className="mx-auto mt-4 flex items-center gap-2 text-sm transition hover:text-white"
          style={{ color: MUTED }}
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
        <PerformanceCard>
          <div className="mb-8 flex items-center justify-between gap-4">
            <span className="text-xs uppercase tracking-wider" style={{ color: MUTED }}>
              Step {step + 1} of {steps.length}
            </span>
            <div
              className="h-1 flex-1 max-w-[100px] overflow-hidden rounded-full"
              style={{ background: BORDER }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${((step + 1) / steps.length) * 100}%`,
                  background: ACCENT,
                }}
              />
            </div>
          </div>

          {copy ? (
            <>
              <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                {copy.headline}
              </h2>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: MUTED }}>
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
                className="h-14 w-full rounded-2xl border px-4 text-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#B7FF00]"
                style={{ borderColor: BORDER, background: "#121212" }}
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
                      className="rounded-full px-4 py-1.5 text-xs font-semibold uppercase"
                      style={{
                        background: precision.weightUnit === u ? ACCENT : BORDER,
                        color: precision.weightUnit === u ? "#0A0A0A" : "#fff",
                      }}
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
                  className="h-14 w-full rounded-2xl border px-4 text-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#B7FF00]"
                  style={{ borderColor: BORDER, background: "#121212" }}
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
                className="h-14 w-full rounded-2xl border px-4 text-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#B7FF00]"
                style={{ borderColor: BORDER, background: "#121212" }}
              />
            )}

            {current === "duration" &&
              durationOptions.map((opt) => (
                <OptionButton
                  key={opt.value}
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
                  selected={quick.intensityKey === opt.value}
                  onClick={() => setQuick((q) => ({ ...q, intensityKey: opt.value }))}
                  label={opt.label}
                />
              ))}

            {current === "fluids" &&
              fluidOptions.map((opt) => (
                <OptionButton
                  key={opt.value}
                  selected={
                    mode === "quick" ? quick.fluidKey === opt.value : precision.fluidKey === opt.value
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
                  selected={precision.bathroomKey === opt.value}
                  onClick={() => setPrecision((p) => ({ ...p, bathroomKey: opt.value }))}
                  label={opt.label}
                />
              ))}

            {current === "training" &&
              trainingTypeOptions.map((opt) => (
                <OptionButton
                  key={opt.value}
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
              className="inline-flex items-center gap-2 text-sm transition hover:text-white"
              style={{ color: MUTED }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!canAdvance()}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-black transition disabled:opacity-40"
              style={{ background: ACCENT }}
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
      <p
        className="text-xs font-semibold uppercase tracking-[0.12em]"
        style={{ color: hydrationLabBrand.textSecondary }}
      >
        {hydrationLabCopy.badge}
      </p>
      <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
        {hydrationLabCopy.title}
      </h1>
      <p
        className="mx-auto mt-4 max-w-xl text-base leading-relaxed"
        style={{ color: hydrationLabBrand.textSecondary }}
      >
        {hydrationLabCopy.subtitle}
      </p>
    </div>
  );
}

export function HydrationLabFooterNote() {
  return (
    <p className="mt-10 text-center text-xs" style={{ color: hydrationLabBrand.textSecondary }}>
      Want the full experience?{" "}
      <Link to="/clutch-score" className="text-white/80 underline hover:text-white">
        Unlock your Clutch Score
      </Link>
    </p>
  );
}
