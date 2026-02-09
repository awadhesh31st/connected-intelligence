# Landing Page

## Overview

Premium SaaS landing page at `/` promoting the AI Chatbot Monorepo package. Uses a **Zona Pro-inspired soft pastel theme** with clean, minimal, Apple-level polish.

## Route

`http://localhost:3000/` (home page)

## Files Changed

| File | Change |
|------|--------|
| `apps/demo/src/app/page.tsx` | Full SaaS landing page (Zona Pro pastel theme) |

## Design System — Zona Pro Pastel Theme

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Primary Lavender | `#CDA9EE` | CTAs, active states, logo dot, accents |
| Secondary Blue | `#A4C1EE` | Feature cards, KPI cards, arch boxes |
| Accent Yellow | `#FFD696` | Feature cards, KPI cards, price text |
| Accent Black | `#000000` | Text, dark hero section, architecture card |
| Soft Cream | `#F6F1E8` | Page background |
| White | `#FFFFFF` | Cards, surfaces |

### Design Principles

- **Border radius**: 16–24px (rounded-[16px], rounded-[20px], rounded-[24px])
- **Shadows**: Low-elevation, diffused (`shadow-[0_4px_40px_rgba(0,0,0,0.03)]`, `shadow-[0_8px_30px_rgba(0,0,0,0.04)]`)
- **Typography**: Bold headings with tight tracking, uppercase sub-labels with wide letter spacing
- **Spacing**: Generous padding (p-7, py-20, md:py-28)
- **Borders**: Ultra-subtle (`border-black/5`, `border-white/5`)

### Animations

The Zona Pro pastel theme uses no custom keyframe animations. All motion is achieved via Tailwind's built-in `transition-*` utilities (hover shadows, opacity tooltips, color transitions).

## Page Sections

1. **Navbar** — Sticky, cream background (`bg-[#F6F1E8]/80`) with backdrop-blur, logo "chatbot.ai" with lavender dot, nav links: Features (`#features`), Architecture (`#architecture`), Docs (Coming Soon tooltip), Demo (`#demo`). "Get Started" button disabled with Coming Soon tooltip.
2. **Hero** — Dark gradient card (`from-black via-[#111] to-[#1a1a1a]`), headline "The modern way to build AI chatbots" with lavender accent, two subtle gradient orbs (lavender + blue, `blur-3xl`). "Try Live Demo" lavender CTA button → `/ecommerce`, "View Architecture" secondary link → `#architecture`. Floating chat preview card with product mockup (desktop only, `lg:block`).
3. **Features** — 2x3 grid of pastel cards (lavender/blue/yellow tints): Context Engine, Streaming UI, Theme System, Provider Registry, Structured Responses, AI SDK v6 Native. Each card has icon + title + description with subtle hover shadow.
4. **Dashboard Preview** — White card with interactive sidebar navigation (Dashboard / Packages / Settings tabs via `useState`). **Dashboard tab**: 3 KPI metric cards (Messages Today 2,847 / Avg Response 1.2s / Active Providers 2), task board with 4 checkbox items and colored tag pills. **Packages tab**: 2x2 grid of monorepo package cards (@chatbot/core, @chatbot/providers, @chatbot/ui, demo) with version badges and file counts. **Settings tab**: Provider toggles (Google Gemini active, Perplexity Sonar inactive), Light/Dark theme selector, API endpoint display. Active tab has lavender highlight (`bg-[#CDA9EE]/15`), inactive tabs dim with hover effect.
5. **Architecture** — Black card with a compact flow indicator (Demo App → @chatbot/ui → @chatbot/core → @chatbot/providers → API Route) above a 3+2 grid of expanded detail cards. Each card shows package name, subtitle, file count badge, 2-3 capability bullet points, and tech stack badges. Top row: 3 cards. Bottom row: 2 cards centered. Responsive (1-col mobile, 2-col tablet, 3+2 desktop).
6. **Theme Preview** — Side-by-side light/dark chat mockups with lavender accents, `ChatbotConfig` code snippet below showing theme color configuration.
7. **Footer** — Horizontal layout with logo, demo links (E-Commerce Demo → `/ecommerce`, Portfolio Demo → `/portfolio`), copyright 2026.

## Static Mockup Elements

The following UI elements are **purely decorative** — they have `pointer-events-none` and `select-none` to prevent any user interaction:

| Section | Element | Purpose |
|---------|---------|---------|
| Hero | Floating chat preview (desktop) | Simulated chat conversation with product card |
| Dashboard Preview | KPI cards + task board (Dashboard tab) | Simulated dashboard metrics and tasks |
| Dashboard Preview | Package cards (Packages tab) | Simulated package overview |
| Dashboard Preview | Provider/theme/endpoint (Settings tab) | Simulated settings panel |
| Theme Preview | Light/dark chat mockups | Simulated chat UI in both themes |

**Note:** The Dashboard Preview sidebar is **interactive** — clicking tabs switches the main content area. The content within each tab is static/decorative.

## Non-Functional Links Handling

Links/buttons without a live destination are disabled and show a tooltip on hover:

| Page | Element | Treatment |
|------|---------|-----------|
| `/` (home) | Nav "Docs" link | Dimmed text + "Coming Soon" tooltip |
| `/` (home) | "Get Started" button | Disabled button + "Coming Soon" tooltip |
| `/ecommerce` | Nav "Deals" link | Dimmed text + "Coming Soon" tooltip |
| `/ecommerce` | Nav "Support" link | Dimmed text + "Coming Soon" tooltip |
| `/portfolio` | Email link | Functional — mailto:awadhesh31st@gmail.com |
| `/portfolio` | GitHub link | Functional — github.com/awadhesh31st |
| `/portfolio` | LinkedIn link | Functional — linkedin.com/in/kawadhe/ |
