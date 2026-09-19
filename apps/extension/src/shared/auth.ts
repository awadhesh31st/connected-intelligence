import { getEndpoint } from "./api";

const TOKEN_STORAGE_KEY = "askThisPage:deviceToken";

/**
 * Anonymous device auth. On first use the extension registers itself with
 * the backend (POST /api/extension/register) and gets back an opaque bearer
 * token, which is cached in chrome.storage.local (never .sync — this is a
 * secret and shouldn't be copied to a user's other machines via Chrome
 * sync) and reused on every request until revoked.
 */

function registerEndpointFrom(pageQAEndpoint: string): string {
  const url = new URL(pageQAEndpoint);
  url.pathname = "/api/extension/register";
  url.search = "";
  return url.toString();
}

async function getStoredToken(): Promise<string | null> {
  try {
    const result = await chrome.storage.local.get(TOKEN_STORAGE_KEY);
    const stored = result[TOKEN_STORAGE_KEY];
    return typeof stored === "string" && stored.length > 0 ? stored : null;
  } catch {
    return null;
  }
}

async function storeToken(token: string): Promise<void> {
  await chrome.storage.local.set({ [TOKEN_STORAGE_KEY]: token });
}

async function clearStoredToken(): Promise<void> {
  await chrome.storage.local.remove(TOKEN_STORAGE_KEY);
}

async function registerDevice(): Promise<string> {
  const endpoint = await getEndpoint();
  const registerUrl = registerEndpointFrom(endpoint);

  const res = await fetch(registerUrl, { method: "POST" });
  if (!res.ok) {
    let message = `Could not register this device (${res.status}).`;
    try {
      const data = (await res.json()) as { error?: string };
      if (data?.error) message = data.error;
    } catch {
      // Ignore JSON parse errors and use the default message.
    }
    throw new Error(message);
  }

  const { token } = (await res.json()) as { token: string };
  await storeToken(token);
  return token;
}

/** Returns the cached device token, registering a new device if none exists yet. */
export async function ensureDeviceToken(): Promise<string> {
  const existing = await getStoredToken();
  if (existing) return existing;
  return registerDevice();
}

/**
 * Call when the backend rejects the current token as invalid/revoked (401).
 * Clears the cache and registers a fresh device so the next request can
 * retry, rather than leaving the extension permanently broken.
 */
export async function resetDeviceToken(): Promise<string> {
  await clearStoredToken();
  return registerDevice();
}
