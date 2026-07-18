import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, ListChecks, Target } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/Reveal";
import { SegmentedClutchRing } from "@/components/clutch-score/ScoreRing";
import { canonical, makeMeta } from "@/lib/seo";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: makeMeta({
      title: "How It Works: ClutchFuel",
      description:
        "How the 60-second Clutch Score assessment shows how your current behaviors align with the performance goal you're trying to achieve.",
      path: "/how-it-works",
    }),
    links: canonical("/how-it-works"),
  }),
  component: HowItWorksPage,
});

const STEPS = [
  {
    n: "01",
    icon: Clock,
    title: "Get Your Clutch Score™",
    copy: "Tell us your goal, then answer five quick questions about how you train, recover, and fuel. Sixty seconds, no wearables required.",
  },
  {
    n: "02",
    icon: ListChecks,
    title: "See how your behaviors align",
    copy: "Your score shows how well your current habits support the goal you selected, with a clear view of what's limiting progress most.",
  },
  {
    n: "03",
    icon: Target,
    title: "Take one Clutch Move",
    copy: "One concrete step to try before your next workout — no overwhelm, no complicated protocols, just what actually moves the needle.",
  },
];

const FAQ = [
  {
    q: "Does it actually take 60 seconds?",
    a: "Yes. A quick goal plus five multiple-choice questions. Most people finish in under a minute.",
  },
  {
    q: "Do I need a wearable or lab data?",
    a: "No. Clutch Score works from your lived experience, how you feel during and after training. No devices, no calculations.",
  },
  {
    q: "Is the Clutch Score a health or readiness score?",
    a: "No. It is not a measure of how healthy or recovered you are. It measures how well your current behaviors align with the performance goal you selected.",
  },
  {
    q: "Is this a supplement funnel?",
    a: "No. We don't sell a product today. Clutch Score exists to help you understand yourself better.",
  },
  {
    q: "What do I get at the end?",
    a: "Your Clutch Score for the goal you chose, the behavior most likely holding you back, how your score was built across five behaviors, and one personalized Clutch Move to try before your next workout.",
  },
];

/** Sample result: Recovery intentionally weakest so the ring matches the story. */
const SAMPLE_SEGMENTS = [
  { id: "Hydration", color: "#c1ff00", fill: 0.75 },
  { id: "Recovery", color: "#f5c542", fill: 0.28 },
  { id: "Training", color: "#4da3ff", fill: 0.8 },
  { id: "Nutrition", color: "#a78bfa", fill: 0.68 },
  { id: "Consistency", color: "#d4d4d4", fill: 0.62 },
];

function HowItWorksPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden border-b border-black/5">
        <div className="absolute inset-0 grid-noise" aria-hidden />
        <div className="relative mx-auto w-full max-w-4xl px-5 pb-20 pt-16 text-center sm:px-8 sm:pb-28 sm:pt-24">
          <p className="text-xs uppercase tracking-eyebrow text-electric-dark">How it works</p>
          <h1 className="mt-4 text-balance text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
            Sixty seconds to see how your habits support your goal.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Clutch Score shows how well your current behaviors align with the performance goal you're
            trying to achieve, then gives you one clear next move.
          </p>
        </div>
      </section>

      <section className="border-b border-black/5">
        <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="card-elevated h-full p-8">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-electric text-black">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <p className="mt-6 text-sm font-semibold text-foreground">{s.n}</p>
                  <h2 className="mt-2 text-2xl font-bold">{s.title}</h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">{s.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/5 bg-muted">
        <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="text-xs uppercase tracking-eyebrow text-electric-dark">Sample result</p>
            <h2 className="mt-4 text-balance text-4xl font-bold leading-tight sm:text-5xl">
              What you'll actually see.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              A goal-aligned Clutch Score, the behavior holding you back most, and one Clutch Move to
              try before your next workout.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-3xl border border-black/10 bg-[#070707] p-8 text-center sm:p-10">
              <SegmentedClutchRing
                score={68}
                segments={SAMPLE_SEGMENTS}
                size={200}
                stroke={14}
              />
              <p className="mt-8 text-sm font-semibold uppercase tracking-eyebrow text-[#c1ff00]">
                Building Momentum
              </p>
              <p className="mt-2 text-xs text-white/40">Goal · Faster Recovery</p>
              <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.22em] text-white/35">
                Biggest Opportunity
              </p>
              <p className="mt-2 text-xl font-bold leading-snug text-white">Recovery</p>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                Based on your responses, improving your recovery habits will have the greatest impact
                on your performance.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/45">
                First Clutch Move: Rehydrate with sodium within 60 minutes after training, even if you
                don't feel thirsty yet.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-black/5">
        <div className="mx-auto w-full max-w-4xl px-5 py-24 sm:px-8 sm:py-32">
          <p className="text-xs uppercase tracking-eyebrow text-electric-dark">FAQ</p>
          <h2 className="mt-4 text-balance text-4xl font-bold leading-tight sm:text-5xl">
            Common questions.
          </h2>
          <div className="mt-10 divide-y divide-black/10 border-y border-black/10">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-lg font-semibold">
                  {f.q}
                  <span className="mt-1 text-black transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-4xl px-5 py-24 text-center sm:px-8 sm:py-32">
          <h2 className="text-balance text-4xl font-bold leading-tight sm:text-5xl">
            Ready to see yours?
          </h2>
          <Link
            to="/clutch-score"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-electric px-8 py-4 text-base font-semibold text-black transition hover:bg-electric-dark"
          >
            Get Your Clutch Score <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
