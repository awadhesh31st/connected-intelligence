import type { PageChunk } from "@chatbot/core";

/**
 * Maps the stable chunk id assigned during extraction back to the DOM element
 * it came from, so highlighting can locate the source node later. Kept in the
 * content script's persistent module scope.
 */
const idToElement = new Map<string, Element>();

/** Elements whose text we consider a meaningful content block. */
const BLOCK_SELECTOR =
  "h1,h2,h3,h4,h5,h6,p,li,blockquote,figcaption,dt,dd,td,th,pre";

/** Ancestor tags whose content is chrome/navigation rather than page content. */
const SKIP_ANCESTORS = new Set([
  "NAV",
  "HEADER",
  "FOOTER",
  "ASIDE",
  "SCRIPT",
  "STYLE",
  "NOSCRIPT",
  "TEMPLATE",
]);

const HEADING_TAGS = new Set(["H1", "H2", "H3", "H4", "H5", "H6"]);

const MIN_TEXT_LENGTH = 3;
const MAX_CHUNKS = 600;
const MAX_CHUNK_TEXT = 2000;

/** Collapse runs of whitespace to a single space and trim. */
function normalizeText(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function isSkippable(el: Element): boolean {
  // Walk ancestors looking for navigation/hidden containers.
  let node: Element | null = el;
  while (node && node !== document.body) {
    if (SKIP_ANCESTORS.has(node.tagName)) return true;
    if (node.getAttribute("aria-hidden") === "true") return true;
    node = node.parentElement;
  }
  return false;
}

function isVisible(el: Element): boolean {
  const htmlEl = el as HTMLElement;
  // offsetParent is null for display:none (and fixed elements, which we still
  // check via computed style below).
  const style = window.getComputedStyle(htmlEl);
  if (style.display === "none" || style.visibility === "hidden") return false;
  if (parseFloat(style.opacity || "1") === 0) return false;
  if (htmlEl.offsetParent === null && style.position !== "fixed") {
    // Could be genuinely hidden or just not laid out; treat as hidden.
    return false;
  }
  return true;
}

/**
 * Extract meaningful, visible content blocks from the current page.
 *
 * Iterates elements in document order, tracks the nearest preceding heading as
 * each block's section context, assigns each block a stable id, and remembers
 * the id -> element mapping for later highlighting.
 */
export function extractChunks(): {
  url: string;
  title: string;
  chunks: PageChunk[];
} {
  idToElement.clear();

  const chunks: PageChunk[] = [];
  const seen = new Set<string>();
  let currentHeading = "";
  let counter = 0;

  const elements = Array.from(document.querySelectorAll(BLOCK_SELECTOR));

  for (const el of elements) {
    if (chunks.length >= MAX_CHUNKS) break;
    if (isSkippable(el)) continue;
    if (!isVisible(el)) continue;

    const rawText = (el as HTMLElement).innerText ?? el.textContent ?? "";
    const text = normalizeText(rawText).slice(0, MAX_CHUNK_TEXT);
    if (text.length < MIN_TEXT_LENGTH) continue;

    const tag = el.tagName.toLowerCase();

    if (HEADING_TAGS.has(el.tagName)) {
      currentHeading = text;
    }

    // Skip exact-duplicate text within the same section (e.g. nested wrappers).
    const dedupeKey = `${currentHeading}::${text}`;
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);

    const id = `c${counter++}`;
    idToElement.set(id, el);

    chunks.push({
      id,
      tag,
      heading:
        currentHeading && !HEADING_TAGS.has(el.tagName)
          ? currentHeading
          : undefined,
      text,
    });
  }

  return {
    url: location.href,
    title: document.title,
    chunks,
  };
}

/** Look up the element that produced a given chunk id (if still present). */
export function getElementForChunk(id: string): Element | undefined {
  return idToElement.get(id);
}
