import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Sport } from "@/data/sports";

export function SportCard({ sport }: { sport: Sport }) {
  return (
    <Link
      to="/athletes/$sport"
      params={{ sport: sport.slug }}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-ink/8 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
    >
      <div>
        <div className="tracking-eyebrow text-xs font-semibold uppercase text-muted-ink">
          {sport.eyebrow}
        </div>
        <h3 className="mt-4 font-display text-2xl font-extrabold tracking-display text-ink">
          {sport.name}
        </h3>
        <p className="mt-3 text-sm text-muted-ink">{sport.sub}</p>
      </div>
      <div className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-ink transition group-hover:gap-2">
        Explore
        <ArrowUpRight className="h-4 w-4" />
      </div>
    </Link>
  );
}
