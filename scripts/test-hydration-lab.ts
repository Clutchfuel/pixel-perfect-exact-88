import { strict as assert } from "node:assert";
import { calculatePrecision, calculateQuick, classifySweatRate } from "../src/lib/hydration-lab.ts";

assert.equal(classifySweatRate(0.6), "low");
assert.equal(classifySweatRate(1.2), "moderate");
assert.equal(classifySweatRate(1.8), "high");

const quick = calculateQuick({
  calories: 600,
  durationKey: "60",
  conditionKey: "hot",
  intensityKey: "hard",
  fluidKey: "regular",
  trainingType: "running",
});

assert.ok(quick.sweatRateLph > 0);
assert.ok(quick.sweatRateOph > quick.sweatRateLph);
assert.equal(quick.mode, "quick");
assert.ok(quick.shopifyTags.includes("calc_mode_quick"));
assert.ok(quick.shopifyTags.includes("env_hot"));
assert.ok(quick.shopifyTags.includes("train_running"));

const precision = calculatePrecision({
  weightUnit: "lbs",
  preWeight: 180,
  postWeight: 178.5,
  durationKey: "60",
  fluidKey: "regular",
  bathroomKey: "none",
  trainingType: "hybrid",
});

assert.ok(precision.sweatRateLph > 0);
assert.equal(precision.mode, "precision");
assert.ok(precision.shopifyTags.includes("calc_mode_precision"));

console.log("hydration-lab tests passed");
