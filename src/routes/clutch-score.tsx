import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { Assessment } from "@/components/clutch-score/Assessment";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/clutch-score")({
  head: () => ({
    meta: [
      { title: "Clutch Score — The 60-second performance assessment" },
      {
        name: "description",
        content:
          "Take the Clutch Score assessment. Sixty seconds, personalized, science-informed. Discover your biggest performance opportunity and one action to try this week.",
      },
      { property: "og:title", content: "Take the Clutch Score" },
      { property: "og:description", content: "The 60-second personalized performance assessment." },
    ],
  }),
  component: ClutchScorePage,
});

function ClutchScorePage() {
  return (
    <PageShell showStickyCta={false}>
      <section className="border-b border-white/5">
        <div className="mx-auto w-full max-w-4xl px-5 pb-14 pt-14 text-center sm:px-8 sm:pb-20 sm:pt-24">
          <Reveal>
            <p className="text-xs uppercase tracking-eyebrow text-electric">Clutch Score™</p>
            <h1 className="mt-4 text-balance text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              Discover your biggest performance opportunity in 60 seconds.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              Personalized. Science-informed. No equipment. Immediate insight.
            </p>
            <div className="mx-auto mt-8 grid max-w-xl grid-cols-2 gap-3 text-xs uppercase tracking-eyebrow text-white/55 sm:grid-cols-4">
              {["60 seconds", "Personalized", "Science-informed", "No equipment"].map((f) => (
                <div key={f} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">
                  {f}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-xl px-5 py-14 sm:px-8 sm:py-20">
        <Assessment />
      </section>
    </PageShell>
  );
}
