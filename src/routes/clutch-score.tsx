import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Assessment } from "@/components/clutch-score/Assessment";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/clutch-score")({
  head: () => ({
    meta: [
      { title: "Clutch Score — Discover what's holding your performance back | ClutchFuel" },
      {
        name: "description",
        content:
          "Every athlete has one habit costing them performance. Discover yours in less than 60 seconds and get one personalized action to improve before your next workout.",
      },
      { property: "og:title", content: "Clutch Score — Every athlete has one habit costing them performance" },
      {
        property: "og:description",
        content: "Discover yours in less than 60 seconds and get one personalized action to improve.",
      },
    ],
  }),
  component: ClutchScorePage,
});

const TRUST = [
  "Takes 60 seconds",
  "Personalized insights",
  "Built for everyday athletes",
] as const;

function ClutchScorePage() {
  const start = () => {
    document.getElementById("clutch-assessment")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <PageShell showStickyCta={false}>
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto w-full max-w-3xl px-5 pb-16 pt-16 text-center sm:px-8 sm:pb-24 sm:pt-24">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-electric-dark">
              Clutch Score™
            </p>
            <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Every athlete has one habit costing them performance.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Discover yours in less than 60 seconds and get one personalized action to improve
              before your next workout.
            </p>
            <button
              type="button"
              onClick={start}
              className="mt-10 inline-flex items-center justify-center rounded-full bg-electric px-8 py-4 text-base font-semibold text-black transition hover:bg-electric-dark"
            >
              Take My Clutch Score →
            </button>
            <ul className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-3 text-sm text-muted-foreground sm:flex-row sm:justify-center sm:gap-6">
              {TRUST.map((t) => (
                <li key={t} className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 text-electric-dark" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mx-auto mt-12 max-w-lg text-sm leading-relaxed text-muted-foreground/80">
              Built around the everyday habits that influence athletic performance — designed to
              help you identify the next improvement, not overwhelm you with dozens of changes.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="clutch-assessment" className="mx-auto w-full max-w-xl bg-white px-5 py-14 sm:px-8 sm:py-20">
        <Assessment />
      </section>
    </PageShell>
  );
}
