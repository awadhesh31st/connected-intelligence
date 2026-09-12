export type PlatformType =
  | "ecommerce"
  | "portfolio"
  | "saas"
  | "support"
  | "custom";

export interface PlatformIdentity {
  name: string;
  type: PlatformType;
  description?: string;
  logo?: string;
}

export interface PlatformBehavior {
  tone: "formal" | "casual" | "friendly" | "professional";
  responseStyle: "concise" | "detailed" | "conversational";
  topicBoundaries?: string[];
  forbiddenTopics?: string[];
  fallbackMessage?: string;
}

export interface PlatformKnowledge {
  instructions: string[];
  facts?: string[];
  faqs?: Array<{ question: string; answer: string }>;
  dynamicData?: Record<string, unknown>;
}

export interface PlatformUIHints {
  welcomeMessage: string;
  placeholder?: string;
  suggestedPrompts?: string[];
  quickReplies?: string[];
}

export interface PlatformContext {
  identity: PlatformIdentity;
  behavior: PlatformBehavior;
  knowledge: PlatformKnowledge;
  uiHints: PlatformUIHints;
}
