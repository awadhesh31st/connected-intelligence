export const chatQueryKeys = {
  all: ["chat"] as const,
  conversations: () => [...chatQueryKeys.all, "conversations"] as const,
  conversation: (id: string) =>
    [...chatQueryKeys.conversations(), id] as const,
  messages: (conversationId: string) =>
    [...chatQueryKeys.conversation(conversationId), "messages"] as const,
  suggestions: (contextType: string) =>
    [...chatQueryKeys.all, "suggestions", contextType] as const,
};
