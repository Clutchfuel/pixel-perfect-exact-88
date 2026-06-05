import { Target, Droplets, CalendarDays } from "lucide-react";
import { BrandCard, BrandHeadline, BrandSection } from "@/components/brand/BrandSection";
import { Reveal } from "@/components/Reveal";
import { brand } from "@/data/brand-experience";

const icons = { target: Target, droplet: Droplets, calendar: CalendarDays } as const;

export function PreparationWhySection() {
  const s = brand.preparation;
  return (
    <BrandSection id={s.id} tone="secondary">
      <Reveal>
        <BrandHeadline>{s.headline}</BrandHeadline>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
        {s.cards.map((card, i) => {
          const Icon = icons[card.icon];
          return (
            <Reveal key={card.title} delay={i * 0.06}>
              <BrandCard className="h-full">
                <Icon className="h-6 w-6 text-brand-accent" aria-hidden />
                <h3 className="mt-5 font-display text-xl font-extrabold tracking-display text-white">
                  {card.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-brand-muted">{card.copy}</p>
              </BrandCard>
            </Reveal>
          );
        })}
      </div>
    </BrandSection>
  );
}
