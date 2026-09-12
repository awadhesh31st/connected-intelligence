# Ask This Page

A Manifest V3 browser extension that lets you ask natural-language questions about the page
you're currently viewing, and shows you exactly where the answer came from — by highlighting
and scrolling to the source text on the page itself.

## How it works

1. **Understand the page** — when you ask a question, a script is injected into the active tab
   (`src/content/extractor.ts`) that walks the DOM and builds a structured outline: headings,
   paragraphs, list items, table cells, quotes and code blocks, each tagged with the heading
   section it belongs to. Navigation, footers, hidden elements, scripts, forms and other
   boilerplate are skipped. Each extracted block is stamped with a `data-ask-page-id` attribute
   so it can be found again later.
2. **Answer questions** — the background service worker (`src/background/index.ts`) sends the
   extracted outline plus your question to Gemini (`src/lib/llm.ts`), asking for a strict JSON
   answer: the answer text, whether the page actually contains the information, and which block
   ids support it.
3. **Show the source** — the side panel renders the answer with clickable citation chips. Clicking
   one (or the primary citation arriving automatically) tells the content script
   (`src/content/highlighter.ts`) to highlight and smooth-scroll to that exact block.

No page content or questions are sent anywhere except directly from your browser to Google's
Gemini API, using an API key you provide yourself.

## Setup

```bash
pnpm install
pnpm --filter @chatbot/ask-this-page build
```

This produces a loadable extension in `apps/extension/dist`.

### Load it in Chrome

1. Go to `chrome://extensions`.
2. Enable **Developer mode** (top right).
3. Click **Load unpacked** and select `apps/extension/dist`.
4. Click the extension's puzzle-piece icon in the toolbar and pin **Ask This Page**.

### Add your Gemini API key

1. Right-click the extension icon → **Options** (or open it from the side panel's banner).
2. Paste a Gemini API key from [aistudio.google.com/apikey](https://aistudio.google.com/apikey).
3. Pick a model (Gemini 2.0 Flash is the default) and save.

### Use it

Click the extension icon on any regular webpage to open the side panel, then ask things like:

- "Summarize this page"
- "Where does it mention pricing?"
- "What are the eligibility requirements?"
- "Is refund information mentioned anywhere on this page?"

## Development

```bash
pnpm --filter @chatbot/ask-this-page dev      # esbuild watch mode
pnpm --filter @chatbot/ask-this-page typecheck
```

After each rebuild, click the refresh icon on the extension's card at `chrome://extensions` to
pick up changes (service worker and content script changes require this; side panel/options HTML
changes are picked up by simply reopening them).

## Notes & limitations

- Uses `activeTab` + `scripting` rather than a broad `<all_urls>` host permission — the page is
  only read when you actually open the panel or ask a question on that tab.
- Very long pages are truncated (roughly 4000 blocks / 120k characters during extraction, and a
  further cap when serializing into the prompt) to keep requests fast and affordable.
- Single-page apps that swap content without a full navigation may need the refresh (↻) button in
  the panel header to re-read the page.
- Chrome internal pages (`chrome://…`), the Web Store, and PDFs opened in the built-in viewer
  can't be read by extensions — the panel shows a banner when that's the case.
