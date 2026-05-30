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

const heights: Record<LogoSize, string> = {
  sm: "h-6",
  md: "h-7 md:h-8",
  lg: "h-8 md:h-9 lg:h-10",
};

/** Wordmark aspect ratio from logo-white.png (841×142) */
const WORDMARK_WIDTH = 841;
const WORDMARK_HEIGHT = 142;

export function Logo({
  variant = "dark",
  size = "md",
  className,
  showWordmark = true,
  compact = false,
}: LogoProps) {
  if (!showWordmark) return null;

  const src = variant === "light" ? "/logo-white.png" : "/logo-dark.png";
  const muted = variant === "dark" ? "var(--muted-ink)" : "oklch(1 0 0 / 0.55)";

  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <img
        src={src}
        alt="ClutchFuel"
        width={WORDMARK_WIDTH}
        height={WORDMARK_HEIGHT}
        className={cn("w-auto shrink-0", heights[size])}
        decoding="async"
      />
      {!compact && (
        <span
          className="mt-1.5 text-[10px] font-semibold uppercase tracking-eyebrow md:text-[11px]"
          style={{ color: muted }}
        >
          Performance hydration
        </span>
      )}
    </span>
  );
}
