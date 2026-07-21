/**
 * Klaviyo Clutch 100 QA checklist
 *
 * Wiring is server-only (createServerFn). Flows/Segments must still be built
 * by hand in the Klaviyo UI — this script only verifies event names + URL shapes.
 *
 * Usage: node scripts/qa-klaviyo-events.mjs
 * No live API calls (works without KLAVIYO_API_KEY).
 */

const EVENTS = [
  {
    name: "Assessment Completed",
    when: "New email on results Join The Clutch 100 submit (no prior D1 score)",
    profile: [
      "goal",
      "athlete_type",
      "lowest_category",
      "clutch_score",
      "clutch_move",
      "clutch_move_2 (null until second-pillar ranking exists)",
    ],
  },
  {
    name: "Clutch 100 Joined",
    when: "Same new-member submit, or footer Join The Clutch 100 (no assessment props)",
    profile: ["clutch_100_joined_date", "referral_source", "+ assessment props when present"],
    list: "WTECB3 (All Clutch 100 Members)",
  },
  {
    name: "SMS Opted In",
    when: "Optional SMS form after successful join on results page",
    profile: ["sms_consent", "phone_number"],
  },
  {
    name: "Clutch Move Check-in",
    when: "Landing /clutch-100/check-in?pid={{ person.id }}&status=<status>",
    note: "Never put email in the query string. Four email links, status hardcoded per link.",
    statuses: ["nailed_it", "mostly_consistent", "struggling", "havent_started"],
  },
  {
    name: "Score Retaken",
    when: "Same join form when D1 already has a clutch_score for that email",
    event: ["clutch_score (new)", "previous_clutch_score (from D1)"],
    ui: "Skip join/SMS — show score updated confirmation",
  },
];

console.log("\n=== Klaviyo Clutch 100 — event wiring checklist ===\n");
console.log("Secret: KLAVIYO_API_KEY in .dev.vars (local) or wrangler secret put (prod)");
console.log("Never VITE_KLAVIYO_* — would ship in the client bundle.\n");
console.log("Profile map (assessment → segment vocabulary):");
console.log("  Athletes: Basketball→Basketball Player, Strength/HYROX→Lifter,");
console.log("            Cycling→Cyclist, General Fitness→Busy Professional, Runner→Runner");
console.log("  Goals: More Energy→More Energy; other chips→Better Performance;");
console.log("         Weight Loss / Muscle Building / Better Sleep pass through if typed");
console.log("  Raw labels also stored as goal_raw / athlete_type_raw\n");

for (const [i, event] of EVENTS.entries()) {
  console.log(`${i + 1}. ${event.name}`);
  console.log(`   When: ${event.when}`);
  if (event.profile) console.log(`   Profile props: ${event.profile.join(", ")}`);
  if (event.event) console.log(`   Event props: ${event.event.join(", ")}`);
  if (event.list) console.log(`   List: ${event.list}`);
  if (event.ui) console.log(`   UI: ${event.ui}`);
  if (event.note) console.log(`   Note: ${event.note}`);
  if (event.statuses) {
    console.log("   Check-in URL shape (example status=nailed_it):");
    console.log("     /clutch-100/check-in?pid={{ person.id }}&status=nailed_it");
    console.log("   All four email link templates:");
    for (const status of event.statuses) {
      console.log(`     /clutch-100/check-in?pid={{ person.id }}&status=${status}`);
    }
  }
  console.log("");
}

console.log("Manual Klaviyo UI (not automated by this repo):");
console.log("  Build Flows + Segments that listen for the exact metric names above.");
console.log("  Templates Day 0–30 already exist — wire triggers to those metrics.\n");