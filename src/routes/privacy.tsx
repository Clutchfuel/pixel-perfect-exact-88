import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { makeMeta, canonical } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: makeMeta({
      title: "Privacy Policy | ClutchFuel",
      description: "How ClutchFuel collects, uses, and protects your information.",
      path: "/privacy",
    }),
    links: canonical("/privacy"),
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="LEGAL"
          title="Privacy Policy"
          sub="A plain-English summary of how we handle your information."
        />

        <section className="mx-auto max-w-3xl px-6 pb-20 md:px-10 md:pb-28">
          <div className="prose-like space-y-8 text-ink/80">
            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-display text-ink">
                What we collect
              </h2>
              <p className="mt-3">
                When you use the Clutch Score, we collect the information you provide about your
                body, training, and goals. If you sign up for updates we collect your email address.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-display text-ink">
                How we use it
              </h2>
              <p className="mt-3">
                We use your information to generate your personalized Clutch Score, improve our
                product, and (with permission) send you performance insights.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-display text-ink">
                What we don't do
              </h2>
              <p className="mt-3">
                We do not sell your personal information. We do not share it with advertisers.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-display text-ink">
                Contact
              </h2>
              <p className="mt-3">
                Questions about privacy? Email{" "}
                <span className="text-ink underline underline-offset-4">
                  privacy@clutchfuel.com
                </span>
                .
              </p>
            </div>
            <p className="pt-4 text-sm text-muted-ink">
              This is a placeholder policy. A full legal version will be published before launch.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
