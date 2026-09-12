"use client";

import React from "react";

interface StreamingTextProps {
  content: string;
}

export function StreamingText({ content }: StreamingTextProps) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] rounded-chatbot-lg bg-chatbot-assistant-bubble px-4 py-2.5 text-chatbot-text">
        <div className="whitespace-pre-wrap text-chatbot-base">
          {content}
          <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-chatbot-text-secondary" />
        </div>
      </div>
    </div>
  );
}
