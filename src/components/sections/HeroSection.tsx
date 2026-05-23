import { Badge } from "@/components/Badge";
import { CFButton } from "@/components/CFButton";
import { Reveal } from "@/components/Reveal";
import { hero } from "@/data/home";
import heroDesktop from "@/assets/hero-desktop.jpg";
import heroMobile from "@/assets/hero-mobile.jpg";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-background pt-28 md:pt-36 lg:pt-40">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 pb-20 md:px-10 lg:grid-cols-12 lg:gap-10 lg:pb-32">
        <div className="lg:col-span-6 lg:pt-10">
          <Reveal>
            <Badge>{hero.badge}</Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 font-display text-[44px] font-extrabold leading-[1.02] tracking-display text-ink sm:text-6xl lg:text-7xl xl:text-[88px]">
              {hero.headline}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-lg text-lg text-muted-ink md:text-xl">
              {hero.sub}
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-10">
              <CFButton to="/clutch-score" variant="primary" size="lg">
                {hero.cta} →
              </CFButton>
              <p className="mt-4 max-w-md text-sm text-muted-ink">
                {hero.supporting}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal delay={0.15}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-ink lg:aspect-[5/6]">
              <picture>
                <source media="(max-width: 768px)" srcSet={heroMobile} />
                <img
                  src={heroDesktop}
                  alt="Athlete in focused, cinematic black-and-white portrait"
                  className="h-full w-full object-cover"
                  width={1600}
                  height={1200}
                  fetchPriority="high"
                />
              </picture>
              {/* subtle lime accent */}
              <div className="pointer-events-none absolute -bottom-6 -right-6 h-40 w-40 rounded-full bg-lime/30 blur-3xl" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
