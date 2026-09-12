# Change Log & Agent Context

This file records notable changes made to the repo, with the **what**, **how**, and **why** for each, so any future agent or contributor can quickly understand the current state without re-deriving it.

Newest entries first.

---

## 2026-09-12 — "Ask This Page" browser extension + dynamic experience + docs

Three related pieces of work landed in this session.

### 1. New Chrome MV3 extension: "Ask This Page"

**What:** A new workspace app at `apps/extension/` — a Chrome (Manifest V3) extension that reads the current web page, answers questions about it via AI, and highlights + scrolls to the exact source of each answer on the page.

**Why:** Implements the "Ask this page" product spec: a general-purpose assistant whose key differentiator is showing *exactly where* an answer came from, not just answering.

**How (architecture):**

```
Side Panel (React)  ──ask──▶  Content Script  ──ID'd page chunks──▶  Side Panel
      │                                                                   │
      └── POST { question, chunks } ─▶ /api/page-qa (Next.js) ── Gemini ──┘
      ◀── click source chip ──  content script highlights + scrolls to the quote
```

- **Content script** extracts meaningful, visible page blocks (headings, paragraphs, list items, tables, etc.) into chunks, each with a stable `id`. It keeps an in-memory `Map<id, Element>` (no DOM mutation for IDs) so it can later re-locate the source node.
- **Side panel** (React UI) sends the question + chunks to the backend and renders the answer plus clickable "source" chips.
- **Backend** returns a structured `{ found, answer, citations[] }`. Each citation has a `chunkId` and a verbatim `quote`.
- Clicking a chip messages the content script, which finds the chunk element, wraps the exact quote in a `<mark>` (via `Range.surroundContents`, never `innerHTML`, to avoid XSS) and smooth-scrolls to it. Falls back to outlining the whole chunk element if the exact quote can't be located.
- **Background service worker** only opens the side panel on toolbar click (`chrome.sidePanel.setPanelBehavior`). The panel talks directly to the tab's content script via `chrome.tabs` messaging (simpler and more robust than relaying through the background).

**Key files:**

| File | Purpose |
|------|---------|
| `apps/extension/manifest.config.ts` | MV3 manifest (permissions, side panel, content script, host permissions) |
| `apps/extension/vite.config.ts` | Vite 6 + `@crxjs/vite-plugin` 2.7.1 build |
| `apps/extension/src/content/extract.ts` | Extract page content into ID'd chunks |
| `apps/extension/src/content/highlight.ts` | Highlight + scroll to a citation's source (safe `<mark>` wrapping) |
| `apps/extension/src/content/content-script.ts` | Message handling (`GET_CHUNKS`, `HIGHLIGHT`, `CLEAR_HIGHLIGHT`) |
| `apps/extension/src/background/service-worker.ts` | Opens the side panel |
| `apps/extension/src/shared/messages.ts` | Typed messaging protocol + active-tab helpers |
| `apps/extension/src/shared/api.ts` | Calls `/api/page-qa`; endpoint override via `chrome.storage` |
| `apps/extension/src/sidepanel/App.tsx` + `components/` | Chat UI, ask/highlight flow, source chips, not-found state |

**Design decisions / trade-offs:**

- **Non-streaming `generateObject`** on the backend (not streaming text): structured citations map far more reliably to DOM highlights than parsing a streamed response.
- **Chunks re-extracted on every ask** so the ids sent to the backend match the content script's current `id → element` map for highlighting.
- **Vite 6 + `@vitejs/plugin-react` 4 + CRXJS 2.7.1** chosen as a stable, well-tested combo (over bleeding-edge Vite 8).
- **No API keys in the extension** — the key stays server-side (see backend below). This satisfies the repo's "no hardcoded credentials" rule.

### 2. Backend route + shared types (reuses existing packages)

**What/Why:** A backend endpoint the extension calls, built by reusing the existing `@chatbot/core` and `@chatbot/providers` packages rather than duplicating logic.

**How:**

- `packages/core/src/types/page-qa.ts` (new): shared `PageChunk`, `PageCitation`, `PageQAResult`, `PageQARequest` types. Exported from both `packages/core/src/index.ts` and `packages/core/src/server.ts` so the backend and extension share one source of truth.
- `packages/core/src/context/presets.ts`: added `createPageQAContext()` — a preset instructing the model to answer only from the provided page chunks, cite chunk ids with verbatim quotes, and set `found: false` when the answer isn't on the page.
- `apps/demo/src/app/api/page-qa/route.ts` (new): mirrors the existing `api/chat/route.ts` pattern. Reuses `ProviderRegistry` + `createGoogleProvider` (Gemini) and `GOOGLE_GENERATIVE_AI_API_KEY`, builds the system prompt via `ContextEngine`, and uses `generateObject` with a Zod schema matching `PageQAResult`. Includes permissive CORS headers + an `OPTIONS` handler for robustness across extension fetch contexts.
- `apps/demo/package.json`: added `zod` as a direct dependency (needed by the new route under pnpm's strict node_modules).

### 3. Dynamic years-of-experience (portfolio data)

**What:** In `apps/demo/src/lib/demo-data.ts`, the `portfolioOwner` experience is now computed instead of hardcoded.

**Why:** The value ("6+ years" / `totalExperienceMonths: 82`) was static and would go stale. It should increase automatically over time.

**How:** Added a `CAREER_START` date (July 2019, first role at WorkOnGrid) and a `getExperienceMonths()` helper computing whole months from then to `new Date()`. `totalExperienceMonths` now uses this, and `summary` is a template literal interpolating the computed `${experienceYears}+`. As of 2026-09 this yields 86 months → "7+". It flows through the portfolio page stat, the chatbot context, and the summary automatically.

- **Note:** computed at module load, so the statically-prerendered portfolio page refreshes the number on each rebuild/deploy (not live per-request). Moving it client-side would make it tick without a rebuild — not done yet.

### 4. Documentation

- `apps/extension/README.md` (new): end-to-end guide to install, configure the backend, build, load unpacked in Chrome, use, develop, and publish to the Chrome Web Store, plus a troubleshooting table.
- `CHANGES.md` (this file, new).

### Verification status

- `pnpm build` (full turbo build): **all 5 packages/apps succeed**, including the new `/api/page-qa` route and the extension bundle.
- `pnpm --filter demo typecheck` and the extension's `tsc --noEmit`: **pass**.
- Not done in this environment: loading the unpacked extension in a real Chrome and clicking through (requires a browser). Needs manual verification per `apps/extension/README.md`.

### Known follow-ups / open questions

- `ABOUT_ME.md` still says "5+ years" as a static string (not updated to match the dynamic value).
- `host_permissions` currently only cover `localhost:3000`; a deployed backend URL must be added before publishing.
- Optional: make the portfolio experience number update client-side (live, no rebuild).
- Optional: cross-browser (Firefox) build; currently Chrome MV3 only (MVP scope).
