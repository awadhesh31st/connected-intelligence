import type { PageChunk, PageCitation } from "@chatbot/core";

/** A message rendered in the side panel conversation. */
export interface UiMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  /** Assistant only: whether the answer was found on the page. */
  found?: boolean;
  /** Assistant only: citations pointing back at page chunks. */
  citations?: PageCitation[];
  /** Assistant only: the chunks that were sent for this answer (for heading lookup). */
  chunks?: PageChunk[];
  /** Assistant only: the tab the answer's page content came from. */
  tabId?: number;
}
