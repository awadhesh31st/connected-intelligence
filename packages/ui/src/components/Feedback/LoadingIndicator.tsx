"use client";

import React from "react";

export function LoadingIndicator() {
  return (
    <div className="flex justify-start animate-chatbot-fade-in">
      <div className="flex items-center gap-1 rounded-chatbot-lg bg-chatbot-assistant-bubble px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-chatbot-text-secondary animate-chatbot-bounce" style={{ animationDelay: "0s" }} />
        <span className="h-2 w-2 rounded-full bg-chatbot-text-secondary animate-chatbot-bounce" style={{ animationDelay: "0.16s" }} />
        <span className="h-2 w-2 rounded-full bg-chatbot-text-secondary animate-chatbot-bounce" style={{ animationDelay: "0.32s" }} />
      </div>
    </div>
  );
}
