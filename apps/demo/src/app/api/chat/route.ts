import { streamText, convertToModelMessages, type UIMessage } from "ai";
import {
  ProviderRegistry,
  createGoogleProvider,
  createPerplexityProvider,
} from "@chatbot/providers";
import { ContextEngine, createEcommerceContext, createPortfolioContext } from "@chatbot/core/server";
import { products, projects, portfolioOwner } from "@/lib/demo-data";

// Register providers
const registry = ProviderRegistry.getInstance();
if (!registry.has("google")) {
  registry.register("google", createGoogleProvider);
}
if (!registry.has("perplexity")) {
  registry.register("perplexity", createPerplexityProvider);
}

// Pre-build context engines
const contexts: Record<string, ContextEngine> = {
  ecommerce: new ContextEngine(createEcommerceContext("TechStore", { products })),
  portfolio: new ContextEngine(
    createPortfolioContext(portfolioOwner.name, {
      projects,
      skills: portfolioOwner.skills,
      bio: portfolioOwner.bio,
    })
  ),
};

export async function POST(request: Request) {
  const body = await request.json();
  const {
    messages,
    providerId = "google",
    modelId = "gemini-2.0-flash",
    contextType = "ecommerce",
  } = body as {
    messages: UIMessage[];
    providerId?: string;
    modelId?: string;
    contextType?: string;
  };

  // Get context engine
  const contextEngine = contexts[contextType] ?? contexts.ecommerce;
  const systemPrompt = contextEngine.buildSystemPrompt();

  // Create model from provider registry
  const model = registry.createModel({
    providerId,
    modelId,
    apiKey:
      providerId === "google"
        ? process.env.GOOGLE_GENERATIVE_AI_API_KEY
        : process.env.PERPLEXITY_API_KEY,
  });

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model,
    system: systemPrompt,
    messages: modelMessages,
  });

  return result.toUIMessageStreamResponse();
}
