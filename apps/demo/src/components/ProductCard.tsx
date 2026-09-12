import Link from "next/link";
import type { Product } from "@/lib/products-data";

/** Data-driven product card for the /products grid. Add a product to the platform by adding data, not markup. */
export function ProductCard({ product }: { product: Product }) {
  const isLive = product.status === "live";
  return (
    <div className="group rounded-[20px] bg-white border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-10 h-10 rounded-xl ${product.accent.iconBg} flex items-center justify-center text-black/70 transition-transform duration-300 group-hover:scale-110`}
        >
          {product.icon}
        </div>
        <span
          className={`text-[10px] font-semibold uppercase tracking-wider rounded-full px-2.5 py-1 ${
            isLive ? `${product.accent.badgeBg} ${product.accent.badgeText}` : "bg-black/5 text-black/40"
          }`}
        >
          {isLive ? "Live" : "Coming Soon"}
        </span>
      </div>
      <h2 className="text-lg font-bold text-black tracking-tight">{product.name}</h2>
      <p className="mt-2 text-sm text-black/40 leading-relaxed flex-1">{product.tagline}</p>
      <Link
        href={`/products/${product.slug}`}
        className={`mt-5 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-colors ${
          isLive ? "bg-black text-white group-hover:bg-black/80" : "bg-black/5 text-black/60 hover:bg-black/10"
        }`}
      >
        {isLive ? "Explore Product" : "Learn More"}
        <svg
          className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </Link>
    </div>
  );
}

/** Placeholder card hinting at future products, using the same card shape so it slots in naturally. */
export function ComingSoonCard() {
  return (
    <div className="rounded-[20px] border border-dashed border-black/15 p-7 flex flex-col items-start justify-center text-left bg-black/[0.015]">
      <div className="w-10 h-10 rounded-xl bg-[#FFD696]/40 flex items-center justify-center mb-4">
        <svg className="w-5 h-5 text-black/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </div>
      <h2 className="text-lg font-bold text-black/50 tracking-tight">More tools</h2>
      <p className="mt-2 text-sm text-black/30 leading-relaxed">
        We're building more AI-powered products around the same goal: effortless understanding. Follow the
        repo to see what's next.
      </p>
    </div>
  );
}
