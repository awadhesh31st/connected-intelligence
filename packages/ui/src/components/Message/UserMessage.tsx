"use client";

import React from "react";
import { MessageBubble } from "./MessageBubble";

interface UserMessageProps {
  content: string;
}

export function UserMessage({ content }: UserMessageProps) {
  return (
    <MessageBubble role="user">
      <p className="whitespace-pre-wrap text-chatbot-base">{content}</p>
    </MessageBubble>
  );
}
