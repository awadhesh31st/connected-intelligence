"use client";

import React from "react";
import type { ConversationSummary } from "@chatbot/core";

interface ChatHistoryProps {
  conversations: ConversationSummary[];
  activeId?: string;
  onSelect: (id: string) => void;
}

export function ChatHistory({ conversations, activeId, onSelect }: ChatHistoryProps) {
  if (!conversations.length) {
    return (
      <div className="p-4 text-center text-chatbot-sm text-chatbot-text-secondary">
        No conversations yet
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 p-2" role="list" aria-label="Chat history">
      {conversations.map((conv) => (
        <button
          key={conv.id}
          onClick={() => onSelect(conv.id)}
          className={`rounded-chatbot p-3 text-left transition-colors ${
            conv.id === activeId
              ? "bg-chatbot-primary-light text-chatbot-primary"
              : "hover:bg-chatbot-surface-hover text-chatbot-text"
          }`}
        >
          <div className="font-medium text-chatbot-sm truncate">{conv.title}</div>
          {conv.lastMessage && (
            <div className="mt-0.5 text-xs text-chatbot-text-secondary truncate">{conv.lastMessage}</div>
          )}
        </button>
      ))}
    </div>
  );
}
