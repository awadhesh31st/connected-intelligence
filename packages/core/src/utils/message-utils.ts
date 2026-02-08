import type { ChatMessage, MessagePart, TextPart } from "../types/message";

export function extractTextContent(message: ChatMessage): string {
  if (message.parts?.length) {
    return message.parts
      .filter((part): part is TextPart => part.type === "text")
      .map((part) => part.content)
      .join("\n");
  }
  return message.content;
}

export function getMessagePreview(
  message: ChatMessage,
  maxLength = 100
): string {
  const text = extractTextContent(message);
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

export function hasStructuredContent(message: ChatMessage): boolean {
  return (
    message.parts?.some(
      (part) =>
        part.type === "product-card" ||
        part.type === "project-card" ||
        part.type === "source-card" ||
        part.type === "image-card"
    ) ?? false
  );
}

export function getPartsByType<T extends MessagePart>(
  message: ChatMessage,
  type: T["type"]
): T[] {
  return (message.parts?.filter((part) => part.type === type) ?? []) as T[];
}

export function createTextMessage(
  role: ChatMessage["role"],
  content: string,
  id?: string
): ChatMessage {
  return {
    id: id ?? generateMessageId(),
    role,
    content,
    parts: [{ type: "text", content }],
    createdAt: new Date(),
  };
}

function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}
