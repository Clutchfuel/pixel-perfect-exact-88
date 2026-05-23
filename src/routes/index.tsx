import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { HeroSection } from "@/components/sections/HeroSection";
import { SystemSection } from "@/components/sections/SystemSection";
import { SweatSection } from "@/components/sections/SweatSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { DashboardSection } from "@/components/sections/DashboardSection";
import { ProfilesSection } from "@/components/sections/ProfilesSection";
import { LongGameSection } from "@/components/sections/LongGameSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <SEOHead
        title="ClutchFuel — Performance Starts With Preparation."
        description="Hydration built for the big moment. Unlock your Clutch Score and train with an edge."
        canonical="/"
      />
      <Header />
      <main>
        <HeroSection />
        <SystemSection />
        <SweatSection />
        <HowItWorksSection />
        <DashboardSection />
        <ProfilesSection />
        <LongGameSection />
        <TestimonialsSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  );
}
