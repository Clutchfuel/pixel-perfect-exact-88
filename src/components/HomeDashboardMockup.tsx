import { TrendingUp, Plus } from "lucide-react";
import { CFButton } from "@/components/CFButton";
import { Reveal } from "@/components/Reveal";
import { homeDashboardMockup } from "@/data/home";
import { site } from "@/data/site";
import { useAthleteSession } from "@/hooks/use-athlete-session";
import { cn } from "@/lib/utils";

function MetricCard({
  label,
  value,
  sub,
  className,
}: {
  label: string;
  value: string;
  sub?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 md:px-6 md:py-5",
        className,
      )}
    >
      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-dark">
        {label}
      </div>
      <div className="mt-2 font-display text-2xl font-extrabold tracking-display text-white md:text-3xl">
        {value}
      </div>
      {sub ? <div className="mt-1 text-sm text-muted-dark">{sub}</div> : null}
    </div>
  );
}

export function HomeDashboardMockup() {
  const loggedIn = useAthleteSession();
  const d = homeDashboardMockup;

  return (
    <div className="relative z-10 w-full">
      <Reveal delay={0.08}>
        <div className="mx-auto w-full max-w-[min(100%,90rem)] px-4 sm:px-6 md:px-8 lg:px-10">
          <div
            className="overflow-hidden rounded-[1.75rem] border border-white/12 bg-gradient-to-br from-white/[0.09] via-white/[0.04] to-transparent shadow-[0_32px_80px_-24px_rgba(0,0,0,0.85)] md:rounded-[2rem]"
            role="img"
            aria-label="ClutchFuel dashboard showing Clutch Score, hydration readiness, athlete profile, and trends"
          >
            <div className="grid gap-6 p-6 md:gap-8 md:p-10 lg:grid-cols-12 lg:gap-10 lg:p-12">
              <div className="flex flex-col justify-between lg:col-span-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-dark">
                    {d.scoreLabel}
                  </div>
                  <div className="mt-2 font-display text-[5.5rem] font-extrabold leading-none tracking-display text-white sm:text-[6.5rem] lg:text-[7.5rem]">
                    {d.score}
                  </div>
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-lime/15 px-3 py-1 text-xs font-semibold text-lime">
                    <TrendingUp className="h-3.5 w-3.5" aria-hidden />
                    {d.trendLabel}
                  </div>
                </div>
                {loggedIn ? (
                  <CFButton
                    href={site.sessionHref}
                    variant="primary"
                    size="lg"
                    className="mt-6 w-full sm:w-auto lg:mt-8"
                  >
                    <Plus className="h-5 w-5" aria-hidden />
                    {site.addSessionCta}
                  </CFButton>
                ) : null}
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-2 lg:gap-5">
                <MetricCard label={d.readiness.label} value={d.readiness.value} />
                <MetricCard label={d.profile.label} value={d.profile.value} sub={d.profile.sub} />
                <MetricCard
                  label={d.consistency.label}
                  value={d.consistency.value}
                  className="sm:col-span-1"
                />
                <MetricCard
                  label={d.trend.title}
                  value={d.trend.value}
                  sub={d.trend.sub}
                  className="sm:col-span-1"
                />
              </div>
            </div>

            {!loggedIn ? (
              <div className="border-t border-white/8 bg-black/20 px-6 py-4 md:px-12">
                <p className="text-center text-xs text-muted-dark md:text-sm">{d.footnote}</p>
              </div>
            ) : null}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
