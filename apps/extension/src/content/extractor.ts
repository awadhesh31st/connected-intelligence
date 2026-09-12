import type { BlockType, PageBlock, PageModel } from "../lib/types";

const MAX_BLOCKS = 4000;
const MAX_CHARS = 120_000;
const MAX_BLOCK_TEXT = 2000;

const SKIP_TAGS = new Set([
  "SCRIPT",
  "STYLE",
  "NOSCRIPT",
  "TEMPLATE",
  "SVG",
  "CANVAS",
  "IFRAME",
  "OBJECT",
  "EMBED",
  "VIDEO",
  "AUDIO",
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "LABEL",
  "FORM",
  "NAV",
  "FOOTER",
  "ASIDE",
  "DIALOG",
  "MENU",
]);

const SKIP_ROLES = new Set([
  "navigation",
  "banner",
  "contentinfo",
  "complementary",
  "search",
  "dialog",
  "alert",
  "menu",
  "menubar",
  "toolbar",
  "tooltip",
]);

const CONTENT_TAGS = new Set([
  "P",
  "LI",
  "BLOCKQUOTE",
  "PRE",
  "TD",
  "TH",
  "DT",
  "DD",
  "FIGCAPTION",
  "CAPTION",
  "SUMMARY",
]);

const HEADING_RE = /^H([1-6])$/;

const BLOCK_TYPE_BY_TAG: Record<string, BlockType> = {
  TD: "tablecell",
  TH: "tablecell",
  BLOCKQUOTE: "quote",
  PRE: "code",
  LI: "listitem",
};

function cleanText(raw: string): string {
  return raw.replace(/\s+/g, " ").trim();
}

function isHiddenElement(el: Element): boolean {
  if (el.hasAttribute("hidden")) return true;
  if (el.getAttribute("aria-hidden") === "true") return true;
  const style = window.getComputedStyle(el);
  if (style.display === "none" || style.visibility === "hidden") return true;
  if (parseFloat(style.opacity || "1") === 0) return true;
  return false;
}

function shouldSkipSubtree(el: Element): boolean {
  if (SKIP_TAGS.has(el.tagName)) return true;
  const role = el.getAttribute("role");
  if (role && SKIP_ROLES.has(role.toLowerCase())) return true;
  return isHiddenElement(el);
}

export function extractPage(): PageModel {
  const blocks: PageBlock[] = [];
  const headingStack: { level: number; text: string }[] = [];
  let counter = 0;
  let totalChars = 0;
  let truncated = false;

  function currentHeadingPath(): string[] {
    return headingStack.map((h) => h.text);
  }

  function addBlock(el: Element, type: BlockType, rawText: string, level?: number) {
    if (truncated) return;
    const text = cleanText(rawText);
    if (text.length < 2) return;
    const id = `askp-${counter++}`;
    el.setAttribute("data-ask-page-id", id);
    blocks.push({
      id,
      type,
      level,
      text: text.slice(0, MAX_BLOCK_TEXT),
      headingPath: currentHeadingPath(),
    });
    totalChars += text.length;
    if (blocks.length >= MAX_BLOCKS || totalChars >= MAX_CHARS) truncated = true;
  }

  function walk(node: Element) {
    if (truncated) return;
    if (shouldSkipSubtree(node)) return;

    const tag = node.tagName;
    const headingMatch = HEADING_RE.exec(tag);
    if (headingMatch) {
      const level = Number(headingMatch[1]);
      const text = cleanText(node.textContent || "");
      while (headingStack.length && headingStack[headingStack.length - 1].level >= level) {
        headingStack.pop();
      }
      if (text) {
        addBlock(node, "heading", text, level);
        headingStack.push({ level, text });
      }
      return;
    }

    if (CONTENT_TAGS.has(tag)) {
      const hasNestedContentBlock = Array.from(node.children).some(
        (c) => CONTENT_TAGS.has(c.tagName) || HEADING_RE.test(c.tagName)
      );
      if (!hasNestedContentBlock) {
        const type = BLOCK_TYPE_BY_TAG[tag] ?? "paragraph";
        addBlock(node, type, node.textContent || "");
        return;
      }
    }

    for (const child of Array.from(node.children)) {
      walk(child);
      if (truncated) break;
    }
  }

  if (document.body) walk(document.body);

  return {
    url: location.href,
    title: document.title,
    extractedAt: Date.now(),
    blocks,
    truncated,
  };
}
