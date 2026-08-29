import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";

const NAV = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#clutch-score", label: "Clutch Score" },
  { href: "#athletes", label: "Athletes" },
  { href: "#coaches", label: "Teams" },
  { href: "#about", label: "About" },
] as const;

type SiteHeaderProps = {
  onGetScore: () => void;
};

export function SiteHeader({ onGetScore }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled || open
          ? "border-white/10 bg-[#0B0D10]/94 backdrop-blur-md"
          : "border-transparent bg-[#0B0D10]/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-5 sm:h-[4.5rem] sm:px-8">
        <a href="#" aria-label="ClutchFuel home" className="shrink-0">
          <Logo size="md" variant="light" />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] font-semibold tracking-[0.02em] text-[#c9cdd4] transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onGetScore}
            className="hidden rounded-full bg-[#FF5A1F] px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.04em] text-white shadow-[0_10px_24px_-10px_rgba(255,90,31,0.7)] transition hover:bg-[#D4460F] md:inline-flex"
          >
            Get My Score
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#0B0D10] lg:hidden">
          <nav
            className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-5 py-6"
            aria-label="Mobile"
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onGetScore();
              }}
              className="mt-4 w-full rounded-full bg-[#FF5A1F] px-5 py-3.5 text-center font-display text-sm font-semibold uppercase tracking-[0.04em] text-white"
            >
              Get My Score
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
