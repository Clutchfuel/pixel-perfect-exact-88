export function ScoreRing({ value, label }: { value: number; label: string }) {
  const r = 70;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;

  return (
    <div className="relative h-44 w-44 sm:h-52 sm:w-52">
      <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
        <circle cx="80" cy="80" r={r} stroke="oklch(1 0 0 / 0.08)" strokeWidth="10" fill="none" />
        <circle
          cx="80"
          cy="80"
          r={r}
          stroke="oklch(0.92 0.18 130)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ filter: "drop-shadow(0 0 12px oklch(0.92 0.18 130 / 0.6))" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-display text-6xl font-extrabold tracking-display text-white sm:text-7xl">
          {value}
        </div>
        <div className="mt-1 text-[11px] uppercase tracking-eyebrow text-muted-dark">{label}</div>
      </div>
    </div>
  );
}
