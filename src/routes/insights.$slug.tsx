import { createFileRoute, notFound } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { CFButton } from "@/components/CFButton";
import { Reveal } from "@/components/Reveal";
import { getArticle, articles, type Article, type ArticleSection } from "@/data/insights";
import { makeMeta, canonical, SITE_URL, breadcrumbSchema } from "@/lib/seo";
import { Clock } from "lucide-react";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Article not found — ClutchFuel" }] };
    return {
      meta: makeMeta({
        title: `${loaderData.title} | ClutchFuel Insights`,
        description: loaderData.excerpt,
        path: `/insights/${params.slug}`,
        type: "article",
      }),
      links: canonical(`/insights/${params.slug}`),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: loaderData.title,
            description: loaderData.excerpt,
            datePublished: loaderData.publishedAt,
            dateModified: loaderData.publishedAt,
            author: { "@type": "Organization", name: loaderData.author },
            publisher: {
              "@type": "Organization",
              name: "ClutchFuel",
              url: SITE_URL,
            },
            mainEntityOfPage: `${SITE_URL}/insights/${params.slug}`,
            articleSection: loaderData.category,
          }),
        },
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: loaderData.title, path: `/insights/${params.slug}` },
        ]),
      ],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const article = Route.useLoaderData() as Article;
  const related = (article.relatedSlugs ?? [])
    .map((s: string) => articles.find((a: Article) => a.slug === s))
    .filter((a): a is Article => Boolean(a));
  const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <Header />
      <main>
        <section className="bg-background pt-28 md:pt-36">
          <div className="mx-auto max-w-3xl px-6 md:px-10">
            <Breadcrumbs
              items={[
                { name: "Home", to: "/" },
                { name: "Insights", to: "/insights" },
                { name: article.title },
              ]}
            />
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-6 py-12 md:px-10 md:py-16">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="rounded-full bg-mist px-2.5 py-1 font-semibold uppercase tracking-eyebrow text-ink/70">
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1 text-muted-ink">
                <Clock className="h-3 w-3" />
                {article.readMinutes} min read
              </span>
              <span className="text-muted-ink">{date}</span>
            </div>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-display text-ink md:text-5xl lg:text-6xl">
              {article.title}
            </h1>
            <p className="mt-5 text-xl text-muted-ink">{article.excerpt}</p>
            <div className="mt-6 text-sm text-muted-ink">By {article.author}</div>
          </Reveal>

          <div className="mt-12 space-y-10">
            {article.body.map((section, i) => (
              <Reveal key={i}>
                <div>
                  {section.heading && (
                    <h2 className="font-display text-2xl font-extrabold tracking-display text-ink md:text-3xl">
                      {section.heading}
                    </h2>
                  )}
                  {section.paragraphs.map((p, pi) => (
                    <p key={pi} className="mt-4 text-lg leading-relaxed text-ink/80">
                      {p}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="mt-5 space-y-2 pl-1">
                      {section.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-3 text-ink/80">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 rounded-3xl border border-ink/10 bg-mist p-8 text-center">
            <h3 className="font-display text-2xl font-extrabold tracking-display text-ink">
              Make this personal.
            </h3>
            <p className="mx-auto mt-3 max-w-md text-muted-ink">
              The Clutch Score turns general advice into your number — in 60 seconds.
            </p>
            <div className="mt-6">
              <CFButton to="/clutch-score" variant="primary" size="md">
                Unlock My Clutch Score →
              </CFButton>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="bg-mist">
            <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24">
              <h2 className="font-display text-2xl font-extrabold tracking-display text-ink md:text-3xl">
                Related reading
              </h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {related.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
