/**
 * Post–Clutch Score nurture copy (Day 2 / Day 5).
 * Wire into Resend Audiences or Loops after domain cutover — not auto-sent from the Worker yet.
 */

import type { OpportunityKey } from "@/lib/diagnostic-config";
import { opportunityLabel } from "@/lib/diagnostic-config";

export type NurtureEmail = {
  day: 2 | 5;
  subject: string;
  preview: string;
  body: string;
};

export function nurtureDay2(opportunity: OpportunityKey, firstMoveTitle: string): NurtureEmail {
  const label = opportunityLabel[opportunity];
  return {
    day: 2,
    subject: `Your First Clutch Move this week`,
    preview: `Focus on ${label} — start with one move.`,
    body: [
      `Your Biggest Opportunity is ${label}.`,
      ``,
      `This week's only job:`,
      firstMoveTitle,
      ``,
      `Do it once before your next hard session. Then notice how the second half feels.`,
      ``,
      `Performance starts with preparation.`,
      `— ClutchFuel`,
    ].join("\n"),
  };
}

export function nurtureDay5(opportunity: OpportunityKey): NurtureEmail {
  const systemTip: Record<OpportunityKey, string> = {
    pre_workout_hydration:
      "Lean on Clutch ISO in the Prepare window — front-load fluids and electrolytes before you train.",
    recovery_routine:
      "Lean on Clutch Recovery in the 30-minute window after hard work — fluids, electrolytes, rebuild.",
    endurance_support:
      "Lean on Clutch Flow for sessions over 45 minutes — hold output when plain water isn't enough.",
    hydration_consistency:
      "Build a daily baseline first (Prepare), then layer Perform and Recover around hard days.",
    electrolyte_replacement:
      "Match sodium to your work — Clutch Flow during, Clutch Recovery after, every hard session.",
  };

  return {
    day: 5,
    subject: `Prepare → Perform → Recover for your profile`,
    preview: `How the 3-stage system maps to ${opportunityLabel[opportunity]}.`,
    body: [
      `You've had a few days with your Clutch Score.`,
      ``,
      systemTip[opportunity],
      ``,
      `Explore the system: https://clutchfuel.com/system`,
      `Retake anytime: https://clutchfuel.com/clutch-score`,
      ``,
      `— ClutchFuel`,
    ].join("\n"),
  };
}
