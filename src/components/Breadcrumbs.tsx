import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  name: string;
  to?: string;
}

export function Breadcrumbs({
  items,
  theme = "light",
}: {
  items: Crumb[];
  theme?: "light" | "dark";
}) {
  const muted = theme === "dark" ? "text-muted-dark" : "text-muted-ink";
  const strong = theme === "dark" ? "text-white" : "text-ink";
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${muted}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-50" />}
              {c.to && !last ? (
                <Link to={c.to} className="transition hover:opacity-80">
                  {c.name}
                </Link>
              ) : (
                <span className={last ? `font-medium ${strong}` : ""}>{c.name}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
