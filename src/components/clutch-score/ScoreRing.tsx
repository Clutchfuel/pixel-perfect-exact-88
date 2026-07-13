import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

type ScoreRingProps = {
  score: number;
  /** Ring diameter in px. Default 240. */
  size?: number;
  /** Ring stroke width in px. Default 16. */
  stroke?: number;
};

/** Animated neon Clutch Score ring — shared across assessment results and marketing samples. */
export function ScoreRing({ score, size = 240, stroke = 16 }: ScoreRingProps) {
  const reduce = useReducedMotion();
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const [display, setDisplay] = useState(0);
  const [offset, setOffset] = useState(c);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    setSettled(false);
    if (reduce) {
      setDisplay(score);
      setOffset(c - (score / 100) * c);
      setSettled(true);
      return;
    }

    const duration = 1000;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(score * eased);
      setDisplay(value);
      setOffset(c - (value / 100) * c);
      if (t < 1) {
        frame = window.requestAnimationFrame(tick);
      } else {
        setDisplay(score);
        setOffset(c - (score / 100) * c);
        setSettled(true);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [score, c, reduce]);

  const numberClass =
    size >= 220
      ? "text-6xl font-extrabold tracking-tight text-white tabular-nums sm:text-7xl"
      : "text-5xl font-extrabold tracking-tight text-white tabular-nums";

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <div
        className="pointer-events-none absolute inset-[-20%] rounded-full transition-opacity duration-700"
        style={{
          opacity: settled ? 1 : 0.45,
          background:
            "radial-gradient(circle, rgba(193,255,0,0.28) 0%, rgba(193,255,0,0.08) 38%, transparent 68%)",
        }}
        aria-hidden
      />
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#c1ff00"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{
            filter: settled
              ? "drop-shadow(0 0 14px rgba(193,255,0,0.7))"
              : "drop-shadow(0 0 6px rgba(193,255,0,0.35))",
            transition: "filter 0.6s ease",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={numberClass}>{display}</span>
        <span className="mt-1 text-[11px] font-medium uppercase tracking-[0.28em] text-white/45">
          Clutch Score
        </span>
      </div>
    </div>
  );
}
