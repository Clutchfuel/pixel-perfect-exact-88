import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { ARTICLES, type ArticleCategory } from "@/content/articles";
import { Reveal } from "@/components/Reveal";

const CATEGORIES: ("All" | ArticleCategory)[] = [
  "All", "Hydration", "Recovery", "Fueling", "Performance", "Training", "Mindset",
];

export const Route = createFileRoute("/performance-hub")({
  head: () => ({
    meta: [
      { title: "Performance Hub — ClutchFuel" },
      {
        name: "description",
        content: "Science-backed articles on hydration, recovery, fueling, and the habits that quietly change your training.",
      },
      { property: "og:title", content: "Performance Hub — ClutchFuel" },
      { property: "og:description", content: "Science-backed articles for everyday athletes." },
    ],
  }),
  component: PerformanceHubPage,
});

function PerformanceHubPage() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const filtered = useMemo(
    () => (cat === "All" ? ARTICLES : ARTICLES.filter((a) => a.category === cat)),
    [cat],
  );
  const [featured, ...rest] = filtered;

  return (
    <PageShell>
      <section className="border-b border-white/5">
        <div className="mx-auto w-full max-w-6xl px-5 pb-14 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
          <p className="text-xs uppercase tracking-eyebrow text-electric">Performance Hub</p>
          <h1 className="mt-4 max-w-3xl text-balance text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
            Learn what your body is trying to tell you.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/70">
            Editorial, science-informed guides on hydration, recovery, fueling, training habits, and the small things that quietly change results.
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  cat === c ? "border-electric bg-electric/10 text-electric" : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {featured && (
        <section className="border-b border-white/5 bg-navy-deep">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <Reveal>
              <Link
                to="/performance-hub/$slug" params={{ slug: featured.slug }}
                className="group grid gap-8 overflow-hidden rounded-3xl border border-white/10 bg-navy transition hover:border-white/25 lg:grid-cols-2"
              >
                <div className={`aspect-[16/10] bg-gradient-to-br ${featured.gradient} lg:aspect-auto`} aria-hidden />
                <div className="flex flex-col justify-center p-8 sm:p-10">
                  <p className="text-xs uppercase tracking-eyebrow text-electric">
                    Featured · {featured.category}
                  </p>
                  <h2 className="mt-4 text-balance text-3xl font-bold leading-tight sm:text-4xl transition group-hover:text-electric">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-white/70">{featured.excerpt}</p>
                  <p className="mt-6 text-xs uppercase tracking-eyebrow text-white/50">{featured.readingTime}</p>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      <section>
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.04}>
                <Link
                  to="/performance-hub/$slug" params={{ slug: a.slug }}
                  className="group block overflow-hidden rounded-2xl border border-white/10 bg-navy transition hover:border-white/25"
                >
                  <div className={`aspect-[16/10] bg-gradient-to-br ${a.gradient}`} aria-hidden />
                  <div className="p-6">
                    <p className="text-xs uppercase tracking-eyebrow text-electric">{a.category}</p>
                    <h3 className="mt-3 text-lg font-semibold leading-snug transition group-hover:text-electric">
                      {a.title}
                    </h3>
                    <p className="mt-3 text-sm text-white/60">{a.excerpt}</p>
                    <p className="mt-4 text-xs uppercase tracking-eyebrow text-white/45">{a.readingTime}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          {rest.length === 0 && !featured && (
            <p className="text-center text-white/50">No articles in this category yet.</p>
          )}
        </div>
      </section>
    </PageShell>
  );
}
