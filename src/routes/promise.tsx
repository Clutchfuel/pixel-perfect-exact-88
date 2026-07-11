import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/promise")({
  head: () => ({
    meta: [
      { title: "Our Promise — ClutchFuel" },
      {
        name: "description",
        content:
          "As ClutchFuel grows, we give back. Supporting youth sports, community events, and removing barriers that keep athletes from participating.",
      },
      { property: "og:title", content: "Our Promise — ClutchFuel" },
      {
        property: "og:description",
        content: "As we grow, we invest back into the communities that helped build us.",
      },
    ],
  }),
  component: PromisePage,
});

const COMMITMENTS = [
  { t: "Youth sports", c: "Supporting local youth sports organizations that give kids their first shot." },
  { t: "Community events", c: "Providing hydration and education at races, meetups, and local events." },
  { t: "Health nonprofits", c: "Partnering with organizations promoting health, wellness, and access." },
  { t: "Removing barriers", c: "Helping remove financial barriers that keep kids from participating in sports." },
  { t: "Next generation", c: "Creating opportunities for the next generation of everyday athletes." },
];

function PromisePage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden border-b border-black/5">
        <div className="absolute inset-0 grid-noise" aria-hidden />
        <div className="relative mx-auto w-full max-w-4xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
          <p className="text-xs uppercase tracking-eyebrow text-electric-dark">Our Promise</p>
          <h1 className="mt-4 text-balance text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
            As we grow, we give back.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Today, we're focused on building tools that help everyday athletes perform at their best. Tomorrow, we'll use our platform to invest back into the communities that helped build us.
          </p>
        </div>
      </section>

      <section className="border-b border-black/5 bg-muted">
        <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <p className="text-xs uppercase tracking-eyebrow text-electric-dark">Long-term commitments</p>
          <h2 className="mt-4 max-w-3xl text-balance text-4xl font-bold leading-tight sm:text-5xl">
            The kind of company we want to become.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {COMMITMENTS.map((c, i) => (
              <Reveal key={c.t} delay={i * 0.05}>
                <div className="card-elevated h-full p-8">
                  <h3 className="text-xl font-bold">{c.t}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{c.c}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/5">
        <div className="mx-auto w-full max-w-3xl px-5 py-24 text-center sm:px-8 sm:py-32">
          <p className="text-lg font-semibold text-foreground">This isn't a marketing campaign.</p>
          <p className="mt-3 text-lg text-muted-foreground">
            It's part of who we want ClutchFuel to become.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-4xl px-5 py-24 text-center sm:px-8 sm:py-32">
          <h2 className="text-balance text-4xl font-bold leading-tight sm:text-5xl">
            Build with us.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/clutch-score"
              className="inline-flex items-center gap-2 rounded-full bg-electric px-8 py-4 text-base font-semibold text-white transition hover:bg-electric-dark"
            >
              Take the Clutch Score <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/partnerships"
              className="inline-flex items-center gap-2 rounded-full border border-black/15 px-8 py-4 text-base font-semibold text-foreground transition hover:border-electric"
            >
              Become a partner
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
