import { Link } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { profiles } from "@/data/home";
import { CFButton } from "@/components/CFButton";
import { Scale, Flame, Heart, Droplet, ArrowRight } from "lucide-react";

const iconMap = { balance: Scale, flame: Flame, heart: Heart, droplet: Droplet } as const;

export function ProfilesSection() {
  return (
    <Section theme="mist" id="athletes">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Link
              to="/athletes"
              className="tracking-eyebrow text-xs font-semibold uppercase text-lime-ink hover:underline"
            >
              Athlete profiles
            </Link>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-extrabold tracking-display text-ink sm:text-5xl lg:text-[64px]">
              {profiles.headline}
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted-ink">{profiles.sub}</p>
          </div>
          <CFButton to="/athletes" variant="ghost" size="md" className="shrink-0">
            Explore sports <ArrowRight className="ml-1 h-4 w-4" />
          </CFButton>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {profiles.cards.map((p, i) => {
          const Icon = iconMap[p.icon as keyof typeof iconMap];
          return (
            <Reveal key={p.name} delay={i * 0.06}>
              <Link
                to={p.href}
                className="group relative flex h-full flex-col justify-between rounded-3xl border border-ink/8 bg-white p-7 text-ink transition-all duration-300 hover:-translate-y-1 hover:border-lime/30 hover:shadow-card"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-lime ring-1 ring-ink/10">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-14">
                  <h3 className="font-display text-2xl font-extrabold tracking-display text-ink">
                    {p.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-ink">{p.copy}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-lime-ink transition group-hover:underline">
                    Get your profile{" "}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
