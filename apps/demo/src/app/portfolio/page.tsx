"use client";

import React from "react";
import { ChatWidget } from "@chatbot/ui";
import { portfolioConfig } from "@/contexts/portfolio-config";
import { projects, portfolioOwner } from "@/lib/demo-data";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-700">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold text-purple-400">{portfolioOwner.name}</h1>
          <nav className="flex gap-6 text-sm text-slate-400">
            <a href="#projects" className="hover:text-white">Projects</a>
            <a href="#skills" className="hover:text-white">Skills</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 text-center">
        <h2 className="text-5xl font-bold mb-4">
          Hi, I&apos;m{" "}
          <span className="text-purple-400">{portfolioOwner.name}</span>
        </h2>
        <p className="mx-auto max-w-xl text-slate-400 mb-4">{portfolioOwner.bio}</p>
        <a href="/" className="text-purple-400 text-sm hover:underline">
          ← Back to demo selector
        </a>
      </section>

      {/* Skills */}
      <section id="skills" className="mx-auto max-w-4xl px-6 py-12">
        <h3 className="text-xl font-semibold text-purple-300 mb-4">Skills & Technologies</h3>
        <div className="flex flex-wrap gap-2">
          {portfolioOwner.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-purple-900/50 border border-purple-700 px-3 py-1 text-sm text-purple-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-6xl px-6 py-12">
        <h3 className="text-xl font-semibold text-purple-300 mb-6">Featured Projects</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800 hover:border-purple-600 transition-colors"
            >
              <div className="h-48 bg-slate-700 flex items-center justify-center">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover opacity-80"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">{project.title}</h4>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      project.status === "completed"
                        ? "bg-green-900/50 text-green-400"
                        : "bg-purple-900/50 text-purple-400"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-slate-700 px-2 py-0.5 text-xs text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-4xl px-6 py-12 text-center">
        <h3 className="text-xl font-semibold text-purple-300 mb-4">Get in Touch</h3>
        <p className="text-slate-400 mb-4">
          Use the chat assistant to learn more about my work, or reach out directly.
        </p>
        <div className="flex justify-center gap-4 text-sm">
          <span className="text-purple-400/50 cursor-default relative group">
            Email
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-white bg-purple-900 rounded px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Demo Only
            </span>
          </span>
          <span className="text-purple-400/50 cursor-default relative group">
            GitHub
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-white bg-purple-900 rounded px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Demo Only
            </span>
          </span>
          <span className="text-purple-400/50 cursor-default relative group">
            LinkedIn
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-white bg-purple-900 rounded px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Demo Only
            </span>
          </span>
        </div>
      </section>

      {/* Chat Widget */}
      <ChatWidget config={portfolioConfig} />
    </div>
  );
}
