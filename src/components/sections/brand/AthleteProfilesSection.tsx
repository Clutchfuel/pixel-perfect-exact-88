import { BrandCard, BrandHeadline, BrandSection } from "@/components/brand/BrandSection";
import { CFButton } from "@/components/CFButton";
import { Reveal } from "@/components/Reveal";
import { brand } from "@/data/brand-experience";
import { site } from "@/data/site";

export function AthleteProfilesSection() {
  const s = brand.profiles;
  return (
    <BrandSection id={s.id} tone="secondary">
      <Reveal>
        <BrandHeadline>{s.headline}</BrandHeadline>
        <p className="mt-4 max-w-2xl text-lg text-brand-muted">{s.sub}</p>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {s.cards.map((card, i) => (
          <Reveal key={card.name} delay={i * 0.05}>
            <BrandCard className="h-full">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                Athlete profile
              </div>
              <h3 className="mt-4 font-display text-2xl font-extrabold tracking-display text-white">
                {card.name}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-brand-muted">{card.copy}</p>
            </BrandCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-10 flex justify-center">
          <CFButton href={site.ctaHref} variant="primary" size="lg">
            {s.cta}
          </CFButton>
        </div>
      </Reveal>
    </BrandSection>
  );
}
