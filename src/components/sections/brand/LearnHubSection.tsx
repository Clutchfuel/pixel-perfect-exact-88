import { Link } from "@tanstack/react-router";
import { BrandCard, BrandHeadline, BrandSection } from "@/components/brand/BrandSection";
import { Reveal } from "@/components/Reveal";
import { brand } from "@/data/brand-experience";

export function LearnHubSection() {
  const s = brand.learn;
  return (
    <BrandSection id={s.id} tone="secondary">
      <Reveal>
        <BrandHeadline>{s.headline}</BrandHeadline>
        <p className="mt-4 max-w-2xl text-lg text-brand-muted">{s.sub}</p>
      </Reveal>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {s.articles.map((article, i) => (
          <Reveal key={article.title} delay={i * 0.04}>
            <Link to={article.href} className="group block no-underline">
              <BrandCard className="flex h-full min-h-[140px] flex-col justify-between">
                <h3 className="font-display text-lg font-bold text-white group-hover:text-brand-accent transition-colors">
                  {article.title}
                </h3>
                <span className="mt-4 text-sm font-medium text-brand-muted group-hover:text-white">
                  Read →
                </span>
              </BrandCard>
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          to="/insights"
          className="text-sm font-semibold text-brand-accent hover:underline underline-offset-4"
        >
          Explore all education →
        </Link>
      </div>
    </BrandSection>
  );
}
