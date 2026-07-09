import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Users } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — ClutchFuel" },
      {
        name: "description",
        content: "Everyday athletes chasing better. Runners, HYROX competitors, hoopers, busy parents — real stories from the ClutchFuel community.",
      },
      { property: "og:title", content: "The ClutchFuel Community" },
      { property: "og:description", content: "Real stories from everyday athletes." },
    ],
  }),
  component: CommunityPage,
});

const ATHLETES = [
  { tag: "Runner", name: "Marathon mornings", copy: "Training for her fourth marathon between two kids and a full-time job." },
  { tag: "Basketball", name: "Pickup regular", copy: "Playing three nights a week and finally feeling steady in the fourth quarter." },
  { tag: "Busy parent", name: "Between school runs", copy: "Squeezes in 45 minutes at 5am — and refuses to sacrifice recovery." },
  { tag: "College athlete", name: "Off-season strength", copy: "Building capacity now so the season doesn't build it for him." },
  { tag: "Weekend warrior", name: "Sunday long run", copy: "Not chasing PRs. Chasing enjoying it again." },
  { tag: "CrossFit", name: "Class of 5:30am", copy: "Sharp workouts, sharper recovery — the missing piece for years." },
  { tag: "HYROX", name: "First doubles", copy: "Preparing for his first HYROX Doubles with a partner from his run club." },
];

const HIGHLIGHTS = [
  { icon: Users, title: "Run clubs", copy: "Local crews training smarter together." },
  { icon: Calendar, title: "Events", copy: "Meetups, challenges, and pop-up hydration labs." },
  { icon: Users, title: "Future ambassadors", copy: "Everyday athletes who want to help others perform better." },
];

function CommunityPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden border-b border-black/5">
        <div className="absolute inset-0 grid-noise" aria-hidden />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
          <p className="text-xs uppercase tracking-eyebrow text-electric-dark">Community</p>
          <h1 className="mt-4 max-w-3xl text-balance text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
            Built for everyday athletes.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            No professionals. No influencers. Real people chasing better between school runs, night shifts, and full weekends.
          </p>
        </div>
      </section>

      <section className="border-b border-black/5">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ATHLETES.map((a, i) => (
              <Reveal key={a.name} delay={i * 0.04}>
                <article className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-electric/15 via-background to-muted p-6">
                  <div className="absolute inset-0 opacity-30 mix-blend-overlay grid-noise" aria-hidden />
                  <div className="relative flex h-full flex-col justify-end">
                    <p className="text-xs uppercase tracking-eyebrow text-muted-foreground">{a.tag}</p>
                    <h3 className="mt-1 text-2xl font-bold">{a.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.copy}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/5 bg-muted">
        <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <p className="text-xs uppercase tracking-eyebrow text-electric-dark">What's coming</p>
          <h2 className="mt-4 max-w-3xl text-balance text-4xl font-bold leading-tight sm:text-5xl">
            Something bigger is building.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {HIGHLIGHTS.map((h) => (
              <div key={h.title} className="card-elevated p-8">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-electric/25 text-electric-dark">
                  <h.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{h.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{h.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-4xl px-5 py-24 text-center sm:px-8 sm:py-32">
          <h2 className="text-balance text-4xl font-bold leading-tight sm:text-5xl">
            Start with your own baseline.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">Then bring the crew.</p>
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
