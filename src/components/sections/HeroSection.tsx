import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/Badge";
import { CFButton } from "@/components/CFButton";
import { Reveal } from "@/components/Reveal";
import { HeroClutchSlideshow } from "@/components/HeroClutchSlideshow";
import { hero } from "@/data/home";

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-white">
      <div className="absolute inset-0 opacity-40">
        <HeroClutchSlideshow />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 via-white/70 to-white" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-end px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36 lg:justify-center lg:pb-28">
        <div className="max-w-xl lg:max-w-2xl">
          <Reveal>
            <Link to="/insights">
              <Badge variant="light">{hero.badge}</Badge>
            </Link>
          </Reveal>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-display text-ink sm:text-5xl lg:text-6xl xl:text-[68px]">
            {hero.headline}
          </h1>
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-lg text-base text-muted-ink md:text-lg">{hero.sub}</p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-8">
              <CFButton to="/clutch-score" variant="primary" size="lg">
                {hero.cta}
              </CFButton>
              <p className="mt-3 max-w-md text-sm text-muted-ink">{hero.supporting}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
