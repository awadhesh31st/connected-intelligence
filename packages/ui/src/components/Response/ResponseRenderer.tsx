"use client";

import React from "react";
import type { MessagePart } from "@chatbot/core";
import { ProductCard } from "./ProductCard";
import { ProjectCard } from "./ProjectCard";
import { SourceCard } from "./SourceCard";
import { ImageCard } from "./ImageCard";

interface ResponseRendererProps {
  parts: MessagePart[];
}

export function ResponseRenderer({ parts }: ResponseRendererProps) {
  return (
    <div className="flex flex-col gap-2">
      {parts.map((part, index) => {
        switch (part.type) {
          case "product-card":
            return <ProductCard key={index} product={part.product} />;
          case "project-card":
            return <ProjectCard key={index} project={part.project} />;
          case "source-card":
            return <SourceCard key={index} source={part.source} />;
          case "image-card":
            return <ImageCard key={index} image={part.image} />;
          case "text":
            return null; // Text handled by message bubble
          default:
            return null;
        }
      })}
    </div>
  );
}
