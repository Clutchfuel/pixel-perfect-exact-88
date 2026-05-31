import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/Badge";
import { CFButton } from "@/components/CFButton";
import { Reveal } from "@/components/Reveal";
import { HeroClutchSlideshow } from "@/components/HeroClutchSlideshow";
import { hero } from "@/data/home";
import { site } from "@/data/site";

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0 opacity-30">
        <HeroClutchSlideshow />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/40 via-[#0A0A0A]/80 to-[#0A0A0A]" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-end px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36 lg:justify-center lg:pb-28">
        <div className="max-w-xl lg:max-w-2xl">
          <Reveal>
            <Link to="/insights">
              <Badge variant="dark">{hero.badge}</Badge>
            </Link>
          </Reveal>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[68px]">
            {hero.headline}
          </h1>
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-lg text-base text-muted-dark md:text-lg">{hero.sub}</p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CFButton href={site.ctaHref} variant="primary" size="lg">
                {hero.cta}
              </CFButton>
              <CFButton href={site.dashboardHref} variant="ghost-dark" size="lg">
                {site.dashboardCta}
              </CFButton>
            </div>
            <p className="mt-3 max-w-md text-sm text-muted-dark">{hero.supporting}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
