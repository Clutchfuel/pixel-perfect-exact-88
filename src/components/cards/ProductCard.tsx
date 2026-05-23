import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";
import { ComingSoonVisual } from "@/components/ComingSoonVisual";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card",
        product.accent ? "border-lime/40 lime-glow" : "border-ink/8",
      )}
    >
      <ComingSoonVisual productName={product.name} stage={product.stage} accent={product.accent} />
      <div className="mt-6 flex flex-1 flex-col">
        <div className="tracking-eyebrow text-xs font-semibold uppercase text-muted-ink">
          {product.stage}
        </div>
        <h3 className="mt-2 font-display text-2xl font-extrabold tracking-display text-ink">
          {product.name}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-ink">{product.tagline}</p>
        <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-ink transition group-hover:gap-2">
          Explore
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
