import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/Badge";
import { SEOHead } from "@/components/SEOHead";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/clutch-score")({
  head: () => ({
    meta: [
      { title: "Clutch Score — ClutchFuel" },
      {
        name: "description",
        content: "Unlock your personalized hydration and performance profile.",
      },
      { property: "og:title", content: "Clutch Score — ClutchFuel" },
      {
        property: "og:description",
        content: "Personalized hydration intelligence for everyday athletes.",
      },
    ],
  }),
  component: ClutchScorePage,
});

function ClutchScorePage() {
  return (
    <>
      <SEOHead title="Clutch Score — ClutchFuel" canonical="/clutch-score" />
      <Header />
      <main className="relative min-h-screen overflow-hidden bg-dark pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/15 blur-[140px]" />

        <div className="relative mx-auto max-w-2xl px-6 md:px-10">
          <div className="rounded-3xl glass-dark p-8 md:p-12 lime-glow text-center">
            <div className="flex justify-center">
              <Badge variant="lime">
                <Sparkles className="h-3.5 w-3.5" />
                Coming soon
              </Badge>
            </div>
            <h1 className="mt-6 font-display text-4xl font-extrabold tracking-display text-white md:text-5xl">
              Your Clutch Score, almost ready.
            </h1>
            <p className="mx-auto mt-5 max-w-md text-base text-muted-dark md:text-lg">
              We're polishing the 5-question experience that turns your training,
              body, and goals into a personalized hydration profile.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto mt-10 flex w-full max-w-md flex-col gap-2 sm:flex-row sm:items-center sm:rounded-full sm:border sm:border-white/15 sm:bg-white/5 sm:p-1.5"
            >
              <input
                type="email"
                aria-label="Email"
                placeholder="you@example.com"
                className="h-12 flex-1 rounded-full border border-white/15 bg-white/5 px-5 text-base text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-lime sm:h-auto sm:rounded-full sm:border-0 sm:bg-transparent sm:py-3"
              />
              <button
                type="submit"
                className="h-12 rounded-full bg-lime px-6 text-sm font-semibold text-ink transition hover:bg-lime-dark sm:h-auto sm:py-3"
              >
                Notify me
              </button>
            </form>
            <p className="mt-4 text-xs text-muted-dark">
              We'll only email you when the Clutch Score is live.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
