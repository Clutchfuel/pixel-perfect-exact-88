import { Link } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ComingSoonVisual } from "@/components/ComingSoonVisual";
import { CFButton } from "@/components/CFButton";
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

      <Reveal delay={0.1}>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {systemSection.stages.map((s, i) => (
            <div key={s} className="flex items-center gap-4 sm:gap-6">
              <Link
                to="/system"
                className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-5 py-2.5 text-sm font-semibold uppercase tracking-eyebrow text-ink shadow-card transition hover:border-lime/40 hover:shadow-lime-glow"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                {s}
              </Link>
              {i < systemSection.stages.length - 1 && (
                <ArrowRight className="h-5 w-5 text-ink/30" />
              )}
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {systemSection.products.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08}>
            <Link
              to={p.href}
              className={cn(
                "group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card",
                p.accent ? "border-lime/40 lime-glow" : "border-ink/8",
              )}
            >
              <ComingSoonVisual productName={p.name} stage={p.stage} accent={p.accent} />
              <div className="mt-6 flex flex-1 flex-col">
                <div className="tracking-eyebrow text-xs font-semibold uppercase text-muted-ink">
                  {p.stage}
                </div>
                <h3 className="mt-2 font-display text-2xl font-extrabold tracking-display text-ink group-hover:text-ink/80">
                  {p.name}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-ink">{p.copy}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-lime">
                  View product{" "}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {systemSection.features.map((f, i) => {
          const Icon = iconMap[f.icon as keyof typeof iconMap];
          return (
            <Reveal key={f.title} delay={i * 0.06}>
              <Link
                to={f.href}
                className="flex h-full items-start gap-4 rounded-2xl border border-ink/8 bg-mist/60 p-6 transition hover:border-lime/30 hover:bg-white"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime/15 text-ink ring-1 ring-lime/30">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-extrabold tracking-display text-ink">
                    {f.title}
                  </h4>
                  <p className="mt-1 text-sm text-muted-ink">{f.copy}</p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.15}>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <CFButton to="/products" variant="ghost" size="md">
            Shop all products
          </CFButton>
          <CFButton to="/system" variant="ghost" size="md">
            How the system works
          </CFButton>
        </div>
      </Reveal>
    </Section>
  );
}
