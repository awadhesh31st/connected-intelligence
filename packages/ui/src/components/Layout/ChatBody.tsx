"use client";

import React from "react";
import { useChatContext } from "../../providers/ChatProvider";
import { useAutoScroll } from "../../hooks/useAutoScroll";
import { MessageList } from "../Message/MessageList";
import { LoadingIndicator } from "../Feedback/LoadingIndicator";
import { ErrorState } from "../Feedback/ErrorState";

export function ChatBody() {
  const { messages, isLoading, error, errorDismissed, regenerate, dismissError } = useChatContext();
  const { containerRef, handleScroll } = useAutoScroll([messages.length, isLoading]);

  const showError = error && !errorDismissed;

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 min-h-0 overflow-y-auto px-4 py-4"
    >
      <MessageList messages={messages} />
      {isLoading && <div className="mt-3"><LoadingIndicator /></div>}
      {showError && (
        <div className="mt-3">
          <ErrorState
            error={error}
            onRetry={() => regenerate()}
            onDismiss={dismissError}
          />
        </div>
      )}
    </div>
  );
}
