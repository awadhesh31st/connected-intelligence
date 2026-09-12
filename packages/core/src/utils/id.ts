export function generateId(prefix = "id"): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function generateConversationId(): string {
  return generateId("conv");
}

export function generateMessageId(): string {
  return generateId("msg");
}
