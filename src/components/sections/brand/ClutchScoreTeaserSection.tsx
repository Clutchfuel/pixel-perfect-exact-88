import { CFButton } from "@/components/CFButton";
import { BrandHeadline, BrandSection } from "@/components/brand/BrandSection";
import { Reveal } from "@/components/Reveal";
import { brand } from "@/data/brand-experience";
import { site } from "@/data/site";

export function ClutchScoreTeaserSection() {
  const s = brand.clutchScore;
  return (
    <BrandSection id={s.id}>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <BrandHeadline>{s.headline}</BrandHeadline>
          <p className="mt-6 text-lg leading-relaxed text-brand-muted">{s.sub}</p>
          <div className="mt-8">
            <CFButton href={site.ctaHref} variant="primary" size="lg">
              {s.cta}
            </CFButton>
          </div>
          <p className="mt-4 text-sm text-brand-muted">
            The calculator is the product. Your profile unlocks in under 60 seconds.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-[1.75rem] border border-white/[0.1] bg-brand-card p-8 md:p-10">
            <div className="text-center">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">
                Clutch Score
              </div>
              <div className="mt-2 font-display text-[5rem] font-extrabold leading-none tracking-display text-brand-accent md:text-[6rem]">
                {s.sample.score}
              </div>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/[0.08] bg-brand-secondary px-5 py-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-muted">
                  Hydration Readiness
                </div>
                <div className="mt-2 font-display text-2xl font-extrabold text-white">
                  {s.sample.readiness}
                </div>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-brand-secondary px-5 py-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-muted">
                  Athlete Profile
                </div>
                <div className="mt-2 font-display text-xl font-extrabold text-white">
                  {s.sample.profile}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </BrandSection>
  );
}
