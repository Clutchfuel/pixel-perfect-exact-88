import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";

const NAV = [
  { href: "#clutch-score", label: "Clutch Score" },
  { href: "#athletes", label: "Athletes" },
  { href: "#parents", label: "Parents" },
  { href: "#teams", label: "Teams" },
  { href: "#learn", label: "Learn" },
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-[#050505]/95 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:h-[4.5rem] sm:px-8">
        <a href="#" aria-label="ClutchFuel home" className="shrink-0">
          <Logo size="md" />
        </a>

        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/65 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onGetScore}
            className="hidden rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-background transition hover:bg-lime-dark md:inline-flex"
          >
            Get Your Score
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
        <div className="border-t border-white/10 bg-[#050505] lg:hidden">
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
              className="mt-4 w-full rounded-full bg-lime px-5 py-3.5 text-center text-sm font-semibold text-background"
            >
              Get Your Score
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
