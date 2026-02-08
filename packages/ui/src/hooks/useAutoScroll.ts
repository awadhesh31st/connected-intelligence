"use client";

import { useEffect, useRef, useCallback } from "react";
import { scrollToBottom, isNearBottom } from "@chatbot/core";

export function useAutoScroll(dependencies: unknown[] = []) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldAutoScroll = useRef(true);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      shouldAutoScroll.current = isNearBottom(containerRef.current, 150);
    }
  }, []);

  // Scroll on dependency changes (new messages, loading state)
  useEffect(() => {
    if (containerRef.current && shouldAutoScroll.current) {
      scrollToBottom(containerRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  // Observe DOM mutations for streaming content updates
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new MutationObserver(() => {
      if (shouldAutoScroll.current) {
        scrollToBottom(container);
      }
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, []);

  const scrollToEnd = useCallback(() => {
    if (containerRef.current) {
      scrollToBottom(containerRef.current);
    }
  }, []);

  return { containerRef, handleScroll, scrollToEnd };
}
