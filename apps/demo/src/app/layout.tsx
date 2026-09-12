import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://connected-intelligence-demo.vercel.app"),
  title: "Connected Intelligence",
  description:
    "A modular AI chatbot widget for Next.js apps, demoed with e-commerce and portfolio assistants powered by Google Gemini and Perplexity Sonar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
