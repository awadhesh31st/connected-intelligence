import type { MetadataRoute } from "next";

const BASE_URL = "https://connected-intelligence-demo.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${BASE_URL}/`, lastModified },
    { url: `${BASE_URL}/ecommerce`, lastModified },
    { url: `${BASE_URL}/portfolio`, lastModified },
  ];
}
