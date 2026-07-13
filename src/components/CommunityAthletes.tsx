import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

import photoRunning from "@/assets/sport-running.jpg";
import photoParent from "@/assets/community-parent.jpg";
import photoBasketball from "@/assets/sport-basketball.jpg";
import photoWeekend from "@/assets/community-weekend.jpg";
import photoCrossfit from "@/assets/community-crossfit.jpg";
import photoCollege from "@/assets/community-college.jpg";
import photoHyrox from "@/assets/sport-hyrox.jpg";
import photoHero from "@/assets/home-hero-cinematic.jpg";

const FACES = [
  photoRunning,
  photoParent,
  photoBasketball,
  photoWeekend,
  photoCrossfit,
  photoCollege,
  photoHyrox,
  photoHero,
] as const;

const WHO = [
  "The runner chasing a first 5K.",
  "The parent squeezing in a workout before work.",
  "The basketball player trying to stay ready.",
  "The lifter working toward one more rep.",
  "The cyclist training for the next ride.",
  "The student balancing school and sport.",
] as const;

const VALUES = [
  {
    title: "Learn",
    copy: "Evidence-based insights from coaches and sports science.",
  },
  {
    title: "Improve",
    copy: "Personalized recommendations based on your Clutch Score.",
  },
  {
    title: "Connect",
    copy: "A growing home for everyday athletes chasing goals like yours.",
  },
  {
    title: "Stay Consistent",
    copy: "Small wins. Accountability. Progress over perfection.",
  },
] as const;

/** Homepage belonging section — identity and purpose, not a fake live community. */
export function CommunityAthletes() {
  return (
    <section className="border-t border-white/10 bg-[#070707] text-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className="text-center text-xs font-medium uppercase tracking-[0.28em] text-[#c1ff00]/80">
            You Belong Here
          </p>
          <h2 className="mx-auto mt-6 max-w-3xl text-balance text-center text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            Built for the Everyday Athlete.
          </h2>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mx-auto mt-10 max-w-2xl space-y-4 text-center text-lg leading-relaxed text-white/55 sm:text-xl">
            <p>Not professionals.</p>
            <p>Not influencers.</p>
            <p className="text-white">People who show up.</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mx-auto mt-14 max-w-xl space-y-4 text-center text-base leading-relaxed text-white/50 sm:text-lg">
            {WHO.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="mx-auto mt-12 max-w-md text-center text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl">
            If you care about getting better—
            <br />
            you belong here.
          </p>
        </Reveal>

        {/* Faces — no labels, just recognition */}
        <Reveal delay={0.14}>
          <div className="mt-20 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {FACES.map((src, i) => (
              <div
                key={i}
                className="aspect-[4/5] overflow-hidden bg-white/5 sm:aspect-[3/4]"
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover grayscale contrast-110 transition duration-700 hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mx-auto mt-16 max-w-xl text-center text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl">
            Every workout has a purpose.
            <br />
            Every athlete has a goal.
            <br />
            Every journey deserves a team.
          </p>
          <p className="mx-auto mt-8 max-w-md text-center text-sm leading-relaxed text-white/45">
            We're building the home for everyday athletes. Join us early.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-10 border-t border-white/10 pt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={0.04 * i}>
              <div>
                <h3 className="text-lg font-bold tracking-tight text-[#c1ff00]">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{v.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-16 flex justify-center">
            <Link
              to="/clutch-score"
              className="inline-flex items-center gap-2 rounded-full bg-electric px-8 py-4 text-base font-semibold text-black transition hover:bg-electric-dark"
            >
              Get Your Clutch Score <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
