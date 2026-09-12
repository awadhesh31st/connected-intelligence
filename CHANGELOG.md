# Changelog

Dated, most recent first. Each entry is a short record of what changed, why, and any trade-offs worth remembering. Kept separate from the root `README.md` so that file can stay a pure repository overview.

### 2026-09-13 — Site-wide navigation overhaul

- Each page (`/`, `/products`, `/ecommerce`, `/portfolio`) had its own bespoke header and footer, so the set of reachable pages, the visual treatment, and even mobile behavior differed depending on where you landed. Extracted shared `SiteHeader`, `SiteFooter`, and `Breadcrumbs` components (`apps/demo/src/components/`) and used them on every page for a single, consistent primary nav with an active-page indicator (`usePathname` + `aria-current="page"`).
- Fixed a real mobile bug on `/portfolio`: its in-page section nav (Skills/Experience/Projects/Contact) was `hidden md:flex` with no mobile fallback, making those anchors completely unreachable below the `md` breakpoint. It's now an always-visible, horizontally-scrollable row.
- Added breadcrumbs (`Home / Products / …`) on `/products`, `/ecommerce`, and `/portfolio` so the site's hierarchy (both demos live conceptually under Products) is visible, not just implied by nav order.
- Added a custom `not-found.tsx` — the previous 404 was Next's bare default (no styling, no way back into the site). It now matches the site's look and includes the global header/footer plus a "Back to Home" / "Browse Products" CTA.
- Removed dead-end/redundant nav pieces surfaced by the audit: e-commerce's "Back to home" no longer needed since the global header covers it; `EcommerceClient`'s local header is now just a themed sub-bar (name + "Chatbot Widget Demo" badge) instead of duplicating "Products" nav that the global header and breadcrumb already provide.
- `HomeClient.tsx` no longer needs `"use client"` — its only interactive piece (the mobile menu) moved into `SiteHeader`, so the homepage ships less client JS.
- Verified with a full Playwright pass: active nav state per route, mobile hamburger + portfolio section nav visibility at 375px, deep-link anchor scroll (`/products#ask-this-page` on a cold load), browser back/forward through client-side nav, breadcrumb link targets, and 404 status + content — all passed with zero console/page errors.
- README's routes table was missing `/products` (added in the previous platform-repositioning change but never added there) — fixed, and noted the shared header/footer/breadcrumb pattern.

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
