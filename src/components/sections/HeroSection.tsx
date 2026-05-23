import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/Badge";
import { CFButton } from "@/components/CFButton";
import { Reveal } from "@/components/Reveal";
import { HeroClutchSlideshow } from "@/components/HeroClutchSlideshow";
import { hero } from "@/data/home";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-background pt-24 md:pt-32 lg:pt-36">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 pb-16 md:px-10 md:pb-20 lg:grid-cols-12 lg:items-center lg:gap-8 lg:pb-24">
        <div className="lg:col-span-6 lg:pr-4">
          <Reveal>
            <Link to="/insights">
              <Badge>{hero.badge}</Badge>
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
                {hero.cta} →
              </CFButton>
              <p className="mt-3 max-w-md text-sm text-muted-ink">{hero.supporting}</p>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <HeroClutchSlideshow />
        </div>
      </div>
    </section>
  );
}
