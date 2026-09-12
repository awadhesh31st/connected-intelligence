"use client";

import React from "react";
import type { ChatbotConfig } from "@chatbot/core";
import { ChatWindow } from "../ChatWindow/ChatWindow";
import { useResponsive } from "../../hooks/useResponsive";

interface ChatWidgetPanelProps {
  config: ChatbotConfig;
  isOpen: boolean;
  onClose: () => void;
}

export function ChatWidgetPanel({ config, isOpen, onClose }: ChatWidgetPanelProps) {
  const { isMobile } = useResponsive();

  if (!isOpen) return null;

  if (isMobile) {
    // Bottom sheet on mobile
    return (
      <div className="fixed inset-0 z-50 flex flex-col" role="dialog" aria-label="Chat">
        <div className="flex-shrink-0 bg-black/30" onClick={onClose} />
        <div className="flex-1 min-h-0 bg-chatbot-background rounded-t-2xl shadow-chatbot-lg animate-chatbot-slide-up overflow-hidden">
          <ChatWindow config={config} onClose={onClose} className="h-full" />
        </div>
      </div>
    );
  }

  // Popup on desktop
  return (
    <div
      className="mb-4 h-[600px] w-[400px] overflow-hidden rounded-chatbot-lg border border-chatbot-border shadow-chatbot-lg animate-chatbot-slide-up"
      role="dialog"
      aria-label="Chat"
    >
      <ChatWindow config={config} onClose={onClose} className="h-full" />
    </div>
  );
}
