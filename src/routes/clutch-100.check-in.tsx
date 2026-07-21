import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { submitClutchMoveCheckin } from "@/lib/assessment.functions";
import { canonical, makeMeta } from "@/lib/seo";

const STATUSES = [
  "nailed_it",
  "mostly_consistent",
  "struggling",
  "havent_started",
] as const;

type Status = (typeof STATUSES)[number];

const STATUS_LABEL: Record<Status, string> = {
  nailed_it: "Nailed it",
  mostly_consistent: "Mostly consistent",
  struggling: "Struggling",
  havent_started: "Haven't started",
};

function isStatus(value: string | undefined): value is Status {
  return Boolean(value && (STATUSES as readonly string[]).includes(value));
}

export const Route = createFileRoute("/clutch-100/check-in")({
  validateSearch: (search: Record<string, unknown>) => {
    const pid = typeof search.pid === "string" ? search.pid.trim() : "";
    const status = typeof search.status === "string" ? search.status.trim() : "";
    return {
      pid,
      status: isStatus(status) ? status : "",
    };
  },
  head: () => ({
    meta: makeMeta({
      title: "Clutch Move Check-in | ClutchFuel",
      description: "Log how your First Clutch Move is going.",
      path: "/clutch-100/check-in",
    }),
    links: canonical("/clutch-100/check-in"),
  }),
  component: CheckInPage,
});

function CheckInPage() {
  const { pid, status } = Route.useSearch();
  const [state, setState] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!pid || !isStatus(status)) {
      setState("error");
      setErrorMessage("This check-in link is missing or incomplete.");
      return;
    }

    let cancelled = false;
    setState("saving");
    void submitClutchMoveCheckin({ data: { pid, status } })
      .then(() => {
        if (!cancelled) setState("done");
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setState("error");
        setErrorMessage(err instanceof Error ? err.message : "Couldn't record your check-in.");
      });

    return () => {
      cancelled = true;
    };
  }, [pid, status]);

  return (
    <PageShell showStickyCta={false}>
      <section className="mx-auto w-full max-w-lg px-5 py-24 text-center sm:px-8">
        {state === "saving" || state === "idle" ? (
          <>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-electric-dark">
              Clutch 100
            </p>
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight">Saving your check-in…</h1>
          </>
        ) : null}

        {state === "done" && isStatus(status) ? (
          <>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-electric-dark">
              Clutch 100
            </p>
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight">Got it.</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              You marked your Clutch Move as <span className="font-semibold text-foreground">{STATUS_LABEL[status]}</span>.
              Keep going.
            </p>
          </>
        ) : null}

        {state === "error" ? (
          <>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-electric-dark">
              Clutch 100
            </p>
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight">Check-in unavailable</h1>
            <p className="mt-4 text-lg text-muted-foreground">{errorMessage}</p>
            <a
              href="/clutch-score"
              className="mt-10 inline-flex rounded-full bg-electric px-8 py-4 text-base font-semibold text-black transition hover:bg-electric-dark"
            >
              Get Your Clutch Score →
            </a>
          </>
        ) : null}
      </section>
    </PageShell>
  );
}
