"use client";

import React from "react";
import { useChatContext } from "../../providers/ChatProvider";

interface QuickRepliesProps {
  replies: string[];
}

export function QuickReplies({ replies }: QuickRepliesProps) {
  const { sendMessage, isLoading } = useChatContext();

  if (!replies.length) return null;

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Quick replies">
      {replies.map((reply) => (
        <button
          key={reply}
          onClick={() => sendMessage(reply)}
          disabled={isLoading}
          className="rounded-full border border-chatbot-border bg-chatbot-surface px-3 py-1.5 text-chatbot-sm text-chatbot-text hover:bg-chatbot-surface-hover disabled:opacity-50 transition-colors"
        >
          {reply}
        </button>
      ))}
    </div>
  );
}
