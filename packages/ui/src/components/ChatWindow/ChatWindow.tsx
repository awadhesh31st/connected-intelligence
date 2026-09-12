"use client";

import React from "react";
import type { ChatbotConfig } from "@chatbot/core";
import { ChatProvider, useChatContext } from "../../providers/ChatProvider";
import { ChatHeader } from "../Layout/ChatHeader";
import { ChatBody } from "../Layout/ChatBody";
import { ChatFooter } from "../Layout/ChatFooter";
import { WelcomeScreen } from "../Layout/WelcomeScreen";

interface ChatWindowInnerProps {
  onClose?: () => void;
}

function ChatWindowInner({ onClose }: ChatWindowInnerProps) {
  const { messages, config } = useChatContext();
  const { identity } = config.context;
  const { uiHints } = config.context;

  return (
    <div className="flex h-full min-h-0 flex-col bg-chatbot-background">
      <ChatHeader
        title={identity.name}
        subtitle={identity.description}
        onClose={onClose}
      />
      {messages.length === 0 ? (
        <>
          <WelcomeScreen
            title={uiHints.welcomeMessage}
            suggestions={uiHints.suggestedPrompts}
          />
          <ChatFooter placeholder={uiHints.placeholder} />
        </>
      ) : (
        <>
          <ChatBody />
          <ChatFooter placeholder={uiHints.placeholder} />
        </>
      )}
    </div>
  );
}

interface ChatWindowProps {
  config: ChatbotConfig;
  onClose?: () => void;
  className?: string;
}

export function ChatWindow({ config, onClose, className }: ChatWindowProps) {
  return (
    <ChatProvider config={config}>
      <div className={`${className ?? ""} flex flex-col`}>
        <ChatWindowInner onClose={onClose} />
      </div>
    </ChatProvider>
  );
}
