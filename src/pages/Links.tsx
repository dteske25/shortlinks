import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { LinkForm } from "../components/LinkForm";
import { LinkList } from "../components/LinkList";
import { shortenUrl, deleteLink, getLinks } from "../services/api";

export default function Links() {
  const queryClient = useQueryClient();
  const {
    data: links,
    isLoading,
    error,
  } = useQuery({ queryKey: ["links"], queryFn: getLinks });

  const { mutateAsync: handleShortenUrl } = useMutation({
    mutationFn: shortenUrl,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });

  const { mutateAsync: handleDelete } = useMutation({
    mutationFn: deleteLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });

  return (
    <>
      {error && <ErrorDisplay message={error.message} />}
      <LinkForm onSubmit={handleShortenUrl} isLoading={isLoading} />
      <LinkList links={links} onDeleteLink={handleDelete} />
    </>
  );
}
