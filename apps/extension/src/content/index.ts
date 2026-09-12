import { extractPage } from "./extractor";
import { clearAllHighlights, highlightBlocks } from "./highlighter";
import type { PageModel } from "../lib/types";

declare global {
  interface Window {
    __askThisPage?: {
      extract: () => PageModel;
      highlight: (blockIds: string[]) => boolean;
      clear: () => void;
    };
  }
}

if (!window.__askThisPage) {
  window.__askThisPage = {
    extract: extractPage,
    highlight: highlightBlocks,
    clear: clearAllHighlights,
  };
}
