import { CFButton } from "@/components/CFButton";
import { HomeDashboardMockup } from "@/components/HomeDashboardMockup";
import { HeroClutchSlideshow } from "@/components/HeroClutchSlideshow";
import { Reveal } from "@/components/Reveal";
import { hero } from "@/data/home";
import { site } from "@/data/site";
import { useAthleteSession } from "@/hooks/use-athlete-session";

export function HeroSection() {
  const loggedIn = useAthleteSession();

  return (
    <section className="relative w-full overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0 max-h-[520px] opacity-25 md:max-h-[560px]">
        <HeroClutchSlideshow />
      </div>
      <div className="pointer-events-none absolute inset-0 max-h-[520px] bg-gradient-to-b from-[#0A0A0A]/30 via-[#0A0A0A]/85 to-[#0A0A0A] md:max-h-[560px]" />
      <div className="pointer-events-none absolute inset-x-0 top-[420px] h-48 bg-gradient-to-b from-transparent to-[#0A0A0A] md:top-[480px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 md:px-10 md:pt-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.75rem]">
            {hero.headline}
          </h1>
          <Reveal delay={0.06}>
            <p className="mt-3 text-lg font-medium text-white/90 md:text-xl">{hero.tagline}</p>
            <p className="mt-2 max-w-xl text-base text-muted-dark md:text-lg">{hero.sub}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
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
                    {hero.cta}
                  </CFButton>
                  <CFButton href={site.howItWorksHref} variant="ghost-dark" size="lg">
                    {hero.secondaryCta}
                  </CFButton>
                </>
              )}
            </div>
            <p className="mt-2.5 text-sm text-muted-dark">{hero.supporting}</p>
          </Reveal>
        </div>

        <div className="mt-8 md:mt-10 lg:mt-12">
          <HomeDashboardMockup />
        </div>
      </div>

      <div className="h-10 md:h-14" aria-hidden />
    </section>
  );
}
