export interface IShortenedLink {
  id: string;
  originalUrl: string;
  createdAt: string;
  clicks: number;
}

export interface CreateLinkParams {
  url: string;
  customSlug?: string;
}

export interface LinkValidationError {
  field: "url" | "customSlug";
  message: string;
}
