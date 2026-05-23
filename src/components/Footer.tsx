import { useState } from "react";
import { Instagram, Youtube } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { footer, site } from "@/data/site";
import { trackEvent } from "@/lib/analytics";
import { Logo } from "@/components/Logo";
import { FormConsent } from "@/components/FormConsent";
import { TurnstileWidget } from "@/components/TurnstileWidget";
import { leadErrorMessage } from "@/lib/form-errors";

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "footer",
          ...(turnstileToken ? { turnstileToken } : {}),
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? leadErrorMessage(res.status));
      trackEvent("form_submit", { form: "newsletter-footer" });
      toast.success("You're on the list.");
      setEmail("");
      setTurnstileToken("");
    } catch (err) {
      const message = err instanceof Error ? err.message : leadErrorMessage(500);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <footer className="bg-dark text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center" aria-label="ClutchFuel home">
              <Logo variant="light" size="lg" />
            </Link>
            <p className="mt-6 max-w-sm font-display text-2xl font-extrabold tracking-display text-white md:text-3xl">
              {site.tagline}
            </p>

            <form
              onSubmit={onSubmit}
              className="mt-8 flex w-full max-w-md items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 backdrop-blur"
            >
              <input
                type="email"
                required
                maxLength={254}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email"
                placeholder={footer.emailPlaceholder}
                className="flex-1 bg-transparent px-4 text-base text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-lime px-5 py-3 text-sm font-semibold text-ink transition hover:bg-lime-dark disabled:opacity-60"
              >
                {submitting ? "…" : footer.emailCta}
              </button>
            </form>
            <div className="mt-3 max-w-md text-white/50">
              <FormConsent />
            </div>
            <TurnstileWidget onToken={setTurnstileToken} onExpire={() => setTurnstileToken("")} />
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
                      <Link to={l.to} className="text-sm text-white/70 transition hover:text-white">
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
            <a
              href={site.social.instagram}
              aria-label="Instagram"
              className="text-white/60 transition hover:text-lime"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={site.social.youtube}
              aria-label="YouTube"
              className="text-white/60 transition hover:text-lime"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a
              href={site.social.tiktok}
              aria-label="TikTok"
              className="text-sm text-white/60 transition hover:text-lime"
            >
              TikTok
            </a>
            <a
              href={site.social.x}
              aria-label="X"
              className="text-sm text-white/60 transition hover:text-lime"
            >
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
