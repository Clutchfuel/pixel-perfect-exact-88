type EnvRecord = Record<string, string | undefined>;

let workerEnv: EnvRecord | undefined;

export function bindWorkerEnv(env: unknown) {
  if (env && typeof env === "object") {
    workerEnv = env as EnvRecord;
  }
}

export function getEnv(key: string): string | undefined {
  const fromWorker = workerEnv?.[key];
  if (typeof fromWorker === "string" && fromWorker.length > 0) return fromWorker;
  if (typeof process !== "undefined" && process.env?.[key]) {
    return process.env[key];
  }
  return undefined;
}
