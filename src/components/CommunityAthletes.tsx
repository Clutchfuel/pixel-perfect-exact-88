import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const COMMUNITY_ATHLETE_TYPES = [
  "Runner",
  "Lifter",
  "Basketball Player",
  "Cyclist",
  "Parent Athlete",
  "Weekend Warrior",
  "Student Athlete",
  "Functional Fitness",
] as const;

/** Homepage community band — headline + rotating athlete type + one line of support. */
export function CommunityAthletes() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (COMMUNITY_ATHLETE_TYPES.length < 2 || reduce) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % COMMUNITY_ATHLETE_TYPES.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, [reduce]);

  const longest = COMMUNITY_ATHLETE_TYPES.reduce(
    (a, b) => (a.length >= b.length ? a : b),
    COMMUNITY_ATHLETE_TYPES[0],
  );
  const current = COMMUNITY_ATHLETE_TYPES[index];

  return (
    <section className="border-t border-white/10 bg-[#070707] text-white">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-5 py-28 text-center sm:px-8 sm:py-36">
        <h2 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
          Built for the Everyday Athlete
        </h2>

        <p className="mt-8 text-2xl font-semibold tracking-tight sm:mt-10 sm:text-3xl md:text-4xl" aria-live="polite">
          <span className="relative inline-grid">
            <span className="invisible col-start-1 row-start-1 whitespace-nowrap" aria-hidden>
              {longest}
            </span>
            {reduce ? (
              <span className="col-start-1 row-start-1 whitespace-nowrap text-[#c1ff00]">{current}</span>
            ) : (
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={current}
                  className="col-start-1 row-start-1 whitespace-nowrap text-[#c1ff00]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {current}
                </motion.span>
              </AnimatePresence>
            )}
          </span>
        </p>

        <p className="mt-10 max-w-xl text-base leading-relaxed text-white/55 sm:mt-12 sm:text-lg">
          ClutchFuel is built for people who keep showing up, wherever they are in their journey.
        </p>
      </div>
    </section>
  );
}
