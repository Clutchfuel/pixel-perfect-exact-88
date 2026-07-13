import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Assessment } from "@/components/clutch-score/Assessment";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/clutch-score")({
  head: () => ({
    meta: [
      { title: "Clutch Score — Your Personalized Performance Assessment | ClutchFuel" },
      {
        name: "description",
        content:
          "Discover the one habit costing you performance in under 60 seconds. Get a Clutch Score, your biggest opportunity, and one First Clutch Move.",
      },
      { property: "og:title", content: "Clutch Score — Discover what's holding your performance back" },
      {
        property: "og:description",
        content: "A 60-second performance assessment for everyday athletes.",
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
    window.dispatchEvent(new CustomEvent("clutch-score:start"));
  };

  return (
    <PageShell showStickyCta={false}>
      <div className="bg-[#070707] text-white">
        <section className="relative overflow-hidden border-b border-white/10">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(193,255,0,0.18), transparent), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.04), transparent)",
            }}
            aria-hidden
          />
          <div className="relative mx-auto w-full max-w-3xl px-5 pb-16 pt-16 text-center sm:px-8 sm:pb-24 sm:pt-24">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#c1ff00]">
                Clutch Score™
              </p>
              <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
                Every athlete has one habit costing them performance.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl">
                Discover yours in less than 60 seconds and get one personalized action to improve
                before your next workout.
              </p>
              <button
                type="button"
                onClick={start}
                className="mt-10 inline-flex items-center justify-center rounded-full bg-[#c1ff00] px-8 py-4 text-base font-semibold text-black transition hover:bg-[#d6ff4d]"
              >
                Take My Clutch Score →
              </button>
              <ul className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-3 text-sm text-white/70 sm:flex-row sm:justify-center sm:gap-6">
                {TRUST.map((t) => (
                  <li key={t} className="inline-flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#c1ff00]" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mx-auto mt-12 max-w-lg text-sm leading-relaxed text-white/45">
                Built around the everyday habits that influence athletic performance — designed to
                help you identify the next improvement, not overwhelm you with dozens of changes.
              </p>
            </Reveal>
          </div>
        </section>

        <section id="clutch-assessment" className="mx-auto w-full max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
          <Assessment />
        </section>
      </div>
    </PageShell>
  );
}
