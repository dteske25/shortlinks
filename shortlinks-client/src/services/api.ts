import type { CreateLinkParams, IShortenedLink } from "../types/link";

export async function shortenUrl({
  url,
  customSlug,
}: CreateLinkParams): Promise<IShortenedLink> {
  const id = customSlug ?? Math.random().toString(36).substring(7);
  // Simulate checking for duplicate custom slugs
  const existingLinks = await getLinks();
  if (existingLinks.some((link) => link.id === id)) {
    throw new Error("This link is already taken");
  }

  const link = {
    id,
    originalUrl: url,
    createdAt: new Date().toISOString(),
    clicks: 0,
  };

  await fetch("/api/", {
    method: "POST",
    body: JSON.stringify(link),
  });

  return link;
}

export async function getLinks(): Promise<IShortenedLink[]> {
  const response = await fetch("/api/", { method: "GET" });
  const links = await response.json();
  return links;
}

export async function getLink(id: string): Promise<IShortenedLink> {
  const response = await fetch(`/api/?id=${id}`, { method: "GET" });
  const link = await response.json();
  return link;
}

export async function followLink(id: string): Promise<IShortenedLink> {
  const response = await fetch(`/api/follow?id=${id}`, { method: "GET" });
  const link = await response.json();
  return link;
}

export async function deleteLink(id: string): Promise<void> {
  // In production, this would call your Cloudflare Worker
  // For now, we'll just update localStorage
  await fetch(`/api/?id=${id}`, { method: "DELETE" });
}
