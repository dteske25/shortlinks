import { useState, useEffect } from "react";
import { getLinks } from "../services/api";
import type { IShortenedLink } from "../types/link";

export function useLinks() {
  const [links, setLinks] = useState<IShortenedLink[]>([]);
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
      setError("Failed to load links");
    }
  };

  const updateLinks = (newLinks: IShortenedLink[]) => {
    setLinks(newLinks);
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
