import { Link } from "@tanstack/react-router";
import { Section, Eyebrow } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { CFButton } from "@/components/CFButton";
import { OptimizedImage } from "@/components/OptimizedImage";
import { sweatSection } from "@/data/home";
import { imageSets } from "@/assets/image-sets";
import { Activity, BarChart3, User } from "lucide-react";

const iconMap = { user: User, activity: Activity, chart: BarChart3 } as const;

export function SweatSection() {
  return (
    <Section theme="dark" id="sweat-rate">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <Reveal>
            <Link to="/sweat-rate">
              <Eyebrow accent>{sweatSection.eyebrow}</Eyebrow>
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-4xl font-extrabold uppercase tracking-display text-white sm:text-5xl lg:text-[64px]">
              {sweatSection.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-lg text-muted-dark">{sweatSection.sub}</p>
          </Reveal>

          <div className="mt-12 space-y-6">
            {sweatSection.rows.map((r, i) => {
              const Icon = iconMap[r.icon as keyof typeof iconMap];
              return (
                <Reveal key={r.title} delay={0.1 + i * 0.08}>
                  <Link
                    to={r.href}
                    className="group flex items-start gap-5 rounded-2xl p-2 -m-2 transition hover:bg-white/[0.03]"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-lime/10 text-lime ring-1 ring-lime/30">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-extrabold tracking-display text-white group-hover:text-lime">
                        {r.title}
                      </h3>
                      <p className="mt-1 max-w-md text-base text-muted-dark">{r.copy}</p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-12 max-w-xl rounded-3xl glass-dark p-7 lime-glow">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-extrabold tracking-display text-white">
                  {sweatSection.card.title}
                </h3>
                <span className="text-xs uppercase tracking-eyebrow text-lime">Free</span>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {sweatSection.card.stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center"
                  >
                    <div className="font-display text-2xl font-extrabold tracking-display text-white">
                      {s.value}
                    </div>
                    <div className="mt-1 text-[11px] uppercase tracking-eyebrow text-muted-dark">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm text-muted-dark">{sweatSection.card.copy}</p>
              <div className="mt-6">
                <CFButton to="/clutch-score" variant="primary" size="md">
                  {sweatSection.card.cta} →
                </CFButton>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.15}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border hairline-dark">
              <OptimizedImage
                avif={imageSets.athleteSweat.avif}
                webp={imageSets.athleteSweat.webp}
                fallback={imageSets.athleteSweat.fallback}
                alt="Sprinting athlete, cinematic black-and-white"
                className="h-full w-full object-cover"
                width={1200}
                height={1400}
              />
              <div className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full bg-lime/30 blur-3xl" />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
