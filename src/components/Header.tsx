import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { CFButton } from "./CFButton";
import { Logo } from "./Logo";
import { navLinks, site } from "@/data/site";
import { useAthleteSession } from "@/hooks/use-athlete-session";
import { cn } from "@/lib/utils";

interface HeaderProps {
  overDark?: boolean;
}

const MENU_ID = "mobile-nav-menu";

export function Header({ overDark = false }: HeaderProps) {
  const loggedIn = useAthleteSession();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (!open) return;

    const menu = menuRef.current;
    const focusable = menu?.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled]), input:not([disabled])",
    );
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];
    first?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !focusable?.length) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const solid = scrolled || open;
  const textCls = "text-white";

  const NavItem = ({ l }: { l: (typeof navLinks)[number] }) =>
    l.external ? (
      <a
        href={l.to}
        className={cn("text-sm font-medium transition-colors hover:text-lime", textCls)}
      >
        {l.label}
      </a>
    ) : (
      <Link
        to={l.to}
        className={cn("text-sm font-medium transition-colors hover:text-lime", textCls)}
        activeProps={{
          className: "text-lime underline underline-offset-8 decoration-lime decoration-2",
        }}
      >
        {l.label}
      </Link>
    );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          solid
            ? "bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-[4.5rem] w-full max-w-7xl items-center justify-between px-6 md:h-[5.25rem] md:px-10">
          <Link
            to="/"
            className="group inline-flex shrink-0 items-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2"
            aria-label="ClutchFuel home"
          >
            <Logo
              variant="light"
              size="lg"
              compact
              className="transition-opacity group-hover:opacity-90"
            />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
            {navLinks.map((l) => (
              <NavItem key={l.label} l={l} />
            ))}
          </nav>

          <div className="hidden lg:block">
            <CFButton
              href={loggedIn ? site.sessionHref : site.ctaHref}
              variant="primary"
              size="md"
            >
              {loggedIn ? site.addSessionCta : site.primaryCta}
            </CFButton>
          </div>

          <button
            ref={toggleRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={MENU_ID}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full border lg:hidden",
              "border-white/30 text-white",
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <div
        ref={menuRef}
        id={MENU_ID}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={cn(
          "fixed inset-0 z-40 bg-[#0A0A0A] transition-opacity duration-300 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex h-full flex-col overflow-y-auto px-6 pt-24 pb-10">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {navLinks.map((l) =>
              l.external ? (
                <a
                  key={l.label}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/10 py-3 text-2xl font-bold tracking-tight text-white"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/10 py-3 text-2xl font-bold tracking-tight text-white"
                >
                  {l.label}
                </Link>
              ),
            )}
            <Link
              to="/insights"
              onClick={() => setOpen(false)}
              className="mt-4 text-sm text-muted-ink"
            >
              View all hydration articles →
            </Link>
          </nav>
          <div className="mt-10">
            <CFButton
              href={loggedIn ? site.sessionHref : site.ctaHref}
              variant="primary"
              size="lg"
              className="w-full"
            >
              {loggedIn ? site.addSessionCta : site.primaryCta}
            </CFButton>
          </div>
        </div>
      </div>
    </>
  );
}
