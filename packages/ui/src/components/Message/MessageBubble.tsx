"use client";

import React from "react";

interface MessageBubbleProps {
  role: "user" | "assistant";
  children: React.ReactNode;
}

export function MessageBubble({ role, children }: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} animate-chatbot-fade-in`}
    >
      <div
        className={`max-w-[85%] rounded-chatbot-lg px-4 py-2.5 ${
          isUser
            ? "bg-chatbot-user-bubble text-chatbot-text-inverse"
            : "bg-chatbot-assistant-bubble text-chatbot-text"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
