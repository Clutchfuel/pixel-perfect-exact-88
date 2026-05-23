import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Sport } from "@/data/sports";
import { OptimizedImage } from "@/components/OptimizedImage";
import { sportImageBySlug } from "@/assets/image-sets";

export function SportCard({ sport }: { sport: Sport }) {
  const images = sportImageBySlug[sport.slug];
  return (
    <Link
      to="/athletes/$sport"
      params={{ sport: sport.slug }}
      className="group relative flex aspect-[4/5] h-full flex-col justify-between overflow-hidden rounded-3xl border border-ink/8 bg-dark p-6 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
    >
      <OptimizedImage
        avif={images.avif}
        webp={images.webp}
        fallback={images.fallback}
        alt={`${sport.name} athlete`}
        width={1536}
        height={1024}
        className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-80"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-dark/10" />
      <div className="relative">
        <div className="tracking-eyebrow text-[10px] font-semibold uppercase text-lime">
          {sport.eyebrow}
        </div>
      </div>
      <div className="relative">
        <h3 className="font-display text-2xl font-extrabold tracking-display text-white">
          {sport.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-white/70">{sport.sub}</p>
        <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white transition group-hover:gap-2">
          Explore
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
