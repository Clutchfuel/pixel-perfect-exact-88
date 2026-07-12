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
                When you take the Clutch Score, we collect your assessment answers (how you feel in
                training, recovery, training frequency, and goals), your resulting score,
                opportunity, and First Clutch Move. If you choose to save results or join our list,
                we collect your email address. Optional feedback you submit (accuracy ratings and
                free-text comments) is also stored. Contact form messages include your name, email,
                and message.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-display text-ink">
                How we use it
              </h2>
              <p className="mt-3">
                We use this information to generate your Clutch Score, email you your results (when
                you ask), improve the assessment, and — only with your consent — send performance
                insights and product updates. We may use aggregated, non-identifying patterns to
                improve ClutchFuel.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-display text-ink">
                Where it is stored
              </h2>
              <p className="mt-3">
                Score responses and leads are stored in our application database (Cloudflare D1).
                Transactional emails are sent through our email provider (Resend). Optional
                analytics run only after cookie consent.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-display text-ink">
                What we don&apos;t do
              </h2>
              <p className="mt-3">
                We do not sell your personal information. We do not share it with advertisers for
                their marketing.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-display text-ink">
                Cookies & analytics
              </h2>
              <p className="mt-3">
                Optional analytics cookies (Google Analytics) load only if you accept them in the
                cookie banner. Declining does not affect core site features or form submissions.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-display text-ink">
                Retention & your choices
              </h2>
              <p className="mt-3">
                You can unsubscribe from marketing emails using the link in any message. To request
                access or deletion of your Clutch Score data, email privacy@clutchfuel.com.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-display text-ink">
                Contact
              </h2>
              <p className="mt-3">
                Questions about privacy? Email{" "}
                <a
                  href="mailto:privacy@clutchfuel.com"
                  className="text-ink underline underline-offset-4"
                >
                  privacy@clutchfuel.com
                </a>
                .
              </p>
            </div>
            <p className="pt-4 text-sm text-muted-ink">
              Last updated: July 12, 2026. Have counsel review this policy before public launch if
              you need jurisdiction-specific disclosures.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
