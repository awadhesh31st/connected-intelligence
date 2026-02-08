import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    google: "src/google/index.ts",
    perplexity: "src/perplexity/index.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["@chatbot/core"],
});
