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

  await fetch("/api/post", {
    method: "POST",
    body: JSON.stringify(link),
  });

  return link;
}

export async function getLinks(): Promise<IShortenedLink[]> {
  const response = await fetch("/api/get", { method: "GET" });
  const links = await response.json();
  return links;
}

export async function getLink(id: string): Promise<IShortenedLink> {
  const response = await fetch(`/api/get/${id}`, { method: "GET" });
  const link = await response.json();
  return link;
}

export async function followLink(id: string): Promise<IShortenedLink> {
  const response = await fetch(`/api/put/${id}`, { method: "PUT" });
  const link = await response.json();
  return link;
}

export async function deleteLink(id: string): Promise<void> {
  await fetch(`/api/delete/${id}`, { method: "DELETE" });
}
