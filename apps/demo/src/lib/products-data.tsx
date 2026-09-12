import type { ReactNode } from "react";

/**
 * Single source of truth for everything shown on /products and
 * /products/[slug]. Adding a new product to the platform means adding one
 * entry here — the listing grid and the detail-page template are both fully
 * data-driven, so no new components or routes are needed.
 */

export interface ProductStep {
  title: string;
  description: string;
}

export interface ProductCta {
  label: string;
  href: string;
  external?: boolean;
}

export interface Product {
  slug: string;
  name: string;
  /** Short label shown as an eyebrow above the name, e.g. "Browser Extension". */
  category: string;
  /** One-line description for the listing card. */
  tagline: string;
  status: "live" | "coming-soon";
  icon: ReactNode;
  /** Tailwind classes for the icon tile background, and its badge colors. */
  accent: {
    iconBg: string;
    badgeBg: string;
    badgeText: string;
  };
  overview: {
    whatItDoes: string;
    whoItsFor: string;
    problem: string;
    value: string;
  };
  howItWorks: ProductStep[];
  features: string[];
  useCases: string[];
  gettingStarted: {
    description: string;
    steps: string[];
    cta: ProductCta;
  };
  /** "What users can expect" — short, reassuring, concrete claims only. */
  expectations: string[];
  /** Used on the listing card and as the detail page's primary CTA. */
  primaryCta: ProductCta;
}

const EXTENSION_REPO_URL =
  "https://github.com/awadhesh31st/connected-intelligence/tree/master/apps/extension";

const MapPinIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>
);

const ChatBubbleIcon = (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
  </svg>
);

export const PRODUCTS: Product[] = [
  {
    slug: "ask-this-page",
    name: "Ask This Page",
    category: "Browser Extension",
    tagline: "Understand any webpage in one click.",
    status: "live",
    icon: MapPinIcon,
    accent: {
      iconBg: "bg-[#CDA9EE]",
      badgeBg: "bg-[#CDA9EE]/20",
      badgeText: "text-[#8B5EC0]",
    },
    overview: {
      whatItDoes:
        "Reads the page you're viewing and gives you a clear, instant explanation — what it's about, what it does, and what matters most — plus lets you ask anything else about it.",
      whoItsFor:
        "Anyone who reads a lot online: researchers, students, shoppers, developers reading docs, or anyone who lands on an unfamiliar page and needs to understand it fast.",
      problem:
        "Long articles, dense documentation, and unfamiliar websites take time to read — and it's easy to miss the details that actually matter.",
      value:
        "One-click understanding without losing accuracy. Every answer shows exactly where it came from on the page, so you can verify it yourself.",
    },
    howItWorks: [
      { title: "Open any webpage", description: "Browse normally — no special setup or account needed." },
      { title: "Activate the extension", description: "Click the Ask This Page icon in your toolbar." },
      {
        title: "Extension reads the page",
        description: "It extracts the page's real content — headings, paragraphs, key sections — skipping ads and navigation clutter.",
      },
      { title: "AI understands the content", description: "Your chosen AI model analyzes what the page actually says." },
      {
        title: "Get a clear summary and answers",
        description: "Read an instant summary, or ask anything — each answer highlights exactly where it came from.",
      },
    ],
    features: [
      "One-click page summaries: what it's about, what it does, what it's for",
      "Ask follow-up questions in natural language",
      "Every answer cites and highlights its exact source on the page",
      "Works on articles, docs, product pages, policies — any regular webpage",
      "Runs with your own AI provider key",
      "Private by design — page content is never stored on our servers",
    ],
    useCases: [
      "Understand a long article without reading all of it",
      "Quickly evaluate an unfamiliar product or pricing page",
      "Make sense of a dense legal or policy page",
      "Get oriented on a new tool's documentation",
      "Double-check a claim by seeing exactly where it's stated",
    ],
    gettingStarted: {
      description:
        "Free and open source. It's not yet on the Chrome Web Store, so install it from source — it only takes a few minutes.",
      steps: [
        "Clone the repository and build the extension",
        "Load it as an unpacked extension in Chrome",
        "Add your Gemini API key in the extension's settings",
        "Open any webpage and click the icon to start",
      ],
      cta: { label: "Get the Extension", href: EXTENSION_REPO_URL, external: true },
    },
    expectations: [
      "Answers in a second or two on most pages",
      "Clearly tells you when something isn't on the page, instead of guessing",
      "Keeps your API key and page content private to your chosen AI provider",
      "Free to use — no account, no subscription",
    ],
    primaryCta: { label: "Get the Extension", href: EXTENSION_REPO_URL, external: true },
  },
  {
    slug: "chatbot-widget",
    name: "Chatbot Widget",
    category: "Embeddable Widget",
    tagline: "An AI assistant for your own website.",
    status: "live",
    icon: ChatBubbleIcon,
    accent: {
      iconBg: "bg-[#A4C1EE]",
      badgeBg: "bg-[#A4C1EE]/20",
      badgeText: "text-[#5B8BC9]",
    },
    overview: {
      whatItDoes:
        "Drops a themeable AI chat assistant into any website, answering visitor questions using the context and content you give it.",
      whoItsFor:
        "Website owners and product teams who want visitors to get instant, accurate answers instead of searching or waiting on support.",
      problem:
        "Visitors leave when they can't quickly find an answer — pricing, product details, how something works — and support teams can't be everywhere at once.",
      value:
        "A configurable assistant that speaks in your brand's voice and answers from your own content, live on your site in minutes.",
    },
    howItWorks: [
      { title: "Define your context", description: "Describe your product, tone, and key facts once." },
      { title: "Choose an AI provider", description: "Pick Google Gemini or Perplexity Sonar." },
      { title: "Drop in the widget", description: "Add the ChatWidget component to your app." },
      { title: "Visitors get instant answers", description: "The assistant answers using your context, live on your site." },
    ],
    features: [
      "Configurable tone, knowledge, and behavior",
      "Theming via CSS variables — matches your brand instantly",
      "Works with Google Gemini or Perplexity Sonar",
      "Streaming responses with rich UI cards",
      "Suggested prompts and quick replies built in",
    ],
    useCases: [
      "Shopping assistant that recommends products",
      "Portfolio assistant that answers about experience and projects",
      "Support assistant grounded in your own docs",
      "Onboarding guide for a new product",
    ],
    gettingStarted: {
      description: "See it running live in two themed demos before adding it to your own site.",
      steps: [
        "Install @chatbot/ui and @chatbot/core",
        "Configure a ChatbotConfig with your context and theme",
        "Add <ChatWidget config={...} /> to your app",
        "Point it at a server API route using @chatbot/providers",
      ],
      cta: { label: "Try Live Demo", href: "/ecommerce" },
    },
    expectations: [
      "Streams responses in real time, not a long wait for a full reply",
      "Stays within the topics and tone you configure",
      "Matches your brand's colors and shape out of the box",
      "Works with either Google Gemini or Perplexity Sonar",
    ],
    primaryCta: { label: "Try Live Demo", href: "/ecommerce" },
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
