type EnvRecord = Record<string, string | undefined>;

let workerEnv: EnvRecord | undefined;
let rateLimitKv: KVNamespace | undefined;
let leadsDb: D1Database | undefined;

function asRecord(env: unknown): Record<string, unknown> | undefined {
  if (!env || typeof env !== "object") return undefined;
  return env as Record<string, unknown>;
}

function pickLeadsDb(env: unknown): D1Database | undefined {
  const record = asRecord(env);
  const db = record?.LEADS_DB;
  return db && typeof db === "object" ? (db as D1Database) : undefined;
}

function pickKv(env: unknown): KVNamespace | undefined {
  const record = asRecord(env);
  const kv = record?.RATE_LIMIT_KV;
  return kv && typeof kv === "object" ? (kv as KVNamespace) : undefined;
}

/** Best-effort read of Cloudflare module env when bindWorkerEnv didn't run. */
function readCloudflareModuleEnv(): unknown {
  try {
    // Cloudflare Workers native module (available in supported runtimes).
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mod = (globalThis as any)["__CLOUDFLARE_WORKER_ENV__"];
    if (mod) return mod;
  } catch {
    /* ignore */
  }
  try {
    // Some Nitro builds expose bindings here.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cf = (globalThis as any).Cloudflare?.env;
    if (cf) return cf;
  } catch {
    /* ignore */
  }
  return undefined;
}

export function bindWorkerEnv(env: unknown) {
  if (env && typeof env === "object") {
    workerEnv = env as EnvRecord;
    rateLimitKv = pickKv(env) ?? rateLimitKv;
    leadsDb = pickLeadsDb(env) ?? leadsDb;
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
  if (rateLimitKv) return rateLimitKv;
  const fromModule = pickKv(readCloudflareModuleEnv());
  if (fromModule) rateLimitKv = fromModule;
  return rateLimitKv;
}

export function getLeadsDb(): D1Database | undefined {
  if (leadsDb) return leadsDb;
  const fromModule = pickLeadsDb(readCloudflareModuleEnv());
  if (fromModule) {
    leadsDb = fromModule;
    return leadsDb;
  }
  return undefined;
}
