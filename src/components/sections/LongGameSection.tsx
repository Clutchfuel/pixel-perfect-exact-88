import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { longGame } from "@/data/home";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export function LongGameSection() {
  return (
    <Section theme="dark">
      <Reveal>
        <h2 className="max-w-3xl font-display text-4xl font-extrabold tracking-display text-white sm:text-5xl lg:text-[64px]">
          {longGame.headline}
        </h2>
        <p className="mt-4 max-w-xl text-lg text-muted-dark">{longGame.sub}</p>
      </Reveal>

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        <Reveal delay={0.05}>
          <div className="rounded-3xl glass-dark p-6 lg:col-span-2 h-full">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-eyebrow text-muted-dark">
                  Clutch Score · 12 weeks
                </div>
                <div className="mt-1 font-display text-3xl font-extrabold tracking-display text-white">
                  87 <span className="text-lg text-lime">▲ 25</span>
                </div>
              </div>
              <div className="rounded-full border border-lime/30 bg-lime/10 px-3 py-1 text-xs font-semibold text-lime">
                Trending up
              </div>
            </div>
            <div className="mt-6 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={longGame.trend} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <XAxis dataKey="w" stroke="oklch(1 0 0 / 0.3)" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(1 0 0 / 0.2)" fontSize={10} tickLine={false} axisLine={false} width={28} />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(0.19 0 0)",
                      border: "1px solid oklch(1 0 0 / 0.1)",
                      borderRadius: 12,
                      color: "white",
                      fontSize: 12,
                    }}
                    cursor={{ stroke: "oklch(0.92 0.18 130)", strokeWidth: 1, strokeDasharray: "3 3" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="v"
                    stroke="oklch(0.92 0.18 130)"
                    strokeWidth={2.5}
                    dot={{ fill: "oklch(0.92 0.18 130)", r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="flex h-full flex-col gap-5">
            <div className="rounded-3xl glass-dark p-6">
              <div className="text-xs uppercase tracking-eyebrow text-muted-dark">
                Hydration streak
              </div>
              <div className="mt-2 font-display text-5xl font-extrabold tracking-display text-white">
                {longGame.streak}
                <span className="ml-2 text-lg text-muted-dark">days</span>
              </div>
              <div className="mt-5 flex items-center justify-between gap-2">
                {longGame.sessions.map((s, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className={
                        s.on
                          ? "h-10 w-full rounded-md bg-lime"
                          : "h-10 w-full rounded-md border border-white/10 bg-white/5"
                      }
                    />
                    <div className="text-[10px] uppercase tracking-eyebrow text-muted-dark">
                      {s.d}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl glass-dark p-6">
              <div className="text-xs uppercase tracking-eyebrow text-muted-dark">
                Last 3 sessions
              </div>
              <ul className="mt-3 space-y-2.5">
                {["Court Session · 87", "Threshold Run · 84", "Hyrox Sim · 81"].map((t) => (
                  <li key={t} className="flex items-center justify-between text-sm text-white/80">
                    <span>{t.split(" · ")[0]}</span>
                    <span className="font-display font-extrabold text-lime">{t.split(" · ")[1]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
