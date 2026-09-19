import { pgTable, uuid, text, integer, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

/**
 * One row per installed extension. Identity is anonymous by default: the
 * extension registers itself once (POST /api/extension/register) and gets
 * back an opaque bearer token; only its SHA-256 hash is stored here.
 *
 * `userId` is reserved for an optional future sign-in feature (linking a
 * device to an account for cross-device history/limits) and is nullable so
 * anonymous devices never need one.
 */
export const devices = pgTable("devices", {
  id: uuid("id").defaultRandom().primaryKey(),
  tokenHash: text("token_hash").notNull().unique(),
  userId: uuid("user_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  lastSeenAt: timestamp("last_seen_at", { withTimezone: true }).defaultNow().notNull(),
  revokedAt: timestamp("revoked_at", { withTimezone: true }),
});

/**
 * Per-device, per-UTC-day counters. This is the durable quota backstop that
 * applies even if Upstash rate limiting isn't configured (see
 * `lib/rate-limit.ts`) — it's the one enforcement layer that always runs,
 * since it lives in the same database as the device token itself.
 */
export const usageDaily = pgTable(
  "usage_daily",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    deviceId: uuid("device_id")
      .notNull()
      .references(() => devices.id, { onDelete: "cascade" }),
    day: text("day").notNull(), // "YYYY-MM-DD", UTC
    questionCount: integer("question_count").default(0).notNull(),
    inputTokens: integer("input_tokens").default(0).notNull(),
    outputTokens: integer("output_tokens").default(0).notNull(),
  },
  (table) => ({
    deviceDayUnique: uniqueIndex("usage_daily_device_day_unique").on(table.deviceId, table.day),
  })
);
