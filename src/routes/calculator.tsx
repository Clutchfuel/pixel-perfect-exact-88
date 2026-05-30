import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  HydrationLabCalculator,
  HydrationLabFooterNote,
  HydrationLabHeader,
} from "@/components/hydration-lab/HydrationLabCalculator";
import { hydrationLabBrand } from "@/data/hydration-lab";
import { makeMeta, canonical } from "@/lib/seo";
import { DEFAULT_OG_IMAGE } from "@/config";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: makeMeta({
      title: "Hydration Profile — Clutch Score & Performance Insights | ClutchFuel",
      description:
        "Discover your personalized hydration profile and understand what your body needs to perform at its best.",
      path: "/calculator",
      image: DEFAULT_OG_IMAGE,
    }),
    links: canonical("/calculator"),
  }),
  component: CalculatorPage,
});

function CalculatorPage() {
  return (
    <>
      <Header overDark />
      <main
        id="main"
        className="min-h-screen pt-28 pb-24 md:pt-36 md:pb-32 performance-surface"
        style={{ background: hydrationLabBrand.background }}
      >
        <div className="mx-auto max-w-2xl px-6 md:px-10">
          <HydrationLabHeader />
          <div className="mt-12">
            <HydrationLabCalculator />
          </div>
          <HydrationLabFooterNote />
        </div>
      </main>
      <Footer />
    </>
  );
}
