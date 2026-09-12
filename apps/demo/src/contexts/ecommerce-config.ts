import type { ChatbotConfig } from "@chatbot/core";
import { createEcommerceContext } from "@chatbot/core";
import { products } from "../lib/demo-data";

export const ecommerceConfig: ChatbotConfig = {
  context: createEcommerceContext("TechStore", { products }),
  provider: {
    providerId: "google",
    modelId: "gemini-2.0-flash",
  },
  theme: {
    colors: {
      primary: "#d97706",
      primaryHover: "#b45309",
      primaryLight: "#fef3c7",
      secondary: "#78716c",
      background: "#ffffff",
      surface: "#fffbeb",
      surfaceHover: "#fef3c7",
      border: "#fde68a",
      text: "#1c1917",
      textSecondary: "#78716c",
      textInverse: "#ffffff",
      userBubble: "#d97706",
      assistantBubble: "#fffbeb",
      error: "#ef4444",
      success: "#22c55e",
    },
  },
  features: {
    streaming: true,
    suggestions: true,
    quickReplies: true,
    messageHistory: false,
    feedback: false,
  },
  apiEndpoint: "/api/chat",
};
