import { Link } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { CFButton } from "@/components/CFButton";
import { featuredInsightSlugs } from "@/data/home";
import { getArticle } from "@/data/insights";
import { ArrowRight } from "lucide-react";

const featured = featuredInsightSlugs.map((slug) => getArticle(slug)).filter(Boolean);

export function InsightsPreviewSection() {
  return (
    <Section theme="light" id="insights">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Link
              to="/insights"
              className="tracking-eyebrow text-xs font-semibold uppercase text-lime hover:underline"
            >
              Insights
            </Link>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-extrabold tracking-display text-ink sm:text-5xl lg:text-[56px]">
              Hydration guides that actually get read.
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted-ink">
              Science-backed articles on sweat rate, electrolytes, and sport-specific strategy —
              written for everyday athletes, not lab coats.
            </p>
          </div>
          <CFButton to="/insights" variant="ghost" size="md" className="shrink-0">
            All articles <ArrowRight className="ml-1 h-4 w-4" />
          </CFButton>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((article, i) =>
          article ? (
            <Reveal key={article.slug} delay={i * 0.05}>
              <ArticleCard article={article} />
            </Reveal>
          ) : null,
        )}
      </div>

      <Reveal delay={0.2}>
        <p className="mt-10 text-center text-sm text-muted-ink">
          New to hydration? Start with{" "}
          <Link
            to="/insights/$slug"
            params={{ slug: "hydration-101-for-everyday-athletes" }}
            className="font-medium text-ink underline underline-offset-4 hover:text-lime"
          >
            Hydration 101
          </Link>{" "}
          or{" "}
          <Link
            to="/sweat-rate"
            className="font-medium text-ink underline underline-offset-4 hover:text-lime"
          >
            learn your sweat rate
          </Link>
          .
        </p>
      </Reveal>
    </Section>
  );
}
