"use client";

import React from "react";

interface SourceCardProps {
  source: {
    title: string;
    url: string;
    snippet?: string;
    favicon?: string;
  };
}

export function SourceCard({ source }: SourceCardProps) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-2 rounded-chatbot border border-chatbot-border bg-chatbot-surface p-2.5 hover:bg-chatbot-surface-hover transition-colors animate-chatbot-slide-up"
    >
      {source.favicon && (
        <img src={source.favicon} alt="" className="mt-0.5 h-4 w-4 shrink-0 rounded-sm" />
      )}
      <div className="flex flex-col gap-0.5 overflow-hidden">
        <span className="truncate text-chatbot-sm font-medium text-chatbot-primary">{source.title}</span>
        {source.snippet && (
          <span className="line-clamp-2 text-xs text-chatbot-text-secondary">{source.snippet}</span>
        )}
        <span className="truncate text-xs text-chatbot-text-secondary">{source.url}</span>
      </div>
    </a>
  );
}
