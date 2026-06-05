import { useState } from "react";
import { Instagram, Youtube, Mic } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { footer, site } from "@/data/site";
import { trackEvent } from "@/lib/analytics";
import { Logo } from "@/components/Logo";
import { FormConsent } from "@/components/FormConsent";
import { TurnstileWidget } from "@/components/TurnstileWidget";
import { leadErrorMessage } from "@/lib/form-errors";

export function Footer({ variant = "light" }: { variant?: "light" | "dark" }) {
  const isDark = variant === "dark";
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);

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
          marketingConsent: true,
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
    <footer
      className={
        isDark ? "border-t border-white/10 bg-brand-base text-white" : "border-t border-ink/8 bg-white text-ink"
      }
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center" aria-label="ClutchFuel home">
              <Logo variant={isDark ? "light" : "dark"} size="lg" />
            </Link>
            <p
              className={
                isDark
                  ? "mt-6 max-w-sm font-display text-2xl font-extrabold tracking-display text-white md:text-3xl"
                  : "mt-6 max-w-sm font-display text-2xl font-extrabold tracking-display text-ink md:text-3xl"
              }
            >
              {site.tagline}
            </p>

            <form
              onSubmit={onSubmit}
              className={
                isDark
                  ? "mt-8 flex w-full max-w-md items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 backdrop-blur"
                  : "mt-8 flex w-full max-w-md items-center gap-2 rounded-full border border-ink/10 bg-mist/40 p-1.5"
              }
            >
              <input
                type="email"
                required
                maxLength={254}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email"
                placeholder={footer.emailPlaceholder}
                className={
                  isDark
                    ? "flex-1 bg-transparent px-4 text-base text-white placeholder:text-white/40 focus:outline-none"
                    : "flex-1 bg-transparent px-4 text-base text-ink placeholder:text-muted-ink focus:outline-none"
                }
              />
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-lime px-5 py-3 text-sm font-semibold text-ink transition hover:bg-lime-dark disabled:opacity-60"
              >
                {submitting ? "…" : footer.emailCta}
              </button>
            </form>
            <div className={isDark ? "mt-3 max-w-md text-white/50" : "mt-3 max-w-md text-muted-ink"}>
              <FormConsent
                id="footer-marketing-consent"
                checked={marketingConsent}
                onChange={setMarketingConsent}
                className={
                  isDark
                    ? "text-white/70 [&_a]:text-white/90"
                    : "text-muted-ink [&_a]:text-ink"
                }
              />
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
                      <Link
                        to={l.to}
                        className={
                          isDark
                            ? "text-sm text-white/70 transition hover:text-white"
                            : "text-sm text-muted-ink transition hover:text-ink"
                        }
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

        <div
          className={
            isDark
              ? "mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center"
              : "mt-16 flex flex-col items-start justify-between gap-6 border-t border-ink/8 pt-8 md:flex-row md:items-center"
          }
        >
          <div className="flex items-center gap-4">
            <a
              href={site.social.instagram}
              aria-label="Instagram"
              className={
                isDark
                  ? "text-white/60 transition hover:text-lime"
                  : "text-muted-ink transition hover:text-ink"
              }
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={site.social.youtube}
              aria-label="YouTube"
              className={
                isDark
                  ? "text-white/60 transition hover:text-lime"
                  : "text-muted-ink transition hover:text-ink"
              }
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a
              href={site.social.podcast}
              aria-label="Podcast"
              className={
                isDark
                  ? "text-white/60 transition hover:text-lime"
                  : "text-muted-ink transition hover:text-ink"
              }
            >
              <Mic className="h-5 w-5" />
            </a>
            <a
              href={site.social.tiktok}
              aria-label="TikTok"
              className={
                isDark
                  ? "text-sm text-white/60 transition hover:text-lime"
                  : "text-sm text-muted-ink transition hover:text-ink"
              }
            >
              TikTok
            </a>
            <a
              href={site.social.x}
              aria-label="X"
              className={
                isDark
                  ? "text-sm text-white/60 transition hover:text-lime"
                  : "text-sm text-muted-ink transition hover:text-ink"
              }
            >
              X
            </a>
          </div>
          <p className={isDark ? "text-xs text-white/40" : "text-xs text-muted-ink"}>
            © {new Date().getFullYear()} ClutchFuel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
