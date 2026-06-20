type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

/**
 * public/logo-white.png is a JPEG wordmark with large vertical padding.
 * We crop to the center band via overflow + offset so header height maps to readable text.
 */
const sizeClass = {
  sm: { frame: "h-6 w-[112px]", image: "h-[4.5rem] -mt-6" },
  md: { frame: "h-7 w-[130px]", image: "h-[5.25rem] -mt-7" },
  lg: { frame: "h-8 w-[148px]", image: "h-24 -mt-8" },
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
