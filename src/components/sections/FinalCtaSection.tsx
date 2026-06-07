import { Reveal } from "@/components/Reveal";
import { CFButton } from "@/components/CFButton";
import { finalCta } from "@/data/home";
import { site } from "@/data/site";
import { useAthleteSession } from "@/hooks/use-athlete-session";

export function FinalCtaSection() {
  const loggedIn = useAthleteSession();

  return (
    <section className="relative w-full overflow-hidden border-t border-white/10 bg-[#0A0A0A] py-24 md:py-32 lg:py-40">
      <div className="relative mx-auto max-w-5xl px-6 text-center md:px-10">
        <Reveal>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-[72px] lg:leading-[0.95]">
            {finalCta.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-dark md:text-xl">{finalCta.sub}</p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {loggedIn ? (
              <>
                <CFButton href={site.sessionHref} variant="primary" size="lg">
                  {site.addSessionCta} →
                </CFButton>
                <CFButton href={site.dashboardHref} variant="ghost-dark" size="lg">
                  {site.dashboardCta}
                </CFButton>
              </>
            ) : (
              <CFButton href={site.ctaHref} variant="primary" size="lg">
                {finalCta.cta} →
              </CFButton>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
