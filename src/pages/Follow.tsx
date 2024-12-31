import { useQuery } from "@tanstack/react-query";
import { followLink, getLink } from "../services/api";
import { useParams } from "react-router";
import { useEffect } from "react";

export default function Follow() {
  const { id } = useParams<{ id: string }>();

  const { data: link } = useQuery({
    queryKey: ["links", id],
    queryFn: () => {
      if (id) {
        return getLink(id);
      }
      return null;
    },
  });

  useEffect(() => {
    (async () => {
      if (link) {
        await followLink(link.id);
        window.location.assign(link.originalUrl);
      }
    })();
  }, [link]);

  return <div>Redirecting...</div>;
}
