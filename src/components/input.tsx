import type { TextareaHTMLAttributes } from "react";

type InputProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Input({ ...rest }: InputProps) {
  return (
    <textarea
      maxLength={300}
      className="h-32 w-full resize-none bg-surface rounded-md px-4 py-3 font-body text-sm text-text-primary placeholder:text-text-secondary border border-border-app outline-none focus:border-primary-light focus:ring-1 focus:ring-primary-light transition-colors duration-200"
      {...rest}
    />
  );
}