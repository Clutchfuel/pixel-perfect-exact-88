type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

/**
 * public/logo-white.png is a JPEG wordmark with large vertical padding.
 * We crop to the center band via overflow + offset so header height maps to readable text.
 */
const sizeClass = {
  sm: { frame: "h-8 w-[150px]", image: "h-[6rem] -mt-8" },
  md: { frame: "h-10 w-[185px]", image: "h-[7.5rem] -mt-10" },
  lg: { frame: "h-12 w-[222px]", image: "h-[9rem] -mt-12" },
} as const;

export function Logo({ className = "", size = "md" }: LogoProps) {
  const s = sizeClass[size];

  return (
    <span
      className={`inline-flex shrink-0 items-start justify-start overflow-hidden ${s.frame} ${className}`}
    >
      <img
        src="/logo-white.png"
        alt="ClutchFuel"
        className={`${s.image} w-auto max-w-none select-none`}
        decoding="async"
        draggable={false}
      />
    </span>
  );
}
