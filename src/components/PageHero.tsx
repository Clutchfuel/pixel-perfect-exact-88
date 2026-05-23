import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  sub?: string;
  theme?: "light" | "dark";
  align?: "left" | "center";
  children?: ReactNode;
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  sub,
  theme = "light",
  align = "left",
  children,
  className,
}: PageHeroProps) {
  const isDark = theme === "dark";
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-44 lg:pb-24",
        isDark ? "bg-dark text-white" : "bg-background text-ink",
        className
      )}
    >
      {isDark && (
        <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-lime/15 blur-[140px]" />
      )}
      <div
        className={cn(
          "relative mx-auto w-full max-w-5xl px-6 md:px-10",
          align === "center" && "text-center"
        )}
      >
        {eyebrow && (
          <Reveal>
            <div
              className={cn(
                "tracking-eyebrow text-xs font-semibold uppercase",
                isDark ? "text-lime" : "text-muted-ink"
              )}
            >
              {eyebrow}
            </div>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h1
            className={cn(
              "mt-4 font-display text-4xl font-extrabold tracking-display sm:text-5xl lg:text-[72px] lg:leading-[1.02]",
              isDark ? "text-white" : "text-ink"
            )}
          >
            {title}
          </h1>
        </Reveal>
        {sub && (
          <Reveal delay={0.12}>
            <p
              className={cn(
                "mt-6 max-w-2xl text-lg md:text-xl",
                align === "center" && "mx-auto",
                isDark ? "text-muted-dark" : "text-muted-ink"
              )}
            >
              {sub}
            </p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.18}>
            <div className={cn("mt-8", align === "center" && "flex justify-center")}>{children}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
