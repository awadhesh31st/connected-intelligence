/**
 * Shared types for the "Ask This Page" feature.
 *
 * These shapes are used by both the backend route (`/api/page-qa`) and the
 * browser extension so that page content, questions, and answers travel over
 * the wire with a single source of truth.
 */

/**
 * A single meaningful block of content extracted from a webpage.
 *
 * `id` is a stable identifier assigned during extraction that the extension's
 * content script can later use to locate the originating DOM node for
 * highlighting/scrolling. The model is asked to reference these ids in its
 * citations.
 */
export interface PageChunk {
  /** Stable, per-extraction identifier (e.g. "c12"). */
  id: string;
  /** The originating element's tag name, lowercased (e.g. "p", "li", "h2"). */
  tag: string;
  /** Nearest preceding heading text that gives the chunk its section context. */
  heading?: string;
  /** The visible text content of the block. */
  text: string;
}

/**
 * A citation returned by the model pointing back at a specific {@link PageChunk}.
 */
export interface PageCitation {
  /** The {@link PageChunk.id} the answer was drawn from. */
  chunkId: string;
  /**
   * A short verbatim quote copied from the chunk text. Used to highlight the
   * exact sentence within the source element on the page.
   */
  quote: string;
}

/**
 * The structured result of a page question-answering request.
 */
export interface PageQAResult {
  /** Whether the answer could be found on the page. */
  found: boolean;
  /** The natural-language answer to the user's question. */
  answer: string;
  /** Zero or more citations pointing at the source chunks. */
  citations: PageCitation[];
}

/**
 * The request body accepted by the `/api/page-qa` route.
 */
export interface PageQARequest {
  /** The user's natural-language question. */
  question: string;
  /** The URL of the page being asked about. */
  url: string;
  /** The document title of the page being asked about. */
  title: string;
  /** The extracted content blocks of the page. */
  chunks: PageChunk[];
}
