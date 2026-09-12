import { build, context } from "esbuild";
import { cp, mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outdir = path.join(root, "dist");
const watch = process.argv.includes("--watch");

const entries = [
  { in: "src/background/index.ts", out: "background", format: "esm" },
  { in: "src/content/index.ts", out: "content", format: "iife" },
  { in: "src/sidepanel/sidepanel.ts", out: "sidepanel/sidepanel", format: "iife" },
  { in: "src/options/options.ts", out: "options/options", format: "iife" },
];

const staticFiles = [
  ["manifest.json", "manifest.json"],
  ["src/sidepanel/sidepanel.html", "sidepanel/sidepanel.html"],
  ["src/sidepanel/sidepanel.css", "sidepanel/sidepanel.css"],
  ["src/options/options.html", "options/options.html"],
  ["src/options/options.css", "options/options.css"],
];

async function copyStatic() {
  for (const [from, to] of staticFiles) {
    const dest = path.join(outdir, to);
    await mkdir(path.dirname(dest), { recursive: true });
    await cp(path.join(root, from), dest);
  }
}

async function main() {
  await rm(outdir, { recursive: true, force: true });
  await mkdir(outdir, { recursive: true });
  await copyStatic();

  const buildOptions = entries.map((entry) => ({
    entryPoints: [path.join(root, entry.in)],
    outfile: path.join(outdir, `${entry.out}.js`),
    bundle: true,
    format: entry.format,
    target: "chrome116",
    sourcemap: true,
    logLevel: "info",
  }));

  if (watch) {
    const ctxs = await Promise.all(buildOptions.map((opts) => context(opts)));
    await Promise.all(ctxs.map((ctx) => ctx.watch()));
    console.log("Watching for changes...");
  } else {
    await Promise.all(buildOptions.map((opts) => build(opts)));
    console.log(`Built extension to ${outdir}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
