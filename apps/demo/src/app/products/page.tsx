import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Products — Connected Intelligence",
  description:
    "Explore the AI-powered products on the Connected Intelligence platform: Ask This Page, a browser extension that explains any webpage in one click, and an embeddable AI chat widget for your website.",
};

const EXTENSION_REPO_URL =
  "https://github.com/awadhesh31st/connected-intelligence/tree/master/apps/extension";

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Activate on any page",
    desc: "Click the Ask This Page icon on any website — no setup, no copy-pasting URLs.",
  },
  {
    step: "2",
    title: "It reads the page",
    desc: "The extension reads the visible content — headings, paragraphs, key sections — and understands what it's about.",
  },
  {
    step: "3",
    title: "Get instant understanding",
    desc: "Ask for a summary, or any question in plain language. Every answer highlights exactly where it came from on the page.",
  },
] as const;

const EXTENSION_CAPABILITIES = [
  "One-click page summaries: what it's about, what it does, what it's for",
  "Ask follow-up questions in natural language — no need to read the whole page",
  "Every answer cites and highlights its exact source on the page",
  "Works on articles, docs, product pages, policies — any regular webpage",
  "Runs with your own AI provider key; page content is never stored on our servers",
] as const;

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#F6F1E8]">
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
          {/* Ask This Page */}
          <div className="rounded-[20px] bg-white border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-7 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#CDA9EE] flex items-center justify-center">
                <svg className="w-5 h-5 text-black/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider rounded-full px-2.5 py-1 bg-[#CDA9EE]/20 text-[#8B5EC0]">
                Live
              </span>
            </div>
            <h2 className="text-lg font-bold text-black tracking-tight">Ask This Page</h2>
            <p className="mt-2 text-sm text-black/40 leading-relaxed flex-1">
              A browser extension that reads the page you're viewing and explains it in one click — plus lets
              you ask anything about it, with exact source highlighting.
            </p>
            <a
              href="#ask-this-page"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-black text-white px-5 py-2.5 text-sm font-semibold tracking-wide hover:bg-black/80 transition-colors"
            >
              See How It Works
            </a>
          </div>

          {/* Chatbot Widget */}
          <div className="rounded-[20px] bg-white border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-7 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#A4C1EE] flex items-center justify-center">
                <svg className="w-5 h-5 text-black/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                </svg>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider rounded-full px-2.5 py-1 bg-[#A4C1EE]/20 text-[#5B8BC9]">
                Live
              </span>
            </div>
            <h2 className="text-lg font-bold text-black tracking-tight">Chatbot Widget</h2>
            <p className="mt-2 text-sm text-black/40 leading-relaxed flex-1">
              An embeddable AI chat widget for your own website. Drop it in to let visitors ask questions and
              get instant, context-aware answers about your product or content.
            </p>
            <a
              href="#chatbot-widget"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-black text-white px-5 py-2.5 text-sm font-semibold tracking-wide hover:bg-black/80 transition-colors"
            >
              Explore Product
            </a>
          </div>

          {/* Coming soon */}
          <div className="rounded-[20px] border border-dashed border-black/15 p-7 flex flex-col items-start justify-center text-left bg-black/[0.015]">
            <div className="w-10 h-10 rounded-xl bg-[#FFD696]/40 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-black/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-black/50 tracking-tight">More tools</h2>
            <p className="mt-2 text-sm text-black/30 leading-relaxed">
              We're building more AI-powered products around the same goal: effortless understanding. Follow
              the repo to see what's next.
            </p>
          </div>
        </div>
      </section>

      {/* ── Ask This Page — Detail ── */}
      <section id="ask-this-page" className="mx-3 sm:mx-4 md:mx-6 lg:mx-auto lg:max-w-6xl rounded-[24px] bg-black overflow-hidden mb-14 sm:mb-20">
        <div className="p-6 sm:p-10 md:p-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-white/30 mb-3">
            Browser Extension
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight max-w-xl">
            Ask This Page
          </h2>
          <p className="mt-4 text-base text-white/40 max-w-xl leading-relaxed">
            Instead of reading an entire page, activate the extension and immediately get a clear explanation
            of what it's about, what it does, and what you should know — with the option to ask anything else.
          </p>

          {/* How it works */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
            {HOW_IT_WORKS.map((s) => (
              <div key={s.step} className="rounded-[16px] bg-white/5 border border-white/10 p-5">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#CDA9EE] text-black text-xs font-bold mb-4">
                  {s.step}
                </span>
                <h3 className="text-sm font-semibold text-white tracking-tight">{s.title}</h3>
                <p className="mt-2 text-xs text-white/40 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Capabilities */}
          <div className="mt-10 rounded-[16px] bg-white/5 border border-white/10 p-6 sm:p-8">
            <h3 className="text-sm font-semibold text-white tracking-tight mb-4">What you get</h3>
            <ul className="space-y-2.5">
              {EXTENSION_CAPABILITIES.map((c) => (
                <li key={c} className="flex gap-2.5 text-sm text-white/50 leading-relaxed">
                  <svg className="w-4 h-4 text-[#CDA9EE] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <a
            href={EXTENSION_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 rounded-full bg-[#CDA9EE] text-black px-7 py-3.5 text-sm font-semibold tracking-wide hover:bg-[#c49de8] transition-colors"
          >
            Get the Extension
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
          <p className="mt-3 text-xs text-white/25">
            Free and open source. Not yet on the Chrome Web Store — install instructions are on GitHub.
          </p>
        </div>
      </section>

      {/* ── Chatbot Widget — Detail ── */}
      <section id="chatbot-widget" className="mx-auto max-w-6xl px-4 sm:px-6 pb-14 sm:pb-20 md:pb-28">
        <div className="rounded-[24px] bg-white border border-black/5 shadow-[0_4px_40px_rgba(0,0,0,0.03)] p-6 sm:p-10 md:p-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-black/30 mb-3">
            Embeddable Widget
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight max-w-xl">
            Chatbot Widget
          </h2>
          <p className="mt-4 text-base text-black/40 max-w-xl leading-relaxed">
            Drop an AI assistant into your own website. It answers questions using the context you give it —
            your products, your content, your policies — with a theme that matches your brand out of the box.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="rounded-[16px] bg-[#CDA9EE]/10 p-5">
              <h3 className="text-sm font-semibold text-black tracking-tight">Try it as a shopping assistant</h3>
              <p className="mt-2 text-xs text-black/40 leading-relaxed">
                Ask about products, prices, and recommendations on a live storefront demo.
              </p>
              <Link
                href="/ecommerce"
                className="inline-flex items-center gap-2 mt-4 rounded-full bg-black text-white px-5 py-2.5 text-xs font-semibold tracking-wide hover:bg-black/80 transition-colors"
              >
                Try It
              </Link>
            </div>
            <div className="rounded-[16px] bg-[#A4C1EE]/10 p-5">
              <h3 className="text-sm font-semibold text-black tracking-tight">Try it as a portfolio assistant</h3>
              <p className="mt-2 text-xs text-black/40 leading-relaxed">
                Ask about someone's experience, skills, and projects on a live portfolio demo.
              </p>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 mt-4 rounded-full bg-black text-white px-5 py-2.5 text-xs font-semibold tracking-wide hover:bg-black/80 transition-colors"
              >
                Try It
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
