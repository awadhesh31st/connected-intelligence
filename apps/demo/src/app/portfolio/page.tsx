import type { Metadata } from "next";
import PortfolioClient, { type GitHubRepo } from "./PortfolioClient";
import { portfolioOwner } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: `${portfolioOwner.name} — ${portfolioOwner.title}`,
  description: portfolioOwner.summary,
};

async function getInitialRepos(): Promise<GitHubRepo[] | null> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${portfolioOwner.githubUsername}/repos?sort=updated&per_page=12`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    return (await res.json()) as GitHubRepo[];
  } catch {
    return null;
  }
}

export default async function PortfolioPage() {
  const initialRepos = await getInitialRepos();
  return <PortfolioClient initialRepos={initialRepos} />;
}
