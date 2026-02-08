"use client";

import React from "react";
import { useChatContext } from "../../providers/ChatProvider";

interface SuggestionPromptsProps {
  prompts: string[];
}

export function SuggestionPrompts({ prompts }: SuggestionPromptsProps) {
  const { sendMessage, isLoading } = useChatContext();

  if (!prompts.length) return null;

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2" role="group" aria-label="Suggested prompts">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          onClick={() => sendMessage(prompt)}
          disabled={isLoading}
          className="rounded-chatbot border border-chatbot-border bg-chatbot-surface p-3 text-left text-chatbot-sm text-chatbot-text hover:bg-chatbot-surface-hover disabled:opacity-50 transition-colors"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
