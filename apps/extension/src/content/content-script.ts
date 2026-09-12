import type { PanelToContentMessage, ContentResponse } from "../shared/messages";
import { extractChunks } from "./extract";
import { highlightCitation, clearHighlight } from "./highlight";

/**
 * Content script: extracts page content on request and performs
 * highlighting/scrolling for citations. Communicates with the side panel via
 * chrome.runtime messaging.
 */
chrome.runtime.onMessage.addListener(
  (
    message: PanelToContentMessage,
    _sender,
    sendResponse: (response: ContentResponse) => void
  ) => {
    switch (message.type) {
      case "GET_CHUNKS": {
        try {
          const { url, title, chunks } = extractChunks();
          sendResponse({ ok: true, url, title, chunks });
        } catch (err) {
          sendResponse({
            ok: false,
            error:
              err instanceof Error ? err.message : "Failed to read the page.",
          });
        }
        return true;
      }
      case "HIGHLIGHT": {
        sendResponse(highlightCitation(message.chunkId, message.quote));
        return true;
      }
      case "CLEAR_HIGHLIGHT": {
        clearHighlight();
        sendResponse({ ok: true });
        return true;
      }
      default:
        return false;
    }
  }
);
