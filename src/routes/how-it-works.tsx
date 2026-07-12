import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, ListChecks, Target } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works: ClutchFuel" },
      {
        name: "description",
        content:
          "How the 60-second Clutch Score assessment turns five questions into one clear, personalized action for your next workout.",
      },
      { property: "og:title", content: "How It Works: ClutchFuel" },
      {
        property: "og:description",
        content: "Take a 60-second assessment. Get a personalized performance insight and one action to try this week.",
      },
    ],
  }),
  component: HowItWorksPage,
});

const STEPS = [
  {
    n: "01",
    icon: Clock,
    title: "Take the Clutch Score™",
    copy: "Five quick questions about how you train, recover, and fuel. Sixty seconds, no wearables required.",
  },
  {
    n: "02",
    icon: ListChecks,
    title: "Get your personalized insight",
    copy: "We identify your biggest performance opportunity from four core categories, the lever most likely to hold you back today.",
  },
  {
    n: "03",
    icon: Target,
    title: "Take one action before your next workout",
    copy: "One concrete, science-informed step you can try in your very next session. No overwhelm, no complicated protocols.",
  },
];

const FAQ = [
  {
    q: "Does it actually take 60 seconds?",
    a: "Yes. Five questions with five multiple-choice answers. Most people finish in under a minute.",
  },
  {
    q: "Do I need a wearable or lab data?",
    a: "No. Clutch Score works from your lived experience, how you feel during and after training. No devices, no calculations.",
  },
  {
    q: "Is this a supplement funnel?",
    a: "No. We don't sell a product today. Clutch Score exists to help you understand yourself better.",
  },
  {
    q: "What do I get at the end?",
    a: "Your Clutch Score, your biggest performance opportunity, and one personalized action to try before your next workout.",
  },
];

function HowItWorksPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden border-b border-black/5">
        <div className="absolute inset-0 grid-noise" aria-hidden />
        <div className="relative mx-auto w-full max-w-4xl px-5 pb-20 pt-16 text-center sm:px-8 sm:pb-28 sm:pt-24">
          <p className="text-xs uppercase tracking-eyebrow text-electric-dark">How it works</p>
          <h1 className="mt-4 text-balance text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
            Sixty seconds to your next performance breakthrough.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Clutch Score turns five simple questions into one clear, personalized action. No wearables. No calculations. No overwhelm.
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
              You'll get your Clutch Score, your biggest performance opportunity, and one action to try before your next workout. That's it.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card-elevated p-8">
              <p className="text-xs uppercase tracking-eyebrow text-electric-dark">Your biggest opportunity</p>
              <p className="mt-3 text-3xl font-extrabold leading-tight">Recovery & Cramping</p>
              <p className="mt-6 text-xs uppercase tracking-eyebrow text-muted-foreground/80">What to do next</p>
              <p className="mt-2 text-lg leading-relaxed text-muted-foreground">
                Rehydrate within 60 minutes after training, even if you don't feel thirsty yet.
              </p>
              <div className="mt-6 inline-flex items-baseline gap-3 rounded-2xl border border-black/10 bg-black/[0.03] px-4 py-3">
                <span className="text-xs uppercase tracking-eyebrow text-muted-foreground/80">Clutch Score</span>
                <span className="text-2xl font-bold">68</span>
                <span className="text-sm text-muted-foreground/70">/ 100</span>
              </div>
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
            Take the Clutch Score <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
