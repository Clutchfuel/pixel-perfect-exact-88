import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/performance-hub", label: "Performance Hub" },
  { to: "/community", label: "Community" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "glass-header" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Link to="/" aria-label="ClutchFuel home" className="shrink-0">
          <Logo size="md" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => {
            const active =
              item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm font-medium transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/clutch-score"
            className="hidden rounded-full bg-electric px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-electric-dark md:inline-flex"
          >
            Take the Clutch Score
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-foreground lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-black/10 bg-background/95 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-5 py-6">
            {NAV.map((item) => {
              const active =
                item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`rounded-xl px-4 py-3 text-base font-medium transition ${
                    active ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/clutch-score"
              className="mt-3 rounded-full bg-electric px-5 py-3 text-center text-sm font-semibold text-black"
            >
              Take the Clutch Score
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
