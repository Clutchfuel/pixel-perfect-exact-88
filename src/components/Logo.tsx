type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

/** Wordmark aspect ratio from public/logo-white.png (841×142) */
const WORDMARK_WIDTH = 841;
const WORDMARK_HEIGHT = 142;

const sizeClass = {
  sm: "h-5 sm:h-6",
  md: "h-6 sm:h-7",
  lg: "h-7 sm:h-8",
} as const;

export function Logo({ className = "", size = "md" }: LogoProps) {
  return (
    <img
      src="/logo-white.png"
      alt="ClutchFuel"
      width={WORDMARK_WIDTH}
      height={WORDMARK_HEIGHT}
      className={`${sizeClass[size]} w-auto shrink-0 select-none ${className}`}
      decoding="async"
      draggable={false}
    />
  );
}
