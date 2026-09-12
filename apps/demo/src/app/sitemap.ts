import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products-data";
import { SITE_URL } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified },
    { url: `${SITE_URL}/products`, lastModified },
    ...PRODUCTS.map((product) => ({ url: `${SITE_URL}/products/${product.slug}`, lastModified })),
    { url: `${SITE_URL}/ecommerce`, lastModified },
    { url: `${SITE_URL}/portfolio`, lastModified },
  ];
}
