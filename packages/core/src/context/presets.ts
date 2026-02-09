import type { PlatformContext } from "../types/context";
import { ContextBuilder } from "./context-builder";

export function createEcommerceContext(
  storeName: string,
  options?: {
    products?: unknown[];
    categories?: string[];
  }
): PlatformContext {
  const builder = new ContextBuilder()
    .setIdentity(
      `${storeName} Shopping Assistant`,
      "ecommerce",
      `I help customers find and learn about products at ${storeName}.`
    )
    .setTone("friendly")
    .setResponseStyle("conversational")
    .setTopicBoundaries([
      "product recommendations",
      "product details",
      "pricing",
      "availability",
      "comparisons",
      "shopping assistance",
    ])
    .setForbiddenTopics(["competitor pricing", "personal opinions on politics"])
    .setFallbackMessage(
      `I'm here to help you shop at ${storeName}! Ask me about our products, recommendations, or anything shopping-related.`
    )
    .addInstructions([
      "Help customers find products that match their needs",
      "Provide accurate product information including price, features, and availability",
      "Suggest related products when relevant",
      "Be helpful with size guides, comparisons, and recommendations",
      "If a product is out of stock, suggest alternatives",
      "When recommending products, format them as structured product cards when possible",
    ])
    .setWelcomeMessage(
      `Welcome to ${storeName}! 👋 I'm your shopping assistant. How can I help you find what you're looking for?`
    )
    .setPlaceholder("Ask about products, sizes, recommendations...")
    .setSuggestedPrompts([
      "What are your best sellers?",
      "Help me find a gift",
      "What's on sale?",
      "Compare two products",
    ])
    .setQuickReplies(["Show deals", "New arrivals", "Help me choose"]);

  if (options?.products) {
    builder.setDynamicData({ products: options.products });
  }

  return builder.build();
}

export interface PortfolioExperience {
  company: string;
  role: string;
  duration: string;
  bullets: string[];
}

export interface PortfolioEducation {
  degree: string;
  institution: string;
  year: string;
}

export interface PortfolioContact {
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
}

export interface PortfolioProject {
  title: string;
  description: string;
  technologies: string[];
  status: string;
  demoUrl?: string;
  githubUrl?: string;
}

export interface PortfolioOptions {
  projects?: PortfolioProject[];
  skills?: Record<string, string[]> | string[];
  bio?: string;
  title?: string;
  experience?: PortfolioExperience[];
  education?: PortfolioEducation[];
  contact?: PortfolioContact;
  totalExperienceMonths?: number;
}

export function createPortfolioContext(
  ownerName: string,
  options?: PortfolioOptions
): PlatformContext {
  const builder = new ContextBuilder()
    .setIdentity(
      `${ownerName}'s Portfolio Assistant`,
      "portfolio",
      `I help visitors learn about ${ownerName}'s work, skills, and experience. I answer as if I am ${ownerName}'s personal representative and have full knowledge of their background.`
    )
    .setTone("professional")
    .setResponseStyle("detailed")
    .setTopicBoundaries([
      "projects",
      "skills",
      "experience",
      "education",
      "contact information",
      "work process",
      "technologies",
      "career history",
    ])
    .setFallbackMessage(
      `I'm here to tell you about ${ownerName}'s work and experience. What would you like to know?`
    )
    .addInstructions([
      `You represent ${ownerName}'s professional portfolio. Answer questions in first person as if speaking on behalf of ${ownerName} (e.g. "I have experience with..." or "${ownerName} has experience with...").`,
      "Always ground your answers in the provided portfolio data below. Do NOT invent or assume facts not present in the data.",
      "When asked about skills, reference the specific skill categories and individual technologies listed.",
      "When asked about experience, mention specific companies, roles, durations, and key accomplishments.",
      "When asked about projects, include the project name, description, technologies used, and links (demo/GitHub) when available.",
      "When asked about education, provide the degree, institution, and year.",
      "When asked about contact info, share only the details provided in the data.",
      "If asked something not covered by the portfolio data, say so honestly rather than guessing.",
      "Keep responses concise but informative. Use bullet points or structured formatting for lists.",
    ]);

  // Build facts from actual data
  const facts: string[] = [];

  if (options?.bio) {
    facts.push(`Professional summary: ${options.bio}`);
  }

  if (options?.title) {
    facts.push(`Current title: ${options.title}`);
  }

  if (options?.totalExperienceMonths) {
    const years = Math.floor(options.totalExperienceMonths / 12);
    facts.push(`Total professional experience: ${years}+ years (${options.totalExperienceMonths} months)`);
  }

  if (options?.experience?.length) {
    facts.push(`Has worked at ${options.experience.length} companies: ${options.experience.map((e) => e.company).join(", ")}`);
    facts.push(
      `Career timeline:\n${options.experience
        .map((e) => `  - ${e.company} — ${e.role} (${e.duration})\n${e.bullets.map((b) => `    * ${b}`).join("\n")}`)
        .join("\n")}`
    );
  }

  if (options?.skills) {
    if (Array.isArray(options.skills)) {
      facts.push(`Technical skills: ${options.skills.join(", ")}`);
    } else {
      const skillEntries = Object.entries(options.skills)
        .map(([category, items]) => `  - ${category}: ${items.join(", ")}`)
        .join("\n");
      facts.push(`Technical skills by category:\n${skillEntries}`);
    }
  }

  if (options?.projects?.length) {
    const projectDetails = options.projects
      .map((p) => {
        const links = [
          p.demoUrl ? `Demo: ${p.demoUrl}` : null,
          p.githubUrl ? `GitHub: ${p.githubUrl}` : null,
        ]
          .filter(Boolean)
          .join(" | ");
        return `  - ${p.title} [${p.status}]: ${p.description} (Tech: ${p.technologies.join(", ")})${links ? ` — ${links}` : ""}`;
      })
      .join("\n");
    facts.push(`Projects:\n${projectDetails}`);
  }

  if (options?.education?.length) {
    const eduDetails = options.education
      .map((e) => `  - ${e.degree} from ${e.institution} (${e.year})`)
      .join("\n");
    facts.push(`Education:\n${eduDetails}`);
  }

  if (options?.contact) {
    const contactParts = [
      options.contact.email ? `Email: ${options.contact.email}` : null,
      options.contact.phone ? `Phone: ${options.contact.phone}` : null,
      options.contact.linkedin ? `LinkedIn: ${options.contact.linkedin}` : null,
      options.contact.github ? `GitHub: ${options.contact.github}` : null,
    ]
      .filter(Boolean)
      .join(", ");
    facts.push(`Contact information: ${contactParts}`);
  }

  for (const fact of facts) {
    builder.addFact(fact);
  }

  // Add FAQs for common portfolio questions
  if (options?.experience?.length) {
    const currentRole = options.experience[0];
    builder.addFAQ(
      `What is ${ownerName} currently working on?`,
      `${ownerName} is currently a ${currentRole.role} at ${currentRole.company} (${currentRole.duration}). Key responsibilities: ${currentRole.bullets.join(" ")}`
    );
  }

  if (options?.projects?.length) {
    builder.addFAQ(
      `What projects has ${ownerName} built?`,
      `${ownerName} has shipped ${options.projects.length} featured projects: ${options.projects.map((p) => p.title).join(", ")}. Ask about any specific project for more details.`
    );
  }

  if (options?.contact) {
    const contactAnswer = [
      options.contact.email ? `email at ${options.contact.email}` : null,
      options.contact.linkedin ? `LinkedIn at ${options.contact.linkedin}` : null,
      options.contact.github ? `GitHub at ${options.contact.github}` : null,
      options.contact.phone ? `phone at ${options.contact.phone}` : null,
    ]
      .filter(Boolean)
      .join(", or ");
    builder.addFAQ(
      `How can I contact ${ownerName}?`,
      `You can reach ${ownerName} via ${contactAnswer}.`
    );
  }

  builder
    .setWelcomeMessage(
      `Hi! I'm ${ownerName}'s portfolio assistant. I can tell you about their projects, skills, and experience. What interests you?`
    )
    .setPlaceholder("Ask about projects, skills, experience...")
    .setSuggestedPrompts([
      "Show me recent projects",
      "What technologies do you use?",
      "Tell me about your experience",
      "How can I contact you?",
    ])
    .setQuickReplies(["View projects", "Skills", "Contact"]);

  return builder.build();
}
