"use client";

import React from "react";
import type { ChatbotConfig } from "@chatbot/core";
import { ThemeProvider } from "../../providers/ThemeProvider";
import { useChatWidget } from "../../hooks/useChatWidget";
import { ChatWidgetTrigger } from "./ChatWidgetTrigger";
import { ChatWidgetPanel } from "./ChatWidgetPanel";

interface ChatWidgetProps {
  config: ChatbotConfig;
  defaultOpen?: boolean;
}

export function ChatWidget({ config, defaultOpen = false }: ChatWidgetProps) {
  const { isOpen, toggle, close } = useChatWidget(defaultOpen);

  const position = config.theme?.widget?.position ?? "bottom-right";
  const offset = config.theme?.widget?.offset ?? 24;

  const positionStyles: React.CSSProperties = {
    position: "fixed",
    zIndex: 50,
    ...(position.includes("bottom") && { bottom: offset }),
    ...(position.includes("top") && { top: offset }),
    ...(position.includes("right") && { right: offset }),
    ...(position.includes("left") && { left: offset }),
  };

  return (
    <ThemeProvider theme={config.theme}>
      <div style={positionStyles} className="flex flex-col items-end">
        <ChatWidgetPanel config={config} isOpen={isOpen} onClose={close} />
        <ChatWidgetTrigger onClick={toggle} isOpen={isOpen} />
      </div>
    </ThemeProvider>
  );
}
