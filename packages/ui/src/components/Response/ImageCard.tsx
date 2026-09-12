"use client";

import React from "react";

interface ImageCardProps {
  image: {
    url: string;
    alt?: string;
    caption?: string;
  };
}

export function ImageCard({ image }: ImageCardProps) {
  return (
    <div className="rounded-chatbot border border-chatbot-border overflow-hidden animate-chatbot-slide-up">
      <img
        src={image.url}
        alt={image.alt ?? ""}
        className="w-full object-cover"
        loading="lazy"
      />
      {image.caption && (
        <p className="bg-chatbot-surface px-3 py-2 text-chatbot-sm text-chatbot-text-secondary">
          {image.caption}
        </p>
      )}
    </div>
  );
}
