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

async function persistViaD1(row: ClutchScoreLeadRow, db: D1Database): Promise<void> {
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
}

async function persistViaSupabase(row: ClutchScoreLeadRow): Promise<boolean> {
  const url = getEnv("SUPABASE_URL") ?? getEnv("VITE_SUPABASE_URL");
  const key = getEnv("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return false;

  let answers: Record<string, unknown> = {};
  try {
    answers = JSON.parse(row.answersJson) as Record<string, unknown>;
  } catch {
    answers = {};
  }

  const { createClient } = await import("@supabase/supabase-js");
  const client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await client.from("assessment_responses").insert({
    email: row.email,
    first_name: typeof answers.first_name === "string" ? answers.first_name : null,
    athlete_type: typeof answers.athlete_type === "string" ? answers.athlete_type : null,
    session_token: typeof answers.session_token === "string" ? answers.session_token : null,
    q1: String(answers.q1 ?? ""),
    q2: String(answers.q2 ?? ""),
    q3: String(answers.q3 ?? ""),
    q4: String(answers.q4 ?? ""),
    q5: String(answers.q5 ?? ""),
    clutch_score: row.score,
    opportunity: row.opportunity,
    next_step: row.firstClutchMove,
    goal: row.goal,
    source: row.source ?? "clutch-score",
  });

  if (error) throw error;
  return true;
}

async function persistViaResend(row: ClutchScoreLeadRow): Promise<boolean> {
  const apiKey = getEnv("RESEND_API_KEY");
  const to = getEnv("LEADS_TO_EMAIL");
  const from = getEnv("RESEND_FROM_EMAIL") || "onboarding@resend.dev";
  if (!apiKey || !to) return false;

  const subject = `Clutch Score lead: ${row.email} (${row.score})`;
  const text = [
    `Email: ${row.email}`,
    `Score: ${row.score}`,
    `Goal: ${row.goal}`,
    `Opportunity: ${row.opportunity}`,
    `First move: ${row.firstClutchMove}`,
    `Source: ${row.source ?? "clutch-score"}`,
    `Consent: ${row.marketingConsent ? "yes" : "no"}`,
    "",
    "Answers JSON:",
    row.answersJson,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend failed (${res.status}): ${body.slice(0, 200)}`);
  }
  return true;
}

/** Persist a Clutch Score signup. Prefers D1, then Supabase, then Resend email. */
export async function persistClutchScoreLead(row: ClutchScoreLeadRow): Promise<void> {
  const d1 = getLeadsDb();
  if (d1) {
    try {
      await persistViaD1(row, d1);
      return;
    } catch (error) {
      reportError(error, { source: "leads-db", table: "clutch_score_responses", backend: "d1" });
      // Fall through to other backends.
    }
  }

  try {
    if (await persistViaSupabase(row)) return;
  } catch (error) {
    reportError(error, { source: "leads-db", backend: "supabase" });
  }

  try {
    if (await persistViaResend(row)) return;
  } catch (error) {
    reportError(error, { source: "leads-db", backend: "resend" });
  }

  const err = new Error("LEADS_DB not bound — clutch score lead not persisted");
  reportError(err, {
    source: "leads-db",
    hasD1: Boolean(d1),
    hasSupabase: Boolean(getEnv("SUPABASE_SERVICE_ROLE_KEY")),
    hasResend: Boolean(getEnv("RESEND_API_KEY") && getEnv("LEADS_TO_EMAIL")),
  });
  if (isProductionRuntime()) {
    throw new Error("Lead storage is not connected yet. Please try again shortly.");
  }
}
