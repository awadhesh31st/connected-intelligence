import type { PlatformContext } from "../types/context";

export class ContextEngine {
  private context: PlatformContext;
  private dynamicDataCache: Map<string, unknown> = new Map();

  constructor(context: PlatformContext) {
    this.context = context;
  }

  getContext(): PlatformContext {
    return this.context;
  }

  updateDynamicData(key: string, value: unknown): void {
    this.dynamicDataCache.set(key, value);
  }

  getDynamicData<T>(key: string): T | undefined {
    return this.dynamicDataCache.get(key) as T | undefined;
  }

  buildSystemPrompt(): string {
    const { identity, behavior, knowledge } = this.context;
    const sections: string[] = [];

    // Identity
    sections.push(
      `You are ${identity.name}, a ${identity.type} assistant.${identity.description ? ` ${identity.description}` : ""}`
    );

    // Behavior
    sections.push(
      `Communication style: ${behavior.tone}, ${behavior.responseStyle} responses.`
    );

    if (behavior.topicBoundaries?.length) {
      sections.push(
        `Stay focused on these topics: ${behavior.topicBoundaries.join(", ")}.`
      );
    }

    if (behavior.forbiddenTopics?.length) {
      sections.push(
        `Never discuss: ${behavior.forbiddenTopics.join(", ")}.`
      );
    }

    if (behavior.fallbackMessage) {
      sections.push(
        `If asked about off-topic subjects, respond with: "${behavior.fallbackMessage}"`
      );
    }

    // Knowledge
    if (knowledge.instructions.length) {
      sections.push("Instructions:\n" + knowledge.instructions.map((i) => `- ${i}`).join("\n"));
    }

    if (knowledge.facts?.length) {
      sections.push("Key facts:\n" + knowledge.facts.map((f) => `- ${f}`).join("\n"));
    }

    if (knowledge.faqs?.length) {
      sections.push(
        "FAQs:\n" +
          knowledge.faqs.map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`).join("\n\n")
      );
    }

    // Dynamic data from cache
    if (this.dynamicDataCache.size > 0) {
      const dynamicEntries: string[] = [];
      this.dynamicDataCache.forEach((value, key) => {
        dynamicEntries.push(`${key}: ${JSON.stringify(value)}`);
      });
      sections.push("Current data:\n" + dynamicEntries.join("\n"));
    }

    // Static dynamic data from context
    if (knowledge.dynamicData && Object.keys(knowledge.dynamicData).length > 0) {
      sections.push(
        "Available data:\n" + JSON.stringify(knowledge.dynamicData, null, 2)
      );
    }

    return sections.join("\n\n");
  }

  getWelcomeMessage(): string {
    return this.context.uiHints.welcomeMessage;
  }

  getSuggestedPrompts(): string[] {
    return this.context.uiHints.suggestedPrompts ?? [];
  }

  getQuickReplies(): string[] {
    return this.context.uiHints.quickReplies ?? [];
  }

  getPlaceholder(): string {
    return this.context.uiHints.placeholder ?? "Type a message...";
  }
}
