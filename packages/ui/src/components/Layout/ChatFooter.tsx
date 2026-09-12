"use client";

import React from "react";
import { ChatInput } from "../Input/ChatInput";

interface ChatFooterProps {
  placeholder?: string;
}

export function ChatFooter({ placeholder }: ChatFooterProps) {
  return (
    <div className="border-t border-chatbot-border bg-chatbot-background px-4 py-3">
      <ChatInput placeholder={placeholder} />
    </div>
  );
}
