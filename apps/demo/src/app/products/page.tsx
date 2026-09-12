import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductCard, ComingSoonCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/products-data";

export const metadata: Metadata = {
  title: "Products — Connected Intelligence",
  description:
    "Explore the AI-powered products on the Connected Intelligence platform: Ask This Page, a browser extension that explains any webpage in one click, and an embeddable AI chat widget for your website.",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#F6F1E8] animate-page-enter">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products" }]} />

      {/* ── Hero ── */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 pt-12 sm:pt-16 pb-10 sm:pb-14 text-center">
        <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-black/30 mb-3">
          Products
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
          AI-powered tools, built around one idea
        </h1>
        <p className="mt-4 text-base text-black/40 leading-relaxed">
          Every product here helps you understand, analyze, and interact with information quickly and
          effortlessly — whether that's a webpage you're reading or a website your visitors are browsing.
        </p>
      </section>

      {/* ── Product Cards ── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-14 sm:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
          <ComingSoonCard />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
