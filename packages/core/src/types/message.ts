export type MessageRole = "user" | "assistant" | "system";

export type MessagePartType =
  | "text"
  | "product-card"
  | "project-card"
  | "source-card"
  | "image-card";

export interface TextPart {
  type: "text";
  content: string;
}

export interface ProductCardPart {
  type: "product-card";
  product: {
    id: string;
    name: string;
    price: number;
    currency: string;
    image?: string;
    description?: string;
    url?: string;
    rating?: number;
    inStock?: boolean;
  };
}

export interface ProjectCardPart {
  type: "project-card";
  project: {
    id: string;
    title: string;
    description: string;
    image?: string;
    url?: string;
    technologies?: string[];
    status?: "completed" | "in-progress" | "planned";
  };
}

export interface SourceCardPart {
  type: "source-card";
  source: {
    title: string;
    url: string;
    snippet?: string;
    favicon?: string;
  };
}

export interface ImageCardPart {
  type: "image-card";
  image: {
    url: string;
    alt?: string;
    caption?: string;
    width?: number;
    height?: number;
  };
}

export type MessagePart =
  | TextPart
  | ProductCardPart
  | ProjectCardPart
  | SourceCardPart
  | ImageCardPart;

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  parts?: MessagePart[];
  metadata?: Record<string, unknown>;
  createdAt?: Date;
}

export interface MessageAction {
  label: string;
  icon?: string;
  onClick: (message: ChatMessage) => void;
}
