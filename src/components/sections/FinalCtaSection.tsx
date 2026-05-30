import { Reveal } from "@/components/Reveal";
import { CFButton } from "@/components/CFButton";
import { finalCta } from "@/data/home";

export function FinalCtaSection() {
  return (
    <section className="relative w-full overflow-hidden border-t border-ink/8 bg-white py-24 md:py-32 lg:py-40">

      <div className="relative mx-auto max-w-5xl px-6 text-center md:px-10">
        <Reveal>
          <h2 className="font-display text-4xl font-extrabold tracking-display text-ink sm:text-6xl lg:text-[96px] lg:leading-[0.95]">
            {finalCta.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-ink md:text-xl">{finalCta.sub}</p>
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
