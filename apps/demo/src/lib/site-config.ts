/**
 * Canonical site URL, used for metadataBase, the sitemap, and robots.txt.
 * Set NEXT_PUBLIC_SITE_URL in the deployment environment (e.g. to a custom
 * domain) to update all three at once — falls back to the Vercel preview
 * URL so local/preview builds still produce valid absolute URLs.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://connected-intelligence-demo.vercel.app";
