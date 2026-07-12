import { Link } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { howItWorks } from "@/data/home";
import { ListChecks, Gauge, TrendingUp, ArrowRight } from "lucide-react";

const iconMap = { list: ListChecks, score: Gauge, trend: TrendingUp } as const;

export function HowItWorksSection() {
  return (
    <Section theme="light" id="how-it-works">
      <Reveal>
        <h2 className="max-w-3xl font-display text-4xl font-extrabold tracking-display text-ink sm:text-5xl lg:text-[64px]">
          {howItWorks.headline}
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {howItWorks.steps.map((s, i) => {
          const Icon = iconMap[s.icon as keyof typeof iconMap];
          return (
            <Reveal key={s.n} delay={i * 0.08}>
              <Link
                to={s.href}
                className="group relative flex h-full flex-col rounded-3xl bg-dark p-8 text-white transition-all duration-300 hover:-translate-y-1 hover:ring-1 hover:ring-lime/30"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-bold tracking-eyebrow text-lime">
                    {s.n}
                  </span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 text-lime">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="mt-10 font-display text-2xl font-extrabold tracking-display text-white">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 text-sm text-muted-dark">{s.copy}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-lime">
                  Learn more{" "}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
                <div className="mt-4 h-px w-full bg-gradient-to-r from-lime/40 via-white/10 to-transparent" />
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
