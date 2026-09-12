"use client";

import React, { useState, useEffect } from "react";
import { ChatWidget } from "@chatbot/ui";
import { portfolioConfig } from "@/contexts/portfolio-config";
import { projects, portfolioOwner } from "@/lib/demo-data";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";

/* ─────────────── Types ─────────────── */

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

interface PortfolioClientProps {
  /** Repos fetched server-side (revalidated hourly). Null if that fetch failed or was skipped. */
  initialRepos: GitHubRepo[] | null;
}

/* ─────────────── Constants ─────────────── */

const NAV_ITEMS = [
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const SPECIALIZATION = "AI & Micro Frontends";

const SKILL_GROUP_STYLE: Record<string, { bg: string; text: string; iconBg: string }> = {
  Frontend: { bg: "bg-[#CDA9EE]/15", text: "text-[#8B5EC0]", iconBg: "bg-[#CDA9EE]" },
  Backend: { bg: "bg-[#A4C1EE]/15", text: "text-[#5B8BC9]", iconBg: "bg-[#A4C1EE]" },
  "State Management": { bg: "bg-[#FFD696]/20", text: "text-[#B8862D]", iconBg: "bg-[#FFD696]" },
  Testing: { bg: "bg-[#CDA9EE]/15", text: "text-[#8B5EC0]", iconBg: "bg-[#CDA9EE]" },
  "UI / Styling": { bg: "bg-[#A4C1EE]/15", text: "text-[#5B8BC9]", iconBg: "bg-[#A4C1EE]" },
  Architecture: { bg: "bg-[#FFD696]/20", text: "text-[#B8862D]", iconBg: "bg-[#FFD696]" },
  Performance: { bg: "bg-[#CDA9EE]/15", text: "text-[#8B5EC0]", iconBg: "bg-[#CDA9EE]" },
  DevOps: { bg: "bg-[#A4C1EE]/15", text: "text-[#5B8BC9]", iconBg: "bg-[#A4C1EE]" },
};

const SKILL_GROUP_ICONS: Record<string, React.ReactNode> = {
  Frontend: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
  ),
  Backend: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.923a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m19.5 0a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3m19.5 0a3 3 0 0 0-3-3H5.25a3 3 0 0 0-3 3m16.5 0h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Z"
    />
  ),
  "State Management": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
    />
  ),
  Testing: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5m4.75-11.396c.251.023.501.05.75.082m0 0a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3m-5.55-12.196c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
    />
  ),
  "UI / Styling": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z"
    />
  ),
  Architecture: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
    />
  ),
  Performance: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />,
  DevOps: (
    <>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </>
  ),
};

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "bg-[#3178C6]",
  JavaScript: "bg-[#F7DF1E]",
  HTML: "bg-[#E34F26]",
  CSS: "bg-[#1572B6]",
  Python: "bg-[#3776AB]",
  Shell: "bg-[#89E051]",
};

const currentRole = portfolioOwner.experience[0];
const experienceYears = Math.floor(portfolioOwner.totalExperienceMonths / 12);
const technologyCount = Object.values(portfolioOwner.skills).flat().length;

/* ─────────────── Small shared bits ─────────────── */

const ArrowIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
  </svg>
);

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-black/30 mb-3">
      {children}
    </span>
  );
}

/* ─────────────── Page Component ─────────────── */

export default function PortfolioClient({ initialRepos }: PortfolioClientProps) {
  const [repos, setRepos] = useState<GitHubRepo[]>(initialRepos ?? []);
  const [reposLoading, setReposLoading] = useState(initialRepos === null);
  const [reposError, setReposError] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // Scroll-spy: highlight whichever section nav item matches the section
  // currently at the top of the viewport (below the sticky header/nav bars).
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const topmost = visible.reduce((a, b) =>
          a.boundingClientRect.top <= b.boundingClientRect.top ? a : b
        );
        setActiveSection(topmost.target.id);
      },
      { rootMargin: "-140px 0px -70% 0px", threshold: 0 }
    );

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    elements.forEach((el) => observer.observe(el));

    // Fallback for the last section: if it's shorter than the trailing
    // footer whitespace, it can scroll past the observer's top band before
    // the page reaches its true bottom, so it would never register as
    // active. Force it active once the user has scrolled to the bottom.
    const lastSectionId = sectionIds[sectionIds.length - 1];
    function handleScroll() {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 150;
      if (atBottom) setActiveSection(lastSectionId);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchRepos = () => {
    setReposLoading(true);
    setReposError(false);
    fetch(
      `https://api.github.com/users/${portfolioOwner.githubUsername}/repos?sort=updated&per_page=12`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data: GitHubRepo[]) => {
        setRepos(data);
        setReposLoading(false);
      })
      .catch(() => {
        setReposError(true);
        setReposLoading(false);
      });
  };

  // The server already fetched repos (revalidated hourly). Only fetch here if
  // that failed or was skipped, so the common case has no loading flash.
  useEffect(() => {
    if (initialRepos === null) {
      fetchRepos();
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F1E8] animate-page-enter">
      <SiteHeader
        secondary={
          // Sticks to the same unit as the global header (see SiteHeader's
          // `secondary` prop) so both bars scroll together without overlap.
          // Horizontally scrollable, not `hidden` below md, so it's reachable
          // on mobile too.
          <nav
            aria-label="Portfolio sections"
            className="bg-[#F6F1E8]/95 backdrop-blur-md border-t border-black/5"
          >
            <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-3 overflow-x-auto">
              <span className="text-sm font-semibold tracking-tight text-black/70 whitespace-nowrap">
                {portfolioOwner.name}
              </span>
              {NAV_ITEMS.map((item) => {
                const active = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-current={active ? "location" : undefined}
                    className={`text-sm transition-colors tracking-wide whitespace-nowrap pb-0.5 border-b-2 ${
                      active
                        ? "text-black font-semibold border-[#CDA9EE]"
                        : "text-black/50 hover:text-black border-transparent"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </nav>
        }
      />
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: "Portfolio Demo" }]}
      />

      {/* ── Hero ── */}
      <section className="mx-4 md:mx-6 lg:mx-auto lg:max-w-6xl rounded-[24px] bg-gradient-to-br from-black via-[#111] to-[#1a1a1a] overflow-hidden mt-6">
        <div className="relative px-5 sm:px-8 md:px-16 py-16 sm:py-20 md:py-28">
          {/* Gradient orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full bg-[#CDA9EE]/10 blur-3xl" />
            <div className="absolute bottom-0 -left-20 w-[250px] h-[250px] rounded-full bg-[#A4C1EE]/10 blur-3xl" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left — Text & CTAs */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#CDA9EE]/60 mb-4">
                Portfolio
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                {portfolioOwner.name}
              </h1>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-3">
                <p className="text-xl md:text-2xl text-[#CDA9EE] font-medium tracking-tight">
                  {portfolioOwner.title}
                </p>
                <span className="rounded-full bg-white/10 border border-white/10 px-3 py-1 text-xs font-semibold text-white/60 tracking-wide">
                  {SPECIALIZATION}
                </span>
              </div>
              <p className="mt-6 text-base md:text-lg text-white/40 max-w-lg leading-relaxed">
                Senior Software Engineer specializing in AI-powered products and micro frontend
                architecture — building scalable, high-quality interfaces that ship real impact.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-10">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[#CDA9EE] text-black px-7 py-3.5 text-sm font-semibold tracking-wide hover:bg-[#c49de8] transition-colors"
                >
                  Get in Touch
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </a>
                <a
                  href="/AwadheshResume.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white/70 px-7 py-3.5 text-sm font-medium tracking-wide hover:border-white/40 hover:text-white transition-colors"
                >
                  Download Resume
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </a>
              </div>

              {/* Inline stat chips */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-10 pt-8 border-t border-white/10">
                <div>
                  <span className="text-2xl font-bold text-white tracking-tight">{experienceYears}+</span>
                  <span className="ml-1.5 text-xs text-white/40 tracking-wide">years experience</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-white tracking-tight">{portfolioOwner.experience.length}</span>
                  <span className="ml-1.5 text-xs text-white/40 tracking-wide">companies</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-white tracking-tight">{technologyCount}+</span>
                  <span className="ml-1.5 text-xs text-white/40 tracking-wide">technologies</span>
                </div>
              </div>
            </div>

            {/* Right — Avatar */}
            <div className="flex-shrink-0 hidden sm:block">
              <div className="relative">
                {/* Floating accent dots */}
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-[10px] bg-[#CDA9EE]/40 blur-[1px]" />
                <div className="absolute -bottom-3 -right-3 w-6 h-6 rounded-[8px] bg-[#A4C1EE]/40 blur-[1px]" />
                <div className="absolute top-1/2 -right-5 w-4 h-4 rounded-[6px] bg-[#FFD696]/50 blur-[1px]" />

                {/* Gradient border frame */}
                <div className="relative rounded-[28px] sm:rounded-[32px] p-[2px] bg-gradient-to-br from-[#CDA9EE]/70 via-[#A4C1EE]/50 to-[#FFD696]/70">
                  <div className="rounded-[26px] sm:rounded-[30px] overflow-hidden bg-[#111]">
                    <img
                      src={portfolioOwner.avatar}
                      alt={portfolioOwner.name}
                      width={320}
                      height={380}
                      className="w-56 h-64 sm:w-64 sm:h-[300px] lg:w-72 lg:h-[340px] object-cover"
                    />
                  </div>
                </div>

                {/* Corner accent line */}
                <div className="absolute -bottom-2 -left-2 w-16 h-16 border-b-2 border-l-2 border-[#CDA9EE]/30 rounded-bl-[20px]" />
                <div className="absolute -top-2 -right-2 w-16 h-16 border-t-2 border-r-2 border-[#A4C1EE]/30 rounded-tr-[20px]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About Section ── */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <Reveal className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-14 items-start">
          <div>
            <SectionEyebrow>About</SectionEyebrow>
            <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight mb-6">
              A bit about my work
            </h2>
            <p className="text-base md:text-lg text-black/50 leading-relaxed">{portfolioOwner.summary}</p>
            <p className="mt-4 text-base text-black/40 leading-relaxed">
              Currently at {currentRole.company}: &ldquo;{currentRole.bullets[0]}&rdquo;
            </p>
          </div>

          {/* Quick facts card */}
          <div className="rounded-[20px] bg-white border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 sm:p-7">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/30 mb-5">Quick Facts</h3>
            <dl className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <dt className="text-sm text-black/40">Current role</dt>
                <dd className="text-sm font-medium text-black/70 text-right">
                  {currentRole.role} @ {currentRole.company}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-sm text-black/40">Experience</dt>
                <dd className="text-sm font-medium text-black/70">{experienceYears}+ years</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-sm text-black/40">Specialization</dt>
                <dd className="text-sm font-medium text-black/70 text-right">{SPECIALIZATION}</dd>
              </div>
              <div className="pt-4 border-t border-black/5">
                <dt className="text-sm text-black/40 mb-2">Education</dt>
                {portfolioOwner.education.map((edu) => (
                  <dd key={edu.degree} className="text-sm font-medium text-black/70 leading-snug">
                    {edu.degree}
                    <span className="block text-xs font-normal text-black/40 mt-0.5">
                      {edu.institution} &middot; {edu.year}
                    </span>
                  </dd>
                ))}
              </div>
            </dl>
          </div>
        </Reveal>
      </section>

      {/* ── Skills Section ── */}
      <section id="skills" className="scroll-mt-[150px] mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <Reveal className="text-center mb-14">
          <SectionEyebrow>Expertise</SectionEyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">Skills &amp; Technologies</h2>
          <p className="mt-3 text-base text-black/40 max-w-md mx-auto">
            Grouped by where they fit in the stack — from interface to infrastructure.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Object.entries(portfolioOwner.skills).map(([group, skills], i) => {
            const style = SKILL_GROUP_STYLE[group] ?? { bg: "bg-[#CDA9EE]/15", text: "text-[#8B5EC0]", iconBg: "bg-[#CDA9EE]" };
            return (
              <Reveal key={group} delay={i * 60}>
                <div
                  className={`group h-full ${style.bg} rounded-[20px] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg ${style.iconBg} flex items-center justify-center text-black/70 mb-4 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      {SKILL_GROUP_ICONS[group]}
                    </svg>
                  </div>
                  <h3 className={`text-sm font-semibold ${style.text} tracking-tight mb-4`}>{group}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-white/60 border border-black/5 px-3 py-1 text-xs font-medium text-black/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── Experience Section ── */}
      <section
        id="experience"
        className="scroll-mt-[150px] mx-4 md:mx-6 lg:mx-auto lg:max-w-6xl rounded-[24px] bg-white border border-black/5 shadow-[0_4px_40px_rgba(0,0,0,0.03)] overflow-hidden mb-20"
      >
        <div className="p-5 sm:p-8 md:p-12">
          <Reveal>
            <SectionEyebrow>Career</SectionEyebrow>
            <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight mb-10">Work Experience</h2>
          </Reveal>

          <div className="space-y-0">
            {portfolioOwner.experience.map((exp, i) => (
              <Reveal key={exp.company} delay={i * 70}>
                <div className="group relative pl-8 pb-10 last:pb-0">
                  {/* Timeline line */}
                  {i < portfolioOwner.experience.length - 1 && (
                    <div className="absolute left-[7px] top-3 bottom-0 w-[2px] bg-[#CDA9EE]/30" />
                  )}
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-[#CDA9EE] border-4 border-white transition-transform duration-300 group-hover:scale-125" />

                  <div className="rounded-2xl -mx-3 px-3 py-2 transition-colors duration-300 group-hover:bg-black/[0.02]">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                      <div className="min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-black tracking-tight break-words">{exp.company}</h3>
                        <p className="text-sm font-medium text-[#8B5EC0]">{exp.role}</p>
                      </div>
                      <span className="inline-flex w-fit items-center rounded-full bg-black/5 px-3 py-1 text-xs text-black/40 font-medium tracking-wide whitespace-nowrap">
                        {exp.duration}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {exp.bullets.map((bullet, j) => (
                        <li key={j} className="flex gap-2 text-sm text-black/50 leading-relaxed">
                          <svg className="w-4 h-4 text-[#CDA9EE] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects Section ── */}
      <section id="projects" className="scroll-mt-[150px] mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <Reveal className="text-center mb-14">
          <SectionEyebrow>Work</SectionEyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">Featured Projects</h2>
          <p className="mt-3 text-base text-black/40 max-w-md mx-auto">
            Personal projects — built, shipped, and maintained end-to-end.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => {
            const featured = i === 0;
            return (
              <Reveal key={project.id} delay={i * 80} className={featured ? "md:col-span-2" : undefined}>
                <div
                  className={`group h-full rounded-[20px] p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 ${
                    featured
                      ? "bg-gradient-to-br from-black via-[#111] to-[#1a1a1a] shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.25)]"
                      : "bg-white border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {featured && (
                        <span className="rounded-full bg-[#CDA9EE] text-black px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider flex-shrink-0">
                          Featured
                        </span>
                      )}
                      <h3 className={`text-base sm:text-lg font-bold tracking-tight min-w-0 break-words ${featured ? "text-white" : "text-black"}`}>
                        {project.title}
                      </h3>
                    </div>
                    <span
                      className={`rounded-full px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider flex-shrink-0 ${
                        featured ? "bg-white/10 text-white/60" : "bg-[#CDA9EE]/15 text-[#8B5EC0]"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <p className={`text-sm leading-relaxed mb-2 ${featured ? "text-white/50" : "text-black/40"}`}>
                    {project.description}
                  </p>
                  <p className={`text-xs font-medium mb-5 ${featured ? "text-white/30" : "text-black/30"}`}>
                    Solo project &middot; built end-to-end
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                          featured ? "bg-white/5 border-white/10 text-white/50" : "bg-[#F6F1E8] border-black/5 text-black/50"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#CDA9EE] text-black px-4 py-2 text-xs font-semibold hover:bg-[#c49de8] transition-colors"
                      >
                        Live Demo
                        {ArrowIcon}
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                          featured
                            ? "border-white/15 text-white/50 hover:border-white/30 hover:text-white/80"
                            : "border-black/10 text-black/50 hover:border-black/20 hover:text-black/70"
                        }`}
                      >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        Source
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── More on GitHub (secondary, lighter) ── */}
      <section className="mx-4 md:mx-6 lg:mx-auto lg:max-w-6xl mb-20">
        <Reveal className="rounded-[24px] bg-black/90 overflow-hidden">
          <div className="p-5 sm:p-8 md:p-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-white/30 mb-2">
                  Open Source
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">More on GitHub</h2>
              </div>
              <a
                href={portfolioOwner.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/20 text-white/50 px-4 py-2 text-xs font-medium hover:border-white/40 hover:text-white transition-colors"
              >
                View All
                {ArrowIcon}
              </a>
            </div>

            {/* Loading skeleton */}
            {reposLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="rounded-[16px] bg-white/5 border border-white/10 p-5 animate-pulse">
                    <div className="h-4 bg-white/10 rounded w-2/3 mb-3" />
                    <div className="h-3 bg-white/5 rounded w-full mb-2" />
                    <div className="h-3 bg-white/5 rounded w-4/5" />
                  </div>
                ))}
              </div>
            )}

            {/* Error state */}
            {reposError && (
              <div className="text-center py-10">
                <p className="text-white/40 mb-4 text-sm">Failed to load repositories.</p>
                <button
                  onClick={fetchRepos}
                  className="rounded-full bg-[#CDA9EE] text-black px-6 py-2.5 text-sm font-semibold hover:bg-[#c49de8] transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Repo cards */}
            {!reposLoading && !reposError && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {repos.slice(0, 6).map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-[16px] bg-white/5 border border-white/10 p-5 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(205,169,238,0.1)] hover:border-[#CDA9EE]/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-sm font-semibold text-white/80 group-hover:text-[#CDA9EE] transition-colors tracking-tight truncate">
                        {repo.name}
                      </h3>
                      <svg className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </div>
                    <p className="text-xs text-white/30 leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">
                      {repo.description || "No description"}
                    </p>
                    <div className="flex items-center gap-4">
                      {repo.language && (
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2.5 h-2.5 rounded-full ${LANGUAGE_COLORS[repo.language] || "bg-white/30"}`} />
                          <span className="text-[11px] text-white/40">{repo.language}</span>
                        </div>
                      )}
                      {repo.stargazers_count > 0 && (
                        <div className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                          </svg>
                          <span className="text-[11px] text-white/40">{repo.stargazers_count}</span>
                        </div>
                      )}
                      {repo.forks_count > 0 && (
                        <div className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                          </svg>
                          <span className="text-[11px] text-white/40">{repo.forks_count}</span>
                        </div>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </section>

      {/* ── Contact Section ── */}
      <section id="contact" className="scroll-mt-[150px] mx-auto max-w-4xl px-6 pb-20 md:pb-28 text-center">
        <Reveal>
          <SectionEyebrow>Connect</SectionEyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">Get in Touch</h2>
          <p className="mt-3 text-base text-black/40 max-w-md mx-auto">
            Use the chat assistant to learn more about my work, or reach out directly.
          </p>

          <a
            href={`mailto:${portfolioOwner.email}`}
            className="inline-flex items-center gap-2 mt-8 rounded-full bg-[#CDA9EE] text-black px-8 py-4 text-sm font-semibold tracking-wide hover:bg-[#c49de8] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            Send an Email
          </a>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <a
              href={`tel:${portfolioOwner.phone}`}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-2.5 text-sm text-black/60 hover:border-black/20 hover:text-black transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              {portfolioOwner.phone}
            </a>
            <a
              href={portfolioOwner.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-2.5 text-sm text-black/60 hover:border-black/20 hover:text-black transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a
              href={portfolioOwner.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-2.5 text-sm text-black/60 hover:border-black/20 hover:text-black transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              {portfolioOwner.githubUsername}
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── Footer ── */}
      <div className="mx-auto max-w-6xl px-6 pt-2">
        <p className="text-xs text-black/20 tracking-wide text-center sm:text-left">
          &copy; {new Date().getFullYear()} {portfolioOwner.name}. All rights reserved.
        </p>
      </div>
      <SiteFooter />

      {/* Chat Widget */}
      <ChatWidget config={portfolioConfig} />
    </div>
  );
}
