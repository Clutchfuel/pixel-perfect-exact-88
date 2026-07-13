import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Zap, HeartPulse, Utensils, Repeat, Timer, Brain, Sparkles } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/Reveal";
import { CommunityAthletes } from "@/components/CommunityAthletes";
import { SegmentedClutchRing } from "@/components/clutch-score/ScoreRing";
import { ArticleCover } from "@/components/ArticleCover";
import { ARTICLES } from "@/content/articles";
import heroImage from "@/assets/home-hero-cinematic.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ClutchFuel: Helping Everyday Athletes Perform Better" },
      {
        name: "description",
        content:
          "Personalized insights and better habits, starting with your Clutch Score. Tell us your goal and get one clear next step before your next workout.",
      },
      { property: "og:title", content: "ClutchFuel: Helping Everyday Athletes Perform Better" },
      {
        property: "og:description",
        content:
          "Every goal starts with better performance. Get your Clutch Score in 60 seconds and find what's holding you back.",
      },
      { property: "og:type", content: "website" },

    ],
  }),
  component: HomePage,
});

const PROBLEMS = [
  { icon: Zap, title: "Hydration", copy: "The overlooked lever most athletes never fully use." },
  { icon: HeartPulse, title: "Recovery", copy: "The window that decides how the next session feels." },
  { icon: Utensils, title: "Fueling", copy: "What you eat around training beats what you eat all day." },
  { icon: Repeat, title: "Consistency", copy: "The unglamorous habit that quietly compounds results." },
  { icon: Timer, title: "Timing", copy: "When you fuel matters as much as what you fuel with." },
  { icon: Brain, title: "Body awareness", copy: "The signals you're ignoring are already telling you what to fix." },
];

/** Homepage sample — Recovery intentionally weakest so the ring tells the story. */
const SAMPLE_SEGMENTS = [
  { id: "Hydration", color: "#c1ff00", fill: 0.78 },
  { id: "Recovery", color: "#f5c542", fill: 0.32 },
  { id: "Training", color: "#4da3ff", fill: 0.82 },
  { id: "Nutrition", color: "#a78bfa", fill: 0.7 },
  { id: "Consistency", color: "#d4d4d4", fill: 0.64 },
];

const PILLARS = [
  { icon: Zap, title: "Hydration", copy: "Understand your fluid and sodium strategy end to end." },
  { icon: HeartPulse, title: "Recovery", copy: "Use the first hour after training deliberately." },
  { icon: Utensils, title: "Fueling", copy: "Match intake to demand, not to habit." },
  { icon: Repeat, title: "Training Habits", copy: "The small rituals that compound over months." },
  { icon: Timer, title: "Consistency", copy: "Show up in the details, not just the big sessions." },
  { icon: Brain, title: "Self Awareness", copy: "Learn to read your own performance signals." },
];

const QUOTES = [
  { text: "That described me perfectly.", author: "Runner, 34" },
  { text: "I never realized hydration was affecting me.", author: "HYROX athlete, 29" },
  { text: "I've never seen anything like this.", author: "Hooper, 41" },
  { text: "My score actually made sense.", author: "Weekend warrior, 36" },
];

function HomePage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground text-background">
        <img
          src={heroImage}
          alt=""
          aria-hidden
          width={1600}
          height={1104}
          className="no-bw absolute inset-0 h-full w-full object-cover object-center opacity-70"
        />

        <div
          className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20"
          aria-hidden
        />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start px-5 pb-28 pt-20 sm:px-8 sm:pb-32 sm:pt-28 lg:pt-36">
          <h1 className="mt-6 max-w-4xl text-balance text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Helping Everyday Athletes Perform Better.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-background/80 sm:text-xl">
            Personalized insights and better habits, starting with your Clutch Score™. Tell us your goal. We'll show you the one thing most likely holding you back.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              to="/clutch-score"
              className="inline-flex items-center gap-2 rounded-full bg-electric px-7 py-4 text-base font-semibold text-black transition hover:bg-electric-dark"
            >
              Get Your Clutch Score <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-4 text-base font-semibold text-background transition hover:border-white/60 hover:bg-white/10"
            >
              See how it works
            </Link>
          </div>
          <div className="mt-16 flex items-center gap-3 text-xs uppercase tracking-eyebrow text-background/60">
            <span className="h-px w-8 bg-white/40" /> A conversation, not a questionnaire
          </div>
        </div>
      </section>


      {/* Problem */}
      <section className="border-t border-black/5 bg-muted">
        <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <p className="text-xs uppercase tracking-eyebrow text-electric-dark">What matters to you</p>
            <h2 className="mt-4 max-w-3xl text-balance text-4xl font-bold leading-tight sm:text-5xl">
              Goals drive behavior. Behavior drives performance.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              You don't wake up wanting a hydration score. You wake up wanting to run faster, recover better, stop cramping, or just feel good after a workout. Clutch Score starts there, with your goal, and works backwards to the habits most likely holding it back.
            </p>
          </Reveal>




          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROBLEMS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.04}>
                <div className="card-elevated group h-full p-6 transition hover:border-black/25">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-electric text-black transition group-hover:bg-electric/25">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-black/5">
        <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <p className="text-xs uppercase tracking-eyebrow text-electric-dark">How it works</p>
            <h2 className="mt-4 max-w-3xl text-balance text-4xl font-bold leading-tight sm:text-5xl">
              Three steps. Sixty seconds. One clear next move.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "Get Your Clutch Score™",
                c: "Share your goal and answer five quick questions. No wearables, no calculations, no equipment.",
              },
              {
                n: "02",
                t: "See how your behaviors align",
                c: "Learn how well your current habits support the goal you selected, and what's limiting progress most.",
              },
              {
                n: "03",
                t: "Take one Clutch Move",
                c: "A single, concrete step to try before your next workout.",
              },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="card-elevated relative h-full overflow-hidden p-8">
                  <span className="text-sm font-semibold text-foreground">{s.n}</span>
                  <h3 className="mt-4 text-2xl font-bold">{s.t}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{s.c}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Clutch Score */}
      <section className="border-t border-black/5 bg-muted">
        <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="text-xs uppercase tracking-eyebrow text-electric-dark">Why Clutch Score exists</p>
            <h2 className="mt-4 text-balance text-4xl font-bold leading-tight sm:text-5xl">
              Stop guessing. Start understanding.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Most athletes don't need more motivation. They need more clarity. Clutch Score helps identify the habits that may be limiting your performance and gives you one personalized next step.
            </p>
            <Link
              to="/clutch-score"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-electric px-6 py-3 text-sm font-semibold text-black transition hover:bg-electric-dark"
            >
              Get Your Clutch Score <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-3xl border border-black/10 bg-[#070707] p-8 text-center sm:p-10">
              <p className="text-xs uppercase tracking-eyebrow text-white/40">Sample insight</p>
              <div className="mt-8">
                <SegmentedClutchRing
                  score={72}
                  segments={SAMPLE_SEGMENTS}
                  size={200}
                  stroke={14}
                />
              </div>
              <p className="mt-8 text-sm font-semibold uppercase tracking-eyebrow text-[#c1ff00]">
                Strong Alignment
              </p>
              <p className="mt-2 text-xs text-white/40">Goal · Faster Recovery</p>
              <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.22em] text-white/35">
                Biggest Opportunity
              </p>
              <p className="mt-2 text-xl font-bold leading-snug text-white">
                Recovery
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                Based on your responses, improving your recovery habits will have the greatest impact
                on your performance.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/45">
                First Clutch Move: Rehydrate with sodium within 60 minutes after every hard session
                this week, even when you don't feel thirsty.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-t border-black/5">
        <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <p className="text-xs uppercase tracking-eyebrow text-electric-dark">Performance pillars</p>
            <h2 className="mt-4 max-w-3xl text-balance text-4xl font-bold leading-tight sm:text-5xl">
              Six levers most athletes overlook.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.04}>
                <div className="card-elevated group h-full p-6 transition hover:-translate-y-1 hover:border-black/25">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-electric text-black">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CommunityAthletes />

      {/* Performance Hub preview */}
      <section className="border-t border-black/5">
        <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-eyebrow text-electric-dark">Performance Hub</p>
                <h2 className="mt-4 max-w-2xl text-balance text-4xl font-bold leading-tight sm:text-5xl">
                  Learn what your body is trying to tell you.
                </h2>
              </div>
              <Link to="/performance-hub" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:underline">
                Browse all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {ARTICLES.slice(0, 3).map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.05}>
                <Link
                  to="/performance-hub/$slug"
                  params={{ slug: a.slug }}
                  className="group block overflow-hidden rounded-2xl border border-black/10 bg-background transition hover:border-black/25"
                >
                  <ArticleCover category={a.category} title={a.title} className="aspect-[16/10] w-full" />
                  <div className="p-6">
                    <p className="text-xs uppercase tracking-eyebrow text-electric-dark">{a.category}</p>
                    <h3 className="mt-3 text-lg font-semibold leading-snug transition group-hover:text-foreground">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{a.readingTime}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* Final CTA */}
      <section className="border-t border-black/5">
        <div className="mx-auto w-full max-w-4xl px-5 py-28 text-center sm:px-8 sm:py-36">
          <Reveal>
            <p className="text-xs uppercase tracking-eyebrow text-electric-dark">Ready?</p>
            <h2 className="mt-4 text-balance text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
              Ready to understand your performance?
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Sixty seconds. One personalized insight. One action to try this week.
            </p>
            <Link
              to="/clutch-score"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-electric px-8 py-4 text-base font-semibold text-black transition hover:bg-electric-dark"
            >
              Get Your Clutch Score <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
