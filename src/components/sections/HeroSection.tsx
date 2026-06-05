import { CFButton } from "@/components/CFButton";
import { HeroClutchSlideshow } from "@/components/HeroClutchSlideshow";
import { Reveal } from "@/components/Reveal";
import { brand } from "@/data/brand-experience";
import { heroClutchMoments } from "@/data/hero-slideshow";
import { site } from "@/data/site";
import { useAthleteSession } from "@/hooks/use-athlete-session";

export function HeroSection() {
  const loggedIn = useAthleteSession();
  const h = brand.hero;

  return (
    <section className="relative min-h-[88svh] w-full overflow-hidden bg-brand-base">
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.48]">
          <HeroClutchSlideshow variant="background" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-base via-brand-base/[0.92] to-brand-base/45" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-base via-brand-base/25 to-brand-base/50" />
      </div>

      <p className="sr-only">
        Hero video: rotating clutch moments from Hyrox, basketball, football, UFC, and endurance
        sport — athletes in decisive finishes.
      </p>

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

/** Preload first hero clip for LCP (see index route head links). */
export const heroVideoPreload = heroClutchMoments[0]?.video;
