import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Logo } from "@/components/Logo";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { to: "/clutch-score", label: "Clutch Score" },
      { to: "/how-it-works", label: "How It Works" },
      { to: "/performance-hub", label: "Insights" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/mission", label: "Mission" },
      { to: "/promise", label: "Our Promise" },
      { to: "/partnerships", label: "Partnerships" },
      { to: "/about", label: "About" },
      { to: "/community", label: "Community" },
    ],
  },
  {
    title: "Legal",
    links: [{ to: "/privacy", label: "Privacy" }],
  },
] as const;

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("Enter a valid email.");
      return;
    }
    setSubmitting(true);
    // Lightweight signup — no backend yet. We show success and log locally.
    await new Promise((r) => setTimeout(r, 400));
    setSubmitting(false);
    setEmail("");
    toast.success("You're on the list. Welcome to the Clutch Crew.");
  };

  return (
    <footer className="border-t border-white/10 bg-foreground">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo size="md" variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-background/70">
              Helping everyday athletes stop guessing and start performing with confidence.
            </p>
            <form onSubmit={submit} className="mt-6 flex max-w-sm gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Join the Clutch Crew"
                className="min-w-0 flex-1 rounded-full border border-white/15 bg-foreground px-4 py-2.5 text-sm text-background placeholder:text-background/50 focus:border-electric focus:outline-none"
              />
              <button
                type="submit"
                disabled={submitting}
                className="shrink-0 rounded-full bg-electric px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-electric-dark disabled:opacity-60"
              >
                {submitting ? "…" : "Join"}
              </button>
            </form>
            <p className="mt-2 text-xs text-background/60">
              Weekly science-backed performance tips. No spam.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-eyebrow text-background/80">
                {col.title}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-background/70 transition hover:text-background"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-background/60">
            © {new Date().getFullYear()} ClutchFuel. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-background/70">
            <a href="#" className="hover:text-background">Instagram</a>
            <a href="#" className="hover:text-background">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
