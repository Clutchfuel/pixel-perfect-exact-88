import { createServerFn } from "@tanstack/react-start";
import { persistClutchScoreLead } from "@/lib/leads-db";

const ANSWERS = ["Never", "Rarely", "Sometimes", "Often", "Always"] as const;

type AssessmentInput = {
  first_name: string | null;
  email: string;
  source: string | null;
  goal: string | null;
  athlete_type: string | null;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  clutch_score: number;
  opportunity: string;
  next_step: string;
  session_token: string;
};

function isAnswer(value: unknown): value is (typeof ANSWERS)[number] {
  return typeof value === "string" && (ANSWERS as readonly string[]).includes(value);
}

function validate(input: unknown): AssessmentInput {
  if (!input || typeof input !== "object") throw new Error("Invalid input");
  const o = input as Record<string, unknown>;

  const email = typeof o.email === "string" ? o.email.trim() : "";
  if (email.length < 5 || email.length > 254 || !email.includes("@") || !email.includes(".")) {
    throw new Error("Enter a valid email address.");
  }

  const session_token = typeof o.session_token === "string" ? o.session_token : "";
  if (session_token.length < 16 || session_token.length > 128) {
    throw new Error("Invalid session. Refresh and try again.");
  }

  const clutch_score = typeof o.clutch_score === "number" ? o.clutch_score : Number(o.clutch_score);
  if (!Number.isFinite(clutch_score) || clutch_score < 0 || clutch_score > 100) {
    throw new Error("Invalid score.");
  }

  for (const key of ["q1", "q2", "q3", "q4", "q5"] as const) {
    if (!isAnswer(o[key])) throw new Error("Invalid assessment answers.");
  }

  if (typeof o.opportunity !== "string" || o.opportunity.length < 2 || o.opportunity.length > 80) {
    throw new Error("Invalid opportunity.");
  }
  if (typeof o.next_step !== "string" || o.next_step.length < 2 || o.next_step.length > 800) {
    throw new Error("Invalid next step.");
  }

  const optionalString = (value: unknown, max: number) => {
    if (value == null || value === "") return null;
    if (typeof value !== "string") throw new Error("Invalid field.");
    const trimmed = value.trim();
    if (!trimmed) return null;
    if (trimmed.length > max) throw new Error("Field too long.");
    return trimmed;
  };

  return {
    first_name: optionalString(o.first_name, 80),
    email,
    source: optionalString(o.source, 120),
    goal: optionalString(o.goal, 240),
    athlete_type: optionalString(o.athlete_type, 80),
    q1: o.q1 as AssessmentInput["q1"],
    q2: o.q2 as AssessmentInput["q2"],
    q3: o.q3 as AssessmentInput["q3"],
    q4: o.q4 as AssessmentInput["q4"],
    q5: o.q5 as AssessmentInput["q5"],
    clutch_score: Math.round(clutch_score),
    opportunity: o.opportunity,
    next_step: o.next_step,
    session_token,
  };
}

/**
 * Persist Clutch Score email capture to Cloudflare D1 (LEADS_DB).
 * This is the production path — no Supabase secrets required.
 */
export const submitAssessment = createServerFn({ method: "POST" })
  .inputValidator(validate)
  .handler(async ({ data }) => {
    const answers = {
      q1: data.q1,
      q2: data.q2,
      q3: data.q3,
      q4: data.q4,
      q5: data.q5,
      first_name: data.first_name,
      athlete_type: data.athlete_type,
      session_token: data.session_token,
    };

    await persistClutchScoreLead({
      email: data.email,
      answersJson: JSON.stringify(answers),
      score: data.clutch_score,
      opportunity: data.opportunity,
      goal: data.goal || "Performance",
      firstClutchMove: data.next_step,
      marketingConsent: true,
      source: data.source || "clutch-score",
    });

    return { ok: true as const, alreadyRegistered: false as const };
  });
