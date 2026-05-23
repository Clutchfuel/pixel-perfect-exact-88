import { Reveal } from "@/components/Reveal";
import { CFButton } from "@/components/CFButton";
import { finalCta } from "@/data/home";

export function FinalCtaSection() {
  return (
    <section className="relative w-full overflow-hidden bg-dark py-24 md:py-32 lg:py-40">
      {/* lime glow accents */}
      <div className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-lime/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-lime/10 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-6 text-center md:px-10">
        <Reveal>
          <h2 className="font-display text-4xl font-extrabold tracking-display text-white sm:text-6xl lg:text-[96px] lg:leading-[0.95]">
            {finalCta.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-dark md:text-xl">{finalCta.sub}</p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-10">
            <CFButton to="/clutch-score" variant="primary" size="lg">
              {finalCta.cta} →
            </CFButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
