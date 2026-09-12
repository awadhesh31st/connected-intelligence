"use client";

import React from "react";
import { ChatWidget } from "@chatbot/ui";
import { ecommerceConfig } from "@/contexts/ecommerce-config";
import { products } from "@/lib/demo-data";

export default function EcommercePage() {
  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <header className="border-b border-amber-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-amber-900">TechStore</h1>
          <nav className="flex gap-6 text-sm text-amber-700">
            <a href="#products" className="hover:text-amber-900">Products</a>
            <span className="text-amber-400 cursor-default relative group">
              Deals
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-white bg-amber-900 rounded px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Coming Soon
              </span>
            </span>
            <span className="text-amber-400 cursor-default relative group">
              Support
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-white bg-amber-900 rounded px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Coming Soon
              </span>
            </span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-amber-100 to-amber-50 py-16 text-center">
        <h2 className="text-4xl font-bold text-amber-900 mb-3">Shop the Latest Tech</h2>
        <p className="text-amber-700 mb-2">
          Use the chat assistant to find the perfect product for you
        </p>
        <a href="/" className="text-amber-600 text-sm hover:underline">
          ← Back to home
        </a>
      </section>

      {/* Product Grid */}
      <section id="products" className="mx-auto max-w-6xl px-6 py-12">
        <h3 className="text-xl font-semibold text-amber-900 mb-6">Featured Products</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-xl border border-amber-200 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 bg-amber-100 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-32 w-32 object-contain"
                />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-900">{product.name}</h4>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-bold text-amber-700">
                    ${product.price.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
                {!product.inStock && (
                  <span className="mt-2 inline-block text-xs text-red-500">Out of stock</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chat Widget */}
      <ChatWidget config={ecommerceConfig} />
    </div>
  );
}
