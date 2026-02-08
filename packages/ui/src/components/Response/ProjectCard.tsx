"use client";

import React from "react";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    image?: string;
    url?: string;
    technologies?: string[];
    status?: "completed" | "in-progress" | "planned";
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const statusColors = {
    completed: "bg-chatbot-success/10 text-chatbot-success",
    "in-progress": "bg-chatbot-primary/10 text-chatbot-primary",
    planned: "bg-chatbot-secondary/10 text-chatbot-text-secondary",
  };

  return (
    <div className="rounded-chatbot border border-chatbot-border bg-chatbot-surface overflow-hidden animate-chatbot-slide-up">
      {project.image && (
        <div className="h-32 w-full overflow-hidden bg-chatbot-surface-hover">
          <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
        </div>
      )}
      <div className="flex flex-col gap-2 p-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-medium text-chatbot-base text-chatbot-text">{project.title}</h4>
          {project.status && (
            <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${statusColors[project.status]}`}>
              {project.status}
            </span>
          )}
        </div>
        <p className="text-chatbot-sm text-chatbot-text-secondary line-clamp-2">{project.description}</p>
        {project.technologies?.length ? (
          <div className="flex flex-wrap gap-1">
            {project.technologies.map((tech) => (
              <span key={tech} className="rounded-full bg-chatbot-primary-light px-2 py-0.5 text-xs text-chatbot-primary">
                {tech}
              </span>
            ))}
          </div>
        ) : null}
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-chatbot-sm text-chatbot-primary hover:underline"
          >
            View project →
          </a>
        )}
      </div>
    </div>
  );
}
