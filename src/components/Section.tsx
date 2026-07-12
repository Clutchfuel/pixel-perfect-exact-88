import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  theme?: "light" | "dark" | "mist";
  bleed?: boolean;
  children: ReactNode;
}

export function Section({
  theme = "light",
  bleed = false,
  className,
  children,
  ...rest
}: SectionProps) {
  const themeClass =
    theme === "dark"
      ? "bg-dark text-white"
      : theme === "mist"
        ? "bg-mist text-ink"
        : "bg-background text-ink";
  return (
    <section
      className={cn("relative w-full", themeClass, "py-20 md:py-28 lg:py-36", className)}
      {...rest}
    >
      <div className={cn(bleed ? "w-full" : "mx-auto w-full max-w-7xl px-6 md:px-10")}>
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <div
      className={cn(
        "tracking-eyebrow text-xs font-semibold uppercase",
        accent ? "text-lime" : "text-muted-ink",
      )}
    >
      {children}
    </div>
  );
}
