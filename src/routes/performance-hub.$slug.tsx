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
        <header className="border-b border-black/5">
          <div className="mx-auto w-full max-w-3xl px-5 pt-14 pb-10 sm:px-8 sm:pt-24">
            <Link to="/performance-hub" className="inline-flex items-center gap-2 text-xs uppercase tracking-eyebrow text-muted-foreground/80 hover:text-foreground">
              <ArrowLeft className="h-3.5 w-3.5" /> Performance Hub
            </Link>
            <p className="mt-6 text-xs uppercase tracking-eyebrow text-electric">{article.category}</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">{article.excerpt}</p>
            <p className="mt-4 text-xs uppercase tracking-eyebrow text-muted-foreground/80">{article.readingTime}</p>
          </div>
          <div className={`h-64 w-full bg-gradient-to-br ${article.gradient} sm:h-96`} aria-hidden />
        </header>

        <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="prose prose max-w-none space-y-6 text-lg leading-relaxed text-muted-foreground">
            {article.body.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-black/10 bg-black/[0.03] p-8">
            <p className="text-xs uppercase tracking-eyebrow text-electric">Try it yourself</p>
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
          <p className="text-xs uppercase tracking-eyebrow text-electric">Related reads</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Keep exploring.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {related.map((a: typeof related[number]) => (
              <Link
                key={a.slug}
                to="/performance-hub/$slug" params={{ slug: a.slug }}
                className="group block overflow-hidden rounded-2xl border border-black/10 bg-background transition hover:border-black/25"
              >
                <div className={`aspect-[16/10] bg-gradient-to-br ${a.gradient}`} aria-hidden />
                <div className="p-6">
                  <p className="text-xs uppercase tracking-eyebrow text-electric">{a.category}</p>
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
