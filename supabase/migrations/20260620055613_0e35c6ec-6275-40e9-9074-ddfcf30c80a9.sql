CREATE TABLE public.assessment_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  first_name TEXT,
  email TEXT NOT NULL,
  source TEXT,
  q1 TEXT NOT NULL,
  q2 TEXT NOT NULL,
  q3 TEXT NOT NULL,
  q4 TEXT NOT NULL,
  q5 TEXT NOT NULL,
  clutch_score INTEGER,
  opportunity TEXT,
  next_step TEXT,
  helpful_result BOOLEAN,
  feedback_text TEXT
);

GRANT INSERT, UPDATE ON public.assessment_responses TO anon;
GRANT INSERT, UPDATE ON public.assessment_responses TO authenticated;
GRANT ALL ON public.assessment_responses TO service_role;

ALTER TABLE public.assessment_responses ENABLE ROW LEVEL SECURITY;

-- Phase 1 MVP: anonymous athletes submit + update their own feedback.
-- No SELECT policy: client never reads back; results are kept in component state.
CREATE POLICY "Anyone can submit an assessment"
  ON public.assessment_responses FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update their submission feedback"
  ON public.assessment_responses FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
