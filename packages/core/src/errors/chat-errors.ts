export class ChatError extends Error {
  public readonly code: string;
  public readonly retryable: boolean;

  constructor(message: string, code: string, retryable = false) {
    super(message);
    this.name = "ChatError";
    this.code = code;
    this.retryable = retryable;
  }
}

export class ProviderError extends ChatError {
  public readonly providerId: string;

  constructor(message: string, providerId: string, retryable = false) {
    super(message, "PROVIDER_ERROR", retryable);
    this.name = "ProviderError";
    this.providerId = providerId;
  }
}

export class RateLimitError extends ChatError {
  public readonly retryAfter?: number;

  constructor(message: string, retryAfter?: number) {
    super(message, "RATE_LIMIT", true);
    this.name = "RateLimitError";
    this.retryAfter = retryAfter;
  }
}

export class AuthenticationError extends ChatError {
  constructor(message = "Invalid API key or authentication failed") {
    super(message, "AUTH_ERROR", false);
    this.name = "AuthenticationError";
  }
}

export class NetworkError extends ChatError {
  constructor(message = "Network request failed") {
    super(message, "NETWORK_ERROR", true);
    this.name = "NetworkError";
  }
}

export class ContextError extends ChatError {
  constructor(message: string) {
    super(message, "CONTEXT_ERROR", false);
    this.name = "ContextError";
  }
}
