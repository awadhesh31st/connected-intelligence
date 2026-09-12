import type { ChatTheme } from "@chatbot/core";

export const darkTheme: ChatTheme = {
  colors: {
    primary: "#818cf8",
    primaryHover: "#6366f1",
    primaryLight: "#1e1b4b",
    secondary: "#94a3b8",
    background: "#0f172a",
    surface: "#1e293b",
    surfaceHover: "#334155",
    border: "#334155",
    text: "#f1f5f9",
    textSecondary: "#94a3b8",
    textInverse: "#0f172a",
    userBubble: "#6366f1",
    assistantBubble: "#1e293b",
    error: "#f87171",
    success: "#4ade80",
  },
  typography: {
    fontFamily: "system-ui, -apple-system, sans-serif",
    fontSizeSm: "0.875rem",
    fontSizeBase: "1rem",
    fontSizeLg: "1.125rem",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
  borderRadius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "1rem",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px rgba(0,0,0,0.2)",
    md: "0 4px 6px -1px rgba(0,0,0,0.3)",
    lg: "0 10px 15px -3px rgba(0,0,0,0.4)",
  },
  animation: {
    duration: "200ms",
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  widget: {
    position: "bottom-right",
    size: 56,
    offset: 24,
  },
};
