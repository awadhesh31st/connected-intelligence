import type { ChatTheme } from "@chatbot/core";

export const defaultTheme: ChatTheme = {
  colors: {
    primary: "#2563eb",
    primaryHover: "#1d4ed8",
    primaryLight: "#dbeafe",
    secondary: "#64748b",
    background: "#ffffff",
    surface: "#f8fafc",
    surfaceHover: "#f1f5f9",
    border: "#e2e8f0",
    text: "#0f172a",
    textSecondary: "#64748b",
    textInverse: "#ffffff",
    userBubble: "#2563eb",
    assistantBubble: "#f1f5f9",
    error: "#ef4444",
    success: "#22c55e",
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
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 4px 6px -1px rgba(0,0,0,0.1)",
    lg: "0 10px 15px -3px rgba(0,0,0,0.1)",
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
