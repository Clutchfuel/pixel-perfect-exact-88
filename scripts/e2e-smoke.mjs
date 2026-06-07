#!/usr/bin/env node
/**
 * Cross-platform E2E smoke tests using fetch (replaces bash script).
 */
import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BASE = process.argv[2] ?? "http://localhost:8080";
let fail = 0;

function pass(msg) {
  console.log(`  ✓ ${msg}`);
}
function failMsg(msg) {
  console.log(`  ✗ ${msg}`);
  fail = 1;
}

async function fetchText(url, init) {
  const res = await fetch(url, init);
  const text = await res.text();
  return { res, text };
}

console.log(`E2E smoke — ${BASE}\n`);

console.log("Build + unit tests");
if (process.env.SKIP_BUILD !== "1") {
  const build = spawnSync("bun", ["run", "build"], { stdio: "pipe", encoding: "utf8" });
  if (build.status === 0) pass("bun run build");
  else {
    const nodeBuild = spawnSync("npm", ["run", "build"], {
      stdio: "pipe",
      encoding: "utf8",
      shell: true,
    });
    if (nodeBuild.status === 0) pass("npm run build");
    else failMsg("build failed");
  }
} else {
  pass("build (skipped — SKIP_BUILD=1)");
}

const unit = spawnSync(process.execPath, ["scripts/run-ts.mjs", "scripts/test-clutch-score.ts"], {
  stdio: "pipe",
  encoding: "utf8",
});
if (unit.status === 0) pass("clutch-score scoring tests");
else failMsg("clutch-score scoring tests");

const security = spawnSync(process.execPath, ["scripts/test-security.mjs"], {
  stdio: "pipe",
  encoding: "utf8",
});
if (security.status === 0) pass("security unit tests");
else failMsg("security unit tests");

console.log("\nSEO / crawl surfaces");
try {
  const { text: html } = await fetchText(`${BASE}/`);
  if (html.includes('<link rel="canonical"')) pass("homepage canonical");
  else failMsg("homepage canonical");
  if (html.includes("application/ld+json")) pass("homepage JSON-LD");
  else failMsg("homepage JSON-LD");
  if (!html.includes("designed to attract organic traffic")) pass("no Lovable SEO boilerplate");
  else failMsg("Lovable boilerplate still present");

  const { text: robots } = await fetchText(`${BASE}/robots.txt`);
  if (robots.includes("Sitemap:")) pass("robots.txt sitemap");
  else failMsg("robots.txt");
  if (robots.includes("GPTBot")) pass("robots.txt AI crawlers");
  else failMsg("robots.txt AI crawlers");

  const { text: sitemap } = await fetchText(`${BASE}/sitemap.xml`);
  if (sitemap.includes("<loc>") && sitemap.includes("clutch-score"))
    pass("sitemap includes clutch-score");
  else failMsg("sitemap clutch-score");
} catch (err) {
  failMsg(`SEO checks — ${err instanceof Error ? err.message : err}`);
}

console.log("\nLead capture API");
const ts = Date.now();
const leadPayload = { marketingConsent: true };

try {
  const { text: contact } = await fetchText(`${BASE}/api/leads/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...leadPayload,
      name: "E2E Test",
      email: `e2e-contact-${ts}@test.com`,
      message: "Smoke test message",
    }),
  });
  if (contact.includes('"ok":true')) pass("POST /api/leads/contact");
  else failMsg(`POST /api/leads/contact — ${contact}`);

  const { text: news } = await fetchText(`${BASE}/api/leads/newsletter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...leadPayload,
      email: `e2e-news-${ts}@test.com`,
      source: "footer",
    }),
  });
  if (news.includes('"ok":true')) pass("POST /api/leads/newsletter");
  else failMsg(`POST /api/leads/newsletter — ${news}`);

  const { text: score } = await fetchText(`${BASE}/api/leads/clutch-score`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...leadPayload,
      email: `e2e-score-${ts}@test.com`,
      answers: {
        bodyType: "heavier",
        trainingLoad: "heavy",
        sweatLevel: "heavy",
        environment: "hot",
        goal: "endurance",
      },
    }),
  });
  if (score.includes('"ok":true')) pass("POST /api/leads/clutch-score");
  else failMsg(`POST /api/leads/clutch-score — ${score}`);
  if (score.includes('"profile":"Heavy Sweater"'))
    pass("clutch-score server recompute (Heavy Sweater)");
  else failMsg(`clutch-score profile mismatch — ${score}`);

  const invalidDir = mkdtempSync(join(tmpdir(), "cf-e2e-"));
  const invalidPath = join(invalidDir, "invalid.json");
  const invalidRes = await fetch(`${BASE}/api/leads/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "", email: "bad", message: "" }),
  });
  const invalidBody = await invalidRes.text();
  writeFileSync(invalidPath, invalidBody);
  if (invalidRes.status === 400 && invalidBody.includes('"ok":false')) {
    pass("invalid payload rejected (400)");
  } else {
    failMsg(`invalid payload should 400 — got ${invalidRes.status}`);
  }

  const noConsent = await fetch(`${BASE}/api/leads/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "No Consent",
      email: `e2e-noconsent-${ts}@test.com`,
      message: "Missing consent",
    }),
  });
  const noConsentBody = await noConsent.text();
  if (noConsent.status === 400 && noConsentBody.includes('"ok":false')) {
    pass("missing marketing consent rejected (400)");
  } else {
    failMsg(`missing consent should 400 — got ${noConsent.status}`);
  }
} catch (err) {
  failMsg(`Lead API — ${err instanceof Error ? err.message : err}`);
}

console.log("\nPages render");
for (const path of ["/", "/clutch-score", "/products", "/contact"]) {
  try {
    const res = await fetch(`${BASE}${path}`);
    if (res.status === 200) pass(`GET ${path} (${res.status})`);
    else failMsg(`GET ${path} (${res.status})`);
  } catch {
    failMsg(`GET ${path} (000)`);
  }
}

try {
  const { text: clutch } = await fetchText(`${BASE}/clutch-score`);
  if (clutch.includes("Which best describes your build?")) pass("clutch-score quiz UI (SSR)");
  else failMsg("clutch-score quiz UI");
} catch (err) {
  failMsg(`clutch-score page — ${err instanceof Error ? err.message : err}`);
}

console.log("");
if (fail === 0) {
  console.log("All smoke checks passed.");
  process.exit(0);
}
console.log("Some checks failed.");
process.exit(1);
