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
      bio: portfolioOwner.summary,
      title: portfolioOwner.title,
      experience: portfolioOwner.experience,
      education: portfolioOwner.education,
      totalExperienceMonths: portfolioOwner.totalExperienceMonths,
      contact: {
        email: portfolioOwner.email,
        phone: portfolioOwner.phone,
        linkedin: portfolioOwner.linkedin,
        github: portfolioOwner.github,
      },
    })
  ),
};

export async function POST(request: Request) {
  try {
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

    if (!messages?.length) {
      return Response.json(
        { error: "No messages provided." },
        { status: 400 }
      );
    }

    const apiKey =
      providerId === "google"
        ? process.env.GOOGLE_GENERATIVE_AI_API_KEY
        : process.env.PERPLEXITY_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "The AI provider is not configured. Please check the API key." },
        { status: 503 }
      );
    }

    // Get context engine
    const contextEngine = contexts[contextType] ?? contexts.ecommerce;
    const systemPrompt = contextEngine.buildSystemPrompt();

    // Create model from provider registry
    const model = registry.createModel({
      providerId,
      modelId,
      apiKey,
    });

    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model,
      system: systemPrompt,
      messages: modelMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred.";

    // Map known error patterns to appropriate status codes
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes("rate limit") || lowerMsg.includes("quota")) {
      return Response.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }
    if (
      lowerMsg.includes("api key") ||
      lowerMsg.includes("unauthorized") ||
      lowerMsg.includes("authentication")
    ) {
      return Response.json(
        { error: "Authentication failed. Please check the API configuration." },
        { status: 401 }
      );
    }
    if (lowerMsg.includes("not found") || lowerMsg.includes("invalid model")) {
      return Response.json(
        { error: `Model or provider not found: ${message}` },
        { status: 404 }
      );
    }

    console.error("[chat/route] Unhandled error:", err);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
