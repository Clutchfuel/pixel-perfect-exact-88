import { z } from "zod";

export const answerIndexSchema = z.union([
  z.literal(0),
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
]);

export const diagnosticAnswersSchema = z.object({
  q1: answerIndexSchema,
  q2: answerIndexSchema,
  q3: answerIndexSchema,
  q4: answerIndexSchema,
  q5: answerIndexSchema,
});

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

export const clutchScoreSubmitSchema = z.object({
  email: z.string().email().max(254),
  answers: diagnosticAnswersSchema,
  marketingConsent: marketingConsentSchema,
  turnstileToken: z.string().optional(),
});

export const feedbackSchema = z.object({
  accuracy: z.string().min(1).max(80),
  resonated: z.string().max(2000).default(""),
  missing: z.string().max(2000).default(""),
  recommend: z.string().max(40).default(""),
  score: z.number().int().min(0).max(100).optional(),
  opportunity: z.string().max(80).optional(),
  firstMove: z.string().max(500).optional(),
  answers: diagnosticAnswersSchema.optional(),
});
