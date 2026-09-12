import type { PageChunk, PageQAResult, PageQARequest } from "@chatbot/core";

/** Default backend endpoint (the demo app running locally). */
export const DEFAULT_ENDPOINT = "http://localhost:3000/api/page-qa";

const STORAGE_KEY = "askThisPage:endpoint";

/**
 * Resolve the backend endpoint, allowing an override stored in chrome.storage.
 */
export async function getEndpoint(): Promise<string> {
  try {
    const result = await chrome.storage.sync.get(STORAGE_KEY);
    const stored = result[STORAGE_KEY];
    return typeof stored === "string" && stored.length > 0
      ? stored
      : DEFAULT_ENDPOINT;
  } catch {
    return DEFAULT_ENDPOINT;
  }
}

/**
 * Persist a custom backend endpoint.
 */
export async function setEndpoint(endpoint: string): Promise<void> {
  await chrome.storage.sync.set({ [STORAGE_KEY]: endpoint });
}

/**
 * Ask the backend a question about the current page.
 *
 * Fetched from the side panel (extension origin) using the host permission for
 * the endpoint, so it is not subject to CORS restrictions.
 */
export async function askPage(params: {
  question: string;
  url: string;
  title: string;
  chunks: PageChunk[];
}): Promise<PageQAResult> {
  const endpoint = await getEndpoint();

  const body: PageQARequest = {
    question: params.question,
    url: params.url,
    title: params.title,
    chunks: params.chunks,
  };

  let res: Response;
  try {
    res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error(
      `Couldn't reach the backend at ${endpoint}. Make sure it's running.`
    );
  }

  if (!res.ok) {
    let message = `Request failed (${res.status}).`;
    try {
      const data = (await res.json()) as { error?: string };
      if (data?.error) message = data.error;
    } catch {
      // Ignore JSON parse errors and use the default message.
    }
    throw new Error(message);
  }

  return (await res.json()) as PageQAResult;
}
