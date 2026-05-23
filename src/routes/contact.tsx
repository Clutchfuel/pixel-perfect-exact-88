import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { makeMeta, canonical } from "@/lib/seo";
import { Mail, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: makeMeta({
      title: "Contact — Get In Touch | ClutchFuel",
      description: "Questions, partnerships, or feedback — reach the ClutchFuel team.",
      path: "/contact",
    }),
    links: canonical("/contact"),
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <Header />
      <main>
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
                  <div className="font-display text-lg font-extrabold tracking-display text-ink">Email</div>
                  <div className="mt-1 text-sm text-muted-ink">hello@clutchfuel.com</div>
                </div>
              </a>
            </Reveal>
            <Reveal>
              <div className="flex items-start gap-4 rounded-2xl border border-ink/8 bg-white p-6">
                <MessageCircle className="mt-1 h-5 w-5 text-lime" />
                <div>
                  <div className="font-display text-lg font-extrabold tracking-display text-ink">Social</div>
                  <div className="mt-1 text-sm text-muted-ink">@clutchfuel on every platform</div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-10 rounded-3xl border border-ink/10 bg-white p-8 md:p-10"
            >
              <h2 className="font-display text-2xl font-extrabold tracking-display text-ink">Send us a note</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-ink">Name</span>
                  <input
                    type="text"
                    className="mt-2 h-12 w-full rounded-xl border border-ink/15 bg-white px-4 text-ink focus:border-ink/40 focus:outline-none focus:ring-2 focus:ring-lime"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-ink">Email</span>
                  <input
                    type="email"
                    className="mt-2 h-12 w-full rounded-xl border border-ink/15 bg-white px-4 text-ink focus:border-ink/40 focus:outline-none focus:ring-2 focus:ring-lime"
                  />
                </label>
              </div>
              <label className="mt-4 block">
                <span className="text-sm font-medium text-ink">Message</span>
                <textarea
                  rows={5}
                  className="mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink focus:border-ink/40 focus:outline-none focus:ring-2 focus:ring-lime"
                />
              </label>
              <button
                type="submit"
                className="mt-6 h-12 rounded-full bg-lime px-8 text-sm font-semibold text-ink transition hover:bg-lime-dark"
              >
                Send message
              </button>
              <p className="mt-3 text-xs text-muted-ink">
                Form is visual only — please email us directly for now.
              </p>
            </form>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
