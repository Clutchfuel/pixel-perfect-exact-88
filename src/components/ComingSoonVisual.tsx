import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComingSoonVisualProps {
  productName: string;
  stage: string;
  accent?: boolean;
  size?: "card" | "hero";
}

export function ComingSoonVisual({
  productName,
  stage,
  accent = false,
  size = "card",
}: ComingSoonVisualProps) {
  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-2xl",
        accent
          ? "bg-gradient-to-br from-ink to-panel"
          : "bg-gradient-to-br from-mist to-white border border-ink/5",
      )}
    >
      {/* soft glow accent */}
      <div
        className={cn(
          "pointer-events-none absolute -top-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full blur-3xl",
          accent ? "bg-lime/25" : "bg-lime/10",
        )}
      />
      <div className="relative flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-semibold uppercase tracking-eyebrow",
            size === "hero" ? "text-xs" : "text-[10px]",
            accent
              ? "border-lime/40 bg-lime/15 text-lime"
              : "border-ink/15 bg-white/80 text-ink/80 backdrop-blur",
          )}
        >
          <Sparkles className={size === "hero" ? "h-3.5 w-3.5" : "h-3 w-3"} />
          Coming Soon
        </span>
        <div
          className={cn(
            "mt-4 font-display font-extrabold tracking-display",
            size === "hero" ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl",
            accent ? "text-white" : "text-ink",
          )}
        >
          {productName}
        </div>
        <div
          className={cn(
            "mt-2 tracking-eyebrow font-semibold uppercase",
            size === "hero" ? "text-xs" : "text-[10px]",
            accent ? "text-lime" : "text-muted-ink",
          )}
        >
          {stage}
        </div>
      </div>
    </div>
  );
}
