type PillarRingProps = {
  score: number;
  label: string;
  /** Accent when score is lowest pillar — uses cyan per mockup */
  accent?: "orange" | "cyan";
  size?: number;
};

/** Conic-gradient pillar score ring from quiz mockup. */
export function PillarRing({ score, label, accent = "orange", size = 72 }: PillarRingProps) {
  const color = accent === "cyan" ? "#1FB6D6" : "#FF5A1F";
  const track = "rgba(255,255,255,0.1)";

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative flex items-center justify-center rounded-full font-display text-lg font-bold tabular-nums text-white"
        style={{
          width: size,
          height: size,
          background: `conic-gradient(${color} 0 ${score}%, ${track} ${score}% 100%)`,
        }}
      >
        <div
          className="flex items-center justify-center rounded-full bg-[#0B0D10]"
          style={{ width: size - 14, height: size - 14 }}
        >
          {score}
        </div>
      </div>
      <span className="font-display text-[11px] uppercase tracking-[0.08em] text-white/50">
        {label}
      </span>
    </div>
  );
}
