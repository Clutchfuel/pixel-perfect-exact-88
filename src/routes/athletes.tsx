import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SportCard } from "@/components/cards/SportCard";
import { ProfilesSection } from "@/components/sections/ProfilesSection";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Reveal } from "@/components/Reveal";
import { sports } from "@/data/sports";
import { makeMeta, canonical, collectionPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/athletes")({
  head: () => ({
    meta: makeMeta({
      title: "Athletes — Hydration Built for Your Sport | ClutchFuel",
      description:
        "Basketball, running, Hyrox, gym athletes. Sport-specific hydration guidance and your performance profile in one place.",
      path: "/athletes",
    }),
    links: canonical("/athletes"),
    scripts: [
      collectionPageSchema({
        name: "Athletes — ClutchFuel",
        description:
          "Sport-specific hydration guidance for basketball, running, Hyrox, and gym athletes. Discover your performance profile.",
        path: "/athletes",
      }),
    ],
  }),
  component: AthletesPage,
});

function AthletesPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="ATHLETES"
          title="Hydration built for your sport."
          sub="Every sport has its own demands. We've broken down the hydration story for the ones we see most — pick yours."
        />

        <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sports.map((s) => (
              <Reveal key={s.slug}>
                <SportCard sport={s} />
              </Reveal>
            ))}
          </div>
        </section>

        <ProfilesSection />

        <RelatedLinks
          items={[
            {
              label: "Know your sweat rate",
              to: "/sweat-rate",
              description: "The number behind sport-specific plans.",
            },
            {
              label: "Insights & guides",
              to: "/insights",
              description: "Long-form articles for every athlete.",
            },
            {
              label: "Unlock your Clutch Score",
              to: "/clutch-score",
              description: "Score, opportunity, and First Clutch Move in about 2 minutes.",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
