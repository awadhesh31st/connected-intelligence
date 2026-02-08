"use client";

import React, { createContext, useContext, useMemo, useState, useCallback } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import type { UIMessage } from "ai";
import type { ChatbotConfig } from "@chatbot/core";
import { useChatState } from "@chatbot/core";
import { ThemeProvider } from "./ThemeProvider";

type ChatStatus = "ready" | "submitted" | "streaming" | "error";

interface ChatContextValue {
  messages: UIMessage[];
  input: string;
  status: ChatStatus;
  isLoading: boolean;
  error: Error | undefined;
  setInput: (input: string) => void;
  sendMessage: (text: string) => void;
  regenerate: () => void;
  stop: () => void;
  config: ChatbotConfig;
  systemPrompt: string;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function useChatContext(): ChatContextValue {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
}

interface ChatProviderProps {
  config: ChatbotConfig;
  children: React.ReactNode;
}

export function ChatProvider({ config, children }: ChatProviderProps) {
  const chatState = useChatState({ config });
  const [input, setInput] = useState("");

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: chatState.apiEndpoint,
        body: chatState.requestBody,
      }),
    [chatState.apiEndpoint, chatState.requestBody]
  );

  const chat = useChat({
    transport,
    onFinish: ({ message }) => {
      const textContent = message.parts
        .filter((p): p is { type: "text"; text: string } => p.type === "text")
        .map((p) => p.text)
        .join("");
      chatState.onMessageReceive({
        id: message.id,
        role: "assistant",
        content: textContent,
      });
    },
    onError: (error) => {
      config.hooks?.onError?.(error);
    },
  });

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      config.hooks?.onMessageSend?.(text);
      chat.sendMessage({ text });
      setInput("");
    },
    [chat, config.hooks]
  );

  const isLoading = chat.status === "submitted" || chat.status === "streaming";

  const value = useMemo<ChatContextValue>(
    () => ({
      messages: chat.messages,
      input,
      status: chat.status as ChatStatus,
      isLoading,
      error: chat.error,
      setInput,
      sendMessage,
      regenerate: () => chat.regenerate(),
      stop: () => chat.stop(),
      config,
      systemPrompt: chatState.systemPrompt,
    }),
    [chat.messages, chat.status, chat.error, input, isLoading, sendMessage, chat, config, chatState.systemPrompt]
  );

  return (
    <ThemeProvider theme={config.theme}>
      <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    </ThemeProvider>
  );
}
