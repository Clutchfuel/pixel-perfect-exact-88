import { SITE_NAME, SITE_URL } from "@/config";
import type { ClutchScoreResult } from "@/lib/clutch-score";
import { escapeHtml } from "@/lib/escape-html";

export function teamLeadText(type: string, payload: Record<string, unknown>): string {
  const lines = Object.entries(payload).map(([k, v]) => `${k}: ${String(v)}`);
  return [`New ${type} lead`, "", ...lines].join("\n");
}

export function userClutchScoreText(email: string, result: ClutchScoreResult): string {
  const tips = result.hydrationGuidance.map((t, i) => `${i + 1}. ${t}`).join("\n");
  const productUrl = `${SITE_URL}/products/${result.recommendedProductSlug}`;

  return [
    `Hi there,`,
    ``,
    `Your Clutch Score results from ${SITE_NAME}:`,
    ``,
    `Clutch Score: ${result.score}`,
    `Sweat Profile: ${result.profile}`,
    `Estimated session intensity: ${result.sessionIntensity}/100`,
    `Estimated sweat rate: ${result.estimatedSweatRateLhr} L/hr`,
    `Estimated fluid loss: ${result.estimatedFluidLossOz} oz`,
    ...(result.caloriesUsed ? [`Calories used in estimate: yes`] : []),
    ``,
    `Hydration guidance:`,
    tips,
    ``,
    result.hydrationRecommendation,
    ``,
    `Recommended product: ${productUrl}`,
    ``,
    `Performance starts with preparation.`,
    `— ${SITE_NAME}`,
    ``,
    `Saved for: ${email}`,
  ].join("\n");
}

export function userClutchScoreHtml(email: string, result: ClutchScoreResult): string {
  const tips = result.hydrationGuidance
    .map((t) => `<li style="margin-bottom:8px">${escapeHtml(t)}</li>`)
    .join("");
  const productUrl = `${SITE_URL}/products/${escapeHtml(result.recommendedProductSlug)}`;
  const safeEmail = escapeHtml(email);

  return `<!DOCTYPE html>
<html><body style="font-family:Inter,Arial,sans-serif;color:#0A0A0A;line-height:1.5">
  <p>Your Clutch Score results from <strong>${escapeHtml(SITE_NAME)}</strong>:</p>
  <p style="font-size:32px;font-weight:800;margin:16px 0">${result.score}</p>
  <p><strong>Sweat Profile:</strong> ${escapeHtml(result.profile)}</p>
  <p><strong>Estimated intensity:</strong> ${result.sessionIntensity}/100</p>
  <p><strong>Estimated sweat rate:</strong> ${result.estimatedSweatRateLhr} L/hr</p>
  <p><strong>Estimated fluid loss:</strong> ${result.estimatedFluidLossOz} oz</p>
  <p style="color:#71717A;font-size:13px">${escapeHtml(result.hydrationRecommendation)}</p>
  <p><strong>Hydration guidance:</strong></p>
  <ul>${tips}</ul>
  <p><a href="${productUrl}" style="display:inline-block;background:#C6F24E;color:#0A0A0A;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:600">View your match →</a></p>
  <p style="color:#71717A;font-size:12px;margin-top:32px">Saved for ${safeEmail}. Not medical advice.</p>
</body></html>`;
}
