import { BrandHeadline, BrandSection } from "@/components/brand/BrandSection";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Reveal } from "@/components/Reveal";
import { brand } from "@/data/brand-experience";

export function FeaturedAthletesSection() {
  const s = brand.featuredAthletes;
  return (
    <BrandSection id={s.id} tone="secondary">
      <Reveal>
        <BrandHeadline>{s.headline}</BrandHeadline>
        <p className="mt-4 max-w-xl text-lg text-brand-muted">{s.sub}</p>
      </Reveal>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {s.stories.map((story, i) => (
          <Reveal key={story.name} delay={i * 0.06}>
            <article className="overflow-hidden rounded-2xl border border-white/[0.08] bg-brand-card">
              <div className="grid md:grid-cols-5">
                <div className="relative aspect-square md:col-span-2 md:aspect-auto md:min-h-[280px]">
                  <OptimizedImage
                    avif={story.image.avif}
                    webp={story.image.webp}
                    fallback={story.image.fallback}
                    alt={story.name}
                    width={480}
                    height={480}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 md:col-span-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-accent">
                    {story.role}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-extrabold text-white">{story.name}</h3>
                  <p className="mt-4 text-base leading-relaxed text-brand-muted">{story.story}</p>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </BrandSection>
  );
}
