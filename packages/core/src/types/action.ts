export interface ChatAction {
  id: string;
  label: string;
  icon?: string;
  variant?: "primary" | "secondary" | "ghost";
  onClick: () => void;
}

export interface QuickReply {
  label: string;
  message: string;
  icon?: string;
}

export interface SuggestionPrompt {
  text: string;
  description?: string;
  icon?: string;
}
