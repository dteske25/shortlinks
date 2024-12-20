import { useState } from "react";
import { ExternalLink, Copy, BarChart2, Trash2 } from "lucide-react";
import type { IShortenedLink } from "../types/link";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

interface LinkCardProps {
  link: IShortenedLink;
  onDelete: (id: string) => Promise<void>;
}

export function LinkCard({ link, onDelete }: LinkCardProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(link.id);
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <div className='card bg-base-100 shadow-sm'>
        <div className='card-body p-4'>
          <div className='flex items-center justify-between'>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-base-content truncate'>
                {link.originalUrl}
              </p>
              <p className='text-sm text-primary truncate'>
                {location.origin}/{link.id}
              </p>
            </div>
            <div className='flex items-center align-middle space-x-2 ml-4'>
              <span className='flex items-center text-sm text-base-content/70'>
                <BarChart2 className='w-4 h-4 mr-1' />
                {link.clicks}
              </span>
              <button
                onClick={() => copyToClipboard(`${location.origin}/${link.id}`)}
                className='btn btn-ghost btn-sm btn-square tooltip flex'
                data-tip='Copy short URL'
              >
                <Copy className='w-4 h-4' />
              </button>
              <a
                href={link.originalUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='btn btn-ghost btn-sm btn-square tooltip flex'
                data-tip='Open original URL'
              >
                <ExternalLink className='w-4 h-4' />
              </a>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className='btn btn-ghost btn-sm btn-square tooltip flex text-error hover:text-error'
                data-tip='Delete link'
              >
                <Trash2 className='w-4 h-4' />
              </button>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        shortUrl={link.id}
      />
    </>
  );
}
