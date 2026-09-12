# Connected Intelligence

A **Turborepo + pnpm** monorepo with two AI products that share the same core packages:

- **A chatbot widget** (`@chatbot/ui`) — an embeddable, configurable chat widget for any React app, demoed in `apps/demo`.
- **Ask This Page** (`apps/extension`) — a Chrome extension that answers questions about the page you're viewing and shows you exactly where each answer came from.

Both use **Google Gemini** and **Perplexity Sonar** for AI, called server-side from Next.js API routes.

## Structure

```
apps/
  demo/         Next.js 15 app — landing page + e-commerce/portfolio chatbot demos + API routes
  extension/    Chrome (MV3) extension — "Ask This Page" (see apps/extension/README.md)

packages/
  core/         Types, ContextEngine, state, error handling — shared by everything
  providers/    Google Gemini + Perplexity adapters (Registry + Adapter pattern)
  ui/           React chat widget components, hooks, theme system
  tsconfig/     Shared TypeScript configs
```

## Tech stack

| Category | Technology |
|---|---|
| Monorepo | Turborepo, pnpm workspaces |
| Language | TypeScript |
| AI | Vercel AI SDK, Google Gemini, Perplexity Sonar |
| Web app | Next.js 15, React 19, Tailwind CSS |
| Extension | Vite + `@crxjs/vite-plugin`, React 19 |

## Getting started

```bash
pnpm install
```

Add your API keys to `apps/demo/.env.local`:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key
PERPLEXITY_API_KEY=your_perplexity_api_key
```

Get keys from [Google AI Studio](https://aistudio.google.com/) and the [Perplexity API](https://docs.perplexity.ai/).

```bash
pnpm dev      # everything in watch mode, demo app at localhost:3000
pnpm build    # build all packages + apps in dependency order
pnpm typecheck
pnpm lint
```

Run a single package with `pnpm --filter <name> <script>` (e.g. `pnpm --filter demo dev`).

## The chatbot widget

`@chatbot/ui`'s `ChatWidget` embeds into any React app. It's driven by a `ChatbotConfig` (context, provider, theme) and talks to a Next.js API route that streams responses:

```tsx
import { ChatWidget } from "@chatbot/ui";

const config: ChatbotConfig = {
  context: {
    identity: { name: "My Bot", type: "custom" },
    behavior: { tone: "friendly", responseStyle: "conversational" },
    knowledge: { instructions: ["Be helpful and concise"] },
    uiHints: { welcomeMessage: "Hi! How can I help?" },
  },
  provider: { providerId: "google", modelId: "gemini-2.0-flash" },
  apiEndpoint: "/api/chat",
};

<ChatWidget config={config} />;
```

The API route builds a system prompt with `ContextEngine`, resolves a model via `ProviderRegistry`, and streams the response with the AI SDK. See `apps/demo/src/app/api/chat/route.ts` for the full pattern, and `packages/core/src/context/presets.ts` for ready-made contexts (`createEcommerceContext`, `createPortfolioContext`).

The demo app shows this in action at `/ecommerce` (Gemini) and `/portfolio` (Perplexity).

## The Ask This Page extension

A Chrome extension that reads the page you're on, answers questions using only that page's content, and highlights the exact source of each answer. See **[apps/extension/README.md](apps/extension/README.md)** for setup, usage, and development instructions. Its backend route (`apps/demo/src/app/api/page-qa/route.ts`) reuses the same `@chatbot/core`/`@chatbot/providers` packages as the widget.

## Adding a new AI provider

1. Create `packages/providers/src/<name>/<name>-provider.ts` extending `BaseProvider`.
2. Register it: `registry.register("<name>", create<Name>Provider)`.

## Documentation

This root `README.md` is the single source of truth for repo-wide docs, including the Changelog below. A subfolder only gets its own `README.md` when it has a genuinely different workflow the root can't reasonably cover — currently just `apps/extension` (Chrome-specific build/load/permissions steps).

`CLAUDE.md` and the `update-docs` skill (`.claude/skills/update-docs/`) keep this documentation current as the project evolves — see `CLAUDE.md` for the policy.

## Changelog

Dated, most recent first. Each entry is a short record of what changed, why, and any trade-offs worth remembering.

### 2026-09-13 — Documentation cleanup

- Removed the five sprawling root-level docs (`ABOUT_ME.md`, `CHANGES.md`, `LANDING_PAGE.md`, `PROJECT.md`, `PROJECT_CONTEXT.md`) and consolidated everything worth keeping into this single root `README.md`.
- Kept exactly one subfolder README (`apps/extension/README.md`) since it's the only place with a workflow (Chrome load-unpacked, permissions, publishing) that doesn't belong at the root.
- Added `CLAUDE.md` plus a `.claude/skills/update-docs/` skill so future changes update the relevant README and this Changelog as part of the work, instead of docs drifting out of date.

### 2026-09-12 — "Ask This Page" browser extension

- New `apps/extension` workspace: a Chrome MV3 extension that extracts a page's visible content into ID'd chunks, sends the question + chunks to a backend for a structured `{ found, answer, citations[] }` response, and highlights the exact cited text (wrapped in a safe `<mark>` via `Range.surroundContents`, with a whole-block outline fallback).
- Backend route `apps/demo/src/app/api/page-qa/route.ts` reuses the existing `ProviderRegistry`/`ContextEngine` pattern (Gemini, `generateObject` with a Zod schema) rather than duplicating logic; new shared types live in `packages/core/src/types/page-qa.ts`.
- Two independent implementations were built in parallel — one on this branch (esbuild, vanilla TS, on-demand `activeTab` injection, user-supplied API key) and one committed directly to `master` (Vite + React + Tailwind, always-on content script, backend-proxied key). They were merged, keeping master's version: it has more precise (exact-quote) highlighting and fits the repo's existing provider/context conventions more closely. The API key stays server-side only, by design.

### Earlier — chatbot widget monorepo

- Turborepo + pnpm workspace with `@chatbot/core` (types, `ContextEngine`, error handling), `@chatbot/providers` (Google Gemini, Perplexity Sonar via a Registry + Adapter pattern), `@chatbot/ui` (the chat widget, themeable via CSS variables), and a Next.js demo app (SaaS landing page, e-commerce demo, portfolio demo).
- Portfolio "years of experience" is computed from a fixed career-start date at module load rather than hardcoded, so it stays accurate across rebuilds without manual edits.
