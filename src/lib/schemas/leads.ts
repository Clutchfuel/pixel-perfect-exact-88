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

export const contactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(254),
  message: z.string().min(1).max(5000),
  turnstileToken: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email().max(254),
  source: z.enum(["footer", "clutch-score-notify"]).default("footer"),
  turnstileToken: z.string().optional(),
});

export const clutchScoreSubmitSchema = z.object({
  email: z.string().email().max(254),
  answers: quizAnswersSchema,
  turnstileToken: z.string().optional(),
});
