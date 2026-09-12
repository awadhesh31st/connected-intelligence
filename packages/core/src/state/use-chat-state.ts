"use client";

import { useCallback, useMemo, useRef } from "react";
import type { ChatbotConfig } from "../types/config";
import type { ChatMessage } from "../types/message";
import { ContextEngine } from "../context/context-engine";
import { generateConversationId } from "../utils/id";

export interface UseChatStateOptions {
  config: ChatbotConfig;
  conversationId?: string;
}

export interface ChatState {
  conversationId: string;
  contextEngine: ContextEngine;
  systemPrompt: string;
  apiEndpoint: string;
  requestBody: Record<string, unknown>;
  onMessageSend: (message: string) => void;
  onMessageReceive: (message: ChatMessage) => void;
}

export function useChatState(options: UseChatStateOptions): ChatState {
  const { config, conversationId: externalConvId } = options;
  const conversationIdRef = useRef(externalConvId ?? generateConversationId());

  const contextEngine = useMemo(
    () => new ContextEngine(config.context),
    [config.context]
  );

  const systemPrompt = useMemo(
    () => contextEngine.buildSystemPrompt(),
    [contextEngine]
  );

  const apiEndpoint = config.apiEndpoint ?? "/api/chat";

  const requestBody = useMemo(
    () => ({
      providerId: config.provider.providerId,
      modelId: config.provider.modelId,
      conversationId: conversationIdRef.current,
      contextType: config.context.identity.type,
    }),
    [config.provider.providerId, config.provider.modelId, config.context.identity.type]
  );

  const onMessageSend = useCallback(
    (message: string) => {
      config.hooks?.onMessageSend?.(message);
    },
    [config.hooks]
  );

  const onMessageReceive = useCallback(
    (message: ChatMessage) => {
      config.hooks?.onMessageReceive?.(message);
    },
    [config.hooks]
  );

  return {
    conversationId: conversationIdRef.current,
    contextEngine,
    systemPrompt,
    apiEndpoint,
    requestBody,
    onMessageSend,
    onMessageReceive,
  };
}
