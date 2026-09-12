# Changelog

Dated, most recent first. Each entry is a short record of what changed, why, and any trade-offs worth remembering. Kept separate from the root `README.md` so that file can stay a pure repository overview.

### 2026-09-13 — Portfolio page redesign

- Full content/structure/visual pass on `/portfolio`, not just colors/spacing. New flow: Hero → About → Skills → Experience → Projects → Contact (previously jumped straight from a stats grid into Skills, with Education and GitHub as disconnected afterthoughts near the bottom).
- **New About section**: consolidates the existing `summary` paragraph, a quote from the current role's first bullet, and a "Quick Facts" card (current role, experience, specialization, education) — pulling education out of its own orphaned section and giving the page an actual narrative introduction, which it didn't have before.
- **Hero**: trimmed to name/title/specialization badge + a one-line value statement (assembled only from the existing `title` and specialization label, not new claims), with the old separate 5-card "Highlights" section collapsed into three inline stat chips under the CTAs — removes a redundant, disconnected stop right after the hero.
- **Skills**: added a distinct icon per category (reusing icon paths already established elsewhere on the site) and a hover lift + staggered scroll-reveal, instead of a flat colored-block grid.
- **Experience**: same timeline structure, but each entry now reveals on scroll (staggered), the dot scales on hover, and the duration reads as a pill badge instead of plain text — no content removed or reworded, all bullets are verbatim.
- **Projects** (the ask was to make this the strongest section): the first project (this repo's own demo) is now visually "Featured" — full-width dark card vs. the standard cards for the rest — plus a "Solo project · built end-to-end" tag and hover depth. No invented "problem solved" or "impact metrics" text was added since that's not in `demo-data.ts`; the existing `description` already carries that framing.
- **GitHub repositories**: demoted from a full-weight section to a lighter, smaller "More on GitHub" strip (capped at 6 repos) directly under Projects, so Projects reads as the clear centerpiece instead of competing with a second, equally-sized project-like section.
- **Contact**: restructured from four equal-weight cards to one primary "Send an Email" CTA plus a secondary row of Phone/LinkedIn/GitHub chips — clearer hierarchy, same links.
- **Navigation**: the sticky secondary nav (Skills/Experience/Projects/Contact, built in an earlier pass) now shows the active section with an animated underline instead of only a color change. Left the nav's item list unchanged (no "About" link added) since the page-structure ask and the navigation ask both explicitly named the same four items.
- **Accessibility**: added a global `a:focus-visible`/`button:focus-visible` outline in `globals.css` (keyboard-only, doesn't trigger on mouse clicks) — the whole demo app benefits, not just this page, since there was no visible focus state anywhere before.
- No personal information was changed or invented — every fact (name, title, summary, skills, experience, education, projects, contact details) is unchanged from `demo-data.ts`; only its grouping, hierarchy, and presentation changed.
- No routes or repository structure changed, so the root `README.md` was left as-is.

Verified with a full Playwright pass: nav click → smooth-scroll → active-underline-update flow, all 34 on-page links (no broken/placeholder hrefs), reduced-motion content visibility, keyboard `Tab` focus producing a visible outline, and screenshots at 375px/768px/1280px confirming the hero, About, Skills, Projects, and Contact layouts are each intentionally arranged for their breakpoint rather than just shrunk.

### 2026-09-13 — Scalable Products architecture: catalog + data-driven detail pages

- Replaced the single, monolithic `/products` page (cards + inline anchor-jump detail sections) with a real catalog architecture: `apps/demo/src/lib/products-data.tsx` defines a `Product` type (overview, how-it-works steps, features, use cases, getting-started, expectations, CTAs) and a `PRODUCTS` array. Adding a future product to the platform means adding one data entry — no new components or routes required.
- New `apps/demo/src/app/products/[slug]/page.tsx`: a single generic detail-page template renders any product from data (`generateStaticParams` pre-builds `/products/ask-this-page` and `/products/chatbot-widget` at build time). Sections: hero, what/who/problem/value overview grid, an animated numbered How It Works flow (arrows between steps, staggered scroll-reveal), key features, use cases, getting-started steps + CTA, and "what you can expect."
- New reusable `ProductCard` (listing grid, handles both `live` and future `coming-soon` product statuses) and `Reveal` (scroll-triggered fade/slide-in, staggered via a `delay` prop) components.
- Animations: a `Reveal` wrapper is applied to below-the-fold sections only — hero/above-the-fold content is never animation-gated, so there's no flash-of-invisible-content risk on a slow connection. Under `prefers-reduced-motion: reduce`, `Reveal`'s hidden/animated classes are Tailwind `motion-safe:`-prefixed, so they simply don't apply and content renders in its final state with no JS feature-detection needed. Added a global `.animate-page-enter` keyframe (also reduced-motion gated) applied to every top-level page wrapper for a consistent, subtle page-transition feel; it's a pure CSS `@keyframes` animation (not JS-triggered) so it plays from first paint regardless of hydration timing. Added `loading.tsx` skeletons for both `/products` and `/products/[slug]`.
- Fixed `SiteHeader`'s active-nav-state check (was exact-pathname-only) to also match nested routes, so "Products" now stays highlighted on `/products/ask-this-page`.
- **Found and fixed a real bug while testing**: an unknown slug (e.g. `/products/nope`) was returning HTTP 200 instead of 404. Root cause is a known Next.js App Router gotcha — calling `notFound()` in a page that also uses `generateStaticParams` can get the not-found render cached as a 200. Fix: since every valid slug is known at build time from `PRODUCTS`, added `export const dynamicParams = false`, which makes Next 404 at the routing layer for any unlisted slug before the page component ever runs. (Confirming this required ruling out several red herrings from stale zombie `next start`/`next dev` processes left bound to port 3000 across test iterations — the actual fix is one line.)
- README: added `/products/[slug]` to the routes table, pointing at the data file rather than describing the template's structure.

### 2026-09-13 — 404 centering, sticky portfolio nav, scroll-spy

- 404 page: content was top-aligned inside the flex-1 main area. Made `main` itself a flex container (`flex-1 flex flex-col items-center justify-center`) so the message and CTA sit centered in the space between header and footer at any viewport height. Renamed the CTA to "Go Home" per feedback.
- Portfolio's section nav (Skills/Experience/Projects/Contact) scrolled away entirely once you scrolled past it — no way to jump sections without scrolling back up. Gave `SiteHeader` an optional `secondary` slot rendered inside its own sticky container, so a page's local nav sticks together with the global header as one unit with no pixel-offset math (avoids the overlap/mismatch risk of two independently-positioned sticky elements). Portfolio now passes its section nav through this slot.
- Added scroll-spy (`IntersectionObserver` watching each section, `aria-current="location"` on the active link) so the current section is always visually indicated while scrolling — plus a scroll-position fallback so the last section (Contact) still activates correctly when the page is shorter near the bottom than the observer's trigger band.
- Added `scroll-mt-[150px]` to the four portfolio sections and a global `html { scroll-padding-top: 84px }` (single-sticky-header pages) so anchor jumps and scroll-spy targets land below the sticky bar(s) instead of tucking the heading underneath it. Also added `scroll-behavior: smooth` gated behind `prefers-reduced-motion: no-preference`.
- No README changes — routes and structure are unchanged; these are page-level implementation fixes.

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
