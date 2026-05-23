import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { testimonials } from "@/data/home";
import { Quote } from "lucide-react";

export function TestimonialsSection() {
  return (
    <Section theme="light">
      <Reveal>
        <h2 className="max-w-3xl font-display text-4xl font-extrabold tracking-display text-ink sm:text-5xl lg:text-[64px]">
          {testimonials.headline}
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {testimonials.items.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08}>
            <article className="flex h-full flex-col rounded-3xl border border-ink/8 bg-mist/60 p-7">
              <Quote className="h-6 w-6 text-lime" />
              <p className="mt-4 flex-1 text-base leading-relaxed text-ink">
                "{t.quote}"
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-ink/5 pt-5">
                {/* avatar placeholder */}
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-ink to-panel ring-1 ring-ink/10" />
                <div>
                  <div className="text-sm font-semibold text-ink">{t.name}</div>
                  <div className="text-xs text-muted-ink">{t.role}</div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* small placeholder logo strip */}
      <Reveal delay={0.2}>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-60">
          {["EASTSIDE", "PEAK CLUB", "RUN COLLECTIVE", "HYROX LAB", "COURT 21"].map((l) => (
            <span key={l} className="font-display text-sm font-extrabold tracking-eyebrow text-ink/50">
              {l}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
