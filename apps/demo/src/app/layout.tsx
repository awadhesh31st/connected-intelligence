import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://connected-intelligence-demo.vercel.app"),
  title: "Connected Intelligence",
  description:
    "A platform of AI-powered products that help you understand, analyze, and interact with information quickly and effortlessly.",
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
