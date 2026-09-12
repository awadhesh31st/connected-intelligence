import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  /** Omit on the last (current) item — it renders as plain text, not a link. */
  href?: string;
}

/** Small "Home / Section / Current" trail showing where a page sits in the site hierarchy. */
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 sm:px-6 pt-4 sm:pt-5">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs text-black/40">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-black transition-colors">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-black/60 font-medium">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
