import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Connected Intelligence — AI Chatbot Monorepo",
  description:
    "A modular, context-aware AI chatbot widget for Next.js apps, powered by Google Gemini and Perplexity Sonar. See it live in e-commerce and portfolio demos.",
};

export default function Home() {
  return <HomeClient />;
}
