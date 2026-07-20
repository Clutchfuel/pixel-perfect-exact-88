import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

type ScoreRingProps = {
  score: number;
  size?: number;
  stroke?: number;
};

/** Solid animated Clutch Score ring — used in marketing samples. */
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
    <div className="relative mx-auto" style={{ width: size, maxWidth: "100%", aspectRatio: "1 / 1" }}>
      <div
        className="pointer-events-none absolute inset-[-20%] rounded-full transition-opacity duration-700"
        style={{
          opacity: settled ? 1 : 0.45,
          background:
            "radial-gradient(circle, rgba(193,255,0,0.28) 0%, rgba(193,255,0,0.08) 38%, transparent 68%)",
        }}
        aria-hidden
      />
      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
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

export type BehaviorSegment = {
  id: string;
  color: string;
  /** 0–1 how filled this segment should be */
  fill: number;
};

/** Soft tint of a hex color for the unused portion of a behavior arc. */
function lightShade(hex: string, alpha = 0.22): string {
  const raw = hex.replace("#", "");
  if (raw.length !== 3 && raw.length !== 6) return `rgba(255,255,255,${alpha})`;
  const full =
    raw.length === 3
      ? raw
          .split("")
          .map((ch) => ch + ch)
          .join("")
      : raw;
  const r = Number.parseInt(full.slice(0, 2), 16);
  const g = Number.parseInt(full.slice(2, 4), 16);
  const b = Number.parseInt(full.slice(4, 6), 16);
  if ([r, g, b].some((n) => Number.isNaN(n))) return `rgba(255,255,255,${alpha})`;
  return `rgba(${r},${g},${b},${alpha})`;
}

type SegmentedRingProps = {
  score: number;
  segments: BehaviorSegment[];
  size?: number;
  stroke?: number;
  /** When false, only the behavior segments animate (no center score). */
  showScore?: boolean;
};

/** Five-behavior segmented ring for goal-alignment Clutch Score results. */
export function SegmentedClutchRing({
  score,
  segments,
  size = 260,
  stroke = 18,
  showScore = true,
}: SegmentedRingProps) {
  const reduce = useReducedMotion();
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const gap = c * 0.02;
  const usable = c - gap * segments.length;
  const segmentLen = usable / Math.max(1, segments.length);

  const [display, setDisplay] = useState(0);
  const [progress, setProgress] = useState(reduce ? 1 : 0);

  useEffect(() => {
    if (reduce) {
      setDisplay(score);
      setProgress(1);
      return;
    }

    const duration = 1100;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(score * eased));
      setProgress(eased);
      if (t < 1) frame = window.requestAnimationFrame(tick);
      else {
        setDisplay(score);
        setProgress(1);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [score, reduce]);

  let cursor = gap / 2;

  return (
    <div className="relative mx-auto" style={{ width: size, maxWidth: "100%", aspectRatio: "1 / 1" }}>
      <div
        className="pointer-events-none absolute inset-[-18%] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(193,255,0,0.16) 0%, transparent 65%)",
        }}
        aria-hidden
      />
      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        {segments.map((seg) => {
          const start = cursor;
          cursor += segmentLen + gap;
          const filled = Math.max(0.04, Math.min(1, seg.fill)) * progress * segmentLen;
          const track = segmentLen;
          return (
            <g key={seg.id}>
              <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={lightShade(seg.color)}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={`${track} ${c - track}`}
                strokeDashoffset={-start}
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={seg.color}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={`${filled} ${c - filled}`}
                strokeDashoffset={-start}
                style={{ filter: `drop-shadow(0 0 6px ${seg.color}66)` }}
              />
            </g>
          );
        })}
      </svg>
      {showScore ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-6xl font-extrabold tracking-tight text-white tabular-nums sm:text-7xl">
            {display}
          </span>
          <span className="mt-1 text-[11px] font-medium uppercase tracking-[0.28em] text-white/45">
            Clutch Score
          </span>
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
            Behavior Mix
          </span>
        </div>
      )}
    </div>
  );
}
