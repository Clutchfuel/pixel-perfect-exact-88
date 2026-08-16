import { ArrowRight, ClipboardList, Droplets, Moon, RotateCcw, Utensils } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

const PILLARS = [
  { icon: Utensils, title: "Fuel", copy: "Eat for the demands of your game." },
  { icon: Droplets, title: "Hydrate", copy: "Start ready. Stay ready." },
  { icon: RotateCcw, title: "Recover", copy: "Your next performance starts after this one." },
  { icon: Moon, title: "Sleep", copy: "Where adaptation actually happens." },
  {
    icon: ClipboardList,
    title: "Prepare",
    copy: "Build routines that travel from practice to game day.",
  },
] as const;

const LEARN_ARTICLES = [
  "What should a basketball player eat before a game?",
  "What should you eat between AAU games?",
  "Why do I cramp in the fourth quarter?",
  "How much water should basketball players drink?",
  "What should I eat after practice?",
  "Should high-school athletes take creatine?",
] as const;

const SCORECARD = [
  { area: "Hydration", score: 82 },
  { area: "Fueling", score: 61 },
  { area: "Recovery", score: 73 },
  { area: "Sleep", score: 78 },
  { area: "Preparation", score: 85 },
] as const;

type HomepageMarketingProps = {
  onGetScore: () => void;
};

/** Basketball-beachhead marketing homepage — scroll page before assessment begins. */
export function HomepageMarketing({ onGetScore }: HomepageMarketingProps) {
  return (
    <div className="bg-background text-foreground">
      <SiteHeader onGetScore={onGetScore} />

      {/* 1. Hero — [IMAGE: basketball gym placeholder gradient] */}
      <section id="athletes" className="relative min-h-[90vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-[#0a0a0a]"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(198,255,77,0.12), transparent 55%), linear-gradient(160deg, #0a0a0a 0%, #141414 45%, #050505 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          aria-hidden
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 80px)",
          }}
        />
        <div className="relative mx-auto flex min-h-[90vh] w-full max-w-6xl flex-col justify-end px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-36">
          <Reveal>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-lime/80">
              [IMAGE: Basketball gym · locker room · practice]
            </p>
            <h1 className="mt-6 max-w-4xl text-balance text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              BUILD BETTER ATHLETES.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
              Training is only part of performance. ClutchFuel helps athletes improve the habits
              around training — hydration, fueling, recovery, sleep and preparation.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onGetScore}
                className="inline-flex items-center gap-2 rounded-full bg-lime px-8 py-4 text-base font-semibold text-background transition hover:bg-lime-dark"
              >
                Get Your Clutch Score <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-sm text-white/45">60 seconds. One score. One place to start.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. The Problem */}
      <section className="border-t border-white/10 bg-[#0a0a0a]">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div
              className="aspect-[4/3] overflow-hidden rounded-2xl border border-white/10"
              style={{
                background:
                  "linear-gradient(145deg, #171717 0%, #0f0f0f 50%, rgba(198,255,77,0.08) 100%)",
              }}
            >
              <div className="flex h-full flex-col justify-end p-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/35">
                  [IMAGE: Tape · water bottle · gym bag]
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="max-w-xl text-balance text-4xl font-bold leading-tight sm:text-5xl">
              You train your game. But who&apos;s teaching you everything around it?
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-white/60">
              <p>Athletes spend thousands of hours working on shooting. Strength. Speed. Skill.</p>
              <p>
                But performance also happens{" "}
                <strong className="font-semibold text-white">between</strong> practices and games.
              </p>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-lime/90">
                Hydration · Fueling · Recovery · Sleep · Preparation
              </p>
              <p>That&apos;s ClutchFuel&apos;s territory.</p>
              <p className="text-white/80">
                We&apos;re not another basketball training company. We&apos;re building the system
                around training.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Clutch Score teaser */}
      <section id="clutch-score" className="border-t border-white/10">
        <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime/80">
              Five questions. One score. One place to start.
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/60">
              Take the Clutch Score to find the one thing most likely holding your performance back
              — and the one move that fixes it first.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-[#0f0f0f] p-6 sm:p-10">
              <div className="flex flex-wrap items-start justify-between gap-6 border-b border-white/10 pb-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
                    Your Clutch Score™
                  </p>
                  <p className="mt-2 text-6xl font-extrabold tracking-tight text-lime sm:text-7xl">
                    76
                  </p>
                </div>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-white/40">Game:</span>{" "}
                    <span className="font-semibold text-white">Basketball</span>
                  </p>
                  <p>
                    <span className="text-white/40">Goal:</span>{" "}
                    <span className="font-semibold text-white">More Energy Late in Games</span>
                  </p>
                </div>
              </div>

              <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[280px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-xs uppercase tracking-[0.14em] text-white/40">
                      <th className="pb-3 font-semibold">Performance Area</th>
                      <th className="pb-3 text-right font-semibold">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SCORECARD.map((row) => (
                      <tr key={row.area} className="border-b border-white/5">
                        <td className="py-3 text-white/80">{row.area}</td>
                        <td className="py-3 text-right font-semibold tabular-nums text-white">
                          {row.score}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-lime/80">
                    Biggest Opportunity
                  </p>
                  <p className="mt-2 text-2xl font-bold text-white">Fueling</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                    Your Clutch Move
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-white/75">
                    Eat a carbohydrate-rich meal 2–3 hours before your next game.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onGetScore}
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-lime px-7 py-3.5 text-sm font-semibold text-background transition hover:bg-lime-dark"
              >
                See My Performance Plan <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. Five Pillars */}
      <section className="border-t border-white/10 bg-[#0a0a0a]">
        <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime/80">The 5</p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {PILLARS.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.04}>
                <div className="performance-card h-full p-6 transition hover:border-lime/30">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-lime/15 text-lime">
                    <pillar.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold uppercase tracking-wide">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{pillar.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. For Parents */}
      <section id="parents" className="border-t border-white/10">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="max-w-xl text-balance text-4xl font-bold leading-tight sm:text-5xl">
              Raising an athlete isn&apos;t simple.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/60">
              What should they eat before games? Are sports drinks necessary? Do they need protein?
              What supplements are actually appropriate? How much sleep should they get? What should
              recovery look like during tournament weekends?
            </p>
            <p className="mt-6 text-lg font-semibold leading-relaxed text-white">
              ClutchFuel helps parents understand the performance habits that support their athlete.
            </p>
            <button
              type="button"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-lime hover:text-lime"
            >
              ClutchFuel for Parents <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-3 text-xs text-white/35">Parent pathway — coming soon</p>
          </Reveal>
          <Reveal delay={0.06}>
            <div
              className="aspect-[4/3] overflow-hidden rounded-2xl border border-white/10"
              style={{
                background:
                  "linear-gradient(135deg, #141414 0%, #0a0a0a 60%, rgba(198,255,77,0.06) 100%)",
              }}
            >
              <div className="flex h-full flex-col justify-end p-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/35">
                  [IMAGE: Parent & athlete · tournament travel · sideline]
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6. Learn teaser */}
      <section id="learn" className="border-t border-white/10 bg-[#0a0a0a]">
        <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime/80">Learn</p>
            <h2 className="mt-4 max-w-2xl text-balance text-4xl font-bold leading-tight sm:text-5xl">
              Answers for basketball families, not generic sports science.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LEARN_ARTICLES.map((title, i) => (
              <Reveal key={title} delay={i * 0.03}>
                <div className="performance-card group h-full p-6 transition hover:border-white/20">
                  <div
                    className="mb-4 aspect-[16/10] rounded-lg border border-white/5"
                    style={{
                      background: "linear-gradient(145deg, #1a1a1a 0%, #101010 100%)",
                    }}
                  />
                  <h3 className="text-base font-semibold leading-snug text-white/90">{title}</h3>
                  <p className="mt-2 text-xs text-white/35">Article — coming soon</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <button
              type="button"
              className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-lime transition hover:text-lime-dark"
            >
              Browse All Articles <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-2 text-xs text-white/35">Performance Hub — coming soon</p>
          </Reveal>
        </div>
      </section>

      {/* 7. Expansion door */}
      <section id="about" className="border-t border-white/10">
        <div className="mx-auto w-full max-w-3xl px-5 py-24 text-center sm:px-8 sm:py-32">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Built in basketball. Built for athletes.
            </h2>
            <p className="mt-6 text-lg font-semibold text-white/90">
              We&apos;re starting where we know the game best.
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/55">
              Basketball is the first community we&apos;re building ClutchFuel alongside. Our
              mission is bigger: help the next generation of athletes understand the habits behind
              performance.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 8. Teams */}
      <section id="teams" className="border-t border-white/10 bg-[#0a0a0a]">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div
              className="aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 lg:order-2"
              style={{
                background:
                  "linear-gradient(160deg, #121212 0%, #0a0a0a 50%, rgba(198,255,77,0.1) 100%)",
              }}
            >
              <div className="flex h-full flex-col justify-end p-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/35">
                  [IMAGE: Coach with clipboard · full roster on court]
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.06} className="lg:order-1">
            <h2 className="max-w-xl text-balance text-4xl font-bold leading-tight sm:text-5xl">
              Better habits, across your whole roster.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/60">
              Run the Clutch Score across your program and see where your team is leaving
              performance on the table — before it costs you in the fourth quarter.
            </p>
            <button
              type="button"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-lime hover:text-lime"
            >
              ClutchFuel for Teams <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-3 text-xs text-white/35">Teams dashboard — coming soon</p>
          </Reveal>
        </div>
      </section>

      {/* 9. Closing */}
      <section className="border-t border-white/10 bg-[#050505]">
        <div className="mx-auto w-full max-w-4xl px-5 py-28 text-center sm:px-8 sm:py-36">
          <Reveal>
            <h2 className="text-balance text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Talent gets attention.
              <br />
              Habits build athletes.
            </h2>
            <button
              type="button"
              onClick={onGetScore}
              className="mt-12 inline-flex items-center gap-2 rounded-full bg-lime px-8 py-4 text-base font-semibold text-background transition hover:bg-lime-dark"
            >
              Get Your Clutch Score <ArrowRight className="h-4 w-4" />
            </button>
          </Reveal>
        </div>
      </section>

      <SiteFooter />

      {/* Mobile sticky CTA */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 md:hidden">
        <button
          type="button"
          onClick={onGetScore}
          className="pointer-events-auto w-full max-w-sm rounded-full bg-lime px-6 py-4 text-center text-sm font-semibold text-background shadow-lg lime-glow transition hover:bg-lime-dark"
        >
          Get Your Clutch Score
        </button>
      </div>
    </div>
  );
}
