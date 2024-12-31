import { FormEvent, useState } from "react";
import { Link2 } from "lucide-react";
import { CustomSlugInput } from "./CustomSlugInput";
import { validateLinkInput } from "../utils/validation";
import type { CreateLinkParams, IShortenedLink } from "../types/link";

interface LinkFormProps {
  onSubmit: (params: CreateLinkParams) => Promise<IShortenedLink>;
  isLoading: boolean;
}

export function LinkForm({ onSubmit, isLoading }: LinkFormProps) {
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationError = validateLinkInput(url, customSlug);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    await onSubmit({ url, customSlug: customSlug || undefined });
    setUrl("");
    setCustomSlug("");
  };

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-2xl space-y-4'>
      <div className='space-y-4'>
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <Link2 className='w-5 h-5 text-base-content/50' />
          </div>
          <input
            type='url'
            className='input input-bordered w-full pl-10'
            placeholder='Enter your long URL here'
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <CustomSlugInput
          value={customSlug}
          onChange={setCustomSlug}
          error={error}
        />

        <div className='flex justify-end'>
          <button
            type='submit'
            disabled={isLoading}
            className='btn btn-primary'
          >
            {isLoading ? "Shortening..." : "Shorten"}
          </button>
        </div>
      </div>
    </form>
  );
}
