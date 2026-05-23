import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { CFButton } from "@/components/CFButton";
import { RelatedLinks } from "@/components/RelatedLinks";
import { ProductCard } from "@/components/cards/ProductCard";
import { Reveal } from "@/components/Reveal";
import { systemSection } from "@/data/home";
import { products } from "@/data/products";
import { makeMeta, canonical, SITE_URL } from "@/lib/seo";
import { ArrowRight, Droplet, Zap, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import systemHero from "@/assets/system-hero.jpg";

const iconMap = { droplet: Droplet, bolt: Zap, layers: Layers } as const;

export const Route = createFileRoute("/system")({
  head: () => ({
    meta: makeMeta({
      title: "The System — A Smarter Hydration System for Athletes | ClutchFuel",
      description:
        "Prepare, perform, recover. The three-stage hydration system built for how athletes actually train and compete.",
      path: "/system",
    }),
    links: canonical("/system"),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" },
            { "@type": "ListItem", position: 2, name: "The System", item: SITE_URL + "/system" },
          ],
        }),
      },
    ],
  }),
  component: SystemPage,
});

function SystemPage() {
  return (
    <>
      <Header overDark />
      <main>
        <PageHero
          eyebrow="THE SYSTEM"
          title="A smarter hydration system for athletes."
          sub={systemSection.sub}
          bgImage={systemHero}
          bgImageAlt="Athlete drinking from a sports bottle mid-training"
        >
          <CFButton to="/clutch-score" variant="primary" size="lg">
            Unlock My Clutch Score →
          </CFButton>
        </PageHero>

        {/* Stepper */}
        <section className="mx-auto max-w-7xl px-6 pb-8 md:px-10">
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {systemSection.stages.map((s, i) => (
                <div key={s} className="flex items-center gap-4 sm:gap-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-5 py-2.5 text-sm font-semibold uppercase tracking-eyebrow text-ink shadow-card">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                    {s}
                  </div>
                  {i < systemSection.stages.length - 1 && (
                    <ArrowRight className="h-5 w-5 text-ink/30" />
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Stage detail */}
        <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <div className="grid gap-6 md:grid-cols-3">
            {products.map((p) => (
              <Reveal key={p.slug}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="bg-mist">
          <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
            <h2 className="max-w-2xl font-display text-3xl font-extrabold tracking-display text-ink md:text-5xl">
              Built on three principles.
            </h2>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {systemSection.features.map((f) => {
                const Icon = iconMap[f.icon as keyof typeof iconMap];
                return (
                  <Reveal key={f.title}>
                    <div className={cn("flex h-full items-start gap-4 rounded-2xl border border-ink/8 bg-white p-6")}>
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime/15 text-ink ring-1 ring-lime/30">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-extrabold tracking-display text-ink">
                          {f.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-ink">{f.copy}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA strip */}
        <section className="bg-dark">
          <div className="mx-auto max-w-5xl px-6 py-20 text-center md:px-10 md:py-28">
            <h2 className="font-display text-3xl font-extrabold tracking-display text-white md:text-5xl">
              Find the right system for you.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-dark">
              The Clutch Score turns five quick questions into a personal recommendation.
            </p>
            <div className="mt-8">
              <CFButton to="/clutch-score" variant="primary" size="lg">
                Unlock My Clutch Score →
              </CFButton>
            </div>
            <p className="mt-6 text-sm text-muted-dark">
              Or <Link to="/sweat-rate" className="text-lime hover:underline">learn about sweat rate</Link>
            </p>
          </div>
        </section>

        <RelatedLinks
          items={[
            { label: "Know your sweat rate", to: "/sweat-rate", description: "Why hydration isn't one-size-fits-all." },
            { label: "The Clutch Score platform", to: "/platform", description: "Track your score, sweat profile, and trends." },
            { label: "All products", to: "/products", description: "Compare ISO, Flow, and Recovery." },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
