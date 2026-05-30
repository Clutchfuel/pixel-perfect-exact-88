import { Link2 } from "lucide-react";
import { deviceIntegrations, calculatorMessaging } from "@/data/calculator";
import { toast } from "sonner";

export function DeviceConnectSection() {
  function onConnect(name: string) {
    toast.info(`${name} integration coming soon — enter session details manually for now.`);
  }

  return (
    <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-start gap-3">
        <Link2 className="mt-0.5 h-5 w-5 shrink-0 text-lime" aria-hidden />
        <div>
          <h2 className="font-display text-lg font-extrabold tracking-display text-white">
            {calculatorMessaging.deviceHeadline}
          </h2>
          <p className="mt-1 text-sm text-muted-dark">{calculatorMessaging.deviceSub}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {deviceIntegrations
          .filter((d) =>
            ["apple-health", "garmin", "whoop", "strava", "fitbit"].includes(d.id),
          )
          .map((device) => (
            <button
              key={device.id}
              type="button"
              onClick={() => onConnect(device.name)}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-dark/40 px-4 py-3 text-left transition hover:border-lime/40 hover:bg-white/5"
            >
              <span className="text-sm font-medium text-white">Connect {device.name}</span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-dark">
                Coming Soon
              </span>
            </button>
          ))}
      </div>
    </section>
  );
}
