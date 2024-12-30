interface ErrorDisplayProps {
  message: string;
}

export function ErrorDisplay({ message }: ErrorDisplayProps) {
  return (
    <div className="alert alert-error w-full max-w-2xl">
      <span>{message}</span>
    </div>
  );
}
