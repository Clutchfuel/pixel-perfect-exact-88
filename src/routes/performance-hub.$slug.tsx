import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { getArticle, relatedArticles } from "@/content/articles";

export const Route = createFileRoute("/performance-hub/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article, related: relatedArticles(params.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found — ClutchFuel" }, { name: "robots", content: "noindex" }] };
    }
    const { article } = loaderData;
    return {
      meta: [
        { title: `${article.title} — ClutchFuel` },
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
        <header className="relative overflow-hidden bg-foreground text-background">
          <img
            src={article.image}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/85" aria-hidden />
          <div className="relative mx-auto w-full max-w-3xl px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-24">
            <Link to="/performance-hub" className="inline-flex items-center gap-2 text-xs uppercase tracking-eyebrow text-background/70 hover:text-background">
              <ArrowLeft className="h-3.5 w-3.5" /> Insights
            </Link>
            <p className="mt-8 text-xs uppercase tracking-eyebrow text-electric">{article.category}</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {article.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-background/80">{article.excerpt}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-eyebrow text-background/70">
              <span>By ClutchFuel Team</span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-background/40" />
              <span>{article.readingTime}</span>
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
            <h3 className="mt-3 text-2xl font-bold">Take the Clutch Score</h3>
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
                <img src={a.image} alt={a.title} loading="lazy" className="aspect-[16/10] w-full object-cover" />
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
