# Reposition around goals, not deficiencies

Three coordinated changes: rebuild the assessment as a goal-first coaching conversation, rewrite the homepage hero, and replace generic imagery with cinematic, editorial visuals.

## 1. Clutch Score assessment — goal-first flow

Rebuild `src/components/clutch-score/Assessment.tsx` into a 3-step conversation:

**Step 1 — Goal** (single-select, required)
- Have more energy during workouts
- Stop cramping
- Recover faster
- Build endurance
- Get stronger
- Lose weight without sacrificing performance
- Improve game-day performance
- Stay consistent
- Prepare for my first HYROX
- Run a faster 5K
- Train for basketball season
- Simply feel better after workouts

**Step 2 — Athlete type** (single-select)
Runner · Basketball · Strength · CrossFit · HYROX · Cycling · General Fitness · Weekend Warrior

**Step 3 — Habits** (the existing 5 hydration questions, expanded to include a sleep and recovery frequency question — 7 questions total, still ~60 seconds)

**Result screen** reframed:
- Headline: "Based on your goal of {goal}, your biggest opportunity is {opportunity}."
- No lead score. Score moves to a small secondary badge.
- Next step is written in the second person and tied to the goal ("If you want to build endurance, drink electrolytes 15–30 min before your long runs…").
- Result-mapping logic: keep existing opportunity computation, but the copy for each opportunity gets 3–4 goal-specific variants so the same "Hydration Timing" opportunity reads differently for a HYROX prep vs. a busy-parent-energy goal.

Backend: `assessment_responses` already stores `q1..q5`, `source`, etc. I'll extend the insert to also write `goal` and `athlete_type` into the existing `source` field's neighbors — this requires a small migration adding `goal text` and `athlete_type text` columns (nullable, no data loss). Existing feedback flow is untouched.

## 2. Homepage hero rewrite

`src/routes/index.tsx`:
- Headline → **"Helping Everyday Athletes Perform Better."**
- Sub → "Personalized insights and better habits — starting with your Clutch Score."
- Primary CTA stays "Take the Clutch Score". Secondary CTA "See how it works".
- Rework the section immediately below the hero to lead with "Every goal starts with better performance" instead of the current problem-framing.

## 3. Cinematic imagery pass

Regenerate the key hero and section images with an editorial, documentary tone (natural light, shallow depth of field, real effort, no smiling-at-camera stock). Targets:
- Homepage hero image
- Community athlete cards (already added — regenerate the 4 that read most "stock-y")
- How It Works and Insights preview

I'll use the premium image tier for the hero and standard for the rest, generated in parallel.

## Out of scope this pass

- Full photography direction system / brand guidelines doc
- New pages beyond what exists
- Product/commerce surfaces
- Reworking Mission / Promise / Partnerships copy (recently shipped)

## Technical notes

- Migration: `ALTER TABLE public.assessment_responses ADD COLUMN goal text, ADD COLUMN athlete_type text;` — nullable, no grants change needed (existing grants cover new columns).
- Assessment state machine gains two steps before the existing quiz; `computeResult` unchanged, but `NEXT_STEP` becomes `NEXT_STEP[opportunity][goalBucket]` with a fallback.
- Image regeneration writes to existing `src/assets/*.jpg` paths so imports don't churn.
