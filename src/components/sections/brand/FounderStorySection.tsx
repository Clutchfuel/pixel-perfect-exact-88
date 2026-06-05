import { BrandHeadline, BrandSection } from "@/components/brand/BrandSection";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Reveal } from "@/components/Reveal";
import { brand } from "@/data/brand-experience";

export function FounderStorySection() {
  const s = brand.founder;
  return (
    <BrandSection id={s.id} tone="secondary">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
            Founder Story
          </p>
          <BrandHeadline className="mt-4">{s.headline}</BrandHeadline>
          <p className="mt-2 font-display text-2xl font-bold text-white">{s.name}</p>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-brand-muted">
            {s.story.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
          <p className="mt-10 font-display text-2xl font-extrabold tracking-display text-brand-accent md:text-3xl">
            {s.closing}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
            <OptimizedImage
              avif={s.image.avif}
              webp={s.image.webp}
              fallback={s.image.fallback}
              alt="Jamar Gopie — ClutchFuel founder"
              width={800}
              height={1000}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </BrandSection>
  );
}
