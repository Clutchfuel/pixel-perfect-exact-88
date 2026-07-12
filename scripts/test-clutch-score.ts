import {
  type Answers,
  computeOpportunity,
  computeScore,
  firstClutchMove,
} from "../src/lib/diagnostic-config";
import { buildDiagnosticResult } from "../src/lib/diagnostic-result";

const cases: {
  name: string;
  answers: Answers;
  opportunity: string;
  scoreMin: number;
  scoreMax: number;
}[] = [
  {
    name: "strong athlete → consistency bias",
    answers: { q1: 0, q2: 0, q3: 0, q4: 1, q5: 0 },
    opportunity: "hydration_consistency",
    scoreMin: 85,
    scoreMax: 95,
  },
  {
    name: "pre-workout hydration pattern",
    answers: { q1: 2, q2: 3, q3: 1, q4: 2, q5: 0 },
    opportunity: "pre_workout_hydration",
    scoreMin: 45,
    scoreMax: 70,
  },
  {
    name: "recovery bottleneck",
    answers: { q1: 3, q2: 4, q3: 3, q4: 2, q5: 2 },
    opportunity: "recovery_routine",
    scoreMin: 45,
    scoreMax: 65,
  },
  {
    name: "electrolyte / high volume",
    answers: { q1: 2, q2: 2, q3: 1, q4: 4, q5: 4 },
    opportunity: "electrolyte_replacement",
    scoreMin: 45,
    scoreMax: 80,
  },
];

let failed = 0;
for (const c of cases) {
  const score = computeScore(c.answers);
  const opportunity = computeOpportunity(c.answers);
  const result = buildDiagnosticResult(c.answers);
  const move = firstClutchMove(c.answers);

  if (opportunity !== c.opportunity) {
    console.error(`FAIL ${c.name}: opportunity ${opportunity} !== ${c.opportunity}`);
    failed++;
  }
  if (score < c.scoreMin || score > c.scoreMax) {
    console.error(`FAIL ${c.name}: score ${score} outside [${c.scoreMin}, ${c.scoreMax}]`);
    failed++;
  }
  if (!result.firstClutchMove.title || !move.title) {
    console.error(`FAIL ${c.name}: missing first clutch move`);
    failed++;
  }
  if (!result.recommendedProductSlug) {
    console.error(`FAIL ${c.name}: missing product recommendation`);
    failed++;
  }
}

if (failed > 0) {
  console.error(`clutch-score tests failed (${failed})`);
  process.exit(1);
}

console.log(`clutch-score diagnostic tests passed (${cases.length} cases)`);
