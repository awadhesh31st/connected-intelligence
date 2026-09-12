"use client";

import React from "react";
import type { UIMessage } from "ai";
import { UserMessage } from "./UserMessage";
import { AssistantMessage } from "./AssistantMessage";

interface MessageListProps {
  messages: UIMessage[];
}

function getTextFromMessage(message: UIMessage): string {
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

export function MessageList({ messages }: MessageListProps) {
  if (!messages.length) return null;

  return (
    <div className="flex flex-col gap-3" role="log" aria-label="Chat messages">
      {messages.map((message) => (
        <div key={message.id}>
          {message.role === "user" ? (
            <UserMessage content={getTextFromMessage(message)} />
          ) : message.role === "assistant" ? (
            <AssistantMessage content={getTextFromMessage(message)} />
          ) : null}
        </div>
      ))}
    </div>
  );
}
