/** Ambient types for Cloudflare Workers virtual modules used at runtime. */
declare module "cloudflare:workers" {
  // Minimal surface we use — wrangler types can replace this later.
  export const env: {
    LEADS_DB?: D1Database;
    RATE_LIMIT_KV?: KVNamespace;
    ASSETS?: Fetcher;
    [key: string]: unknown;
  };
}
