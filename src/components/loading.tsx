import { LoaderCircle } from "lucide-react";

export function Loading() {
  return (
    <div className="flex-1 min-h-screen flex items-center justify-center bg-background">
      <LoaderCircle
        size={32}
        className="text-primary-light animate-spin"
      />
    </div>
  );
}