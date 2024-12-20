export interface ShortenedLink {
  id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
  clicks: number;
}

export interface CloudflareAuthUser {
  email: string;
  name?: string;
  picture?: string;
}