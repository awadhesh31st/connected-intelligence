import { getDb } from "@/lib/db/client";
import { devices } from "@/lib/db/schema";
import { generateDeviceToken, hashToken } from "@/lib/auth/device-token";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(body: unknown, status = 200): Response {
  return Response.json(body, { status, headers: CORS_HEADERS });
}

export function OPTIONS(): Response {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

/**
 * Issues a new anonymous device token for the extension. Called once, on
 * first use, and the resulting token is stored locally by the extension and
 * sent as `Authorization: Bearer <token>` on every subsequent request.
 *
 * Rate-limited per IP (not per device — there's no device yet) so a script
 * can't mint unlimited devices to farm free quota from a single machine.
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const ip = getClientIp(request);
    const { allowed } = await checkRateLimit("device-register", ip, 20, "1 h");
    if (!allowed) {
      return json({ error: "Too many registration attempts. Please try again later." }, 429);
    }

    const db = getDb();
    const token = generateDeviceToken();
    await db.insert(devices).values({ tokenHash: hashToken(token) });

    return json({ token });
  } catch (err) {
    console.error("[extension/register] Failed to register device:", err);
    return json({ error: "Could not register this device right now. Please try again." }, 503);
  }
}
