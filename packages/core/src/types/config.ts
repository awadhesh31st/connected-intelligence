import type { PlatformContext } from "./context";
import type { ProviderConfig } from "./provider";
import type { ChatTheme } from "./theme";
import type { ChatMessage } from "./message";

export interface ChatbotFeatures {
  streaming: boolean;
  suggestions: boolean;
  quickReplies: boolean;
  messageHistory: boolean;
  feedback: boolean;
}

export interface ChatbotHooks {
  onMessageSend?: (message: string) => void;
  onMessageReceive?: (message: ChatMessage) => void;
  onError?: (error: Error) => void;
  onStreamStart?: () => void;
  onStreamEnd?: () => void;
}

export interface ChatbotConfig {
  context: PlatformContext;
  provider: ProviderConfig;
  theme?: Partial<ChatTheme>;
  features?: Partial<ChatbotFeatures>;
  hooks?: ChatbotHooks;
  apiEndpoint?: string;
  maxMessages?: number;
}
