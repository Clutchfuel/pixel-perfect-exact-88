"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { OptimizedImage } from "@/components/OptimizedImage";
import { HERO_REEL } from "@/data/hero-video";

const mediaClass =
  "h-full w-full object-cover grayscale contrast-[1.1] saturate-[1.05] brightness-[0.97]";

export function HeroClutchVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [usePoster, setUsePoster] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const video = videoRef.current;
    if (!video) return;

    let settled = false;
    const showPoster = () => {
      if (!settled) {
        settled = true;
        setUsePoster(true);
      }
    };

    const timeout = window.setTimeout(showPoster, 3000);
    const onReady = () => {
      settled = true;
      window.clearTimeout(timeout);
      video.play().catch(showPoster);
    };

    video.addEventListener("loadeddata", onReady);
    video.addEventListener("error", showPoster);
    if (video.readyState >= 2) onReady();

    return () => {
      window.clearTimeout(timeout);
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("error", showPoster);
    };
  }, [reduceMotion]);

  if (reduceMotion || usePoster) {
    return (
      <div className="absolute inset-0 bg-brand-base" aria-hidden>
        <OptimizedImage
          avif={HERO_REEL.poster.avif}
          webp={HERO_REEL.poster.webp}
          fallback={HERO_REEL.poster.fallback}
          mobile={{
            avif: HERO_REEL.mobilePoster.avif,
            webp: HERO_REEL.mobilePoster.webp,
            fallback: HERO_REEL.mobilePoster.fallback,
          }}
          alt={HERO_REEL.alt}
          width={1920}
          height={1080}
          priority
          className={mediaClass}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-brand-base" aria-hidden>
      <OptimizedImage
        avif={HERO_REEL.poster.avif}
        webp={HERO_REEL.poster.webp}
        fallback={HERO_REEL.poster.fallback}
        alt=""
        width={1920}
        height={1080}
        priority
        className={cn(mediaClass, "absolute inset-0")}
        aria-hidden
      />
      <video
        ref={videoRef}
        className={cn(mediaClass, "absolute inset-0")}
        src={HERO_REEL.src}
        poster={HERO_REEL.poster.fallback}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
        onError={() => setUsePoster(true)}
      />
    </div>
  );
}
