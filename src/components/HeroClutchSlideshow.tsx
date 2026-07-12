"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { OptimizedImage } from "@/components/OptimizedImage";
import { heroClutchMoments } from "@/data/hero-slideshow";

const TRANSITION_MS = 900;
const PRE_END_SECONDS = 0.45;
const TRANSITION_EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

export function HeroClutchSlideshow() {
  const [visibleSlot, setVisibleSlot] = useState<0 | 1>(0);
  const [slotIndices, setSlotIndices] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dipActive, setDipActive] = useState(false);
  const transitioning = useRef(false);
  const preEndTriggered = useRef(false);
  const videoRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];

  const currentIndex = slotIndices[visibleSlot];
  const current = heroClutchMoments[currentIndex]!;
  const total = heroClutchMoments.length;

  const goTo = useCallback(
    async (nextIndex: number) => {
      if (reduceMotion || transitioning.current) return;
      if (nextIndex === slotIndices[visibleSlot]) return;

      transitioning.current = true;
      preEndTriggered.current = true;
      setDipActive(true);

      const hiddenSlot = (visibleSlot === 0 ? 1 : 0) as 0 | 1;
      const video = videoRefs[hiddenSlot].current;
      const moment = heroClutchMoments[nextIndex];
      if (!video || !moment) {
        transitioning.current = false;
        setDipActive(false);
        return;
      }

      if (video.getAttribute("src") !== moment.video) {
        video.src = moment.video;
      }
      video.currentTime = 0;

      try {
        await video.play();
      } catch {
        /* autoplay may be blocked until interaction */
      }

      videoRefs[visibleSlot].current?.pause();
      setSlotIndices((prev) => {
        const next: [number, number] = [...prev];
        next[hiddenSlot] = nextIndex;
        return next;
      });
      setVisibleSlot(hiddenSlot);
      setProgress(0);

      window.setTimeout(() => {
        transitioning.current = false;
        setDipActive(false);
        preEndTriggered.current = false;
      }, TRANSITION_MS);
    },
    [reduceMotion, slotIndices, visibleSlot, videoRefs],
  );

  const advance = useCallback(() => {
    goTo((currentIndex + 1) % total);
  }, [currentIndex, goTo, total]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    videoRefs[0].current?.play().catch(() => undefined);
  }, [reduceMotion, videoRefs]);

  useEffect(() => {
    if (paused || reduceMotion) {
      videoRefs[visibleSlot].current?.pause();
      return;
    }
    videoRefs[visibleSlot].current?.play().catch(() => undefined);
  }, [paused, reduceMotion, visibleSlot, videoRefs]);

  useEffect(() => {
    preEndTriggered.current = false;
  }, [currentIndex, visibleSlot]);

  useEffect(() => {
    const video = videoRefs[visibleSlot].current;
    if (!video || reduceMotion) return;

    const tick = () => {
      if (!video.duration || !Number.isFinite(video.duration)) return;

      setProgress(video.currentTime / video.duration);

      const remaining = video.duration - video.currentTime;
      if (
        remaining <= PRE_END_SECONDS &&
        !preEndTriggered.current &&
        !transitioning.current &&
        !paused
      ) {
        preEndTriggered.current = true;
        advance();
      }
    };

    const onEnded = () => {
      if (!preEndTriggered.current && !transitioning.current) {
        advance();
      }
    };

    video.addEventListener("timeupdate", tick);
    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("timeupdate", tick);
      video.removeEventListener("ended", onEnded);
    };
  }, [reduceMotion, visibleSlot, currentIndex, advance, paused, videoRefs]);

  if (reduceMotion) {
    return (
      <HeroFrame current={current} progress={1} onSelect={goTo} activeIndex={currentIndex}>
        <OptimizedImage
          avif={current.poster.avif}
          webp={current.poster.webp}
          fallback={current.poster.fallback}
          alt={current.alt}
          width={1200}
          height={1500}
          priority
          className="h-full w-full object-cover grayscale contrast-[1.12]"
        />
      </HeroFrame>
    );
  }

  return (
    <HeroFrame
      current={current}
      progress={progress}
      onSelect={goTo}
      activeIndex={currentIndex}
      onPause={setPaused}
      dipActive={dipActive}
    >
      {([0, 1] as const).map((slot) => {
        const moment = heroClutchMoments[slotIndices[slot]]!;
        const isVisible = visibleSlot === slot;
        return (
          <motion.div
            key={slot}
            className="absolute inset-0 overflow-hidden"
            initial={false}
            animate={{
              opacity: isVisible ? 1 : 0,
              scale: isVisible ? 1 : 1.06,
              filter: isVisible ? "blur(0px)" : "blur(10px)",
            }}
            transition={{ duration: TRANSITION_MS / 1000, ease: TRANSITION_EASE }}
            aria-hidden={!isVisible}
          >
            <video
              ref={videoRefs[slot]}
              className="h-full w-full object-cover grayscale contrast-[1.12] saturate-[1.08] brightness-[0.96]"
              src={slot === 0 ? moment.video : undefined}
              poster={moment.poster.webp}
              muted
              playsInline
              preload="metadata"
            />
            {isVisible && (
              <motion.div
                key={`flash-${slotIndices[slot]}`}
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-lime/20 via-transparent to-white/10 mix-blend-overlay"
                initial={{ opacity: 0.25 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
              />
            )}
          </motion.div>
        );
      })}
    </HeroFrame>
  );
}

function HeroFrame({
  children,
  current,
  progress,
  onSelect,
  activeIndex,
  onPause,
  dipActive = false,
}: {
  children: React.ReactNode;
  current: (typeof heroClutchMoments)[number];
  progress: number;
  onSelect: (index: number) => void;
  activeIndex: number;
  onPause?: (paused: boolean) => void;
  dipActive?: boolean;
}) {
  return (
    <div
      className="absolute inset-0 bg-ink"
      onMouseEnter={() => onPause?.(true)}
      onMouseLeave={() => onPause?.(false)}
      onFocus={() => onPause?.(true)}
      onBlur={() => onPause?.(false)}
      aria-hidden
    >
      {children}

      <AnimatePresence>
        {dipActive && (
          <motion.div
            key="dip"
            className="pointer-events-none absolute inset-0 z-[2] bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.18 }}
            exit={{ opacity: 0 }}
            transition={{ duration: TRANSITION_MS / 2000, ease: TRANSITION_EASE }}
          />
        )}
      </AnimatePresence>

      {/* Readability scrims for overlaid copy + header */}
      <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-r from-ink/95 via-ink/65 to-ink/25" />
      <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-b from-ink/75 via-ink/20 to-ink/85" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 z-[3] h-64 w-64 rounded-full bg-lime/15 blur-3xl" />

      <div className="pointer-events-auto absolute inset-x-0 bottom-0 z-[4] flex justify-end p-6 md:p-10">
        <div className="w-full max-w-xs text-right sm:max-w-sm">
          <div className="mb-3 h-0.5 overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-lime transition-[width] duration-150 ease-linear"
              style={{ width: `${Math.min(100, progress * 100)}%` }}
            />
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-eyebrow text-lime">
            Clutch moments
          </p>
          <p className="mt-1 font-display text-lg font-extrabold tracking-display text-white md:text-xl">
            {current.label}
          </p>
          {current.stakes ? (
            <p className="mt-0.5 text-xs font-medium text-white/75">{current.stakes}</p>
          ) : null}
          <p className="mt-0.5 text-xs text-white/50">{current.sport}</p>
        </div>
      </div>

      <div
        className="pointer-events-auto absolute right-6 top-28 z-[4] flex gap-1.5 md:right-10 md:top-32"
        role="tablist"
        aria-label="Clutch moment videos"
      >
        {heroClutchMoments.map((moment, i) => (
          <button
            key={moment.id}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`${moment.label}${moment.stakes ? ` — ${moment.stakes}` : ""} — ${moment.sport}`}
            onClick={() => onSelect(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === activeIndex ? "w-6 bg-lime" : "w-1.5 bg-white/40 hover:bg-white/70",
            )}
          />
        ))}
      </div>
    </div>
  );
}
