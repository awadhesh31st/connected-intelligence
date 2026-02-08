import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { ProviderConfig, ProviderInfo } from "@chatbot/core/server";
import { ProviderError } from "@chatbot/core/server";
import { BaseProvider } from "../base/base-provider";
import type { LanguageModel } from "ai";

const GOOGLE_MODELS = [
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite",
  "gemini-1.5-flash",
  "gemini-1.5-pro",
];

export class GoogleProvider extends BaseProvider {
  get info(): ProviderInfo {
    return {
      id: "google",
      name: "Google Gemini",
      description: "Google's Gemini models via Google Generative AI",
      capabilities: {
        streaming: true,
        sources: false,
        images: true,
        toolCalls: true,
      },
      defaultModel: "gemini-2.0-flash",
      availableModels: GOOGLE_MODELS,
    };
  }

  createModel(): LanguageModel {
    const modelId = this.getModelId();
    if (!this.validateModel(modelId)) {
      throw new ProviderError(
        `Invalid model "${modelId}" for Google provider. Available: ${GOOGLE_MODELS.join(", ")}`,
        "google"
      );
    }

    const google = createGoogleGenerativeAI({
      apiKey: this.config.apiKey,
    });

    return google(modelId) as LanguageModel;
  }
}

export function createGoogleProvider(config: ProviderConfig): GoogleProvider {
  return new GoogleProvider(config);
}
