"use client";

import React, { createContext, useContext, useMemo } from "react";
import type { ChatTheme } from "@chatbot/core";
import { defaultTheme } from "../theme/default-theme";
import { mergeTheme, themeToCSS } from "../theme/theme-utils";

interface ThemeContextValue {
  theme: ChatTheme;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: defaultTheme,
});

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}

interface ThemeProviderProps {
  theme?: Partial<ChatTheme>;
  children: React.ReactNode;
}

export function ThemeProvider({ theme: themeOverrides, children }: ThemeProviderProps) {
  const theme = useMemo(
    () => (themeOverrides ? mergeTheme(themeOverrides) : defaultTheme),
    [themeOverrides]
  );

  const cssVars = useMemo(() => themeToCSS(theme), [theme]);

  return (
    <ThemeContext.Provider value={{ theme }}>
      <div style={cssVars as React.CSSProperties} className="contents">{children}</div>
    </ThemeContext.Provider>
  );
}
