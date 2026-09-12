import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Connected Intelligence — AI-Powered Products That Help You Understand Faster",
  description:
    "A platform of AI-powered tools for understanding, analyzing, and interacting with information — starting with Ask This Page, a browser extension that explains any webpage in one click.",
};

export default function Home() {
  return <HomeClient />;
}
