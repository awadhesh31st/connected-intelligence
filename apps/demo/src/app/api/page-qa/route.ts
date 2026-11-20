import { generateObject } from "ai";
import { z } from "zod";
import { ProviderRegistry, createGoogleProvider } from "@chatbot/providers";
import { ContextEngine, createPageQAContext } from "@chatbot/core/server";
import { extractBearerToken, verifyDeviceToken } from "@/lib/auth/device-token";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { DAILY_QUESTION_LIMIT, getTodayUsage, recordUsage } from "@/lib/usage";

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

// Request validation. Ceilings match (with headroom) the extension's own
// extraction limits (apps/extension/src/content/extract.ts: 600 chunks,
// 2000 chars each) — legitimate traffic is always well inside these, so a
// request that exceeds them is either a bug or abuse and is rejected
// outright (413) rather than silently truncated, which used to hide the
// problem from the caller.
const REQUEST_MAX_CHUNKS = 750;
const REQUEST_MAX_CHUNK_TEXT = 2000;

const pageChunkSchema = z.object({
  id: z.string().min(1).max(64),
  tag: z.string().min(1).max(32),
  heading: z.string().max(300).optional(),
  text: z.string().min(1).max(REQUEST_MAX_CHUNK_TEXT),
});

const pageQARequestSchema = z.object({
  question: z.string().min(1).max(2000),
  url: z.string().max(2048),
  title: z.string().max(500),
  chunks: z.array(pageChunkSchema).min(1).max(REQUEST_MAX_CHUNKS),
});

// Separate, smaller ceilings for how much of the (already-validated) request
// actually gets spent on prompt tokens — a cost control, not a security gate.
const PROMPT_MAX_CHUNKS = 400;
const PROMPT_MAX_CHUNK_CHARS = 1200;

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function json(body: unknown, status = 200, extraHeaders?: Record<string, string>): Response {
  return Response.json(body, { status, headers: { ...CORS_HEADERS, ...extraHeaders } });
}

export function OPTIONS(): Response {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

function formatChunks(chunks: z.infer<typeof pageChunkSchema>[]): string {
  return chunks
    .slice(0, PROMPT_MAX_CHUNKS)
    .map((c) => {
      const text = c.text.slice(0, PROMPT_MAX_CHUNK_CHARS);
      const heading = c.heading ? ` (${c.heading})` : "";
      return `[${c.id}]${heading} ${text}`;
    })
    .join("\n");
}

export async function POST(request: Request): Promise<Response> {
  try {
    // 1. Authenticate the device.
    const token = extractBearerToken(request);
    const device = await verifyDeviceToken(token);
    if (!device) {
      return json(
        { error: "Missing or invalid device token. Re-install or reload the extension." },
        401
      );
    }

    // 2. Burst rate limit (device + IP as two independent dimensions — a
    // shared/stolen token still hits the IP limit, and a rotating IP behind
    // one device still hits the device limit).
    const ip = getClientIp(request);
    const [deviceLimit, ipLimit] = await Promise.all([
      checkRateLimit("page-qa:device", device.id, 10, "1 m"),
      checkRateLimit("page-qa:ip", ip, 30, "1 m"),
    ]);
    if (!deviceLimit.allowed || !ipLimit.allowed) {
      return json({ error: "Too many requests. Please wait a moment and try again." }, 429);
    }

    // 3. Daily quota (the layer that's always enforced — see lib/usage.ts).
    const usage = await getTodayUsage(device.id);
    if (usage.remaining <= 0) {
      return json(
        {
          error: `Daily limit of ${DAILY_QUESTION_LIMIT} questions reached. Try again tomorrow.`,
        },
        429
      );
    }

    // 4. Validate the request body.
    const parsed = pageQARequestSchema.safeParse(await request.json());
    if (!parsed.success) {
      return json({ error: "Invalid request.", details: parsed.error.flatten() }, 400);
    }
    const { question, url, title, chunks } = parsed.data;

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return json(
        { error: "The AI provider is not configured. Please check the API key." },
        503
      );
    }

    const system = pageQAEngine.buildSystemPrompt();

    const prompt = [
      `Page title: ${title || "(unknown)"}`,
      `Page URL: ${url || "(unknown)"}`,
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

    const { object, usage: modelUsage } = await generateObject({
      model,
      schema: pageQASchema,
      system,
      prompt,
    });

    // Only counts against quota on success — a failed/errored call never does.
    await recordUsage(device.id, {
      inputTokens: modelUsage.inputTokens ?? 0,
      outputTokens: modelUsage.outputTokens ?? 0,
    });

    return json(object, 200, { "X-Quota-Remaining": String(usage.remaining - 1) });
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
