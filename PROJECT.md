# AI-Powered Chatbot Monorepo

A reusable, modular AI chatbot package built as a **Turborepo + pnpm monorepo** that can be integrated into any web/mobile app. The chatbot adapts its behavior based on platform context (e-commerce, portfolio, SaaS, etc.) and uses **Google Gemini** and **Perplexity Sonar** for AI. API calls happen server-side via Next.js Route Handlers.

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Tech Stack](#tech-stack)
- [Monorepo Structure](#monorepo-structure)
- [Package Details](#package-details)
  - [@chatbot/core](#chatbotcore)
  - [@chatbot/providers](#chatbotproviders)
  - [@chatbot/ui](#chatbotui)
  - [Demo App](#demo-app)
- [Key Architecture Decisions](#key-architecture-decisions)
- [Theme System](#theme-system)
- [Context Engine](#context-engine)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Known Issues & Notes](#known-issues--notes)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    Demo App (Next.js 15)             │
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │ Landing  │  │ E-comm   │  │Portfolio │  │ API Route Handler │  │
│  │ Page (/) │  │ Page     │  │  Page    │  │ (Server-side AI)  │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────────┬─────────┘  │
│       │              │              │                 │             │
│       └──────────────┴──────┬───────┘                 │             │
│              ▼                         ▼             │
│  ┌───────────────────┐   ┌────────────────────────┐ │
│  │   @chatbot/ui     │   │  @chatbot/providers    │ │
│  │   (Components)    │   │  (Google, Perplexity)  │ │
│  └────────┬──────────┘   └──────────┬─────────────┘ │
│           │                         │               │
│           └──────────┬──────────────┘               │
│                      ▼                              │
│           ┌──────────────────┐                      │
│           │  @chatbot/core   │                      │
│           │  (Types, Engine) │                      │
│           └──────────────────┘                      │
└─────────────────────────────────────────────────────┘
```

### Package Dependency Graph

```
@chatbot/ui  →  @chatbot/core  ←  @chatbot/providers
     ↓               ↓                    ↓
  react          ai v6              @ai-sdk/google v3
  tailwindcss    @ai-sdk/react v3   @ai-sdk/perplexity v3
  react-query    zod
  react-markdown
```

---

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Monorepo | Turborepo | ^2.3.0 |
| Package Manager | pnpm | 9.15.0 |
| Language | TypeScript | ^5.7.0 |
| AI SDK | ai (Vercel AI SDK) | ^6.0.0 |
| AI React | @ai-sdk/react | ^3.0.0 |
| Google AI | @ai-sdk/google | ^3.0.0 |
| Perplexity AI | @ai-sdk/perplexity | ^3.0.0 |
| Framework | Next.js | ^15.1.0 |
| UI Library | React | ^19.0.0 |
| Styling | Tailwind CSS | ^3.4.17 |
| State | @tanstack/react-query | ^5.62.0 |
| Markdown | react-markdown + remark-gfm | ^9.0.0 / ^4.0.0 |
| Schema | Zod | ^3.24.0 |
| Build | tsup | ^8.3.0 |

---

## Monorepo Structure

```
newcode/
├── apps/
│   └── demo/                             # Next.js 15 demo app
│       ├── next.config.ts                # Transpile workspace packages
│       ├── tailwind.config.ts            # Includes @chatbot/ui CSS variable theme
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
│           ├── app/
│           │   ├── layout.tsx            # Root layout
│           │   ├── page.tsx              # SaaS landing page (home)
│           │   ├── globals.css           # Tailwind + markdown styles
│           │   ├── api/chat/route.ts     # Server-side AI route handler
│           │   ├── ecommerce/page.tsx    # E-commerce demo (Google Gemini)
│           │   └── portfolio/page.tsx    # Portfolio demo (Perplexity Sonar)
│           ├── contexts/
│           │   ├── ecommerce-config.ts   # ChatbotConfig for e-commerce
│           │   └── portfolio-config.ts   # ChatbotConfig for portfolio
│           └── lib/
│               └── demo-data.ts          # Mock products, projects, portfolio owner
│
├── packages/
│   ├── core/                             # @chatbot/core
│   │   ├── package.json                  # Exports: "." and "./server"
│   │   ├── tsconfig.json
│   │   ├── tsup.config.ts               # Entry: index.ts + server.ts
│   │   └── src/
│   │       ├── index.ts                  # Full barrel export (client + server)
│   │       ├── server.ts                 # Server-safe exports (no React hooks)
│   │       ├── types/
│   │       │   ├── message.ts            # ChatMessage, MessagePart, role types
│   │       │   ├── context.ts            # PlatformContext, Identity, Behavior, etc.
│   │       │   ├── provider.ts           # ProviderConfig, ProviderInfo, RetryConfig
│   │       │   ├── action.ts             # ChatAction, QuickReply, SuggestionPrompt
│   │       │   ├── theme.ts              # ChatTheme, colors, typography, spacing
│   │       │   ├── config.ts             # ChatbotConfig (master config)
│   │       │   └── conversation.ts       # Conversation, ConversationSummary
│   │       ├── context/
│   │       │   ├── context-engine.ts     # ContextEngine class
│   │       │   ├── context-builder.ts    # Fluent ContextBuilder
│   │       │   └── presets.ts            # createEcommerceContext, createPortfolioContext
│   │       ├── state/
│   │       │   ├── query-keys.ts         # React Query key factory
│   │       │   └── use-chat-state.ts     # useChatState hook
│   │       ├── errors/
│   │       │   ├── chat-errors.ts        # ChatError hierarchy (6 error classes)
│   │       │   └── retry.ts             # Retry with exponential backoff + jitter
│   │       └── utils/
│   │           ├── message-utils.ts      # extractTextContent, createTextMessage, etc.
│   │           ├── scroll.ts             # scrollToBottom, isNearBottom
│   │           └── id.ts                 # generateId, generateConversationId, etc.
│   │
│   ├── providers/                        # @chatbot/providers
│   │   ├── package.json                  # Exports: ".", "./google", "./perplexity"
│   │   ├── tsconfig.json
│   │   ├── tsup.config.ts               # Multi-entry: index, google, perplexity
│   │   └── src/
│   │       ├── index.ts                  # Barrel export
│   │       ├── base/
│   │       │   ├── base-provider.ts      # BaseProvider abstract class
│   │       │   └── provider-registry.ts  # ProviderRegistry singleton
│   │       ├── google/
│   │       │   ├── index.ts
│   │       │   └── google-provider.ts    # GoogleProvider (Gemini models)
│   │       └── perplexity/
│   │           ├── index.ts
│   │           └── perplexity-provider.ts # PerplexityProvider (Sonar models)
│   │
│   ├── ui/                               # @chatbot/ui
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tsup.config.ts
│   │   ├── tailwind.config.ts            # CSS variable-based chatbot theme
│   │   └── src/
│   │       ├── index.ts                  # Barrel export (all components/hooks)
│   │       ├── providers/
│   │       │   ├── ChatProvider.tsx       # Chat state provider (useChat wrapper)
│   │       │   └── ThemeProvider.tsx      # CSS variable theme injection
│   │       ├── hooks/
│   │       │   ├── useAutoScroll.ts      # Auto-scroll with MutationObserver
│   │       │   ├── useChatWidget.ts      # Widget open/close/toggle state
│   │       │   └── useResponsive.ts      # Mobile breakpoint detection
│   │       ├── theme/
│   │       │   ├── default-theme.ts      # Light theme (blue primary)
│   │       │   ├── dark-theme.ts         # Dark theme (indigo/purple)
│   │       │   └── theme-utils.ts        # mergeTheme, createTheme, themeToCSS
│   │       └── components/
│   │           ├── ChatWidget/           # Floating widget
│   │           │   ├── ChatWidget.tsx     # Widget container (fixed position)
│   │           │   ├── ChatWidgetTrigger.tsx # FAB trigger button
│   │           │   └── ChatWidgetPanel.tsx   # Popup (desktop) / Bottom sheet (mobile)
│   │           ├── ChatWindow/
│   │           │   └── ChatWindow.tsx     # Full chat layout (header + body + footer)
│   │           ├── Message/
│   │           │   ├── MessageBubble.tsx  # Base bubble (user/assistant alignment)
│   │           │   ├── UserMessage.tsx    # User message (plain text)
│   │           │   ├── AssistantMessage.tsx # Assistant message (markdown rendered)
│   │           │   └── MessageList.tsx    # Message list with UIMessage handling
│   │           ├── Input/
│   │           │   ├── ChatInput.tsx      # Auto-resize textarea + send button
│   │           │   ├── QuickReplies.tsx   # Pill-style quick reply buttons
│   │           │   └── SuggestionPrompts.tsx # Grid of suggested prompts
│   │           ├── Feedback/
│   │           │   ├── LoadingIndicator.tsx # Bouncing dots animation
│   │           │   ├── StreamingText.tsx  # Text with cursor animation
│   │           │   ├── ErrorState.tsx     # Error display with retry button
│   │           │   └── EmptyState.tsx     # Empty chat placeholder
│   │           ├── Response/
│   │           │   ├── ProductCard.tsx    # Product card (image, price, rating)
│   │           │   ├── ProjectCard.tsx    # Project card (tech stack, status)
│   │           │   ├── SourceCard.tsx     # Source citation card
│   │           │   ├── ImageCard.tsx      # Image card with caption
│   │           │   └── ResponseRenderer.tsx # Part-type dispatcher
│   │           └── Layout/
│   │               ├── ChatHeader.tsx     # Header with title + close button
│   │               ├── ChatBody.tsx       # Message area with auto-scroll
│   │               ├── ChatFooter.tsx     # Footer with input
│   │               ├── WelcomeScreen.tsx  # Welcome message + suggestions
│   │               └── ChatHistory.tsx    # Conversation list sidebar
│   │
│   └── tsconfig/                         # Shared TypeScript configs
│       ├── package.json
│       ├── base.json                     # Base TS config
│       ├── react-library.json            # For React packages (JSX, DOM)
│       └── nextjs.json                   # For Next.js apps
│
├── turbo.json                            # Turborepo pipeline config
├── pnpm-workspace.yaml                   # Workspace definition
├── package.json                          # Root scripts (build, dev, typecheck)
├── .npmrc
└── .gitignore
```

---

## Package Details

### @chatbot/core

The foundational package containing types, context engine, state management, error handling, and utilities.

#### Types (`src/types/`)

**`message.ts`** — Message and content types:
- `MessageRole`: `"user" | "assistant" | "system"`
- `MessagePart`: Union type — `TextPart | ProductCardPart | ProjectCardPart | SourceCardPart | ImageCardPart`
- `ChatMessage`: Full message with id, role, content, parts, metadata, createdAt

**`context.ts`** — Platform context configuration:
- `PlatformType`: `"ecommerce" | "portfolio" | "saas" | "support" | "custom"`
- `PlatformContext`: Composed of Identity, Behavior, Knowledge, UIHints
- `PlatformBehavior`: tone, responseStyle, topicBoundaries, forbiddenTopics
- `PlatformKnowledge`: instructions, facts, FAQs, dynamicData

**`provider.ts`** — Provider configuration:
- `ProviderConfig`: providerId, modelId, apiKey, options, retry
- `ProviderInfo`: id, name, description, capabilities, models
- `RetryConfig`: maxRetries, initialDelay, maxDelay, backoffMultiplier

**`theme.ts`** — Complete theme interface:
- `ChatTheme`: colors (16 tokens), typography, spacing, borderRadius, shadows, animation, widget positioning

**`config.ts`** — Master configuration:
- `ChatbotConfig`: context + provider + theme + features + hooks + apiEndpoint

**`action.ts`** — User interaction types:
- `ChatAction`, `QuickReply`, `SuggestionPrompt`

**`conversation.ts`** — Conversation tracking:
- `Conversation`, `ConversationSummary`

#### Context Engine (`src/context/`)

**`ContextEngine`** — Builds system prompts from PlatformContext:
```typescript
const engine = new ContextEngine(context);
const prompt = engine.buildSystemPrompt(); // Multi-section system prompt
engine.updateDynamicData("inventory", stockData); // Runtime data updates
```

**`ContextBuilder`** — Fluent API for building contexts:
```typescript
const context = new ContextBuilder()
  .setIdentity("ShopBot", "ecommerce", "Your shopping assistant")
  .setTone("friendly")
  .addInstruction("Recommend products based on user preferences")
  .setWelcomeMessage("Welcome! How can I help?")
  .setSuggestedPrompts(["Show deals", "Find a gift"])
  .build();
```

**Presets** — Pre-configured context factories:
- `createEcommerceContext(storeName, options?)` — Shopping assistant with product knowledge
- `createPortfolioContext(ownerName, options?)` — Portfolio assistant with project/skills data

#### State Management (`src/state/`)

**`query-keys.ts`** — React Query key factory:
```typescript
chatQueryKeys.all                    // ["chat"]
chatQueryKeys.conversations()        // ["chat", "conversations"]
chatQueryKeys.messages(convId)       // ["chat", "conversations", id, "messages"]
```

**`useChatState`** — Hook that bridges config to chat state:
- Creates `ContextEngine` from config
- Builds system prompt
- Provides request body for API calls
- Fires `onMessageSend`/`onMessageReceive` hooks

#### Error Handling (`src/errors/`)

**Error class hierarchy:**
```
ChatError (base)
  ├── ProviderError    (PROVIDER_ERROR, retryable: configurable)
  ├── RateLimitError   (RATE_LIMIT, retryable: true, retryAfter?)
  ├── AuthenticationError (AUTH_ERROR, retryable: false)
  ├── NetworkError     (NETWORK_ERROR, retryable: true)
  └── ContextError     (CONTEXT_ERROR, retryable: false)
```

**Retry utility** — Exponential backoff with jitter:
```typescript
const result = await withRetry(
  () => fetchData(),
  { maxRetries: 3, initialDelay: 1000, backoffMultiplier: 2 }
);
```

#### Server Export (`src/server.ts`)

A separate entry point that excludes React hooks (no `useChatState`, no `scroll.ts`), making it safe to import in Next.js Server Components and Route Handlers:

```typescript
import { ContextEngine, createEcommerceContext } from "@chatbot/core/server";
```

---

### @chatbot/providers

Adapter layer for AI model providers using the Registry + Adapter pattern.

#### BaseProvider

Abstract class with shared functionality:
```typescript
abstract class BaseProvider {
  abstract get info(): ProviderInfo;
  abstract createModel(): LanguageModel;
  validateModel(modelId: string): boolean;
  getModelId(): string;
}
```

#### GoogleProvider

Wraps `@ai-sdk/google` (Gemini models):
- Models: `gemini-2.0-flash`, `gemini-2.0-flash-lite`, `gemini-1.5-flash`, `gemini-1.5-pro`
- Capabilities: streaming, images, tool calls
- Default: `gemini-2.0-flash`

#### PerplexityProvider

Wraps `@ai-sdk/perplexity` (Sonar models):
- Models: `sonar`, `sonar-pro`, `sonar-reasoning`, `sonar-reasoning-pro`
- Capabilities: streaming, sources/citations
- Default: `sonar`

#### ProviderRegistry

Singleton registry for provider management:
```typescript
const registry = ProviderRegistry.getInstance();
registry.register("google", createGoogleProvider);
registry.register("perplexity", createPerplexityProvider);

const model = registry.createModel({
  providerId: "google",
  modelId: "gemini-2.0-flash",
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});
```

---

### @chatbot/ui

Complete React component library with 22 components, 3 hooks, 2 providers, and a theme system.

#### Providers

**`ChatProvider`** — Central state management wrapping `useChat` from `@ai-sdk/react` v3:
- Manages `input` state manually (v3 API change)
- Uses `DefaultChatTransport` for API configuration
- Exposes: `messages`, `input`, `status`, `isLoading`, `error`, `sendMessage`, `regenerate`, `stop`
- `status`: `"ready" | "submitted" | "streaming" | "error"`

**`ThemeProvider`** — Injects CSS custom properties:
- Converts `ChatTheme` to `--chatbot-*` CSS variables via inline styles
- Uses `display: contents` to avoid breaking flex layout chains
- Deep-merges partial themes with defaults

#### Hooks

**`useAutoScroll`** — Smart auto-scrolling:
- Tracks scroll position via `isNearBottom()` threshold
- Uses `MutationObserver` to detect streaming content changes
- Returns: `containerRef`, `handleScroll`, `scrollToEnd`

**`useChatWidget`** — Widget open/close state:
- Returns: `isOpen`, `open`, `close`, `toggle`

**`useResponsive`** — Responsive breakpoint detection:
- Returns: `isMobile` (default breakpoint: 768px)

#### Components

| Category | Component | Description |
|----------|-----------|-------------|
| **Widget** | `ChatWidget` | Fixed-position floating widget (FAB + panel) |
| | `ChatWidgetTrigger` | Floating action button (chat/close icons) |
| | `ChatWidgetPanel` | Desktop popup (400x600) / Mobile bottom sheet |
| **Window** | `ChatWindow` | Full chat layout (header + body + footer) |
| **Layout** | `ChatHeader` | Title, subtitle, close button |
| | `ChatBody` | Scrollable message area with auto-scroll |
| | `ChatFooter` | Input area wrapper |
| | `WelcomeScreen` | Welcome message + suggestion prompts |
| | `ChatHistory` | Conversation list (sidebar) |
| **Messages** | `MessageBubble` | Base bubble with role-based alignment/colors |
| | `UserMessage` | User bubble (plain text, right-aligned) |
| | `AssistantMessage` | Assistant bubble (markdown rendered, left-aligned) |
| | `MessageList` | Renders `UIMessage[]` from AI SDK |
| **Input** | `ChatInput` | Auto-resize textarea + send button (Enter to send) |
| | `QuickReplies` | Horizontal pill buttons |
| | `SuggestionPrompts` | 2-column grid of prompt cards |
| **Feedback** | `LoadingIndicator` | Three bouncing dots animation |
| | `StreamingText` | Text with blinking cursor |
| | `ErrorState` | Error display with retry button |
| | `EmptyState` | Empty chat placeholder |
| **Response** | `ProductCard` | Product with image, price, rating, stock status |
| | `ProjectCard` | Project with tech stack, status badge |
| | `SourceCard` | Citation with favicon, snippet, URL |
| | `ImageCard` | Image with caption |
| | `ResponseRenderer` | Dispatches `MessagePart[]` to correct card |

---

### Demo App

Next.js 15 application with a SaaS landing page and two integration demos.

#### Landing Page (`/`)

Premium SaaS marketing page with **Zona Pro-inspired soft pastel theme**:
- **Design**: Soft cream background (`#F6F1E8`), rounded 20–24px cards, subtle diffused shadows, clean geometric typography with tight tracking
- **Color palette**: Lavender `#CDA9EE`, Blue `#A4C1EE`, Yellow `#FFD696`, Black `#000`, Cream `#F6F1E8`
- **Sections**: Sticky navbar (Features/Architecture/Demo nav links), dark gradient hero (headline + "Try Live Demo" CTA → `/ecommerce` + floating chat preview), 2x3 pastel feature cards (6 capabilities), interactive dashboard preview (tabbed sidebar: Dashboard/Packages/Settings with switchable content), architecture diagram (black card with flow indicator + 3+2 grid of expanded detail cards showing file counts, capabilities, and tech badges), theme preview (light/dark chat mockups + config snippet), horizontal footer (demo links + copyright 2026)
- **Animations**: No custom keyframe animations — all motion via Tailwind `transition-*` utilities
- **Interactive elements**: Dashboard Preview sidebar tabs switch between Dashboard (KPI + tasks), Packages (4 monorepo package cards), and Settings (provider/theme/endpoint mockups) via `useState`
- **Static mockups**: Hero chat preview, dashboard tab content, and theme preview are decorative (`pointer-events-none select-none`)
- **Non-functional links**: "Docs" nav link and "Get Started" button are disabled with "Coming Soon" tooltips

#### E-Commerce Demo (`/ecommerce`)

- **Provider**: Google Gemini (`gemini-2.0-flash`)
- **Theme**: Amber/warm colors (`#d97706` primary)
- **Content**: Product grid with 6 tech products
- **Features**: Floating `ChatWidget` for shopping assistance
- **Context**: Product recommendations, pricing, comparisons
- **Navigation**: "← Back to home" link → `/`
- **Non-functional links**: "Deals" and "Support" nav links are disabled with "Coming Soon" tooltips

#### Portfolio Demo (`/portfolio`)

- **Provider**: Perplexity Sonar (`sonar`)
- **Theme**: Dark purple/slate (`#8b5cf6` primary)
- **Content**: Hero section, skills grid, project cards, contact section
- **Features**: Floating `ChatWidget` for portfolio exploration
- **Context**: Projects, skills, experience, contact info
- **Navigation**: "← Back to home" link → `/`
- **Contact links**: Email (mailto:awadhesh31st@gmail.com), GitHub (github.com/awadhesh31st), LinkedIn (linkedin.com/in/kawadhe/) — all functional, open in new tab

#### API Route (`/api/chat`)

Server-side streaming handler:
1. Parses `messages`, `providerId`, `modelId`, `contextType` from request body
2. Resolves `ContextEngine` and builds system prompt
3. Creates `LanguageModel` via `ProviderRegistry`
4. Converts `UIMessage[]` to `ModelMessage[]` (async, required by AI SDK v6)
5. Calls `streamText()` and returns `toUIMessageStreamResponse()`

---

## Key Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| AI streaming | `useChat` from `@ai-sdk/react` v3 | Handles SSE protocol, abort, message state out of the box |
| Server/client split | `@chatbot/core/server` sub-path export | React hooks in barrel exports break server-side imports in Next.js App Router |
| Theming | CSS variables + Tailwind | Runtime theme switching without CSS rebuild; `var(--chatbot-*)` referenced by Tailwind utilities |
| Context engine | Class + fluent builder | Class holds dynamic data cache; builder provides ergonomic construction |
| Message format | AI SDK v6 `UIMessage` with `parts` array | Not `content` string; extract text via `parts.filter(p => p.type === "text")` |
| Route response | `toUIMessageStreamResponse()` | Preserves structured parts (sources, tool calls) vs plain text stream |
| Provider abstraction | Registry + adapter pattern | Easy to add new providers without touching core |
| Message conversion | `await convertToModelMessages(messages)` | `streamText` takes `ModelMessage[]` not `UIMessage[]`; conversion is async |
| Markdown rendering | `react-markdown` + `remark-gfm` | Full GFM support (tables, strikethrough, task lists) |
| Auto-scroll | `MutationObserver` on message container | Detects DOM changes during streaming for smooth auto-scroll |
| Layout integrity | `display: contents` on ThemeProvider | Prevents extra div from breaking flex height chain |

---

## Theme System

The theme system uses CSS custom properties that Tailwind CSS references at runtime.

### How It Works

1. **`ChatTheme`** interface defines all design tokens (colors, typography, spacing, etc.)
2. **`ThemeProvider`** converts theme to `--chatbot-*` CSS variables injected as inline styles
3. **Tailwind config** maps CSS variables to utility classes:

```typescript
// tailwind.config.ts
colors: {
  chatbot: {
    primary: "var(--chatbot-primary)",     // → bg-chatbot-primary
    surface: "var(--chatbot-surface)",     // → bg-chatbot-surface
    error: "var(--chatbot-error)",         // → text-chatbot-error
    // ... 16 color tokens total
  }
}
```

### Available Themes

- **Default (Light)**: Blue primary (`#2563eb`), white background, slate surfaces
- **Dark**: Indigo primary (`#818cf8`), dark navy background, slate surfaces

### Custom Themes

Pass partial theme overrides via `ChatbotConfig.theme`:

```typescript
const config: ChatbotConfig = {
  // ...
  theme: {
    colors: {
      primary: "#d97706",        // Amber
      userBubble: "#d97706",
      background: "#ffffff",
      surface: "#fffbeb",
    },
  },
};
```

### CSS Variable Reference

| Variable | Tailwind Class | Usage |
|----------|---------------|-------|
| `--chatbot-primary` | `bg-chatbot-primary` | Primary buttons, links |
| `--chatbot-primary-hover` | `bg-chatbot-primary-hover` | Button hover state |
| `--chatbot-primary-light` | `bg-chatbot-primary-light` | Light accent backgrounds |
| `--chatbot-background` | `bg-chatbot-background` | Main chat background |
| `--chatbot-surface` | `bg-chatbot-surface` | Card/panel backgrounds |
| `--chatbot-border` | `border-chatbot-border` | Borders, dividers |
| `--chatbot-text` | `text-chatbot-text` | Primary text |
| `--chatbot-text-secondary` | `text-chatbot-text-secondary` | Secondary/muted text |
| `--chatbot-text-inverse` | `text-chatbot-text-inverse` | Text on primary backgrounds |
| `--chatbot-user-bubble` | `bg-chatbot-user-bubble` | User message bubble |
| `--chatbot-assistant-bubble` | `bg-chatbot-assistant-bubble` | Assistant message bubble |
| `--chatbot-error` | `text-chatbot-error` | Error states |
| `--chatbot-success` | `text-chatbot-success` | Success states |
| `--chatbot-radius` | `rounded-chatbot` | Default border radius |
| `--chatbot-radius-lg` | `rounded-chatbot-lg` | Large border radius |
| `--chatbot-shadow` | `shadow-chatbot` | Default shadow |
| `--chatbot-shadow-lg` | `shadow-chatbot-lg` | Large shadow (widget) |
| `--chatbot-font-size-sm` | `text-chatbot-sm` | Small font size |
| `--chatbot-font-size-base` | `text-chatbot-base` | Base font size |
| `--chatbot-font-size-lg` | `text-chatbot-lg` | Large font size |

### Custom Animations

**Chatbot component animations:**

| Animation | Class | Description |
|-----------|-------|-------------|
| `chatbot-fade-in` | `animate-chatbot-fade-in` | 200ms opacity fade-in |
| `chatbot-slide-up` | `animate-chatbot-slide-up` | 300ms slide-up with fade |
| `chatbot-bounce` | `animate-chatbot-bounce` | 1.4s infinite bounce (loading dots) |

The landing page (Zona Pro pastel theme) uses no custom keyframe animations — all motion is via Tailwind's built-in `transition-*` utilities.

---

## Context Engine

The context engine converts platform configuration into system prompts that guide AI behavior.

### System Prompt Structure

```
You are {name}, a {type} assistant. {description}

Communication style: {tone}, {responseStyle} responses.

Stay focused on these topics: {topicBoundaries}.

Never discuss: {forbiddenTopics}.

If asked about off-topic subjects, respond with: "{fallbackMessage}"

Instructions:
- {instruction1}
- {instruction2}

Key facts:
- {fact1}

FAQs:
Q: {question1}
A: {answer1}

Available data:
{JSON of dynamicData}
```

### Dynamic Data Updates

```typescript
const engine = new ContextEngine(context);
engine.updateDynamicData("currentDeals", [
  { product: "Headphones", discount: "20%" }
]);
// Next buildSystemPrompt() call includes this data
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 9.15.0

### Installation

```bash
cd newcode
pnpm install
```

### Build

```bash
pnpm build
```

This runs `turbo build` which builds packages in dependency order:
1. `@chatbot/core` (tsup)
2. `@chatbot/providers` (tsup)
3. `@chatbot/ui` (tsup)
4. `demo` (next build)

### Development

```bash
pnpm dev
```

Starts all packages in watch mode + Next.js dev server at `http://localhost:3000`.

---

## Environment Variables

Create `.env.local` in `apps/demo/`:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key
PERPLEXITY_API_KEY=your_perplexity_api_key
```

### Getting API Keys

- **Google Gemini**: [Google AI Studio](https://aistudio.google.com/) — Create an API key
- **Perplexity**: [Perplexity API](https://docs.perplexity.ai/) — Generate an API key

---

## Scripts

### Root (monorepo)

| Script | Command | Description |
|--------|---------|-------------|
| `build` | `turbo run build` | Build all packages |
| `dev` | `turbo run dev` | Dev mode (all packages) |
| `typecheck` | `turbo run typecheck` | TypeScript type checking |
| `lint` | `turbo run lint` | Lint all packages |
| `clean` | `turbo run clean` | Remove dist/.next folders |

### Per-package

| Script | Command | Description |
|--------|---------|-------------|
| `build` | `tsup` / `next build` | Build package |
| `dev` | `tsup --watch` / `next dev` | Watch mode |
| `typecheck` | `tsc --noEmit` | Type check |
| `clean` | `rm -rf dist` / `rm -rf .next` | Clean build artifacts |

---

## Known Issues & Notes

### AI SDK v6 Breaking Changes (vs v4)

The project uses AI SDK v6 which has significant API changes from v4:

1. **`useChat` v3 API**: No more `input`, `handleInputChange`, `handleSubmit`, `append`, `reload`, `isLoading`
   - Use: `sendMessage({ text })`, `regenerate()`, `chat.status`, manage `input` state yourself
   - Use `DefaultChatTransport` for transport config instead of `api` option

2. **`UIMessage` format**: Uses `parts` array, not `content` string
   - Extract text: `message.parts.filter(p => p.type === "text").map(p => p.text).join("")`

3. **`LanguageModel` type**: `LanguageModelV1` renamed to `LanguageModel` in v6

4. **`convertToModelMessages`**: Required (async) to convert `UIMessage[]` to `ModelMessage[]` for `streamText`

5. **`onFinish` callback**: Receives `{ message, messages, isAbort, isDisconnect, isError, finishReason }` object

### Server/Client Boundary

- `@chatbot/core` has a `/server` sub-path export that excludes React hooks
- `@chatbot/providers` imports from `@chatbot/core/server` (providers are used in server routes)
- Without this split, React hooks in barrel exports break Next.js server-side imports

### Tailwind + Workspace Packages

- Tailwind config can't easily import from workspace packages via subpath exports
- Solution: The chatbot Tailwind config (CSS variable mappings) is inlined in the consuming app's `tailwind.config.ts`
- The demo app's Tailwind content paths include `../../packages/ui/src/**/*.{ts,tsx}` to scan UI package classes

### Markdown Rendering

- Assistant messages use `react-markdown` with `remark-gfm` for GitHub Flavored Markdown
- Custom CSS classes (`.chatbot-markdown`) in `globals.css` style all markdown elements
- Supports: headings, bold/italic, lists, code blocks, tables, blockquotes, links, images, horizontal rules

### Auto-Scroll During Streaming

- `useAutoScroll` uses a `MutationObserver` to detect DOM changes during streaming
- Only auto-scrolls when user is near the bottom (150px threshold)
- Tracks `shouldAutoScroll` via scroll event handler

### Layout Fix: Flex Height Chain

- `ThemeProvider` uses `display: contents` to avoid breaking the flex height chain
- `ChatWindowInner` and `ChatBody` use `min-h-0` for proper overflow scrolling
- `ChatWindow` outer div has `flex flex-col` for correct layout composition

---

## Integration Guide

### Minimal Integration

```tsx
import { ChatWidget } from "@chatbot/ui";
import type { ChatbotConfig } from "@chatbot/core";

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

export default function App() {
  return <ChatWidget config={config} />;
}
```

### API Route (Next.js)

```typescript
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { ProviderRegistry, createGoogleProvider } from "@chatbot/providers";
import { ContextEngine } from "@chatbot/core/server";

const registry = ProviderRegistry.getInstance();
registry.register("google", createGoogleProvider);

export async function POST(request: Request) {
  const { messages, providerId, modelId } = await request.json();

  const model = registry.createModel({ providerId, modelId, apiKey: process.env.API_KEY });
  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({ model, system: "Your system prompt", messages: modelMessages });
  return result.toUIMessageStreamResponse();
}
```

### Adding a New Provider

1. Create `packages/providers/src/newprovider/newprovider.ts`:
```typescript
import { BaseProvider } from "../base/base-provider";

export class NewProvider extends BaseProvider {
  get info() { return { id: "new", name: "New", /* ... */ }; }
  createModel() { /* wrap SDK */ }
}
export function createNewProvider(config) { return new NewProvider(config); }
```

2. Register in the API route:
```typescript
registry.register("new", createNewProvider);
```

---

## File Count Summary

| Package | Files | Description |
|---------|-------|-------------|
| `@chatbot/core` | 19 source files | Types, context, state, errors, utils |
| `@chatbot/providers` | 7 source files | Base, registry, Google, Perplexity |
| `@chatbot/ui` | 33 source files | Components, hooks, providers, theme |
| `demo` | 9 source files | Pages, API route, configs, data |
| Config | 13 config files | tsconfig, tsup, tailwind, turbo, etc. |
| **Total** | **~81 files** | Full monorepo |
