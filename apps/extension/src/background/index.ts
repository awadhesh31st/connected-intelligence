import type { RuntimeRequest, RuntimeResponse } from "../lib/protocol";
import type { PageModel } from "../lib/types";
import { askGemini, LlmError } from "../lib/llm";
import { getApiKey, getModel } from "../lib/storage";

const pageModelCache = new Map<number, PageModel>();

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(() => {});
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === "loading") {
    pageModelCache.delete(tabId);
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  pageModelCache.delete(tabId);
});

async function ensureContentScript(tabId: number): Promise<void> {
  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ["content.js"],
    });
  } catch (err) {
    throw new Error(
      "Can't read this page. Browser and extension store pages aren't accessible to extensions."
    );
  }
}

async function extractPage(tabId: number, force = false): Promise<PageModel> {
  if (!force) {
    const cached = pageModelCache.get(tabId);
    if (cached) return cached;
  }
  await ensureContentScript(tabId);
  const results = await chrome.scripting.executeScript({
    target: { tabId },
    func: () => window.__askThisPage!.extract(),
  });
  const pageModel = results[0]?.result as PageModel | undefined;
  if (!pageModel) throw new Error("Failed to read page content.");
  pageModelCache.set(tabId, pageModel);
  return pageModel;
}

async function highlightBlocks(tabId: number, blockIds: string[]): Promise<boolean> {
  await ensureContentScript(tabId);
  const results = await chrome.scripting.executeScript({
    target: { tabId },
    func: (ids: string[]) => window.__askThisPage!.highlight(ids),
    args: [blockIds],
  });
  return Boolean(results[0]?.result);
}

async function handleMessage(message: RuntimeRequest): Promise<RuntimeResponse> {
  switch (message.type) {
    case "GET_API_KEY_STATUS": {
      const apiKey = await getApiKey();
      return { ok: true, type: "GET_API_KEY_STATUS", hasKey: Boolean(apiKey) };
    }
    case "EXTRACT_PAGE": {
      const pageModel = await extractPage(message.tabId, message.force);
      return { ok: true, type: "EXTRACT_PAGE", pageModel };
    }
    case "ASK": {
      const apiKey = await getApiKey();
      if (!apiKey) {
        return { ok: false, error: "No Gemini API key set. Open the extension options to add one." };
      }
      const model = await getModel();
      const pageModel = await extractPage(message.tabId, false);
      const answer = await askGemini({
        apiKey,
        model,
        question: message.question,
        history: message.history,
        pageModel,
      });
      if (answer.found && answer.citations.length > 0) {
        highlightBlocks(
          message.tabId,
          answer.citations.map((c) => c.blockId)
        ).catch(() => {});
      }
      return { ok: true, type: "ASK", answer };
    }
    case "HIGHLIGHT": {
      const success = await highlightBlocks(message.tabId, [message.blockId]);
      if (!success) return { ok: false, error: "Couldn't find that section on the page anymore." };
      return { ok: true, type: "HIGHLIGHT" };
    }
    default:
      return { ok: false, error: "Unknown message type." };
  }
}

chrome.runtime.onMessage.addListener((message: RuntimeRequest, _sender, sendResponse) => {
  handleMessage(message)
    .then(sendResponse)
    .catch((err: unknown) => {
      const errorMessage =
        err instanceof LlmError || err instanceof Error ? err.message : "Something went wrong.";
      sendResponse({ ok: false, error: errorMessage } satisfies RuntimeResponse);
    });
  return true;
});
