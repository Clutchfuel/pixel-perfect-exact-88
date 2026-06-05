import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BrandCard, BrandHeadline, BrandSection } from "@/components/brand/BrandSection";
import { Reveal } from "@/components/Reveal";
import { brand } from "@/data/brand-experience";

export function CoachesCornerSection() {
  const s = brand.coachesCorner;
  return (
    <BrandSection id={s.id}>
      <Reveal>
        <BrandHeadline>{s.headline}</BrandHeadline>
        <p className="mt-4 max-w-xl text-lg text-brand-muted">{s.sub}</p>
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {s.articles.map((article, i) => (
          <Reveal key={article.title} delay={i * 0.05}>
            <Link to={article.href} className="group block no-underline">
              <BrandCard className="h-full">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-accent">
                  {article.topic}
                </span>
                <h3 className="mt-4 font-display text-2xl font-extrabold tracking-display text-white group-hover:text-brand-accent transition-colors">
                  {article.title}
                </h3>
                <p className="mt-3 text-brand-muted">{article.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  Read <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </BrandCard>
            </Link>
          </Reveal>
        ))}
      </div>
    </BrandSection>
  );
}
