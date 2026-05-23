import { Zap, Instagram, Youtube } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { footer, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-display text-2xl font-extrabold tracking-display text-white"
              aria-label="ClutchFuel home"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-lime text-ink">
                <Zap className="h-5 w-5" fill="currentColor" strokeWidth={0} />
              </span>
              CLUTCHFUEL
            </Link>
            <p className="mt-6 max-w-sm font-display text-2xl font-extrabold tracking-display text-white md:text-3xl">
              {site.tagline}
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 flex w-full max-w-md items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 backdrop-blur"
            >
              <input
                type="email"
                aria-label="Email"
                placeholder={footer.emailPlaceholder}
                className="flex-1 bg-transparent px-4 text-base text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-lime px-5 py-3 text-sm font-semibold text-ink transition hover:bg-lime-dark"
              >
                {footer.emailCta}
              </button>
            </form>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 lg:col-span-8">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <div className="tracking-eyebrow text-xs font-semibold uppercase text-lime">
                  {col.title}
                </div>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        className="text-sm text-white/70 transition hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Instagram" className="text-white/60 transition hover:text-lime">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" aria-label="YouTube" className="text-white/60 transition hover:text-lime">
              <Youtube className="h-5 w-5" />
            </a>
            <a href="#" aria-label="TikTok" className="text-sm text-white/60 transition hover:text-lime">
              TikTok
            </a>
            <a href="#" aria-label="X" className="text-sm text-white/60 transition hover:text-lime">
              X
            </a>
          </div>
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} ClutchFuel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
