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
      title: "The Clutch Score Platform — Track Your Hydration & Performance | ClutchFuel",
      description:
        "Your Clutch Score, sweat profile, and hydration trends — in one place. Built for the long game.",
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
          eyebrow="THE PLATFORM"
          title="A real athlete performance platform."
          sub="Your Clutch Score, sweat profile, and hydration trends — in one place. Track your work, watch the line move."
          align="center"
          heroImage={imageSets.platformHero}
          bgImageAlt="Athlete checking the ClutchFuel app on a phone"
        >
          <CFButton to="/clutch-score" variant="primary" size="lg">
            Unlock My Clutch Score →
          </CFButton>
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
