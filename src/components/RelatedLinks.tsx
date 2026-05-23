import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface RelatedItem {
  label: string;
  to: string;
  description?: string;
}

export function RelatedLinks({
  title = "Keep going",
  items,
  theme = "light",
}: {
  title?: string;
  items: RelatedItem[];
  theme?: "light" | "dark";
}) {
  const isDark = theme === "dark";
  return (
    <section
      className={cn(
        "w-full",
        isDark ? "bg-dark text-white" : "bg-mist text-ink"
      )}
    >
      <div className="mx-auto w-full max-w-5xl px-6 py-16 md:px-10 md:py-20">
        <h2
          className={cn(
            "font-display text-2xl font-extrabold tracking-display md:text-3xl",
            isDark ? "text-white" : "text-ink"
          )}
        >
          {title}
        </h2>
        <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to as never}
              className={cn(
                "group flex items-start justify-between gap-4 rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-0.5",
                isDark
                  ? "border-white/10 bg-white/[0.04] hover:border-lime/40 hover:bg-white/[0.06]"
                  : "border-ink/10 bg-white hover:border-ink/30 hover:shadow-card"
              )}
            >
              <div>
                <div className={cn("font-semibold", isDark ? "text-white" : "text-ink")}>
                  {item.label}
                </div>
                {item.description && (
                  <div
                    className={cn(
                      "mt-1 text-sm",
                      isDark ? "text-muted-dark" : "text-muted-ink"
                    )}
                  >
                    {item.description}
                  </div>
                )}
              </div>
              <ArrowUpRight
                className={cn(
                  "mt-1 h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                  isDark ? "text-lime" : "text-ink/50 group-hover:text-ink"
                )}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
