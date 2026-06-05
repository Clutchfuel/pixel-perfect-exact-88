import { Link } from "@tanstack/react-router";
import { BrandCard, BrandHeadline, BrandSection } from "@/components/brand/BrandSection";
import { Reveal } from "@/components/Reveal";
import { brand } from "@/data/brand-experience";
import { cn } from "@/lib/utils";

export function SystemExperienceSection() {
  const s = brand.system;
  return (
    <BrandSection id={s.id} tone="secondary">
      <Reveal>
        <BrandHeadline>{s.headline}</BrandHeadline>
        <p className="mt-4 max-w-xl text-lg text-brand-muted">{s.sub}</p>
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {s.products.map((product, i) => (
          <Reveal key={product.name} delay={i * 0.06}>
            <Link to={product.href} className="group block h-full no-underline">
              <BrandCard
                className={cn(
                  "h-full text-center",
                  product.accent && "border-brand-accent/25 lime-glow",
                )}
              >
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                  {product.stage}
                </div>
                <h3 className="mt-4 font-display text-4xl font-extrabold tracking-display text-white">
                  {product.name}
                </h3>
                <p className="mt-4 text-brand-muted">{product.copy}</p>
                <span className="mt-8 inline-block text-sm font-semibold text-white group-hover:text-brand-accent">
                  Learn more →
                </span>
              </BrandCard>
            </Link>
          </Reveal>
        ))}
      </div>
    </BrandSection>
  );
}
