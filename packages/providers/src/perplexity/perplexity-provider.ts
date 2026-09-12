import { createPerplexity } from "@ai-sdk/perplexity";
import type { ProviderConfig, ProviderInfo } from "@chatbot/core/server";
import { ProviderError } from "@chatbot/core/server";
import { BaseProvider } from "../base/base-provider";
import type { LanguageModel } from "ai";

const PERPLEXITY_MODELS = [
  "sonar",
  "sonar-pro",
  "sonar-reasoning",
  "sonar-reasoning-pro",
];

export class PerplexityProvider extends BaseProvider {
  get info(): ProviderInfo {
    return {
      id: "perplexity",
      name: "Perplexity Sonar",
      description: "Perplexity's Sonar models with built-in web search",
      capabilities: {
        streaming: true,
        sources: true,
        images: false,
        toolCalls: false,
      },
      defaultModel: "sonar",
      availableModels: PERPLEXITY_MODELS,
    };
  }

  createModel(): LanguageModel {
    const modelId = this.getModelId();
    if (!this.validateModel(modelId)) {
      throw new ProviderError(
        `Invalid model "${modelId}" for Perplexity provider. Available: ${PERPLEXITY_MODELS.join(", ")}`,
        "perplexity"
      );
    }

    const perplexity = createPerplexity({
      apiKey: this.config.apiKey,
    });

    return perplexity(modelId) as LanguageModel;
  }
}

export function createPerplexityProvider(
  config: ProviderConfig
): PerplexityProvider {
  return new PerplexityProvider(config);
}
