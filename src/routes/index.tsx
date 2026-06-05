import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { PreparationWhySection } from "@/components/sections/brand/PreparationWhySection";
import { EverydayAthletesSection } from "@/components/sections/brand/EverydayAthletesSection";
import { FeaturedAthletesSection } from "@/components/sections/brand/FeaturedAthletesSection";
import { CoachesCornerSection } from "@/components/sections/brand/CoachesCornerSection";
import { LearnHubSection } from "@/components/sections/brand/LearnHubSection";
import { ClutchScoreTeaserSection } from "@/components/sections/brand/ClutchScoreTeaserSection";
import { SystemExperienceSection } from "@/components/sections/brand/SystemExperienceSection";
import { CommunitySection } from "@/components/sections/brand/CommunitySection";
import { FounderStorySection } from "@/components/sections/brand/FounderStorySection";
import { NewsletterBrandSection } from "@/components/sections/brand/NewsletterBrandSection";
import { makeMeta, canonical, organizationSchema, websiteSchema } from "@/lib/seo";
import { DEFAULT_OG_IMAGE } from "@/config";
import { site } from "@/data/site";
import { heroVideoPreload } from "@/components/sections/HeroSection";

const homeDescription = site.description;

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
      ...(heroVideoPreload
        ? [
            {
              rel: "preload" as const,
              as: "video" as const,
              href: heroVideoPreload,
              type: "video/mp4",
            },
          ]
        : []),
    ],
    scripts: [organizationSchema(Object.values(site.social)), websiteSchema()],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <main id="main" className="bg-brand-base">
        <HeroSection />
        <PreparationWhySection />
        <EverydayAthletesSection />
        <FeaturedAthletesSection />
        <CoachesCornerSection />
        <LearnHubSection />
        <ClutchScoreTeaserSection />
        <SystemExperienceSection />
        <CommunitySection />
        <FounderStorySection />
        <NewsletterBrandSection />
      </main>
      <Footer variant="dark" />
    </>
  );
}
