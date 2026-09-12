import type { Metadata } from "next";
import EcommerceClient from "./EcommerceClient";

export const metadata: Metadata = {
  title: "TechStore — AI Shopping Assistant Demo",
  description:
    "See the chatbot widget in action as a shopping assistant that recommends products from a live catalog using Google Gemini.",
};

export default function EcommercePage() {
  return <EcommerceClient />;
}
