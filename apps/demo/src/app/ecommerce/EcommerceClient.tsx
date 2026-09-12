"use client";

import React from "react";
import Link from "next/link";
import { ChatWidget } from "@chatbot/ui";
import { ecommerceConfig } from "@/contexts/ecommerce-config";
import { products } from "@/lib/demo-data";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function EcommerceClient() {
  return (
    <div className="min-h-screen bg-amber-50">
      <SiteHeader />
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: "TechStore Demo" }]}
      />

      {/* Local demo bar */}
      <header className="border-b border-amber-200 bg-white mt-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-2xl font-bold text-amber-900">TechStore</span>
          <span className="text-xs font-semibold uppercase tracking-wider rounded-full px-2.5 py-1 bg-amber-100 text-amber-700">
            Chatbot Widget Demo
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-amber-100 to-amber-50 py-16 text-center">
        <h2 className="text-4xl font-bold text-amber-900 mb-3">Shop the Latest Tech</h2>
        <p className="text-amber-700 mb-2">
          Use the chat assistant to find the perfect product for you
        </p>
        <a href="#products" className="text-amber-600 text-sm hover:underline">
          See products below
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

      <SiteFooter />

      {/* Chat Widget */}
      <ChatWidget config={ecommerceConfig} />
    </div>
  );
}
