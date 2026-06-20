-- Restrict UPDATE so anon can only write the two feedback columns.
REVOKE UPDATE ON public.assessment_responses FROM anon, authenticated;
GRANT UPDATE (helpful_result, feedback_text) ON public.assessment_responses TO anon, authenticated;

-- Replace the permissive UPDATE policy with one that only allows
-- attaching feedback to rows that don't have feedback yet.
DROP POLICY IF EXISTS "Anyone can update their submission feedback" ON public.assessment_responses;
CREATE POLICY "Anyone can attach feedback once"
  ON public.assessment_responses FOR UPDATE
  TO anon, authenticated
  USING (helpful_result IS NULL AND feedback_text IS NULL)
  WITH CHECK (true);

-- Tighten the INSERT policy too: must include answers + email; no impossible scores.
DROP POLICY IF EXISTS "Anyone can submit an assessment" ON public.assessment_responses;
CREATE POLICY "Anyone can submit an assessment"
  ON public.assessment_responses FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(email) > 3
    AND char_length(email) < 255
    AND email LIKE '%@%.%'
    AND (clutch_score IS NULL OR (clutch_score >= 0 AND clutch_score <= 100))
  );
