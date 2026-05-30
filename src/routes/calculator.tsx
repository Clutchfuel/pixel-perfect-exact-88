import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  HydrationLabCalculator,
  HydrationLabHeader,
} from "@/components/hydration-lab/HydrationLabCalculator";
import { makeMeta, canonical } from "@/lib/seo";
import { DEFAULT_OG_IMAGE } from "@/config";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: makeMeta({
      title: "Hydration Lab Calculator — Sweat Rate & Fluid Loss | ClutchFuel",
      description:
        "Precision weight-delta or quick calorie-based sweat rate calculator. Personalized hydration insights for everyday athletes.",
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
        className="min-h-screen pt-28 pb-24 md:pt-36 md:pb-32"
        style={{ background: "#000000" }}
      >
        <div className="mx-auto max-w-2xl px-6 md:px-10">
          <HydrationLabHeader />
          <div className="mt-12">
            <HydrationLabCalculator />
          </div>
          <p className="mt-10 text-center text-xs text-white/40">
            Also explore your{" "}
            <Link to="/clutch-score" className="underline hover:text-white">
              Clutch Score profile
            </Link>{" "}
            or read about{" "}
            <Link to="/sweat-rate" className="underline hover:text-white">
              sweat rate science
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
