export interface RetryConfig {
  maxRetries: number;
  initialDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
}

export interface ProviderConfig {
  providerId: string;
  modelId: string;
  apiKey?: string;
  options?: Record<string, unknown>;
  retry?: Partial<RetryConfig>;
}

export interface ProviderCapabilities {
  streaming: boolean;
  sources: boolean;
  images: boolean;
  toolCalls: boolean;
}

export interface ProviderInfo {
  id: string;
  name: string;
  description: string;
  capabilities: ProviderCapabilities;
  defaultModel: string;
  availableModels: string[];
}
