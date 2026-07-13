import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ATHLETE_TYPES } from "@/data/athlete-types";

/** Homepage community band — fixed headline + rotating calculator athlete types. */
export function CommunityAthletes() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (ATHLETE_TYPES.length < 2 || reduce) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % ATHLETE_TYPES.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, [reduce]);

  const longest = ATHLETE_TYPES.reduce((a, b) => (a.length >= b.length ? a : b), ATHLETE_TYPES[0]);
  const current = ATHLETE_TYPES[index];

  return (
    <section className="border-t border-black/5 bg-[#070707] text-white">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-5 py-28 text-center sm:px-8 sm:py-36">
        <h2 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
          Built for everyday athletes.
        </h2>

        <p className="mt-10 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl" aria-live="polite">
          <span className="relative inline-grid">
            <span className="invisible col-start-1 row-start-1 whitespace-nowrap" aria-hidden>
              {longest}
            </span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={current}
                className="col-start-1 row-start-1 whitespace-nowrap text-[#c1ff00]"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {current}
              </motion.span>
            </AnimatePresence>
          </span>
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5" role="presentation">
          {ATHLETE_TYPES.map((type, i) => (
            <button
              key={type}
              type="button"
              aria-label={type}
              aria-current={i === index ? "true" : undefined}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-[#c1ff00]" : "w-2 bg-white/25 hover:bg-white/45"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
