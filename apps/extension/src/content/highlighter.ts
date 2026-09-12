const STYLE_ID = "ask-this-page-style";
const HIGHLIGHT_CLASS = "ask-this-page-highlight";
const FLASH_CLASS = "ask-this-page-flash";
const FLASH_DURATION_MS = 2200;

function ensureStyle(): void {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    .${HIGHLIGHT_CLASS} {
      background-color: rgba(255, 214, 150, 0.45) !important;
      box-shadow: 0 0 0 2px rgba(205, 169, 238, 0.9) !important;
      border-radius: 4px !important;
      transition: background-color 0.3s ease;
      scroll-margin-block: 96px;
    }
    .${FLASH_CLASS} {
      animation: ask-this-page-pulse ${FLASH_DURATION_MS}ms ease-out 1;
    }
    @keyframes ask-this-page-pulse {
      0% { box-shadow: 0 0 0 6px rgba(205, 169, 238, 0.55); }
      100% { box-shadow: 0 0 0 2px rgba(205, 169, 238, 0.9); }
    }
  `;
  document.head.appendChild(style);
}

function clearHighlights(): void {
  document.querySelectorAll(`.${HIGHLIGHT_CLASS}`).forEach((el) => {
    el.classList.remove(HIGHLIGHT_CLASS, FLASH_CLASS);
  });
}

/** Highlights the given source block(s) and scrolls the primary (first) one into view. */
export function highlightBlocks(blockIds: string[]): boolean {
  if (blockIds.length === 0) return false;
  ensureStyle();
  clearHighlights();

  let primary: Element | null = null;
  for (const id of blockIds) {
    const el = document.querySelector(`[data-ask-page-id="${CSS.escape(id)}"]`);
    if (!el) continue;
    el.classList.add(HIGHLIGHT_CLASS, FLASH_CLASS);
    if (!primary) primary = el;
    window.setTimeout(() => el.classList.remove(FLASH_CLASS), FLASH_DURATION_MS);
  }

  if (!primary) return false;
  primary.scrollIntoView({ behavior: "smooth", block: "center" });
  return true;
}

export function clearAllHighlights(): void {
  clearHighlights();
}
