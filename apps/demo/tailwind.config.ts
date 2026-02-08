import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chatbot: {
          primary: "var(--chatbot-primary)",
          "primary-hover": "var(--chatbot-primary-hover)",
          "primary-light": "var(--chatbot-primary-light)",
          secondary: "var(--chatbot-secondary)",
          background: "var(--chatbot-background)",
          surface: "var(--chatbot-surface)",
          "surface-hover": "var(--chatbot-surface-hover)",
          border: "var(--chatbot-border)",
          text: "var(--chatbot-text)",
          "text-secondary": "var(--chatbot-text-secondary)",
          "text-inverse": "var(--chatbot-text-inverse)",
          "user-bubble": "var(--chatbot-user-bubble)",
          "assistant-bubble": "var(--chatbot-assistant-bubble)",
          error: "var(--chatbot-error)",
          success: "var(--chatbot-success)",
        },
      },
      borderRadius: {
        chatbot: "var(--chatbot-radius)",
        "chatbot-lg": "var(--chatbot-radius-lg)",
      },
      fontSize: {
        "chatbot-sm": "var(--chatbot-font-size-sm)",
        "chatbot-base": "var(--chatbot-font-size-base)",
        "chatbot-lg": "var(--chatbot-font-size-lg)",
      },
      boxShadow: {
        chatbot: "var(--chatbot-shadow)",
        "chatbot-lg": "var(--chatbot-shadow-lg)",
      },
      animation: {
        "chatbot-fade-in": "chatbot-fade-in 0.2s ease-out",
        "chatbot-slide-up": "chatbot-slide-up 0.3s ease-out",
        "chatbot-bounce": "chatbot-bounce 1.4s infinite ease-in-out",
      },
      keyframes: {
        "chatbot-fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "chatbot-slide-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "chatbot-bounce": {
          "0%, 80%, 100%": { transform: "scale(0)" },
          "40%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
