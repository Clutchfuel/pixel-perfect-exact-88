import {
  type Answers,
  type GoalKey,
  type OpportunityKey,
  computeOpportunity,
  computeScore,
  firstClutchMove,
  goalFromAnswers,
  goalLabel,
  opportunityLabel,
  resultParagraph,
} from "@/lib/diagnostic-config";

export type DiagnosticResult = {
  score: number;
  opportunity: OpportunityKey;
  opportunityLabel: string;
  goal: GoalKey;
  goalLabel: string;
  paragraph: string;
  firstClutchMove: { title: string; body: string };
  recommendedProductSlug: string;
};

const productByOpportunity: Record<OpportunityKey, string> = {
  pre_workout_hydration: "clutch-iso",
  recovery_routine: "clutch-recovery",
  endurance_support: "clutch-flow",
  hydration_consistency: "clutch-iso",
  electrolyte_replacement: "clutch-flow",
};

export function buildDiagnosticResult(answers: Answers): DiagnosticResult {
  const opportunity = computeOpportunity(answers);
  const goal = goalFromAnswers(answers);
  const move = firstClutchMove(answers);

  return {
    score: computeScore(answers),
    opportunity,
    opportunityLabel: opportunityLabel[opportunity],
    goal,
    goalLabel: goalLabel[goal],
    paragraph: resultParagraph(answers),
    firstClutchMove: move,
    recommendedProductSlug: productByOpportunity[opportunity],
  };
}
