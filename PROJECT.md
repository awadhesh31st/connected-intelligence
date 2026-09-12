# AI-Powered Chatbot Monorepo

A **Turborepo + pnpm** monorepo containing a reusable, embeddable AI chatbot widget and a browser extension that answers questions about the page you're viewing. Both share the same core packages (types, context engine, provider adapters) and use **Google Gemini** and **Perplexity Sonar** for AI, called server-side.

## Structure

```
apps/
  demo/         Next.js 15 app — landing page + e-commerce/portfolio chatbot demos + API routes
  extension/    Chrome (MV3) extension — "Ask This Page": ask questions about the current webpage

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

## The "Ask This Page" extension

A Chrome extension that reads the page you're on, answers questions using only that page's content, and highlights the exact source of each answer. See **[apps/extension/README.md](apps/extension/README.md)** for setup, usage, and development instructions. Its backend route (`apps/demo/src/app/api/page-qa/route.ts`) reuses the same `@chatbot/core`/`@chatbot/providers` packages as the widget.

## Adding a new AI provider

1. Create `packages/providers/src/<name>/<name>-provider.ts` extending `BaseProvider`.
2. Register it: `registry.register("<name>", create<Name>Provider)`.

## Notes

- `@chatbot/core` has a `/server` sub-path export that excludes React hooks, so it's safe to import from Next.js Route Handlers.
- The AI SDK v6 message format uses a `parts` array (not `content`); `convertToModelMessages()` is required before `streamText()`.
- See `CHANGES.md` for a running log of notable changes and the reasoning behind them.
