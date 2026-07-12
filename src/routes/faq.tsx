import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { FaqAccordion } from "@/components/FaqAccordion";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Reveal } from "@/components/Reveal";
import { faqGroups } from "@/data/faq";
import { makeMeta, canonical, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () => {
    const all = faqGroups.flatMap((g) => g.items);
    return {
      meta: makeMeta({
        title: "FAQ — Clutch Score, Hydration & Products | ClutchFuel",
        description:
          "Common questions about the Clutch Score diagnostic, hydration for everyday athletes, and the Prepare / Perform / Recover system.",
        path: "/faq",
      }),
      links: canonical("/faq"),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: all.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        },
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ]),
      ],
    };
  },
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="FAQ"
          title="Frequently asked questions."
          sub="Everything we get asked about ClutchFuel, hydration, and the Clutch Score. Still have a question? Reach out."
        />

        <section className="mx-auto max-w-3xl px-6 pb-20 md:px-10 md:pb-28">
          <div className="space-y-12">
            {faqGroups.map((group) => (
              <Reveal key={group.title}>
                <div>
                  <h2 className="font-display text-2xl font-extrabold tracking-display text-ink md:text-3xl">
                    {group.title}
                  </h2>
                  <div className="mt-6">
                    <FaqAccordion items={group.items} idPrefix={group.title} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <RelatedLinks
          items={[
            { label: "Contact us", to: "/contact", description: "Get a direct answer." },
            { label: "Products", to: "/products", description: "The full system." },
            { label: "Unlock your Clutch Score", to: "/clutch-score", description: "Try it free." },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
