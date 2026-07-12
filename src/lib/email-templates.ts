import { SITE_NAME, SITE_URL } from "@/config";
import type { DiagnosticResult } from "@/lib/diagnostic-result";
import { escapeHtml } from "@/lib/escape-html";

export function teamLeadText(type: string, payload: Record<string, unknown>): string {
  const lines = Object.entries(payload).map(([k, v]) => `${k}: ${String(v)}`);
  return [`New ${type} lead`, "", ...lines].join("\n");
}

export function userClutchScoreText(email: string, result: DiagnosticResult): string {
  const productUrl = `${SITE_URL}/products/${result.recommendedProductSlug}`;

  return [
    `Hi there,`,
    ``,
    `Your Clutch Score results from ${SITE_NAME}:`,
    ``,
    `Clutch Score: ${result.score}`,
    `Biggest Opportunity: ${result.opportunityLabel}`,
    ``,
    result.paragraph,
    ``,
    `Your First Clutch Move™:`,
    result.firstClutchMove.title,
    result.firstClutchMove.body,
    ``,
    `Recommended next step: ${productUrl}`,
    ``,
    `Performance starts with preparation.`,
    `— ${SITE_NAME}`,
    ``,
    `Saved for: ${email}`,
  ].join("\n");
}

export function userClutchScoreHtml(email: string, result: DiagnosticResult): string {
  const productUrl = `${SITE_URL}/products/${escapeHtml(result.recommendedProductSlug)}`;
  const scoreUrl = `${SITE_URL}/clutch-score`;
  const safeEmail = escapeHtml(email);

  return `<!DOCTYPE html>
<html><body style="font-family:Inter,Arial,sans-serif;color:#0A0A0A;line-height:1.5">
  <p>Your Clutch Score results from <strong>${escapeHtml(SITE_NAME)}</strong>:</p>
  <p style="font-size:40px;font-weight:800;margin:16px 0;color:#0A0A0A">${result.score}</p>
  <p style="text-transform:uppercase;letter-spacing:0.12em;font-size:11px;color:#71717A">Your Biggest Opportunity</p>
  <p style="font-size:20px;font-weight:700;margin:4px 0 12px">${escapeHtml(result.opportunityLabel)}</p>
  <p style="color:#3F3F46">${escapeHtml(result.paragraph)}</p>
  <div style="margin:24px 0;padding:20px;border-radius:16px;border:1px solid #C6F24E;background:#F7FEE7">
    <p style="text-transform:uppercase;letter-spacing:0.14em;font-size:10px;font-weight:700;color:#65A30D;margin:0 0 8px">Your First Clutch Move™</p>
    <p style="font-size:18px;font-weight:700;margin:0 0 8px">${escapeHtml(result.firstClutchMove.title)}</p>
    <p style="margin:0;color:#3F3F46">${escapeHtml(result.firstClutchMove.body)}</p>
  </div>
  <p>
    <a href="${productUrl}" style="display:inline-block;background:#C6F24E;color:#0A0A0A;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:600">Explore your match →</a>
  </p>
  <p style="margin-top:16px"><a href="${scoreUrl}" style="color:#71717A">Retake your Clutch Score</a></p>
  <p style="color:#71717A;font-size:12px;margin-top:32px">Saved for ${safeEmail}. Not medical advice.</p>
</body></html>`;
}
