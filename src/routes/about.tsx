import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About: ClutchFuel" },
      {
        name: "description",
        content: "ClutchFuel is a performance intelligence company helping everyday athletes stop guessing and start performing with confidence.",
      },
      { property: "og:title", content: "About ClutchFuel" },
      { property: "og:description", content: "Performance intelligence for everyday athletes." },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { t: "Clarity over noise", c: "The industry sells complexity. We ship simple, personalized signal." },
  { t: "Science, quietly", c: "We do the reading so you don't have to. Real research, no jargon." },
  { t: "Everyday athletes first", c: "Not pros. Not influencers. People chasing better between real life." },
];

function AboutPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden border-b border-black/5">
        <div className="absolute inset-0 grid-noise" aria-hidden />
        <div className="relative mx-auto w-full max-w-4xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
          <p className="text-xs uppercase tracking-eyebrow text-electric-dark">About ClutchFuel</p>
          <h1 className="mt-4 text-balance text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
            Athletes deserve better than generic advice.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            We created ClutchFuel because most people don't need another supplement. They need clarity. We exist to help you understand how your body performs so you can make better decisions every day.
          </p>
        </div>
      </section>

      <section className="border-b border-black/5">
        <div className="mx-auto w-full max-w-4xl px-5 py-24 sm:px-8 sm:py-32">
          <p className="text-xs uppercase tracking-eyebrow text-electric-dark">Mission</p>
          <h2 className="mt-4 text-balance text-4xl font-bold leading-tight sm:text-5xl">
            Help everyday athletes stop guessing and start performing with confidence.
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              ClutchFuel isn't a hydration company. It's a performance intelligence company that will, eventually, happen to sell hydration.
            </p>
            <p>
              We're starting where the biggest performance leaks are: hydration, recovery, fueling, and consistency. Clutch Score is the first tool. The Performance Hub is the first library. The community is the first proof.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/5 bg-muted">
        <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <p className="text-xs uppercase tracking-eyebrow text-electric-dark">What we believe</p>
          <h2 className="mt-4 max-w-3xl text-balance text-4xl font-bold leading-tight sm:text-5xl">
            Three commitments we won't break.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.06}>
                <div className="card-elevated h-full p-8">
                  <h3 className="text-xl font-bold">{v.t}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{v.c}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-4xl px-5 py-24 text-center sm:px-8 sm:py-32">
          <h2 className="text-balance text-4xl font-bold leading-tight sm:text-5xl">
            Start with clarity.
          </h2>
          <Link
            to="/clutch-score"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-electric px-8 py-4 text-base font-semibold text-black transition hover:bg-electric-dark"
          >
            Take the Clutch Score <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
