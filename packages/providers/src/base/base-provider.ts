import type { ProviderConfig, ProviderInfo, RetryConfig } from "@chatbot/core/server";
import { DEFAULT_RETRY_CONFIG } from "@chatbot/core/server";
import type { LanguageModel } from "ai";

export abstract class BaseProvider {
  protected config: ProviderConfig;
  protected retryConfig: RetryConfig;

  constructor(config: ProviderConfig) {
    this.config = config;
    this.retryConfig = {
      ...DEFAULT_RETRY_CONFIG,
      ...config.retry,
    };
  }

  abstract get info(): ProviderInfo;
  abstract createModel(): LanguageModel;

  validateModel(modelId: string): boolean {
    return this.info.availableModels.includes(modelId);
  }

  getModelId(): string {
    return this.config.modelId || this.info.defaultModel;
  }

  getConfig(): ProviderConfig {
    return this.config;
  }
}
