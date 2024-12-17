export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidCustomSlug(slug: string): boolean {
  const slugRegex = /^[a-zA-Z0-9-_]+$/;
  return slugRegex.test(slug) && slug.length >= 3 && slug.length <= 32;
}

export function validateLinkInput(url: string, customSlug?: string): string | null {
  if (!isValidUrl(url)) {
    return 'Please enter a valid URL';
  }
  
  if (customSlug && !isValidCustomSlug(customSlug)) {
    return 'Custom link must be 3-32 characters and can only contain letters, numbers, hyphens, and underscores';
  }
  
  return null;
}