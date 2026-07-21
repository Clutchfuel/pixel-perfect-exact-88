/**
 * Map assessment UI values → Klaviyo segment vocabulary.
 * Segments in account expect exact strings (see ClutchFuel_Klaviyo_Flows_Build_Guide).
 * D1 / app copy keep the raw labels; only Klaviyo profile props are normalized.
 */

/** Exact values used by Goal:* segments in Klaviyo. */
export const KLAVIYO_GOALS = [
  "Weight Loss",
  "Muscle Building",
  "More Energy",
  "Better Performance",
  "Better Sleep",
] as const;

/** Exact values used by Athlete Type:* and Sweat Rate segments. */
export const KLAVIYO_ATHLETE_TYPES = [
  "Runner",
  "Lifter",
  "Basketball Player",
  "Cyclist",
  "Busy Professional",
  "Parent Athlete",
] as const;

export type KlaviyoGoal = (typeof KLAVIYO_GOALS)[number];
export type KlaviyoAthleteType = (typeof KLAVIYO_ATHLETE_TYPES)[number];

const GOAL_MAP: Record<string, KlaviyoGoal> = {
  "more energy": "More Energy",
  "weight loss": "Weight Loss",
  "muscle building": "Muscle Building",
  "better sleep": "Better Sleep",
  "better performance": "Better Performance",
  // Assessment chips → closest segment goal
  "fewer cramps": "Better Performance",
  "faster recovery": "Better Performance",
  "greater endurance": "Better Performance",
  "improved daily performance": "Better Performance",
  "better hydration": "Better Performance",
  performance: "Better Performance",
};

const ATHLETE_MAP: Record<string, KlaviyoAthleteType> = {
  runner: "Runner",
  basketball: "Basketball Player",
  "basketball player": "Basketball Player",
  strength: "Lifter",
  lifter: "Lifter",
  hyrox: "Lifter",
  cycling: "Cyclist",
  cyclist: "Cyclist",
  "general fitness": "Busy Professional",
  "busy professional": "Busy Professional",
  "parent athlete": "Parent Athlete",
};

function normKey(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function stripOtherPrefix(value: string): string {
  const trimmed = value.trim();
  const match = /^other:\s*(.+)$/i.exec(trimmed);
  return match ? match[1].trim() : trimmed;
}

/** Split combined goal labels ("A · B") into parts. */
function goalParts(raw: string): string[] {
  return raw
    .split(/\s*[·|/,;]\s*/)
    .map((p) => stripOtherPrefix(p))
    .filter(Boolean);
}

function mapOneGoal(part: string): KlaviyoGoal | null {
  const key = normKey(part);
  if (GOAL_MAP[key]) return GOAL_MAP[key];
  // Free-text may already be a canonical segment value
  const exact = KLAVIYO_GOALS.find((g) => normKey(g) === key);
  return exact ?? null;
}

/**
 * Canonical goal for Klaviyo segments. Prefers the first mappable part
 * when the assessment joined multiple goals with " · ".
 */
export function mapGoalForKlaviyo(raw: string | null | undefined): KlaviyoGoal | null {
  if (!raw || !raw.trim()) return null;
  const parts = goalParts(raw);
  for (const part of parts) {
    const mapped = mapOneGoal(part);
    if (mapped) return mapped;
  }
  return null;
}

export function mapAthleteTypeForKlaviyo(
  raw: string | null | undefined,
): KlaviyoAthleteType | null {
  if (!raw || !raw.trim()) return null;
  const cleaned = stripOtherPrefix(raw);
  const key = normKey(cleaned);
  if (ATHLETE_MAP[key]) return ATHLETE_MAP[key];
  const exact = KLAVIYO_ATHLETE_TYPES.find((t) => normKey(t) === key);
  return exact ?? null;
}
