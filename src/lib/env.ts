type EnvRecord = Record<string, string | undefined>;

let workerEnv: EnvRecord | undefined;
let rateLimitKv: KVNamespace | undefined;

export function bindWorkerEnv(env: unknown) {
  if (env && typeof env === "object") {
    workerEnv = env as EnvRecord;
    const record = env as { RATE_LIMIT_KV?: KVNamespace };
    rateLimitKv = record.RATE_LIMIT_KV;
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

export function getRateLimitKv(): KVNamespace | undefined {
  return rateLimitKv;
}
