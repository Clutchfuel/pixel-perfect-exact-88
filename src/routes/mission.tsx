import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, GraduationCap, Activity, Users, HeartHandshake } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/mission")({
  head: () => ({
    meta: [
      { title: "Mission, ClutchFuel" },
      {
        name: "description",
        content:
          "Performance creates opportunity. ClutchFuel exists to help everyday athletes become better teammates, coaches, parents, and leaders.",
      },
      { property: "og:title", content: "Our Mission: ClutchFuel" },
      {
        property: "og:description",
        content: "More than performance. We're building a company that strengthens athletes and communities.",
      },
    ],
  }),
  component: MissionPage,
});

const PILLARS = [
  { icon: Compass, title: "Discover", copy: "Understand your body through the Clutch Score." },
  { icon: GraduationCap, title: "Learn", copy: "Science-backed education that removes guesswork." },
  { icon: Activity, title: "Perform", copy: "Build habits that improve performance." },
  { icon: Users, title: "Belong", copy: "Join a community of everyday athletes." },
  { icon: HeartHandshake, title: "Give Back", copy: "As we grow, invest in making sports more accessible." },
];

const VISION = [
  "Every athlete has access to trusted performance education.",
  "Every community has opportunities to move together.",
  "Every coach has better tools.",
  "Every parent understands how to fuel young athletes.",
  "Every athlete feels confident walking into their clutch moment.",
];

function MissionPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden border-b border-black/5">
        <div className="absolute inset-0 grid-noise" aria-hidden />
        <div className="relative mx-auto w-full max-w-4xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
          <p className="text-xs uppercase tracking-eyebrow text-electric-dark">Our Mission</p>
          <h1 className="mt-4 text-balance text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
            We believe performance creates opportunity.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Performance isn't just about becoming a better athlete. It's about becoming a better teammate, a better coach, a better parent, a better leader.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            When people become healthier, stronger, and more confident, they make their communities stronger too. That's the kind of impact we're building toward.
          </p>
        </div>
      </section>

      <section className="border-b border-black/5 bg-muted">
        <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <p className="text-xs uppercase tracking-eyebrow text-electric-dark">Brand philosophy</p>
          <h2 className="mt-4 max-w-3xl text-balance text-4xl font-bold leading-tight sm:text-5xl">
            Five pillars we build everything on.
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <div className="card-elevated h-full p-6">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-electric text-black">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/5">
        <div className="mx-auto w-full max-w-4xl px-5 py-24 sm:px-8 sm:py-32">
          <p className="text-xs uppercase tracking-eyebrow text-electric-dark">The future we're building</p>
          <h2 className="mt-4 text-balance text-4xl font-bold leading-tight sm:text-5xl">
            We imagine a world where…
          </h2>
          <ul className="mt-10 space-y-4">
            {VISION.map((line) => (
              <li key={line} className="flex gap-4 text-lg leading-relaxed text-foreground">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-electric" aria-hidden />
                {line}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-lg font-semibold text-foreground">That's the future we're building.</p>
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
