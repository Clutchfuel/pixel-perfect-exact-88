import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  HydrationLabCalculator,
  HydrationLabFooterNote,
  HydrationLabHeader,
} from "@/components/hydration-lab/HydrationLabCalculator";
import { makeMeta, canonical } from "@/lib/seo";
import { DEFAULT_OG_IMAGE } from "@/config";
import { cn } from "@/lib/utils";

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
  const [reportMode, setReportMode] = useState(false);

  return (
    <>
      <Header overDark={reportMode} />
      <main
        id="main"
        className={cn(
          "min-h-screen pt-28 pb-24 md:pt-36 md:pb-32",
          reportMode ? "performance-surface" : "bg-white",
        )}
        style={reportMode ? { background: "#0A0A0A" } : undefined}
      >
        <div className="mx-auto max-w-2xl px-6 md:px-10">
          {!reportMode && <HydrationLabHeader />}
          <div className={reportMode ? "mt-0" : "mt-12"}>
            <HydrationLabCalculator onPhaseChange={(p) => setReportMode(p === "results")} />
          </div>
          {!reportMode && <HydrationLabFooterNote />}
        </div>
      </main>
      <Footer variant={reportMode ? "dark" : "light"} />
    </>
  );
}
