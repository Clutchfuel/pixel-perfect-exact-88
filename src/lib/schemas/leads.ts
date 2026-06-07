import { z } from "zod";

export const bodyTypeSchema = z.enum(["lighter", "average", "heavier"]);
export const trainingLoadSchema = z.enum(["light", "moderate", "heavy"]);
export const sweatLevelSchema = z.enum(["light", "moderate", "heavy"]);
export const environmentSchema = z.enum(["indoor", "mixed", "hot"]);
export const goalSchema = z.enum(["performance", "endurance", "recovery"]);

export const quizAnswersSchema = z.object({
  bodyType: bodyTypeSchema,
  trainingLoad: trainingLoadSchema,
  sweatLevel: sweatLevelSchema,
  environment: environmentSchema,
  goal: goalSchema,
});

export const quickEstimateSchema = z.object({
  sport: z.string().min(1),
  duration: z.enum(["30", "45", "60", "90"]),
  intensity: z.enum(["low", "moderate", "high"]),
  sweatLevel: sweatLevelSchema,
  hydrationFeeling: z.enum(["good", "okay", "depleted"]),
});

export const caloriesBurnedSchema = z.number().int().min(50).max(5000).optional();

export const marketingConsentSchema = z.literal(true, {
  errorMap: () => ({ message: "Marketing consent is required" }),
});

export const contactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(254),
  message: z.string().min(1).max(5000),
  marketingConsent: marketingConsentSchema,
  turnstileToken: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email().max(254),
  source: z.enum(["footer", "clutch-score-notify"]).default("footer"),
  marketingConsent: marketingConsentSchema,
  turnstileToken: z.string().optional(),
});

export const clutchScoreSubmitSchema = z
  .object({
    email: z.string().email().max(254),
    mode: z.enum(["full", "quick"]).default("full"),
    answers: quizAnswersSchema.optional(),
    quick: quickEstimateSchema.optional(),
    caloriesBurned: caloriesBurnedSchema,
    marketingConsent: marketingConsentSchema,
    turnstileToken: z.string().optional(),
  })
  .refine(
    (data) => (data.mode === "full" && data.answers) || (data.mode === "quick" && data.quick),
    { message: "Invalid calculator payload" },
  );
