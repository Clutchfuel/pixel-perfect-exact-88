import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DashboardSection } from "@/components/sections/DashboardSection";
import { LongGameSection } from "@/components/sections/LongGameSection";
import { PageHero } from "@/components/PageHero";
import { CFButton } from "@/components/CFButton";
import { RelatedLinks } from "@/components/RelatedLinks";
import { makeMeta, canonical } from "@/lib/seo";
import { imageSets } from "@/assets/image-sets";

export const Route = createFileRoute("/platform")({
  head: () => ({
    meta: makeMeta({
      title: "The Clutch Score Platform — Product Vision | ClutchFuel",
      description:
        "See where ClutchFuel is headed: score, opportunity, and long-game habits. Start today with the free 2-minute Clutch Score.",
      path: "/platform",
    }),
    links: canonical("/platform"),
  }),
  component: PlatformPage,
});

function PlatformPage() {
  return (
    <>
      <Header overDark />
      <main>
        <PageHero
          theme="dark"
          eyebrow="PRODUCT VISION"
          title="Where ClutchFuel is headed."
          sub="Score, opportunity, and long-game habits in one place. The screens below are a preview — what’s live today is the free Clutch Score assessment."
          align="center"
          heroImage={imageSets.platformHero}
          bgImageAlt="Athlete checking the ClutchFuel app on a phone"
        >
          <CFButton to="/clutch-score" variant="primary" size="lg">
            Unlock My Clutch Score →
          </CFButton>
          <p className="mt-4 text-xs font-semibold uppercase tracking-eyebrow text-white/55">
            Preview UI · tracking dashboard coming later
          </p>
        </PageHero>

        <DashboardSection />
        <LongGameSection />

        <RelatedLinks
          theme="dark"
          items={[
            { label: "The System", to: "/system", description: "Prepare, perform, recover." },
            {
              label: "Know your sweat rate",
              to: "/sweat-rate",
              description: "The number behind your plan.",
            },
            {
              label: "All products",
              to: "/products",
              description: "Compare ISO, Flow, and Recovery.",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
