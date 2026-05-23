import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { CFButton } from "@/components/CFButton";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Reveal } from "@/components/Reveal";
import { makeMeta, canonical } from "@/lib/seo";
import sweatHero from "@/assets/sweat-rate-hero.jpg";

export const Route = createFileRoute("/sweat-rate")({
  head: () => ({
    meta: makeMeta({
      title: "Sweat Rate Calculator — How to Calculate Your Sweat Rate | ClutchFuel",
      description:
        "What sweat rate is, why it determines your hydration needs, and how to calculate yours in one training session.",
      path: "/sweat-rate",
    }),
    links: canonical("/sweat-rate"),
  }),
  component: SweatRatePage,
});

function SweatRatePage() {
  return (
    <>
      <Header overDark />
      <main>
        <PageHero
          eyebrow="KNOW YOUR SWEAT RATE"
          title="Hydration isn't one-size-fits-all."
          sub="Your sweat rate is the single most important number behind a real hydration plan. Here's what it is, why it matters, and how to find yours."
          bgImage={sweatHero}
          bgImageAlt="Macro close-up of sweat on an athlete's shoulder"
        >
          <CFButton to="/clutch-score" variant="primary" size="lg">
            Estimate mine in 60 seconds →
          </CFButton>
        </PageHero>

        <section className="mx-auto max-w-3xl px-6 py-20 md:px-10">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold tracking-display text-ink md:text-4xl">
              What sweat rate actually tells you
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-ink">
              Sweat rate is how much fluid your body loses per hour of training. Most athletes
              fall between 0.8 L/hr and 2.0 L/hr — heavy sweaters in hot conditions can climb
              above 2.5 L/hr. Generic hydration advice ignores this entirely, which is why it
              feels so hit-or-miss.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="mt-12 font-display text-3xl font-extrabold tracking-display text-ink md:text-4xl">
              The manual sweat rate test
            </h2>
            <p className="mt-4 text-muted-ink">You need a scale, a stopwatch, and one training session.</p>
            <ol className="mt-6 space-y-4">
              {[
                "Weigh yourself naked and dry, right before training.",
                "Train normally for 60 minutes. Note exactly how much fluid you drink.",
                "Towel off completely and weigh yourself naked again.",
                "Sweat rate (L/hr) = (start weight − end weight in kg) + fluid intake in liters.",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-4 rounded-2xl border border-ink/8 bg-white p-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime font-display font-extrabold text-ink">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-ink">{step}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal>
            <h2 className="mt-12 font-display text-3xl font-extrabold tracking-display text-ink md:text-4xl">
              The faster way
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-ink">
              If you don't want to weigh yourself naked twice, the Clutch Score estimates your
              sweat profile from five quick questions about your body, training, and how you
              respond to heat — then translates it into a per-hour hydration target.
            </p>
            <div className="mt-8">
              <CFButton to="/clutch-score" variant="dark" size="lg">
                Unlock My Clutch Score →
              </CFButton>
            </div>
          </Reveal>
        </section>

        <RelatedLinks
          items={[
            { label: "Hydration 101", to: "/insights/hydration-101-for-everyday-athletes", description: "The fundamentals every athlete should know." },
            { label: "Calculate your sweat rate", to: "/insights/how-to-calculate-your-sweat-rate", description: "Full at-home protocol with examples." },
            { label: "Electrolytes explained", to: "/insights/electrolytes-explained-sodium-potassium-magnesium", description: "Sodium, potassium, magnesium, and what each does." },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
