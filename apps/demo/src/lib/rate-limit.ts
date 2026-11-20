import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type Window = `${number} ${"s" | "m" | "h" | "d"}`;

let redis: Redis | null | undefined;

function getRedis(): Redis | null {
  if (redis !== undefined) return redis;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  redis = url && token ? new Redis({ url, token }) : null;
  return redis;
}

const limiters = new Map<string, Ratelimit>();

function getLimiter(name: string, limit: number, window: Window): Ratelimit | null {
  const client = getRedis();
  if (!client) return null;

  const key = `${name}:${limit}:${window}`;
  let limiter = limiters.get(key);
  if (!limiter) {
    limiter = new Ratelimit({
      redis: client,
      limiter: Ratelimit.slidingWindow(limit, window),
      analytics: true,
      prefix: `ratelimit:${name}`,
    });
    limiters.set(key, limiter);
  }
  return limiter;
}

/**
 * Best-effort client IP from proxy headers (Vercel sets x-forwarded-for).
 * Used as a secondary rate-limit dimension alongside device/user identifiers
 * so a single IP can't mint unlimited devices to bypass per-device limits.
 */
export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

/**
 * Sliding-window rate limit check for `identifier` under the named bucket.
 *
 * Fails OPEN when Upstash isn't configured (no UPSTASH_REDIS_REST_URL/TOKEN),
 * so local development works without setting up Redis. This is a burst
 * throttle only — the per-device daily quota in `usage_daily` (see
 * `lib/db/schema.ts`) is the layer that's always enforced regardless of
 * whether Redis is configured, so omitting Upstash never removes all abuse
 * protection, only the tighter short-window one. Configure Upstash in
 * production to get real burst protection.
 */
export async function checkRateLimit(
  name: string,
  identifier: string,
  limit: number,
  window: Window
): Promise<{ allowed: boolean; remaining: number }> {
  const limiter = getLimiter(name, limit, window);
  if (!limiter) return { allowed: true, remaining: limit };

  const result = await limiter.limit(identifier);
  return { allowed: result.success, remaining: result.remaining };
}
