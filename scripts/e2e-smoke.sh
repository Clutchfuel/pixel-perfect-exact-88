#!/usr/bin/env bash
set -euo pipefail

BASE="${1:-http://localhost:8080}"
FAIL=0

pass() { echo "  ✓ $1"; }
fail() { echo "  ✗ $1"; FAIL=1; }

echo "E2E smoke — $BASE"
echo

echo "Build + unit tests"
if [[ "${SKIP_BUILD:-}" != "1" ]]; then
  bun run build >/dev/null && pass "bun run build" || fail "bun run build"
else
  pass "bun run build (skipped — SKIP_BUILD=1)"
fi
bun run test:clutch-score >/dev/null && pass "clutch-score scoring tests" || fail "clutch-score scoring tests"
echo

echo "SEO / crawl surfaces"
HTML=$(curl -sf "$BASE/" || true)
echo "$HTML" | grep -q '<link rel="canonical"' && pass "homepage canonical" || fail "homepage canonical"
echo "$HTML" | grep -q 'application/ld+json' && pass "homepage JSON-LD" || fail "homepage JSON-LD"
! echo "$HTML" | grep -q 'designed to attract organic traffic' && pass "no Lovable SEO boilerplate" || fail "Lovable boilerplate still present"

ROBOTS=$(curl -sf "$BASE/robots.txt" || true)
echo "$ROBOTS" | grep -q 'Sitemap:' && pass "robots.txt sitemap" || fail "robots.txt"
echo "$ROBOTS" | grep -q 'GPTBot' && pass "robots.txt AI crawlers" || fail "robots.txt AI crawlers"

SITEMAP=$(curl -sf "$BASE/sitemap.xml" || true)
echo "$SITEMAP" | grep -q '<loc>.*clutch-score</loc>' && pass "sitemap includes clutch-score" || fail "sitemap clutch-score"
echo

echo "Lead capture API (dev skips email when RESEND_API_KEY empty)"
TS=$(date +%s)
CONTACT=$(curl -sf -X POST "$BASE/api/leads/contact" \
  -H 'Content-Type: application/json' \
  -d "{\"name\":\"E2E Test\",\"email\":\"e2e-contact-${TS}@test.com\",\"message\":\"Smoke test message\"}" || echo '{"ok":false}')
echo "$CONTACT" | grep -q '"ok":true' && pass "POST /api/leads/contact" || fail "POST /api/leads/contact — $CONTACT"

NEWS=$(curl -sf -X POST "$BASE/api/leads/newsletter" \
  -H 'Content-Type: application/json' \
  -d "{\"email\":\"e2e-news-${TS}@test.com\",\"source\":\"footer\"}" || echo '{"ok":false}')
echo "$NEWS" | grep -q '"ok":true' && pass "POST /api/leads/newsletter" || fail "POST /api/leads/newsletter — $NEWS"

SCORE=$(curl -sf -X POST "$BASE/api/leads/clutch-score" \
  -H 'Content-Type: application/json' \
  -d "{\"email\":\"e2e-score-${TS}@test.com\",\"answers\":{\"bodyType\":\"heavier\",\"trainingLoad\":\"heavy\",\"sweatLevel\":\"heavy\",\"environment\":\"hot\",\"goal\":\"endurance\"}}" || echo '{"ok":false}')
echo "$SCORE" | grep -q '"ok":true' && pass "POST /api/leads/clutch-score" || fail "POST /api/leads/clutch-score — $SCORE"
echo "$SCORE" | grep -q '"profile":"Heavy Sweater"' && pass "clutch-score server recompute (Heavy Sweater)" || fail "clutch-score profile mismatch — $SCORE"

INVALID=$(curl -s -X POST "$BASE/api/leads/contact" \
  -H 'Content-Type: application/json' \
  -d '{"name":"","email":"bad","message":""}' -w '%{http_code}' -o /tmp/cf-invalid.json)
[[ "$INVALID" == "400" ]] && grep -q '"ok":false' /tmp/cf-invalid.json && pass "invalid payload rejected (400)" || fail "invalid payload should 400 — got $INVALID"
echo

echo "Pages render"
for path in / /clutch-score /products /contact; do
  CODE=$(curl -sf -o /dev/null -w '%{http_code}' "$BASE$path" || echo "000")
  [[ "$CODE" == "200" ]] && pass "GET $path ($CODE)" || fail "GET $path ($CODE)"
done

CLUTCH=$(curl -sf "$BASE/clutch-score" || true)
echo "$CLUTCH" | grep -q "Let's Build Your Hydration Profile" && pass "clutch-score quiz UI (SSR)" || fail "clutch-score quiz UI"
echo

if [[ "$FAIL" -eq 0 ]]; then
  echo "All smoke checks passed."
  exit 0
else
  echo "Some checks failed."
  exit 1
fi
