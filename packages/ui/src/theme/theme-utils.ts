import type { ChatTheme } from "@chatbot/core";
import { defaultTheme } from "./default-theme";

export function mergeTheme(partial: Partial<ChatTheme>): ChatTheme {
  return {
    colors: { ...defaultTheme.colors, ...partial.colors },
    typography: { ...defaultTheme.typography, ...partial.typography },
    spacing: { ...defaultTheme.spacing, ...partial.spacing },
    borderRadius: { ...defaultTheme.borderRadius, ...partial.borderRadius },
    shadows: { ...defaultTheme.shadows, ...partial.shadows },
    animation: { ...defaultTheme.animation, ...partial.animation },
    widget: { ...defaultTheme.widget, ...partial.widget },
  };
}

export function createTheme(overrides: Partial<ChatTheme>): ChatTheme {
  return mergeTheme(overrides);
}

export function themeToCSS(theme: ChatTheme): Record<string, string> {
  return {
    "--chatbot-primary": theme.colors.primary,
    "--chatbot-primary-hover": theme.colors.primaryHover,
    "--chatbot-primary-light": theme.colors.primaryLight,
    "--chatbot-secondary": theme.colors.secondary,
    "--chatbot-background": theme.colors.background,
    "--chatbot-surface": theme.colors.surface,
    "--chatbot-surface-hover": theme.colors.surfaceHover,
    "--chatbot-border": theme.colors.border,
    "--chatbot-text": theme.colors.text,
    "--chatbot-text-secondary": theme.colors.textSecondary,
    "--chatbot-text-inverse": theme.colors.textInverse,
    "--chatbot-user-bubble": theme.colors.userBubble,
    "--chatbot-assistant-bubble": theme.colors.assistantBubble,
    "--chatbot-error": theme.colors.error,
    "--chatbot-success": theme.colors.success,
    "--chatbot-font-family": theme.typography.fontFamily,
    "--chatbot-font-size-sm": theme.typography.fontSizeSm,
    "--chatbot-font-size-base": theme.typography.fontSizeBase,
    "--chatbot-font-size-lg": theme.typography.fontSizeLg,
    "--chatbot-radius": theme.borderRadius.md,
    "--chatbot-radius-lg": theme.borderRadius.lg,
    "--chatbot-shadow": theme.shadows.md,
    "--chatbot-shadow-lg": theme.shadows.lg,
    "--chatbot-animation-duration": theme.animation.duration,
    "--chatbot-animation-easing": theme.animation.easing,
  };
}
