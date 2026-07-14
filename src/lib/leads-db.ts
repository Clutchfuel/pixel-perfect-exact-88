import { getLeadsDb } from "@/lib/env";
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

/** Persist a Clutch Score signup to Cloudflare D1. Throws in production if DB is unbound. */
export async function persistClutchScoreLead(row: ClutchScoreLeadRow): Promise<void> {
  let db = getLeadsDb();

  if (!db) {
    try {
      const { env } = await import("cloudflare:workers");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      db = (env as any)?.LEADS_DB as D1Database | undefined;
    } catch {
      /* local / unbound */
    }
  }

  if (!db) {
    const err = new Error("LEADS_DB not bound — clutch score lead not persisted");
    reportError(err);
    if (isProductionRuntime()) {
      throw new Error("Lead storage is not connected yet. Please try again shortly.");
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
    throw error;
  }
}
