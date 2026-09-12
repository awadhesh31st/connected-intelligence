export type BlockType =
  | "heading"
  | "paragraph"
  | "listitem"
  | "tablecell"
  | "code"
  | "quote"
  | "link";

export interface PageBlock {
  /** Stable id within a single extraction pass; also written to the DOM as data-ask-page-id. */
  id: string;
  type: BlockType;
  /** Heading level 1-6, only set when type === "heading". */
  level?: number;
  text: string;
  /** Breadcrumb of ancestor heading text, outermost first. */
  headingPath: string[];
}

export interface PageModel {
  url: string;
  title: string;
  extractedAt: number;
  blocks: PageBlock[];
  /** True when the page had more content than the extraction cap allowed. */
  truncated: boolean;
}

export interface Citation {
  blockId: string;
  quote: string;
}

export interface AskAnswer {
  answer: string;
  found: boolean;
  citations: Citation[];
  sectionTitle?: string;
}

export interface ChatTurn {
  role: "user" | "assistant";
  text: string;
  citations?: Citation[];
  found?: boolean;
  sectionTitle?: string;
}
