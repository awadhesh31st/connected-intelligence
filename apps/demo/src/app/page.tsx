"use client";

/* ─────────────── Zona Pro Pastel Theme ─────────────── */
/* Lavender #CDA9EE · Blue #A4C1EE · Black #000 · Cream #F6F1E8 · Yellow #FFD696 */

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Architecture", href: "#architecture" },
  { label: "Docs", href: null },
  { label: "Demo", href: "#demo" },
] as const;

const FEATURES = [
  {
    bg: "bg-[#CDA9EE]/20",
    iconBg: "bg-[#CDA9EE]",
    title: "Context Engine",
    desc: "Dynamic system prompt builder with behavior, tone, and knowledge injection for any platform.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
      </svg>
    ),
  },
  {
    bg: "bg-[#A4C1EE]/20",
    iconBg: "bg-[#A4C1EE]",
    title: "Streaming UI",
    desc: "Real-time token streaming with MutationObserver auto-scroll, loading states, and abort control.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    bg: "bg-[#FFD696]/20",
    iconBg: "bg-[#FFD696]",
    title: "Theme System",
    desc: "20+ CSS variable design tokens with Tailwind mapping. Runtime switching, zero rebuild.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
      </svg>
    ),
  },
  {
    bg: "bg-[#CDA9EE]/20",
    iconBg: "bg-[#CDA9EE]",
    title: "Provider Registry",
    desc: "Plug-and-play AI providers. Google Gemini, Perplexity Sonar, easily extensible.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
  },
  {
    bg: "bg-[#A4C1EE]/20",
    iconBg: "bg-[#A4C1EE]",
    title: "Structured Responses",
    desc: "ProductCard, SourceCard, ProjectCard — rich UI components beyond plain text.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
      </svg>
    ),
  },
  {
    bg: "bg-[#FFD696]/20",
    iconBg: "bg-[#FFD696]",
    title: "AI SDK v6 Native",
    desc: "Built on Vercel AI SDK v6 with useChat v3, UIMessage parts, async model conversion.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
  },
] as const;

const ARCH_BOXES = [
  { label: "Demo App", sub: "Next.js 15", color: "bg-[#CDA9EE]/30 border-[#CDA9EE]/40" },
  { label: "@chatbot/ui", sub: "Components", color: "bg-[#A4C1EE]/30 border-[#A4C1EE]/40" },
  { label: "@chatbot/core", sub: "Types & Engine", color: "bg-[#FFD696]/30 border-[#FFD696]/40" },
  { label: "@chatbot/providers", sub: "Google, Perplexity", color: "bg-[#CDA9EE]/30 border-[#CDA9EE]/40" },
  { label: "API Route", sub: "streamText()", color: "bg-[#A4C1EE]/30 border-[#A4C1EE]/40" },
] as const;

const DASHBOARD_TASKS = [
  { title: "Setup ContextEngine", tag: "core", tagColor: "bg-[#CDA9EE]/30 text-[#8B5EC0]", status: "Done" },
  { title: "Build ChatProvider", tag: "ui", tagColor: "bg-[#A4C1EE]/30 text-[#5B8BC9]", status: "Done" },
  { title: "Add Perplexity provider", tag: "providers", tagColor: "bg-[#FFD696]/30 text-[#B8862D]", status: "In Progress" },
  { title: "Theme system CSS vars", tag: "ui", tagColor: "bg-[#A4C1EE]/30 text-[#5B8BC9]", status: "To Do" },
] as const;

/* ─────────────── Page Component ─────────────── */

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F6F1E8]">

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-[#F6F1E8]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="/" className="text-lg font-bold tracking-tight text-black flex items-center gap-1">
            chatbot
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#CDA9EE]" />
            ai
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) =>
              link.href ? (
                <a key={link.label} href={link.href} className="text-sm text-black/50 hover:text-black transition-colors tracking-wide">
                  {link.label}
                </a>
              ) : (
                <span key={link.label} className="text-sm text-black/25 cursor-default relative group tracking-wide">
                  {link.label}
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-white bg-black rounded-lg px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Coming Soon
                  </span>
                </span>
              )
            )}
          </div>

          <span className="relative group">
            <button disabled className="rounded-full bg-black/5 text-black/30 px-5 py-2 text-sm font-medium cursor-not-allowed tracking-wide">
              Get Started
            </button>
            <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] text-white bg-black rounded-lg px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Coming Soon
            </span>
          </span>
        </div>
      </nav>

      {/* ── Hero Section — Dark ── */}
      <section className="mx-4 md:mx-6 lg:mx-auto lg:max-w-6xl rounded-[24px] bg-gradient-to-br from-black via-[#111] to-[#1a1a1a] overflow-hidden">
        <div className="relative px-8 md:px-16 py-20 md:py-28 lg:py-32">
          {/* Subtle gradient orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full bg-[#CDA9EE]/10 blur-3xl" />
            <div className="absolute bottom-0 -left-20 w-[250px] h-[250px] rounded-full bg-[#A4C1EE]/10 blur-3xl" />
          </div>

          <div className="relative z-10 max-w-2xl">
            {/* Color palette display */}
            <div className="flex items-center gap-2 mb-10">
              <span className="w-6 h-6 rounded-full bg-[#CDA9EE]" />
              <span className="w-6 h-6 rounded-full bg-[#A4C1EE]" />
              <span className="w-6 h-6 rounded-full bg-[#FFD696]" />
              <span className="w-6 h-6 rounded-full bg-white" />
              <span className="ml-3 text-xs text-white/30 tracking-widest uppercase">Zona Pro Theme</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
              The modern way
              <br />
              to build
              <br />
              <span className="text-[#CDA9EE]">AI chatbots</span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-white/40 max-w-md leading-relaxed">
              A modular Turborepo package with context-aware intelligence. Drop it into any Next.js app and ship in minutes.
            </p>

            <div className="flex items-center gap-4 mt-10">
              <a
                href="/ecommerce"
                className="inline-flex items-center gap-2 rounded-full bg-[#CDA9EE] text-black px-7 py-3.5 text-sm font-semibold tracking-wide hover:bg-[#c49de8] transition-colors"
              >
                Try Live Demo
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <a href="#architecture" className="text-sm text-white/40 hover:text-white/70 transition-colors tracking-wide">
                View Architecture
              </a>
            </div>
          </div>

          {/* Floating chat preview — right side */}
          <div className="hidden lg:block absolute top-16 right-12 w-[320px]">
            <div className="rounded-[20px] bg-white/5 border border-white/10 backdrop-blur-sm p-4 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#CDA9EE]" />
                <span className="text-xs font-medium text-white/60 tracking-wide">Shopping Assistant</span>
              </div>
              <div className="space-y-2.5">
                <div className="flex justify-end">
                  <div className="rounded-[14px] rounded-br-md bg-[#CDA9EE] text-black px-3.5 py-2 text-xs font-medium max-w-[80%]">
                    Show me headphones under $300
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="rounded-[14px] rounded-bl-md bg-white/10 text-white/70 px-3.5 py-2 text-xs max-w-[85%]">
                    <p>Here&apos;s a top pick:</p>
                    <div className="mt-2 rounded-xl bg-white/5 border border-white/10 p-2.5 flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#CDA9EE] to-[#A4C1EE] flex-shrink-0" />
                      <div>
                        <p className="text-[11px] font-semibold text-white/80">NC Headphones Pro</p>
                        <p className="text-[11px] font-bold text-[#FFD696]">$299.99</p>
                      </div>
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
      <section id="features" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-black/30 mb-3">Capabilities</span>
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">Everything you need</h2>
          <p className="mt-3 text-base text-black/40 max-w-md mx-auto">
            Six pillars that make building AI chat interfaces effortless.
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

      {/* ── Dashboard Preview Section ── */}
      <section className="mx-4 md:mx-6 lg:mx-auto lg:max-w-6xl mb-20">
        <div className="rounded-[24px] bg-white border border-black/5 shadow-[0_4px_40px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="lg:w-56 border-b lg:border-b-0 lg:border-r border-black/5 p-5 lg:p-6">
              <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
                <div className="flex items-center gap-2 rounded-xl bg-[#CDA9EE]/15 px-3 py-2 min-w-max">
                  <svg className="w-4 h-4 text-[#8B5EC0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                  <span className="text-xs font-semibold text-[#8B5EC0]">Dashboard</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl px-3 py-2 min-w-max">
                  <svg className="w-4 h-4 text-black/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                  </svg>
                  <span className="text-xs text-black/30">Packages</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl px-3 py-2 min-w-max">
                  <svg className="w-4 h-4 text-black/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  <span className="text-xs text-black/30">Settings</span>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 p-6 lg:p-8">
              {/* KPI cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="rounded-[16px] bg-[#CDA9EE]/15 p-5">
                  <p className="text-xs text-black/40 font-medium tracking-wide">Messages Today</p>
                  <p className="text-2xl font-bold text-black mt-1 tracking-tight">2,847</p>
                  <p className="text-[11px] text-[#8B5EC0] mt-1 font-medium">+12.5%</p>
                </div>
                <div className="rounded-[16px] bg-[#FFD696]/20 p-5">
                  <p className="text-xs text-black/40 font-medium tracking-wide">Avg Response</p>
                  <p className="text-2xl font-bold text-black mt-1 tracking-tight">1.2s</p>
                  <p className="text-[11px] text-[#B8862D] mt-1 font-medium">-340ms</p>
                </div>
                <div className="rounded-[16px] bg-[#A4C1EE]/20 p-5">
                  <p className="text-xs text-black/40 font-medium tracking-wide">Active Providers</p>
                  <p className="text-2xl font-bold text-black mt-1 tracking-tight">2</p>
                  <p className="text-[11px] text-[#5B8BC9] mt-1 font-medium">Gemini + Sonar</p>
                </div>
              </div>

              {/* Task board */}
              <div className="rounded-[16px] bg-[#F6F1E8]/60 border border-black/5 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-black tracking-tight">Integration Tasks</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#CDA9EE]" />
                    <span className="text-[11px] text-black/30">4 tasks</span>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {DASHBOARD_TASKS.map((task) => (
                    <div key={task.title} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 border border-black/5">
                      <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
                        task.status === "Done" ? "border-[#CDA9EE] bg-[#CDA9EE]" : "border-black/10 bg-transparent"
                      }`}>
                        {task.status === "Done" && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                        )}
                      </span>
                      <span className={`text-sm flex-1 ${task.status === "Done" ? "text-black/30 line-through" : "text-black/70"}`}>
                        {task.title}
                      </span>
                      <span className={`text-[10px] font-semibold rounded-full px-2.5 py-0.5 ${task.tagColor}`}>
                        {task.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Architecture Section ── */}
      <section id="architecture" className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-black/30 mb-3">Under the Hood</span>
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">Clean Architecture</h2>
          <p className="mt-3 text-base text-black/40 max-w-md mx-auto">
            Server-side streaming with AI SDK v6. Fully decoupled packages.
          </p>
        </div>

        <div className="rounded-[24px] bg-black p-8 md:p-12">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-0">
            {ARCH_BOXES.map((box, i) => (
              <div key={box.label} className="flex flex-col lg:flex-row items-center">
                <div className={`rounded-[16px] ${box.color} border px-6 py-4 text-center min-w-[150px]`}>
                  <p className="text-sm font-semibold text-white tracking-tight">{box.label}</p>
                  <p className="text-[11px] text-white/40 mt-0.5">{box.sub}</p>
                </div>
                {i < ARCH_BOXES.length - 1 && (
                  <>
                    <div className="hidden lg:flex items-center px-1.5">
                      <div className="w-5 h-px bg-white/20" />
                      <svg className="w-2.5 h-2.5 text-white/20 -ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex lg:hidden items-center py-1">
                      <div className="h-3 w-px bg-white/20" />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Theme Preview Section ── */}
      <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-black/30 mb-3">Theming</span>
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">Runtime Theme Switching</h2>
          <p className="mt-3 text-base text-black/40 max-w-md mx-auto">
            CSS variables meet Tailwind. Switch themes with a config change.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
          {/* Light */}
          <div className="flex-1 max-w-xs mx-auto md:mx-0">
            <p className="text-xs font-semibold text-black/30 tracking-[0.15em] uppercase mb-3 text-center">Light</p>
            <div className="rounded-[20px] bg-white border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-black/5">
                <span className="w-2 h-2 rounded-full bg-[#CDA9EE]" />
                <span className="text-xs font-semibold text-black/70 tracking-tight">Chat</span>
              </div>
              <div className="p-3.5 space-y-2" style={{ backgroundColor: "#FAFAF8" }}>
                <div className="flex justify-end">
                  <div className="rounded-[14px] rounded-br-sm bg-[#CDA9EE] px-3 py-1.5 text-xs text-black/80 font-medium max-w-[80%]">
                    Hello there!
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="rounded-[14px] rounded-bl-sm bg-white border border-black/5 px-3 py-1.5 text-xs text-black/60 max-w-[80%]">
                    Hi! How can I help?
                  </div>
                </div>
              </div>
              <div className="px-3.5 py-2.5 border-t border-black/5">
                <div className="rounded-full border border-black/5 px-3 py-1.5 text-xs text-black/25">Type a message&hellip;</div>
              </div>
            </div>
          </div>

          {/* Dark */}
          <div className="flex-1 max-w-xs mx-auto md:mx-0">
            <p className="text-xs font-semibold text-black/30 tracking-[0.15em] uppercase mb-3 text-center">Dark</p>
            <div className="rounded-[20px] bg-[#111] border border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.1)] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                <span className="w-2 h-2 rounded-full bg-[#CDA9EE]" />
                <span className="text-xs font-semibold text-white/70 tracking-tight">Chat</span>
              </div>
              <div className="p-3.5 space-y-2 bg-[#111]">
                <div className="flex justify-end">
                  <div className="rounded-[14px] rounded-br-sm bg-[#CDA9EE] px-3 py-1.5 text-xs text-black/80 font-medium max-w-[80%]">
                    Hello there!
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="rounded-[14px] rounded-bl-sm bg-white/5 border border-white/5 px-3 py-1.5 text-xs text-white/60 max-w-[80%]">
                    Hi! How can I help?
                  </div>
                </div>
              </div>
              <div className="px-3.5 py-2.5 border-t border-white/5">
                <div className="rounded-full border border-white/5 px-3 py-1.5 text-xs text-white/20">Type a message&hellip;</div>
              </div>
            </div>
          </div>
        </div>

        {/* Config snippet */}
        <pre className="mx-auto max-w-lg mt-10 rounded-[16px] bg-[#1a1a1a] text-white/50 p-6 text-sm overflow-x-auto border border-white/5">
          <code>
{`const config: ChatbotConfig = {
  theme: {
    colors: {
      primary: "#CDA9EE",
      userBubble: "#CDA9EE",
      background: "#F6F1E8",
      surface: "#FFFFFF",
    },
  },
};`}
          </code>
        </pre>
      </section>

      {/* ── Footer ── */}
      <footer id="demo" className="mx-auto max-w-6xl px-6 pb-12 pt-8 border-t border-black/5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="/" className="text-base font-bold text-black tracking-tight flex items-center gap-1">
            chatbot
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#CDA9EE]" />
            ai
          </a>
          <div className="flex items-center gap-6">
            <a href="/ecommerce" className="text-sm text-black/30 hover:text-black transition-colors tracking-wide">
              E-Commerce Demo
            </a>
            <a href="/portfolio" className="text-sm text-black/30 hover:text-black transition-colors tracking-wide">
              Portfolio Demo
            </a>
          </div>
          <p className="text-xs text-black/20 tracking-wide">&copy; 2025 chatbot.ai</p>
        </div>
      </footer>
    </div>
  );
}
