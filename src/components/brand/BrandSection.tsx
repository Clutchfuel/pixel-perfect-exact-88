import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Tone = "base" | "secondary" | "card";

const tones: Record<Tone, string> = {
  base: "bg-brand-base text-white",
  secondary: "bg-brand-secondary text-white",
  card: "bg-brand-base text-white",
};

export function BrandSection({
  id,
  tone = "base",
  className,
  children,
  bleed,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
  bleed?: boolean;
}) {
  return (
    <section id={id} className={cn(tones[tone], "py-16 md:py-24 lg:py-28", className)}>
      <div className={cn(bleed ? "w-full" : "mx-auto w-full max-w-7xl px-6 md:px-10")}>
        {children}
      </div>
    </section>
  );
}

export function BrandEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-muted">{children}</p>
  );
}

export function BrandHeadline({
  children,
  className,
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "font-display text-3xl font-extrabold tracking-display text-white sm:text-4xl lg:text-5xl",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function BrandCard({
  children,
  className,
  href,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
}) {
  const cls = cn(
    "rounded-2xl border border-white/[0.08] bg-brand-card p-6 transition duration-300 md:p-8",
    href && "hover:border-brand-accent/30 hover:bg-brand-card/90",
    className,
  );
  if (href) {
    return (
      <a href={href} className={cn(cls, "block no-underline")}>
        {children}
      </a>
    );
  }
  return <div className={cls}>{children}</div>;
}
