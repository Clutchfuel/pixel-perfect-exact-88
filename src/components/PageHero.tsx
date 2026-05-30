import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { OptimizedImage } from "./OptimizedImage";
import type { ImageSet } from "@/assets/image-sets";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  sub?: string;
  theme?: "light" | "dark";
  align?: "left" | "center";
  children?: ReactNode;
  className?: string;
  /** @deprecated Use heroImage for AVIF/WebP support */
  bgImage?: string;
  heroImage?: ImageSet;
  bgImageAlt?: string;
}

export function PageHero({
  eyebrow,
  title,
  sub,
  theme = "light",
  align = "left",
  children,
  className,
  bgImage,
  heroImage,
  bgImageAlt = "",
}: PageHeroProps) {
  const hasBg = Boolean(bgImage || heroImage);
  const isDark = theme === "dark";
  const lightHero = hasBg && !isDark;

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-44 lg:pb-24",
        isDark ? "bg-dark text-white" : "bg-white text-ink",
        className,
      )}
    >
      {heroImage && (
        <>
          <OptimizedImage
            avif={heroImage.avif}
            webp={heroImage.webp}
            fallback={heroImage.fallback}
            alt={bgImageAlt}
            className={cn(
              "pointer-events-none absolute inset-0 h-full w-full object-cover",
              lightHero ? "opacity-30" : "opacity-50",
            )}
            width={1920}
            height={1080}
            priority
          />
          {lightHero ? (
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-white/75 to-white" />
          ) : (
            <>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-dark/30" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-dark/40" />
            </>
          )}
        </>
      )}
      {bgImage && !heroImage && (
        <>
          <img
            src={bgImage}
            alt={bgImageAlt}
            className={cn(
              "pointer-events-none absolute inset-0 h-full w-full object-cover",
              lightHero ? "opacity-30" : "opacity-50",
            )}
            loading="eager"
            width={1920}
            height={1080}
          />
          {lightHero ? (
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-white/75 to-white" />
          ) : (
            <>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-dark/30" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-dark/40" />
            </>
          )}
        </>
      )}
      {isDark && !hasBg && (
        <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-lime/15 blur-[140px]" />
      )}
      <div
        className={cn(
          "relative mx-auto w-full max-w-5xl px-6 md:px-10",
          align === "center" && "text-center",
        )}
      >
        {eyebrow && (
          <Reveal>
            <div
              className={cn(
                "tracking-eyebrow text-xs font-semibold uppercase",
                isDark ? "text-lime" : "text-muted-ink",
              )}
            >
              {eyebrow}
            </div>
          </Reveal>
        )}
        <h1
          className={cn(
            "mt-4 font-display text-4xl font-extrabold tracking-display sm:text-5xl lg:text-[72px] lg:leading-[1.02]",
            isDark ? "text-white" : "text-ink",
          )}
        >
          {title}
        </h1>
        {sub && (
          <Reveal delay={0.12}>
            <p
              className={cn(
                "mt-6 max-w-2xl text-lg md:text-xl",
                align === "center" && "mx-auto",
                isDark ? "text-muted-dark" : "text-muted-ink",
              )}
            >
              {sub}
            </p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.18}>
            <div className={cn("mt-8", align === "center" && "flex justify-center")}>
              {children}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
