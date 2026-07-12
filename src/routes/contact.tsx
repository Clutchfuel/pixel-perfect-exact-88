import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { FormConsent } from "@/components/FormConsent";
import { TurnstileWidget } from "@/components/TurnstileWidget";
import { makeMeta, canonical } from "@/lib/seo";
import { leadErrorMessage } from "@/lib/form-errors";
import { trackEvent } from "@/lib/analytics";
import { Mail, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: makeMeta({
      title: "Contact — Get In Touch | ClutchFuel",
      description:
        "Questions, partnerships, or feedback — reach the ClutchFuel team. We respond to athletes, coaches, and partners within 1–2 business days.",
      path: "/contact",
    }),
    links: canonical("/contact"),
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !message || !marketingConsent) {
      toast.error("Please complete the form and agree to receive emails.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          marketingConsent,
          ...(turnstileToken ? { turnstileToken } : {}),
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? leadErrorMessage(res.status));
      trackEvent("form_submit", { form: "contact" });
      toast.success("Message sent — we'll be in touch.");
      setName("");
      setEmail("");
      setMessage("");
      setTurnstileToken("");
    } catch (err) {
      const message = err instanceof Error ? err.message : leadErrorMessage(500);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Header />
      <main id="main">
        <PageHero
          eyebrow="CONTACT"
          title="Let's talk."
          sub="Whether you're an athlete with a question, a coach exploring ClutchFuel for your team, or a partner — we'd love to hear from you."
        />

        <section className="mx-auto max-w-3xl px-6 pb-20 md:px-10 md:pb-28">
          <div className="grid gap-4 md:grid-cols-2">
            <Reveal>
              <a
                href="mailto:hello@clutchfuel.com"
                className="flex items-start gap-4 rounded-2xl border border-ink/8 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-card"
              >
                <Mail className="mt-1 h-5 w-5 text-lime" />
                <div>
                  <div className="font-display text-lg font-extrabold tracking-display text-ink">
                    Email
                  </div>
                  <div className="mt-1 text-sm text-muted-ink">hello@clutchfuel.com</div>
                </div>
              </a>
            </Reveal>
            <Reveal>
              <div className="flex items-start gap-4 rounded-2xl border border-ink/8 bg-white p-6">
                <MessageCircle className="mt-1 h-5 w-5 text-lime" />
                <div>
                  <div className="font-display text-lg font-extrabold tracking-display text-ink">
                    Social
                  </div>
                  <div className="mt-1 text-sm text-muted-ink">@clutchfuel on every platform</div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <form
              onSubmit={onSubmit}
              className="mt-10 rounded-3xl border border-ink/10 bg-white p-8 md:p-10"
            >
              <h2 className="font-display text-2xl font-extrabold tracking-display text-ink">
                Send us a note
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-ink">Name</span>
                  <input
                    type="text"
                    required
                    maxLength={120}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 h-12 w-full rounded-xl border border-ink/15 bg-white px-4 text-ink focus:border-ink/40 focus:outline-none focus:ring-2 focus:ring-lime"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-ink">Email</span>
                  <input
                    type="email"
                    required
                    maxLength={254}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 h-12 w-full rounded-xl border border-ink/15 bg-white px-4 text-ink focus:border-ink/40 focus:outline-none focus:ring-2 focus:ring-lime"
                  />
                </label>
              </div>
              <label className="mt-4 block">
                <span className="text-sm font-medium text-ink">Message</span>
                <textarea
                  rows={5}
                  required
                  maxLength={5000}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink focus:border-ink/40 focus:outline-none focus:ring-2 focus:ring-lime"
                />
              </label>
              <button
                type="submit"
                disabled={submitting || !marketingConsent}
                className="mt-6 h-12 rounded-full bg-lime px-8 text-sm font-semibold text-ink transition hover:bg-lime-dark disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Send message"}
              </button>
              <div className="mt-4">
                <FormConsent
                  id="contact-marketing-consent"
                  checked={marketingConsent}
                  onChange={setMarketingConsent}
                  className="text-muted-ink"
                />
              </div>
              <TurnstileWidget onToken={setTurnstileToken} onExpire={() => setTurnstileToken("")} />
            </form>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
