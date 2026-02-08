import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@chatbot/core", "@chatbot/providers", "@chatbot/ui"],
};

export default nextConfig;
