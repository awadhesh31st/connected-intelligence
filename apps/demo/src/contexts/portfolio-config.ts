import type { ChatbotConfig } from "@chatbot/core";
import { createPortfolioContext } from "@chatbot/core";
import { projects, portfolioOwner } from "../lib/demo-data";

export const portfolioConfig: ChatbotConfig = {
  context: createPortfolioContext(portfolioOwner.name, {
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
  }),
  provider: {
    providerId: "perplexity",
    modelId: "sonar",
  },
  theme: {
    colors: {
      primary: "#8b5cf6",
      primaryHover: "#7c3aed",
      primaryLight: "#1e1b4b",
      secondary: "#94a3b8",
      background: "#0f172a",
      surface: "#1e293b",
      surfaceHover: "#334155",
      border: "#334155",
      text: "#f1f5f9",
      textSecondary: "#94a3b8",
      textInverse: "#0f172a",
      userBubble: "#7c3aed",
      assistantBubble: "#1e293b",
      error: "#f87171",
      success: "#4ade80",
    },
  },
  features: {
    streaming: true,
    suggestions: true,
    quickReplies: true,
    messageHistory: false,
    feedback: false,
  },
  apiEndpoint: "/api/chat",
};
