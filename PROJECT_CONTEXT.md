# Project Context

Full context for the AI Chatbot Monorepo project. This file serves as a quick-reference for understanding the architecture, data flow, and key decisions.

---

## Architecture Boxes (Landing Page)

The "Clean Architecture" section on the landing page (`/`) displays 5 expanded detail cards:

| # | Package | Subtitle | Files | Key Capabilities | Tech Badges |
|---|---------|----------|-------|-----------------|-------------|
| 1 | Demo App | Next.js 15 | 9 | 3 pages (landing, e-commerce, portfolio) · API route handler · Platform config presets | Next.js, React 19 |
| 2 | @chatbot/ui | Components | 33 | 22 components, 3 hooks · ChatProvider + ThemeProvider · CSS variable theme system | React, Tailwind |
| 3 | @chatbot/core | Types & Engine | 19 | 7 type definitions · ContextEngine + ContextBuilder · Error handling + retry logic | TypeScript, Zod |
| 4 | @chatbot/providers | Google, Perplexity | 7 | Registry + Adapter pattern · Gemini + Sonar models · Extensible provider interface | AI SDK v6 |
| 5 | API Route | streamText() | 1 | Server-side streaming · UIMessage to ModelMessage conversion · SSE response | Node.js |

**Total: ~81 files across the monorepo.**

---

## Data Flow

```
User Input
  → ChatInput (textarea)
  → ChatProvider.sendMessage({ text })
  → useChat (AI SDK v3)
  → DefaultChatTransport → POST /api/chat
  → Route Handler:
      1. Parse messages + providerId + modelId + contextType
      2. ContextEngine.buildSystemPrompt()
      3. ProviderRegistry.createModel()
      4. convertToModelMessages(messages)  [async]
      5. streamText({ model, system, messages })
      6. toUIMessageStreamResponse()
  → SSE stream back to client
  → useChat updates UIMessage[] with parts
  → MessageList renders parts via ResponseRenderer
  → Auto-scroll via MutationObserver
```

---

## Package Dependency Chain

```
Demo App (Next.js 15)
  ├── @chatbot/ui        (components, hooks, providers, theme)
  │     └── @chatbot/core  (types, context, state, errors, utils)
  ├── @chatbot/providers (Google, Perplexity adapters)
  │     └── @chatbot/core/server  (server-safe exports)
  └── API Route
        ├── @chatbot/providers
        └── @chatbot/core/server
```

---

## Theme Token Flow

```
ChatbotConfig.theme (partial overrides)
  → ThemeProvider.mergeTheme(defaults, overrides)
  → themeToCSS() → inline style with --chatbot-* variables
  → Tailwind config maps: var(--chatbot-primary) → bg-chatbot-primary
  → Components use: className="bg-chatbot-primary text-chatbot-text"
```

**20 CSS variables** mapped to Tailwind utilities:
- 15 colors, 2 border-radius, 2 shadows, 3 font-sizes

---

## Landing Page Sections

| # | Section | Interactive | Notes |
|---|---------|------------|-------|
| 1 | Navbar | Yes | Nav links scroll to sections; "Docs" + "Get Started" are Coming Soon |
| 2 | Hero | Yes | "Try Live Demo" → /ecommerce; "View Architecture" → #architecture |
| 3 | Features | No | Static 2x3 grid |
| 4 | Dashboard Preview | Yes | Sidebar tabs switch between Dashboard/Packages/Settings views |
| 5 | Architecture | No | Expanded detail cards with file counts and tech badges |
| 6 | Theme Preview | No | Static light/dark chat mockups |
| 7 | Footer | Yes | Demo links → /ecommerce, /portfolio |

---

## Non-Functional Links

| Page | Element | Treatment |
|------|---------|-----------|
| `/` | Nav "Docs" | Dimmed + "Coming Soon" tooltip |
| `/` | "Get Started" button | Disabled + "Coming Soon" tooltip |
| `/ecommerce` | "Deals" nav | Dimmed + "Coming Soon" tooltip |
| `/ecommerce` | "Support" nav | Dimmed + "Coming Soon" tooltip |
| `/portfolio` | Email / GitHub / LinkedIn | Dimmed + "Demo Only" tooltip |

---

## Key Technical Decisions

| Area | Decision | Why |
|------|----------|-----|
| Message format | `UIMessage.parts[]` not `.content` | AI SDK v6 uses parts array for structured responses |
| Server imports | `@chatbot/core/server` sub-path | React hooks in barrel exports break server-side imports |
| Theme injection | CSS variables + `display: contents` | Runtime switching without rebuild; no flex chain breakage |
| Auto-scroll | `MutationObserver` | Detects streaming DOM changes for smooth scroll behavior |
| Model conversion | `await convertToModelMessages()` | `streamText` requires `ModelMessage[]`, not `UIMessage[]` |
| Provider pattern | Registry + Adapter | Easy to add new providers without touching core |

---

## Environment

- **Runtime**: Node.js >= 18
- **Package manager**: pnpm 9.15.0
- **Build**: Turborepo + tsup (libraries) + next build (app)
- **AI providers**: Google Gemini (`gemini-2.0-flash`), Perplexity Sonar (`sonar`)
- **API keys**: `GOOGLE_GENERATIVE_AI_API_KEY`, `PERPLEXITY_API_KEY` in `.env.local`
