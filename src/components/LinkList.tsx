import { LinkCard } from "./LinkCard";
import type { IShortenedLink } from "../types/link";

interface LinkListProps {
  links?: IShortenedLink[];
  onDeleteLink: (id: string) => Promise<void>;
}

export function LinkList({ links, onDeleteLink }: LinkListProps) {
  if (!links?.length) {
    return (
      <div className='text-center text-base-content/70 py-8'>No links yet.</div>
    );
  }

  return (
    <div className='w-full max-w-2xl space-y-4'>
      {links.map((link) => (
        <LinkCard key={link.id} link={link} onDelete={onDeleteLink} />
      ))}
    </div>
  );
}
