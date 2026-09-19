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
| `/api/page-qa` | Backend for the Ask This Page extension — requires a device bearer token (see below) |
| `/api/extension/register` | Issues a new anonymous device token for the extension |

Every route shares a global header/footer (`apps/demo/src/components/`) with active-state nav, and non-root routes show a breadcrumb trail back to `/`.

## Tech stack

| Category | Technology |
|---|---|
| Monorepo | Turborepo, pnpm workspaces |
| Language | TypeScript |
| AI | Vercel AI SDK, Google Gemini, Perplexity Sonar |
| Web app | Next.js 15, React 19, Tailwind CSS |
| Extension | Vite + `@crxjs/vite-plugin`, React 19 |
| Database | Postgres (Drizzle ORM) — device identity + usage quotas for Ask This Page |
| Rate limiting | Upstash Redis (`@upstash/ratelimit`) |

### Ask This Page backend

The extension has no user accounts — every install is an anonymous **device**. On first use it registers itself (`POST /api/extension/register`), the backend mints an opaque bearer token and stores only its SHA-256 hash, and the extension caches the token in `chrome.storage.local` and sends it as `Authorization: Bearer <token>` on every `/api/page-qa` request. This gives every device a real, revocable identity without any signup friction.

Each request to `/api/page-qa` goes through, in order:

1. **Auth** — the bearer token must match a non-revoked device.
2. **Burst rate limit** — a short sliding window per device *and* per IP (Upstash-backed; fails open, not closed, if Upstash isn't configured — see below).
3. **Daily quota** — a per-device question cap stored in Postgres (`usage_daily`), the one layer that's always enforced regardless of whether Upstash is set up.
4. **Request validation** — a Zod schema rejects (413/400) any request outside the shapes the real extension ever sends, instead of the old behavior of silently truncating oversized input.

Only a successful model call counts against the daily quota, and the app tracks input/output token usage per device per day for cost visibility.

## Getting started

```bash
pnpm install
pnpm dev      # everything in watch mode, demo app at localhost:3000
pnpm build    # build all packages + apps
```

Copy `apps/demo/.env.example` to `apps/demo/.env.local` and fill in:

- `GOOGLE_GENERATIVE_AI_API_KEY`, `PERPLEXITY_API_KEY` — required.
- `DATABASE_URL` — required for the Ask This Page backend. A free [Neon](https://neon.tech) Postgres project works well with the serverless driver already wired up. After setting it, run `pnpm --filter demo db:migrate` to create the `devices`/`usage_daily` tables (schema lives in `apps/demo/src/lib/db/schema.ts`; change it and run `pnpm --filter demo db:generate` to produce a new migration).
- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` — optional but recommended in production. A free [Upstash](https://upstash.com) Redis database enables real burst rate limiting; without it, only the (still mandatory) daily quota applies.
- `NEXT_PUBLIC_SITE_URL` — optional in development; set it in production so `metadataBase`, `sitemap.xml`, and `robots.txt` resolve to your real domain instead of the Vercel preview URL.

See `apps/extension/README.md` for the extension's own setup.
