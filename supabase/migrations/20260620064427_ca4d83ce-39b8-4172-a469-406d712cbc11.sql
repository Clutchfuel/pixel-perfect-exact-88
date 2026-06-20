
-- Drop the overly permissive UPDATE policy that lets anyone overwrite any row's feedback
DROP POLICY IF EXISTS "Anyone can attach feedback once" ON public.assessment_responses;

-- Add a per-submission session token so feedback updates can be scoped to the original submitter
ALTER TABLE public.assessment_responses
  ADD COLUMN IF NOT EXISTS session_token text;

CREATE INDEX IF NOT EXISTS assessment_responses_session_token_idx
  ON public.assessment_responses (session_token);

-- Drop and recreate INSERT policy to require a session_token (>= 16 chars) on new rows
DROP POLICY IF EXISTS "Anyone can submit an assessment" ON public.assessment_responses;

CREATE POLICY "Anyone can submit an assessment"
ON public.assessment_responses
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(email) > 3
  AND char_length(email) < 255
  AND email LIKE '%@%.%'
  AND (clutch_score IS NULL OR (clutch_score >= 0 AND clutch_score <= 100))
  AND session_token IS NOT NULL
  AND char_length(session_token) >= 16
);

-- No SELECT or UPDATE policy: client cannot read or modify rows directly.
-- Feedback updates go through a server function using the service-role client,
-- which verifies the session_token matches the row before applying the update.
