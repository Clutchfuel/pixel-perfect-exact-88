import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { Reveal } from "@/components/Reveal";
import { articles } from "@/data/insights";
import { makeMeta, canonical } from "@/lib/seo";
import insightsHero from "@/assets/insights-hero.jpg";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: makeMeta({
      title: "Insights — Hydration & Performance Guides | ClutchFuel",
      description:
        "Long-form articles on hydration, sweat rate, electrolytes, and sport-specific strategy for everyday athletes.",
      path: "/insights",
    }),
    links: canonical("/insights"),
  }),
  component: InsightsPage,
});

function InsightsPage() {
  const sorted = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="INSIGHTS"
          title="Hydration and performance, decoded."
          sub="Educational guides built for everyday athletes — no fluff, no bro-science, just the science of how to perform under pressure."
          bgImage={insightsHero}
          bgImageAlt="Notebook with training notes and a sports bottle"
        />

        <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sorted.map((a) => (
              <Reveal key={a.slug}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
