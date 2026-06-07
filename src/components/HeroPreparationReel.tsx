"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { OptimizedImage } from "@/components/OptimizedImage";
import {
  HERO_PREPARATION_SCENES,
  HERO_SCENE_CROSSFADE_MS,
  HERO_SCENE_DURATION_MS,
} from "@/data/hero-preparation-reel";

const mediaClass =
  "h-full w-full object-cover object-center grayscale-[0.35] contrast-[1.06] saturate-[1.02] brightness-[0.94]";

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

export function HeroPreparationReel() {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const scene = HERO_PREPARATION_SCENES[index]!;
  const total = HERO_PREPARATION_SCENES.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, HERO_SCENE_DURATION_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, total]);

  const staticIndex = reduceMotion ? 0 : index;
  const active = HERO_PREPARATION_SCENES[staticIndex]!;

  return (
    <div className="absolute inset-0 overflow-hidden bg-brand-base" aria-hidden>
      <AnimatePresence mode="sync">
        <motion.div
          key={active.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: HERO_SCENE_CROSSFADE_MS / 1000,
            ease: EASE,
          }}
        >
          <motion.div
            className="absolute inset-0"
            initial={reduceMotion ? false : { scale: 1, x: "0%", y: "0%" }}
            animate={
              reduceMotion
                ? undefined
                : {
                    scale: 1.08,
                    x: "-1.5%",
                    y: "-0.75%",
                  }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: HERO_SCENE_DURATION_MS / 1000,
                    ease: EASE,
                  }
            }
          >
            <OptimizedImage
              avif={active.image.avif}
              webp={active.image.webp}
              fallback={active.image.fallback}
              alt={active.alt}
              width={1920}
              height={1080}
              priority={staticIndex === 0}
              className={mediaClass}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {!reduceMotion && (
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 h-24",
            "bg-gradient-to-t from-brand-base/80 to-transparent",
          )}
        />
      )}
    </div>
  );
}
