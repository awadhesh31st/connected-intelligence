import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

type Db = ReturnType<typeof drizzle<typeof schema>>;

let cached: Db | null = null;

/**
 * Lazily creates the Drizzle client on first use rather than at module load,
 * so importing this file never crashes a build or an unrelated route when
 * DATABASE_URL isn't set yet — only routes that actually touch the database
 * fail (with a clear error caught by their own try/catch), while everything
 * else on the site keeps working.
 */
export function getDb(): Db {
  if (cached) return cached;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not configured. Set it to a Postgres connection string (e.g. from Neon) to enable device auth and usage tracking."
    );
  }
  cached = drizzle(neon(url), { schema });
  return cached;
}
