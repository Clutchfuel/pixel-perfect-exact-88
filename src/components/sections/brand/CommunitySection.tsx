import { Users } from "lucide-react";
import { BrandCard, BrandHeadline, BrandSection } from "@/components/brand/BrandSection";
import { Reveal } from "@/components/Reveal";
import { brand } from "@/data/brand-experience";

export function CommunitySection() {
  const s = brand.community;
  return (
    <BrandSection id={s.id}>
      <Reveal>
        <BrandHeadline>{s.headline}</BrandHeadline>
        <p className="mt-4 max-w-2xl text-lg text-brand-muted">{s.sub}</p>
      </Reveal>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {s.pillars.map((pillar, i) => (
          <Reveal key={pillar.title} delay={i * 0.04}>
            <BrandCard className="h-full">
              <Users className="h-5 w-5 text-brand-accent" aria-hidden />
              <h3 className="mt-4 font-display text-lg font-bold text-white">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">{pillar.copy}</p>
            </BrandCard>
          </Reveal>
        ))}
      </div>
    </BrandSection>
  );
}
