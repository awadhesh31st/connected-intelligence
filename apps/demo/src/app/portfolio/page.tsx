"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChatWidget } from "@chatbot/ui";
import { portfolioConfig } from "@/contexts/portfolio-config";
import { projects, portfolioOwner } from "@/lib/demo-data";

/* ─────────────── Types ─────────────── */

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

/* ─────────────── Constants ─────────────── */

const NAV_ITEMS = [
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const SKILL_GROUP_COLORS: Record<string, { bg: string; text: string }> = {
  Frontend: { bg: "bg-[#CDA9EE]/20", text: "text-[#8B5EC0]" },
  Backend: { bg: "bg-[#A4C1EE]/20", text: "text-[#5B8BC9]" },
  "State Management": { bg: "bg-[#FFD696]/20", text: "text-[#B8862D]" },
  Testing: { bg: "bg-[#CDA9EE]/20", text: "text-[#8B5EC0]" },
  "UI / Styling": { bg: "bg-[#A4C1EE]/20", text: "text-[#5B8BC9]" },
  Architecture: { bg: "bg-[#FFD696]/20", text: "text-[#B8862D]" },
  Performance: { bg: "bg-[#CDA9EE]/20", text: "text-[#8B5EC0]" },
  DevOps: { bg: "bg-[#A4C1EE]/20", text: "text-[#5B8BC9]" },
};

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "bg-[#3178C6]",
  JavaScript: "bg-[#F7DF1E]",
  HTML: "bg-[#E34F26]",
  CSS: "bg-[#1572B6]",
  Python: "bg-[#3776AB]",
  Shell: "bg-[#89E051]",
};

/* ─────────────── Page Component ─────────────── */

export default function PortfolioPage() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [reposLoading, setReposLoading] = useState(true);
  const [reposError, setReposError] = useState(false);

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

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F1E8]">
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-[#F6F1E8]/80 backdrop-blur-md border-b border-black/5">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-lg font-bold tracking-tight text-black">
            {portfolioOwner.name}
          </span>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-black/50 hover:text-black transition-colors tracking-wide"
              >
                {item.label}
              </a>
            ))}
          </div>

          <Link
            href="/"
            className="text-sm text-black/40 hover:text-black transition-colors tracking-wide"
          >
            &larr; Home
          </Link>
        </div>
      </nav>

      {/* ── Hero Section — Dark ── */}
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
              <p className="mt-3 text-xl md:text-2xl text-[#CDA9EE] font-medium tracking-tight">
                {portfolioOwner.title}
              </p>
              <p className="mt-6 text-base md:text-lg text-white/40 max-w-lg leading-relaxed">
                {portfolioOwner.summary}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-10">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[#CDA9EE] text-black px-7 py-3.5 text-sm font-semibold tracking-wide hover:bg-[#c49de8] transition-colors"
                >
                  Contact Me
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

      {/* ── Highlights Section ── */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* Experience */}
          <div className="rounded-[20px] bg-[#CDA9EE]/20 p-4 sm:p-5 flex flex-col overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-[#CDA9EE] flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-black tracking-tight">{Math.floor(portfolioOwner.totalExperienceMonths / 12)}+</p>
            <p className="text-[11px] sm:text-xs text-black/40 font-medium tracking-wide mt-1">Years of Experience</p>
          </div>

          {/* Companies */}
          <div className="rounded-[20px] bg-[#A4C1EE]/20 p-4 sm:p-5 flex flex-col overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-[#A4C1EE] flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
              </svg>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-black tracking-tight">4</p>
            <p className="text-[11px] sm:text-xs text-black/40 font-medium tracking-wide mt-1">Companies Worked</p>
          </div>

          {/* Technologies */}
          <div className="rounded-[20px] bg-[#FFD696]/20 p-4 sm:p-5 flex flex-col overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-[#FFD696] flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-black/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L12 12.75 6.429 9.75m11.142 0 4.179 2.25L12 17.25 2.25 12l4.179-2.25" />
              </svg>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-black tracking-tight">{Object.values(portfolioOwner.skills).flat().length}+</p>
            <p className="text-[11px] sm:text-xs text-black/40 font-medium tracking-wide mt-1">Technologies Mastered</p>
          </div>

          {/* Current Role */}
          <div className="rounded-[20px] bg-[#CDA9EE]/20 p-4 sm:p-5 flex flex-col overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-[#CDA9EE] flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
              </svg>
            </div>
            <p className="text-lg sm:text-2xl font-bold text-black tracking-tight">Cisco</p>
            <p className="text-[11px] sm:text-xs text-black/40 font-medium tracking-wide mt-1">Current Employer</p>
          </div>

          {/* Specialization */}
          <div className="col-span-2 sm:col-span-1 rounded-[20px] bg-white border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-4 sm:p-5 flex sm:flex-col items-center sm:items-start gap-4 sm:gap-0 min-w-0 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-[#A4C1EE]/20 flex items-center justify-center flex-shrink-0 sm:mb-4">
              <svg className="w-5 h-5 text-[#5B8BC9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-black tracking-tight sm:text-xl">AI & Micro Frontends</p>
              <p className="text-[11px] sm:text-xs text-black/40 font-medium tracking-wide mt-0.5 sm:mt-1">Core Specialization</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills Section ── */}
      <section id="skills" className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-black/30 mb-3">
            Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
            Skills & Technologies
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Object.entries(portfolioOwner.skills).map(([group, skills]) => {
            const colors = SKILL_GROUP_COLORS[group] || { bg: "bg-[#CDA9EE]/20", text: "text-[#8B5EC0]" };
            return (
              <div
                key={group}
                className={`${colors.bg} rounded-[20px] p-6 transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]`}
              >
                <h3 className={`text-sm font-semibold ${colors.text} tracking-tight mb-4`}>
                  {group}
                </h3>
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
            );
          })}
        </div>
      </section>

      {/* ── Experience Section ── */}
      <section id="experience" className="mx-4 md:mx-6 lg:mx-auto lg:max-w-6xl rounded-[24px] bg-white border border-black/5 shadow-[0_4px_40px_rgba(0,0,0,0.03)] overflow-hidden mb-20">
        <div className="p-5 sm:p-8 md:p-12">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-black/30 mb-3">
            Career
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight mb-10">
            Work Experience
          </h2>

          <div className="space-y-0">
            {portfolioOwner.experience.map((exp, i) => (
              <div key={exp.company} className="relative pl-8 pb-10 last:pb-0">
                {/* Timeline line */}
                {i < portfolioOwner.experience.length - 1 && (
                  <div className="absolute left-[7px] top-3 bottom-0 w-[2px] bg-[#CDA9EE]/30" />
                )}
                {/* Timeline dot */}
                <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-[#CDA9EE] border-4 border-white" />

                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-black tracking-tight break-words">{exp.company}</h3>
                      <p className="text-sm font-medium text-[#8B5EC0]">{exp.role}</p>
                    </div>
                    <span className="text-xs text-black/30 font-medium tracking-wide whitespace-nowrap">
                      {exp.duration}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, j) => (
                      <li key={j} className="flex gap-2 text-sm text-black/50 leading-relaxed">
                        <span className="text-[#CDA9EE] mt-1 flex-shrink-0">&bull;</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects Section ── */}
      <section id="projects" className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-black/30 mb-3">
            Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
            Featured Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-[20px] bg-white border border-black/5 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <h3 className="text-base font-bold text-black tracking-tight min-w-0 break-words">{project.title}</h3>
                <span className="rounded-full bg-[#CDA9EE]/15 text-[#8B5EC0] px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider flex-shrink-0">
                  {project.status}
                </span>
              </div>
              <p className="text-sm text-black/40 leading-relaxed mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-[#F6F1E8] border border-black/5 px-2.5 py-0.5 text-[11px] font-medium text-black/50"
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
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-black/10 text-black/50 px-4 py-2 text-xs font-medium hover:border-black/20 hover:text-black/70 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Source
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Education Section ── */}
      <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-black/30 mb-3">
            Education
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
            Academic Background
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {portfolioOwner.education.map((edu) => (
            <div
              key={edu.degree}
              className="rounded-[20px] bg-white border border-black/5 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
            >
              <div className="w-10 h-10 rounded-xl bg-[#A4C1EE]/20 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-[#5B8BC9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                </svg>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-black tracking-tight mb-1 break-words">{edu.degree}</h3>
              <p className="text-xs sm:text-sm text-black/40 mb-2 break-words">{edu.institution}</p>
              <span className="text-xs font-medium text-[#5B8BC9] tracking-wide">{edu.year}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── GitHub Repositories Section ── */}
      <section className="mx-4 md:mx-6 lg:mx-auto lg:max-w-6xl rounded-[24px] bg-gradient-to-br from-black via-[#111] to-[#1a1a1a] overflow-hidden mb-20">
        <div className="p-5 sm:p-8 md:p-12">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-white/30 mb-3">
                Open Source
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                GitHub Repositories
              </h2>
            </div>
            <a
              href={portfolioOwner.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/20 text-white/50 px-5 py-2.5 text-sm font-medium hover:border-white/40 hover:text-white transition-colors"
            >
              View All
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>

          {/* Loading skeleton */}
          {reposLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-[16px] bg-white/5 border border-white/10 p-5 animate-pulse">
                  <div className="h-4 bg-white/10 rounded w-2/3 mb-3" />
                  <div className="h-3 bg-white/5 rounded w-full mb-2" />
                  <div className="h-3 bg-white/5 rounded w-4/5 mb-4" />
                  <div className="flex gap-3">
                    <div className="h-3 bg-white/5 rounded w-16" />
                    <div className="h-3 bg-white/5 rounded w-10" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error state */}
          {reposError && (
            <div className="text-center py-12">
              <p className="text-white/40 mb-4">Failed to load repositories.</p>
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
              {repos.map((repo) => (
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
      </section>

      {/* ── Contact Section ── */}
      <section id="contact" className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-black/30 mb-3">
            Connect
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
            Get in Touch
          </h2>
          <p className="mt-3 text-base text-black/40 max-w-md mx-auto">
            Use the chat assistant to learn more about my work, or reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
          <a
            href={`mailto:${portfolioOwner.email}`}
            className="rounded-[20px] bg-[#CDA9EE]/20 p-4 sm:p-6 text-center hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow group overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-[#CDA9EE] flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </div>
            <p className="text-xs font-semibold text-black/30 tracking-wide uppercase mb-1">Email</p>
            <p className="text-xs sm:text-sm text-black/60 group-hover:text-black transition-colors break-all">{portfolioOwner.email}</p>
          </a>

          <a
            href={`tel:${portfolioOwner.phone}`}
            className="rounded-[20px] bg-[#A4C1EE]/20 p-4 sm:p-6 text-center hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow group overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-[#A4C1EE] flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
            </div>
            <p className="text-xs font-semibold text-black/30 tracking-wide uppercase mb-1">Phone</p>
            <p className="text-xs sm:text-sm text-black/60 group-hover:text-black transition-colors">{portfolioOwner.phone}</p>
          </a>

          <a
            href={portfolioOwner.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[20px] bg-[#FFD696]/20 p-4 sm:p-6 text-center hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow group overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FFD696] flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-black/70" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
            <p className="text-xs font-semibold text-black/30 tracking-wide uppercase mb-1">LinkedIn</p>
            <p className="text-xs sm:text-sm text-black/60 group-hover:text-black transition-colors">kawadhe</p>
          </a>

          <a
            href={portfolioOwner.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[20px] bg-[#CDA9EE]/20 p-4 sm:p-6 text-center hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow group overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-[#CDA9EE] flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
            <p className="text-xs font-semibold text-black/30 tracking-wide uppercase mb-1">GitHub</p>
            <p className="text-sm text-black/60 group-hover:text-black transition-colors">{portfolioOwner.githubUsername}</p>
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="mx-auto max-w-6xl px-6 pb-12 pt-8 border-t border-black/5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-base font-bold text-black tracking-tight">
            {portfolioOwner.name}
          </span>
          <p className="text-xs text-black/20 tracking-wide">
            &copy; {new Date().getFullYear()} {portfolioOwner.name}. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget config={portfolioConfig} />
    </div>
  );
}
