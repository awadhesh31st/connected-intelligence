# Landing Page Update

## Overview

Replaced the default home page (`/`) with a modern SaaS landing page promoting the AI Chatbot Monorepo package. The page showcases the package's architecture, features, and theme system with a futuristic AI aesthetic.

## Route

`http://localhost:3000/` (home page)

## Files Changed

| File | Change |
|------|--------|
| `apps/demo/src/app/page.tsx` | Replaced demo selector with full SaaS landing page |
| `apps/demo/tailwind.config.ts` | Added 5 landing page animations |
| `apps/demo/src/app/landing/` | Deleted (merged into home page) |

## Design System

### Colors
- Primary text: `#14002E` (deep navy/purple)
- Accent: `#1B0033` (dark purple)
- Secondary text: `#8A8A8A`
- Surface: `#F5F5F5`

### Animations Added
| Animation | Duration | Purpose |
|-----------|----------|---------|
| `landing-float` | 6s infinite | Gradient blob vertical bob |
| `landing-pulse-glow` | 4s infinite | Glow accent pulsing |
| `landing-gradient-spin` | 8s linear | Logo dot rotation |
| `landing-fade-in-up` | 0.6s | Section entrance |
| `landing-typing-cursor` | 1s infinite | Simulated chat typing cursor |

## Page Sections

1. **Background Layer** — Soft green gradient with animated glassmorphism blobs
2. **Navbar** — Sticky, backdrop-blur with animated logo dot and nav links ("Docs" marked Coming Soon, "Get Started" disabled with Coming Soon tooltip)
3. **Hero** — Two-column layout with headline + simulated chat card (ProductCard, SourceCard mockups)
4. **Feature Cards** — 3-column grid: Context Engine (glassmorphism), Modular Monorepo (dark purple), Multi-Provider AI (light surface)
5. **Architecture Overview** — Dark glass card with CSS-only block diagram
6. **Key Features Grid** — 2x3 grid covering Context Engine, Streaming UI, CSS Variable Theme, Provider Registry, Structured Responses, AI SDK v6
7. **Theme System** — Light/dark theme previews with config code snippet
8. **Footer** — Logo, E-Commerce & Portfolio demo links, copyright

## Visual Effects

- **Glassmorphism**: `backdrop-blur-xl bg-white/10 border border-white/20`
- **Gradient blobs**: Absolute-positioned `blur-3xl` divs with green/purple gradients
- **Glow accents**: Box-shadow with rgba purple/green values
- **Responsive**: Mobile-first, stacks vertically on small screens

## Non-Functional Links Handling

Links/buttons without a live destination are disabled and show a tooltip on hover:

| Page | Element | Treatment |
|------|---------|-----------|
| `/` (home) | Nav "Docs" link | Dimmed text + "Coming Soon" tooltip |
| `/` (home) | "Get Started" button | Disabled button + "Coming Soon" tooltip |
| `/ecommerce` | Nav "Deals" link | Dimmed text + "Coming Soon" tooltip |
| `/ecommerce` | Nav "Support" link | Dimmed text + "Coming Soon" tooltip |
| `/portfolio` | Email link | Dimmed text + "Demo Only" tooltip |
| `/portfolio` | GitHub link | Dimmed text + "Demo Only" tooltip |
| `/portfolio` | LinkedIn link | Dimmed text + "Demo Only" tooltip |
