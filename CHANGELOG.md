# Changelog

Dated, most recent first. Each entry is a short record of what changed, why, and any trade-offs worth remembering. Kept separate from the root `README.md` so that file can stay a pure repository overview.

### 2026-09-13 — README kept to a pure overview

- Root `README.md` now covers only what the repo is, its structure/routes, and its tech stack — moved the Changelog out to this file, and dropped the implementation-detail sections (widget usage example, "adding a provider" walkthrough) that don't belong in a top-level overview.

### 2026-09-13 — Documentation cleanup

- Removed the five sprawling root-level docs (`ABOUT_ME.md`, `CHANGES.md`, `LANDING_PAGE.md`, `PROJECT.md`, `PROJECT_CONTEXT.md`) and consolidated everything worth keeping into a single root `README.md`.
- Kept exactly one subfolder README (`apps/extension/README.md`) since it's the only place with a workflow (Chrome load-unpacked, permissions, publishing) that doesn't belong at the root.
- Added `CLAUDE.md` plus a `.claude/skills/update-docs/` skill so future changes update the relevant README and this Changelog as part of the work, instead of docs drifting out of date.

### 2026-09-12 — "Ask This Page" browser extension

- New `apps/extension` workspace: a Chrome MV3 extension that extracts a page's visible content into ID'd chunks, sends the question + chunks to a backend for a structured `{ found, answer, citations[] }` response, and highlights the exact cited text (wrapped in a safe `<mark>` via `Range.surroundContents`, with a whole-block outline fallback).
- Backend route `apps/demo/src/app/api/page-qa/route.ts` reuses the existing `ProviderRegistry`/`ContextEngine` pattern (Gemini, `generateObject` with a Zod schema) rather than duplicating logic; new shared types live in `packages/core/src/types/page-qa.ts`.
- Two independent implementations were built in parallel — one on this branch (esbuild, vanilla TS, on-demand `activeTab` injection, user-supplied API key) and one committed directly to `master` (Vite + React + Tailwind, always-on content script, backend-proxied key). They were merged, keeping master's version: it has more precise (exact-quote) highlighting and fits the repo's existing provider/context conventions more closely. The API key stays server-side only, by design.

### Earlier — chatbot widget monorepo

- Turborepo + pnpm workspace with `@chatbot/core` (types, `ContextEngine`, error handling), `@chatbot/providers` (Google Gemini, Perplexity Sonar via a Registry + Adapter pattern), `@chatbot/ui` (the chat widget, themeable via CSS variables), and a Next.js demo app (SaaS landing page, e-commerce demo, portfolio demo).
- Portfolio "years of experience" is computed from a fixed career-start date at module load rather than hardcoded, so it stays accurate across rebuilds without manual edits.
