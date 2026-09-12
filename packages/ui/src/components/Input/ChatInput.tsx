"use client";

import React, { useRef, useEffect } from "react";
import { useChatContext } from "../../providers/ChatProvider";

interface ChatInputProps {
  placeholder?: string;
  disabled?: boolean;
}

export function ChatInput({ placeholder, disabled }: ChatInputProps) {
  const { input, setInput, sendMessage, isLoading } = useChatContext();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        sendMessage(input);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder ?? "Type a message..."}
        disabled={disabled || isLoading}
        rows={1}
        className="flex-1 resize-none rounded-chatbot border border-chatbot-border bg-chatbot-background px-3 py-2 text-chatbot-base text-chatbot-text placeholder:text-chatbot-text-secondary focus:outline-none focus:ring-2 focus:ring-chatbot-primary disabled:opacity-50"
        aria-label="Chat message input"
      />
      <button
        type="submit"
        disabled={!input.trim() || isLoading || disabled}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-chatbot bg-chatbot-primary text-chatbot-text-inverse hover:bg-chatbot-primary-hover disabled:opacity-50 transition-colors"
        aria-label="Send message"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
      </button>
    </form>
  );
}
