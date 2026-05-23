import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/cards/ProductCard";
import { CFButton } from "@/components/CFButton";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Reveal } from "@/components/Reveal";
import { products } from "@/data/products";
import { makeMeta, canonical, collectionPageSchema } from "@/lib/seo";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: makeMeta({
      title: "Products — The ClutchFuel Hydration System | ClutchFuel",
      description:
        "Clutch ISO, Clutch Flow, and Clutch Recovery. A three-stage performance hydration system for everyday athletes.",
      path: "/products",
    }),
    links: canonical("/products"),
    scripts: [
      collectionPageSchema({
        name: "ClutchFuel Products",
        description:
          "Clutch ISO, Clutch Flow, and Clutch Recovery — a three-stage performance hydration system for everyday athletes.",
        path: "/products",
      }),
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="PRODUCTS"
          title="A complete hydration system. Three stages."
          sub="Built to support performance before, during, and after training. Pick what fits your day — they're designed to work together."
        >
          <CFButton to="/clutch-score" variant="primary" size="lg">
            Find what's right for me →
          </CFButton>
        </PageHero>

        <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
          <div className="grid gap-6 md:grid-cols-3">
            {products.map((p) => (
              <Reveal key={p.slug}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>

        <section className="bg-mist">
          <div className="mx-auto max-w-5xl px-6 py-20 md:px-10 md:py-28">
            <h2 className="font-display text-3xl font-extrabold tracking-display text-ink md:text-4xl">
              Not sure where to start?
            </h2>
            <p className="mt-4 max-w-xl text-muted-ink">
              Most athletes start with one product and build the full system as their training
              demands grow. The Clutch Score recommends the right starting point for you in 60
              seconds.
            </p>
            <div className="mt-6">
              <CFButton to="/clutch-score" variant="dark" size="md">
                Get a personalized recommendation →
              </CFButton>
            </div>
          </div>
        </section>

        <RelatedLinks
          items={[
            {
              label: "The System",
              to: "/system",
              description: "How prepare, perform, recover fit together.",
            },
            {
              label: "Know your sweat rate",
              to: "/sweat-rate",
              description: "Why personalization matters.",
            },
            {
              label: "Frequently asked questions",
              to: "/faq",
              description: "Common product questions answered.",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
