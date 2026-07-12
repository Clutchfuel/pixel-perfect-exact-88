#!/usr/bin/env node
/**
 * Cross-platform security unit tests (no bun required).
 */
import { strict as assert } from "node:assert";

const { escapeHtml } = await import("../src/lib/escape-html.ts");
assert.equal(escapeHtml(`<script>"'&"</script>`), "&lt;script&gt;&quot;&#39;&amp;&quot;&lt;/script&gt;");

const { resolveTurnstileConfig } = await import("../src/lib/turnstile-config.ts");
assert.deepEqual(resolveTurnstileConfig("", ""), { enabled: false, misconfigured: false });
assert.deepEqual(resolveTurnstileConfig("site", ""), { enabled: false, misconfigured: true });
assert.deepEqual(resolveTurnstileConfig("site", "secret"), { enabled: true, misconfigured: false });

const { isRateLimitedMemory, resetMemoryRateLimits } = await import(
  "../src/lib/rate-limit-memory.ts"
);
resetMemoryRateLimits();
const key = "test:rate";
for (let i = 0; i < 5; i++) {
  assert.equal(isRateLimitedMemory(key), false);
}
assert.equal(isRateLimitedMemory(key), true);

console.log("security unit tests passed");
