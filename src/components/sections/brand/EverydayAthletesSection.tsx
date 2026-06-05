import { Link } from "@tanstack/react-router";
import { BrandCard, BrandHeadline, BrandSection } from "@/components/brand/BrandSection";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Reveal } from "@/components/Reveal";
import { brand } from "@/data/brand-experience";

export function EverydayAthletesSection() {
  const s = brand.everydayAthletes;
  return (
    <BrandSection id={s.id}>
      <Reveal>
        <BrandHeadline>{s.headline}</BrandHeadline>
        <p className="mt-4 max-w-2xl text-lg text-brand-muted">{s.sub}</p>
      </Reveal>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {s.sports.map((sport, i) => (
          <Reveal key={sport.name} delay={i * 0.05}>
            <Link to={sport.href} className="group block h-full no-underline">
              <BrandCard className="h-full overflow-hidden p-0">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <OptimizedImage
                    avif={sport.image.avif}
                    webp={sport.image.webp}
                    fallback={sport.image.fallback}
                    alt={`${sport.name} athlete preparing to train`}
                    width={600}
                    height={750}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-base via-brand-base/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-accent">
                      {sport.name}
                    </div>
                    <p className="mt-2 font-display text-lg font-bold text-white">
                      &ldquo;{sport.quote}&rdquo;
                    </p>
                    <p className="mt-2 text-sm text-brand-muted">{sport.insight}</p>
                  </div>
                </div>
              </BrandCard>
            </Link>
          </Reveal>
        ))}
      </div>
    </BrandSection>
  );
}
