import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { SystemSection } from "@/components/sections/SystemSection";
import { SweatSection } from "@/components/sections/SweatSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { DashboardSectionSkeleton } from "@/components/DashboardSectionSkeleton";
import { InsightsPreviewSection } from "@/components/sections/InsightsPreviewSection";
import { ProfilesSection } from "@/components/sections/ProfilesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { makeMeta, canonical, organizationSchema, websiteSchema } from "@/lib/seo";
import { DEFAULT_OG_IMAGE } from "@/config";
import { site } from "@/data/site";
import { heroClutchMoments } from "@/data/hero-slideshow";

const LongGameSection = lazy(() =>
  import("@/components/sections/LongGameSection").then((m) => ({ default: m.LongGameSection })),
);
const DashboardSection = lazy(() =>
  import("@/components/sections/DashboardSection").then((m) => ({ default: m.DashboardSection })),
);

const homeDescription =
  "Hydration intelligence for everyday athletes. Unlock your Clutch Score, sweat profile, and personalized hydration insights in under 60 seconds.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: makeMeta({
      title: "ClutchFuel — Performance Starts With Preparation.",
      description: homeDescription,
      path: "/",
      image: DEFAULT_OG_IMAGE,
    }),
    links: [
      ...canonical("/"),
      {
        rel: "preload",
        as: "image",
        href: heroClutchMoments[0]!.poster.avif,
        type: "image/avif",
        fetchPriority: "high",
      },
      {
        rel: "preload",
        as: "video",
        href: heroClutchMoments[0]!.video,
        type: "video/mp4",
      },
    ],
    scripts: [organizationSchema(Object.values(site.social)), websiteSchema()],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <main id="main" className="bg-white">
        <HeroSection />
        <SystemSection />
        <SweatSection />
        <HowItWorksSection />
        <Suspense fallback={<DashboardSectionSkeleton />}>
          <DashboardSection />
        </Suspense>
        <ProfilesSection />
        <InsightsPreviewSection />
        <Suspense fallback={null}>
          <LongGameSection />
        </Suspense>
        <TestimonialsSection />
        <FinalCtaSection />
      </main>
      <Footer variant="light" />
    </>
  );
}
