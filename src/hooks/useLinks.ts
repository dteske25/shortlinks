import { useState, useEffect } from 'react';
import { getLinks } from '../services/api';
import type { ShortenedLink } from '../types/link';

export function useLinks() {
  const [links, setLinks] = useState<ShortenedLink[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    try {
      const savedLinks = await getLinks();
      setLinks(savedLinks);
    } catch (err) {
      setError('Failed to load links');
    }
  };

  const updateLinks = (newLinks: ShortenedLink[]) => {
    setLinks(newLinks);
    localStorage.setItem('shortened_links', JSON.stringify(newLinks));
  };

  return {
    links,
    isLoading,
    error,
    setError,
    setIsLoading,
    updateLinks,
  };
}