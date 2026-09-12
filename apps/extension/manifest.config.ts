import { defineManifest } from "@crxjs/vite-plugin";

/**
 * Manifest V3 definition for the "Ask This Page" extension.
 *
 * - A content script runs on every page to extract content and perform
 *   highlighting/scrolling.
 * - A background service worker opens the side panel on toolbar-icon click and
 *   relays messages between the side panel and the active tab's content script.
 * - The side panel hosts the React chat UI.
 *
 * `host_permissions` lists the backend endpoint so the side panel can fetch it
 * cross-origin without CORS restrictions.
 */
export default defineManifest({
  manifest_version: 3,
  name: "Ask This Page",
  version: "0.1.0",
  description:
    "Ask questions about the page you're viewing and see exactly where the answer comes from.",
  minimum_chrome_version: "116",
  action: {
    default_title: "Ask This Page",
  },
  background: {
    service_worker: "src/background/service-worker.ts",
    type: "module",
  },
  side_panel: {
    default_path: "src/sidepanel/index.html",
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/content/content-script.ts"],
      run_at: "document_idle",
    },
  ],
  permissions: ["activeTab", "scripting", "sidePanel", "storage", "tabs"],
  host_permissions: [
    "http://localhost:3000/*",
    "http://127.0.0.1:3000/*",
  ],
});
