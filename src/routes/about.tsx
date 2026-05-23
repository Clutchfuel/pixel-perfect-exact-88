import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Reveal } from "@/components/Reveal";
import { about } from "@/data/about";
import { makeMeta, canonical } from "@/lib/seo";
import aboutTeam from "@/assets/about-team.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: makeMeta({
      title: "About — Built by Athletes Who Got Tired of Guessing | ClutchFuel",
      description:
        "ClutchFuel was built to give everyday athletes the personalized hydration intelligence usually reserved for pros. Here's the why behind it.",
      path: "/about",
    }),
    links: canonical("/about"),
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <Header overDark />
      <main>
        <PageHero
          eyebrow={about.eyebrow}
          title={about.headline}
          sub={about.intro}
          bgImage={aboutTeam}
          bgImageAlt="ClutchFuel formulation lab"
        />

        <section className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-20">
          {about.story.map((p, i) => (
            <Reveal key={i}>
              <p className="mt-6 text-lg leading-relaxed text-ink/80 first:mt-0">{p}</p>
            </Reveal>
          ))}
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-ink/8">
              <img
                src={aboutTeam}
                alt="ClutchFuel team working on hydration formulations in the lab"
                loading="lazy"
                width={1536}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </section>

        <section className="bg-mist">
          <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
            <h2 className="font-display text-3xl font-extrabold tracking-display text-ink md:text-5xl">
              What we believe.
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {about.values.map((v) => (
                <Reveal key={v.title}>
                  <div className="rounded-3xl border border-ink/8 bg-white p-7">
                    <h3 className="font-display text-xl font-extrabold tracking-display text-ink">
                      {v.title}
                    </h3>
                    <p className="mt-3 text-muted-ink">{v.copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <RelatedLinks
          items={[
            { label: "The System", to: "/system", description: "How we built it." },
            { label: "Insights", to: "/insights", description: "What we know." },
            { label: "Contact", to: "/contact", description: "Get in touch." },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
