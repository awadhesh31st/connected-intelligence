const KEYS = {
  apiKey: "geminiApiKey",
  model: "geminiModel",
} as const;

export const DEFAULT_MODEL = "gemini-2.0-flash";

export async function getApiKey(): Promise<string | undefined> {
  const stored = await chrome.storage.local.get(KEYS.apiKey);
  return stored[KEYS.apiKey] || undefined;
}

export async function setApiKey(apiKey: string): Promise<void> {
  await chrome.storage.local.set({ [KEYS.apiKey]: apiKey });
}

export async function clearApiKey(): Promise<void> {
  await chrome.storage.local.remove(KEYS.apiKey);
}

export async function getModel(): Promise<string> {
  const stored = await chrome.storage.local.get(KEYS.model);
  return stored[KEYS.model] || DEFAULT_MODEL;
}

export async function setModel(model: string): Promise<void> {
  await chrome.storage.local.set({ [KEYS.model]: model });
}
