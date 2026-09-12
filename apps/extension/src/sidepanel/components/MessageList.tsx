import type { PageCitation } from "@chatbot/core";
import type { UiMessage } from "../types";
import { SourceChip } from "./SourceChip";

interface MessageListProps {
  messages: UiMessage[];
  loading: boolean;
  onHighlight: (message: UiMessage, citation: PageCitation) => void;
}

export function MessageList({ messages, loading, onHighlight }: MessageListProps) {
  return (
    <div className="flex flex-col gap-4">
      {messages.map((msg) =>
        msg.role === "user" ? (
          <div key={msg.id} className="flex justify-end">
            <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-brand px-3 py-2 text-sm text-white">
              {msg.text}
            </div>
          </div>
        ) : (
          <div key={msg.id} className="flex flex-col gap-2">
            <div
              className={`max-w-[92%] rounded-2xl rounded-bl-sm px-3 py-2 text-sm ${
                msg.found === false
                  ? "border border-amber-200 bg-amber-50 text-amber-900"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              {msg.text}
            </div>

            {msg.found !== false && msg.citations && msg.citations.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                  Sources on this page
                </span>
                {msg.citations.map((citation, i) => (
                  <SourceChip
                    key={`${msg.id}-${i}`}
                    citation={citation}
                    index={i}
                    heading={
                      msg.chunks?.find((c) => c.id === citation.chunkId)?.heading
                    }
                    onClick={() => onHighlight(msg, citation)}
                  />
                ))}
              </div>
            )}
          </div>
        )
      )}

      {loading && (
        <div className="flex items-center gap-1.5 px-1 text-gray-400">
          <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
        </div>
      )}
    </div>
  );
}
