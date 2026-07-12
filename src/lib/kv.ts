import "server-only";

/**
 * Storage for site stats, likes and comments.
 *  - Production with Vercel KV connected (KV_REST_API_URL/TOKEN): durable Redis.
 *  - Otherwise: in-memory fallback (works, but resets on redeploy/scale).
 * All keys are prefixed `hl:` so this can safely share a KV store with other projects.
 *
 * To make it durable: Vercel dashboard → hangul-love → Storage → connect a
 * KV (Upstash Redis) store. Env vars are then injected automatically.
 */

const P = "hl:";
export const K = {
  views: `${P}views`, // hash: path -> count
  likes: `${P}likes`, // hash: path -> count
  daily: `${P}daily`, // hash: YYYY-MM-DD -> count
  visitors: `${P}visitors`, // hash: YYYY-MM-DD -> unique-ish count
  commentsAll: `${P}comments:all`, // list of recent comments (JSON)
  commentList: (path: string) => `${P}comments:${encodeURIComponent(path)}`,
};

export function isKVConfigured(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

type KVClient = typeof import("@vercel/kv").kv;
let _kv: KVClient | null = null;
async function kvClient(): Promise<KVClient | null> {
  if (!isKVConfigured()) return null;
  if (_kv) return _kv;
  try {
    const mod = await import("@vercel/kv");
    _kv = mod.kv;
    return _kv;
  } catch {
    return null;
  }
}

// ── In-memory fallback ───────────────────────────────────────────────
const mem = {
  hash: new Map<string, Map<string, number>>(),
  list: new Map<string, string[]>(),
};
function memHash(key: string) {
  if (!mem.hash.has(key)) mem.hash.set(key, new Map());
  return mem.hash.get(key)!;
}

// ── Ops ──────────────────────────────────────────────────────────────
export async function hincr(key: string, field: string, by = 1): Promise<number> {
  const kv = await kvClient();
  if (kv) return kv.hincrby(key, field, by);
  const h = memHash(key);
  const v = (h.get(field) ?? 0) + by;
  h.set(field, v);
  return v;
}

export async function hgetAll(key: string): Promise<Record<string, number>> {
  const kv = await kvClient();
  if (kv) {
    const r = (await kv.hgetall<Record<string, number>>(key)) ?? {};
    // @vercel/kv may return numbers or strings; coerce.
    const out: Record<string, number> = {};
    for (const [k, v] of Object.entries(r)) out[k] = Number(v) || 0;
    return out;
  }
  return Object.fromEntries(memHash(key));
}

export async function listPush(key: string, value: string, cap = 5000): Promise<void> {
  const kv = await kvClient();
  if (kv) {
    await kv.lpush(key, value);
    await kv.ltrim(key, 0, cap - 1);
    return;
  }
  const l = mem.list.get(key) ?? [];
  l.unshift(value);
  mem.list.set(key, l.slice(0, cap));
}

export async function listRange(key: string, start = 0, stop = 99): Promise<string[]> {
  const kv = await kvClient();
  if (kv) {
    const r = (await kv.lrange<string>(key, start, stop)) ?? [];
    return r.map((x) => (typeof x === "string" ? x : JSON.stringify(x)));
  }
  return (mem.list.get(key) ?? []).slice(start, stop + 1);
}

export async function listRemove(key: string, value: string): Promise<void> {
  const kv = await kvClient();
  if (kv) {
    await kv.lrem(key, 0, value);
    return;
  }
  const l = mem.list.get(key) ?? [];
  mem.list.set(key, l.filter((x) => x !== value));
}

export function today(): string {
  // Server timezone; good enough for a daily bucket.
  return new Date().toISOString().slice(0, 10);
}
