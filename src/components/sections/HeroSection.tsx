import { CFButton } from "@/components/CFButton";
import { HeroPreparationReel } from "@/components/HeroPreparationReel";
import { Reveal } from "@/components/Reveal";
import { brand } from "@/data/brand-experience";
import { HERO_REEL } from "@/data/hero-video";
import { site } from "@/data/site";
import { useAthleteSession } from "@/hooks/use-athlete-session";

export function HeroSection() {
  const loggedIn = useAthleteSession();
  const h = brand.hero;

  return (
    <section className="relative min-h-[88svh] w-full overflow-hidden bg-brand-base">
      <div className="absolute inset-0">
        <HeroPreparationReel />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-base/95 via-brand-base/78 to-brand-base/48" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-base/90 via-transparent to-brand-base/40" />
      </div>

      <p className="sr-only">{HERO_REEL.alt}</p>

      <div className="relative z-10 mx-auto flex min-h-[88svh] w-full max-w-7xl flex-col justify-center px-6 py-28 md:px-10 md:py-32">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-accent">
            {h.tag}
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]">
            {h.headline}
          </h1>
          <Reveal delay={0.06}>
            <p className="mt-4 text-lg font-medium text-white md:text-xl">{h.tagline}</p>
            <div className="mt-4 max-w-lg space-y-1 text-base leading-relaxed text-brand-muted md:text-lg">
              {h.supporting.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              {loggedIn ? (
                <>
                  <CFButton href={site.sessionHref} variant="primary" size="lg">
                    {site.addSessionCta}
                  </CFButton>
                  <CFButton href={site.dashboardHref} variant="ghost-dark" size="lg">
                    {site.dashboardCta}
                  </CFButton>
                </>
              ) : (
                <>
                  <CFButton href={site.ctaHref} variant="primary" size="lg">
                    {h.primaryCta}
                  </CFButton>
                  <CFButton href="/#why-preparation" variant="ghost-dark" size="lg">
                    {h.secondaryCta}
                  </CFButton>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export const heroVideoPreload = HERO_REEL.poster.avif;
