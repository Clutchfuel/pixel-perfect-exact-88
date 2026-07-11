import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/partnerships")({
  head: () => ({
    meta: [
      { title: "Partnerships — ClutchFuel" },
      {
        name: "description",
        content:
          "Let's build better athletes together. ClutchFuel partners with run clubs, gyms, coaches, dietitians, schools, and creators who share our mission.",
      },
      { property: "og:title", content: "Partnerships — ClutchFuel" },
      {
        property: "og:description",
        content: "The future of performance is collaborative. Partner with ClutchFuel.",
      },
    ],
  }),
  component: PartnershipsPage,
});

const AUDIENCES = [
  { emoji: "🏃", label: "Running clubs" },
  { emoji: "🏀", label: "Basketball organizations" },
  { emoji: "🏋️", label: "Gyms & fitness studios" },
  { emoji: "🏃‍♀️", label: "HYROX communities" },
  { emoji: "🥗", label: "Sports dietitians & nutritionists" },
  { emoji: "💪", label: "Strength coaches" },
  { emoji: "🎓", label: "Schools & universities" },
  { emoji: "🏆", label: "Local races & fitness events" },
  { emoji: "🎙️", label: "Creators who educate athletes" },
];

const TYPES = [
  "Performance Education",
  "Community Events",
  "Athlete Workshops",
  "Hydration Stations",
  "Product Testing",
  "Content Collaborations",
  "Performance Challenges",
  "Research Partnerships",
];

function PartnershipsPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden border-b border-black/5">
        <div className="absolute inset-0 grid-noise" aria-hidden />
        <div className="relative mx-auto w-full max-w-4xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
          <p className="text-xs uppercase tracking-eyebrow text-electric-dark">Partnerships</p>
          <h1 className="mt-4 text-balance text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
            Let's build better athletes together.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            ClutchFuel believes the future of performance is collaborative. We're looking to partner with organizations that share our mission of helping everyday athletes thrive.
          </p>
        </div>
      </section>

      <section className="border-b border-black/5 bg-muted">
        <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <p className="text-xs uppercase tracking-eyebrow text-electric-dark">Who we love working with</p>
          <h2 className="mt-4 max-w-3xl text-balance text-4xl font-bold leading-tight sm:text-5xl">
            The people building better athletes every day.
          </h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AUDIENCES.map((a, i) => (
              <Reveal key={a.label} delay={i * 0.03}>
                <div className="card-elevated flex items-center gap-4 p-5">
                  <span className="text-2xl" aria-hidden>{a.emoji}</span>
                  <span className="text-base font-semibold text-foreground">{a.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/5">
        <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <p className="text-xs uppercase tracking-eyebrow text-electric-dark">Partnership types</p>
          <h2 className="mt-4 max-w-3xl text-balance text-4xl font-bold leading-tight sm:text-5xl">
            Ways we collaborate.
          </h2>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TYPES.map((t) => (
              <div
                key={t}
                className="rounded-2xl border border-black/10 bg-background px-5 py-6 text-center text-base font-semibold text-foreground"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-4xl px-5 py-24 text-center sm:px-8 sm:py-32">
          <h2 className="text-balance text-4xl font-bold leading-tight sm:text-5xl">
            Become a ClutchFuel partner.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Tell us about your community and how we can build together.
          </p>
          <a
            href="mailto:partners@clutchfuel.com?subject=ClutchFuel%20Partnership"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-electric px-8 py-4 text-base font-semibold text-white transition hover:bg-electric-dark"
          >
            Become a ClutchFuel Partner <ArrowRight className="h-4 w-4" />
          </a>
          <div className="mt-6">
            <Link to="/mission" className="text-sm font-semibold text-electric-dark hover:underline">
              Read our mission →
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
