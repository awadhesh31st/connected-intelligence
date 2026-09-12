import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

/* ─────────────── Zona Pro Pastel Theme ─────────────── */
/* Lavender #CDA9EE · Blue #A4C1EE · Black #000 · Cream #F6F1E8 · Yellow #FFD696 */

const FEATURES = [
  {
    bg: "bg-[#CDA9EE]/20",
    iconBg: "bg-[#CDA9EE]",
    title: "One-Click Summaries",
    desc: "Skip the reading. Get what a page is about, what it does, and why it matters in seconds.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    bg: "bg-[#A4C1EE]/20",
    iconBg: "bg-[#A4C1EE]",
    title: "Ask Anything, Naturally",
    desc: "Go beyond a summary — ask follow-up questions in plain language and get answers grounded in the content itself.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
      </svg>
    ),
  },
  {
    bg: "bg-[#FFD696]/20",
    iconBg: "bg-[#FFD696]",
    title: "See Exactly Where It Comes From",
    desc: "Every answer highlights and scrolls to its exact source, so you can verify it yourself in one click.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
  },
  {
    bg: "bg-[#CDA9EE]/20",
    iconBg: "bg-[#CDA9EE]",
    title: "Works Everywhere",
    desc: "Articles, docs, product pages, policies — no setup beyond installing the extension, on any page you're already viewing.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    bg: "bg-[#A4C1EE]/20",
    iconBg: "bg-[#A4C1EE]",
    title: "Your Data, Your Control",
    desc: "Runs with your own AI provider key. Page content goes only to the model you choose — never stored on our servers.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    bg: "bg-[#FFD696]/20",
    iconBg: "bg-[#FFD696]",
    title: "A Growing Toolkit",
    desc: "Ask This Page is just the start. We're building a family of tools around one idea: understand information effortlessly.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    ),
  },
] as const;

/* ─────────────── Page Component ─────────────── */

export default function HomeClient() {
  return (
    <div className="min-h-screen bg-[#F6F1E8]">
      <SiteHeader />

      {/* ── Hero Section — Dark ── */}
      <section className="mx-3 sm:mx-4 md:mx-6 lg:mx-auto lg:max-w-6xl rounded-[20px] sm:rounded-[24px] bg-gradient-to-br from-black via-[#111] to-[#1a1a1a] overflow-hidden">
        <div className="relative px-5 sm:px-8 md:px-16 py-14 sm:py-20 md:py-28 lg:py-32">
          {/* Subtle gradient orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full bg-[#CDA9EE]/10 blur-3xl" />
            <div className="absolute bottom-0 -left-20 w-[250px] h-[250px] rounded-full bg-[#A4C1EE]/10 blur-3xl" />
          </div>

          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5 text-xs font-medium text-white/60 tracking-wide mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CDA9EE]" />
              New: Ask This Page browser extension
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
              Understand anything,
              <br />
              <span className="text-[#CDA9EE]">instantly.</span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-white/40 max-w-md leading-relaxed">
              A platform of AI-powered tools that help you understand, analyze, and interact with information
              quickly — starting with a browser extension that reads any webpage and explains it in one click.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-8 sm:mt-10">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-[#CDA9EE] text-black px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-semibold tracking-wide hover:bg-[#c49de8] transition-colors"
              >
                Explore Products
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <a href="#features" className="text-sm text-white/40 hover:text-white/70 transition-colors tracking-wide">
                See how it works
              </a>
            </div>
          </div>

          {/* Floating preview — right side (static mockup) */}
          <div className="hidden lg:block absolute top-16 right-12 w-[320px] pointer-events-none select-none">
            <div className="rounded-[20px] bg-white/5 border border-white/10 backdrop-blur-sm p-4 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#CDA9EE]" />
                <span className="text-xs font-medium text-white/60 tracking-wide">Ask This Page</span>
              </div>
              <div className="space-y-2.5">
                <div className="flex justify-end">
                  <div className="rounded-[14px] rounded-br-md bg-[#CDA9EE] text-black px-3.5 py-2 text-xs font-medium max-w-[80%]">
                    What is this page about?
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="rounded-[14px] rounded-bl-md bg-white/10 text-white/70 px-3.5 py-2 text-xs max-w-[85%] space-y-2">
                    <p>This is a refund policy page. Refunds are allowed within 30 days of purchase.</p>
                    <div className="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1.5 flex items-center gap-1.5 w-fit">
                      <span className="text-[10px]">📍</span>
                      <span className="text-[10px] text-white/60">Refund Policy, ¶2</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 rounded-full bg-white/5 border border-white/10 px-3.5 py-2 flex items-center">
                <span className="text-[11px] text-white/25 flex-1">Ask anything&hellip;</span>
                <svg className="w-3.5 h-3.5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section id="features" className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20 md:py-28">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-black/30 mb-3">Capabilities</span>
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">Built to help you understand faster</h2>
          <p className="mt-3 text-base text-black/40 max-w-md mx-auto">
            Every product on the platform shares the same foundation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className={`${f.bg} rounded-[20px] p-7 transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]`}
            >
              <div className={`w-10 h-10 rounded-xl ${f.iconBg} flex items-center justify-center text-black/70`}>
                {f.icon}
              </div>
              <h3 className="mt-5 text-base font-semibold text-black tracking-tight">{f.title}</h3>
              <p className="mt-2 text-sm text-black/40 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Products Teaser Section ── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-14 sm:pb-20 md:pb-28">
        <div className="rounded-[24px] bg-black p-8 sm:p-12 md:p-16 text-center">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-white/30 mb-3">Platform</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">One platform, a growing set of tools</h2>
          <p className="mt-4 text-base text-white/40 max-w-lg mx-auto leading-relaxed">
            Ask This Page is live today. An embeddable chat widget for any website is already built in. More
            AI-powered tools are on the way — all sharing the same goal of effortless understanding.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 mt-8 rounded-full bg-[#CDA9EE] text-black px-7 py-3.5 text-sm font-semibold tracking-wide hover:bg-[#c49de8] transition-colors"
          >
            View All Products
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
