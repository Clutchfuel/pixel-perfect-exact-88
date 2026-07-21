import { createServerFn } from "@tanstack/react-start";
import {
  findPriorClutchScoreByEmail,
  persistClutchScoreLead,
} from "@/lib/leads-db";
import {
  trackAssessmentCompleted,
  trackClutch100Joined,
  trackClutchMoveCheckin,
  trackScoreRetaken,
  trackSmsOptedIn,
  type AssessmentProfileFields,
} from "@/lib/klaviyo";

const ANSWERS = ["Never", "Rarely", "Sometimes", "Often", "Always"] as const;

const CHECKIN_STATUSES = [
  "nailed_it",
  "mostly_consistent",
  "struggling",
  "havent_started",
] as const;

export type CheckinStatus = (typeof CHECKIN_STATUSES)[number];

type AssessmentJoinInput = {
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
  /** Scoring opportunity key (stored in D1). */
  opportunity: string;
  /** Biggest Opportunity pillar as shown on results (e.g. Hydration). */
  lowest_category: string;
  next_step: string;
  session_token: string;
};

type JoinOnlyInput = {
  email: string;
  first_name: string | null;
  referral_source: string | null;
};

type SmsOptInInput = {
  email: string;
  first_name: string | null;
  phone_number: string;
};

type CheckinInput = {
  pid: string;
  status: CheckinStatus;
};

function isAnswer(value: unknown): value is (typeof ANSWERS)[number] {
  return typeof value === "string" && (ANSWERS as readonly string[]).includes(value);
}

function optionalString(value: unknown, max: number): string | null {
  if (value == null || value === "") return null;
  if (typeof value !== "string") throw new Error("Invalid field.");
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.length > max) throw new Error("Field too long.");
  return trimmed;
}

function validateEmail(value: unknown): string {
  const email = typeof value === "string" ? value.trim() : "";
  if (email.length < 5 || email.length > 254 || !email.includes("@") || !email.includes(".")) {
    throw new Error("Enter a valid email address.");
  }
  return email;
}

function validateAssessmentJoin(input: unknown): AssessmentJoinInput {
  if (!input || typeof input !== "object") throw new Error("Invalid input");
  const o = input as Record<string, unknown>;

  const email = validateEmail(o.email);

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
  if (
    typeof o.lowest_category !== "string" ||
    o.lowest_category.length < 2 ||
    o.lowest_category.length > 80
  ) {
    throw new Error("Invalid lowest category.");
  }
  if (typeof o.next_step !== "string" || o.next_step.length < 2 || o.next_step.length > 800) {
    throw new Error("Invalid next step.");
  }

  return {
    first_name: optionalString(o.first_name, 80),
    email,
    source: optionalString(o.source, 120),
    goal: optionalString(o.goal, 240),
    athlete_type: optionalString(o.athlete_type, 80),
    q1: o.q1 as AssessmentJoinInput["q1"],
    q2: o.q2 as AssessmentJoinInput["q2"],
    q3: o.q3 as AssessmentJoinInput["q3"],
    q4: o.q4 as AssessmentJoinInput["q4"],
    q5: o.q5 as AssessmentJoinInput["q5"],
    clutch_score: Math.round(clutch_score),
    opportunity: o.opportunity,
    lowest_category: o.lowest_category,
    next_step: o.next_step,
    session_token,
  };
}

function validateJoinOnly(input: unknown): JoinOnlyInput {
  if (!input || typeof input !== "object") throw new Error("Invalid input");
  const o = input as Record<string, unknown>;
  return {
    email: validateEmail(o.email),
    first_name: optionalString(o.first_name, 80),
    referral_source: optionalString(o.referral_source, 120),
  };
}

function validateSms(input: unknown): SmsOptInInput {
  if (!input || typeof input !== "object") throw new Error("Invalid input");
  const o = input as Record<string, unknown>;
  const phone = typeof o.phone_number === "string" ? o.phone_number.trim() : "";
  // Accept E.164 or common US formats; normalize lightly for storage.
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.length < 10 || digits.length > 16) {
    throw new Error("Enter a valid mobile number.");
  }
  return {
    email: validateEmail(o.email),
    first_name: optionalString(o.first_name, 80),
    phone_number: digits.startsWith("+") ? digits : `+1${digits.replace(/\D/g, "").slice(-10)}`,
  };
}

function validateCheckin(input: unknown): CheckinInput {
  if (!input || typeof input !== "object") throw new Error("Invalid input");
  const o = input as Record<string, unknown>;
  const pid = typeof o.pid === "string" ? o.pid.trim() : "";
  if (pid.length < 4 || pid.length > 64) throw new Error("Invalid profile.");
  const status = typeof o.status === "string" ? o.status.trim() : "";
  if (!(CHECKIN_STATUSES as readonly string[]).includes(status)) {
    throw new Error("Invalid check-in status.");
  }
  return { pid, status: status as CheckinStatus };
}

function toAssessmentFields(data: AssessmentJoinInput): AssessmentProfileFields {
  return {
    goal: data.goal || "Performance",
    athleteType: data.athlete_type,
    lowestCategory: data.lowest_category,
    clutchScore: data.clutch_score,
    clutchMove: data.next_step,
    clutchMove2: null,
  };
}

/**
 * Results-page join: D1 email lookup forks new member vs retake.
 * New → Assessment Completed + Clutch 100 Joined.
 * Retake (prior clutch_score) → Score Retaken, skip join/SMS.
 */
export const submitAssessment = createServerFn({ method: "POST" })
  .inputValidator(validateAssessmentJoin)
  .handler(async ({ data }) => {
    const prior = await findPriorClutchScoreByEmail(data.email);
    const fields = toAssessmentFields(data);

    const answers = {
      q1: data.q1,
      q2: data.q2,
      q3: data.q3,
      q4: data.q4,
      q5: data.q5,
      first_name: data.first_name,
      athlete_type: data.athlete_type,
      session_token: data.session_token,
      lowest_category: data.lowest_category,
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

    if (prior && Number.isFinite(prior.score)) {
      await trackScoreRetaken(
        data.email,
        data.first_name,
        data.clutch_score,
        prior.score,
        fields,
      );
      return {
        ok: true as const,
        kind: "retake" as const,
        previousScore: prior.score,
        newScore: data.clutch_score,
      };
    }

    await trackAssessmentCompleted(data.email, data.first_name, fields);
    await trackClutch100Joined(data.email, data.first_name, data.source, fields);

    return { ok: true as const, kind: "joined" as const };
  });

/**
 * Shared join handler for footer (and any non-assessment entry).
 * Assessment fields optional — unset until they take the score.
 */
export const joinClutch100 = createServerFn({ method: "POST" })
  .inputValidator(validateJoinOnly)
  .handler(async ({ data }) => {
    await trackClutch100Joined(data.email, data.first_name, data.referral_source);
    return { ok: true as const };
  });

export const optInSms = createServerFn({ method: "POST" })
  .inputValidator(validateSms)
  .handler(async ({ data }) => {
    await trackSmsOptedIn(data.email, data.first_name, data.phone_number);
    return { ok: true as const };
  });

/** Day-5 check-in: identify by Klaviyo profile id only (never email in query string). */
export const submitClutchMoveCheckin = createServerFn({ method: "POST" })
  .inputValidator(validateCheckin)
  .handler(async ({ data }) => {
    await trackClutchMoveCheckin({ id: data.pid }, data.status);
    return { ok: true as const, status: data.status };
  });
