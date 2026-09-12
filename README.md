# Connected Intelligence

A **Turborepo + pnpm** monorepo with two AI products that share the same core packages:

- **A chatbot widget** (`@chatbot/ui`) — an embeddable, configurable chat widget for any React app, demoed in `apps/demo`.
- **Ask This Page** (`apps/extension`) — a Chrome extension that answers questions about the page you're viewing and shows you exactly where each answer came from.

Both use **Google Gemini** and **Perplexity Sonar** for AI, called server-side from Next.js API routes.

## Structure

```
apps/
  demo/         Next.js 15 app — landing page + chatbot demos + API routes
  extension/    Chrome (MV3) extension — "Ask This Page" (see apps/extension/README.md)

packages/
  core/         Types, ContextEngine, state, error handling — shared by everything
  providers/    Google Gemini + Perplexity adapters (Registry + Adapter pattern)
  ui/           React chat widget components, hooks, theme system
  tsconfig/     Shared TypeScript configs
```

### Routes (`apps/demo`)

| Route | Description |
|---|---|
| `/` | Landing page |
| `/products` | Product catalog — Ask This Page + chatbot widget |
| `/products/[slug]` | Product detail page, data-driven from `apps/demo/src/lib/products-data.tsx` |
| `/ecommerce` | Chatbot demo — Google Gemini |
| `/portfolio` | Chatbot demo — Perplexity Sonar |
| `/api/chat` | Streaming chat endpoint for the widget |
| `/api/page-qa` | Backend for the Ask This Page extension |

Every route shares a global header/footer (`apps/demo/src/components/`) with active-state nav, and non-root routes show a breadcrumb trail back to `/`.

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
pnpm dev      # everything in watch mode, demo app at localhost:3000
pnpm build    # build all packages + apps
```

Copy `apps/demo/.env.example` to `apps/demo/.env.local` and fill in `GOOGLE_GENERATIVE_AI_API_KEY` and `PERPLEXITY_API_KEY` before running. `NEXT_PUBLIC_SITE_URL` is optional in development — set it in production (e.g. to a custom domain) so `metadataBase`, `sitemap.xml`, and `robots.txt` all resolve to the right domain instead of the Vercel preview URL. See `apps/extension/README.md` for the extension's own setup.
