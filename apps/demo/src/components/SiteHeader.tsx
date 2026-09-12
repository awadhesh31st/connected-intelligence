"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: "Products", href: "/products" },
  { label: "Portfolio", href: "/portfolio" },
  {
    label: "Docs",
    href: "https://github.com/awadhesh31st/connected-intelligence",
    external: true,
  },
];

/** True when `pathname` is the link's route, or a page nested under it (e.g. /products/ask-this-page). */
function isActiveRoute(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Renders a NavLink as a next/link (internal route) or a plain anchor (external), with an active state. */
function NavAnchor({
  link,
  active,
  className,
  onClick,
}: {
  link: NavLink;
  active: boolean;
  className: string;
  onClick?: () => void;
}) {
  const stateClass = active ? "text-black font-semibold" : "text-black/50 hover:text-black";
  if (!link.external) {
    return (
      <Link
        href={link.href}
        aria-current={active ? "page" : undefined}
        className={`${className} ${stateClass}`}
        onClick={onClick}
      >
        {link.label}
      </Link>
    );
  }
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} ${stateClass}`}
      onClick={onClick}
    >
      {link.label}
    </a>
  );
}

/**
 * Global site navigation, used on every page so the same primary routes and
 * current-page state are always available, regardless of which product/demo
 * you're viewing.
 *
 * `secondary` renders inside the same sticky container, directly below the
 * main row — used for a page's own in-page section nav (see the portfolio
 * page) so both bars stick together as one unit without needing to measure
 * pixel heights to avoid overlap.
 */
export function SiteHeader({ secondary }: { secondary?: ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#F6F1E8]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-4 sm:py-5">
        <Link href="/" className="text-lg font-bold tracking-tight text-black flex items-center gap-1">
          Connected
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#CDA9EE]" />
          Intelligence
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavAnchor
              key={link.label}
              link={link}
              active={isActiveRoute(pathname, link.href)}
              className="text-sm transition-colors tracking-wide"
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 -mr-2 text-black/50 hover:text-black transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {secondary}

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-black/5 bg-[#F6F1E8]/95 backdrop-blur-md px-4 pb-4 pt-2">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavAnchor
                key={link.label}
                link={link}
                active={isActiveRoute(pathname, link.href)}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm px-3 py-2.5 rounded-xl hover:bg-black/[0.03] transition-colors tracking-wide"
              />
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
