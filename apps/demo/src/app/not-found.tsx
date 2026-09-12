import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F6F1E8] flex flex-col">
      <SiteHeader />

      <main className="flex-1 flex flex-col items-center justify-center mx-auto max-w-2xl px-4 sm:px-6 py-16 text-center">
        <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-black/30 mb-3">
          404
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-4 text-base text-black/40 leading-relaxed">
          The page you're looking for doesn't exist or may have moved. Here are some places to go instead.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#CDA9EE] text-black px-6 py-3 text-sm font-semibold tracking-wide hover:bg-[#c49de8] transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/products"
            className="text-sm text-black/50 hover:text-black transition-colors tracking-wide"
          >
            Browse Products
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
