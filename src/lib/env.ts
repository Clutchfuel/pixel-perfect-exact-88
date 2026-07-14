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

/**
 * Nitro's cloudflare-module handler assigns Worker bindings here on every request.
 * The SSR service is invoked as fetch(request) without env, so this is the reliable path.
 */
function readNitroEnv(): unknown {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (globalThis as { __env__?: unknown }).__env__;
  } catch {
    return undefined;
  }
}

function readAllEnvCandidates(): unknown[] {
  return [workerEnv, readNitroEnv()];
}

export function bindWorkerEnv(env: unknown) {
  if (env && typeof env === "object") {
    workerEnv = env as EnvRecord;
    rateLimitKv = pickKv(env) ?? rateLimitKv;
    leadsDb = pickLeadsDb(env) ?? leadsDb;
  }
}

export function getEnv(key: string): string | undefined {
  for (const candidate of readAllEnvCandidates()) {
    const record = asRecord(candidate);
    const value = record?.[key];
    if (typeof value === "string" && value.length > 0) return value;
  }
  if (typeof process !== "undefined" && process.env?.[key]) {
    return process.env[key];
  }
  return undefined;
}

export function getRateLimitKv(): KVNamespace | undefined {
  if (rateLimitKv) return rateLimitKv;
  for (const candidate of readAllEnvCandidates()) {
    const kv = pickKv(candidate);
    if (kv) {
      rateLimitKv = kv;
      return kv;
    }
  }
  return undefined;
}

export function getLeadsDb(): D1Database | undefined {
  if (leadsDb) return leadsDb;
  for (const candidate of readAllEnvCandidates()) {
    const db = pickLeadsDb(candidate);
    if (db) {
      leadsDb = db;
      return db;
    }
  }
  return undefined;
}
