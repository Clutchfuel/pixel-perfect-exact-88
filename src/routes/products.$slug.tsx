import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CFButton } from "@/components/CFButton";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Reveal } from "@/components/Reveal";
import { getProduct, products, type Product } from "@/data/products";
import { makeMeta, canonical, SITE_URL, breadcrumbSchema } from "@/lib/seo";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Product not found — ClutchFuel" }] };
    const title = `${loaderData.name} — ${loaderData.tagline} | ClutchFuel`;
    return {
      meta: makeMeta({
        title,
        description: loaderData.description,
        path: `/products/${params.slug}`,
        type: "product",
      }),
      links: canonical(`/products/${params.slug}`),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: loaderData.name,
            description: loaderData.description,
            brand: { "@type": "Brand", name: "ClutchFuel" },
            category: `Sports nutrition — ${loaderData.stage}`,
            url: `${SITE_URL}/products/${params.slug}`,
          }),
        },
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: loaderData.name, path: `/products/${params.slug}` },
        ]),
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData();

  return (
    <>
      <Header />
      <main>
        <section className="bg-background pt-28 md:pt-36">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <Breadcrumbs
              items={[
                { name: "Home", to: "/" },
                { name: "Products", to: "/products" },
                { name: product.name },
              ]}
            />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div
                className={cn(
                  "relative aspect-square w-full overflow-hidden rounded-3xl border",
                  product.accent
                    ? "border-lime/40 bg-gradient-to-br from-ink to-panel lime-glow"
                    : "border-ink/8 bg-gradient-to-br from-mist to-white"
                )}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={cn(
                      "h-60 w-36 rounded-3xl border",
                      product.accent
                        ? "border-lime/50 bg-lime/10"
                        : "border-ink/10 bg-white/60 backdrop-blur"
                    )}
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="tracking-eyebrow text-xs font-semibold uppercase text-muted-ink">
                {product.stage}
              </div>
              <h1 className="mt-3 font-display text-4xl font-extrabold tracking-display text-ink md:text-5xl">
                {product.name}
              </h1>
              <p className="mt-3 font-display text-xl font-extrabold tracking-display text-ink/80">
                {product.headline}
              </p>
              <p className="mt-6 text-lg text-muted-ink">{product.description}</p>

              <div className="mt-8 space-y-3">
                {product.benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-lime" />
                    <span className="text-ink">{b}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <CFButton to="/clutch-score" variant="primary" size="lg">
                  Unlock My Clutch Score →
                </CFButton>
                <CFButton to="/products" variant="ghost" size="lg">
                  See all products
                </CFButton>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-mist">
          <div className="mx-auto max-w-5xl px-6 py-20 md:px-10 md:py-24">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="font-display text-2xl font-extrabold tracking-display text-ink md:text-3xl">
                  Built for
                </h2>
                <p className="mt-3 text-muted-ink">{product.forWho}</p>
              </div>
              <div>
                <h2 className="font-display text-2xl font-extrabold tracking-display text-ink md:text-3xl">
                  When to use it
                </h2>
                <p className="mt-3 text-muted-ink">{product.whenToUse}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-20 md:px-10 md:py-24">
          <h2 className="font-display text-3xl font-extrabold tracking-display text-ink md:text-4xl">
            What's inside
          </h2>
          <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
            {product.ingredients.map((ing) => (
              <div key={ing.name} className="flex flex-col gap-1 py-5 md:flex-row md:items-baseline md:gap-8">
                <div className="font-display text-lg font-extrabold tracking-display text-ink md:w-1/3">
                  {ing.name}
                </div>
                <div className="text-muted-ink md:flex-1">{ing.role}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-mist">
          <div className="mx-auto max-w-3xl px-6 py-20 md:px-10 md:py-24">
            <h2 className="font-display text-3xl font-extrabold tracking-display text-ink md:text-4xl">
              Questions
            </h2>
            <div className="mt-8">
              <FaqAccordion items={product.faqs} idPrefix={product.slug} />
            </div>
            <p className="mt-8 text-sm text-muted-ink">
              More questions? <Link to="/faq" className="text-ink underline underline-offset-4">Full FAQ</Link> ·{" "}
              <Link to="/contact" className="text-ink underline underline-offset-4">Contact us</Link>
            </p>
          </div>
        </section>

        <RelatedLinks
          title="Other parts of the system"
          items={products
            .filter((p) => p.slug !== product.slug)
            .map((p) => ({
              label: `${p.name} — ${p.stage}`,
              to: `/products/${p.slug}` as const,
              description: p.tagline,
            }))
            .concat([{ label: "The System overview", to: "/system" as const, description: "How prepare, perform, recover work together." }])}
        />
      </main>
      <Footer />
    </>
  );
}
