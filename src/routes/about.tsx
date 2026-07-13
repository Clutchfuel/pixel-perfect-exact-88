import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/Reveal";
import trainingImage from "@/assets/articles/recovery.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "It Started With One Question | ClutchFuel" },
      {
        name: "description",
        content:
          "What's holding me back from performing at my best? That question led to ClutchFuel, a place where everyday athletes can understand themselves and make smarter performance decisions.",
      },
      { property: "og:title", content: "It Started With One Question | ClutchFuel" },
      {
        property: "og:description",
        content: "The story behind ClutchFuel, built for everyday athletes still asking better questions.",
      },
    ],
  }),
  component: AboutPage,
});

const LEARNING = [
  "Nutrition",
  "Recovery",
  "Hydration",
  "Sleep",
  "Stress",
  "Performance science",
  "Behavior",
  "Small habits",
] as const;

const BUILDING = [
  {
    title: "Better Awareness",
    copy: "Most athletes don't know what's actually limiting them.",
  },
  {
    title: "Better Decisions",
    copy: "Performance improves when decisions become intentional.",
  },
  {
    title: "Better Community",
    copy: "Learning alongside other everyday athletes makes improvement sustainable.",
  },
] as const;

const TIMELINE = [
  { label: "Question", copy: "One honest question about what was holding performance back." },
  { label: "Research", copy: "Reading everything I could find about how the body actually works." },
  { label: "Learning", copy: "Testing ideas in real training, not just theory." },
  { label: "Clutch Score", copy: "A simple way to turn habits into one clear next step." },
  { label: "Community", copy: "Everyday athletes learning and improving together." },
  { label: "The Future", copy: "Better tools, better habits, more people ready for their clutch moment." },
] as const;

function AboutPage() {
  return (
    <PageShell showStickyCta={false}>
      {/* 1. Full-screen question */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#070707] text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(193,255,0,0.08), transparent), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.04), transparent)",
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 grid-noise opacity-40" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
          <Reveal y={16}>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/40">
              It Started With One Question.
            </p>
            <h1 className="mt-10 text-balance text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl md:text-6xl">
              <span className="text-white/90">"</span>
              What's holding me back from performing at my{" "}
              <span className="text-[#c1ff00]">best</span>?
              <span className="text-white/90">"</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* 2. Effort story + photo */}
      <section className="bg-[#070707] text-white">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <div className="overflow-hidden">
              <img
                src={trainingImage}
                alt="An athlete in the quiet moments after training"
                className="aspect-[4/5] w-full object-cover grayscale"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Because I Didn't Think I Was Working Hard Enough.
            </h2>
            <div className="mt-10 space-y-6 text-lg leading-relaxed text-white/60">
              <p>I wasn't a professional athlete.</p>
              <p>I wasn't trying to win Olympic medals.</p>
              <p>I was simply someone who wanted to become the best version of myself.</p>
              <p>Like a lot of people, I believed the answer was simple.</p>
              <p className="text-white">
                Train harder.
                <br />
                Push longer.
                <br />
                Want it more.
              </p>
              <p>But despite the effort...</p>
              <p>Some days I felt sluggish.</p>
              <p>Some workouts felt impossible.</p>
              <p>Recovery was inconsistent.</p>
              <p>Energy came and went.</p>
              <p>I kept asking myself...</p>
              <p className="text-3xl font-extrabold tracking-tight text-[#c1ff00] sm:text-4xl">Why?</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Notebook / learning */}
      <section className="border-t border-black/5 bg-[#f7f4ee]">
        <div className="mx-auto w-full max-w-3xl px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <p className="font-serif text-2xl italic leading-snug text-foreground/80 sm:text-3xl">
              I became obsessed with learning.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <ul className="mt-12 flex flex-wrap gap-3">
              {LEARNING.map((item, i) => (
                <li
                  key={item}
                  className={`rounded-sm border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium tracking-wide ${
                    i % 3 === 1 ? "rotate-[-1.5deg] text-[#8ebc00]" : i % 3 === 2 ? "rotate-[1deg]" : "rotate-[-0.5deg]"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-14 space-y-6 border-l-2 border-[#c1ff00] pl-6 text-lg leading-relaxed text-foreground/70">
              <p>The more I learned...</p>
              <p>The more I realized something surprising.</p>
              <p className="text-2xl font-extrabold leading-snug text-foreground sm:text-3xl">
                Most athletes don't have a{" "}
                <span className="bg-[#c1ff00]/40 px-1">motivation</span> problem.
              </p>
              <p className="text-2xl font-extrabold leading-snug text-foreground sm:text-3xl">
                They have an <span className="bg-[#c1ff00]/40 px-1">information</span> problem.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. Large statement */}
      <section className="bg-[#070707] text-white">
        <div className="mx-auto flex min-h-[70svh] max-w-4xl flex-col items-center justify-center px-5 py-28 text-center sm:px-8 sm:py-36">
          <Reveal>
            <h2 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
              Performance shouldn't be reserved for{" "}
              <span className="text-[#c1ff00]">professionals</span>.
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/55 sm:text-xl">
              Everyday athletes deserve better information too.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 5. Why ClutchFuel */}
      <section className="border-t border-black/5 bg-white">
        <div className="mx-auto w-full max-w-3xl px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <h2 className="text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              That's why I started ClutchFuel.
            </h2>
            <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>Not to sell supplements.</p>
              <p>Not to promise shortcuts.</p>
              <p>But to build something I wish existed years ago.</p>
              <p>
                A place where everyday athletes could better understand themselves...
                <br />
                and make smarter performance decisions.
              </p>
              <p className="text-foreground">
                One habit.
                <br />
                One insight.
                <br />
                One workout at a time.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6. What We're Building */}
      <section className="border-t border-black/5 bg-muted">
        <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <h2 className="max-w-2xl text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              What We're Building
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {BUILDING.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="h-full border border-black/10 bg-white p-8">
                  <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">{item.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Timeline */}
      <section className="border-t border-black/5 bg-white">
        <div className="mx-auto w-full max-w-2xl px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">The path so far</h2>
          </Reveal>
          <ol className="mt-16">
            {TIMELINE.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.04}>
                <li className="relative flex gap-6 pb-12 last:pb-0">
                  {i < TIMELINE.length - 1 && (
                    <span
                      className="absolute left-[0.4rem] top-7 h-[calc(100%-1.25rem)] w-px bg-black/15"
                      aria-hidden
                    />
                  )}
                  <span className="relative mt-2 h-3.5 w-3.5 shrink-0 rounded-full bg-[#c1ff00]" aria-hidden />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#8ebc00]">
                      {item.label}
                    </p>
                    <p className="mt-2 text-lg leading-relaxed text-muted-foreground">{item.copy}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Final statement + CTA */}
      <section className="bg-[#070707] text-white">
        <div className="mx-auto max-w-3xl px-5 py-28 text-center sm:px-8 sm:py-36">
          <Reveal>
            <h2 className="text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Everyone has a <span className="text-[#c1ff00]">clutch</span> moment.
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/55">
              The moment where preparation meets opportunity.
            </p>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/55">
              We're building ClutchFuel to help more people be ready when theirs arrives.
            </p>
            <Link
              to="/clutch-score"
              className="mt-12 inline-flex items-center gap-2 rounded-full bg-[#c1ff00] px-8 py-4 text-base font-semibold text-black transition hover:bg-[#d6ff4d]"
            >
              Take Your Clutch Score <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Closing signature */}
      <section className="border-t border-black/5 bg-white">
        <div className="mx-auto max-w-2xl px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              I'm Still On The Journey.
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>I'm not claiming to have all the answers.</p>
              <p>I'm still learning.</p>
              <p>Still improving.</p>
              <p>Still asking questions.</p>
              <p>
                ClutchFuel exists because I believe millions of everyday athletes are on that same
                journey, and we can get better together.
              </p>
            </div>
            <p className="mt-10 text-lg font-medium text-foreground">— Jamar</p>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
