import { generateObject } from "ai";
import { z } from "zod";
import { ProviderRegistry, createGoogleProvider } from "@chatbot/providers";
import {
  ContextEngine,
  createPageQAContext,
  type PageChunk,
  type PageQARequest,
} from "@chatbot/core/server";

// Register the Google provider once per module load.
const registry = ProviderRegistry.getInstance();
if (!registry.has("google")) {
  registry.register("google", createGoogleProvider);
}

// Pre-build the page-QA context engine (identity/behavior/instructions are static;
// the page content is supplied per-request via the prompt).
const pageQAEngine = new ContextEngine(createPageQAContext());

// Structured output schema. Mirrors PageQAResult in @chatbot/core.
const pageQASchema = z.object({
  found: z
    .boolean()
    .describe("Whether the answer could be found in the provided page content."),
  answer: z
    .string()
    .describe("The natural-language answer to the user's question."),
  citations: z
    .array(
      z.object({
        chunkId: z
          .string()
          .describe("The id of the page chunk the answer was drawn from."),
        quote: z
          .string()
          .describe(
            "A short, EXACT verbatim quote copied from the chunk text that supports the answer."
          ),
      })
    )
    .describe("Citations pointing back at the source chunks."),
});

// Guard rails to keep prompts within a reasonable size.
const MAX_CHUNKS = 400;
const MAX_CHUNK_CHARS = 1200;

// Permissive CORS so the request works from any extension fetch context.
// This endpoint carries no cookies/credentials; the API key stays server-side.
const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(body: unknown, status = 200): Response {
  return Response.json(body, { status, headers: CORS_HEADERS });
}

export function OPTIONS(): Response {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

function formatChunks(chunks: PageChunk[]): string {
  return chunks
    .slice(0, MAX_CHUNKS)
    .map((c) => {
      const text = c.text.slice(0, MAX_CHUNK_CHARS);
      const heading = c.heading ? ` (${c.heading})` : "";
      return `[${c.id}]${heading} ${text}`;
    })
    .join("\n");
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as Partial<PageQARequest>;
    const { question, url, title, chunks } = body;

    if (!question?.trim()) {
      return json({ error: "No question provided." }, 400);
    }
    if (!chunks?.length) {
      return json({ error: "No page content provided." }, 400);
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return json(
        { error: "The AI provider is not configured. Please check the API key." },
        503
      );
    }

    const system = pageQAEngine.buildSystemPrompt();

    const prompt = [
      `Page title: ${title ?? "(unknown)"}`,
      `Page URL: ${url ?? "(unknown)"}`,
      "",
      "Page content chunks:",
      formatChunks(chunks),
      "",
      `Question: ${question}`,
    ].join("\n");

    const model = registry.createModel({
      providerId: "google",
      modelId: "gemini-2.0-flash",
      apiKey,
    });

    const { object } = await generateObject({
      model,
      schema: pageQASchema,
      system,
      prompt,
    });

    return json(object);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred.";
    const lowerMsg = message.toLowerCase();

    if (lowerMsg.includes("rate limit") || lowerMsg.includes("quota")) {
      return json(
        { error: "Too many requests. Please wait a moment and try again." },
        429
      );
    }
    if (
      lowerMsg.includes("api key") ||
      lowerMsg.includes("unauthorized") ||
      lowerMsg.includes("authentication")
    ) {
      return json(
        { error: "Authentication failed. Please check the API configuration." },
        401
      );
    }
    if (lowerMsg.includes("not found") || lowerMsg.includes("invalid model")) {
      return json({ error: `Model or provider not found: ${message}` }, 404);
    }

    console.error("[page-qa/route] Unhandled error:", err);
    return json({ error: "Something went wrong. Please try again." }, 500);
  }
}
