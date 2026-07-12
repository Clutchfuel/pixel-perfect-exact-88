import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { CFButton } from "@/components/CFButton";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Reveal } from "@/components/Reveal";
import { makeMeta, canonical, howToSchema, breadcrumbSchema } from "@/lib/seo";
import { imageSets } from "@/assets/image-sets";

const sweatTestSteps = [
  "Weigh yourself naked and dry, right before training.",
  "Train normally for 60 minutes. Note exactly how much fluid you drink.",
  "Towel off completely and weigh yourself naked again.",
  "Sweat rate (L/hr) = (start weight − end weight in kg) + fluid intake in liters.",
];

export const Route = createFileRoute("/sweat-rate")({
  head: () => ({
    meta: makeMeta({
      title: "Sweat Rate Calculator — How to Calculate Your Sweat Rate | ClutchFuel",
      description:
        "What sweat rate is, why it determines your hydration needs, and how to calculate yours in one training session.",
      path: "/sweat-rate",
    }),
    links: canonical("/sweat-rate"),
    scripts: [
      howToSchema({
        name: "How to calculate your sweat rate",
        description:
          "A simple at-home protocol to measure fluid loss per hour of training in one session.",
        path: "/sweat-rate",
        steps: sweatTestSteps,
      }),
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Sweat Rate", path: "/sweat-rate" },
      ]),
    ],
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
          heroImage={imageSets.sweatRateHero}
          bgImageAlt="Macro close-up of sweat on an athlete's shoulder"
        >
          <CFButton to="/clutch-score" variant="primary" size="lg">
            Unlock My Clutch Score →
          </CFButton>
        </PageHero>

        <section className="mx-auto max-w-3xl px-6 py-20 md:px-10">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold tracking-display text-ink md:text-4xl">
              What sweat rate actually tells you
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-ink">
              Sweat rate is how much fluid your body loses per hour of training. Most athletes fall
              between 0.8 L/hr and 2.0 L/hr — heavy sweaters in hot conditions can climb above 2.5
              L/hr. Generic hydration advice ignores this entirely, which is why it feels so
              hit-or-miss.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="mt-12 font-display text-3xl font-extrabold tracking-display text-ink md:text-4xl">
              The manual sweat rate test
            </h2>
            <p className="mt-4 text-muted-ink">
              You need a scale, a stopwatch, and one training session.
            </p>
            <ol className="mt-6 space-y-4">
              {sweatTestSteps.map((step, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 rounded-2xl border border-ink/8 bg-white p-5"
                >
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
              Pair it with your Clutch Score
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-ink">
              A sweat-rate test tells you fluid loss. The Clutch Score tells you where to focus
              first — your Biggest Opportunity and a First Clutch Move™ you can use before your next
              session. Use both: Score for priority, sweat test for precision.
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
            {
              label: "Hydration 101",
              to: "/insights/hydration-101-for-everyday-athletes",
              description: "The fundamentals every athlete should know.",
            },
            {
              label: "Calculate your sweat rate",
              to: "/insights/how-to-calculate-your-sweat-rate",
              description: "Full at-home protocol with examples.",
            },
            {
              label: "Electrolytes explained",
              to: "/insights/electrolytes-explained-sodium-potassium-magnesium",
              description: "Sodium, potassium, magnesium, and what each does.",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
