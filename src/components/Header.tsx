import { Link } from "lucide-react";

export function Header() {
  return (
    <div className="text-center mb-12">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Link className="w-8 h-8 text-primary" />
        </div>
      </div>
      <h1 className="text-4xl font-bold text-base-content mb-4">
        teske.sh URL Shortener
      </h1>
      <p className="text-lg text-base-content/70">
        Transform your long URLs into short, memorable links
      </p>
    </div>
  );
}
