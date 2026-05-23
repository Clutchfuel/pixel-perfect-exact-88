import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CFButton } from "@/components/CFButton";
import { ProductCard } from "@/components/cards/ProductCard";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Reveal } from "@/components/Reveal";
import { getSport, sports, type Sport } from "@/data/sports";
import { products } from "@/data/products";
import { getArticle } from "@/data/insights";
import { makeMeta, canonical, breadcrumbSchema } from "@/lib/seo";
import { sportImageBySlug } from "@/assets/image-sets";
import { Quote } from "lucide-react";

export const Route = createFileRoute("/athletes/$sport")({
  loader: ({ params }) => {
    const sport = getSport(params.sport);
    if (!sport) throw notFound();
    return sport;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Sport not found — ClutchFuel" }] };
    return {
      meta: makeMeta({
        title: `Hydration for ${loaderData.name} | ClutchFuel`,
        description: loaderData.sub,
        path: `/athletes/${params.sport}`,
      }),
      links: canonical(`/athletes/${params.sport}`),
      scripts: [
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Athletes", path: "/athletes" },
          { name: loaderData.name, path: `/athletes/${params.sport}` },
        ]),
      ],
    };
  },
  component: SportPage,
});

function SportPage() {
  const sport = Route.useLoaderData() as Sport;
  const recommended = products.filter((p) => sport.recommendedProducts.includes(p.slug));
  const related = sport.relatedArticleSlug ? getArticle(sport.relatedArticleSlug) : undefined;
  const otherSports = sports.filter((s: Sport) => s.slug !== sport.slug);

  return (
    <>
      <Header overDark />
      <main>
        <PageHero
          eyebrow={sport.eyebrow}
          title={sport.headline}
          sub={sport.sub}
          heroImage={sportImageBySlug[sport.slug]}
          bgImageAlt={`${sport.name} athlete in action`}
        >
          <CFButton to="/clutch-score" variant="primary" size="lg">
            Unlock My Clutch Score →
          </CFButton>
        </PageHero>

        <section className="bg-background py-4">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <Breadcrumbs
              items={[
                { name: "Home", to: "/" },
                { name: "Athletes", to: "/athletes" },
                { name: sport.name },
              ]}
            />
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-20">
          <h2 className="font-display text-3xl font-extrabold tracking-display text-ink md:text-4xl">
            The challenge
          </h2>
          <div className="mt-10 space-y-6">
            {sport.challenges.map((c) => (
              <Reveal key={c.title}>
                <div className="rounded-2xl border border-ink/8 bg-white p-6">
                  <h3 className="font-display text-xl font-extrabold tracking-display text-ink">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-muted-ink">{c.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="bg-mist">
          <div className="mx-auto max-w-5xl px-6 py-20 md:px-10 md:py-24">
            <h2 className="font-display text-3xl font-extrabold tracking-display text-ink md:text-4xl">
              The strategy
            </h2>
            <ol className="mt-8 space-y-4">
              {sport.strategy.map((s, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 rounded-2xl border border-ink/8 bg-white p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime font-display font-extrabold text-ink">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-ink">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24">
          <h2 className="font-display text-3xl font-extrabold tracking-display text-ink md:text-4xl">
            Recommended for {sport.name.toLowerCase()}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {recommended.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>

        <section className="bg-dark">
          <div className="mx-auto max-w-3xl px-6 py-20 text-center md:px-10 md:py-24">
            <Quote className="mx-auto h-8 w-8 text-lime" />
            <p className="mt-6 font-display text-2xl font-extrabold tracking-display text-white md:text-3xl">
              "{sport.testimonial.quote}"
            </p>
            <div className="mt-6 text-sm text-muted-dark">
              <div className="font-semibold text-white">{sport.testimonial.name}</div>
              <div>{sport.testimonial.role}</div>
            </div>
          </div>
        </section>

        {related && (
          <section className="mx-auto max-w-3xl px-6 py-16 text-center md:px-10">
            <div className="text-xs uppercase tracking-eyebrow text-muted-ink">Go deeper</div>
            <h3 className="mt-3 font-display text-2xl font-extrabold tracking-display text-ink md:text-3xl">
              {related.title}
            </h3>
            <p className="mt-3 text-muted-ink">{related.excerpt}</p>
            <Link
              to="/insights/$slug"
              params={{ slug: related.slug }}
              className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-ink underline underline-offset-4"
            >
              Read the full guide →
            </Link>
          </section>
        )}

        <RelatedLinks
          title="Other sports"
          items={otherSports
            .map((s: Sport) => ({
              label: s.name,
              to: `/athletes/${s.slug}`,
              description: s.sub.split(".")[0] + ".",
            }))
            .concat([
              {
                label: "All insights",
                to: "/insights",
                description: "Articles for every athlete.",
              },
            ])}
        />
      </main>
      <Footer />
    </>
  );
}
