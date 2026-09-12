import { useEffect, useRef, useState } from "react";
import type { PageCitation } from "@chatbot/core";
import { askPage } from "../shared/api";
import {
  getActiveTab,
  sendToTab,
  type ChunksResponse,
} from "../shared/messages";
import type { UiMessage } from "./types";
import { MessageList } from "./components/MessageList";

const SUGGESTED_PROMPTS = [
  "Summarize this page",
  "What are the key points?",
  "Where does it mention pricing?",
];

let messageCounter = 0;
function nextId(): string {
  return `m${messageCounter++}`;
}

export function App() {
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<{ title: string; url: string } | null>(null);
  const [readable, setReadable] = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getActiveTab().then((tab) => {
      if (!tab) return;
      setPage({ title: tab.title ?? "This page", url: tab.url ?? "" });
      const url = tab.url ?? "";
      setReadable(url.startsWith("http://") || url.startsWith("https://"));
    });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    setError(null);
    setInput("");
    setMessages((prev) => [
      ...prev,
      { id: nextId(), role: "user", text: trimmed },
    ]);
    setLoading(true);

    try {
      const tab = await getActiveTab();
      if (!tab?.id) {
        throw new Error("No active tab to read.");
      }

      // Extract fresh content so the chunk ids we send match the content
      // script's current id -> element map for later highlighting.
      const res = await sendToTab<ChunksResponse>(tab.id, { type: "GET_CHUNKS" });
      if (!res || !res.ok) {
        throw new Error(
          "I can't read this page. Try an ordinary web page (not a browser or extension page)."
        );
      }
      if (res.chunks.length === 0) {
        throw new Error("I couldn't find any readable text on this page.");
      }

      const result = await askPage({
        question: trimmed,
        url: res.url,
        title: res.title,
        chunks: res.chunks,
      });

      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: "assistant",
          text: result.answer,
          found: result.found,
          citations: result.citations,
          chunks: res.chunks,
          tabId: tab.id,
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleHighlight(message: UiMessage, citation: PageCitation) {
    if (message.tabId == null) return;
    const res = await sendToTab(message.tabId, {
      type: "HIGHLIGHT",
      chunkId: citation.chunkId,
      quote: citation.quote,
    });
    if (!res || !res.ok) {
      setError("Couldn't highlight the source (the page may have changed).");
    }
  }

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-4 py-3">
        <h1 className="text-sm font-semibold text-gray-900">Ask This Page</h1>
        {page && (
          <p className="mt-0.5 truncate text-xs text-gray-500" title={page.url}>
            {page.title}
          </p>
        )}
      </header>

      {/* Conversation */}
      <main className="flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-gray-600">
              Ask a question about this page and I&apos;ll answer using its
              content, then show you exactly where the answer came from.
            </p>
            {readable && (
              <div className="flex flex-col gap-1.5">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => ask(prompt)}
                    className="rounded-lg border border-gray-200 px-3 py-2 text-left text-sm text-gray-700 transition hover:border-brand hover:bg-brand-light"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
            {!readable && (
              <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                This page can&apos;t be read. Open an ordinary web page and try
                again.
              </p>
            )}
          </div>
        ) : (
          <MessageList
            messages={messages}
            loading={loading}
            onHighlight={handleHighlight}
          />
        )}
        <div ref={bottomRef} />
      </main>

      {/* Error banner */}
      {error && (
        <div className="border-t border-red-100 bg-red-50 px-4 py-2 text-xs text-red-700">
          {error}
        </div>
      )}

      {/* Composer */}
      <footer className="border-t border-gray-200 p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
          className="flex items-end gap-2"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                ask(input);
              }
            }}
            rows={1}
            placeholder="Ask about this page..."
            disabled={loading}
            className="max-h-32 min-h-[40px] flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand disabled:bg-gray-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="h-10 shrink-0 rounded-lg bg-brand px-4 text-sm font-medium text-white transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            Ask
          </button>
        </form>
      </footer>
    </div>
  );
}
