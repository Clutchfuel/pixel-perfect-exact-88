import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

type Variant = "primary" | "dark" | "ghost" | "ghost-dark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 will-change-transform select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  md: "h-12 px-6 text-sm min-w-[160px]",
  lg: "h-14 px-8 text-base min-w-[200px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-lime text-ink hover:bg-lime-dark hover:-translate-y-0.5 shadow-[0_8px_30px_-8px_oklch(0.92_0.18_130/0.6)] hover:shadow-[0_12px_40px_-8px_oklch(0.92_0.18_130/0.8)]",
  dark: "bg-ink text-white hover:bg-ink/90 hover:-translate-y-0.5",
  ghost:
    "bg-transparent text-ink border border-ink/15 hover:border-ink/40 hover:bg-ink/[0.03]",
  "ghost-dark":
    "bg-transparent text-white border border-white/20 hover:border-white/50 hover:bg-white/5",
};

interface CFButtonProps {
  variant?: Variant;
  size?: Size;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  children: ReactNode;
  className?: string;
}

export function CFButton({
  variant = "primary",
  size = "md",
  to,
  href,
  onClick,
  type = "button",
  children,
  className,
}: CFButtonProps) {
  const cls = cn(base, sizes[size], variants[variant], className);
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
