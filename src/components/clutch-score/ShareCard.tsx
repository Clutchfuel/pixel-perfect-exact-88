import { Logo } from "@/components/Logo";
import type { PillarScores } from "@/lib/clutch-score-assessment";

type ShareCardProps = {
  overall: number;
  pillars: PillarScores;
  opportunityTitle: string;
  /** When true, renders at full 1080×1920 for export; otherwise scales for inline preview. */
  exportMode?: boolean;
};

const PILLAR_LABELS: { key: keyof PillarScores; label: string }[] = [
  { key: "prepare", label: "Prepare" },
  { key: "perform", label: "Perform" },
  { key: "recover", label: "Recover" },
];

/** Instagram Story share card — 1080×1920 layout from mockup. */
export function ShareCard({
  overall,
  pillars,
  opportunityTitle,
  exportMode = false,
}: ShareCardProps) {
  const wrapperClass = exportMode
    ? "relative h-[1920px] w-[1080px] overflow-hidden"
    : "relative mx-auto aspect-[9/16] w-full max-w-[340px] overflow-hidden rounded-2xl";

  return (
    <div className={wrapperClass}>
      <div
        className="absolute inset-0 bg-[#0B0D10]"
        style={{
          background: "linear-gradient(165deg, #12151a 0%, #0B0D10 60%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-[20%] -top-[10%] h-[70%] w-[90%] rounded-full border-[3px] border-white/5"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-[20%] -left-[25%] h-[60%] w-[80%] rounded-full border-[3px] border-[#ff5a1f]/15"
        aria-hidden
      />

      <div className="relative z-10 flex h-full flex-col px-10 pb-16 pt-14 text-white">
        <Logo size="lg" variant="light" className="mb-16" />

        <p className="font-display text-sm uppercase tracking-[0.16em] text-[#8b93a0]">
          My Clutch Score
        </p>
        <p className="font-display text-[clamp(5rem,22vw,340px)] font-bold leading-[0.92] text-[#ff5a1f]">
          {overall}
        </p>

        <div className="mb-10 grid grid-cols-3 gap-3">
          {PILLAR_LABELS.map(({ key, label }) => (
            <div
              key={key}
              className="rounded-3xl border border-white/10 bg-white/5 px-2 py-6 text-center"
            >
              <p className="font-display text-4xl font-bold tabular-nums sm:text-5xl">
                {pillars[key]}
              </p>
              <p className="mt-2 font-display text-xs uppercase tracking-[0.08em] text-[#8b93a0]">
                {label}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-auto rounded-3xl border border-[#ff5a1f]/40 bg-[#ff5a1f]/12 px-8 py-8">
          <p className="font-display text-sm uppercase tracking-[0.1em] text-[#ffb894]">
            Biggest Opportunity
          </p>
          <p className="mt-2 font-display text-3xl font-bold uppercase">{opportunityTitle}</p>
        </div>

        <div className="mt-12">
          <p className="font-display text-lg uppercase tracking-[0.1em]">
            Prepare. Perform. Recover.
          </p>
          <p className="mt-2 font-display text-base uppercase tracking-[0.08em] text-[#8b93a0]">
            clutchfuel.com
          </p>
        </div>
      </div>
    </div>
  );
}
