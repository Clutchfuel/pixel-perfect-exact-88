import { metricsGlossary } from "@/data/metrics-glossary";
import { cn } from "@/lib/utils";

type ResultsMetricsGuideProps = {
  theme?: "light" | "dark";
  showBodyMass?: boolean;
  className?: string;
};

export function ResultsMetricsGuide({
  theme = "dark",
  showBodyMass = false,
  className,
}: ResultsMetricsGuideProps) {
  const isDark = theme === "dark";
  const items = metricsGlossary.items.filter(
    (item) => showBodyMass || item.id !== "body-mass-loss",
  );

  return (
    <div
      className={cn(
        "rounded-2xl border",
        isDark ? "border-[#242424] bg-[#121212]" : "border-ink/10 bg-mist/40",
        className,
      )}
    >
      <div className="border-b px-5 py-4" style={{ borderColor: isDark ? "#242424" : undefined }}>
        <h3 className={cn("font-display text-lg font-bold", isDark ? "text-white" : "text-ink")}>
          {metricsGlossary.title}
        </h3>
        <p className={cn("mt-1 text-sm", isDark ? "text-[#A1A1A1]" : "text-muted-ink")}>
          {metricsGlossary.intro}
        </p>
      </div>
      <dl className="divide-y" style={{ borderColor: isDark ? "#242424" : undefined }}>
        {items.map((item) => (
          <div
            key={item.id}
            className={cn("px-5 py-4", !isDark && "border-ink/5")}
          >
            <dt className={cn("text-sm font-semibold", isDark ? "text-white" : "text-ink")}>
              {item.term}
            </dt>
            <dd className={cn("mt-1.5 text-sm leading-relaxed", isDark ? "text-[#A1A1A1]" : "text-muted-ink")}>
              {item.definition}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
