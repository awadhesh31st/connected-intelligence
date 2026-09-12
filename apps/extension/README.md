# Ask This Page — Chrome Extension

A Chrome (Manifest V3) extension that reads the page you're viewing, answers questions about it using AI, and **shows you exactly where the answer came from** by highlighting and scrolling to the source on the page.

This guide explains how to set up the backend, build the extension, load it in Chrome, use it, and (later) package it for the Chrome Web Store.

---

## How it works (at a glance)

```
Side Panel (React)  ──ask──▶  Content Script  ──extracted page chunks──▶  Side Panel
      │                                                                        │
      └──── POST { question, chunks } ────▶  /api/page-qa (Next.js backend) ───┘
                                                     │
                                              Gemini (structured answer + citations)
      ◀── click a source chip ──  highlight + scroll to the exact sentence on the page
```

- The **content script** extracts the page's meaningful text into ID'd chunks.
- The **side panel** sends the question + chunks to the **backend**, which asks Gemini for a structured answer with citations.
- Clicking a citation asks the content script to **highlight and scroll** to that exact spot.

The AI API key lives **only on the backend** — it is never stored in the extension.

---

## Prerequisites

- **Node.js** >= 18
- **pnpm** 9.15.0 (`corepack enable` or `npm i -g pnpm@9.15.0`)
- **Google Chrome** 116+ (needs the Side Panel API)
- A **Google Gemini API key** — create one at [Google AI Studio](https://aistudio.google.com/)

---

## Step 1 — Install dependencies

From the **repository root**:

```bash
pnpm install
```

## Step 2 — Configure and run the backend

The extension talks to the `/api/page-qa` route in the `demo` app.

1. Create `apps/demo/.env.local` with your Gemini key:

   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key
   ```

2. Start the backend (from the repo root):

   ```bash
   pnpm --filter demo dev
   ```

   This serves the endpoint at `http://localhost:3000/api/page-qa`, which is the extension's default backend.

## Step 3 — Build the extension

From the repo root:

```bash
pnpm --filter extension build
```

This produces the loadable, unpacked extension in **`apps/extension/dist/`**.

> For active development with hot reload, use `pnpm --filter extension dev` instead (see [Development mode](#development-mode)).

## Step 4 — Load the extension in Chrome

1. Open `chrome://extensions` in Chrome.
2. Toggle **Developer mode** on (top-right).
3. Click **Load unpacked**.
4. Select the **`apps/extension/dist`** folder.
5. The **"Ask This Page"** icon appears in your toolbar. Pin it for easy access (click the puzzle-piece icon → pin).

## Step 5 — Use it

1. Open any normal web page (an article, docs, a product page, etc.).
2. Click the **Ask This Page** toolbar icon to open the side panel.
3. Type a question (or pick a suggested prompt) and press **Ask** / Enter.
   - Examples: "Summarize this page", "Where does it mention pricing?", "What are the eligibility requirements?"
4. Read the answer. Under it, **source chips** show the sentences the answer is based on.
5. Click a source chip — the page **scrolls to and highlights** the exact text.

If the answer isn't on the page, the assistant clearly says so instead of guessing.

---

## Configuration

### Backend endpoint

- **Default:** `http://localhost:3000/api/page-qa`
- **Override:** the endpoint is read from `chrome.storage.sync` under the key `askThisPage:endpoint`. To point the extension at a deployed backend, set it from the side panel's DevTools console:

  ```js
  chrome.storage.sync.set({ "askThisPage:endpoint": "https://your-backend.example.com/api/page-qa" });
  ```

  (Right-click inside the side panel → **Inspect** to open its console.)

### Host permissions

`manifest.config.ts` lists which backend origins the extension may call without CORS issues:

```ts
host_permissions: [
  "http://localhost:3000/*",
  "http://127.0.0.1:3000/*",
],
```

If you deploy the backend to a new domain, **add that origin here** and rebuild, otherwise the fetch will be blocked.

---

## Development mode

For iterative work with hot module reload:

```bash
pnpm --filter extension dev
```

Then in `chrome://extensions`, **Load unpacked** and select `apps/extension/dist` (CRXJS writes a dev build there and reloads on change). Keep the backend (`pnpm --filter demo dev`) running in a separate terminal.

Other useful scripts:

| Command | What it does |
|---------|--------------|
| `pnpm --filter extension build` | Type-check + production build into `dist/` |
| `pnpm --filter extension typecheck` | TypeScript check only |
| `pnpm --filter extension clean` | Remove `dist/` |

---

## Project layout

```
apps/extension/
├── manifest.config.ts        # MV3 manifest (permissions, side panel, content script)
├── vite.config.ts            # Vite + @crxjs/vite-plugin build
├── src/
│   ├── background/
│   │   └── service-worker.ts  # Opens the side panel on toolbar click
│   ├── content/
│   │   ├── extract.ts         # Extracts page content into ID'd chunks
│   │   ├── highlight.ts       # Highlights + scrolls to a citation's source
│   │   └── content-script.ts  # Message handling (GET_CHUNKS / HIGHLIGHT)
│   ├── shared/
│   │   ├── api.ts             # Calls the /api/page-qa backend
│   │   └── messages.ts        # Typed messaging + active-tab helpers
│   └── sidepanel/
│       ├── index.html
│       ├── main.tsx
│       ├── App.tsx            # Chat UI + ask/highlight flow
│       └── components/        # MessageList, SourceChip
└── dist/                      # Build output (load this in Chrome)
```

The backend route lives at `apps/demo/src/app/api/page-qa/route.ts` and reuses the shared `@chatbot/core` types and `@chatbot/providers` (Gemini) packages.

---

## Publishing to the Chrome Web Store

When you're ready to distribute the extension:

1. **Deploy the backend** somewhere public (e.g. Vercel) with `GOOGLE_GENERATIVE_AI_API_KEY` set in that environment. Note its URL, e.g. `https://your-app.vercel.app/api/page-qa`.
2. In `manifest.config.ts`:
   - Add the deployed origin to `host_permissions` (e.g. `"https://your-app.vercel.app/*"`).
   - Bump the `version` (Web Store requires a unique, increasing version).
   - Update `name`/`description` and add extension icons if desired.
3. Point the extension at the deployed backend by default (update `DEFAULT_ENDPOINT` in `src/shared/api.ts`) or rely on the `askThisPage:endpoint` storage override.
4. Build:

   ```bash
   pnpm --filter extension build
   ```

5. **Zip the `dist/` folder** (the zip's root must contain `manifest.json` directly):

   ```bash
   cd apps/extension/dist && zip -r ../ask-this-page.zip . && cd -
   ```

6. Go to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole), register as a developer (one-time fee), click **Add new item**, and upload `ask-this-page.zip`.
7. Fill in the store listing (description, screenshots, privacy practices), then submit for review. Justify each permission (`activeTab`, `scripting`, `sidePanel`, `storage`, `tabs`) and the host permission for your backend in the privacy tab.

> Tip: For private/internal distribution you can instead publish as **Unlisted**, or share the packed `.crx`/`dist` for others to load via **Load unpacked**.

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| "I can't read this page." | You're on a restricted page (`chrome://`, the Web Store, PDF viewer, or a `file://` page without file access). Try a normal `http(s)` page. |
| "Couldn't reach the backend..." | Ensure `pnpm --filter demo dev` is running and the endpoint matches (`http://localhost:3000/api/page-qa`). |
| "The AI provider is not configured." | `GOOGLE_GENERATIVE_AI_API_KEY` is missing from `apps/demo/.env.local`; add it and restart the backend. |
| Fetch blocked / CORS error | Add the backend origin to `host_permissions` in `manifest.config.ts` and rebuild. |
| Source chip doesn't highlight | The page changed after the answer, or the quote spans complex markup — the whole source block is outlined as a fallback. Re-ask to refresh. |
| Side panel doesn't open on click | Requires Chrome 116+. Update Chrome, then reload the extension in `chrome://extensions`. |
| Changes not showing | Rebuild (`pnpm --filter extension build`) and click the **reload** icon on the extension card in `chrome://extensions`. |
