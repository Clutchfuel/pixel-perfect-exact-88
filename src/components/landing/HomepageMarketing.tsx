import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

type BtnVariant = "primary" | "ghost" | "outline-dark" | "dark";

type BtnProps = {
  children: ReactNode;
  variant?: BtnVariant;
  onClick?: () => void;
  href?: string;
  className?: string;
};

function Btn({ children, variant = "primary", onClick, href, className = "" }: BtnProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-display text-[13px] font-semibold uppercase tracking-[0.04em] transition whitespace-nowrap";
  const variants: Record<BtnVariant, string> = {
    primary:
      "bg-[#FF5A1F] px-[22px] py-[13px] text-white shadow-[0_10px_24px_-10px_rgba(255,90,31,0.7)] hover:-translate-y-px hover:bg-[#D4460F] hover:shadow-[0_12px_28px_-8px_rgba(255,90,31,0.8)]",
    ghost:
      "border-[1.5px] border-white/35 bg-transparent px-[22px] py-[13px] text-white shadow-none hover:border-white hover:bg-white/6",
    "outline-dark":
      "border-[1.5px] border-[#0B0D10] bg-transparent px-[22px] py-[13px] text-[#0B0D10] shadow-none hover:bg-[#0B0D10] hover:text-white",
    dark: "bg-[#0B0D10] px-[22px] py-[13px] text-white shadow-[0_10px_24px_-10px_rgba(11,13,16,0.6)] hover:bg-black",
  };
  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

type SectionEyebrowProps = {
  children: ReactNode;
  tone?: "light" | "dark" | "hero";
  className?: string;
};

function SectionEyebrow({ children, tone = "light", className = "" }: SectionEyebrowProps) {
  const toneClass = tone === "dark" || tone === "hero" ? "text-[#ffb894]" : "text-[#D4460F]";

  return (
    <p
      className={`eyebrow-orange inline-flex items-center font-display text-xs font-semibold uppercase tracking-[0.16em] ${toneClass} ${className}`}
    >
      {children}
    </p>
  );
}

type PhotoPlaceholderProps = {
  tag: string;
  className?: string;
  aspectClass?: string;
};

function PhotoPlaceholder({
  tag,
  className = "",
  aspectClass = "aspect-[4/5]",
}: PhotoPlaceholderProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${aspectClass} bg-[linear-gradient(160deg,rgba(11,13,16,0.1),rgba(11,13,16,0.8)),repeating-linear-gradient(60deg,#1a2028_0_3px,#0e1116_3px_40px)] ${className}`}
    >
      <span className="absolute bottom-4 left-4 rounded-lg bg-black/40 px-3 py-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.03em] text-white backdrop-blur-sm">
        {tag}
      </span>
    </div>
  );
}

const WORD_CHIPS = [
  "Sleep",
  "Hydration",
  "Fuel",
  "Recovery",
  "Energy",
  "Focus",
  "Preparation",
] as const;

const PPR_CARDS = [
  {
    tag: "Prepare",
    tagClass: "bg-[#FF5A1F]",
    title: "Show up ready.",
    copy: "Understand the habits affecting your readiness before the work begins.",
    pills: ["Sleep", "Fuel", "Hydration", "Routine", "Readiness"],
  },
  {
    tag: "Perform",
    tagClass: "bg-black",
    title: "Bring your work to the moment.",
    copy: "Track how consistently you're maintaining your energy, focus and effort when the intensity rises.",
    pills: ["Energy", "Focus", "Confidence", "Consistency", "Effort"],
  },
  {
    tag: "Recover",
    tagClass: "bg-[#1FB6D6] text-[#04262c]",
    title: "Be ready to go again.",
    copy: "Understand how well you're resetting between workouts, practices and games.",
    pills: ["Sleep", "Hydration", "Fueling", "Soreness", "Recovery"],
  },
] as const;

const SCORE_LIST = [
  {
    num: "01",
    title: "Your Clutch Score",
    copy: "A 0–100 snapshot built from three pillars.",
  },
  {
    num: "02",
    title: "Your Prepare, Perform & Recover breakdown",
    copy: "See exactly where your habits are strong — and where they're not.",
  },
  {
    num: "03",
    title: "Your Biggest Opportunity",
    copy: "The one controllable factor most likely holding you back right now.",
  },
  {
    num: "04",
    title: "Your First Clutch Move",
    copy: "One clear, specific action — not a list of everything you're doing wrong.",
  },
] as const;

const STEPS = [
  {
    num: "01",
    title: "Check In",
    copy: "Tell us what's been happening around your training over the last week.",
  },
  {
    num: "02",
    title: "Get Your Score",
    copy: "See your Clutch Score plus your Prepare, Perform and Recover breakdown.",
  },
  {
    num: "03",
    title: "Make Your Move",
    copy: "Get your biggest opportunity and one clear thing to focus on next.",
  },
] as const;

const BEACH_TILES = [
  { tag: "AAU tournament weekend", span2: true },
  { tag: "High school gym", span2: false },
  { tag: "Strength session", span2: false },
  { tag: "Game speed", span2: false },
  { tag: "Post-practice recovery", span2: true },
] as const;

const ICEBERG_PILLS = [
  "Sleep",
  "Preparation",
  "Nutrition",
  "Hydration",
  "Training",
  "Recovery",
  "Stress",
  "Focus",
  "Consistency",
] as const;

const ATHLETE_CARDS = [
  { label: "Athlete 01", score: 82, opportunity: "Recovery" },
  { label: "Athlete 02", score: 71, opportunity: "Fueling" },
  { label: "Athlete 03", score: 77, opportunity: "Preparation" },
] as const;

type HomepageMarketingProps = {
  onGetScore: () => void;
};

function PillarRing({
  score,
  label,
  accent = "orange",
}: {
  score: number;
  label: string;
  accent?: "orange" | "cyan";
}) {
  const color = accent === "cyan" ? "#1FB6D6" : "#FF5A1F";

  return (
    <div className="flex flex-1 flex-col items-center text-center">
      <div
        className="mb-2 flex h-14 w-14 items-center justify-center rounded-full font-display text-[15px] font-bold text-white"
        style={{
          background: `conic-gradient(${color} 0 ${score}%, rgba(255,255,255,0.1) ${score}% 100%)`,
        }}
      >
        {score}
      </div>
      <span className="font-display text-[10px] uppercase tracking-[0.08em] text-[#8b93a0]">
        {label}
      </span>
    </div>
  );
}

/** ClutchFuel homepage v2 — Prepare · Perform · Recover marketing page. */
export function HomepageMarketing({ onGetScore }: HomepageMarketingProps) {
  return (
    <div className="bg-[#F5F4EF] pb-20 text-[#0B0D10] md:pb-0">
      <SiteHeader onGetScore={onGetScore} />

      {/* 1. Hero */}
      <section className="relative flex min-h-[720px] items-end overflow-hidden text-white">
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              "linear-gradient(180deg, rgba(11,13,16,0.25) 0%, rgba(11,13,16,0.55) 40%, rgba(11,13,16,0.97) 100%), repeating-linear-gradient(115deg, #171b22 0 2px, #0e1116 2px 48px), radial-gradient(130% 90% at 12% 8%, #1c222c 0%, #0B0D10 55%)",
          }}
        />
        <div
          className="pointer-events-none absolute -right-[10%] -top-[14%] h-[140%] w-[75%] rounded-full border-2 border-white/5"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-[30%] -left-[18%] h-[85%] w-[65%] rounded-full border-2 border-[#FF5A1F]/12"
          aria-hidden
        />

        <div className="relative z-10 mx-auto grid w-full max-w-[1180px] grid-cols-1 items-end gap-10 px-6 pb-20 pt-28 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-6 lg:pb-20 lg:pt-[110px]">
          <Reveal>
            <SectionEyebrow tone="hero">
              Performance Intelligence for Competitive Athletes
            </SectionEyebrow>
            <h1 className="mt-6 max-w-[640px] font-display text-[clamp(2.125rem,5.6vw,3.625rem)] font-bold uppercase leading-[1.04] tracking-[-0.01em]">
              <span className="block text-white">Prepare Better.</span>
              <span className="block text-[#FF5A1F]">Perform When It Counts.</span>
              <span className="block text-white">Recover for What&apos;s Next.</span>
            </h1>
            <p className="mt-5 max-w-[480px] text-[17px] leading-relaxed text-[#c9cdd4]">
              ClutchFuel helps competitive athletes understand the habits affecting their readiness,
              energy and recovery — then shows them what to focus on next.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Btn onClick={onGetScore}>Get My Clutch Score</Btn>
              <Btn href="#how-it-works" variant="ghost">
                See How It Works
              </Btn>
            </div>
            <p className="mt-4 text-[13px] text-[#8b93a0]">60 seconds. Personalized results.</p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-[20px] border border-white/10 bg-[rgba(20,23,29,0.88)] p-7 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm">
              <p className="font-display text-[11px] uppercase tracking-[0.14em] text-[#8b93a0]">
                Clutch Score™
              </p>
              <p className="mt-1 font-display text-[64px] font-bold leading-none text-[#FF5A1F]">
                78
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2.5">
                {[
                  { n: 84, l: "Prepare" },
                  { n: 79, l: "Perform" },
                  { n: 68, l: "Recover" },
                ].map((item) => (
                  <div
                    key={item.l}
                    className="rounded-[10px] border border-white/8 bg-white/[0.04] px-2.5 py-3 text-center"
                  >
                    <p className="font-display text-2xl font-semibold text-white">{item.n}</p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.08em] text-[#8b93a0]">
                      {item.l}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-[10px] border border-[#1FB6D6]/35 bg-[#1FB6D6]/12 px-3.5 py-3">
                <p className="text-[10px] uppercase tracking-[0.1em] text-[#7fe0f0]">
                  Biggest Opportunity
                </p>
                <p className="text-sm font-semibold text-white">Recovery</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Problem */}
      <section className="py-24 lg:py-28">
        <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-9 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <SectionEyebrow>The Problem</SectionEyebrow>
            <h2 className="mt-4 max-w-[760px] font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold uppercase leading-[1.08] tracking-[-0.01em]">
              You Train Your Game. What About Everything Around It?
            </h2>
            <p className="mt-5 max-w-[600px] text-[17px] leading-relaxed text-[#454b54]">
              Basketball performance doesn&apos;t start at tip-off.
            </p>
            <div className="my-6 flex flex-wrap gap-2">
              {WORD_CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-[#eceae2] px-4 py-2 font-display text-[13px] font-semibold uppercase tracking-[0.03em] text-[#0B0D10]"
                >
                  {chip}
                </span>
              ))}
            </div>
            <p className="max-w-[600px] text-[17px] leading-relaxed text-[#454b54]">
              The small decisions surrounding training can influence how ready you feel when
              it&apos;s time to compete. ClutchFuel helps you see the whole picture.
            </p>
            <div className="mt-7">
              <Btn variant="outline-dark" onClick={onGetScore}>
                Find My Biggest Opportunity <ArrowRight className="h-4 w-4" />
              </Btn>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <PhotoPlaceholder tag="Empty gym, before practice" />
          </Reveal>
        </div>
      </section>

      {/* 3. PPR System */}
      <section id="how-it-works" className="bg-[#0B0D10] py-24 text-white lg:py-28">
        <div className="mx-auto w-full max-w-[1180px] px-6">
          <Reveal>
            <SectionEyebrow tone="dark">The ClutchFuel System</SectionEyebrow>
            <h2 className="mt-4 max-w-[760px] font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold uppercase leading-[1.08] tracking-[-0.01em]">
              Prepare. Perform. Recover.
            </h2>
            <p className="mt-5 max-w-[600px] text-[17px] leading-relaxed text-[#c9cdd4]">
              Three phases of every athlete&apos;s week. One system for staying on top of all three.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {PPR_CARDS.map((card, i) => (
              <Reveal key={card.tag} delay={i * 0.05}>
                <article className="overflow-hidden rounded-2xl border border-[#e2e0d6] bg-white text-[#0B0D10] transition hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(11,13,16,0.25)]">
                  <div className="relative h-[190px] bg-[linear-gradient(160deg,rgba(11,13,16,0.05),rgba(11,13,16,0.75)),repeating-linear-gradient(45deg,#1a2028_0_3px,#0e1116_3px_34px)]">
                    <span
                      className={`absolute left-3.5 top-3.5 rounded-full px-3 py-1.5 font-display text-[11px] font-bold uppercase tracking-[0.1em] text-white ${card.tagClass}`}
                    >
                      {card.tag}
                    </span>
                  </div>
                  <div className="px-5 pb-6 pt-6">
                    <h3 className="font-display text-xl font-bold uppercase tracking-[-0.01em]">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#767f8c]">{card.copy}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {card.pills.map((pill) => (
                        <span
                          key={pill}
                          className="rounded-full bg-[#eceae2] px-2.5 py-1 text-[11px] font-semibold text-[#454b54]"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Clutch Score */}
      <section id="clutch-score" className="py-24 lg:py-28">
        <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal>
            <div className="mx-auto w-full max-w-[340px] rounded-[34px] border border-white/12 bg-black p-3.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
              <div className="min-h-[520px] rounded-[24px] bg-gradient-to-b from-[#12151a] to-[#0B0D10] px-5 py-6">
                <p className="text-xs text-[#8b93a0]">Good morning,</p>
                <p className="font-display text-lg font-semibold text-white">Jay</p>
                <p className="mt-4 text-center font-display text-[11px] uppercase tracking-[0.14em] text-[#8b93a0]">
                  Clutch Score™
                </p>
                <p className="text-center font-display text-[80px] font-bold leading-none text-[#FF5A1F]">
                  78
                </p>
                <div className="mt-5 flex gap-2.5">
                  <PillarRing score={84} label="Prepare" />
                  <PillarRing score={79} label="Perform" />
                  <PillarRing score={68} label="Recover" accent="cyan" />
                </div>
                <div className="mt-5 rounded-xl border border-[#FF5A1F]/30 bg-[#FF5A1F]/10 px-4 py-3.5">
                  <p className="font-display text-[10px] uppercase tracking-[0.1em] text-[#ffb894]">
                    Today&apos;s Clutch Move
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-white">
                    Your recovery is trailing your training load. Prioritize hydration and a full
                    recovery routine tonight.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <SectionEyebrow>Clutch Score™</SectionEyebrow>
            <h2 className="mt-4 max-w-[760px] font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold uppercase leading-[1.08] tracking-[-0.01em]">
              Find the Biggest Gap in Your Game — Off the Court.
            </h2>
            <p className="mt-5 max-w-[600px] text-[17px] leading-relaxed text-[#454b54]">
              The Clutch Score gives you a quick snapshot of how your preparation, performance
              habits and recovery are working together.
            </p>
            <ol className="mt-8 divide-y divide-[#e2e0d6]">
              {SCORE_LIST.map((item) => (
                <li key={item.num} className="flex gap-4 py-4 first:pt-0">
                  <span className="min-w-[22px] font-display text-sm font-bold text-[#D4460F]">
                    {item.num}
                  </span>
                  <div>
                    <p className="font-semibold text-[#0B0D10]">{item.title}</p>
                    <p className="text-sm leading-relaxed text-[#454b54]">{item.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <Btn onClick={onGetScore}>Take the 60-Second Assessment</Btn>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. How It Works steps */}
      <section className="bg-[#eceae2] py-24 lg:py-28">
        <div className="mx-auto w-full max-w-[1180px] px-6">
          <Reveal>
            <SectionEyebrow>How It Works</SectionEyebrow>
            <h2 className="mt-4 max-w-[760px] font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold uppercase leading-[1.08] tracking-[-0.01em]">
              Less Guessing. One Clear Next Move.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.05}>
                <div>
                  <p
                    className="mb-3.5 font-display text-[44px] font-bold leading-none text-transparent"
                    style={{ WebkitTextStroke: "1.5px #FF5A1F" }}
                  >
                    {step.num}
                  </p>
                  <h3 className="font-display text-[19px] font-bold uppercase tracking-[-0.01em]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#767f8c]">{step.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-11">
              <Btn variant="dark" onClick={onGetScore}>
                Get My Score
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6. Beachhead */}
      <section id="athletes" className="py-24 lg:py-28">
        <div className="mx-auto w-full max-w-[1180px] px-6">
          <Reveal>
            <SectionEyebrow>Basketball</SectionEyebrow>
            <h2 className="mt-4 max-w-[760px] font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold uppercase leading-[1.08] tracking-[-0.01em]">
              Built for Hoopers Chasing Something.
            </h2>
            <p className="mt-5 max-w-[600px] text-[17px] leading-relaxed text-[#454b54]">
              Whether you&apos;re trying to make varsity, earn minutes, play college basketball, win
              a championship, or simply become a better player — the work isn&apos;t limited to the
              court. ClutchFuel helps you build the habits around your game.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 grid-rows-4 gap-3.5 lg:grid-cols-4 lg:grid-rows-2">
            {BEACH_TILES.map((tile, i) => (
              <Reveal key={tile.tag} delay={i * 0.03}>
                <PhotoPlaceholder
                  tag={tile.tag}
                  aspectClass="aspect-auto h-40"
                  className={`rounded-xl ${tile.span2 ? "col-span-2" : ""}`}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Iceberg */}
      <section className="bg-[#eceae2] py-24 lg:py-28">
        <div className="mx-auto w-full max-w-[1180px] px-6">
          <Reveal>
            <SectionEyebrow>The Full Picture</SectionEyebrow>
            <h2 className="mt-4 max-w-[760px] font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold uppercase leading-[1.08] tracking-[-0.01em]">
              What People See Is Game Day. What They Don&apos;t See Builds It.
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="mt-14 overflow-hidden rounded-[20px] bg-gradient-to-b from-[#dff3f7] from-0% via-[#bfe6ee] via-[30%] to-[#081a24] to-[32%]">
              <div className="px-6 py-10 pb-16 text-center">
                <span className="inline-block rounded-full bg-white px-6 py-3 font-display text-[15px] font-bold uppercase tracking-[0.06em] text-[#0B0D10] shadow-[0_12px_30px_-12px_rgba(0,0,0,0.3)]">
                  Game Performance
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-3 px-6 pb-16 pt-2">
                {ICEBERG_PILLS.map((pill, i) => (
                  <span
                    key={pill}
                    className={`rounded-full border px-4 py-2.5 font-display text-[13px] font-semibold uppercase tracking-[0.03em] text-[#dff3f7] ${
                      i % 3 === 2
                        ? "border-[#1FB6D6]/40 bg-[#1FB6D6]/15"
                        : "border-white/18 bg-white/8"
                    } ${i % 2 === 0 ? "opacity-92" : ""}`}
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8. Personalization athlete cards */}
      <section className="py-24 lg:py-28">
        <div className="mx-auto w-full max-w-[1180px] px-6">
          <Reveal>
            <SectionEyebrow>Personalized Results</SectionEyebrow>
            <h2 className="mt-4 max-w-[760px] font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold uppercase leading-[1.08] tracking-[-0.01em]">
              Every Athlete Has a Different Next Move.
            </h2>
            <p className="mt-5 max-w-[600px] text-[17px] leading-relaxed text-[#454b54]">
              Same sport. Different athlete. Different needs.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {ATHLETE_CARDS.map((card, i) => (
              <Reveal key={card.label} delay={i * 0.05}>
                <article className="rounded-2xl bg-[#0B0D10] px-6 py-7 text-white">
                  <p className="font-display text-[11px] uppercase tracking-[0.12em] text-[#8b93a0]">
                    {card.label}
                  </p>
                  <p className="mt-3 font-display text-[46px] font-bold leading-none">
                    {card.score}
                  </p>
                  <p className="mt-0.5 font-display text-[11px] uppercase tracking-[0.1em] text-[#8b93a0]">
                    Clutch Score
                  </p>
                  <p className="mt-5 text-[11px] uppercase tracking-[0.1em] text-[#ffb894]">
                    Biggest Opportunity
                  </p>
                  <p className="font-display text-lg font-semibold text-[#FF5A1F]">
                    {card.opportunity}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-9">
              <Btn variant="outline-dark" onClick={onGetScore}>
                Find Mine <ArrowRight className="h-4 w-4" />
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9. Coach band */}
      <section id="coaches" className="pb-24 pt-0 lg:pb-28">
        <div className="mx-auto w-full max-w-[1180px] px-6">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-8 rounded-[20px] bg-[#eceae2] p-8 lg:p-[52px]">
              <div className="max-w-xl">
                <h2 className="font-display text-[clamp(1.375rem,2.8vw,2rem)] font-bold uppercase leading-tight tracking-[-0.01em]">
                  Better Habits Create More Prepared Athletes.
                </h2>
                <p className="mt-2.5 text-[15px] leading-relaxed text-[#454b54]">
                  ClutchFuel can help athletes develop more awareness around the habits supporting
                  their performance. Future team tools may help coaches identify trends without
                  replacing coaching judgment.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Btn variant="dark" onClick={onGetScore}>
                  For Athletes
                </Btn>
                <Btn variant="outline-dark" href="#">
                  For Teams
                </Btn>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 10. Belief */}
      <section
        id="about"
        className="relative overflow-hidden bg-[#0B0D10] px-6 py-32 text-center text-white lg:py-36"
      >
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(60% 60% at 50% 25%, rgba(255,90,31,0.16), transparent 70%)",
          }}
        />
        <Reveal className="relative z-10">
          <h2 className="font-display text-[clamp(1.875rem,4.6vw,3.25rem)] font-bold uppercase leading-[1.12] tracking-[-0.01em]">
            <span className="block text-white">Talent Gets Attention.</span>
            <span className="block text-[#FF5A1F]">Habits Build Consistency.</span>
          </h2>
          <p className="mt-9 font-display text-[15px] uppercase tracking-[0.1em] text-[#c9cdd4]">
            Prepare. Perform. Recover.
          </p>
          <Logo variant="light" size="md" className="mx-auto mt-6" />
        </Reveal>
      </section>

      {/* 11. Final CTA */}
      <section className="px-6 py-28 text-center lg:py-32">
        <Reveal className="mx-auto max-w-[640px]">
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.875rem)] font-bold uppercase leading-tight tracking-[-0.01em]">
            What Does Your Game Need Next?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-[#454b54]">
            Take the 60-second Clutch Score and discover your biggest performance opportunity.
          </p>
          <div className="mt-8">
            <Btn onClick={onGetScore} className="px-8 py-4 text-sm">
              Get My Clutch Score
            </Btn>
          </div>
          <p className="mt-4 text-[13px] text-[#767f8c]">
            About 60 seconds. No equipment required.
          </p>
          <p className="mt-10 font-display text-[13px] uppercase tracking-[0.14em] text-[#767f8c]">
            Prepare. Perform. Recover.
          </p>
        </Reveal>
      </section>

      <SiteFooter />

      {/* Mobile sticky CTA */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center border-t border-white/10 bg-[rgba(11,13,16,0.97)] p-3 backdrop-blur-sm md:hidden">
        <Btn onClick={onGetScore} className="pointer-events-auto w-full max-w-sm justify-center">
          Get My Clutch Score
        </Btn>
      </div>
    </div>
  );
}
