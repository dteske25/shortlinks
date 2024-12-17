export interface ShortenedLink {
  id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
  clicks: number;
  customSlug?: string;
}

export interface CreateLinkParams {
  url: string;
  customSlug?: string;
}

export interface LinkValidationError {
  field: 'url' | 'customSlug';
  message: string;
}