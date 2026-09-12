import type { AskAnswer, ChatTurn, PageModel } from "./types";

export type RuntimeRequest =
  | { type: "EXTRACT_PAGE"; tabId: number; force?: boolean }
  | { type: "ASK"; tabId: number; question: string; history: ChatTurn[] }
  | { type: "HIGHLIGHT"; tabId: number; blockId: string }
  | { type: "GET_API_KEY_STATUS" };

export type RuntimeResponse =
  | { ok: true; type: "EXTRACT_PAGE"; pageModel: PageModel }
  | { ok: true; type: "ASK"; answer: AskAnswer }
  | { ok: true; type: "HIGHLIGHT" }
  | { ok: true; type: "GET_API_KEY_STATUS"; hasKey: boolean }
  | { ok: false; error: string };

export function sendRuntimeMessage<T extends RuntimeRequest>(
  message: T
): Promise<RuntimeResponse> {
  return chrome.runtime.sendMessage(message);
}
