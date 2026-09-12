import type { AskAnswer, ChatTurn, PageModel } from "./types";

const API_BASE = "https://generativelanguage.googleapis.com/v1beta";
const SERIALIZED_BLOCKS_MAX_CHARS = 60_000;

const RESPONSE_SCHEMA = {
  type: "OBJECT",
  properties: {
    found: {
      type: "BOOLEAN",
      description: "Whether the page actually contains information that answers the question.",
    },
    answer: {
      type: "STRING",
      description: "A concise, direct answer in natural language.",
    },
    sectionTitle: {
      type: "STRING",
      description: "The heading of the section the answer mainly comes from, if any.",
    },
    citations: {
      type: "ARRAY",
      description: "Block ids from the provided page content that directly support the answer.",
      items: {
        type: "OBJECT",
        properties: {
          blockId: { type: "STRING" },
          quote: { type: "STRING", description: "The exact supporting text, verbatim from that block." },
        },
        required: ["blockId"],
      },
    },
  },
  required: ["found", "answer", "citations"],
} as const;

function serializeBlocks(pageModel: PageModel): string {
  const lines: string[] = [];
  let chars = 0;
  for (const block of pageModel.blocks) {
    const path = block.headingPath.length ? `${block.headingPath.join(" > ")} :: ` : "";
    const line = `[${block.id}] ${path}${block.text}`;
    if (chars + line.length > SERIALIZED_BLOCKS_MAX_CHARS) {
      lines.push("[...page content truncated for length...]");
      break;
    }
    lines.push(line);
    chars += line.length;
  }
  return lines.join("\n");
}

function buildSystemInstruction(pageModel: PageModel): string {
  return [
    "You are \"Ask This Page\", a browser extension assistant that answers questions strictly using the content of the webpage the user is currently viewing.",
    "",
    `Page title: ${pageModel.title}`,
    `Page URL: ${pageModel.url}`,
    "",
    "The page content below is split into numbered blocks. Each line looks like:",
    "[block-id] Heading > Path :: block text",
    "",
    "--- PAGE CONTENT START ---",
    serializeBlocks(pageModel),
    "--- PAGE CONTENT END ---",
    "",
    "Rules:",
    "- Answer ONLY using the page content above. Do not use outside knowledge to fill gaps.",
    "- If the page does not contain information that answers the question, set found=false and say so plainly in `answer` (you may still briefly say what the page does cover, if relevant).",
    "- When found=true, `citations` MUST list the block ids whose text directly supports the answer, with the exact supporting quote from that block.",
    "- Prefer 1-4 citations. Do not invent block ids that were not provided.",
    "- Keep `answer` concise (a few sentences, or a short list) and written in plain natural language, not JSON.",
    "- Respond ONLY with JSON matching the required schema.",
  ].join("\n");
}

function historyToContents(history: ChatTurn[]): { role: "user" | "model"; parts: { text: string }[] }[] {
  return history.map((turn) => ({
    role: turn.role === "assistant" ? "model" : "user",
    parts: [{ text: turn.text }],
  }));
}

export class LlmError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
    this.name = "LlmError";
  }
}

export async function askGemini(params: {
  apiKey: string;
  model: string;
  question: string;
  history: ChatTurn[];
  pageModel: PageModel;
}): Promise<AskAnswer> {
  const { apiKey, model, question, history, pageModel } = params;

  const body = {
    systemInstruction: { parts: [{ text: buildSystemInstruction(pageModel) }] },
    contents: [...historyToContents(history), { role: "user", parts: [{ text: question }] }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA,
      temperature: 0.2,
    },
  };

  const res = await fetch(`${API_BASE}/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    if (res.status === 400 || res.status === 401 || res.status === 403) {
      throw new LlmError("Your Gemini API key was rejected. Check it in the extension options.", res.status);
    }
    if (res.status === 429) {
      throw new LlmError("Gemini rate limit reached. Please wait a moment and try again.", res.status);
    }
    throw new LlmError(`Gemini request failed (${res.status}): ${detail.slice(0, 200)}`, res.status);
  }

  const data = await res.json();
  const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new LlmError("Gemini returned an empty response.");
  }

  try {
    const parsed = JSON.parse(text);
    return {
      answer: String(parsed.answer ?? ""),
      found: Boolean(parsed.found),
      citations: Array.isArray(parsed.citations)
        ? parsed.citations
            .filter((c: unknown): c is { blockId: string; quote?: string } => Boolean((c as { blockId?: string })?.blockId))
            .map((c: { blockId: string; quote?: string }) => ({ blockId: c.blockId, quote: c.quote ?? "" }))
        : [],
      sectionTitle: typeof parsed.sectionTitle === "string" ? parsed.sectionTitle : undefined,
    };
  } catch {
    return { answer: text, found: false, citations: [] };
  }
}

export async function testApiKey(apiKey: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/models?key=${encodeURIComponent(apiKey)}`);
  return res.ok;
}
