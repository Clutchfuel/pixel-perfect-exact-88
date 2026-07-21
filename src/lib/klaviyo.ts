import { getEnv } from "@/lib/env";
import { reportError } from "@/lib/observability";
import { mapAthleteTypeForKlaviyo, mapGoalForKlaviyo } from "@/lib/klaviyo-profile-map";

/** Matches the revision used when the existing metrics/templates were built. */
const KLAVIYO_REVISION = "2026-04-15";
/** All Clutch 100 Members */
const KLAVIYO_LIST_ID = "WTECB3";
const KLAVIYO_BASE = "https://a.klaviyo.com";

export type AssessmentProfileFields = {
  goal?: string | null;
  athleteType?: string | null;
  lowestCategory?: string | null;
  clutchScore?: number | null;
  clutchMove?: string | null;
  /** Second-lowest pillar move — leave null until ranking exists. */
  clutchMove2?: string | null;
};

export type ProfileIdentity =
  | { email: string; id?: undefined }
  | { id: string; email?: string };

function apiKey(): string | undefined {
  const key = getEnv("KLAVIYO_API_KEY");
  if (!key || !key.trim()) return undefined;
  return key.trim();
}

function uniqueId(seed: string, eventName: string): string {
  return `${seed.toLowerCase()}-${eventName.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}`;
}

async function klaviyoFetch(
  path: string,
  init: RequestInit & { method: string },
): Promise<Response | null> {
  const key = apiKey();
  if (!key) {
    console.warn("[klaviyo] KLAVIYO_API_KEY unset — skipping", path);
    return null;
  }

  const headers = new Headers(init.headers);
  headers.set("Authorization", `Klaviyo-API-Key ${key}`);
  headers.set("revision", KLAVIYO_REVISION);
  headers.set("Accept", "application/vnd.api+json");
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/vnd.api+json");
  }

  const res = await fetch(`${KLAVIYO_BASE}${path}`, { ...init, headers });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Klaviyo ${init.method} ${path} → ${res.status}: ${body.slice(0, 300)}`);
  }
  return res;
}

/** Never throws to callers — Klaviyo failures must not block UX. */
async function safe(label: string, fn: () => Promise<void>): Promise<void> {
  try {
    await fn();
  } catch (error) {
    reportError(error, { source: "klaviyo", label });
    console.error(`[klaviyo] ${label} failed`, error);
  }
}

function profileResource(
  identity: ProfileIdentity,
  firstName: string | null | undefined,
  properties: Record<string, unknown>,
) {
  const attributes: Record<string, unknown> = { properties };
  if (identity.email) attributes.email = identity.email;
  if (firstName) attributes.first_name = firstName;

  const data: Record<string, unknown> = {
    type: "profile",
    attributes,
  };
  if (identity.id) data.id = identity.id;

  return { data };
}

async function createEvent(opts: {
  metricName: string;
  identity: ProfileIdentity;
  firstName?: string | null;
  profileProperties?: Record<string, unknown>;
  eventProperties?: Record<string, unknown>;
  uniqueId?: string;
}): Promise<void> {
  const seed = opts.identity.email ?? opts.identity.id ?? "unknown";
  const body = {
    data: {
      type: "event",
      attributes: {
        properties: opts.eventProperties ?? {},
        unique_id: opts.uniqueId ?? uniqueId(seed, opts.metricName),
        metric: {
          data: {
            type: "metric",
            attributes: { name: opts.metricName },
          },
        },
        profile: profileResource(
          opts.identity,
          opts.firstName,
          opts.profileProperties ?? {},
        ),
      },
    },
  };

  await klaviyoFetch("/api/events/", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/** Subscribe email to All Clutch 100 Members (WTECB3). Soft-fails inside safe(). */
async function addEmailToClutch100List(email: string): Promise<void> {
  await klaviyoFetch("/api/profile-subscription-bulk-create-jobs/", {
    method: "POST",
    body: JSON.stringify({
      data: {
        type: "profile-subscription-bulk-create-job",
        attributes: {
          profiles: {
            data: [
              {
                type: "profile",
                attributes: {
                  email,
                  subscriptions: {
                    email: { marketing: { consent: "SUBSCRIBED" } },
                  },
                },
              },
            ],
          },
        },
        relationships: {
          list: { data: { type: "list", id: KLAVIYO_LIST_ID } },
        },
      },
    }),
  });
}

function assessmentProfileProps(fields: AssessmentProfileFields): Record<string, unknown> {
  const goalRaw = fields.goal ?? null;
  const athleteRaw = fields.athleteType ?? null;
  return {
    // Segment vocabulary (exact match for Goal:* / Athlete Type:* / Sweat Rate)
    goal: mapGoalForKlaviyo(goalRaw),
    athlete_type: mapAthleteTypeForKlaviyo(athleteRaw),
    // Original assessment labels for email copy / debugging
    goal_raw: goalRaw,
    athlete_type_raw: athleteRaw,
    lowest_category: fields.lowestCategory ?? null,
    clutch_score: fields.clutchScore ?? null,
    clutch_move: fields.clutchMove ?? null,
    clutch_move_2: fields.clutchMove2 ?? null,
  };
}

export async function trackAssessmentCompleted(
  email: string,
  firstName: string | null,
  fields: AssessmentProfileFields,
): Promise<void> {
  await safe("Assessment Completed", async () => {
    await createEvent({
      metricName: "Assessment Completed",
      identity: { email },
      firstName,
      profileProperties: assessmentProfileProps(fields),
      eventProperties: {
        clutch_score: fields.clutchScore ?? null,
        lowest_category: fields.lowestCategory ?? null,
      },
    });
  });
}

export async function trackClutch100Joined(
  email: string,
  firstName: string | null,
  referralSource: string | null,
  assessment?: AssessmentProfileFields,
): Promise<void> {
  await safe("Clutch 100 Joined", async () => {
    const joinedDate = new Date().toISOString().slice(0, 10);
    const profileProperties: Record<string, unknown> = {
      clutch_100_joined_date: joinedDate,
      referral_source: referralSource ?? null,
    };
    if (assessment) {
      Object.assign(profileProperties, assessmentProfileProps(assessment));
    }

    await createEvent({
      metricName: "Clutch 100 Joined",
      identity: { email },
      firstName,
      profileProperties,
      eventProperties: {
        referral_source: referralSource ?? null,
        clutch_100_joined_date: joinedDate,
      },
    });

    await addEmailToClutch100List(email);
  });
}

export async function trackSmsOptedIn(
  email: string,
  firstName: string | null,
  phoneNumber: string,
): Promise<void> {
  await safe("SMS Opted In", async () => {
    await createEvent({
      metricName: "SMS Opted In",
      identity: { email },
      firstName,
      profileProperties: {
        sms_consent: true,
        phone_number: phoneNumber,
      },
      eventProperties: {
        sms_consent: true,
      },
    });
  });
}

export async function trackClutchMoveCheckin(
  identity: ProfileIdentity,
  status: string,
): Promise<void> {
  await safe("Clutch Move Check-in", async () => {
    await createEvent({
      metricName: "Clutch Move Check-in",
      identity,
      profileProperties: {
        clutch_move_status: status,
      },
      eventProperties: {
        status,
      },
    });
  });
}

export async function trackScoreRetaken(
  email: string,
  firstName: string | null,
  newScore: number,
  previousScore: number,
  fields?: AssessmentProfileFields,
): Promise<void> {
  await safe("Score Retaken", async () => {
    const profileProperties: Record<string, unknown> = {
      clutch_score: newScore,
      previous_clutch_score: previousScore,
    };
    if (fields) Object.assign(profileProperties, assessmentProfileProps(fields));

    await createEvent({
      metricName: "Score Retaken",
      identity: { email },
      firstName,
      profileProperties,
      eventProperties: {
        clutch_score: newScore,
        previous_clutch_score: previousScore,
      },
    });
  });
}

export { KLAVIYO_LIST_ID };
