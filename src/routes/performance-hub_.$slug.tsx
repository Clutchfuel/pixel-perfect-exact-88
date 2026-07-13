import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { getArticle, relatedArticles } from "@/content/articles";
import logoAsset from "@/assets/clutchfuel-logo-white.png.asset.json";
import { ArticleCover } from "@/components/ArticleCover";

export const Route = createFileRoute("/performance-hub_/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article, related: relatedArticles(params.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found: ClutchFuel" }, { name: "robots", content: "noindex" }] };
    }
    const { article } = loaderData;
    return {
      meta: [
        { title: `${article.title}: ClutchFuel` },
        { name: "description", content: article.excerpt },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article, related } = Route.useLoaderData();

  return (
    <PageShell>
      <article>
        <header className="relative overflow-hidden bg-[#0a0a0a] text-white">
          {/* Repeating category name pattern (left half) */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-full sm:w-3/5 overflow-hidden select-none"
            aria-hidden
          >
            <div className="absolute inset-0 flex flex-col justify-center gap-2 -rotate-6 opacity-[0.18] leading-none">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="whitespace-nowrap font-extrabold uppercase tracking-tight text-[14vw] sm:text-[10vw]"
                  style={{
                    WebkitTextStroke: "1px #c1ff00",
                    color: "transparent",
                    transform: `translateX(${(i % 2) * -8}%)`,
                  }}
                >
                  {`${article.category} ${article.category} ${article.category}`}
                </div>
              ))}
            </div>
          </div>

          {/* Big outlined clutchfuel wordmark (right half) */}
          <div
            className="pointer-events-none absolute inset-y-0 right-[-6%] hidden lg:flex w-1/2 items-center overflow-hidden select-none"
            aria-hidden
          >
            <div className="flex flex-col leading-[0.82] font-extrabold lowercase tracking-tighter text-[20vw]"
              style={{ WebkitTextStroke: "1.5px #c1ff00", color: "transparent" }}
            >
              <span>clutch</span>
              <span>fuel</span>
            </div>
          </div>

          {/* Radial glow */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{
              background:
                "radial-gradient(80% 60% at 85% 40%, rgba(255,255,255,0.06), transparent 60%)",
            }}
          />

          <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-14 sm:px-10 sm:pb-24 sm:pt-20">
            <Link
              to="/performance-hub"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-eyebrow text-white/60 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Insights
            </Link>

            <div className="mt-10 max-w-xl">
              <div className="flex items-center gap-3">
                <img src={logoAsset.url} alt="ClutchFuel" className="h-7 w-auto no-bw" />
              </div>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-electric">
                Performance Insights
              </p>

              <div className="mt-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-electric">
                  {article.category}
                </p>
                <div className="mt-2 h-px w-10 bg-electric" />
              </div>

              <h1 className="mt-6 text-balance font-extrabold uppercase leading-[0.92] tracking-tight text-5xl sm:text-6xl lg:text-7xl">
                {article.title}
              </h1>
              <div className="mt-6 h-px w-10 bg-electric" />

              <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70">
                {article.excerpt}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.24em] text-white/70">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-electric">
                  <img src={logoAsset.url} alt="" aria-hidden className="h-4 w-auto no-bw" />
                </span>
                <span>By ClutchFuel Team</span>
                <span aria-hidden className="h-4 w-px bg-white/25" />
                <span className="inline-flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/40">
                    <Clock className="h-3 w-3" />
                  </span>
                  {article.readingTime}
                </span>
              </div>
            </div>
          </div>
        </header>



        <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="prose prose max-w-none space-y-6 text-lg leading-relaxed text-muted-foreground">
            {article.body.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {article.takeaways?.length ? (
            <div className="mt-14 rounded-2xl border-l-4 border-electric bg-muted p-8">
              <p className="text-xs uppercase tracking-eyebrow text-electric-dark">Key takeaways</p>
              <ul className="mt-5 space-y-3">
                {article.takeaways.map((t: string, i: number) => (
                  <li key={i} className="flex gap-3 text-base leading-relaxed text-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric-dark" aria-hidden />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-12 rounded-2xl border border-black/10 bg-black/[0.03] p-8">
            <p className="text-xs uppercase tracking-eyebrow text-electric-dark">Try it yourself</p>
            <h3 className="mt-3 text-2xl font-bold">Get Your Clutch Score</h3>
            <p className="mt-2 text-muted-foreground">Find your biggest performance opportunity in 60 seconds.</p>
            <Link
              to="/clutch-score"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-electric px-6 py-3 text-sm font-semibold text-black transition hover:bg-electric-dark"
            >
              Start assessment <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>

      <section className="border-t border-black/5 bg-muted">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <p className="text-xs uppercase tracking-eyebrow text-electric-dark">Related reads</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Keep exploring.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {related.map((a: typeof related[number]) => (
              <Link
                key={a.slug}
                to="/performance-hub/$slug" params={{ slug: a.slug }}
                className="group block overflow-hidden rounded-2xl border border-black/10 bg-background transition hover:border-black/25"
              >
                <ArticleCover category={a.category} title={a.title} className="aspect-[16/10] w-full" />
                <div className="p-6">
                  <p className="text-xs uppercase tracking-eyebrow text-electric-dark">{a.category}</p>
                  <h3 className="mt-3 text-lg font-semibold leading-snug transition group-hover:text-foreground">{a.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
