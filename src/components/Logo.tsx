type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClass = {
  sm: "h-5 max-w-[108px]",
  md: "h-7 max-w-[148px]",
  lg: "h-9 max-w-[180px]",
} as const;

export function Logo({ className = "", size = "md" }: LogoProps) {
  return (
    <img
      src="/logo-white.png"
      alt="ClutchFuel"
      width={148}
      height={28}
      className={`${sizeClass[size]} w-auto shrink-0 object-contain object-left select-none ${className}`}
      draggable={false}
    />
  );
}
