import { APP_CONFIG } from '../config/constants';
import type { ShortenedLink, CreateLinkParams } from '../types/link';

export async function shortenUrl({ url, customSlug }: CreateLinkParams): Promise<ShortenedLink> {
  // In production, this would call your Cloudflare Worker
  // For now, we'll simulate the response
  const id = customSlug || Math.random().toString(36).substring(7);
  
  // Simulate checking for duplicate custom slugs
  const existingLinks = await getLinks();
  if (customSlug && existingLinks.some(link => link.id === customSlug)) {
    throw new Error('This custom link is already taken');
  }

  return {
    id,
    originalUrl: url,
    shortUrl: `https://${APP_CONFIG.shortUrlDomain}/${id}`,
    createdAt: new Date().toISOString(),
    clicks: 0,
    customSlug
  };
}

export async function getLinks(): Promise<ShortenedLink[]> {
  const links = localStorage.getItem('shortened_links');
  return links ? JSON.parse(links) : [];
}

export async function deleteLink(id: string): Promise<void> {
  // In production, this would call your Cloudflare Worker
  // For now, we'll just update localStorage
  const links = await getLinks();
  const updatedLinks = links.filter(link => link.id !== id);
  localStorage.setItem('shortened_links', JSON.stringify(updatedLinks));
}