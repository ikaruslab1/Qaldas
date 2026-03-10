/// <reference types="@cloudflare/workers-types" />

export interface CloudflareEnv {
  DB: D1Database;
  NEXT_CACHE_WORKERS_KV: KVNamespace;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends CloudflareEnv { }
  }
}
