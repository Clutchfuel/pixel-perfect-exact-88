import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ComingSoonVisual } from "@/components/ComingSoonVisual";
import { systemSection } from "@/data/home";
import { ArrowRight, Droplet, Zap, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = { droplet: Droplet, bolt: Zap, layers: Layers } as const;

export function SystemSection() {
  return (
    <Section theme="light" className="border-t border-ink/5" id="system">
      <Reveal>
        <h2 className="mx-auto max-w-4xl text-center font-display text-4xl font-extrabold uppercase tracking-display text-ink sm:text-5xl lg:text-[64px]">
          {systemSection.headline}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-muted-ink">
          {systemSection.sub}
        </p>
      </Reveal>

      {/* Stepper */}
      <Reveal delay={0.1}>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {systemSection.stages.map((s, i) => (
            <div key={s} className="flex items-center gap-4 sm:gap-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-5 py-2.5 text-sm font-semibold uppercase tracking-eyebrow text-ink shadow-card">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                {s}
              </div>
              {i < systemSection.stages.length - 1 && (
                <ArrowRight className="h-5 w-5 text-ink/30" />
              )}
            </div>
          ))}
        </div>
      </Reveal>

      {/* Product lineup */}
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {systemSection.products.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08}>
            <article
              className={cn(
                "group relative h-full overflow-hidden rounded-3xl border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card",
                p.accent ? "border-lime/40 lime-glow" : "border-ink/8"
              )}
            >
              <ComingSoonVisual
                productName={p.name}
                stage={p.stage}
                accent={p.accent}
              />
              <div className="mt-6">
                <div className="tracking-eyebrow text-xs font-semibold uppercase text-muted-ink">
                  {p.stage}
                </div>
                <h3 className="mt-2 font-display text-2xl font-extrabold tracking-display text-ink">
                  {p.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-ink">
                  {p.copy}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Feature cards */}
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {systemSection.features.map((f, i) => {
          const Icon = iconMap[f.icon as keyof typeof iconMap];
          return (
            <Reveal key={f.title} delay={i * 0.06}>
              <div className="flex h-full items-start gap-4 rounded-2xl border border-ink/8 bg-mist/60 p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime/15 text-ink ring-1 ring-lime/30">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-extrabold tracking-display text-ink">
                    {f.title}
                  </h4>
                  <p className="mt-1 text-sm text-muted-ink">{f.copy}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
