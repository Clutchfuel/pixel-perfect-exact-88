ALTER TABLE public.assessment_responses
  ADD COLUMN IF NOT EXISTS goal text,
  ADD COLUMN IF NOT EXISTS athlete_type text;