import { getEnv, getLeadsDb } from "@/lib/env";
import { isProductionRuntime } from "@/lib/is-production";
import { reportError } from "@/lib/observability";

export type ClutchScoreLeadRow = {
  email: string;
  answersJson: string;
  score: number;
  opportunity: string;
  goal: string;
  firstClutchMove: string;
  marketingConsent: boolean;
  source?: string;
  userAgent?: string;
};

export type SimpleLeadRow = {
  type: "newsletter" | "contact";
  email: string;
  payloadJson: string;
  marketingConsent: boolean;
  source?: string;
};

export type FeedbackRow = {
  accuracy: string;
  resonated: string;
  missing: string;
  recommend: string;
  score?: number;
  opportunity?: string;
  firstMove?: string;
  answersJson?: string;
};

/** No-op when D1 is unbound (local/CI without migrations). */
export async function persistClutchScoreLead(row: ClutchScoreLeadRow): Promise<void> {
  const db = getLeadsDb();
  if (!db) {
    if (isProductionRuntime()) {
      reportError(new Error("LEADS_DB not bound — clutch score lead not persisted"));
    }
    return;
  }

  try {
    await db
      .prepare(
        `INSERT INTO clutch_score_responses
          (email, answers_json, score, opportunity, goal, first_clutch_move, marketing_consent, source, user_agent)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        row.email,
        row.answersJson,
        row.score,
        row.opportunity,
        row.goal,
        row.firstClutchMove,
        row.marketingConsent ? 1 : 0,
        row.source ?? "clutch-score",
        row.userAgent ?? null,
      )
      .run();
  } catch (error) {
    reportError(error, { source: "leads-db", table: "clutch_score_responses" });
    if (isProductionRuntime()) throw error;
  }
}

export async function persistSimpleLead(row: SimpleLeadRow): Promise<void> {
  const db = getLeadsDb();
  if (!db) return;

  try {
    await db
      .prepare(
        `INSERT INTO leads (type, email, payload_json, marketing_consent, source)
         VALUES (?, ?, ?, ?, ?)`,
      )
      .bind(row.type, row.email, row.payloadJson, row.marketingConsent ? 1 : 0, row.source ?? null)
      .run();
  } catch (error) {
    reportError(error, { source: "leads-db", table: "leads" });
    if (isProductionRuntime()) throw error;
  }
}

export async function persistFeedback(row: FeedbackRow): Promise<void> {
  const db = getLeadsDb();
  if (!db) {
    if (isProductionRuntime()) {
      reportError(new Error("LEADS_DB not bound — feedback not persisted"));
    }
    return;
  }

  try {
    await db
      .prepare(
        `INSERT INTO feedback
          (accuracy, resonated, missing, recommend, score, opportunity, first_move, answers_json)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        row.accuracy,
        row.resonated,
        row.missing,
        row.recommend,
        row.score ?? null,
        row.opportunity ?? null,
        row.firstMove ?? null,
        row.answersJson ?? null,
      )
      .run();
  } catch (error) {
    reportError(error, { source: "leads-db", table: "feedback" });
    if (isProductionRuntime()) throw error;
  }
}

export function exportAdminToken(): string | undefined {
  return getEnv("LEADS_EXPORT_TOKEN");
}
