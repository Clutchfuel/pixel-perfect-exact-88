/**
 * Integration-ready sync layer for future wearable connections.
 * UI shows Coming Soon; this module defines the contract for when OAuth flows ship.
 */
import type { DeviceIntegrationId, SyncedWorkoutData } from "@/data/calculator";

export type DeviceConnectionState = "disconnected" | "pending" | "connected";

export type DeviceConnection = {
  integrationId: DeviceIntegrationId;
  state: DeviceConnectionState;
  lastSyncedAt?: string;
};

const connections = new Map<DeviceIntegrationId, DeviceConnection>();

export function getDeviceConnections(): DeviceConnection[] {
  return [...connections.values()];
}

/** Placeholder — will call provider OAuth when integrations launch. */
export async function connectDevice(integrationId: DeviceIntegrationId): Promise<DeviceConnection> {
  const entry: DeviceConnection = {
    integrationId,
    state: "pending",
  };
  connections.set(integrationId, entry);
  return entry;
}

/** Placeholder — will pull activity summaries from connected providers. */
export async function syncWorkoutData(
  _integrationId: DeviceIntegrationId,
): Promise<SyncedWorkoutData | null> {
  return null;
}

export function applySyncedWorkoutToCalculator(workout: SyncedWorkoutData) {
  return {
    caloriesBurned: workout.caloriesBurned,
    durationMinutes: workout.durationMinutes,
    activityType: workout.activityType,
  };
}
