import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { profiles } from "@/data/home";
import { Scale, Flame, Heart, Droplet } from "lucide-react";

const iconMap = { balance: Scale, flame: Flame, heart: Heart, droplet: Droplet } as const;

export function ProfilesSection() {
  return (
    <Section theme="mist" id="athletes">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="max-w-2xl font-display text-4xl font-extrabold tracking-display text-ink sm:text-5xl lg:text-[64px]">
              {profiles.headline}
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted-ink">{profiles.sub}</p>
          </div>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {profiles.cards.map((p, i) => {
          const Icon = iconMap[p.icon as keyof typeof iconMap];
          return (
            <Reveal key={p.name} delay={i * 0.06}>
              <article className="group relative flex h-full flex-col justify-between rounded-3xl border border-ink/8 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-lime ring-1 ring-ink/10">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-14">
                  <h3 className="font-display text-2xl font-extrabold tracking-display text-ink">
                    {p.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-ink">{p.copy}</p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
