import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products-data";

const BASE_URL = "https://connected-intelligence-demo.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${BASE_URL}/`, lastModified },
    { url: `${BASE_URL}/products`, lastModified },
    ...PRODUCTS.map((product) => ({ url: `${BASE_URL}/products/${product.slug}`, lastModified })),
    { url: `${BASE_URL}/ecommerce`, lastModified },
    { url: `${BASE_URL}/portfolio`, lastModified },
  ];
}
