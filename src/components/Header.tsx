import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Zap } from "lucide-react";
import { CFButton } from "./CFButton";
import { navLinks, site } from "@/data/site";
import { cn } from "@/lib/utils";

interface HeaderProps {
  // If true, header starts transparent over a dark area (e.g. dark hero).
  // Default: transparent over light hero, transitions to white blurred on scroll.
  overDark?: boolean;
}

export function Header({ overDark = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;
  const textCls = solid ? "text-ink" : overDark ? "text-white" : "text-ink";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          solid
            ? "bg-white/85 backdrop-blur-xl border-b border-ink/5"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 md:h-20 md:px-10">
          <Link to="/" className={cn("flex items-center gap-2 font-display text-xl font-extrabold tracking-display", textCls)} aria-label="ClutchFuel home">
            {/* Logo placeholder — wordmark PNG drops in here later */}
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-ink text-lime">
              <Zap className="h-4 w-4" fill="currentColor" strokeWidth={0} />
            </span>
            <span>CLUTCHFUEL</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:opacity-70",
                  textCls
                )}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <CFButton to={site.ctaHref} variant="primary" size="md">
              {site.primaryCta}
            </CFButton>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full border lg:hidden",
              solid ? "border-ink/15 text-ink" : overDark ? "border-white/30 text-white" : "border-ink/15 text-ink"
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-white transition-opacity duration-300 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div className="flex h-full flex-col px-6 pt-24 pb-10">
          <nav className="flex flex-col gap-2">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-extrabold tracking-display text-ink py-3 border-b border-ink/5"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto">
            <CFButton to={site.ctaHref} variant="primary" size="lg" className="w-full">
              {site.primaryCta}
            </CFButton>
          </div>
        </div>
      </div>
    </>
  );
}
