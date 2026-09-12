import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";
import { PRODUCTS, getProduct } from "@/lib/products-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

// Every valid slug is known at build time (from PRODUCTS), so an unlisted
// slug should 404 at the routing layer rather than rendering the page and
// calling notFound() — the latter can get cached as a 200 in combination
// with generateStaticParams (a known Next.js App Router gotcha).
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Connected Intelligence`,
    description: product.overview.value,
  };
}

function CtaLink({
  href,
  external,
  children,
  className,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
  className: string;
}) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

const ArrowIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);

const CheckIcon = (
  <svg className="w-4 h-4 text-[#CDA9EE] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

const DownArrow = (
  <svg className="w-4 h-4 text-black/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25 12 15.75 4.5 8.25" />
  </svg>
);

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-[#F6F1E8] animate-page-enter">
      <SiteHeader />
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: product.name }]}
      />

      {/* ── Hero ── */}
      <section className="mx-3 sm:mx-4 md:mx-6 lg:mx-auto lg:max-w-6xl mt-4 rounded-[20px] sm:rounded-[24px] bg-gradient-to-br from-black via-[#111] to-[#1a1a1a] overflow-hidden">
        <div className="px-6 sm:px-10 md:px-14 py-14 sm:py-16 md:py-20">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-white/30 mb-3">
            {product.category}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight max-w-xl">
            {product.name}
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/40 max-w-xl leading-relaxed">
            {product.overview.value}
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-8">
            <CtaLink
              href={product.primaryCta.href}
              external={product.primaryCta.external}
              className="inline-flex items-center gap-2 rounded-full bg-[#CDA9EE] text-black px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-semibold tracking-wide hover:bg-[#c49de8] transition-colors"
            >
              {product.primaryCta.label}
              {ArrowIcon}
            </CtaLink>
            <a
              href="#how-it-works"
              className="text-sm text-white/40 hover:text-white/70 transition-colors tracking-wide"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* ── Overview: what / who / problem / value ── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
        <Reveal className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="rounded-[20px] bg-white border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/30 mb-2">What it does</h2>
            <p className="text-sm text-black/60 leading-relaxed">{product.overview.whatItDoes}</p>
          </div>
          <div className="rounded-[20px] bg-white border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/30 mb-2">Who it's for</h2>
            <p className="text-sm text-black/60 leading-relaxed">{product.overview.whoItsFor}</p>
          </div>
          <div className="rounded-[20px] bg-white border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/30 mb-2">The problem it solves</h2>
            <p className="text-sm text-black/60 leading-relaxed">{product.overview.problem}</p>
          </div>
          <div className={`rounded-[20px] ${product.accent.badgeBg} p-6`}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/40 mb-2">Core value</h2>
            <p className="text-sm text-black/70 leading-relaxed font-medium">{product.overview.value}</p>
          </div>
        </Reveal>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="mx-auto max-w-3xl px-4 sm:px-6 pb-14 sm:pb-20">
        <Reveal className="text-center mb-10">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-black/30 mb-3">
            How It Works
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-black tracking-tight">From open tab to instant answer</h2>
        </Reveal>

        <div className="flex flex-col items-stretch">
          {product.howItWorks.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center">
              <Reveal delay={i * 90} className="w-full">
                <div className="flex items-start gap-4 rounded-[16px] bg-white border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-5">
                  <span
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${product.accent.iconBg} text-black text-sm font-bold flex-shrink-0`}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-black tracking-tight">{step.title}</h3>
                    <p className="mt-1 text-sm text-black/40 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </Reveal>
              {i < product.howItWorks.length - 1 && (
                <Reveal delay={i * 90 + 45} className="py-1.5">
                  {DownArrow}
                </Reveal>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Key Features + Use Cases ── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-14 sm:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Reveal className="rounded-[20px] bg-black p-6 sm:p-8">
            <h2 className="text-sm font-semibold text-white tracking-tight mb-4">Key features</h2>
            <ul className="space-y-2.5">
              {product.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-sm text-white/50 leading-relaxed">
                  {CheckIcon}
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80} className={`rounded-[20px] ${product.accent.badgeBg} p-6 sm:p-8`}>
            <h2 className="text-sm font-semibold text-black tracking-tight mb-4">Main use cases</h2>
            <ul className="space-y-2.5">
              {product.useCases.map((u) => (
                <li key={u} className="flex gap-2.5 text-sm text-black/60 leading-relaxed">
                  <svg className="w-4 h-4 text-black/30 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                  {u}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Getting Started ── */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 pb-14 sm:pb-20 text-center">
        <Reveal>
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-black/30 mb-3">
            Getting Started
          </span>
          <p className="text-base text-black/50 leading-relaxed max-w-lg mx-auto">{product.gettingStarted.description}</p>
          <ol className="mt-8 space-y-3 text-left max-w-md mx-auto">
            {product.gettingStarted.steps.map((step, i) => (
              <li key={step} className="flex gap-3 text-sm text-black/60 leading-relaxed">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-black/5 text-black/50 text-[11px] font-semibold flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <CtaLink
            href={product.gettingStarted.cta.href}
            external={product.gettingStarted.cta.external}
            className="inline-flex items-center gap-2 mt-8 rounded-full bg-[#CDA9EE] text-black px-7 py-3.5 text-sm font-semibold tracking-wide hover:bg-[#c49de8] transition-colors"
          >
            Get Started
            {ArrowIcon}
          </CtaLink>
        </Reveal>
      </section>

      {/* ── What Users Can Expect ── */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 pb-16 sm:pb-24">
        <Reveal className="rounded-[20px] bg-white border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 sm:p-8">
          <h2 className="text-sm font-semibold text-black tracking-tight mb-4">What you can expect</h2>
          <ul className="space-y-2.5">
            {product.expectations.map((e) => (
              <li key={e} className="flex gap-2.5 text-sm text-black/50 leading-relaxed">
                {CheckIcon}
                {e}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="text-center mt-10">
          <Link href="/products" className="text-sm text-black/40 hover:text-black transition-colors tracking-wide">
            &larr; Back to Products
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
