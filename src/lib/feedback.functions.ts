import { createServerFn } from "@tanstack/react-start";

type Input = {
  id: string;
  session_token: string;
  helpful_result: boolean | null;
  feedback_text: string | null;
};

function validate(input: unknown): Input {
  if (!input || typeof input !== "object") throw new Error("Invalid input");
  const o = input as Record<string, unknown>;
  if (typeof o.id !== "string" || o.id.length < 8 || o.id.length > 64) {
    throw new Error("Invalid id");
  }
  if (
    typeof o.session_token !== "string" ||
    o.session_token.length < 16 ||
    o.session_token.length > 128
  ) {
    throw new Error("Invalid session_token");
  }
  if (o.helpful_result !== null && typeof o.helpful_result !== "boolean") {
    throw new Error("Invalid helpful_result");
  }
  if (
    o.feedback_text !== null &&
    (typeof o.feedback_text !== "string" || o.feedback_text.length > 2000)
  ) {
    throw new Error("Invalid feedback_text");
  }
  return o as Input;
}

export const submitFeedback = createServerFn({ method: "POST" })
  .inputValidator(validate)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Verify the session_token matches the row; only allow update if feedback is unset
    const { data: row, error: selectError } = await supabaseAdmin
      .from("assessment_responses")
      .select("id, session_token, helpful_result, feedback_text")
      .eq("id", data.id)
      .maybeSingle();

    if (selectError) throw new Error("Lookup failed");
    if (!row) throw new Error("Not found");
    if (row.session_token !== data.session_token) throw new Error("Forbidden");
    if (row.helpful_result !== null || row.feedback_text !== null) {
      throw new Error("Feedback already submitted");
    }

    const { error: updateError } = await supabaseAdmin
      .from("assessment_responses")
      .update({
        helpful_result: data.helpful_result,
        feedback_text: data.feedback_text,
      })
      .eq("id", data.id)
      .eq("session_token", data.session_token)
      .is("helpful_result", null)
      .is("feedback_text", null);

    if (updateError) throw new Error("Update failed");
    return { ok: true };
  });
