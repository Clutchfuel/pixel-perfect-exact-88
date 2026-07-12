import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { getLeadsDb } from "@/lib/env";
import { exportAdminToken } from "@/lib/leads-db";

export const Route = createFileRoute("/api/admin/export-leads")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const token = url.searchParams.get("token") ?? request.headers.get("x-export-token");
        const expectedToken = exportAdminToken();

        if (!expectedToken || token !== expectedToken) {
          return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
        }

        const db = getLeadsDb();
        if (!db) {
          return Response.json({ ok: false, error: "Database not configured" }, { status: 503 });
        }

        const scores = await db
          .prepare(
            `SELECT id, created_at, email, score, opportunity, goal, first_clutch_move, source
             FROM clutch_score_responses ORDER BY created_at DESC LIMIT 5000`,
          )
          .all();

        const leads = await db
          .prepare(
            `SELECT id, created_at, type, email, source FROM leads ORDER BY created_at DESC LIMIT 5000`,
          )
          .all();

        return Response.json({
          ok: true,
          clutchScoreResponses: scores.results ?? [],
          leads: leads.results ?? [],
        });
      },
    },
  },
});
