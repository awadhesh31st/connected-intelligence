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
        "landing-float": "landing-float 6s ease-in-out infinite",
        "landing-pulse-glow": "landing-pulse-glow 4s ease-in-out infinite",
        "landing-gradient-spin": "landing-gradient-spin 8s linear infinite",
        "landing-fade-in-up": "landing-fade-in-up 0.6s ease-out forwards",
        "landing-typing-cursor": "landing-typing-cursor 1s ease-in-out infinite",
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
        "landing-float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "landing-pulse-glow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "landing-gradient-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "landing-fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "landing-typing-cursor": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
