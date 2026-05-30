import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Droplets, Scale, Watch } from "lucide-react";
import {
  bathroomOptions,
  conditionOptions,
  durationOptions,
  fluidOptions,
  hydrationLabCopy,
  intensityOptions,
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

const ACCENT = "#C6FF00";

type OptionButtonProps = {
  selected: boolean;
  onClick: () => void;
  label: string;
  description?: string;
};

function OptionButton({ selected, onClick, label, description }: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-xl border px-4 py-3 text-left transition"
      style={{
        borderColor: selected ? ACCENT : "rgba(255,255,255,0.12)",
        background: selected ? "rgba(198,255,0,0.12)" : "rgba(255,255,255,0.04)",
      }}
    >
      <div className="font-medium text-white">{label}</div>
      {description ? <div className="mt-0.5 text-xs text-white/50">{description}</div> : null}
    </button>
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
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-10"
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-2xl" aria-hidden>
          {zone.emoji}
        </span>
        <span
          className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide"
          style={{ background: `${zone.color}22`, color: zone.color }}
        >
          {zone.badge}
        </span>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-black/40 p-5">
          <div className="text-xs uppercase tracking-wider text-white/50">Sweat rate</div>
          <div className="mt-2 font-display text-4xl font-extrabold text-white">
            {result.sweatRateLph}{" "}
            <span className="text-lg text-white/60">L/hr</span>
          </div>
          <div className="mt-1 text-sm text-white/70">{result.sweatRateOph} oz/hr</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/40 p-5">
          <div className="text-xs uppercase tracking-wider text-white/50">Total fluid loss</div>
          <div className="mt-2 font-display text-4xl font-extrabold text-white">
            {result.totalSweatLossL}{" "}
            <span className="text-lg text-white/60">L</span>
          </div>
          <div className="mt-1 text-sm" style={{ color: ACCENT }}>
            {result.modeLabel}
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-white/85">
        <div>
          <h3 className="font-display text-lg font-extrabold text-white">What This Means</h3>
          <p className="mt-2">{zone.whatThisMeans}</p>
        </div>
        <div>
          <h3 className="font-display text-lg font-extrabold text-white">Hydration Game Plan</h3>
          <ul className="mt-2 list-none space-y-2">
            {zone.gamePlan.map((item) => (
              <li key={item} className="flex gap-2">
                <span style={{ color: ACCENT }}>•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-display text-lg font-extrabold text-white">Hydration Note</h3>
          <p className="mt-2">{zone.hydrationNote}</p>
        </div>
        <div>
          <h3 className="font-display text-lg font-extrabold text-white">Key Insight</h3>
          <p className="mt-2">{zone.keyInsight}</p>
        </div>
      </div>

      <p className="mt-8 border-t border-white/10 pt-6 text-xs text-white/45">
        {hydrationLabCopy.resultsDisclaimer}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onRestart}
          className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/40"
        >
          Calculate again
        </button>
        <CFButton to="/products" variant="primary" size="md">
          Shop hydration →
        </CFButton>
      </div>
    </motion.div>
  );
}

export function HydrationLabCalculator() {
  const [phase, setPhase] = useState<"mode" | "steps" | "results">("mode");
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

  const quickSteps = [
    { id: "calories", title: "How many calories did you burn?", hint: "Check your Apple Watch, Garmin, Whoop, or fitness app." },
    { id: "duration", title: "How long was your session?" },
    { id: "conditions", title: "What were your training conditions?" },
    { id: "intensity", title: "How hard did you push it?" },
    { id: "fluids", title: "How much did you drink during training?" },
    { id: "training", title: "What type of training?" },
  ] as const;

  const precisionSteps = [
    { id: "pre", title: "Pre-workout weight" },
    { id: "post", title: "Post-workout weight" },
    { id: "duration", title: "Session duration" },
    { id: "fluids", title: "Fluids consumed during training" },
    { id: "bathroom", title: "Bathroom breaks during session?" },
    { id: "training", title: "What type of training?" },
  ] as const;

  const steps = mode === "quick" ? quickSteps : precisionSteps;
  const current = steps[step];

  function restart() {
    setPhase("mode");
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
      switch (current?.id) {
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
    switch (current?.id) {
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
      const res = calculateQuick({ ...quick, calories: Number(caloriesText) });
      setResult(res);
    } else {
      const res = calculatePrecision({
        ...precision,
        preWeight: Number(preWeightText),
        postWeight: Number(postWeightText),
      });
      setResult(res);
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

  if (phase === "mode") {
    return (
      <div className="space-y-4">
        <p className="text-center text-sm text-white/60">Choose your calculation method</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => selectMode("precision")}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left transition hover:border-[#C6FF00]/50"
          >
            <Scale className="h-6 w-6" style={{ color: ACCENT }} />
            <div className="mt-4 font-display text-xl font-extrabold text-white">
              {hydrationLabCopy.modePrecision.label}
            </div>
            <div className="mt-1 text-sm font-semibold" style={{ color: ACCENT }}>
              {hydrationLabCopy.modePrecision.hint}
            </div>
            <p className="mt-3 text-sm text-white/55">{hydrationLabCopy.modePrecision.description}</p>
          </button>
          <button
            type="button"
            onClick={() => selectMode("quick")}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left transition hover:border-[#C6FF00]/50"
          >
            <Watch className="h-6 w-6" style={{ color: ACCENT }} />
            <div className="mt-4 font-display text-xl font-extrabold text-white">
              {hydrationLabCopy.modeQuick.label}
            </div>
            <div className="mt-1 text-sm font-semibold" style={{ color: ACCENT }}>
              {hydrationLabCopy.modeQuick.hint}
            </div>
            <p className="mt-3 text-sm text-white/55">{hydrationLabCopy.modeQuick.description}</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${mode}-${step}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-10"
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <span className="text-xs uppercase tracking-wider text-white/45">
            {mode === "quick" ? "Quick Mode" : "Precision Mode"} · Step {step + 1} of{" "}
            {steps.length}
          </span>
          <div className="h-1.5 flex-1 max-w-[120px] overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${((step + 1) / steps.length) * 100}%`,
                background: ACCENT,
              }}
            />
          </div>
        </div>

        <h2 className="font-display text-2xl font-extrabold tracking-tight text-white md:text-3xl">
          {current?.title}
        </h2>
        {"hint" in current && typeof current.hint === "string" ? (
          <p className="mt-2 text-sm text-white/50">{current.hint}</p>
        ) : null}

        <div className="mt-8 space-y-3">
          {mode === "quick" && current?.id === "calories" && (
            <input
              type="number"
              min={50}
              max={5000}
              value={caloriesText}
              onChange={(e) => setCaloriesText(e.target.value)}
              placeholder="e.g. 520"
              className="h-14 w-full rounded-xl border border-white/15 bg-black/50 px-4 text-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#C6FF00]"
            />
          )}

          {mode === "precision" && current?.id === "pre" && (
            <>
              <div className="mb-3 flex gap-2">
                {(["lbs", "kg"] as const).map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setPrecision((p) => ({ ...p, weightUnit: u }))}
                    className="rounded-full px-4 py-1.5 text-xs font-semibold uppercase"
                    style={{
                      background: precision.weightUnit === u ? ACCENT : "rgba(255,255,255,0.08)",
                      color: precision.weightUnit === u ? "#000" : "#fff",
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
                placeholder={`Pre-workout weight (${precision.weightUnit})`}
                className="h-14 w-full rounded-xl border border-white/15 bg-black/50 px-4 text-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#C6FF00]"
              />
            </>
          )}

          {mode === "precision" && current?.id === "post" && (
            <input
              type="number"
              min={1}
              value={postWeightText}
              onChange={(e) => setPostWeightText(e.target.value)}
              placeholder={`Post-workout weight (${precision.weightUnit})`}
              className="h-14 w-full rounded-xl border border-white/15 bg-black/50 px-4 text-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#C6FF00]"
            />
          )}

          {current?.id === "duration" &&
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
            current?.id === "conditions" &&
            conditionOptions.map((opt) => (
              <OptionButton
                key={opt.value}
                selected={quick.conditionKey === opt.value}
                onClick={() => setQuick((q) => ({ ...q, conditionKey: opt.value }))}
                label={opt.label}
              />
            ))}

          {mode === "quick" &&
            current?.id === "intensity" &&
            intensityOptions.map((opt) => (
              <OptionButton
                key={opt.value}
                selected={quick.intensityKey === opt.value}
                onClick={() => setQuick((q) => ({ ...q, intensityKey: opt.value }))}
                label={opt.label}
              />
            ))}

          {current?.id === "fluids" &&
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
            current?.id === "bathroom" &&
            bathroomOptions.map((opt) => (
              <OptionButton
                key={opt.value}
                selected={precision.bathroomKey === opt.value}
                onClick={() => setPrecision((p) => ({ ...p, bathroomKey: opt.value }))}
                label={opt.label}
              />
            ))}

          {current?.id === "training" &&
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
            className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
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
            {step >= steps.length - 1 ? "See results" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function HydrationLabHeader() {
  return (
    <div className="text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/70">
        <Droplets className="h-3.5 w-3.5" style={{ color: ACCENT }} />
        Hydration Lab
      </div>
      <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
        {hydrationLabCopy.title}
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-base text-white/55">{hydrationLabCopy.subtitle}</p>
    </div>
  );
}
