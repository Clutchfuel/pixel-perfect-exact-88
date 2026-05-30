import { calculateClutchScore } from "../src/lib/clutch-score";
import type { QuizAnswers } from "../src/data/clutch-score";

const cases: { name: string; answers: QuizAnswers; expectedProfile: string }[] = [
  {
    name: "balanced",
    answers: {
      bodyType: "average",
      trainingLoad: "moderate",
      sweatLevel: "moderate",
      environment: "indoor",
      goal: "endurance",
    },
    expectedProfile: "Balanced Sweater",
  },
  {
    name: "high output",
    answers: {
      bodyType: "heavier",
      trainingLoad: "heavy",
      sweatLevel: "moderate",
      environment: "mixed",
      goal: "performance",
    },
    expectedProfile: "High Output Athlete",
  },
  {
    name: "recovery",
    answers: {
      bodyType: "average",
      trainingLoad: "light",
      sweatLevel: "light",
      environment: "indoor",
      goal: "recovery",
    },
    expectedProfile: "Recovery Focused",
  },
  {
    name: "heavy sweater",
    answers: {
      bodyType: "heavier",
      trainingLoad: "heavy",
      sweatLevel: "heavy",
      environment: "hot",
      goal: "endurance",
    },
    expectedProfile: "Heavy Sweater",
  },
];

let failed = 0;
for (const c of cases) {
  const result = calculateClutchScore({ mode: "full", answers: c.answers });
  const ok =
    result.profile === c.expectedProfile &&
    result.score >= 0 &&
    result.score <= 100 &&
    result.recommendedProductSlug.length > 0 &&
    result.estimatedFluidLossOz > 0;
  if (!ok) {
    failed += 1;
    console.error("FAIL", c.name, result);
  }
}

const withCalories = calculateClutchScore({
  mode: "full",
  answers: cases[0]!.answers,
  caloriesBurned: 450,
});
if (!withCalories.caloriesUsed || withCalories.sessionIntensity <= 0) {
  failed += 1;
  console.error("FAIL calories supporting signal", withCalories);
}

const quick = calculateClutchScore({
  mode: "quick",
  quick: {
    sport: "hyrox",
    duration: "60",
    intensity: "high",
    sweatLevel: "heavy",
    hydrationFeeling: "depleted",
  },
  caloriesBurned: 520,
});
if (quick.profile !== "Heavy Sweater" || quick.score < 1) {
  failed += 1;
  console.error("FAIL quick estimate", quick);
}

if (failed > 0) {
  process.exit(1);
}

console.log(`clutch-score tests passed (${cases.length + 2} cases)`);
