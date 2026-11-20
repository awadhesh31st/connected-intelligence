import { randomBytes, createHash } from "crypto";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { devices } from "@/lib/db/schema";

const TOKEN_BYTES = 32;
/** Prefix makes tokens greppable/recognizable if one ever leaks (e.g. in a log or public repo). */
const TOKEN_PREFIX = "atp_";

/** Generates a new opaque bearer token. Never store this value itself — only its hash. */
export function generateDeviceToken(): string {
  return TOKEN_PREFIX + randomBytes(TOKEN_BYTES).toString("base64url");
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function extractBearerToken(request: Request): string | null {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) return null;
  const token = header.slice("Bearer ".length).trim();
  return token.length > 0 ? token : null;
}

export interface AuthenticatedDevice {
  id: string;
}

/**
 * Verifies a bearer token against stored device hashes. Only ever compares
 * hashes — the raw token is never persisted, so a database leak alone can't
 * be used to impersonate a device.
 *
 * Returns null for a missing, unknown, or revoked token; callers should
 * respond 401 in that case.
 */
export async function verifyDeviceToken(token: string | null): Promise<AuthenticatedDevice | null> {
  if (!token) return null;

  const db = getDb();
  const tokenHash = hashToken(token);
  const [device] = await db.select().from(devices).where(eq(devices.tokenHash, tokenHash)).limit(1);

  if (!device || device.revokedAt) return null;

  // Best-effort activity heartbeat — never block or fail the request on it.
  void db.update(devices).set({ lastSeenAt: new Date() }).where(eq(devices.id, device.id)).catch(() => {});

  return { id: device.id };
}
