import { useState } from "react";
import { toast } from "sonner";
import { BrandHeadline, BrandSection } from "@/components/brand/BrandSection";
import { FormConsent } from "@/components/FormConsent";
import { TurnstileWidget } from "@/components/TurnstileWidget";
import { Reveal } from "@/components/Reveal";
import { brand } from "@/data/brand-experience";
import { leadErrorMessage } from "@/lib/form-errors";
import { trackEvent } from "@/lib/analytics";

export function NewsletterBrandSection() {
  const s = brand.newsletter;
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !marketingConsent) return;
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
      trackEvent("form_submit", { form: "newsletter-home" });
      toast.success("Welcome to the community.");
      setEmail("");
      setTurnstileToken("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : leadErrorMessage(500));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <BrandSection id={s.id}>
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <BrandHeadline>{s.headline}</BrandHeadline>
          <p className="mt-4 text-lg text-brand-muted">{s.sub}</p>
          <form
            onSubmit={onSubmit}
            className="mx-auto mt-8 flex w-full max-w-lg flex-col gap-3 sm:flex-row sm:items-center sm:rounded-full sm:border sm:border-white/15 sm:bg-brand-card sm:p-1.5"
          >
            <input
              type="email"
              required
              maxLength={254}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="Email"
              className="h-12 flex-1 rounded-full border border-white/15 bg-brand-card px-5 text-white placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-accent sm:border-0 sm:bg-transparent"
            />
            <button
              type="submit"
              disabled={submitting || !marketingConsent}
              className="h-12 shrink-0 rounded-full bg-brand-accent px-8 text-sm font-semibold text-brand-base transition hover:bg-lime-dark disabled:opacity-50"
            >
              {submitting ? "…" : s.cta}
            </button>
          </form>
          <div className="mx-auto mt-4 max-w-md text-left">
            <FormConsent
              id="home-newsletter-consent"
              checked={marketingConsent}
              onChange={setMarketingConsent}
              className="text-brand-muted [&_a]:text-white"
            />
          </div>
          <TurnstileWidget onToken={setTurnstileToken} onExpire={() => setTurnstileToken("")} />
        </div>
      </Reveal>
    </BrandSection>
  );
}
