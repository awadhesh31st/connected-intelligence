"use client";

import React from "react";

interface ChatHeaderProps {
  title: string;
  subtitle?: string;
  onClose?: () => void;
}

export function ChatHeader({ title, subtitle, onClose }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-chatbot-border bg-chatbot-surface px-4 py-3">
      <div>
        <h3 className="font-semibold text-chatbot-base text-chatbot-text">{title}</h3>
        {subtitle && (
          <p className="text-xs text-chatbot-text-secondary">{subtitle}</p>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full text-chatbot-text-secondary hover:bg-chatbot-surface-hover transition-colors"
          aria-label="Close chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
}
