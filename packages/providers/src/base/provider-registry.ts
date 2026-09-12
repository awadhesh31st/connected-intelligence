import type { ProviderConfig } from "@chatbot/core/server";
import { ProviderError } from "@chatbot/core/server";
import { BaseProvider } from "./base-provider";
import type { LanguageModel } from "ai";

type ProviderFactory = (config: ProviderConfig) => BaseProvider;

export class ProviderRegistry {
  private static instance: ProviderRegistry;
  private providers: Map<string, ProviderFactory> = new Map();

  private constructor() {}

  static getInstance(): ProviderRegistry {
    if (!ProviderRegistry.instance) {
      ProviderRegistry.instance = new ProviderRegistry();
    }
    return ProviderRegistry.instance;
  }

  register(id: string, factory: ProviderFactory): void {
    this.providers.set(id, factory);
  }

  get(id: string, config: ProviderConfig): BaseProvider {
    const factory = this.providers.get(id);
    if (!factory) {
      throw new ProviderError(`Provider "${id}" not found`, id);
    }
    return factory(config);
  }

  createModel(config: ProviderConfig): LanguageModel {
    const provider = this.get(config.providerId, config);
    return provider.createModel();
  }

  has(id: string): boolean {
    return this.providers.has(id);
  }

  getRegisteredIds(): string[] {
    return Array.from(this.providers.keys());
  }
}
