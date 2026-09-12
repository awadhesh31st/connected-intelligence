import Link from "next/link";

/** Global site footer, used on every page for consistent cross-page links. */
export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-6xl px-4 sm:px-6 pb-8 sm:pb-12 pt-6 sm:pt-8 border-t border-black/5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href="/" className="text-base font-bold text-black tracking-tight flex items-center gap-1">
          Connected
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#CDA9EE]" />
          Intelligence
        </Link>
        <div className="flex items-center gap-6 text-sm text-black/40">
          <Link href="/products" className="hover:text-black transition-colors">Products</Link>
          <Link href="/portfolio" className="hover:text-black transition-colors">Portfolio</Link>
          <a
            href="https://github.com/awadhesh31st/connected-intelligence"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors"
          >
            GitHub
          </a>
        </div>
        <p className="text-xs text-black/20 tracking-wide">&copy; 2026 Connected Intelligence</p>
      </div>
    </footer>
  );
}
