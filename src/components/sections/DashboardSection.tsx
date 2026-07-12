import { Link } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ScoreRing } from "@/components/ScoreRing";
import { dashboard } from "@/data/home";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { TrendingUp, Droplets, ArrowRight } from "lucide-react";

export function DashboardSection() {
  return (
    <Section theme="dark" id="platform">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-eyebrow text-lime">
          {dashboard.eyebrow}
        </p>
        <h2 className="mt-3 max-w-4xl font-display text-4xl font-extrabold tracking-display text-white sm:text-5xl lg:text-[64px]">
          {dashboard.headline}
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-muted-dark">{dashboard.sub}</p>
        <p className="mt-3 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-eyebrow text-white/70">
          Preview UI · not a live account dashboard
        </p>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <Link
            to="/clutch-score"
            className="group rounded-3xl glass-dark p-8 lg:col-span-5 transition hover:ring-1 hover:ring-lime/30"
          >
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-eyebrow text-muted-dark">Today</div>
              <div className="flex items-center gap-1 rounded-full bg-lime/15 px-2.5 py-1 text-[11px] font-semibold text-lime">
                <TrendingUp className="h-3 w-3" />
                {dashboard.scoreDelta}
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <ScoreRing value={dashboard.score} label={dashboard.scoreLabel} />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {dashboard.tiles.map((t) => (
                <div key={t.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-[11px] uppercase tracking-eyebrow text-muted-dark">
                    {t.label}
                  </div>
                  <div className="mt-1 font-display text-2xl font-extrabold tracking-display text-white">
                    {t.value}
                  </div>
                  <div className="text-[11px] text-muted-dark">{t.sub}</div>
                </div>
              ))}
            </div>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-lime">
              Unlock your score{" "}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>

          <div className="grid gap-5 lg:col-span-7">
            <div className="grid gap-5 sm:grid-cols-5">
              <Link
                to="/sweat-rate"
                className="rounded-3xl glass-dark p-6 sm:col-span-2 transition hover:ring-1 hover:ring-lime/30"
              >
                <div className="flex items-center gap-2 text-xs uppercase tracking-eyebrow text-muted-dark">
                  <Droplets className="h-3.5 w-3.5 text-lime" />
                  {dashboard.sweatProfile.title}
                </div>
                <div className="mt-3 font-display text-3xl font-extrabold tracking-display text-white">
                  {dashboard.sweatProfile.value}
                </div>
                <div className="mt-1 text-sm text-muted-dark">{dashboard.sweatProfile.sub}</div>
                <div className="mt-5 flex h-16 items-end gap-1.5">
                  {[35, 55, 48, 70, 62, 88, 80].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-lime/70"
                      style={{ height: `${h}%`, opacity: 0.3 + (i / 7) * 0.7 }}
                    />
                  ))}
                </div>
              </Link>

              <div className="rounded-3xl glass-dark p-6 sm:col-span-3">
                <div className="text-xs uppercase tracking-eyebrow text-muted-dark">
                  Hydration trend · 7 days
                </div>
                <div className="mt-1 font-display text-2xl font-extrabold tracking-display text-white">
                  +12% consistency
                </div>
                <div className="mt-3 h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={dashboard.trend}
                      margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="limeFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="oklch(0.92 0.18 130)" stopOpacity={0.5} />
                          <stop offset="100%" stopColor="oklch(0.92 0.18 130)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="d"
                        stroke="oklch(1 0 0 / 0.3)"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="oklch(1 0 0 / 0.2)"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                        width={28}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "oklch(0.19 0 0)",
                          border: "1px solid oklch(1 0 0 / 0.1)",
                          borderRadius: 12,
                          color: "white",
                          fontSize: 12,
                        }}
                        cursor={{
                          stroke: "oklch(0.92 0.18 130)",
                          strokeWidth: 1,
                          strokeDasharray: "3 3",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="v"
                        stroke="oklch(0.92 0.18 130)"
                        strokeWidth={2.5}
                        fill="url(#limeFill)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="rounded-3xl glass-dark p-6">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-eyebrow text-muted-dark">
                  Recent sessions
                </div>
                <Link to="/platform" className="text-xs text-lime hover:underline">
                  View all
                </Link>
              </div>
              <ul className="mt-4 divide-y divide-white/5">
                {dashboard.history.map((h) => (
                  <li key={h.name}>
                    <Link
                      to={h.href}
                      className="flex items-center justify-between gap-4 py-3 transition hover:bg-white/[0.02]"
                    >
                      <div className="min-w-0">
                        <div className="truncate font-medium text-white">{h.name}</div>
                        <div className="text-xs text-muted-dark">
                          {h.time} · {h.type}
                        </div>
                      </div>
                      <div className="font-display text-xl font-extrabold tracking-display text-lime">
                        {h.score}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
