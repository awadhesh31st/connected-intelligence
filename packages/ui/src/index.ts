// Providers
export { ChatProvider, useChatContext } from "./providers/ChatProvider";
export { ThemeProvider, useTheme } from "./providers/ThemeProvider";

// Hooks
export { useAutoScroll } from "./hooks/useAutoScroll";
export { useChatWidget } from "./hooks/useChatWidget";
export { useResponsive } from "./hooks/useResponsive";

// Theme
export { defaultTheme } from "./theme/default-theme";
export { darkTheme } from "./theme/dark-theme";
export { mergeTheme, createTheme, themeToCSS } from "./theme/theme-utils";

// Components - Input
export { ChatInput } from "./components/Input/ChatInput";
export { QuickReplies } from "./components/Input/QuickReplies";
export { SuggestionPrompts } from "./components/Input/SuggestionPrompts";

// Components - Message
export { MessageBubble } from "./components/Message/MessageBubble";
export { UserMessage } from "./components/Message/UserMessage";
export { AssistantMessage } from "./components/Message/AssistantMessage";
export { MessageList } from "./components/Message/MessageList";

// Components - Feedback
export { LoadingIndicator } from "./components/Feedback/LoadingIndicator";
export { StreamingText } from "./components/Feedback/StreamingText";
export { ErrorState } from "./components/Feedback/ErrorState";
export { EmptyState } from "./components/Feedback/EmptyState";

// Components - Response
export { ProductCard } from "./components/Response/ProductCard";
export { ProjectCard } from "./components/Response/ProjectCard";
export { SourceCard } from "./components/Response/SourceCard";
export { ImageCard } from "./components/Response/ImageCard";
export { ResponseRenderer } from "./components/Response/ResponseRenderer";

// Components - Layout
export { ChatHeader } from "./components/Layout/ChatHeader";
export { ChatBody } from "./components/Layout/ChatBody";
export { ChatFooter } from "./components/Layout/ChatFooter";
export { WelcomeScreen } from "./components/Layout/WelcomeScreen";
export { ChatHistory } from "./components/Layout/ChatHistory";

// Components - ChatWindow
export { ChatWindow } from "./components/ChatWindow/ChatWindow";

// Components - ChatWidget
export { ChatWidget } from "./components/ChatWidget/ChatWidget";
export { ChatWidgetTrigger } from "./components/ChatWidget/ChatWidgetTrigger";
export { ChatWidgetPanel } from "./components/ChatWidget/ChatWidgetPanel";
