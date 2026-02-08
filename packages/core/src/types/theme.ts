export interface ChatThemeColors {
  primary: string;
  primaryHover: string;
  primaryLight: string;
  secondary: string;
  background: string;
  surface: string;
  surfaceHover: string;
  border: string;
  text: string;
  textSecondary: string;
  textInverse: string;
  userBubble: string;
  assistantBubble: string;
  error: string;
  success: string;
}

export interface ChatThemeTypography {
  fontFamily: string;
  fontSizeSm: string;
  fontSizeBase: string;
  fontSizeLg: string;
}

export interface ChatThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ChatThemeBorderRadius {
  sm: string;
  md: string;
  lg: string;
  full: string;
}

export interface ChatThemeShadows {
  sm: string;
  md: string;
  lg: string;
}

export interface ChatThemeAnimation {
  duration: string;
  easing: string;
}

export interface ChatThemeWidget {
  position: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  size: number;
  offset: number;
}

export interface ChatTheme {
  colors: ChatThemeColors;
  typography: ChatThemeTypography;
  spacing: ChatThemeSpacing;
  borderRadius: ChatThemeBorderRadius;
  shadows: ChatThemeShadows;
  animation: ChatThemeAnimation;
  widget: ChatThemeWidget;
}
