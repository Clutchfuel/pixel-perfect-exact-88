import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Badge({
  children,
  variant = "light",
  className,
}: {
  children: ReactNode;
  variant?: "light" | "dark" | "lime";
  className?: string;
}) {
  const base =
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide";
  const styles =
    variant === "dark"
      ? "bg-white/10 text-white border border-white/15"
      : variant === "lime"
        ? "bg-lime/15 text-ink border border-lime/40"
        : "bg-ink/5 text-ink border border-ink/10";
  return (
    <span className={cn(base, styles, className)}>
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          variant === "lime" ? "bg-lime" : "bg-lime"
        )}
      />
      {children}
    </span>
  );
}
