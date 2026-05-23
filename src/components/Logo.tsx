import { useId } from "react";
import { cn } from "@/lib/utils";

type LogoVariant = "dark" | "light";
type LogoSize = "sm" | "md" | "lg";

interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
  showWordmark?: boolean;
  /** Hide the small tagline under the wordmark (header) */
  compact?: boolean;
}

const sizes: Record<
  LogoSize,
  { mark: number; text: string; sub: string; gap: string; tracking: string }
> = {
  sm: {
    mark: 32,
    text: "text-lg",
    sub: "text-[10px]",
    gap: "gap-2",
    tracking: "tracking-[-0.04em]",
  },
  md: {
    mark: 44,
    text: "text-[1.35rem] md:text-[1.65rem]",
    sub: "text-[11px]",
    gap: "gap-2.5",
    tracking: "tracking-[-0.045em]",
  },
  lg: {
    mark: 56,
    text: "text-[1.55rem] md:text-[1.95rem]",
    sub: "text-xs",
    gap: "gap-3",
    tracking: "tracking-[-0.05em]",
  },
};

export function Logo({
  variant = "dark",
  size = "md",
  className,
  showWordmark = true,
  compact = false,
}: LogoProps) {
  const s = sizes[size];
  const ink = variant === "dark" ? "var(--ink)" : "#ffffff";
  const muted = variant === "dark" ? "var(--muted-ink)" : "oklch(1 0 0 / 0.55)";

  return (
    <span className={cn("inline-flex items-center", s.gap, className)}>
      <LogoMark size={s.mark} variant={variant} />
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className={cn("font-display font-black uppercase", s.text, s.tracking)} aria-hidden>
            <span style={{ color: ink }}>Clutch</span>
            <span className="text-lime">Fuel</span>
          </span>
          <span
            className={cn(
              "mt-0.5 font-semibold uppercase tracking-eyebrow",
              s.sub,
              compact && "hidden",
            )}
            style={{ color: muted }}
          >
            Performance hydration
          </span>
        </span>
      )}
    </span>
  );
}

function LogoMark({ size, variant }: { size: number; variant: LogoVariant }) {
  const gradId = useId();
  const ink = variant === "dark" ? "var(--ink)" : "#ffffff";
  const lime = "var(--lime)";
  const panel = variant === "dark" ? "var(--dark)" : "oklch(1 0 0 / 0.12)";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="shrink-0 drop-shadow-[0_2px_8px_oklch(0_0_0/0.12)]"
    >
      <defs>
        <linearGradient id={gradId} x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="oklch(0.92 0.22 128)" />
          <stop offset="0.55" stopColor={lime} />
          <stop offset="1" stopColor="oklch(0.78 0.2 132)" />
        </linearGradient>
      </defs>
      <rect x="2.5" y="2.5" width="43" height="43" rx="12" fill={panel} />
      <rect
        x="2.5"
        y="2.5"
        width="43"
        height="43"
        rx="12"
        stroke={variant === "dark" ? "oklch(0 0 0 / 0.1)" : "oklch(1 0 0 / 0.22)"}
        strokeWidth="1"
      />
      <path d="M2.5 17.5V2.5h15a12 12 0 0 0-15 15Z" fill={`url(#${gradId})`} />
      <path d="M28.5 8.5 19.8 24.5h5.8l-2.4 15.2 13.1-18.5h-6.7l-1.7-12.7Z" fill={ink} />
      <path
        d="M13.5 31.5c0-3.2 2.7-5.8 2.7-5.8s2.7 2.6 2.7 5.8a2.7 2.7 0 1 1-5.4 0Z"
        fill={`url(#${gradId})`}
      />
      <circle cx="38.5" cy="9.5" r="2.75" fill={lime} />
      <circle
        cx="38.5"
        cy="9.5"
        r="1.1"
        fill={variant === "dark" ? "var(--dark)" : "oklch(0.2 0 0)"}
        opacity={0.35}
      />
    </svg>
  );
}
