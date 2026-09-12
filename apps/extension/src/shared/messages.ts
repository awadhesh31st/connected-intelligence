import type { PageChunk } from "@chatbot/core";

/**
 * Messages sent from the side panel to a tab's content script.
 */
export type PanelToContentMessage =
  | { type: "GET_CHUNKS" }
  | { type: "HIGHLIGHT"; chunkId: string; quote: string }
  | { type: "CLEAR_HIGHLIGHT" };

/**
 * Successful response to a `GET_CHUNKS` request: the extracted page content.
 */
export interface ChunksResponse {
  ok: true;
  url: string;
  title: string;
  chunks: PageChunk[];
}

/**
 * Response to a `HIGHLIGHT` request.
 */
export interface HighlightResponse {
  ok: boolean;
  /** True if the exact quote was found and wrapped; false if we fell back to the whole chunk. */
  matched?: boolean;
  error?: string;
}

/**
 * Generic error response shape.
 */
export interface ErrorResponse {
  ok: false;
  error: string;
}

export type ContentResponse = ChunksResponse | HighlightResponse | ErrorResponse;

/**
 * Send a message to the content script of a specific tab and await its reply.
 * Resolves to `null` if no content script is present (e.g. chrome:// pages).
 */
export async function sendToTab<T = ContentResponse>(
  tabId: number,
  message: PanelToContentMessage
): Promise<T | null> {
  try {
    return (await chrome.tabs.sendMessage(tabId, message)) as T;
  } catch {
    // No receiving end (restricted page or content script not injected).
    return null;
  }
}

/**
 * Resolve the currently active tab in the focused window.
 */
export async function getActiveTab(): Promise<chrome.tabs.Tab | null> {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  return tab ?? null;
}
