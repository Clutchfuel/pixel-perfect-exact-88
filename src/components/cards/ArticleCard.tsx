import { Link } from "@tanstack/react-router";
import type { Article } from "@/data/insights";
import { Clock } from "lucide-react";

export function ArticleCard({ article }: { article: Article }) {
  const d = new Date(article.publishedAt);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
  return (
    <Link
      to="/insights/$slug"
      params={{ slug: article.slug }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/8 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
    >
      <div className="flex items-center justify-between text-xs">
        <span className="rounded-full bg-mist px-2.5 py-1 font-semibold uppercase tracking-eyebrow text-ink/70">
          {article.category}
        </span>
        <span className="inline-flex items-center gap-1 text-muted-ink">
          <Clock className="h-3 w-3" />
          {article.readMinutes} min
        </span>
      </div>
      <h3 className="mt-5 font-display text-xl font-extrabold leading-tight tracking-display text-ink md:text-2xl">
        {article.title}
      </h3>
      <p className="mt-3 flex-1 text-sm text-muted-ink">{article.excerpt}</p>
      <div className="mt-6 text-xs text-muted-ink">{date}</div>
    </Link>
  );
}
