import { Header } from "./components/Header";
import { LinkForm } from "./components/LinkForm";
import { LinkList } from "./components/LinkList";
import { ErrorDisplay } from "./components/ErrorDisplay";
import { useLinks } from "./hooks/useLinks";
import { shortenUrl, deleteLink } from "./services/api";
import type { CreateLinkParams } from "./types/link";
import { Link2 } from "lucide-react";

function App() {
  const { links, isLoading, error, setError, setIsLoading, updateLinks } =
    useLinks();

  const handleShortenUrl = async (params: CreateLinkParams) => {
    setIsLoading(true);
    setError(null);

    try {
      const newLink = await shortenUrl(params);
      updateLinks([newLink, ...links]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to shorten URL");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteLink = async (id: string) => {
    try {
      await deleteLink(id);
      const updatedLinks = links.filter((link) => link.id !== id);
      updateLinks(updatedLinks);
    } catch (err) {
      setError("Failed to delete link");
    }
  };

  const shortLink = location.pathname.slice(1);
  const match = links.find((l) => l.id === shortLink);

  if (match) {
    setTimeout(() => location.replace(match.originalUrl), 500);
  }

  return (
    <div className="min-h-screen bg-base-200 animate-fade">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Header />
        {links && !match && (
          <div className="flex flex-col items-center space-y-8 animate-fade">
            {error && <ErrorDisplay message={error} />}
            <LinkForm onSubmit={handleShortenUrl} isLoading={isLoading} />
            <LinkList links={links} onDeleteLink={handleDeleteLink} />
          </div>
        )}
        {links && match && (
          <div className="flex flex-row animate-pulse justify-center items-end">
            <Link2 />
            <p className="text-lg mx-2">Redirecting...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
