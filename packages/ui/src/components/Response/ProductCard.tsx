"use client";

import React from "react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    currency: string;
    image?: string;
    description?: string;
    url?: string;
    rating?: number;
    inStock?: boolean;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(price);
  };

  return (
    <div className="flex gap-3 rounded-chatbot border border-chatbot-border bg-chatbot-surface p-3 animate-chatbot-slide-up">
      {product.image && (
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-chatbot bg-chatbot-surface-hover">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-1">
        <h4 className="font-medium text-chatbot-base text-chatbot-text">{product.name}</h4>
        {product.description && (
          <p className="text-chatbot-sm text-chatbot-text-secondary line-clamp-2">{product.description}</p>
        )}
        <div className="flex items-center gap-2 mt-auto">
          <span className="font-semibold text-chatbot-primary">
            {formatPrice(product.price, product.currency)}
          </span>
          {product.rating && (
            <span className="text-chatbot-sm text-chatbot-text-secondary">
              {"★".repeat(Math.round(product.rating))} {product.rating}
            </span>
          )}
          {product.inStock === false && (
            <span className="text-chatbot-sm text-chatbot-error">Out of stock</span>
          )}
        </div>
        {product.url && (
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 text-chatbot-sm text-chatbot-primary hover:underline"
          >
            View product →
          </a>
        )}
      </div>
    </div>
  );
}
