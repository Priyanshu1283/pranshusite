/**
 * In-memory rate limiter for API routes.
 * For serverless (Vercel), consider Redis/Vercel KV for multi-instance consistency.
 */

const store = new Map<string, { count: number; resetAt: number }>();

export const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
export const RATE_LIMIT_MAX_REQUESTS = 5;

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Check and consume one request for the given key (e.g. IP).
 * Returns whether the request is allowed and metadata.
 */
export function rateLimit(
  key: string,
  options: {
    windowMs?: number;
    max?: number;
  } = {}
): RateLimitResult {
  const windowMs = options.windowMs ?? RATE_LIMIT_WINDOW_MS;
  const max = options.max ?? RATE_LIMIT_MAX_REQUESTS;
  const now = Date.now();

  let entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    entry = {
      count: 1,
      resetAt: now + windowMs,
    };
    store.set(key, entry);
    return {
      allowed: true,
      remaining: max - 1,
      resetAt: entry.resetAt,
    };
  }

  entry.count += 1;
  const allowed = entry.count <= max;

  return {
    allowed,
    remaining: Math.max(0, max - entry.count),
    resetAt: entry.resetAt,
  };
}

/**
 * Get client IP from Next.js request (supports Vercel proxy headers).
 */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip") ?? "unknown";
}
