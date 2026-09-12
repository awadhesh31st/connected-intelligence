import type { PageCitation } from "@chatbot/core";

interface SourceChipProps {
  citation: PageCitation;
  /** Optional section heading for a friendlier label. */
  heading?: string;
  index: number;
  onClick: () => void;
}

/**
 * A clickable citation chip. Clicking it asks the content script to highlight
 * and scroll to the exact source on the page.
 */
export function SourceChip({ citation, heading, index, onClick }: SourceChipProps) {
  const label = heading?.trim() || citation.quote;

  return (
    <button
      type="button"
      onClick={onClick}
      title={citation.quote}
      className="group flex w-full items-start gap-2 rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-left transition hover:border-brand hover:bg-brand-light"
    >
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-semibold text-white">
        {index + 1}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-xs font-medium text-gray-900 group-hover:text-brand-hover">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-[11px] text-gray-500">
          &ldquo;{citation.quote}&rdquo;
        </span>
      </span>
      <span className="mt-0.5 shrink-0 text-[11px] text-gray-400 group-hover:text-brand">
        Show
      </span>
    </button>
  );
}
