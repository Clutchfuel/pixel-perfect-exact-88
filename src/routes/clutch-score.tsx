import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { Assessment } from "@/components/clutch-score/Assessment";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/clutch-score")({
  head: () => ({
    meta: [
      { title: "clutchfuel: What's Your Clutch Score?" },
      {
        name: "description",
        content:
          "What's your Clutch Score? Take the 60-second personalized, science-informed assessment and discover your biggest performance opportunity.",
      },
      { property: "og:title", content: "clutchfuel: What's Your Clutch Score?" },
      { property: "og:description", content: "The 60-second personalized performance assessment." },
    ],
  }),
  component: ClutchScorePage,
});

function ClutchScorePage() {
  return (
    <PageShell showStickyCta={false}>
      <section className="border-b border-black/5">
        <div className="mx-auto w-full max-w-4xl px-5 pb-14 pt-14 text-center sm:px-8 sm:pb-20 sm:pt-24">
          <Reveal>
            <p className="text-xs uppercase tracking-eyebrow text-electric-dark">Clutch Score™</p>
            <h1 className="mt-4 text-balance text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              What's Your Clutch Score?
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Personalized. Science-informed. No equipment. Immediate insight.
            </p>
            <div className="mx-auto mt-8 grid max-w-xl grid-cols-2 gap-3 text-xs uppercase tracking-eyebrow text-muted-foreground sm:grid-cols-4">
              {["60 seconds", "Personalized", "Science-informed", "No equipment"].map((f) => (
                <div key={f} className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-2">
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
