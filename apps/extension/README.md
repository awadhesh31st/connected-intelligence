# Ask This Page

A Chrome extension (Manifest V3) that answers questions about the page you're viewing — and shows you **exactly where the answer came from** by highlighting the source text.

## How it works

1. A content script reads the page into small, labeled chunks (headings, paragraphs, list items, etc).
2. The side panel sends your question and those chunks to a small backend (`/api/page-qa`), which asks Gemini for a structured answer with citations.
3. Clicking a citation scrolls to and highlights the exact sentence on the page.

Your Gemini API key lives only on the backend — it's never stored in the extension.

## Setup

**1. Install dependencies** (from the repo root)

```bash
pnpm install
```

**2. Add your Gemini key** to `apps/demo/.env.local`

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
```

**3. Start the backend**

```bash
pnpm --filter demo dev
```

**4. Build the extension**

```bash
pnpm --filter extension build
```

**5. Load it in Chrome**

- Open `chrome://extensions` and enable **Developer mode**
- Click **Load unpacked** → select `apps/extension/dist`
- Pin the **Ask This Page** icon to your toolbar

## Using it

Open any webpage, click the extension icon, and ask something like:

- "Summarize this page"
- "Where does it mention pricing?"
- "What are the eligibility requirements?"

Answers come with clickable source chips — click one to jump straight to that spot on the page. If the answer isn't on the page, it says so instead of guessing.

## Development

```bash
pnpm --filter extension dev        # watch mode
pnpm --filter extension typecheck
```

Keep `pnpm --filter demo dev` running in another terminal so the backend is available. After each change, reload the extension from `chrome://extensions`.

## Project structure

```
apps/extension/
├── manifest.config.ts   # MV3 manifest
└── src/
    ├── background/      # Opens the side panel
    ├── content/         # Extracts page text, highlights citations
    ├── shared/          # Messaging + backend API client
    └── sidepanel/       # Chat UI (React)
```

The backend route lives at `apps/demo/src/app/api/page-qa/route.ts` and reuses this repo's `@chatbot/core` and `@chatbot/providers` packages.

## Pointing at a different backend

By default the extension calls `http://localhost:3000/api/page-qa`. To use a deployed backend instead:

1. Add its origin to `host_permissions` in `manifest.config.ts` and rebuild.
2. Set the endpoint from the side panel's console (right-click the panel → Inspect):

```js
chrome.storage.sync.set({ "askThisPage:endpoint": "https://your-app.com/api/page-qa" });
```

## Troubleshooting

| Problem | Fix |
|---|---|
| "Can't read this page" | You're on a restricted page (`chrome://`, Web Store, PDF viewer). Try a normal page instead. |
| "Couldn't reach the backend" | Make sure `pnpm --filter demo dev` is running. |
| "AI provider not configured" | Add `GOOGLE_GENERATIVE_AI_API_KEY` to `apps/demo/.env.local` and restart the backend. |
| CORS / fetch blocked | Add the backend's origin to `host_permissions` and rebuild. |
| Changes not showing | Rebuild, then click the reload icon on the extension's card in `chrome://extensions`. |

## Publishing

Build, zip the `dist/` folder, and upload it to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole). Remember to point `host_permissions`/the stored endpoint at your deployed backend first.
