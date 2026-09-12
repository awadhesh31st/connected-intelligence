import type { HighlightResponse } from "../shared/messages";
import { getElementForChunk } from "./extract";

const STYLE_ID = "cai-highlight-style";
const MARK_CLASS = "cai-highlight";
const BLOCK_CLASS = "cai-highlight-block";

/** Marks currently applied for the active highlight, so we can remove them. */
let activeMarks: HTMLElement[] = [];
/** Element currently given a block-level outline (fallback highlight). */
let activeBlock: Element | null = null;

/** Inject highlight styles once. */
function ensureStyles(): void {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    .${MARK_CLASS} {
      background: #fde68a;
      color: inherit;
      border-radius: 2px;
      box-shadow: 0 0 0 2px #fde68a;
      animation: cai-pulse 1.2s ease-out 2;
    }
    .${BLOCK_CLASS} {
      outline: 3px solid #f59e0b !important;
      outline-offset: 2px;
      border-radius: 4px;
      animation: cai-pulse 1.2s ease-out 2;
    }
    @keyframes cai-pulse {
      0% { background-color: rgba(245, 158, 11, 0.55); }
      100% { background-color: transparent; }
    }
  `;
  document.documentElement.appendChild(style);
}

/** Remove any highlight currently applied to the page. */
export function clearHighlight(): void {
  for (const mark of activeMarks) {
    const parent = mark.parentNode;
    if (!parent) continue;
    // Unwrap: replace the <mark> with its text content, then merge text nodes.
    while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
    parent.removeChild(mark);
    parent.normalize();
  }
  activeMarks = [];

  if (activeBlock) {
    activeBlock.classList.remove(BLOCK_CLASS);
    activeBlock = null;
  }
}

interface TextNodeSpan {
  node: Text;
  start: number;
  end: number;
}

/**
 * Collect the text nodes under `root` along with their offsets into a single
 * concatenated raw string.
 */
function collectTextNodes(root: Element): {
  spans: TextNodeSpan[];
  raw: string;
} {
  const spans: TextNodeSpan[] = [];
  let raw = "";
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode() as Text | null;
  while (node) {
    const data = node.data;
    spans.push({ node, start: raw.length, end: raw.length + data.length });
    raw += data;
    node = walker.nextNode() as Text | null;
  }
  return { spans, raw };
}

/**
 * Build a normalized (whitespace-collapsed) version of `raw` plus a mapping
 * from each normalized-string index back to the original raw index.
 */
function buildNormalizedIndex(raw: string): { norm: string; map: number[] } {
  let norm = "";
  const map: number[] = [];
  let prevWasSpace = false;
  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    if (/\s/.test(ch)) {
      if (prevWasSpace || norm.length === 0) continue;
      norm += " ";
      map.push(i);
      prevWasSpace = true;
    } else {
      norm += ch;
      map.push(i);
      prevWasSpace = false;
    }
  }
  // Trim trailing space from the normalized string.
  while (norm.endsWith(" ")) {
    norm = norm.slice(0, -1);
    map.pop();
  }
  return { norm, map };
}

/**
 * Wrap the raw character range [rawStart, rawEnd) across the given text-node
 * spans in <mark> elements. Wrapping is done per text node (each sub-range sits
 * within a single node), which keeps DOM mutations safe and simple.
 */
function wrapRange(
  spans: TextNodeSpan[],
  rawStart: number,
  rawEnd: number
): HTMLElement[] {
  const marks: HTMLElement[] = [];
  for (const span of spans) {
    const s = Math.max(rawStart, span.start);
    const e = Math.min(rawEnd, span.end);
    if (s >= e) continue;
    try {
      const range = document.createRange();
      range.setStart(span.node, s - span.start);
      range.setEnd(span.node, e - span.start);
      const mark = document.createElement("mark");
      mark.className = MARK_CLASS;
      // surroundContents on a range within a single text node is safe and
      // never injects HTML (it moves existing text nodes into the mark).
      range.surroundContents(mark);
      marks.push(mark);
    } catch {
      // Skip nodes that can't be cleanly wrapped.
    }
  }
  return marks;
}

/**
 * Highlight the source of a citation and scroll it into view.
 *
 * Attempts to wrap the exact verbatim `quote` within the cited chunk's element.
 * Falls back to outlining the whole element if the quote can't be located.
 */
export function highlightCitation(
  chunkId: string,
  quote: string
): HighlightResponse {
  ensureStyles();
  clearHighlight();

  const el = getElementForChunk(chunkId);
  if (!el) {
    return { ok: false, error: "Source no longer on the page." };
  }

  el.scrollIntoView({ behavior: "smooth", block: "center" });

  const normalizedQuote = quote.replace(/\s+/g, " ").trim();
  let matched = false;

  if (normalizedQuote.length > 0) {
    const { spans, raw } = collectTextNodes(el);
    const { norm, map } = buildNormalizedIndex(raw);
    const normIndex = norm.indexOf(normalizedQuote);

    if (normIndex !== -1 && map.length > 0) {
      const rawStart = map[normIndex];
      const lastNormIndex = normIndex + normalizedQuote.length - 1;
      const rawEnd = map[Math.min(lastNormIndex, map.length - 1)] + 1;
      const marks = wrapRange(spans, rawStart, rawEnd);
      if (marks.length > 0) {
        activeMarks = marks;
        matched = true;
      }
    }
  }

  if (!matched) {
    // Fallback: outline the entire source element.
    el.classList.add(BLOCK_CLASS);
    activeBlock = el;
  }

  return { ok: true, matched };
}
