import logoAsset from "@/assets/clutchfuel-logo-white.png.asset.json";

type Props = {
  category: string;
  title?: string;
  className?: string;
  /** compact = card usage, hero = full article header */
  variant?: "compact" | "hero";
};

/**
 * Editorial cover used for article cards. Matches the template used on the
 * article header: dark background, repeating outlined category text on the
 * left, big outlined "clutchfuel" wordmark on the right.
 */
export function ArticleCover({ category, title, className = "", variant = "compact" }: Props) {
  const rows = variant === "compact" ? 5 : 8;
  return (
    <div
      className={`relative overflow-hidden bg-[#0a0a0a] text-white ${className}`}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      aria-label={title ? `${category}: ${title}` : undefined}
    >
      {/* Repeating category name */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-1 -rotate-6 opacity-[0.22] leading-none select-none"
      >
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="whitespace-nowrap font-extrabold uppercase tracking-tight"
            style={{
              WebkitTextStroke: "1px #c1ff00",
              color: "transparent",
              fontSize: variant === "compact" ? "3.5rem" : "9vw",
              transform: `translateX(${(i % 2) * -6}%)`,
            }}
          >
            {`${category} ${category} ${category} ${category}`}
          </div>
        ))}
      </div>

      {/* Outlined clutchfuel wordmark on the right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-[-8%] flex w-[55%] items-center overflow-hidden select-none"
      >
        <div
          className="flex flex-col leading-[0.82] font-extrabold lowercase tracking-tighter"
          style={{
            WebkitTextStroke: "1px #c1ff00",
            color: "transparent",
            fontSize: variant === "compact" ? "8rem" : "18vw",
          }}
        >
          <span>clutch</span>
          <span>fuel</span>
        </div>
      </div>

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 85% 40%, rgba(255,255,255,0.06), transparent 60%)",
        }}
      />

      {/* Foreground label (only on compact cards) */}
      {variant === "compact" && (
        <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <img src={logoAsset.url} alt="ClutchFuel" className="h-4 w-auto no-bw" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/80">
              Insights
            </span>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-electric">
              {category}
            </p>
            <div className="mt-1 h-px w-8 bg-electric" />
          </div>
        </div>
      )}
    </div>
  );
}
