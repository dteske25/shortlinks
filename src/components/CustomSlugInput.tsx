import { Hash } from "lucide-react";

interface CustomSlugInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
}

export function CustomSlugInput({
  value,
  onChange,
  error,
}: CustomSlugInputProps) {
  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Hash className="w-5 h-5 text-base-content/50" />
        </div>
        <input
          type="text"
          className={`input input-bordered w-full pl-10 ${
            error ? "input-error" : ""
          }`}
          placeholder="Custom link (optional)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      {error ? (
        <p className="mt-1 text-sm text-error">{error}</p>
      ) : (
        <p className="mt-1 text-sm text-base-content/70">
          Your link will be: {location.origin}/{value || "random"}
        </p>
      )}
    </div>
  );
}
