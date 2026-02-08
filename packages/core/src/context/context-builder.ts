import type {
  PlatformContext,
  PlatformType,
  PlatformBehavior,
  PlatformKnowledge,
  PlatformUIHints,
  PlatformIdentity,
} from "../types/context";

export class ContextBuilder {
  private identity: PlatformIdentity = {
    name: "Assistant",
    type: "custom",
  };

  private behavior: PlatformBehavior = {
    tone: "friendly",
    responseStyle: "conversational",
  };

  private knowledge: PlatformKnowledge = {
    instructions: [],
  };

  private uiHints: PlatformUIHints = {
    welcomeMessage: "Hello! How can I help you today?",
  };

  setIdentity(name: string, type: PlatformType, description?: string): this {
    this.identity = { name, type, description };
    return this;
  }

  setLogo(logo: string): this {
    this.identity.logo = logo;
    return this;
  }

  setTone(tone: PlatformBehavior["tone"]): this {
    this.behavior.tone = tone;
    return this;
  }

  setResponseStyle(style: PlatformBehavior["responseStyle"]): this {
    this.behavior.responseStyle = style;
    return this;
  }

  setTopicBoundaries(topics: string[]): this {
    this.behavior.topicBoundaries = topics;
    return this;
  }

  setForbiddenTopics(topics: string[]): this {
    this.behavior.forbiddenTopics = topics;
    return this;
  }

  setFallbackMessage(message: string): this {
    this.behavior.fallbackMessage = message;
    return this;
  }

  addInstruction(instruction: string): this {
    this.knowledge.instructions.push(instruction);
    return this;
  }

  addInstructions(instructions: string[]): this {
    this.knowledge.instructions.push(...instructions);
    return this;
  }

  addFact(fact: string): this {
    if (!this.knowledge.facts) this.knowledge.facts = [];
    this.knowledge.facts.push(fact);
    return this;
  }

  addFAQ(question: string, answer: string): this {
    if (!this.knowledge.faqs) this.knowledge.faqs = [];
    this.knowledge.faqs.push({ question, answer });
    return this;
  }

  setDynamicData(data: Record<string, unknown>): this {
    this.knowledge.dynamicData = data;
    return this;
  }

  setWelcomeMessage(message: string): this {
    this.uiHints.welcomeMessage = message;
    return this;
  }

  setPlaceholder(placeholder: string): this {
    this.uiHints.placeholder = placeholder;
    return this;
  }

  setSuggestedPrompts(prompts: string[]): this {
    this.uiHints.suggestedPrompts = prompts;
    return this;
  }

  setQuickReplies(replies: string[]): this {
    this.uiHints.quickReplies = replies;
    return this;
  }

  build(): PlatformContext {
    return {
      identity: { ...this.identity },
      behavior: { ...this.behavior },
      knowledge: {
        ...this.knowledge,
        instructions: [...this.knowledge.instructions],
      },
      uiHints: { ...this.uiHints },
    };
  }
}
