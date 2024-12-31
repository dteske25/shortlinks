import { useQuery } from "@tanstack/react-query";
import { getLink } from "../services/api";
import { useParams } from "react-router";

export default function Follow() {
  const { id } = useParams<{ id: string }>();

  const {
    data: link,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["links", id],
    queryFn: () => {
      if (id) {
        return getLink(id);
      }
      return null;
    },
  });

  return <>Loading {id}...</>;
}
