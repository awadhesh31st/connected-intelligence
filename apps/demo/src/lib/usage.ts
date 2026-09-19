import { and, eq, sql } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { usageDaily } from "@/lib/db/schema";

/**
 * Free-tier daily question cap per anonymous device. This is the mandatory
 * quota layer — enforced from the database regardless of whether Upstash
 * rate limiting (see `lib/rate-limit.ts`) is configured.
 */
export const DAILY_QUESTION_LIMIT = 30;

function today(): string {
  return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD", UTC
}

export interface UsageSnapshot {
  questionCount: number;
  remaining: number;
}

/** Reads today's usage for a device without modifying it. */
export async function getTodayUsage(deviceId: string): Promise<UsageSnapshot> {
  const db = getDb();
  const [row] = await db
    .select({ questionCount: usageDaily.questionCount })
    .from(usageDaily)
    .where(and(eq(usageDaily.deviceId, deviceId), eq(usageDaily.day, today())))
    .limit(1);

  const questionCount = row?.questionCount ?? 0;
  return { questionCount, remaining: Math.max(0, DAILY_QUESTION_LIMIT - questionCount) };
}

/**
 * Records one successful question against today's usage. Call this only
 * AFTER a successful model call, so a failed or rejected request never
 * counts against the device's quota.
 */
export async function recordUsage(
  deviceId: string,
  tokens: { inputTokens: number; outputTokens: number }
): Promise<void> {
  const db = getDb();
  const day = today();
  await db
    .insert(usageDaily)
    .values({
      deviceId,
      day,
      questionCount: 1,
      inputTokens: tokens.inputTokens,
      outputTokens: tokens.outputTokens,
    })
    .onConflictDoUpdate({
      target: [usageDaily.deviceId, usageDaily.day],
      set: {
        questionCount: sql`${usageDaily.questionCount} + 1`,
        inputTokens: sql`${usageDaily.inputTokens} + ${tokens.inputTokens}`,
        outputTokens: sql`${usageDaily.outputTokens} + ${tokens.outputTokens}`,
      },
    });
}
